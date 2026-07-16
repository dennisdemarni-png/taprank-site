# TapRank agent guide

Before changing this repository:

1. Read [README.md](README.md) and the relevant files in [`docs/`](docs/).
2. Inspect the current branch, Git status, existing code, and deployment assumptions.
3. Protect working production behaviour, especially `/`, `/r/demo`, and `/r/[slug]` demo pages.
4. Prioritise paid-order fulfilment, reliable customer pages, and commercial usefulness.
5. Avoid building a large SaaS platform until customer demand validates it.
6. Keep secrets, credentials, payment data, and private customer information out of the repository.
7. Put future secrets in environment variables and never expose privileged credentials to browser code.
8. Clearly distinguish current functionality from proposals or future plans.
9. Run the relevant available verification commands and report unavailable checks honestly.
10. Update documentation after meaningful product, operational, or architectural changes.
11. Stop and report unexpected repository changes before continuing.
12. Do not delete, rewrite, or reorganise working code without explicit approval.

Documentation map:

- [`docs/PRODUCT_CONTEXT.md`](docs/PRODUCT_CONTEXT.md): product, customers, commercial priorities, and validation principles.
- [`docs/CURRENT_STATE.md`](docs/CURRENT_STATE.md): evidence-based repository audit and current limitations.
- [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md): current architecture and clearly labelled future options.
- [`docs/CUSTOMER_PAGES.md`](docs/CUSTOMER_PAGES.md): customer-page behaviour and intended minimum data model.
- [`docs/OPERATIONS_RUNBOOK.md`](docs/OPERATIONS_RUNBOOK.md): order fulfilment and page-management process.
- [`docs/ROADMAP.md`](docs/ROADMAP.md): validation-gated delivery phases.
- [`docs/DECISIONS.md`](docs/DECISIONS.md): confirmed decisions and decision-log template.
