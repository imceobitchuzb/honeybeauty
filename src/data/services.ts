export interface ServiceItem {
  id: string;
  category: "extensions" | "lifts" | "brows" | "waxing";
  categoryLabel: string;
  name: string;
  subtitle: string;
  description: string;
  isSignature?: boolean;
  idealFor: string;
  estimatedDuration?: string;
  priceNote?: string;
  bookingUrl: string;
  features: string[];
  image: string;
}

export interface StylingDirection {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  characteristics: string[];
  bestFor: string;
  image: string;
}

export const servicesData: ServiceItem[] = [
  {
    id: "classic-full-set",
    category: "extensions",
    categoryLabel: "Lash Extensions",
    name: "Classic Custom Full Set",
    subtitle: "Clean, natural definition individual lash application",
    description:
      "A 1:1 individual extension meticulously placed onto each healthy natural lash. Accentuates your natural lash line with effortless length, clean curl, and everyday polish without requiring mascara.",
    isSignature: true,
    idealFor: "Clients wanting refined everyday elegance, natural enhancement, or their first lash extension set.",
    estimatedDuration: "Approx. 1 hr 45 min",
    priceNote: "Verified live on Square",
    bookingUrl: "/book?service=classic-full-set",
    features: [
      "Individual 1:1 lash mapping",
      "Custom curl selection (C, CC, D curls)",
      "Lightweight medical-grade adhesive",
      "Preserves natural lash integrity",
    ],
    image:
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "hybrid-textured-set",
    category: "extensions",
    categoryLabel: "Lash Extensions",
    name: "Hybrid / Wispy Full Set",
    subtitle: "Textured depth combining classic singles & delicate handmade fans",
    description:
      "An artful blend of classic single lashes and soft lightweight volume fans. Delivers a multidimensional, wispy, feathered look with airy fullness and textured peaks tailored to your eye shape.",
    isSignature: true,
    idealFor: "Those desiring subtle drama, fluttery texture, and a soft Kim-K inspired wispy dimension.",
    estimatedDuration: "Approx. 2 hours",
    priceNote: "Verified live on Square",
    bookingUrl: "/book?service=hybrid-textured-set",
    features: [
      "Custom blend of classic & volume fans",
      "Staggered lengths for natural wispiness",
      "Flattering open-eye or doll-eye mapping",
      "Lightweight feel with enhanced fullness",
    ],
    image:
      "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "volume-full-set",
    category: "extensions",
    categoryLabel: "Lash Extensions",
    name: "Volume / Luxury Full Set",
    subtitle: "Dense, velvety fullness created with featherweight micro-fans",
    description:
      "Handcrafted fans of ultra-fine, lightweight extensions fanned out across each natural lash. Creates a lush, dense lash line with dark, velvety depth while maintaining complete comfort and lash safety.",
    isSignature: true,
    idealFor: "Clients with sparse natural lashes seeking fullness, or anyone who loves a glamorous, plush lash line.",
    estimatedDuration: "Approx. 2 hr 15 min",
    priceNote: "Verified live on Square",
    bookingUrl: "/book?service=volume-full-set",
    features: [
      "Bespoke handmade multi-lash fans",
      "Deep, rich, uniform lash line",
      "Ultra-fine diameters (0.03–0.07mm) for zero weight",
      "Maximum retention with proper aftercare",
    ],
    image:
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "lash-extension-fill",
    category: "extensions",
    categoryLabel: "Lash Maintenance",
    name: "Lash Extension Refill",
    subtitle: "2–3 week routine maintenance & lash health renewal",
    description:
      "Careful removal of outgrown extensions, deep cleanse of the lash line, and fresh application of new extensions to newly matured natural lashes to restore your original fullness.",
    idealFor: "Existing clients maintaining their Classic, Hybrid, or Volume set every 2 to 3 weeks.",
    estimatedDuration: "Approx. 60–75 min",
    priceNote: "Verified live on Square",
    bookingUrl: "/book?service=lash-extension-fill",
    features: [
      "Gentle removal of grown-out lashes",
      "Lash bath & pH preparation",
      "Fresh fan and single placement",
      "Maintains continuous lash health",
    ],
    image:
      "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "keratin-lash-lift-tint",
    category: "lifts",
    categoryLabel: "Lash Lift & Tint",
    name: "Keratin Lash Lift & Deep Tint",
    subtitle: "Upward curl and dark definition for your natural lashes",
    description:
      "An advanced semi-permanent lifting treatment that curls and lifts your natural lashes from root to tip. Finished with a rich, glossy tint for a wide-eyed, mascara-free look lasting 6 to 8 weeks.",
    isSignature: true,
    idealFor: "Clients wanting a low-maintenance, zero-extension enhancement that celebrates their natural lashes.",
    estimatedDuration: "Approx. 60 min",
    priceNote: "Verified live on Square",
    bookingUrl: "/book?service=keratin-lash-lift-tint",
    features: [
      "Custom silicone shield sizing for tailored curl",
      "Keratin infusion to nourish lash cuticles",
      "Glossy deep black or dark brown tint",
      "Low maintenance results lasting 6–8 weeks",
    ],
    image:
      "https://images.unsplash.com/photo-1588516903720-8ceb67f9ef84?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "brow-lamination-sculpt",
    category: "brows",
    categoryLabel: "Brow Artistry",
    name: "Signature Brow Lamination & Sculpt",
    subtitle: "Fluffy, uniform brow hairs repositioned for tailored symmetry",
    description:
      "A gentle chemical process that softens brow hair bonds to redirect and set them in an upward, brushed-up shape. Creates the look of fuller, fluffier, symmetrical arches that stay in place.",
    isSignature: true,
    idealFor: "Clients with stubborn, downward-growing hairs, thin arches, or anyone seeking a clean editorial feather brow.",
    estimatedDuration: "Approx. 50 min",
    priceNote: "Verified live on Square",
    bookingUrl: "/book?service=brow-lamination-sculpt",
    features: [
      "Hair alignment & cuticle conditioning",
      "Precision tweezing & clean trimming",
      "Fuller appearance without microblading",
      "Lasts 6 to 8 weeks with conditioning oil",
    ],
    image:
      "https://images.unsplash.com/photo-1597225244660-1cd128c64284?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "brow-shaping-tint",
    category: "brows",
    categoryLabel: "Brow Artistry",
    name: "Bespoke Brow Shaping & Tint",
    subtitle: "Custom architectural mapping, waxing, and tint definition",
    description:
      "Complete brow architecture based on your facial structure. Includes gentle waxing, tweezing, precise trimming, and semi-permanent color tinting to define your natural arch line.",
    idealFor: "Refining natural brow shape, enhancing blonde or light hairs, and framing the face with crisp elegance.",
    estimatedDuration: "Approx. 35 min",
    priceNote: "Verified live on Square",
    bookingUrl: "/book?service=brow-shaping-tint",
    features: [
      "Facial bone-structure brow mapping",
      "Gentle wax formulated for sensitive skin",
      "Custom color tint matching hair undertones",
      "Clean, long-lasting contour",
    ],
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "facial-waxing-grooming",
    category: "waxing",
    categoryLabel: "Waxing & Grooming",
    name: "Precision Facial Waxing",
    subtitle: "Gentle lip, chin, and facial perimeter hair removal",
    description:
      "Gentle, hypoallergenic wax treatment designed for delicate facial skin. Removes fine peach fuzz and unwanted hair cleanly, leaving the skin smooth and prepped for flawless skincare and makeup.",
    idealFor: "Smooth facial canvas, pre-event grooming, or sensitive skin waxing.",
    estimatedDuration: "Approx. 20 min",
    priceNote: "Verified live on Square",
    bookingUrl: "/book?service=facial-waxing-grooming",
    features: [
      "Low-temperature gentle waxing formula",
      "Calming post-wax soothing botanicals",
      "Leaves skin ultra-smooth and clear",
      "Quick add-on to any lash or brow service",
    ],
    image:
      "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=1200&q=80",
  },
];

