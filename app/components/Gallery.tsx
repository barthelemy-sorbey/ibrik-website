import Image, { type StaticImageData } from "next/image";
import { useTranslations } from "next-intl";
import passCathy from "../../public/gallery/pass-cathy.jpg";
import brigade from "../../public/gallery/brigade.jpg";
import mamaligaPour from "../../public/gallery/mamaliga-pour.jpg";
import mamaligaTray from "../../public/gallery/mamaliga-tray.jpg";
import fishRosemary from "../../public/gallery/fish-rosemary.jpg";
import embers from "../../public/gallery/embers.jpg";
import grill from "../../public/gallery/grill.jpg";
import copper from "../../public/brand/ibrik-copper.jpg";

type Tile = {
  id: string;
  src: StaticImageData;
  /** bento cell — see `.b-1` … `.b-8` in globals.css */
  cell: string;
  sizes: string;
  objectPosition?: string;
};

const NARROW = "(max-width: 720px) 50vw, (max-width: 1000px) 34vw, 25vw";
const WIDE = "(max-width: 720px) 100vw, (max-width: 1000px) 67vw, 50vw";
const TALL = "(max-width: 720px) 100vw, (max-width: 1000px) 34vw, 25vw";

const TILES: Tile[] = [
  { id: "pass", src: passCathy, cell: "b-1", sizes: TALL, objectPosition: "center 35%" },
  { id: "brigade", src: brigade, cell: "b-2", sizes: WIDE, objectPosition: "center 40%" },
  { id: "copper", src: copper, cell: "b-3", sizes: TALL, objectPosition: "center 60%" },
  { id: "mamaliga", src: mamaligaPour, cell: "b-4", sizes: NARROW, objectPosition: "center 45%" },
  { id: "polenta", src: mamaligaTray, cell: "b-5", sizes: NARROW, objectPosition: "center 45%" },
  { id: "fish", src: fishRosemary, cell: "b-6", sizes: WIDE, objectPosition: "center 40%" },
  { id: "embers", src: embers, cell: "b-7", sizes: NARROW, objectPosition: "center 55%" },
  { id: "grill", src: grill, cell: "b-8", sizes: NARROW, objectPosition: "center 50%" },
];

export default function Gallery() {
  const t = useTranslations("Gallery");

  return (
    <section className="section s-gallery" id="gallery">
      <div className="wrap">
        <div className="gallery-head">
          <div>
            <div className="gallery-eyebrow reveal">{t("eyebrow")}</div>
            <h2 className="display reveal">
              <span style={{ whiteSpace: "pre-line" }}>{t("titlePre")}</span>
              <span className="accent">{t("titleAccent")}</span>
            </h2>
          </div>
          <div className="gallery-intro reveal d1">
            <p className="lead">{t("lead")}</p>
            <a
              href="https://www.instagram.com/ibrikparis/"
              target="_blank"
              rel="noopener noreferrer"
              className="gallery-ig"
            >
              {t("instagram")}
              <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>

        <div className="bento reveal d1">
          {TILES.map((tile) => (
            <figure className={`bento-tile ${tile.cell}`} key={tile.id}>
              <Image
                src={tile.src}
                alt={t(`${tile.id}.alt`)}
                fill
                sizes={tile.sizes}
                placeholder="blur"
                style={{ objectPosition: tile.objectPosition }}
              />
              <figcaption>{t(`${tile.id}.cap`)}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
