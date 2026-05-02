<script setup lang="ts">
  import * as v from 'valibot';
  import type { OKLCHColor } from '@/types/colors';

  const AxisSchema = v.object({
    horizontal: v.pipe(v.number(), v.minValue(0)),
    vertical: v.pipe(v.number(), v.minValue(0)),
  });

  const OpacitySchema = v.pipe(
    v.number(),
    v.check((value) => value > 0 && value <= 1, '`opacity` must be strictly greater than 0 and lower than 1')
  );

  const PositiveNumberStrictlySchema = (name: string) =>
    v.pipe(
      v.number(),
      v.check((value) => value > 0, `\`${name}\` must be strictly greater than 0`)
    );

  const SizeSchema = (name: string) =>
    v.object({
      width: PositiveNumberStrictlySchema(`${name} width`),
      height: PositiveNumberStrictlySchema(`${name} height`),
    });

  const ParametersSchema = v.object({
    globalShift: AxisSchema,

    lines: v.object({
      count: AxisSchema,
      opacity: OpacitySchema,
      shift: v.object({
        horizontal: v.array(v.pipe(v.number(), v.minValue(0))),
        vertical: v.array(v.pipe(v.number(), v.minValue(0))),
      }),
    }),

    loading: v.object({
      progress: v.pipe(v.number(), v.minValue(0), v.maxValue(1)),
      startDate: v.date(),
    }),

    neons: v.object({
      delay: PositiveNumberStrictlySchema('delay'),
      duration: PositiveNumberStrictlySchema('duration'),
      list: v.array(
        v.object({
          direction: v.picklist(['top', 'bottom', 'left', 'right']),
          index: v.number(),
          startDate: v.date(),
        })
      ),
      opacity: OpacitySchema,
      shadowBlur: v.pipe(v.number(), v.minValue(0)),
      size: SizeSchema('neons'),
      updatedDate: v.date(),
    }),

    pixels: v.object({
      duration: PositiveNumberStrictlySchema('duration'),
      list: v.array(
        v.object({
          indexX: v.number(),
          indexY: v.number(),
          startDate: v.date(),
        })
      ),
      opacity: OpacitySchema,
      size: SizeSchema('pixels'),
    }),

    roughness: PositiveNumberStrictlySchema('roughness'),
    windowSize: SizeSchema('window'),
  });

  type ParametersInput = v.InferInput<typeof ParametersSchema>;

  const canvasParameters = reactive<ParametersInput>({
    globalShift: { horizontal: 0, vertical: 0 },

    lines: {
      count: { horizontal: 0, vertical: 0 },
      opacity: 0.02,
      shift: { horizontal: [], vertical: [] },
    },

    loading: {
      progress: 0,
      startDate: new Date(),
    },

    neons: {
      delay: 500,
      duration: 10000,
      list: [],
      opacity: 0.1,
      shadowBlur: 2,
      size: { width: 2, height: 10 },
      updatedDate: new Date(),
    },

    pixels: {
      duration: 1000,
      list: [],
      opacity: 0.1,
      size: { width: 20, height: 20 },
    },

    roughness: 0.2,
    windowSize: { width: 1, height: 1 },
  });

  // Validate parameters
  try {
    v.parse(ParametersSchema, canvasParameters);
  } catch (error) {
    if (process.env.NODE_ENV === 'development' && error instanceof v.ValiError) {
      // @ts-expect-error Throw message from the first issue
      throw new Error(error);
    }
  }

  const { x: cursorX, y: cursorY } = useMouse({ initialValue: { x: 0, y: Infinity } });
  const { x: scrollX, y: scrollY } = useWindowScroll();
  const { width: windowWidth, height: windowHeight } = useWindowSize();

  const refCanvas = ref<HTMLCanvasElement | null>(null);
  const context = ref<CanvasRenderingContext2D | null>(null);
  const handleId = ref<number>(0);

  const lineColor = ref<OKLCHColor | null>(null);
  const neonColor = ref<OKLCHColor | null>(null);
  const pixelColor = ref<OKLCHColor | null>(null);

  function loop() {
    if (!refCanvas.value || !context.value || !lineColor.value || !neonColor.value || !pixelColor.value) return;
    const { globalShift, lines, loading, neons, pixels, roughness, windowSize } = canvasParameters;
    const currentDate = new Date();
    const ctx = context.value;
    const cX = cursorX.value - scrollX.value;
    const cY = cursorY.value - scrollY.value;

    // Initialize
    if (loading.progress < 1) {
      canvasParameters.loading.progress = getDurationProgress(loading.startDate, 2000);
      if (canvasParameters.loading.progress === 1) {
        canvasParameters.neons.updatedDate = new Date();
      }
    }

    ctx.clearRect(0, 0, refCanvas.value.width, refCanvas.value.height);

    // Draw lines
    ctx.lineWidth = 1;
    ctx.strokeStyle = addAlphaToOklch(lineColor.value, lines.opacity);

    lines.shift.vertical = lines.shift.vertical.map((currentLineShift, x) => {
      const deltaX =
        ((cX - windowSize.width * 0.5) * pixels.size.width) / (windowSize.width * roughness) - currentLineShift;
      const easingX = Math.pow(Math.abs((pixels.size.width * (x + 1) - cX) / windowSize.width), 2);
      const newLineShift = currentLineShift + deltaX * easingX;
      const posX = pixels.size.width * (x + 1) + newLineShift - globalShift.vertical;

      ctx.beginPath();
      if (x % 2) {
        ctx.moveTo(posX, 0);
        ctx.lineTo(
          posX,
          loading.progress < 1 ? easeInOutCubic(loading.progress) * windowSize.height : windowSize.height
        );
      } else {
        ctx.moveTo(posX, loading.progress < 1 ? windowSize.height * (1 - easeInOutCubic(loading.progress)) : 0);
        ctx.lineTo(posX, windowSize.height);
      }
      ctx.stroke();
      ctx.closePath();

      return newLineShift;
    });

    lines.shift.horizontal = lines.shift.horizontal.map((currentLineShift, y) => {
      const deltaY =
        ((cY - windowSize.height * 0.5) * pixels.size.height) / (windowSize.height * roughness) - currentLineShift;
      const easingY = Math.pow(Math.abs((pixels.size.height * (y + 1) - cY) / windowSize.height), 2);
      const newLineShift = currentLineShift + deltaY * easingY;
      const posY = pixels.size.height * (y + 1) + newLineShift - globalShift.horizontal;

      ctx.beginPath();
      if (y % 2) {
        ctx.moveTo(0, posY);
        ctx.lineTo(loading.progress < 1 ? easeInOutCubic(loading.progress) * windowSize.width : windowSize.width, posY);
      } else {
        ctx.moveTo(loading.progress < 1 ? windowSize.width * (1 - easeInOutCubic(loading.progress)) : 0, posY);
        ctx.lineTo(windowSize.width, posY);
      }
      ctx.stroke();
      ctx.closePath();

      return newLineShift;
    });

    if (loading.progress === 1) {
      // Draw pixels
      const newIndexX = mod(
        lines.shift.vertical.findIndex((shiftX, x) => cX < pixels.size.width * (x + 1) + shiftX - globalShift.vertical),
        lines.shift.vertical.length + 1
      );
      const newIndexY = mod(
        lines.shift.horizontal.findIndex(
          (shiftY, y) => cY < pixels.size.height * (y + 1) + shiftY - globalShift.horizontal
        ),
        lines.shift.horizontal.length + 1
      );

      if (pixels.list.findIndex(({ indexX, indexY }) => indexX === newIndexX && indexY === newIndexY) < 0) {
        pixels.list.push({ indexX: newIndexX, indexY: newIndexY, startDate: new Date() });
      }

      pixels.list.forEach(({ indexX, indexY, startDate }) => {
        if (pixelColor.value) {
          ctx.fillStyle = addAlphaToOklch(
            pixelColor.value,
            (1 - easeInOutCubic(getDurationProgress(startDate, pixels.duration))) * pixels.opacity
          );
        }

        ctx.beginPath();
        ctx.fillRect(
          (lines.shift.vertical?.[indexX - 1] ?? 0) + pixels.size.width * indexX - globalShift.vertical,
          (lines.shift.horizontal?.[indexY - 1] ?? 0) + pixels.size.height * indexY - globalShift.horizontal,
          (lines.shift.vertical?.[indexX] ?? 0) + pixels.size.width - (lines.shift.vertical?.[indexX - 1] ?? 0),
          (lines.shift.horizontal?.[indexY] ?? 0) + pixels.size.height - (lines.shift.horizontal?.[indexY - 1] ?? 0)
        );
        ctx.closePath();
      });

      if (currentDate.getTime() - neons.updatedDate.getTime() > neons.delay) {
        const random = Math.random();
        const axis = random < 0.5 ? 'vertical' : 'horizontal';

        neons.list.push({
          direction: random < 0.25 ? 'top' : random < 0.5 ? 'bottom' : random < 0.75 ? 'left' : 'right',
          index: Math.floor(Math.random() * lines.count[axis]),
          startDate: currentDate,
        });
        canvasParameters.neons.updatedDate = new Date();
      }

      // Draw neons
      ctx.fillStyle = addAlphaToOklch(neonColor.value, neons.opacity);
      ctx.shadowColor = neonColor.value;
      ctx.shadowBlur = neons.shadowBlur;

      neons.list.forEach(({ direction, index, startDate }) => {
        const axis = direction === 'top' || direction === 'bottom' ? 'vertical' : 'horizontal';
        const easedProgress = easeInOutCubic(getDurationProgress(startDate, neons.duration));
        const easedOriented = direction === 'bottom' || direction === 'right' ? easedProgress : 1 - easedProgress;

        ctx.beginPath();
        switch (axis) {
          case 'vertical':
            ctx.fillRect(
              pixels.size.width * (index + 1) +
                (lines.shift.vertical?.[index] ?? 0) -
                globalShift.vertical -
                neons.size.width * 0.5,
              (windowSize.height + 2 * neons.size.height) * easedOriented - neons.size.height,

              neons.size.width,
              neons.size.height
            );
            break;
          case 'horizontal':
            ctx.fillRect(
              (windowSize.width + 2 * neons.size.height) * easedOriented - neons.size.height,
              pixels.size.height * (index + 1) +
                (lines.shift.horizontal?.[index] ?? 0) -
                globalShift.horizontal -
                neons.size.width * 0.5,

              neons.size.height,
              neons.size.width
            );
            break;
        }
        ctx.closePath();
      });

      ctx.shadowColor = 'transparent';

      canvasParameters.neons.list = neons.list.filter(
        ({ startDate }) => currentDate.getTime() - startDate.getTime() < neons.duration
      );
      canvasParameters.pixels.list = pixels.list.filter(
        ({ startDate }, index, array) =>
          currentDate.getTime() - startDate.getTime() < pixels.duration || index === array.length - 1
      );
    }

    handleId.value = requestAnimationFrame(loop);
  }

  const unwatch = watch(refCanvas, (canvas) => {
    if (canvas) {
      context.value = canvas.getContext('2d');

      watch(
        [windowWidth, windowHeight],
        ([width, height]) => {
          // Initialize parameters
          const countHorizontal = Math.ceil(height / canvasParameters.pixels.size.height);
          const countVertical = Math.ceil(width / canvasParameters.pixels.size.width);

          canvasParameters.globalShift.horizontal =
            (canvasParameters.pixels.size.height * countHorizontal - height) * 0.5;
          canvasParameters.globalShift.vertical = (canvasParameters.pixels.size.width * countVertical - width) * 0.5;

          canvasParameters.lines.count.horizontal = countHorizontal;
          canvasParameters.lines.count.vertical = countVertical;

          canvasParameters.lines.shift.horizontal = new Array(canvasParameters.lines.count.horizontal).fill(0);
          canvasParameters.lines.shift.vertical = new Array(canvasParameters.lines.count.vertical).fill(0);

          canvasParameters.loading.progress = 0;
          canvasParameters.loading.startDate = new Date();
          canvasParameters.pixels.list = [];
          canvasParameters.windowSize = { height, width };

          canvas.height = height;
          canvas.width = width;

          cursorY.value = Math.min(cursorY.value, scrollY.value + height * 0.5);
          cursorX.value = Math.min(cursorX.value, scrollX.value + width * 0.5);

          cancelAnimationFrame(handleId.value);
          loop();
        },
        { immediate: true }
      );

      unwatch();
    }
  });

  onBeforeMount(() => {
    const rootStyle = getComputedStyle(document.documentElement);
    lineColor.value = rootStyle.getPropertyValue('--color-white').trim() as OKLCHColor;
    neonColor.value = rootStyle.getPropertyValue('--color-primary').trim() as OKLCHColor;
    pixelColor.value = rootStyle.getPropertyValue('--color-primary').trim() as OKLCHColor;
  });

  onUnmounted(() => {
    cancelAnimationFrame(handleId.value);
  });
</script>

<template>
  <div class="z-below pointer-events-none fixed inset-0">
    <canvas ref="refCanvas" />
  </div>
</template>
