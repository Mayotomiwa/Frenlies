import { Colors } from "../global/constants/colors";
import { ThemeVariants } from "./types";

export const DEFAULT_THEME: ThemeVariants = {
  light: {
    primary: Colors.main.primary, // #3AE462 green — buttons, active nav, CTAs
    secondary: Colors.main.secondary, // #7B61FF purple — chat bubbles, accents
    header: Colors.neutral.white,
    background: Colors.neutral.white, // #ffffff — app background
    itemBackground: Colors.neutral.white, // #ffffff — card/item surfaces
    layerBackground: Colors.accent.greenLight, // #E8FFF0 subtle green tint — layer backgrounds
    modalBackground: Colors.neutral.white, // #ffffff — modal sheets
    primaryText: Colors.neutral.black, // #1a1a1a — headings, bold labels
    secText: Colors.neutral.gray400, // #8C96A4 — subtext, descriptions
    conText: Colors.neutral.gray500, // #4A5568 — body/content text
    subTitle: Colors.neutral.gray300, // #C8CDD4 — placeholder, disabled labels
    borderColor: Colors.neutral.gray200, // #EAEDF0 — card borders, dividers
    icon: Colors.main.primary, // #3AE462 green — active icons
  },
  dark: {
    primary: Colors.main.primary, // #3AE462 green — stays consistent
    secondary: Colors.main.secondary, // #7B61FF purple
    header: Colors.neutral.dark,
    background: Colors.neutral.dark, // #000000 — dark background
    itemBackground: Colors.neutral.black, // #1a1a1a — dark card surfaces
    layerBackground: Colors.neutral.gray500, // #4A5568 — elevated dark cards
    modalBackground: Colors.neutral.gray500, // #4A5568 — dark modal surface
    primaryText: Colors.neutral.white, // #ffffff — primary text on dark
    secText: Colors.neutral.gray300, // #C8CDD4 — muted text on dark
    conText: Colors.neutral.white, // #ffffff — readable body text
    subTitle: Colors.neutral.gray400, // #8C96A4 — subtle labels
    borderColor: Colors.neutral.gray500, // #4A5568 — dark mode dividers
    icon: Colors.neutral.gray200, // #EAEDF0 — inactive icons on dark
  },
};
