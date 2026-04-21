import type { Props } from "astro";
import IconMail from "@/assets/icons/IconMail.svg";
import IconBrandX from "@/assets/icons/IconBrandX.svg";
import IconLinkedin from "@/assets/icons/IconLinkedin.svg";
import IconFacebook from "@/assets/icons/IconFacebook.svg";
import IconCopy from "@/assets/icons/IconCopy.svg";
import { SITE } from "@/config";

interface Social {
  name: string;
  href: string;
  linkTitle: string;
  icon: (_props: Props) => Element;
}

// Site footer / header contact methods
// Currently only Mail enabled; other channels (X / LinkedIn / etc.) can be added when accounts are available
export const SOCIALS: Social[] = [
  {
    name: "Mail",
    href: "mailto:hello@eduuk.org",
    linkTitle: `Contact ${SITE.title}`,
    icon: IconMail,
  },
] as const;

// Article share buttons (appears at end of each article)
// Includes sharing options and link copy functionality
// Special handling in ShareLinks.astro:
//   name === "Copy"   → click copies link to clipboard
export const SHARE_LINKS: Social[] = [
  {
    name: "X",
    href: "https://x.com/intent/post?url=",
    linkTitle: `Share on X (formerly Twitter)`,
    icon: IconBrandX,
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/sharing/share-offsite/?url=",
    linkTitle: `Share on LinkedIn`,
    icon: IconLinkedin,
  },
  {
    name: "Facebook",
    href: "https://www.facebook.com/sharer/sharer.php?u=",
    linkTitle: `Share on Facebook`,
    icon: IconFacebook,
  },
  {
    name: "Mail",
    href: "mailto:?subject=See%20this%20post&body=",
    linkTitle: `Share via email`,
    icon: IconMail,
  },
  {
    name: "Copy",
    href: "#copy-link",
    linkTitle: `Copy link`,
    icon: IconCopy,
  },
] as const;
