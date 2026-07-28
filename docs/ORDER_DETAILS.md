# Post-checkout order-details system

## Purpose

`/order-details` collects the business information TapRank needs after a customer has purchased or agreed an order. It supports fulfilment; it is not a payment form and a submission is not evidence of payment.

The first release deliberately excludes customer accounts, an admin dashboard, analytics, Square API/webhooks and automatic payment verification.

## Data flow

```text
Customer
  |
  | HTTPS multipart form
  v
Next.js /api/order-details
  |-- server validation
  |-- honeypot and minimum-completion-time checks
  |-- hashed request rate limit
  |-- image type, size and signature validation
  |
  |-- Supabase Postgres: private setup record
  `-- Supabase Storage: optional private logo
```

The Supabase secret key is used only by the server API route. No Supabase credential is rendered into `/order-details`.

## Supabase project setup

1. Create a TapRank-owned Supabase project. Use the London region where appropriate for the agreed data-processing setup.
2. For a production customer-order system, use a plan with suitable availability and backups rather than relying on a project that may pause for inactivity.
3. Review and apply `supabase/migrations/202607280001_create_order_detail_submissions.sql` using the Supabase SQL Editor or a linked Supabase CLI project.
4. Confirm the following exist:
   - `public.order_detail_submissions`;
   - `public.order_submission_rate_limits`;
   - `public.claim_order_submission_slot(text)`;
   - private Storage bucket `order-branding`.
5. Confirm Row Level Security is enabled and neither `anon` nor `authenticated` can select, insert, update or delete order records.
6. Create a server secret key for the application. Never use it in browser code.
7. Configure the variables from `.env.example` in local development and Vercel.
8. Deploy to a preview environment and complete the verification checklist below.
9. Only after production verification, configure the Square post-checkout destination to `https://taprank.co.uk/order-details`.

Do not treat the redirect or form submission as payment confirmation.

## Environment variables

```text
SUPABASE_URL
SUPABASE_SECRET_KEY
ORDER_DETAILS_RATE_LIMIT_SECRET
```

Generate `ORDER_DETAILS_RATE_LIMIT_SECRET` as a unique random value of at least 32 characters. Changing it invalidates only existing rate-limit hashes; it does not affect order records.

## Stored information

- TapRank submission reference.
- Optional customer-provided Square reference.
- Product type and quantity.
- Private order contact name, email and telephone.
- Business name, type and optional public profile details.
- Primary and secondary customer destinations.
- Opening hours.
- Branding notes, colours and optional private logo path.
- Operational and manual payment-verification statuses.
- Privacy/accuracy confirmation timestamps and notice version.

Card numbers, security codes, banking credentials and Square access tokens must never be submitted or stored.

## Security controls

- The API accepts `POST` multipart requests only.
- It fails closed when required server configuration is missing.
- All important fields are validated again on the server.
- Web destinations must be complete `https://` URLs.
- Logos are limited to one JPG, PNG or WebP file of at most 3 MB.
- File signatures are checked rather than trusting only the browser-supplied MIME type.
- A honeypot and timing check reduce simple automated submissions.
- A keyed hash of request address and user agent is rate-limited to five valid submission attempts per hour.
- Raw request IP addresses are not stored by the application.
- Database records and logo files are private by default.
- The public form is `noindex, nofollow` and responses are not cached.

The rate limiter is an abuse control, not a complete denial-of-service service. Monitor production behaviour and add a managed challenge or edge rate-limit product if abuse appears.

## TapRank operating procedure

1. Open the new Supabase row and note its `submission_reference`.
2. Find the corresponding Square order using the supplied reference, email, name and product.
3. Set `payment_status` to `confirmed` only after checking Square.
4. If no payment is found, set `payment_status` to `not_found` and contact the purchaser before production.
5. Validate each requested destination manually.
6. Review public contact details separately from private order-contact details.
7. Open the private logo only when needed for the order.
8. Move `status` through the documented operational states as work progresses.
9. Never copy private order details into repository source, public documentation or customer-page fields.

## Verification checklist

- [ ] Production build succeeds without Supabase environment variables.
- [ ] Unconfigured API returns a safe `503` response and exposes no secret.
- [ ] Configured valid submission creates exactly one private database row.
- [ ] Invalid and non-HTTPS destinations are rejected.
- [ ] Missing confirmations are rejected.
- [ ] Unsupported, oversized and falsely labelled logo files are rejected.
- [ ] Valid logo is stored in the private `order-branding` bucket.
- [ ] Anonymous database reads/inserts fail.
- [ ] Rate limit returns `429` after the configured threshold.
- [ ] Success screen states that receipt is not payment confirmation.
- [ ] Desktop and mobile form layout, keyboard order and error focus are verified.
- [ ] Existing homepage, demo and customer routes remain correct.
- [ ] Square redirect is changed only after the production route passes these checks.

## Backup and retention

Database backup coverage depends on the selected Supabase plan. Supabase database backups do not restore deleted Storage objects, so TapRank needs a separate approved backup/export process for branding files.

The public privacy notice states the current operating intention: keep setup records while the connected page is active, then normally remove or anonymise them within 24 months after the service ends unless support, disputes or legal record-keeping require longer. TapRank should review this policy before production and whenever operations change.

## Rollback

Application rollback: revert the implementing pull request and redeploy. The form route will disappear, but collected records remain in Supabase.

Data rollback: do not drop the tables or bucket during an application rollback. Disable the Square redirect first, preserve submitted records, and decide separately whether data should be retained, exported or deleted under the privacy policy.
