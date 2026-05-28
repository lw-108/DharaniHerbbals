import rawData from "./data.json";

export interface Product {
  id: string;
  name: string;
  botanicalName: string;
  category: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  description: string;
  benefits: string[];
  usage: string;
  ingredients: string[];
  imageUrl: string;
  colorTheme: string; // for card backgrounds or badges
  isBestSeller?: boolean;
  isNew?: boolean;
  brand?: string; // brand name from provided list
  productType?: string; // e.g., New Launch, Best Selling, deals, trending, hot, popular
  categories?: string[]; // additional categories for sorting (HAIR, SKIN, etc.)
}

export const CATEGORIES = ["All", "Hair Care", "Skin Care", "Baby Care", "Wellness", "Organic Teas"];

export const BRANDS = ["All Brands", "MAKIL", "RAMCARE", "DIVYAM", "VANA ARASI", "VEDAN AMUTHU", "VEDAN", "ATHIYAMAN", "NIRAI HOMAM"];

export const PRODUCT_TYPES = ["All Types", "New Launch", "Best Selling", "deals", "trending", "hot", "popular"];
// Removed CATEGORY_IMAGES - using placeholder images
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getImageUrl(_category: string, _id: number): string {
  // Use a static placeholder for all product images (except carousel images)
  return "/placeholder.svg";
}

function getBotanicalName(name: string): string {
  const n = name.toLowerCase();
  if (n.includes("neem")) return "Azadirachta indica";
  if (n.includes("ashwagandha")) return "Withania somnifera";
  if (n.includes("bhringraj")) return "Eclipta prostrata";
  if (n.includes("amla")) return "Phyllanthus emblica";
  if (n.includes("tulsi")) return "Ocimum sanctum";
  if (n.includes("sandal")) return "Santalum album";
  if (n.includes("turmeric") || n.includes("manjal")) return "Curcuma longa";
  if (n.includes("hibiscus")) return "Hibiscus rosa-sinensis";
  if (n.includes("aloe")) return "Aloe barbadensis";
  if (n.includes("vetiver") || n.includes("vettiver")) return "Chrysopogon zizanioides";
  if (n.includes("coconut")) return "Cocos nucifera";
  if (n.includes("honey")) return "Apis mellifera";
  if (n.includes("shikakai")) return "Acacia concinna";
  if (n.includes("kuppaimeni")) return "Acalypha indica";
  if (n.includes("pirandai")) return "Cissus quadrangularis";
  if (n.includes("vallarai")) return "Centella asiatica";
  if (n.includes("arappu")) return "Albizia amara";
  if (n.includes("avaram")) return "Senna auriculata";
  if (n.includes("multhani") || n.includes("multani")) return "Fuller's earth";
  return "Botanical Extract";
}

function getPrices(name: string, id: number) {
  const n = name.toUpperCase();
  if (n.includes("FACEPACK POWDER JAR")) return { price: 58, originalPrice: 75 };
  if (n.includes("MULTHANI METTI JAR")) return { price: 35, originalPrice: 45 };
  if (n.includes("NALANGU POWDER JAR")) return { price: 60, originalPrice: 85 };
  if (n.includes("HIBISCUS SHAMPOO")) return { price: 70, originalPrice: 95 };
  if (n.includes("WILD TURMERIC")) return { price: 35, originalPrice: 50 };
  if (n.includes("PIRANDAI PICKLE")) return { price: 55, originalPrice: 75 };
  if (n.includes("OOTY VARKEY")) return { price: 65, originalPrice: 80 };
  if (n.includes("VALLARAI PONGAL")) return { price: 90, originalPrice: 110 };
  if (n.includes("MORINGA MILLET PONGAL")) return { price: 85, originalPrice: 105 };
  if (n.includes("RICE KANJI SHAMPOO")) return { price: 75, originalPrice: 99 };
  
  const price = ((id % 12) + 5) * 10 + (id % 5);
  const originalPrice = Math.round(price * 1.25);
  return { price, originalPrice };
}

function getColorTheme(category: string): string {
  switch (category) {
    case "HAIR": return "from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20";
    case "SKIN": return "from-emerald-50 to-teal-50 dark:from-emerald-950/20 dark:to-teal-950/20";
    case "BABY": return "from-sky-50 to-indigo-50 dark:from-sky-950/20 dark:to-indigo-950/20";
    case "BEVERAGES": return "from-red-50 to-pink-50 dark:from-red-950/20 dark:to-pink-950/20";
    case "BODY": return "from-teal-50 to-cyan-50 dark:from-teal-950/20 dark:to-cyan-950/20";
    case "FOOD": return "from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20";
    case "HEALTH & WELLNESS": return "from-lime-50 to-green-50 dark:from-lime-950/20 dark:to-green-950/20";
    case "POOJAS": return "from-yellow-50 to-amber-50 dark:from-yellow-950/20 dark:to-amber-950/20";
    default: return "from-muted/40 to-muted dark:from-muted/10 dark:to-muted/20";
  }
}

const rawProducts = rawData as Array<{
  id: number;
  name: string;
  category: string;
  brand: string;
  productType: string;
}>;

export const PRODUCTS: Product[] = rawProducts.map((item) => {
  const { price, originalPrice } = getPrices(item.name, item.id);
  const isBestSeller = item.productType === "Best Selling";
  const isNew = item.productType === "New Launch" || item.productType === "Hot";
  const rating = Number((4.0 + (item.id % 10) / 10).toFixed(1));
  const reviewsCount = (item.id % 40) + 12;
  const botanicalName = getBotanicalName(item.name);
  
  return {
    id: String(item.id),
    name: item.name,
    botanicalName,
    category: item.category,
    price,
    originalPrice,
    rating,
    reviewsCount,
    description: `Experience the therapeutic power of nature with ${item.name}. Ethically formulated and rich in active organic compounds, this natural solution supports health and vitality.`,
    benefits: [
      "100% natural and organic ingredients",
      "Free from synthetic preservatives and toxins",
      "Sourced sustainably to support rural farmers",
      "Gentle and nourishing for all skin & hair types"
    ],
    usage: "Take a small amount, apply evenly, and rinse or consume as appropriate.",
    ingredients: [botanicalName, "Organic Excipients"],
    imageUrl: getImageUrl(item.category, item.id),
    colorTheme: getColorTheme(item.category),
    isBestSeller,
    isNew,
    brand: item.brand,
    productType: item.productType,
    categories: [item.category]
  };
});
