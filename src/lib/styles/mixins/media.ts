export const mediaQuerySizes = {
  mobile: 480,
  tablet: 768,
  desktop: 1024,
};

export const media = {
  mobile: `@media (max-width: ${mediaQuerySizes.mobile - 1}px)`,
  tablet: `@media (max-width: ${mediaQuerySizes.tablet - 1}px)`,
  desktop: `@media (max-width: ${mediaQuerySizes.desktop - 1}px)`,
};
