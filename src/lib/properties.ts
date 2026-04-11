const CLOUD = "dc6g4e3kf";
const FOLDER = "lake-nottely-stays/chanterelle-shores";
const cldUrl = (publicId: string) =>
  `https://res.cloudinary.com/${CLOUD}/image/upload/w_1600,c_fill,q_auto,f_auto/${FOLDER}/${publicId}.jpg`;

export type Property = {
  slug: string;
  name: string;
  shortDescription: string;
  longDescription: string;
  beds: number;
  baths: number;
  sleeps: number;
  nightlyRate: number;
  cleaningFee: number;
  heroImage: string;
  gallery: string[];
  amenities: string[];
  included: string[];
  ownerNote: string;
  // Hardcoded blocked dates (ISO YYYY-MM-DD). iCal sync later.
  blockedDates: string[];
};

export const properties: Property[] = [
  {
    slug: "dockside-cabin",
    name: "Dockside Cabin",
    shortDescription:
      "A two-bedroom cabin right on the water with a private dock, screened porch, and a fire pit under the pines.",
    longDescription:
      "Wake up to mist rising off the lake and the smell of coffee on the dock. Dockside Cabin sits a dozen steps from the water, with a private dock for swimming and tying up, a screened porch for long mornings, and a fire pit for cool nights. Fully stocked kitchen, fast Wi-Fi, and everything you need for a weekend on Lake Nottely.",
    beds: 2,
    baths: 2,
    sleeps: 6,
    nightlyRate: 245,
    cleaningFee: 125,
    heroImage: "placeholder",
    gallery: ["placeholder"],
    amenities: [
      "Private dock",
      "Screened porch",
      "Fire pit",
      "Full kitchen",
      "Wi-Fi",
      "Washer & dryer",
      "Kayaks included",
      "Charcoal grill",
    ],
    included: [
      "Linens and towels",
      "Coffee, tea, basic pantry",
      "Firewood for the pit",
      "Life jackets and paddles",
    ],
    ownerNote:
      "Hey — I'm Dave, and I've owned Dockside for going on twelve years. My family still stays here a few weekends a year. If anything's off when you arrive, text me — I live fifteen minutes up the road and I'd rather fix it than hear about it later.",
    blockedDates: generateBlockedRange("2026-04-18", "2026-04-22").concat(
      generateBlockedRange("2026-05-09", "2026-05-12"),
      generateBlockedRange("2026-06-05", "2026-06-14")
    ),
  },
  {
    slug: "chanterelle-shores",
    name: "Chanterelle Shores",
    shortDescription:
      "Five bedrooms, 100+ feet of private waterfront, a dock, stone fireplace, and views of protected forest that'll never be built on.",
    longDescription:
      "Chanterelle Shores is a modern lakeside cabin with 100+ feet of private waterfront on Lake Nottely, facing TVA-protected land that will never be developed. Five bedrooms — three on the main floor, two on the basement level — four with lake views, two with private ensuites. The main living area has soaring tongue-and-groove ceilings and a floor-to-ceiling stone wood-burning fireplace. Fully equipped kitchen with gas stove, seating for 12 indoors. Downstairs: a lounge with a huge sectional, flat-screen TV, and game table. Out back: a large covered deck with outdoor dining, two grills, a stone outdoor fireplace, and two complimentary kayaks. Pontoon boat rentals available separately — ask us for details.",
    beds: 5,
    baths: 4,
    sleeps: 12,
    nightlyRate: 575,
    cleaningFee: 300,
    heroImage: cldUrl("photo-02"),
    gallery: [
      cldUrl("photo-02"), cldUrl("photo-03"), cldUrl("photo-05"),
      cldUrl("photo-06"), cldUrl("photo-07"), cldUrl("photo-08"),
      cldUrl("photo-09"), cldUrl("photo-10"), cldUrl("photo-13"),
      cldUrl("photo-14"), cldUrl("photo-15"), cldUrl("photo-16"),
      cldUrl("photo-17"), cldUrl("photo-18"), cldUrl("photo-19"),
      cldUrl("photo-20"), cldUrl("photo-21"), cldUrl("photo-22"),
      cldUrl("photo-23"), cldUrl("photo-24"), cldUrl("photo-25"),
      cldUrl("photo-26"), cldUrl("photo-27"), cldUrl("photo-28"),
      cldUrl("photo-29"), cldUrl("photo-30"), cldUrl("photo-31"),
      cldUrl("photo-32"), cldUrl("photo-33"), cldUrl("photo-34"),
      cldUrl("photo-35"), cldUrl("photo-36"), cldUrl("photo-37"),
      cldUrl("photo-38"), cldUrl("photo-39"), cldUrl("photo-40"),
      cldUrl("photo-41"), cldUrl("photo-42"), cldUrl("photo-43"),
      cldUrl("photo-44"), cldUrl("photo-45"), cldUrl("photo-46"),
      cldUrl("photo-47"), cldUrl("photo-48"), cldUrl("photo-49"),
      cldUrl("photo-52"), cldUrl("photo-63"), cldUrl("photo-64"),
      cldUrl("photo-72"), cldUrl("photo-73"), cldUrl("photo-74"),
    ],
    amenities: [
      "100+ ft private waterfront",
      "Private dock",
      "Wood-burning stone fireplace",
      "Full kitchen with gas stove",
      "Wi-Fi",
      "Washer & dryer",
      "2 kayaks included",
      "2 grills (gas & charcoal)",
      "Covered deck with outdoor dining",
      "Stone outdoor fireplace",
      "Game table & lounge",
      "A/C & central heating",
      "Dog-friendly",
      "Self check-in (keypad)",
      "Free parking",
    ],
    included: [
      "Linens, towels, and extra blankets",
      "Coffee, tea, basic pantry",
      "Life jackets and paddles",
      "Firewood",
      "Shampoo, conditioner, body soap",
    ],
    ownerNote:
      "Hey — I'm Jackie, and David co-hosts with me. We're in Sandy Springs but we're always reachable. If anything's off when you arrive, text us — we respond within the hour and we'd rather fix it than hear about it in a review. The view across to the protected forest is the reason we bought this place. Enjoy it.",
    blockedDates: generateBlockedRange("2026-06-05", "2026-06-09").concat(
      generateBlockedRange("2026-05-22", "2026-05-26"),
      generateBlockedRange("2026-07-02", "2026-07-08")
    ),
  },
];

export function getProperty(slug: string): Property | undefined {
  return properties.find((p) => p.slug === slug);
}

function generateBlockedRange(startISO: string, endISO: string): string[] {
  const out: string[] = [];
  const start = new Date(startISO + "T00:00:00");
  const end = new Date(endISO + "T00:00:00");
  const d = new Date(start);
  while (d <= end) {
    out.push(d.toISOString().slice(0, 10));
    d.setDate(d.getDate() + 1);
  }
  return out;
}
