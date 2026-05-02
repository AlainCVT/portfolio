<template>
  <LayoutContainer class="grid h-screen w-screen grid-rows-[1fr_auto] justify-center py-4 *:last:self-end">
    <div class="grid justify-items-center gap-4 self-center sm:gap-6 md:gap-8 2xl:gap-12">
      <div class="grid text-center sm:gap-2 md:gap-4">
        <h1 class="font-CMU-Serif-Upright text-primary text-2xl sm:text-4xl md:text-6xl 2xl:text-8xl">
          Alain
          <br />
          <span class="uppercase">Cao Van Truong</span>
        </h1>
        <span class="font-CMU-Typewriter-Text text-base text-white sm:text-2xl md:text-4xl 2xl:text-6xl">
          full-stack web developer
        </span>
      </div>
      <ul class="flex gap-4 sm:gap-6">
        <li
          v-for="(link, name) in ACVT_SOCIAL_LINKS"
          :key="name"
        >
          <UiDiamondButton
            :href="link.url"
            :label="link.label"
            :icon="link.icon"
          />
        </li>
      </ul>
    </div>
    <UiScrollIndicator />
  </LayoutContainer>
</template>
