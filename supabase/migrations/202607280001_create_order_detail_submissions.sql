create extension if not exists pgcrypto;

create table if not exists public.order_detail_submissions (
  id uuid primary key default gen_random_uuid(),
  submission_reference text not null unique,
  square_order_reference text,
  product_type text not null check (product_type in ('standard', 'custom')),
  quantity integer not null check (quantity between 1 and 20),
  contact_name text not null,
  contact_email text not null,
  contact_phone text not null,
  business_name text not null,
  business_type text not null,
  business_address text,
  public_phone text,
  public_email text,
  opening_hours text,
  primary_action text not null check (
    primary_action in ('review', 'booking', 'menu', 'website', 'social', 'other')
  ),
  primary_action_url text not null,
  website_url text,
  booking_url text,
  menu_url text,
  instagram_url text,
  facebook_url text,
  tiktok_url text,
  whatsapp_number text,
  additional_links jsonb not null default '[]'::jsonb,
  brand_colours text,
  branding_notes text,
  logo_path text,
  status text not null default 'new' check (
    status in (
      'new',
      'in_setup',
      'awaiting_customer',
      'ready',
      'dispatched',
      'complete',
      'cancelled'
    )
  ),
  payment_status text not null default 'unverified' check (
    payment_status in ('unverified', 'confirmed', 'not_found', 'refunded')
  ),
  privacy_notice_version text not null,
  privacy_acknowledged_at timestamptz not null,
  accuracy_confirmed_at timestamptz not null,
  submitted_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

comment on table public.order_detail_submissions is
  'Private post-checkout setup records. A submission is not evidence of Square payment.';

alter table public.order_detail_submissions enable row level security;
revoke all on public.order_detail_submissions from anon, authenticated;
grant select, insert, update, delete on public.order_detail_submissions to service_role;

create index if not exists order_detail_submissions_status_submitted_idx
  on public.order_detail_submissions (status, submitted_at desc);

create index if not exists order_detail_submissions_contact_email_idx
  on public.order_detail_submissions (lower(contact_email));

create table if not exists public.order_submission_rate_limits (
  request_hash text primary key check (char_length(request_hash) = 64),
  window_started_at timestamptz not null default now(),
  attempts integer not null default 1 check (attempts > 0),
  updated_at timestamptz not null default now()
);

alter table public.order_submission_rate_limits enable row level security;
revoke all on public.order_submission_rate_limits from anon, authenticated;
grant select, insert, update, delete on public.order_submission_rate_limits to service_role;

create or replace function public.claim_order_submission_slot(p_request_hash text)
returns boolean
language plpgsql
security definer
set search_path = public
as $$
declare
  allowed boolean;
begin
  if p_request_hash is null or char_length(p_request_hash) <> 64 then
    return false;
  end if;

  delete from public.order_submission_rate_limits
  where window_started_at < now() - interval '24 hours';

  insert into public.order_submission_rate_limits (
    request_hash,
    window_started_at,
    attempts,
    updated_at
  )
  values (p_request_hash, now(), 1, now())
  on conflict (request_hash) do update
  set
    attempts = case
      when order_submission_rate_limits.window_started_at < now() - interval '1 hour'
        then 1
      else order_submission_rate_limits.attempts + 1
    end,
    window_started_at = case
      when order_submission_rate_limits.window_started_at < now() - interval '1 hour'
        then now()
      else order_submission_rate_limits.window_started_at
    end,
    updated_at = now()
  returning attempts <= 5 into allowed;

  return allowed;
end;
$$;

revoke all on function public.claim_order_submission_slot(text) from public, anon, authenticated;
grant execute on function public.claim_order_submission_slot(text) to service_role;

insert into storage.buckets (
  id,
  name,
  public,
  file_size_limit,
  allowed_mime_types
)
values (
  'order-branding',
  'order-branding',
  false,
  3145728,
  array['image/jpeg', 'image/png', 'image/webp']
)
on conflict (id) do update
set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

comment on table public.order_submission_rate_limits is
  'Short-lived hashed identifiers used only to limit abuse of the public order-details endpoint.';
