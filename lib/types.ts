export type Product = {
  id: string;
  name: string;
  slug: string;
  description: string;
  price_cents: number;
  image_url: string;
  category: string;
  is_featured: boolean;
  stock: number;
};

export type CartItem = {
  productId: string;
  quantity: number;
};
