import desktopSlide1 from "../Website Stuffs/Desktop Slide 1 Changed version .png";
import desktopSlide2 from "../Website Stuffs/Desktop slide2 changed version.png";
import desktopSlide3 from "../Website Stuffs/Desktop slide 3 changed version .png";
import giraffeLogo from "../Website Stuffs/giraffe-logo-Photoroom.png";
import categoryTees from "../Website Stuffs/Tees and Henleys.png";
import categoryPolos from "../Website Stuffs/Polos and Shirts .png";
import categoryTrousers from "../Website Stuffs/Trousers and Joggers.png";
import categoryLayers from "../Website Stuffs/Layers and sweatshirts.png";
import luxeEditImage from "../Website Stuffs/Giraffe Luxe Edit .png";
import loyalCollectionImage from "../Website Stuffs/Giraffe Loyal Collection.png";
import trendingCollection1 from "../Website Stuffs/Trending Collections card 1 .png";
import trendingCollection2 from "../Website Stuffs/Trending Collections Card 2.png";
import trendingCollection3 from "../Website Stuffs/Trending Collections card 3 .png";
import modernMonochrome from "../Website Stuffs/Modern Monochrome.png";
import linenEdit from "../Website Stuffs/Linen Edit.png";
import weekendTailoring from "../Website Stuffs/Week end tailoring.png";
import premiumFabricsImage from "../Website Stuffs/Premium Fabrics .png";
import madeWithCareImage from "../Website Stuffs/made with care .png";
import easyReturnImage from "../Website Stuffs/Easy Return .png";
import panIndiaDeliveryImage from "../Website Stuffs/PAN India delivery .png";

export const brandLogo = giraffeLogo;
export const luxeEdit = luxeEditImage;
export const loyalCollection = loyalCollectionImage;
export const premiumFabrics = premiumFabricsImage;
export const madeWithCare = madeWithCareImage;
export const easyReturn = easyReturnImage;
export const panIndiaDelivery = panIndiaDeliveryImage;

export const trendingCollections = [
  trendingCollection1,
  trendingCollection2,
  trendingCollection3,
] as const;

export const materialCards = [
  modernMonochrome,
  linenEdit,
  weekendTailoring,
] as const;

export const categoryImages = {
  tees: categoryTees,
  polos: categoryPolos,
  trousers: categoryTrousers,
  layers: categoryLayers,
} as const;

export const heroSlides = [
  {
    title: "The wardrobe, refined.",
    subtitle: "Modern menswear with considered cuts, elevated textures, and an effortless point of view.",
    desktopImage: desktopSlide1,
    mobileImage: "/hero/mobile-slide-1.png",
    href: "/shop",
    cta: "Shop new releases",
  },
  {
    title: "Everyday pieces. Elevated.",
    subtitle: "Polished essentials designed to move with you from first light to after hours.",
    desktopImage: desktopSlide2,
    mobileImage: "/hero/mobile-slide-2.png",
    href: "/shop?category=shirts",
    cta: "Explore shirts",
  },
  {
    title: "Quiet confidence, cut sharp.",
    subtitle: "Discover precise silhouettes and premium staples made for the way you live now.",
    desktopImage: desktopSlide3,
    mobileImage: "/hero/mobile-slide-3.png",
    href: "/shop?category=trousers",
    cta: "See trousers",
  },
] as const;
