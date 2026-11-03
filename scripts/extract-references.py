#!/usr/bin/env python3
"""
Cut the site's photography and stickers out of the reference set in /references.

    pip install pillow numpy scipy rembg onnxruntime
    python3 scripts/extract-references.py            # photos + stickers + logo
    python3 scripts/extract-references.py --photos   # photos only (no rembg needed)

Every crop box below was chosen to stay clear of the overlays in the
screenshots (Pinterest buttons, other brands' wordmarks, captions), so what
lands in /public is photograph only.

Outputs
  public/photos/<name>.webp     graded crops, upscaled to a usable size
  public/stickers/<name>.webp   die-cut cutouts: subject + white border, alpha
  public/brand/logo-*.webp      the logo on transparent, crimson and cream
"""

from __future__ import annotations

import os
import sys
from pathlib import Path

import numpy as np
from PIL import Image, ImageFilter

ROOT = Path(__file__).resolve().parent.parent
REF = ROOT / "references"
OUT_PHOTOS = ROOT / "public" / "photos"
OUT_STICKERS = ROOT / "public" / "stickers"
OUT_BRAND = ROOT / "public" / "brand"


def shot(stamp: str) -> Path:
    """macOS puts a narrow no-break space before AM/PM in screenshot names."""
    return REF / f"Screenshot 2026-11-01 at {stamp} PM.png"


MOOD = REF / "moodboard-stickers.webp"
LEATHER = REF / "palette-olive-burgundy-cream.webp"
LUMEN = REF / "layout-lumen.webp"

# name: (source, (left, top, right, bottom))
PHOTOS: dict[str, tuple[Path, tuple[int, int, int, int]]] = {
    "corridor": (shot("11.27.19"), (112, 22, 922, 1204)),
    "amber-coupe": (shot("11.26.42"), (92, 26, 975, 406)),
    "amber-coupe-flower": (shot("11.26.42"), (24, 444, 975, 836)),
    "amber-petals": (shot("11.26.42"), (24, 874, 896, 1262)),
    "highball": (shot("11.26.46"), (42, 176, 366, 476)),
    "dropper-coupe": (shot("11.29.22"), (82, 136, 493, 1027)),
    "smoke-coupe": (shot("11.29.05"), (196, 152, 748, 932)),
    "velvet-curtain": (shot("11.23.10"), (14, 0, 852, 468)),
    "copper-dress": (shot("11.22.50"), (382, 150, 768, 570)),
    "candle-table": (shot("11.22.50"), (48, 578, 518, 1074)),
    "keyhole": (shot("11.23.23"), (300, 178, 600, 612)),
    "bar-chandeliers": (shot("11.23.23"), (56, 652, 301, 1084)),
    "bar-bottles": (shot("11.23.23"), (591, 652, 837, 1084)),
    "whisky": (shot("11.23.58"), (240, 562, 716, 872)),
    "marble-red": (shot("11.23.58"), (72, 0, 958, 262)),
    "pleats-red": (shot("11.23.58"), (230, 948, 880, 1108)),
    "roses-profile": (shot("11.28.29"), (0, 94, 1040, 334)),
    "rose-petals": (shot("11.28.56"), (0, 64, 926, 444)),
    "lamp": (shot("11.25.16"), (400, 906, 626, 1160)),
    "wine-bottle": (shot("11.25.16"), (170, 1212, 394, 1466)),
    "spotlight-coupe": (shot("11.22.57"), (336, 702, 828, 1138)),
    "jazz-room": (shot("11.25.45"), (260, 552, 467, 718)),
    "jazz-bar": (shot("11.25.45"), (478, 552, 687, 808)),
    "jazz-candles": (shot("11.25.45"), (66, 756, 249, 988)),
    "jazz-band": (shot("11.25.45"), (260, 730, 467, 1024)),
    "crowd": (LUMEN, (124, 342, 880, 604)),
    "crowd-walkers": (LUMEN, (1448, 468, 1888, 738)),
    "crowd-headphones": (LUMEN, (444, 1075, 835, 1232)),
    "dj": (LUMEN, (1193, 1008, 1400, 1213)),
    "cherry-cake": (MOOD, (334, 0, 640, 286)),
    "tulips": (MOOD, (520, 0, 865, 430)),
    "velvet-cake": (MOOD, (517, 432, 865, 950)),
    "velvet-bows": (MOOD, (18, 0, 330, 288)),
    "table-roses": (MOOD, (0, 1146, 204, 1548)),
    "bouquet": (MOOD, (632, 1086, 865, 1420)),
    # The swatch card itself, minus its lettering — section backgrounds.
    "leather-olive": (LEATHER, (0, 118, 704, 362)),
    "leather-burgundy": (LEATHER, (0, 372, 704, 690)),
    "leather-cream": (LEATHER, (0, 1046, 704, 1350)),
}

