create extension if not exists pgcrypto;

create table if not exists public.storefront_carts (
  id uuid primary key default gen_random_uuid(),
  token_hash text not null unique check (char_length(token_hash) = 64),
  status text not null default 'active' check (
    status in ('active', 'checkout_started', 'converted', 'expired')
  ),
  expires_at timestamptz not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.storefront_cart_items (
  id uuid primary key default gen_random_uuid(),
  cart_id uuid not null references public.storefront_carts(id) on delete cascade,
  product_id text not null check (
    product_id in ('google', 'instagram', 'tripadvisor', 'custom')
  ),
  product_name text not null,
  unit_price_pence integer not null check (unit_price_pence in (6499, 8499)),
  quantity integer not null check (quantity between 1 and 20),
  configuration jsonb not null,
  logo_path text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.storefront_orders (
  id uuid primary key default gen_random_uuid(),
  order_reference text not null unique,
  cart_id uuid references public.storefront_carts(id) on delete set null,
  status text not null default 'checkout_pending' check (
    status in ('checkout_pending', 'checkout_created', 'paid', 'failed', 'cancelled', 'refunded')
  ),
  currency text not null default 'GBP' check (currency = 'GBP'),
  total_pence integer not null check (total_pence > 0),
  cart_snapshot jsonb not null,
  square_order_id text unique,
  square_payment_link_id text,
  square_checkout_url text,
  paid_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.square_webhook_events (
  event_id text primary key,
  event_type text not null,
  square_object_id text,
  received_at timestamptz not null default now(),
  processed_at timestamptz
);

alter table public.storefront_carts enable row level security;
alter table public.storefront_cart_items enable row level security;
alter table public.storefront_orders enable row level security;
alter table public.square_webhook_events enable row level security;

revoke all on public.storefront_carts from anon, authenticated;
revoke all on public.storefront_cart_items from anon, authenticated;
revoke all on public.storefront_orders from anon, authenticated;
revoke all on public.square_webhook_events from anon, authenticated;

grant select, insert, update, delete on public.storefront_carts to service_role;
grant select, insert, update, delete on public.storefront_cart_items to service_role;
grant select, insert, update, delete on public.storefront_orders to service_role;
grant select, insert, update, delete on public.square_webhook_events to service_role;

create index if not exists storefront_cart_items_cart_idx
  on public.storefront_cart_items (cart_id, created_at);
create index if not exists storefront_orders_square_order_idx
  on public.storefront_orders (square_order_id);
create index if not exists storefront_orders_status_created_idx
  on public.storefront_orders (status, created_at desc);

insert into storage.buckets (
  id,
  name,
  public,
  file_size_limit,
  allowed_mime_types
)
values (
  'storefront-branding',
  'storefront-branding',
  false,
  3145728,
  array['image/jpeg', 'image/png', 'image/webp']
)
on conflict (id) do update
set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

comment on table public.storefront_carts is
  'Private anonymous TapRank carts addressed only by a hashed HttpOnly cookie token.';
comment on table public.storefront_orders is
  'Private TapRank checkout records. Only verified Square events can mark an order paid.';
comment on table public.square_webhook_events is
  'Minimal idempotency log for validated Square webhook notifications; raw payloads are not retained.';
