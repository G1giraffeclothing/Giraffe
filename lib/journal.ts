import type { StaticImageData } from "next/image";
import {
  categoryImages,
  easyReturn,
  heroSlides,
  madeWithCare,
  materialCards,
  panIndiaDelivery,
  premiumFabrics,
  trendingCollections,
} from "@/lib/assets";

export type JournalCategory = "style-guides" | "how-to-wear" | "giraffe-edit" | "stories";
export type JournalImage = StaticImageData | string;

export type JournalSection =
  | { type: "paragraph"; text: string }
  | { type: "heading"; text: string }
  | { type: "quote"; text: string }
  | { type: "image"; src: JournalImage; alt: string; caption?: string }
  | { type: "split"; title: string; text: string; src: JournalImage; alt: string };

export type JournalArticle = {
  slug: string;
  title: string;
  category: JournalCategory;
  excerpt: string;
  heroImage: JournalImage;
  cardImage: JournalImage;
  date: string;
  readTime: string;
  featured?: boolean;
  relatedSlugs: string[];
  content: JournalSection[];
};

export const journalCategoryLabels: Record<JournalCategory, string> = {
  "style-guides": "Style Guides",
  "how-to-wear": "How to Wear",
  "giraffe-edit": "The Giraffe Edit",
  stories: "Stories",
};

