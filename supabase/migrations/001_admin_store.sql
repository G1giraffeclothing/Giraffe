create table if not exists public.store_collections (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  slug text not null unique,
  sort_order integer not null default 0,
  enabled boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.catalog_products (
  id uuid primary key default gen_random_uuid(),
  sku text not null unique,
  slug text not null unique,
  name text not null,
  title text not null,
  description text not null default '',
  collection text not null default '',
  category text not null default '',
  keywords text[] not null default '{}',
  selling_price_cents integer not null check (selling_price_cents >= 0),
  cost_price_cents integer check (cost_price_cents is null or cost_price_cents >= 0),
  color text,
  material text,
  fit text,
  gender text,
  stock_status text not null default 'In Stock',
  published boolean not null default false,
  featured boolean not null default false,
  new_release boolean not null default false,
  best_seller boolean not null default false,
  status text not null default 'DRAFT' check (status in ('DRAFT', 'PUBLISHED', 'ARCHIVED')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.product_images (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.catalog_products(id) on delete cascade,
  url text not null,
  alt text not null default '',
  sort_order integer not null default 0,
  role text not null default 'gallery' check (role in ('primary', 'standing', 'gallery')),
  created_at timestamptz not null default now()
);

create table if not exists public.product_variants (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.catalog_products(id) on delete cascade,
  size text not null,
  sku text,
  stock_quantity integer not null default 0 check (stock_quantity >= 0),
  enabled boolean not null default true,
  unique(product_id, size)
);

create table if not exists public.store_orders (
  id uuid primary key default gen_random_uuid(),
  order_number text not null unique,
  customer_id text,
  customer_name text,
  email text,
  phone text,
  shipping_address jsonb not null default '{}',
  subtotal_cents integer not null default 0 check (subtotal_cents >= 0),
  shipping_cents integer not null default 0 check (shipping_cents >= 0),
  total_cents integer not null default 0 check (total_cents >= 0),
  payment_status text not null default 'PENDING' check (payment_status in ('PENDING', 'PAID', 'FAILED', 'REFUNDED')),
  fulfillment_status text not null default 'PENDING' check (fulfillment_status in ('PENDING', 'CONFIRMED', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED')),
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.store_order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.store_orders(id) on delete restrict,
  product_id uuid references public.catalog_products(id) on delete set null,
  sku text not null,
  product_name text not null,
  size text,
  quantity integer not null check (quantity > 0),
  unit_price_cents integer not null check (unit_price_cents >= 0),
  line_total_cents integer not null check (line_total_cents >= 0)
);

create table if not exists public.store_settings (
  id boolean primary key default true,
  store_name text not null default 'Giraffe Clothing',
  currency text not null default 'INR',
  support_email text,
  support_phone text,
  low_stock_threshold integer not null default 5 check (low_stock_threshold >= 0),
  free_shipping_threshold_cents integer not null default 199900 check (free_shipping_threshold_cents >= 0),
  announcement text,
  updated_at timestamptz not null default now()
);

create table if not exists public.admin_audit_logs (
  id uuid primary key default gen_random_uuid(),
  admin_user_id text not null,
  action text not null,
  entity text not null,
  entity_id text,
  details jsonb not null default '{}',
  created_at timestamptz not null default now()
);

create index if not exists catalog_products_status_idx on public.catalog_products(status, published);
create index if not exists catalog_products_category_idx on public.catalog_products(category);
create index if not exists product_images_product_idx on public.product_images(product_id, sort_order);
create index if not exists product_variants_product_idx on public.product_variants(product_id);
create index if not exists orders_created_idx on public.store_orders(created_at desc);

alter table public.store_collections enable row level security;
alter table public.catalog_products enable row level security;
alter table public.product_images enable row level security;
alter table public.product_variants enable row level security;
alter table public.store_orders enable row level security;
alter table public.store_order_items enable row level security;
alter table public.store_settings enable row level security;
alter table public.admin_audit_logs enable row level security;

insert into public.store_settings (id) values (true) on conflict (id) do nothing;
