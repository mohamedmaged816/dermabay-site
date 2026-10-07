"""Grade and crop the raw clinic photos into brand-toned web assets (public/photos/*.webp)."""
from PIL import Image, ImageOps, ImageEnhance, ImageFilter, ImageDraw
import os
SRC = '/Users/MAGED/bay/brand/photos'
OUT = 'public/photos'
os.makedirs(OUT, exist_ok=True)

def _lut(c0, c1, c2):
    """Three-stop LUT: shadows c0 -> midtones c1 -> highlights c2, per channel."""
    lut = []
    for v in range(256):
        t = v / 255
        if t < 0.5:
            a, b, k = c0, c1, t / 0.5
        else:
            a, b, k = c1, c2, (t - 0.5) / 0.5
        lut.append(int(a + (b - a) * k))
    return lut

SHADOW, MID, HIGH = (35, 35, 28), (124, 116, 88), (226, 215, 194)   # forest-deep -> olive -> sand
LUTS = [_lut(SHADOW[i], MID[i], HIGH[i]) for i in range(3)]

def grade(im):
    """Duotone: luminance mapped to forest shadows, olive midtones, sand highlights, with a soft vignette."""
    im = im.convert('RGB')
    im = ImageEnhance.Contrast(im).enhance(1.08)
    g = ImageOps.autocontrast(im.convert('L'), cutoff=1)
    g = ImageEnhance.Brightness(g).enhance(0.92)
    r = g.point(LUTS[0]); gg = g.point(LUTS[1]); b = g.point(LUTS[2])
    im = Image.merge('RGB', (r, gg, b))
    w, h = im.size
    mask = Image.new('L', (w, h), 0)
    d = ImageDraw.Draw(mask)
    d.ellipse((-w * 0.25, -h * 0.25, w * 1.25, h * 1.25), fill=255)
    mask = mask.filter(ImageFilter.GaussianBlur(min(w, h) * 0.25))
    dark = ImageEnhance.Brightness(im).enhance(0.6)
    im = Image.composite(im, dark, mask)
    return im

def crop_box(im, box_frac):
    w, h = im.size
    l, t, r, b = box_frac
    return im.crop((int(l * w), int(t * h), int(r * w), int(b * h)))

def save(im, name, width):
    im = im.copy()
    im.thumbnail((width, 10000))
    im.save(f'{OUT}/{name}.webp', 'WEBP', quality=78, method=6)
    im.save(f'{OUT}/{name}.jpg', 'JPEG', quality=80, optimize=True, progressive=True)
    print(name, im.size, os.path.getsize(f'{OUT}/{name}.webp') // 1024, 'KB')

A = ImageOps.exif_transpose(Image.open(f'{SRC}/PHOTO-2025-05-10-14-16-38 2.jpg'))   # handpiece + goggles
B = ImageOps.exif_transpose(Image.open(f'{SRC}/PHOTO-2025-05-10-14-16-38 3.jpg'))   # device close-up
C = ImageOps.exif_transpose(Image.open(f'{SRC}/PHOTO-2025-05-10-14-16-38.jpg'))     # treatment room

# Portrait crops (3:4-ish) for arches, landscape crops for wide bands
save(grade(crop_box(A, (0.04, 0.22, 0.96, 0.92))), 'handpiece-portrait', 1200)
save(grade(crop_box(A, (0.0, 0.30, 1.0, 0.78))), 'handpiece-wide', 1600)
save(grade(crop_box(B, (0.08, 0.10, 0.98, 0.95))), 'device-portrait', 1200)
save(grade(crop_box(B, (0.0, 0.18, 1.0, 0.70))), 'device-wide', 1600)
save(grade(crop_box(C, (0.08, 0.12, 0.98, 0.98))), 'room-portrait', 1200)
save(grade(crop_box(C, (0.0, 0.28, 1.0, 0.86))), 'room-wide', 1800)
save(grade(crop_box(B, (0.10, 0.18, 0.95, 0.82))), 'device-square', 1200)
save(grade(crop_box(C, (0.15, 0.25, 0.95, 0.85))), 'room-square', 1200)

# contact sheet for review
names = ['handpiece-portrait', 'device-portrait', 'room-portrait', 'handpiece-wide', 'device-wide', 'room-wide']
sheet = Image.new('RGB', (3 * 420, 2 * 420), (45, 45, 35))
for i, n in enumerate(names):
    t = Image.open(f'{OUT}/{n}.jpg'); t.thumbnail((400, 400))
    sheet.paste(t, ((i % 3) * 420 + (420 - t.width) // 2, (i // 3) * 420 + (420 - t.height) // 2))
sheet.save('/Users/MAGED/bay/brand/photos/graded-contact.jpg', quality=85)
