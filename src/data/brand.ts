export interface BrandConfig {
  name: string;
  tagline: string;
  artist: {
    fullName: string;
    displayName: string;
    title: string;
    experienceLash: string;
    experienceBeauty: string;
    credentials: string[];
    bioShort: string;
    bioLong: string[];
    approach: string;
  };
  location: {
    venue: string;
    suite: string;
    district: string;
    city: string;
    state: string;
    zip: string;
    fullAddress: string;
    mapsUrl: string;
    parkingNote: string;
  };
  links: {
    squareBooking: string;
    instagram: string;
    instagramHandle: string;
    salonLoftsProfile: string;
  };
  meta: {
    title: string;
    description: string;
    keywords: string[];
  };
}

export const brandData: BrandConfig = {
  name: "Flutterhoney",
  tagline: "Soft luxury, personalized lashes and brows.",
  artist: {
    fullName: "Corina Gonzalez",
    displayName: "Corina",
    title: "Lash & Brow Specialist · AZ State Board-Approved Trainer",
    experienceLash: "4+ years lash artistry",
    experienceBeauty: "10+ years beauty industry",
    credentials: [
      "AZ State Board-Approved Lash Trainer",
      "Licensed Lash & Brow Specialist",
      "Over a decade of professional beauty experience",
      "Custom facial framing & bespoke lash mapping",
    ],
    bioShort:
      "Corina Gonzalez is a Scottsdale-based lash and brow specialist with over a decade in beauty and four years dedicated to bespoke lash artistry. Known for customized lash mapping and natural-to-dramatic enhancements, she creates treatments tailored to each client's unique eye anatomy.",
    bioLong: [
      "Welcome to Flutterhoney — where lash and brow artistry is treated as a bespoke craft. Founded by Corina Gonzalez, Flutterhoney was created on the belief that beauty enhancements should flatter your singular features rather than follow rigid, one-size-fits-all templates.",
      "With more than 10 years in the professional beauty industry and 4+ years specializing intensely in advanced lash extension techniques and brow architecture, Corina brings both technical discipline and artistic intuition to every appointment.",
      "As an Arizona State Board-approved lash trainer, Corina is deeply committed to lash health, isolation precision, and customized styling — from feathery natural sets to sculpted brows and multidimensional volume. Every session at Loft 28 in Scottsdale Quarter is a private, calming retreat designed around you.",
    ],
    approach:
      "Every client begins with an eye-shape and lash-health assessment. We choose curl, length, diameter, and styling to complement your natural contours and personal lifestyle.",
  },
  location: {
    venue: "Salon Lofts — Scottsdale Quarter",
    suite: "Loft 28",
    district: "Scottsdale Quarter",
    city: "Scottsdale",
    state: "AZ",
    zip: "85254",
    fullAddress: "15169 N Scottsdale Rd, Loft 28, Scottsdale, AZ 85254",
    mapsUrl: "https://maps.google.com/?q=Salon+Lofts+Scottsdale+Quarter+15169+N+Scottsdale+Rd+Scottsdale+AZ+85254",
    parkingNote: "Complimentary garage parking is available at Scottsdale Quarter, with convenient elevator access directly adjacent to Salon Lofts.",
  },
  links: {
    squareBooking: "https://flutterhoney-lash.square.site/",
    instagram: "https://www.instagram.com/flutterhoney_/",
    instagramHandle: "@flutterhoney_",
    salonLoftsProfile: "https://salonlofts.com/corina_gonzalez",
  },
  meta: {
    title: "Flutterhoney | Bespoke Lashes & Brows by Corina — Scottsdale, AZ",
    description:
      "Luxury lash extensions, lash lifts, and brow artistry by Corina at Scottsdale Quarter. AZ State Board-approved trainer delivering personalized beauty.",
    keywords: [
      "Scottsdale lash extensions",
      "Scottsdale lash lift",
      "brow lamination Scottsdale",
      "Flutterhoney lashes",
      "Corina Gonzalez lashes",
      "Salon Lofts Scottsdale Quarter",
      "luxury lash artist Arizona",
    ],
  },
};
