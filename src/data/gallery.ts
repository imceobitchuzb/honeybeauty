export interface GalleryItem {
  id: string;
  title: string;
  category: "all" | "extensions" | "hybrid" | "volume" | "lifts" | "brows" | "studio";
  categoryLabel: string;
  description: string;
  imageUrl: string;
  aspect: "portrait" | "square" | "landscape";
  tag: string;
  note?: string;
}

export const galleryItems: GalleryItem[] = [
  {
    id: "gal-1",
    title: "Dimensional Wispy Hybrid Set",
    category: "hybrid",
    categoryLabel: "Hybrid Lashes",
    description: "Custom mapping combining feathered spikes with airy 3D fans for soft editorial definition.",
    imageUrl: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=1200&q=85",
    aspect: "portrait",
    tag: "Signature Wispy",
  },
  {
    id: "gal-2",
    title: "Keratin Lash Lift & Rich Black Tint",
    category: "lifts",
    categoryLabel: "Lash Lift & Tint",
    description: "Natural lashes curled and lifted from the root with glossy tint enhancement.",
    imageUrl: "https://images.unsplash.com/photo-1588516903720-8ceb67f9ef84?auto=format&fit=crop&w=1200&q=85",
    aspect: "square",
    tag: "Natural Lift",
  },
  {
    id: "gal-3",
    title: "Feathered Brow Lamination & Tint",
    category: "brows",
    categoryLabel: "Brow Artistry",
    description: "Sculpted brow lamination aligning individual hairs into full, brushed-up arches.",
    imageUrl: "https://images.unsplash.com/photo-1597225244660-1cd128c64284?auto=format&fit=crop&w=1200&q=85",
    aspect: "portrait",
    tag: "Brow Sculpt",
  },
  {
    id: "gal-4",
    title: "Refined Classic 1:1 Individual Set",
    category: "extensions",
    categoryLabel: "Lash Extensions",
    description: "Crisp single-lash isolation delivering everyday mascara-free elegance and curl.",
    imageUrl: "https://images.unsplash.com/photo-1583001931096-959e9a1a6223?auto=format&fit=crop&w=1200&q=85",
    aspect: "portrait",
    tag: "Classic Elegance",
  },
  {
    id: "gal-5",
    title: "Velvet Volume Full Set",
    category: "volume",
    categoryLabel: "Volume Lashes",
    description: "Dense, lightweight micro-fans creating a seamless lash line with deep eyeliner effect.",
    imageUrl: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1200&q=85",
    aspect: "portrait",
    tag: "Velvet Volume",
  },
  {
    id: "gal-6",
    title: "Bespoke Facial Architecture & Brow Wax",
    category: "brows",
    categoryLabel: "Brow Artistry",
    description: "Facial contour mapping and precision tweezing to frame delicate features.",
    imageUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=85",
    aspect: "square",
    tag: "Brow Architecture",
  },
  {
    id: "gal-7",
    title: "Lightweight Wet-Lash Styling",
    category: "hybrid",
    categoryLabel: "Hybrid Lashes",
    description: "Glossy closed-fan styling mimicking the dewy look of freshly washed lashes.",
    imageUrl: "https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=1200&q=85",
    aspect: "portrait",
    tag: "Wet-Lash Texture",
  },
  {
    id: "gal-8",
    title: "Loft 28 Sanctuary & Consultation",
    category: "studio",
    categoryLabel: "Studio Aesthetic",
    description: "Quiet, private loft suite at Scottsdale Quarter designed for calm relaxation.",
    imageUrl: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=85",
    aspect: "landscape",
    tag: "Scottsdale Quarter",
  },
  {
    id: "gal-9",
    title: "Fluffy Mega Volume Drama",
    category: "volume",
    categoryLabel: "Volume Lashes",
    description: "Maximum fullness using ultra-fine 0.03mm fans that float weightlessly.",
    imageUrl: "https://images.unsplash.com/photo-1506152983158-b4a74a01c721?auto=format&fit=crop&w=1200&q=85",
    aspect: "portrait",
    tag: "Fluffy Drama",
  },
];
