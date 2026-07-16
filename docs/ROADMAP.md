# Validation-gated roadmap

TapRank is currently in Phase 1. Phases describe potential scope, not delivery commitments. Each validation gate must be met before adding the next phase's complexity.

## Phase 1 — Paid-order fulfilment and TapRank-managed pages

### Objective

Fulfil paid orders safely and create a repeatable TapRank-managed customer-page operation.

### Potential scope

- Permanent `/r/[slug]` customer URLs.
- Reliable public mobile pages.
- TapRank-admin-managed businesses and links.
- Link ordering and enabled/disabled state.
- Draft, preview, publish, and rollback controls.
- Basic private operating records and manual onboarding.
- Safe build/deployment and pre-dispatch verification.

### Explicitly excluded

- Customer login and self-service.
- Customer analytics dashboards.
- Subscriptions or Stripe billing.
- Complex roles, teams, or multi-location support.
- Advanced campaigns, rewards, and integrations.

### Commercial justification

This directly supports paid-order delivery, reduces public-link mistakes, preserves permanent hardware URLs, and tests whether editable hosted pages have real customer value.

### Technical risks

- A rushed admin surface could expose customer data or privileged credentials.
- Slug changes could break physical products.
- Manual source-based management becomes fragile as page count grows.
- Missing validation or rollback could publish broken links.
- Introducing a database creates backup, access, privacy, and migration responsibilities.

### Validation gate before Phase 2

- Multiple completed paid orders.
- Evidence that customers value editable hosted pages.
- A repeatable order-fulfilment process.
- Clear customer feedback.
- Evidence that self-service would reduce meaningful operational work.

## Phase 2 — Customer login and self-service editing

### Objective

Let validated customers safely manage routine page changes while protecting business ownership and publication quality.

### Potential scope

- Managed customer authentication.
- Customer accounts and explicit business ownership.
- Link editing, ordering, and enabled state.
- Page preview and controlled publication.
- Basic account settings.
- Admin support/impersonation controls only if auditable and necessary.

### Explicitly excluded

- Subscription billing unless separately validated.
- Advanced analytics and attribution.
- Complex campaign automation.
- Broad marketplace/integration catalogue.
- Custom role builders or enterprise permissions.

### Commercial justification

Self-service is worthwhile only if customers request it, use it, and it removes enough TapRank operating work to justify the support and security burden.

### Technical risks

- Broken object-level authorisation could expose another business's data.
- Unsafe URL entry could harm visitors.
- Customer edits could degrade accessibility or branding.
- Account recovery, privacy, audit, and support requirements increase.

### Validation gate before Phase 3

- Customers actively use self-service.
- Customers request performance data.
- TapRank has enough usage volume to make analytics commercially meaningful.

## Phase 3 — Analytics and subscriptions

### Objective

Measure product value and charge recurring fees only where ongoing software value is demonstrated.

### Potential scope

- Page views.
- QR, NFC, and direct visits where acquisition can be measured reliably.
- Link clicks and time-based trends.
- Subscription plans and managed billing.
- Server-enforced feature access and account status.
- Basic export/support tools.

### Explicitly excluded

- Unverified claims about review growth or revenue.
- Invasive visitor profiling or unnecessary personal data.
- Complex predictive analytics.
- Advanced enterprise billing before customer demand.

### Commercial justification

Analytics can support retention and recurring revenue only when customers use the data to make decisions and are willing to pay for continuing value.

### Technical risks

- Consent, privacy, retention, and bot filtering.
- Incorrect QR/NFC attribution.
- Billing/webhook failures and entitlement drift.
- Higher support burden and financial reconciliation.
- Metrics may look precise without being commercially meaningful.

### Validation gate before Phase 4

- Customers are willing to pay recurring fees.
- Analytics affect customer decisions.
- TapRank has stable retention and usage data.

## Phase 4 — Advanced features

### Objective

Expand the platform only after the core hardware, hosted-page, self-service, and recurring-value model is established.

### Potential scope

- Offers and rewards.
- Menus and campaigns.
- Customer segmentation.
- Advanced insights.
- Approved integrations.
- Multi-location support.
- Team accounts and permissions.
- Automated onboarding.

### Explicitly excluded

- Features without a validated customer problem or revenue/retention case.
- Bespoke complexity that weakens the reliable core product.
- Uncontrolled customer tracking.
- A marketing-site rewrite solely to enable platform features.

### Commercial justification

These capabilities may increase retention, average revenue, or market reach once enough customers and usage patterns prove which problems matter.

### Technical risks

- Product and data-model complexity.
- Permission and multi-tenant isolation errors.
- Integration failures and vendor dependence.
- Operational support load.
- Dilution of the simple in-venue action experience.

### Validation gate

Each advanced feature needs its own evidence: repeated customer requests, clear expected commercial value, defined success measure, acceptable security/privacy impact, and capacity to support it.
