export const ACVT_SOCIAL_LINKS = {
  github: {
    label: 'GitHub',
    url: 'https://github.com/AlainCVT',
    icon: 'simple-icons:github',
  },
  linkedin: {
    label: 'LinkedIn',
    url: 'https://linkedin.com/in/alain-cao-van-truong',
    icon: 'simple-icons:linkedin',
  },
  x: {
    label: 'X',
    url: 'https://x.com/AlainCVT',
    icon: 'simple-icons:x',
  },
  codepen: {
    label: 'CodePen',
    url: 'https://codepen.io/AlainCVT',
    icon: 'simple-icons:codepen',
  },
} as const satisfies Record<
  string,
  {
    label: string;
    url: string;
    icon: string;
  }
>;
