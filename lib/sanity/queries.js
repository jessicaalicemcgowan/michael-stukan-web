// GROQ queries, one per document type. Kept as plain exported strings so
// page components can import just the query they need.

export const homepageQuery = `*[_type == "homepage"][0]{
  ...,
  marqueeCollection->{number, artistName, slug}
}`;

export const collectionBySlugQuery = `*[_type == "collection" && slug.current == $slug][0]`;

export const latestCollectionQuery = `*[_type == "collection"] | order(releaseDate desc)[0]`;

export const collectionArchiveQuery = `*[_type == "collection"] | order(releaseDate desc){
  number, artistName, season, slug, releaseDate, "previewImage": headerImages[0].image
}`;

export const campaignByCollectionSlugQuery = `*[_type == "campaign" && collection->slug.current == $slug][0]{
  ...,
  collection->{number, artistName, artistSignature, slug}
}`;

export const aboutPageQuery = `*[_type == "aboutPage"][0]`;

export const shopSettingsQuery = `*[_type == "shopSettings"][0]`;
