export type Product = {
  id: string;
  name: string;
  slug: string;
  title?: string;
  description: string;
  price_cents: number;
  image_url: string;
  hover_image_url?: string;
  gallery_image_urls?: string[];
  sizes?: string[];
  color?: string;
  material?: string;
  fit?: string;
  gender?: string;
  stock_status?: string;
  published?: boolean;
  category: string;
  is_featured: boolean;
  stock: number;
};

export type CartItem = {
  productId: string;
  size?: string;
  quantity: number;
};