const journalContentBySlug: Record<string, JournalSection[]> = {
  "building-a-timeless-wardrobe": [
    { type: "paragraph", text: "A timeless wardrobe is built in layers: a reliable base, a few pieces with character, and enough restraint for everything to work together." },
    { type: "heading", text: "Start with the quiet essentials" },
    { type: "paragraph", text: "Begin with a well-cut trouser, an ivory shirt, a polo in a deep neutral and one easy layer. These are the pieces that create rhythm across a week without asking to be noticed." },
    { type: "image", src: materialCards[0], alt: "Neutral menswear arranged in a refined wardrobe edit", caption: "A wardrobe built around texture, proportion and repeat wear." },
    { type: "heading", text: "Let repetition become personal" },
    { type: "quote", text: "Style becomes yours when the right pieces begin to feel inevitable." },
    { type: "paragraph", text: "The aim is not to own more. It is to know which silhouettes make your mornings easier, which fabrics improve with time, and which details you return to without thinking." },
  ],
  "a-guide-to-linen": [
    { type: "paragraph", text: "Linen has a generosity to it. It breathes, softens and gathers the marks of a day without losing its composure." },
    { type: "heading", text: "Read the weave" },
    { type: "paragraph", text: "The best linen has visible texture and a dry, cool hand. Its slight irregularity is part of its beauty: a sign of natural fibre rather than a flaw to be corrected." },
    { type: "image", src: premiumFabrics, alt: "Warm neutral linen cloth in natural light", caption: "Texture is the first language of linen." },
    { type: "heading", text: "Wear the ease" },
    { type: "split", title: "A fabric that moves", text: "Keep the rest of the outfit clean and let linen do what it does best: create a soft sense of movement around the body.", src: materialCards[1], alt: "Natural linen edit in warm sunlight" },
    { type: "paragraph", text: "A relaxed collar, an easy trouser and a muted palette are enough. Linen does not need to be over-styled." },
  ],
  "finding-the-right-trouser-fit": [
    { type: "paragraph", text: "Trousers set the posture of an outfit. The rise, line through the thigh and amount of break decide whether the look feels composed or distracted." },
    { type: "heading", text: "Begin with the rise" },
    { type: "paragraph", text: "A comfortable rise lets the waistband sit where the body naturally narrows. From there, the leg should fall cleanly without pulling across the seat or collapsing at the ankle." },
    { type: "image", src: categoryImages.trousers, alt: "Tailored trousers in a warm neutral editorial setting", caption: "A clean trouser line gives the rest of the outfit room." },
    { type: "heading", text: "Check the movement" },
    { type: "quote", text: "The right fit is felt first in motion, then seen in the mirror." },
    { type: "paragraph", text: "Sit, walk and reach before deciding. Comfort is not an afterthought in a refined trouser; it is part of the silhouette." },
  ],
  "understanding-neutral-colours": [
    { type: "paragraph", text: "Neutral dressing is not about playing it safe. It is a study in temperature, depth and the contrast created by different surfaces." },
    { type: "heading", text: "Build from one quiet anchor" },
    { type: "paragraph", text: "Start with one dominant tone—ivory, charcoal or espresso—and add nearby shades rather than matching everything exactly." },
    { type: "image", src: trendingCollections[1], alt: "Tonal neutral fabrics and clothing arranged together", caption: "Soft contrast keeps a neutral palette alive." },
    { type: "heading", text: "Texture does the talking" },
    { type: "split", title: "Depth without noise", text: "Linen against cotton, brushed fleece against crisp poplin, and matte tailoring beside a subtle sheen create interest without bright colour.", src: materialCards[2], alt: "Neutral fabrics layered with tonal contrast" },
  ],
  "three-ways-to-wear-an-espresso-polo": [
    { type: "paragraph", text: "The espresso polo sits between casual and considered. That makes it a natural starting point for three very different moments." },
    { type: "heading", text: "01 — The weekend line" },
    { type: "paragraph", text: "Wear it with a relaxed trouser and clean loafer. Leave the collar open and keep the palette warm." },
    { type: "image", src: categoryImages.polos, alt: "Espresso polo styled for relaxed menswear", caption: "A polo with enough structure to carry the day." },
    { type: "heading", text: "02 — The sharper layer" },
    { type: "paragraph", text: "Add an unlined overshirt or soft jacket. A tucked front and a darker trouser bring the same polo into evening." },
    { type: "heading", text: "03 — Tonal after hours" },
    { type: "quote", text: "One good polo can carry more of the day than you expect." },
  ],
  "how-to-style-linen-trousers": [
    { type: "paragraph", text: "Linen trousers set the pace for an outfit. The rest is about balancing their relaxed texture with clean, intentional lines." },
    { type: "heading", text: "Keep the top half light" },
    { type: "paragraph", text: "An open-collar shirt, fine-gauge knit or simple tee lets the trouser breathe. Avoid too many hard edges at once." },
    { type: "image", src: materialCards[1], alt: "Linen trousers styled in warm neutral tones", caption: "Warm neutrals make linen feel effortless, not precious." },
    { type: "heading", text: "Use the shoe to set the mood" },
    { type: "split", title: "Ease, with intention", text: "A loafer sharpens the look; a minimal sneaker relaxes it. The trouser remains the constant through both choices.", src: premiumFabrics, alt: "Linen fabric and warm neutral styling details" },
  ],
  "from-day-to-evening": [
    { type: "paragraph", text: "The best day-to-evening wardrobe does not ask for a full change. It asks for a sharper layer, a deeper tone and one deliberate adjustment." },
    { type: "heading", text: "Make the first look adaptable" },
    { type: "paragraph", text: "Begin with a clean base: a light shirt, tailored trouser and comfortable shoe. Keep the proportions calm so a single layer can shift the mood." },
    { type: "image", src: heroSlides[1].desktopImage, alt: "Layered menswear look in a warm architectural setting", caption: "A considered layer changes the register without changing the person." },
    { type: "heading", text: "The evening adjustment" },
    { type: "quote", text: "The quietest change is often the one that makes the biggest difference." },
    { type: "paragraph", text: "Swap in an espresso or charcoal layer, refine the collar and let the accessories recede. The result should feel like the same outfit, only more resolved." },
  ],
  "the-monochrome-approach": [
    { type: "paragraph", text: "Tonal dressing creates space for shape. When colour steps back, the silhouette, texture and finishing come forward." },
    { type: "heading", text: "Choose a narrow tonal range" },
    { type: "paragraph", text: "Charcoal with black, or stone with oatmeal, gives the eye a clear line without flattening the outfit." },
    { type: "image", src: materialCards[2], alt: "Dark tonal menswear styling with a clean silhouette", caption: "Monochrome is defined by nuance, not sameness." },
    { type: "heading", text: "Break the surface, not the mood" },
    { type: "split", title: "Texture creates the contrast", text: "Mix a dry knit with a smooth trouser, or brushed cotton with a crisp shirt. Small differences keep tonal dressing from feeling flat.", src: heroSlides[2].desktopImage, alt: "Dark tonal menswear in a clean silhouette" },
  ],
  "the-quiet-art-of-dressing-well": [
    { type: "paragraph", text: "Thoughtful dressing is not a performance. It is a private agreement between the person wearing a garment and the life they want it to support." },
    { type: "heading", text: "A wardrobe with a point of view" },
    { type: "paragraph", text: "The strongest clothes do not ask to be explained. They sit well, move with ease and leave space for the person inside them." },
    { type: "image", src: madeWithCare, alt: "Giraffe garment detail showing considered finishing", caption: "The quiet art is found in the finishing." },
    { type: "quote", text: "Good clothing should feel considered before it ever feels noticeable." },
    { type: "heading", text: "Choose what can stay" },
    { type: "paragraph", text: "Relevance beyond a season is not an accident. It comes from proportion, fabric and the confidence to leave out what does not belong." },
  ],
  "the-monochrome-edit": [
    { type: "paragraph", text: "There is an elegance to restraint. Charcoal, black and soft grey let the architecture of an outfit do the talking." },
    { type: "heading", text: "A darker kind of clarity" },
    { type: "paragraph", text: "The monochrome edit is not one colour repeated. It is a conversation between matte and shine, hard and soft, close and distant tones." },
    { type: "image", src: trendingCollections[2], alt: "Monochrome menswear edit in charcoal and soft neutrals", caption: "Charcoal creates depth without demanding attention." },
    { type: "heading", text: "The line of the silhouette" },
    { type: "split", title: "Let the cut lead", text: "A clean trouser, a precise shoulder and one quiet layer create enough movement inside a restrained palette.", src: materialCards[0], alt: "Charcoal and neutral menswear edit" },
  ],
  "the-linen-edit": [
    { type: "paragraph", text: "The linen edit is an invitation to slow down: to choose a little less structure, a little more air, and texture that becomes richer with time." },
    { type: "heading", text: "Natural texture, relaxed structure" },
    { type: "paragraph", text: "Linen works best when it is allowed to crease softly and move naturally. Pair it with pieces that share its quiet confidence." },
    { type: "image", src: premiumFabrics, alt: "Layered beige and ivory linen fabric", caption: "The beauty of linen is its honest surface." },
    { type: "heading", text: "A summer palette without a theme" },
    { type: "quote", text: "The most effortless summer dressing leaves room for the air around it." },
    { type: "paragraph", text: "Ivory, oat, tobacco and washed charcoal create a palette that feels warm in the sun and grounded after it sets." },
  ],
  "objects-of-everyday-distinction": [
    { type: "paragraph", text: "Distinction lives in the details we notice slowly: a well-finished seam, a button with the right weight, a fabric chosen for how it will age." },
    { type: "heading", text: "The things hands remember" },
    { type: "paragraph", text: "A garment is experienced through touch before it is understood visually. The inside finish, the edge of a cuff and the fall of a hem all leave an impression." },
    { type: "image", src: easyReturn, alt: "Considered garment and packaging details", caption: "Everyday distinction is built from small decisions." },
    { type: "heading", text: "Useful can still be beautiful" },
    { type: "split", title: "Details with a reason", text: "The best details do more than decorate. They improve movement, hold a line or make a familiar ritual feel a little more considered.", src: madeWithCare, alt: "Giraffe garment detail and finishing" },
  ],
  "why-we-started-giraffe": [
    { type: "paragraph", text: "Giraffe began with a simple belief: everyday clothing can have more intention without asking for more effort." },
    { type: "heading", text: "The everyday deserves attention" },
    { type: "paragraph", text: "We wanted to make clothes that meet the actual pace of a day—commutes, long lunches, late plans and the quiet hours in between." },
    { type: "image", src: heroSlides[2].desktopImage, alt: "Giraffe clothing detail in an atelier-inspired setting", caption: "A brand shaped by the ordinary moments it dresses." },
    { type: "heading", text: "A slower kind of growth" },
    { type: "quote", text: "The point was never to add more noise to the wardrobe." },
    { type: "paragraph", text: "Giraffe is still learning what it means to make something people return to. That learning is part of the story." },
  ],
  "behind-the-fabric": [
    { type: "paragraph", text: "Fabric is where a garment begins. We look for texture that rewards touch, weight that gives shape and comfort that lasts beyond first wear." },
    { type: "heading", text: "Start with the hand" },
    { type: "paragraph", text: "A fabric can look beautiful on a screen and still feel wrong in the hand. We pay attention to density, recovery and the way light moves across the surface." },
    { type: "image", src: premiumFabrics, alt: "Close-up of tactile premium fabrics", caption: "The first test is always the feel." },
    { type: "heading", text: "Material is part of the silhouette" },
    { type: "split", title: "Weight gives shape", text: "A soft cloth can create movement; a denser one can hold a cleaner line. Choosing between them changes how a garment lives on the body.", src: materialCards[1], alt: "Natural fabric texture in warm light" },
  ],
  "made-with-care": [
    { type: "paragraph", text: "Care is often invisible. It is found in how a shoulder sits, how a hem falls and how a garment feels after a full day in it." },
    { type: "heading", text: "Fit is a sequence of decisions" },
    { type: "paragraph", text: "A good fit begins before the final stitch: in the balance between ease, proportion and the way a body moves through a garment." },
    { type: "image", src: madeWithCare, alt: "Premium shirt finishing and garment construction", caption: "Finishing is where intention becomes tangible." },
    { type: "heading", text: "The finish you do not notice" },
    { type: "quote", text: "When construction is right, comfort becomes almost invisible." },
    { type: "paragraph", text: "That is the standard we return to: pieces that feel calm from the first wear and more familiar with every wear after." },
  ],
  "building-giraffe": [
    { type: "paragraph", text: "Building Giraffe is an ongoing conversation between what we have learned, what we want to improve and the everyday lives our clothes enter." },
    { type: "heading", text: "A brand in progress" },
    { type: "paragraph", text: "The work is practical as much as it is visual: refining a pattern, listening to a customer, adjusting a fabric and making the next version a little clearer." },
    { type: "image", src: panIndiaDelivery, alt: "Giraffe package prepared with care", caption: "The brand grows through the details of delivery, wear and return." },
    { type: "heading", text: "What comes next" },
    { type: "split", title: "Keep the standard, keep moving", text: "The direction stays steady: more useful pieces, better materials and a wardrobe that feels coherent from one season to the next.", src: easyReturn, alt: "Giraffe packaging prepared with care" },
  ],
};

