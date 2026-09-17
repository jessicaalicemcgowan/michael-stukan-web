export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "l4rsghr1";
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
// Pin to a fixed date so schema/API changes upstream never silently
// change query behaviour — bump deliberately, not automatically.
export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2025-01-01";
