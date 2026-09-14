import os
from PIL import Image
import numpy as np
from scipy.ndimage import label

CANVAS_SIZE = (800, 800)
TARGET_MAX_DIM = 710  # 710px out of 800px leaves 45px padding (88.75% height)

def remove_white_exterior(im: Image.Image, tolerance=20) -> Image.Image:
    im = im.convert("RGBA")
    arr = np.array(im)
    r, g, b, a = arr[:,:,0], arr[:,:,1], arr[:,:,2], arr[:,:,3]

    # Mask of pixels that are near white
    is_white = (r >= 255 - tolerance) & (g >= 255 - tolerance) & (b >= 255 - tolerance) & (a > 200)

    # Label connected components of white
    labeled, num_features = label(is_white)

    # Find which components touch any outer edge
    border_labels = set()
    border_labels.update(labeled[0, :])
    border_labels.update(labeled[-1, :])
    border_labels.update(labeled[:, 0])
    border_labels.update(labeled[:, -1])
    border_labels.discard(0)

    if border_labels:
        ext_mask = np.isin(labeled, list(border_labels))
        # Turn exterior white background transparent
        arr[ext_mask, 3] = 0

    return Image.fromarray(arr)

def process_and_normalize(src_path: str, dst_path: str, is_white_bg=False):
    im = Image.open(src_path)

    if is_white_bg or im.mode == "RGB":
        im = remove_white_exterior(im)
    else:
        im = im.convert("RGBA")

    # Crop tightly to product bounding box
    bbox = im.getbbox()
    if not bbox:
        print(f"Warning: Empty bbox for {src_path}")
        return

    cropped = im.crop(bbox)

    # Scale so that maximum dimension equals TARGET_MAX_DIM
    w, h = cropped.size
    scale = TARGET_MAX_DIM / max(w, h)
    new_w = max(1, int(round(w * scale)))
    new_h = max(1, int(round(h * scale)))

    resized = cropped.resize((new_w, new_h), Image.Resampling.LANCZOS)

    # Create standard 800x800 square canvas
    canvas = Image.new("RGBA", CANVAS_SIZE, (0, 0, 0, 0))

    # Center resized product onto canvas
    paste_x = (CANVAS_SIZE[0] - new_w) // 2
    paste_y = (CANVAS_SIZE[1] - new_h) // 2

    canvas.paste(resized, (paste_x, paste_y), resized)

    # Save as WebP
    os.makedirs(os.path.dirname(dst_path), exist_ok=True)
    canvas.save(dst_path, "WEBP", quality=92)
    print(f"Processed: {os.path.basename(src_path)} -> {os.path.basename(dst_path)} (content: {new_w}x{new_h})")

MAPPING = [
    ("Creatina Monohidrato Doypack (Bolsa) - 300 g.webp", "public/products/creatina-star-300g.webp", False),
    ("Gold Nutrition Creatina Monohidrato Doypack 300g png.png", "public/products/creatina-gold-300g.webp", True),
    ("CreatineM-1Kg_3095f1e3-5758-4f7e-8b63-d49c583050e0.png.webp", "public/products/creatina-star-1000g.webp", False),
    ("One Fit Creatina Monohidrato 200g png.webp", "public/products/creatina-onefit-200g.webp", True),
    ("One Fit Creatina Monohidrato 500g png.webp", "public/products/creatina-onefit-500g.webp", True),
    ("Gold Nutrition Proteina Vegetal Isolate 2 lbs png.png", "public/products/proteina-vegetal-gold-907g.webp", False),
    ("Star Nutrition Collagen Whey Protein 2 lbs png.webp", "public/products/collagen-whey-star-907g.webp", False),
    ("Premium Whey Protein Doypack (Bolsa) - 2 lbs (907 g).webp", "public/products/premium-whey-star-doypack-907g.webp", False),
    ("One Fit Premium Whey Protein 2 lbs png.webp", "public/products/premium-whey-onefit-907g.webp", True),
]

for src_name, dst_path, is_white in MAPPING:
    src = os.path.join("IMAGES", src_name)
    if os.path.exists(src):
        process_and_normalize(src, dst_path, is_white_bg=is_white)
    else:
        print(f"Missing file: {src}")
