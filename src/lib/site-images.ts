export type SiteImage = {
  src: string;
  srcSet: string;
  width: number;
  height: number;
};

function photo(name: string, width: number, height: number): SiteImage {
  return {
    src: `/images/${name}-800.webp`,
    srcSet: [480, 800, 1280].map((size) => `/images/${name}-${size}.webp ${size}w`).join(", "),
    width,
    height,
  };
}

function logo(name: string, width: number, height: number, sizes: number[]): SiteImage {
  return {
    src: `/images/${name}-${sizes[0]}.webp`,
    srcSet: sizes.map((size) => `/images/${name}-${size}.webp ${size}w`).join(", "),
    width,
    height,
  };
}

export const siteImages = {
  heroTruck: photo("hero-truck", 1824, 1368),
  truckTrailer: photo("hero-truck", 1824, 1368),
  truckGate: photo("truck-gate", 1920, 1080),
  gutterMachine: photo("gutter-machine", 1368, 1824),
  fasciaInstall: photo("fascia-install", 1440, 1920),
  work1: photo("work-1", 1368, 1824),
  work2: photo("work-2", 1368, 1824),
  work3: photo("work-3", 1368, 1824),
  work4: photo("work-4", 1368, 1824),
  work5: photo("work-5", 1368, 1824),
  work6: photo("work-6", 1368, 1824),
  work7: photo("work-7", 1368, 1824),
  work8: photo("work-8", 1368, 1824),
  getGuttersLogo: logo("logo", 1168, 784, [96, 192]),
  rgwebdLogo: logo("rgwebd-logo", 1248, 832, [160, 320]),
} as const;
