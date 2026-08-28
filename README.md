# Giraffe Clothing MVP

Next.js e-commerce MVP with:

- Clerk for authentication
- Supabase for product data
- Upstash Redis for cart/session state

## Setup

1. Copy `.env.example` to `.env.local`
2. Fill in the Clerk, Supabase, and Upstash values
3. Install dependencies
4. Run `npm run dev`

## Supabase table

Create a `products` table with fields matching `lib/types.ts`:

- `id` text or uuid
- `name` text
- `slug` text unique
- `description` text
- `price_cents` integer
- `image_url` text
- `category` text
- `is_featured` boolean
- `stock` integer

## MVP notes

- If Supabase env vars are missing, the app falls back to sample products.
- If Upstash is missing, cart storage is disabled gracefully.
- Checkout is scaffolded and ready for payment integration.
