import type { ImgHTMLAttributes } from "react";
import type { SiteImage } from "@/lib/site-images";

type OptimizedImageProps = Omit<
  ImgHTMLAttributes<HTMLImageElement>,
  "src" | "srcSet" | "width" | "height"
> & {
  image: SiteImage;
};

export function OptimizedImage({ image, loading = "lazy", ...props }: OptimizedImageProps) {
  return (
    <img
      src={image.src}
      srcSet={image.srcSet}
      width={image.width}
      height={image.height}
      loading={loading}
      decoding="async"
      {...props}
    />
  );
}
