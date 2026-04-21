// Tag → URL slug mapping
// Maps English tags to URL-friendly slugs

import { slugifyStr } from "./slugify";

export const TAG_SLUG_MAP: Record<string, string> = {
  // Five main categories
  Universities: "universities",
  Courses: "courses",
  Visa: "visa",
  Accommodation: "accommodation",
  Life: "life",
  // Common sub-topics
  Application: "application",
  Scholarship: "scholarship",
  Cost: "cost",
  IELTS: "ielts",
  "Pre-sessional": "pre-sessional",
  "Russell Group": "russell-group",
  G5: "g5",
  Undergraduate: "undergraduate",
  Master: "master",
  PhD: "phd",
  London: "london",
};

/** Convert a single tag to its URL slug. Checks mapping table first, otherwise uses generic slugify. */
export const slugifyTag = (tag: string): string => {
  return TAG_SLUG_MAP[tag] ?? slugifyStr(tag);
};

/** Batch version with same interface as slugifyAll. */
export const slugifyTagAll = (tags: string[]): string[] =>
  tags.map(slugifyTag);
