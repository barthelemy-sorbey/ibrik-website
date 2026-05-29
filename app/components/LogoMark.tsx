import Image, { type StaticImageData } from "next/image";
import logoGreen from "../../public/brand/ibrik-kitchen-logo.png";
import logoCream from "../../public/brand/ibrik-kitchen-logo-cream.png";

const SOURCES: Record<"green" | "cream", StaticImageData> = {
  green: logoGreen,
  cream: logoCream,
};

type Props = {
  alt?: string;
  height?: number;
  className?: string;
  priority?: boolean;
  sizes?: string;
  variant?: "green" | "cream";
};

export default function LogoMark({
  alt = "Ibrik Kitchen",
  height = 32,
  className,
  priority = false,
  sizes,
  variant = "green",
}: Props) {
  const src = SOURCES[variant];
  return (
    <Image
      src={src}
      alt={alt}
      height={height}
      width={Math.round((height * src.width) / src.height)}
      priority={priority}
      sizes={sizes}
      className={className}
      style={{ height, width: "auto" }}
    />
  );
}
