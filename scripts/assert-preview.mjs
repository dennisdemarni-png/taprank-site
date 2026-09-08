// Temporary safeguard for the unapproved redesign. Remove only after explicit
// production approval. NODE_ENV is not used: Preview also builds in production mode.
if (process.env.VERCEL === '1' && process.env.VERCEL_ENV !== 'preview') {
  console.error('This homepage redesign is approved for Vercel Preview only. Production build blocked.');
  process.exit(1);
}
