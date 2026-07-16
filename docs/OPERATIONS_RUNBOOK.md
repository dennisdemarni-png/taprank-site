# Operations runbook

This runbook describes the manual MVP process. Keep private order/customer records in an approved private system, not in public repository documentation.

## Order fulfilment

1. Receive and confirm payment in the approved private order record.
2. Confirm whether the customer purchased a standard or custom stand.
3. Collect the customer's full business name and confirm exact spelling/capitalisation.
4. Collect every requested destination link and desired label.
5. Open and verify each destination independently; confirm it belongs to the business and performs the intended action.
6. Choose a unique, readable permanent TapRank slug. Check for current and likely future conflicts.
7. Create the permanent HTTPS URL on the canonical TapRank domain.
8. Create or update the customer page using the current approved page-management process.
9. Recheck the displayed business name against the confirmed order record.
10. Test every displayed button, including telephone and messaging protocols where applicable.
11. Generate a high-quality QR code that points to the permanent TapRank URL.
12. Confirm the QR data by decoding it independently before printing.
13. Program the NFC tag with the same permanent TapRank URL.
14. Read the NFC tag back and compare the complete URL character for character.
15. Test the QR code on multiple devices/cameras where possible.
16. Test the NFC tag on multiple supported devices where possible.
17. Test the public page on a real mobile browser, including layout, primary action, all secondary links, and back navigation.
18. Confirm the public page exposes no edit controls, private data, tokens, customer notes, or admin URLs.
19. For a custom stand, obtain and record approval of the customer-facing design before final production.
20. Print and assemble the stand using the approved artwork and correct tag/code.
21. Perform a final physical and technical quality check against the order record.
22. Package the stand securely to protect the acrylic, print, QR code, and NFC tag.
23. Dispatch within the currently promised timeframe.
24. Send the customer a dispatch update through the agreed channel.
25. Record the completed customer, order, permanent URL, dispatch evidence, and support history privately.
26. Keep the permanent URL reserved for that business even when its links change.
27. Follow the controlled update/rollback procedures below for future changes.

## Current source-managed page procedure

Until an admin system exists, a production customer page requires a source and deployment change. This is a temporary operating mode.

1. Start from a clean, current production branch and create a focused feature branch.
2. Confirm no private data beyond the approved public business profile and destinations is being added.
3. Add the business record to the approved customer-page data source and include only required public assets.
4. Do not change an existing permanent slug.
5. Run the production build.
6. Preview and manually test `/r/[slug]` on mobile and desktop.
7. Verify invalid slugs and existing demo routes still behave as expected.
8. Review the diff for accidental secrets, unrelated changes, and placeholder destinations.
9. Obtain the normal review/approval and deploy through the existing production process.
10. Verify the production URL after deployment before programming or dispatching hardware.

The actual production branch, approval policy, and Vercel ownership must be confirmed before the first real customer page is shipped.

## Link-change request

1. Authenticate the requester using the approved private customer/order record and contact channel.
2. Record the requested old destination, new destination, label, and reason.
3. Verify the new link belongs to the business and works.
4. Update only the intended business/link record; preserve the slug.
5. Preview and test all page actions.
6. Publish through the approved deployment path.
7. Verify the production page using the existing physical QR/NFC destination if available.
8. Notify the customer and retain a private audit note.

## Incorrect, expired, or broken destination

- Confirm the failure from a separate device/network.
- Determine whether the TapRank page, link data, third-party service, or business account is responsible.
- If a destination is unsafe or misleading, disable it or restore the last known-good link as soon as authorised.
- Never replace it with an unverified guess.
- Preserve the permanent TapRank URL.
- Record the incident and customer confirmation privately.

## Lost QR/NFC destination

If the programmed or printed URL is unknown:

1. Scan/read the physical item and record the exact result.
2. Check the approved order record and production page.
3. If the physical item points to the correct permanent TapRank URL, update only the hosted page as needed.
4. If it points to an incorrect or unrecoverable URL, do not silently redirect an unrelated slug. Produce corrected hardware or use an approved controlled redirect only when ownership and safety are certain.
5. Retest the replacement end to end.

## Rollback

1. Identify the last known-good published page/link state.
2. Preserve evidence of the incorrect change.
3. Revert only the affected data/change through a new reviewed commit or future admin publication; do not rewrite shared Git history.
4. Build, preview, and test.
5. Deploy and verify the permanent URL.
6. Confirm with the customer and record the outcome privately.

## Pre-dispatch checklist

- [ ] Payment and product type confirmed.
- [ ] Business name and public branding approved.
- [ ] Every destination opens and belongs to the customer.
- [ ] Permanent TapRank URL is correct, unique, HTTPS, and live.
- [ ] Business page is mobile-tested and contains no private/admin data.
- [ ] QR code decodes to the permanent TapRank URL on multiple devices.
- [ ] NFC tag reads the same permanent TapRank URL on multiple devices where possible.
- [ ] QR and NFC both work after final assembly.
- [ ] Stand artwork, print, acrylic, and packaging pass physical inspection.
- [ ] Private order record and dispatch details are complete.
- [ ] Customer dispatch update is ready/sent.

## Operational facts still to define

- Approved private order/customer record system.
- Identity-verification process for link-change requests.
- Named fulfilment and deployment owners.
- Supported NFC writer and QR generation tools.
- Required physical test-device matrix.
- Dispatch promise and support response target.
- Incident escalation and out-of-hours process.
- Production rollback authority and Vercel access.
