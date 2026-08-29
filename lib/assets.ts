import desktopSlide1 from "../Website Stuffs/Desktop Slide 1.png";
import desktopSlide2 from "../Website Stuffs/Desktop Slide 2.png";
import desktopSlide3 from "../Website Stuffs/Desktop Slide 3.png";
import giraffeLogo from "../Website Stuffs/Giraffe logo.png";

export const brandLogo = giraffeLogo;

export const heroSlides = [
  {
    title: "Tailored fashion for everyday confidence.",
    subtitle: "A bold full-screen hero with premium visual depth, clean CTA buttons, and a fashion-editorial feel.",
    desktopImage: desktopSlide1,
    mobileImage: "/hero/mobile-slide-1.png",
    href: "/shop",
    cta: "Shop new releases",
  },
  {
    title: "Textured shirts, polos, and layered fits.",
    subtitle: "Designed to move between casual and premium styling without losing polish or comfort.",
    desktopImage: desktopSlide2,
    mobileImage: "/hero/mobile-slide-2.png",
    href: "/shop?category=shirts",
    cta: "Explore shirts",
  },
  {
    title: "Clean cuts. Strong fits. Built for Giraffe.",
    subtitle: "A modern clothing brand landing page should feel like a brand magazine with real shopping intent.",
    desktopImage: desktopSlide3,
    mobileImage: "/hero/mobile-slide-3.png",
    href: "/shop?category=trousers",
    cta: "See trousers",
  },
] as const;