export const stylingDirections: StylingDirection[] = [
  {
    id: "natural-classic",
    name: "Soft & Natural",
    subtitle: "Effortless, clean elegance",
    description:
      "Follows your natural lash curve with single lightweight extensions. Ideal for everyday polish, a clean office or gym look, and first-time lash clients.",
    characteristics: ["1:1 Single Placement", "Subtle Curl & Natural Length", "Undetectable Bond Line", "Zero Weight Feel"],
    bestFor: "First-timers, active lifestyles, professional everyday aesthetic",
    image:
      "https://images.unsplash.com/photo-1583001931096-959e9a1a6223?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "wispy-hybrid",
    name: "Wispy & Textured",
    subtitle: "Dimensional, feathered peaks",
    description:
      "Combines varying lengths and multi-fan textures to create the coveted wispy, fluttery effect with airy depth and open-eye radiance.",
    characteristics: ["Alternating Spikes & Fans", "Kim-K Inspired Texture", "Eye-Opening Lift", "Fluffy Feathered Ends"],
    bestFor: "Clients wanting modern editorial texture, dimension, and flattering flutter",
    image:
      "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "full-volume",
    name: "Plush Volume",
    subtitle: "Velvety depth & rich lash line",
    description:
      "Soft handmade micro-fans spanning each lash for a rich, dark, seamless lash line that frames the eyes like velvet eyeliner.",
    characteristics: ["Ultra-Lightweight Micro Fans", "Dense Eyeliner Illusion", "Luxurious Drama", "Even Gradient Mapping"],
    bestFor: "Event beauty, sparse lash lines requiring density, glamour lovers",
    image:
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "lift-lamination",
    name: "Lift & Lamination",
    subtitle: "Effortless low-maintenance natural glory",
    description:
      "Your own natural lashes and brows curled, tinted, and brushed upward for 6 to 8 weeks of makeup-free wake-up-and-go beauty.",
    characteristics: ["Zero Extensions Required", "Keratin Nourishment", "Up to 8 Weeks Wear", "Brushed Up Model Brow"],
    bestFor: "Natural beauty enthusiasts, travelers, low-maintenance routines",
    image:
      "https://images.unsplash.com/photo-1588516903720-8ceb67f9ef84?auto=format&fit=crop&w=800&q=80",
  },
];