const makeArticle = (article: Omit<JournalArticle, "content" | "relatedSlugs"> & { thought: string; bodyImage: JournalImage; bodyAlt: string; relatedSlugs?: string[] }): JournalArticle => {
  const { thought: _thought, bodyImage: _bodyImage, bodyAlt: _bodyAlt, ...details } = article;
  void _thought;
  void _bodyImage;
  void _bodyAlt;
  return { ...details, relatedSlugs: article.relatedSlugs ?? [], content: journalContentBySlug[details.slug] };
};

export const journalArticles: JournalArticle[] = [
  makeArticle({
    slug: "building-a-timeless-wardrobe",
    title: "Building a Timeless Menswear Wardrobe",
    category: "style-guides",
    excerpt: "The essential pieces that form the foundation of a refined everyday wardrobe.",
    heroImage: heroSlides[0].desktopImage,
    cardImage: categoryImages.polos,
    date: "07 September 2026",
    readTime: "6 MIN READ",
    featured: true,
    thought: "A timeless wardrobe is not a long list. It is a small, deliberate collection of pieces that work together, feel good in motion, and become more personal with wear.",
    bodyImage: materialCards[0],
    bodyAlt: "Neutral menswear arranged in a refined wardrobe edit",
  }),
  makeArticle({
    slug: "a-guide-to-linen",
    title: "A Guide to Linen",
    category: "style-guides",
    excerpt: "Understanding the texture, breathability and character that make linen a warm-weather essential.",
    heroImage: premiumFabrics,
    cardImage: premiumFabrics,
    date: "02 September 2026",
    readTime: "5 MIN READ",
    thought: "Linen has a generosity to it. It breathes, softens, and develops a lived-in character without losing its composure.",
    bodyImage: materialCards[1],
    bodyAlt: "Warm neutral linen cloth in natural light",
  }),
  makeArticle({
    slug: "finding-the-right-trouser-fit",
    title: "Finding the Right Trouser Fit",
    category: "style-guides",
    excerpt: "How proportion, rise and silhouette influence the way an outfit feels.",
    heroImage: categoryImages.trousers,
    cardImage: categoryImages.trousers,
    date: "28 August 2026",
    readTime: "4 MIN READ",
    thought: "The right trouser should give an outfit its rhythm. Rise, drape and break work together before colour or styling enters the conversation.",
    bodyImage: trendingCollections[2],
    bodyAlt: "Tailored trousers in a warm neutral editorial setting",
  }),
  makeArticle({
    slug: "understanding-neutral-colours",
    title: "Understanding Neutral Colours",
    category: "style-guides",
    excerpt: "A simple approach to combining ivory, beige, brown, charcoal and muted tones.",
    heroImage: materialCards[0],
    cardImage: materialCards[0],
    date: "21 August 2026",
    readTime: "4 MIN READ",
    thought: "Neutral dressing is not about playing it safe. It is about giving texture, proportion and subtle contrast enough room to speak.",
    bodyImage: trendingCollections[1],
    bodyAlt: "Tonal neutral fabrics and clothing arranged together",
  }),
  makeArticle({
    slug: "three-ways-to-wear-an-espresso-polo",
    title: "Three Ways to Wear an Espresso Polo",
    category: "how-to-wear",
    excerpt: "From relaxed weekends to refined evenings, one polo styled three ways.",
    heroImage: categoryImages.polos,
    cardImage: categoryImages.polos,
    date: "04 September 2026",
    readTime: "5 MIN READ",
    thought: "An espresso polo has the ease of a T-shirt and the presence of a shirt. That tension makes it one of the most useful pieces in a considered wardrobe.",
    bodyImage: heroSlides[1].desktopImage,
    bodyAlt: "Menswear look styled for an understated evening",
  }),
  makeArticle({
    slug: "how-to-style-linen-trousers",
    title: "How to Style Linen Trousers",
    category: "how-to-wear",
    excerpt: "Balancing texture, colour and proportion for effortless warm-weather dressing.",
    heroImage: materialCards[1],
    cardImage: materialCards[1],
    date: "30 August 2026",
    readTime: "4 MIN READ",
    thought: "Linen trousers set the pace for an outfit. The rest is a question of balancing their relaxed texture with clean, intentional lines.",
    bodyImage: premiumFabrics,
    bodyAlt: "Linen fabric folds in warm afternoon light",
  }),
  makeArticle({
    slug: "from-day-to-evening",
    title: "From Day to Evening",
    category: "how-to-wear",
    excerpt: "Simple changes that transform a relaxed daytime outfit into an evening look.",
    heroImage: heroSlides[1].desktopImage,
    cardImage: heroSlides[1].desktopImage,
    date: "24 August 2026",
    readTime: "4 MIN READ",
    thought: "The best day-to-evening wardrobe does not ask for a full change. It asks for a sharper layer, a deeper tone, and one or two deliberate adjustments.",
    bodyImage: categoryImages.layers,
    bodyAlt: "Layered menswear look in a warm architectural setting",
  }),
  makeArticle({
    slug: "the-monochrome-approach",
    title: "The Monochrome Approach",
    category: "how-to-wear",
    excerpt: "How tonal dressing creates a cleaner, more confident silhouette.",
    heroImage: materialCards[2],
    cardImage: materialCards[2],
    date: "17 August 2026",
    readTime: "3 MIN READ",
    thought: "Tonal dressing creates space for shape. When colour steps back, the silhouette, texture and finishing come forward.",
    bodyImage: heroSlides[2].desktopImage,
    bodyAlt: "Dark tonal menswear styling with a clean silhouette",
  }),
  makeArticle({
    slug: "the-quiet-art-of-dressing-well",
    title: "The Quiet Art of Dressing Well",
    category: "giraffe-edit",
    excerpt: "Why thoughtful clothing often speaks more softly.",
    heroImage: heroSlides[0].desktopImage,
    cardImage: trendingCollections[0],
    date: "07 September 2026",
    readTime: "6 MIN READ",
    featured: true,
    thought: "Thoughtful dressing is not a performance. It is a private agreement between the person wearing a garment and the life they want it to support.",
    bodyImage: madeWithCare,
    bodyAlt: "Giraffe garment detail showing considered finishing",
  }),
  makeArticle({
    slug: "the-monochrome-edit",
    title: "The Monochrome Edit",
    category: "giraffe-edit",
    excerpt: "A study in charcoal, black and tonal dressing.",
    heroImage: trendingCollections[2],
    cardImage: trendingCollections[2],
    date: "31 August 2026",
    readTime: "5 MIN READ",
    thought: "There is an elegance to restraint. Charcoal, black and soft grey let the architecture of an outfit do the talking.",
    bodyImage: materialCards[0],
    bodyAlt: "Monochrome menswear edit in charcoal and soft neutrals",
  }),
  makeArticle({
    slug: "the-linen-edit",
    title: "The Linen Edit",
    category: "giraffe-edit",
    excerpt: "Natural texture, relaxed structure and effortless summer dressing.",
    heroImage: materialCards[1],
    cardImage: premiumFabrics,
    date: "26 August 2026",
    readTime: "5 MIN READ",
    thought: "The linen edit is an invitation to slow down: to choose a little less structure, a little more air, and texture that becomes richer with time.",
    bodyImage: premiumFabrics,
    bodyAlt: "Layered beige and ivory linen fabric",
  }),
  makeArticle({
    slug: "objects-of-everyday-distinction",
    title: "Objects of Everyday Distinction",
    category: "giraffe-edit",
    excerpt: "A closer look at the details that transform ordinary pieces into considered essentials.",
    heroImage: madeWithCare,
    cardImage: madeWithCare,
    date: "19 August 2026",
    readTime: "4 MIN READ",
    thought: "Distinction lives in the details we notice slowly: a well-finished seam, a button with the right weight, a fabric chosen for how it will age.",
    bodyImage: easyReturn,
    bodyAlt: "Considered garment and packaging details",
  }),
  makeArticle({
    slug: "why-we-started-giraffe",
    title: "Why We Started Giraffe Clothing",
    category: "stories",
    excerpt: "A belief that everyday menswear can feel considered without becoming complicated.",
    heroImage: heroSlides[2].desktopImage,
    cardImage: heroSlides[2].desktopImage,
    date: "05 September 2026",
    readTime: "6 MIN READ",
    thought: "Giraffe began with a simple belief: everyday clothing can have more intention without asking for more effort.",
    bodyImage: madeWithCare,
    bodyAlt: "Giraffe clothing detail in an atelier-inspired setting",
  }),
  makeArticle({
    slug: "behind-the-fabric",
    title: "Behind the Fabric",
    category: "stories",
    excerpt: "A closer look at texture, material selection and the details we pay attention to.",
    heroImage: premiumFabrics,
    cardImage: premiumFabrics,
    date: "29 August 2026",
    readTime: "5 MIN READ",
    thought: "Fabric is where a garment begins. We look for texture that rewards touch, weight that gives shape, and comfort that lasts beyond first wear.",
    bodyImage: premiumFabrics,
    bodyAlt: "Close-up of tactile premium fabrics",
  }),
  makeArticle({
    slug: "made-with-care",
    title: "Made With Care",
    category: "stories",
    excerpt: "The thought behind fit, finishing and construction.",
    heroImage: madeWithCare,
    cardImage: madeWithCare,
    date: "22 August 2026",
    readTime: "4 MIN READ",
    thought: "Care is often invisible. It is found in how a shoulder sits, how a hem falls, and how a garment feels after a full day in it.",
    bodyImage: categoryImages.polos,
    bodyAlt: "Premium shirt finishing and garment construction",
  }),
  makeArticle({
    slug: "building-giraffe",
    title: "Building Giraffe",
    category: "stories",
    excerpt: "The evolving story behind the brand and the philosophy shaping what comes next.",
    heroImage: panIndiaDelivery,
    cardImage: panIndiaDelivery,
    date: "15 August 2026",
    readTime: "5 MIN READ",
    thought: "Building Giraffe is an ongoing conversation between what we have learned, what we want to improve, and the everyday lives our clothes enter.",
    bodyImage: easyReturn,
    bodyAlt: "Giraffe package prepared with care",
  }),
];