# Subject cut out by rembg, then given a die-cut white border.
STICKERS: dict[str, tuple[Path, tuple[int, int, int, int]]] = {
    "cherry-coupe": (MOOD, (520, 948, 736, 1292)),
    "lamp": (shot("11.25.16"), (400, 906, 626, 1160)),
    "dropper-coupe": (shot("11.29.22"), (82, 136, 493, 1027)),
    "smoke-coupe": (shot("11.29.05"), (196, 152, 748, 932)),
    "spotlight-coupe": (shot("11.22.57"), (380, 690, 700, 1000)),
    "cherry": (MOOD, (440, 1400, 522, 1548)),
    "cherry-stem": (MOOD, (405, 130, 482, 288)),
    "whisky": (shot("11.23.58"), (330, 560, 640, 812)),
}


def upscale(im: Image.Image, long_side: int) -> Image.Image:
    w, h = im.size
    k = min(long_side / max(w, h), 2.4)
    if k <= 1:
        return im
    im = im.resize((round(w * k), round(h * k)), Image.Resampling.LANCZOS)
    return im.filter(ImageFilter.UnsharpMask(radius=2, percent=60, threshold=2))


def grain(im: Image.Image, amount: float = 7.0) -> Image.Image:
    """A little luminance noise hides upscaling softness and unifies sources."""
    a = np.asarray(im).astype(np.float32)
    rng = np.random.default_rng(7)
    noise = rng.normal(0, amount, a.shape[:2])[..., None]
    a[..., :3] = np.clip(a[..., :3] + noise, 0, 255)
    return Image.fromarray(a.astype(np.uint8), im.mode)


def do_photos() -> None:
    OUT_PHOTOS.mkdir(parents=True, exist_ok=True)
    for name, (src, box) in PHOTOS.items():
        im = Image.open(src).convert("RGB").crop(box)
        im = grain(upscale(im, 1500))
        im.save(OUT_PHOTOS / f"{name}.webp", quality=84, method=6)
        print(f"photo   {name:22s} {im.size}")


def die_cut(rgba: Image.Image, border: int) -> Image.Image:
    """Subject on a white paper layer that runs `border` px past its silhouette."""
    from scipy import ndimage

    a = np.asarray(rgba.getchannel("A")).astype(np.float32) / 255
    solid = a > 0.5
    # Drop specks rembg leaves behind; keep the main blobs only.
    labels, n = ndimage.label(solid)
    if n > 1:
        sizes = ndimage.sum(solid, labels, range(1, n + 1))
        keep = np.isin(labels, 1 + np.flatnonzero(sizes >= sizes.max() * 0.08))
        solid &= keep
        a = a * keep
    solid = ndimage.binary_fill_holes(solid)

    pad = border + 6
    h, w = a.shape
    # Distance-based dilation gives a round, even die-cut edge.
    dist = ndimage.distance_transform_edt(~np.pad(solid, pad))
    paper = np.clip(border + 0.5 - dist, 0, 1)
    paper = ndimage.gaussian_filter(paper, 1.0)
    paper = np.clip((paper - 0.5) * 3 + 0.5, 0, 1)

    out = np.zeros((h + pad * 2, w + pad * 2, 4), np.float32)
    out[..., :3] = (250, 245, 236)
    out[..., 3] = paper
    rgb = np.asarray(rgba.convert("RGB")).astype(np.float32)
    region = out[pad : pad + h, pad : pad + w]
    region[..., :3] = rgb * a[..., None] + region[..., :3] * (1 - a[..., None])
    region[..., 3] = np.maximum(region[..., 3], a)

    res = np.empty(out.shape, np.uint8)
    res[..., :3] = np.clip(out[..., :3], 0, 255).astype(np.uint8)
    res[..., 3] = np.clip(out[..., 3] * 255, 0, 255).astype(np.uint8)
    return Image.fromarray(res, "RGBA")


