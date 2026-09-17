/** @type {import('next').NextConfig} */
const nextConfig = {
  // Normal (non-export) config for day-to-day dev — this restores Next's
  // Image Optimization API, which was disabled site-wide (even in dev)
  // by the static-export setup below. That setup is only needed for the
  // one-off manual drag-and-drop deploy to Netlify; when you need to do
  // that again, temporarily restore the two lines commented out below,
  // run `next build`, and drag the resulting `out/` folder onto
  // Netlify's dropzone — then revert back to this normal config
  // afterward so dev stays fast.
  //
  // output: "export",
  // images: { unoptimized: true },
};

export default nextConfig;