export const journalCategories = Object.entries(journalCategoryLabels).map(([slug, label]) => ({ slug: slug as JournalCategory, label }));

export function getJournalArticle(slug: string) {
  return journalArticles.find((article) => article.slug === slug);
}

export function getJournalArticlesByCategory(category?: string) {
  if (!category || category === "all") return journalArticles;
  return journalArticles.filter((article) => article.category === category);
}

const curatedRelatedSlugs: Record<string, string[]> = {
  "building-a-timeless-wardrobe": ["finding-the-right-trouser-fit", "understanding-neutral-colours", "the-quiet-art-of-dressing-well"],
  "a-guide-to-linen": ["the-linen-edit", "how-to-style-linen-trousers", "behind-the-fabric"],
  "finding-the-right-trouser-fit": ["building-a-timeless-wardrobe", "the-monochrome-approach", "the-monochrome-edit"],
  "understanding-neutral-colours": ["the-monochrome-approach", "the-monochrome-edit", "the-linen-edit"],
  "three-ways-to-wear-an-espresso-polo": ["from-day-to-evening", "the-monochrome-approach", "building-a-timeless-wardrobe"],
  "how-to-style-linen-trousers": ["a-guide-to-linen", "three-ways-to-wear-an-espresso-polo", "the-linen-edit"],
  "from-day-to-evening": ["three-ways-to-wear-an-espresso-polo", "the-monochrome-approach", "the-quiet-art-of-dressing-well"],
  "the-monochrome-approach": ["the-monochrome-edit", "understanding-neutral-colours", "finding-the-right-trouser-fit"],
  "the-quiet-art-of-dressing-well": ["objects-of-everyday-distinction", "building-a-timeless-wardrobe", "made-with-care"],
  "the-monochrome-edit": ["the-monochrome-approach", "understanding-neutral-colours", "the-linen-edit"],
  "the-linen-edit": ["a-guide-to-linen", "how-to-style-linen-trousers", "behind-the-fabric"],
  "objects-of-everyday-distinction": ["made-with-care", "behind-the-fabric", "the-quiet-art-of-dressing-well"],
  "why-we-started-giraffe": ["building-giraffe", "made-with-care", "objects-of-everyday-distinction"],
  "behind-the-fabric": ["a-guide-to-linen", "made-with-care", "the-linen-edit"],
  "made-with-care": ["objects-of-everyday-distinction", "behind-the-fabric", "the-quiet-art-of-dressing-well"],
  "building-giraffe": ["why-we-started-giraffe", "behind-the-fabric", "made-with-care"],
};

export function getRelatedJournalArticles(article: JournalArticle) {
  const slugs = curatedRelatedSlugs[article.slug] ?? [];
  return slugs.map((slug) => getJournalArticle(slug)).filter((candidate): candidate is JournalArticle => Boolean(candidate));
}