def trim(im: Image.Image) -> Image.Image:
    bbox = im.getchannel("A").point(lambda v: 255 if v > 8 else 0).getbbox()
    return im.crop(bbox) if bbox else im


def do_stickers() -> None:
    from rembg import new_session, remove

    # Model is fetched to $U2NET_HOME (default ~/.u2net) on first run.
    session = new_session("isnet-general-use")
    OUT_STICKERS.mkdir(parents=True, exist_ok=True)
    only = set(sys.argv[2:]) if len(sys.argv) > 2 and sys.argv[1] == "--stickers" else None
    for name, (src, box) in STICKERS.items():
        if only and name not in only:
            continue
        im = upscale(Image.open(src).convert("RGB").crop(box), 900)
        cut = remove(im, session=session, post_process_mask=True)
        sticker = trim(die_cut(cut, border=max(10, round(max(im.size) * 0.018))))
        sticker.thumbnail((900, 900), Image.Resampling.LANCZOS)
        sticker.save(OUT_STICKERS / f"{name}.webp", quality=88, method=6)
        print(f"sticker {name:22s} {sticker.size}")


def do_logo() -> None:
    """The logo ships on black. Recover it onto transparent by unpremultiplying."""
    OUT_BRAND.mkdir(parents=True, exist_ok=True)
    rgb = np.asarray(Image.open(REF / "logo.jpeg").convert("RGB")).astype(np.float32)
    lum = rgb.max(axis=2)
    alpha = np.clip((lum - 14) / (210 - 14), 0, 1)
    colour = np.where(alpha[..., None] > 0.01, rgb / np.maximum(alpha[..., None], 1e-3), 0)
    colour = np.clip(colour, 0, 255)

    out = np.dstack([colour, alpha * 255]).astype(np.uint8)
    crimson = trim(Image.fromarray(out, "RGBA"))
    crimson.save(OUT_BRAND / "logo-crimson.webp", quality=92, method=6)

    # Cream knock-out keeps the texture as tone variation in the alpha.
    a = np.asarray(crimson.getchannel("A")).astype(np.float32)
    tone = np.asarray(crimson.convert("L")).astype(np.float32)
    tone = 0.75 + 0.25 * (tone / max(tone.max(), 1))
    cream = np.zeros((*a.shape, 4), np.uint8)
    cream[..., 0], cream[..., 1], cream[..., 2] = 241, 230, 212
    cream[..., 3] = np.clip(np.minimum(a * 1.25, 255) * tone, 0, 255).astype(np.uint8)
    Image.fromarray(cream, "RGBA").save(OUT_BRAND / "logo-cream.webp", quality=92, method=6)
    print("logo    crimson + cream", crimson.size)


if __name__ == "__main__":
    mode = sys.argv[1] if len(sys.argv) > 1 else "--all"
    if mode in ("--all", "--photos"):
        do_photos()
    if mode in ("--all", "--logo"):
        do_logo()
    if mode in ("--all", "--stickers"):
        do_stickers()
