#!/usr/bin/env python3
"""Build responsive WebP assets and the social-share card from real site photos."""

import json
from pathlib import Path
from urllib.request import urlretrieve

from PIL import Image, ImageDraw, ImageEnhance, ImageFont, ImageOps


ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "tmp" / "source-images"
OUTPUT = ROOT / "public" / "images"
ASSET_METADATA = ROOT / "src" / "assets"
SITE_ORIGIN = "https://getguttersjax.com"

PHOTO_WIDTHS = (480, 800, 1280)
LOGO_WIDTHS = (96, 192)
RGWEBD_WIDTHS = (160, 320)

PHOTO_NAMES = (
    "hero-truck",
    "truck-gate",
    "gutter-machine",
    "fascia-install",
    "work-1",
    "work-2",
    "work-3",
    "work-4",
    "work-5",
    "work-6",
    "work-7",
    "work-8",
)


def source_path(name: str) -> Path:
    normalized = SOURCE / f"{name}.jpeg"
    legacy_download = SOURCE / f"{name}.jpeg.jpeg"
    if normalized.exists():
        return normalized
    if legacy_download.exists():
        return legacy_download

    metadata_path = ASSET_METADATA / f"{name}.jpeg.asset.json"
    metadata = json.loads(metadata_path.read_text(encoding="utf-8"))
    SOURCE.mkdir(parents=True, exist_ok=True)
    urlretrieve(f"{SITE_ORIGIN}{metadata['url']}", normalized)
    return normalized


def save_variants(name: str, widths: tuple[int, ...], quality: int = 82) -> None:
    with Image.open(source_path(name)) as source:
        image = ImageOps.exif_transpose(source).convert("RGB")
        for width in widths:
            target_width = min(width, image.width)
            target_height = round(image.height * target_width / image.width)
            resized = image.resize((target_width, target_height), Image.Resampling.LANCZOS)
            resized.save(
                OUTPUT / f"{name}-{target_width}.webp",
                "WEBP",
                quality=quality,
                method=6,
            )


def create_social_card() -> None:
    with Image.open(source_path("truck-gate")) as source:
        image = ImageOps.fit(
            ImageOps.exif_transpose(source).convert("RGB"),
            (1200, 630),
            method=Image.Resampling.LANCZOS,
            centering=(0.58, 0.5),
        )
    image = ImageEnhance.Contrast(image).enhance(1.05).convert("RGBA")

    overlay = Image.new("RGBA", image.size, (0, 0, 0, 0))
    draw = ImageDraw.Draw(overlay)
    for x in range(760):
        alpha = int(210 * (1 - x / 760))
        draw.line((x, 0, x, 630), fill=(4, 13, 26, max(alpha, 0)))
    draw.rectangle((0, 510, 1200, 630), fill=(4, 13, 26, 185))
    image = Image.alpha_composite(image, overlay)

    bold = ImageFont.truetype("/System/Library/Fonts/Supplemental/Arial Bold.ttf", 76)
    regular = ImageFont.truetype("/System/Library/Fonts/Supplemental/Arial.ttf", 34)
    small = ImageFont.truetype("/System/Library/Fonts/Supplemental/Arial Bold.ttf", 28)
    draw = ImageDraw.Draw(image)
    gold = (220, 180, 92, 255)
    white = (255, 255, 255, 255)
    draw.text((58, 92), "GET", font=bold, fill=gold)
    get_width = draw.textbbox((0, 0), "GET", font=bold)[2]
    draw.text((74 + get_width, 92), "GUTTERS", font=bold, fill=white)
    draw.text((62, 192), "SEAMLESS GUTTERS DONE RIGHT", font=small, fill=white)
    draw.text((62, 246), "Jacksonville | Orange Park | Northeast Florida", font=regular, fill=white)
    draw.text((62, 550), "getguttersjax.com  |  (904) 589-0000", font=small, fill=white)
    image.convert("RGB").save(OUTPUT / "get-gutters-social.jpg", "JPEG", quality=88, optimize=True)


def main() -> None:
    OUTPUT.mkdir(parents=True, exist_ok=True)
    for name in PHOTO_NAMES:
        save_variants(name, PHOTO_WIDTHS)
    save_variants("logo", LOGO_WIDTHS, quality=88)
    save_variants("rgwebd-logo", RGWEBD_WIDTHS, quality=86)
    create_social_card()


if __name__ == "__main__":
    main()
