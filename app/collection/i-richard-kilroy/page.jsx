import { client, imageUrl, fileUrl } from "@/lib/sanity";
import { getProductsByHandles } from "@/lib/shopify";
import CollectionClient from "./CollectionClient";

export const dynamic = "force-dynamic";

const COLLECTION_QUERY = `*[_id == "collection-i-richard-kilroy"][0]{
  number,
  artistName,
  headerImages,
  headerCaption,
  aboutText,
  lookbook[]{
    lookNumber,
    image,
    "productHandles": products[].productHandle,
  },
  aboutArtist,
  gallery,
  shopTextLine1,
  shopTextLine2,
  "shopProductHandles": shopProducts[].productHandle,
  campaignTeaserVideo,
}`;

function toRoman(num) {
  const romans = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"];
  return romans[num - 1] || String(num);
}

export default async function Collection() {
  const data = await client.fetch(COLLECTION_QUERY);

  const allHandles = new Set();
  (data?.lookbook || []).forEach((look) => (look.productHandles || []).forEach((h) => allHandles.add(h)));
  (data?.gallery || []).forEach((row) =>
    (row.blocks || []).forEach((block) => (block.products || []).forEach((p) => allHandles.add(p.productHandle))),
  );
  (data?.shopProductHandles || []).forEach((h) => allHandles.add(h));

  const products = allHandles.size ? await getProductsByHandles([...allHandles]) : [];
  const productByHandle = new Map(products.map((p) => [p.id, p]));
  const resolve = (handles) => (handles || []).map((h) => productByHandle.get(h)).filter(Boolean);

  const headerCarouselImages = (data?.headerImages || []).map((image) => ({
    src: imageUrl(image, 1600),
    alt: `Collection ${data?.number || "I"}, SS27 studio portrait`,
  }));

  const lookbookItems = (data?.lookbook || []).map((look, index) => ({
    id: `look-${index + 1}`,
    image: imageUrl(look.image, 1200),
    name: `Collection ${data?.number || "I"}. Look ${toRoman(index + 1)}`,
    description:
      "Lorem ipsum dress in royal and forest, lorem ipsum veil in sheer black tulle, finished with a hand-stitched trim.",
    products: resolve(look.productHandles),
  }));

  // Flatten the 10 editorial gallery rows into the fixed module shape the
  // client component renders — module order matches the CMS row order.
  // Every Sanity image/file reference is resolved to a plain URL string
  // here, server-side, since functions/rich objects can't cross into a
  // Client Component as props — only serializable data can.
  function resolveBlock(block) {
    if (!block) return null;
    return {
      image: block.image ? imageUrl(block.image, 1600) : null,
      secondaryImage: block.secondaryImage ? imageUrl(block.secondaryImage, 1600) : null,
      images: (block.images || []).map((image) => imageUrl(image, 1600)),
      video: block.video ? fileUrl(block.video) : null,
      caption: block.caption || null,
      tint: Boolean(block.tint),
      products: resolve((block.products || []).map((p) => p.productHandle)),
    };
  }

  const rows = data?.gallery || [];
  const galleryModules = {
    moduleA: (rows[0]?.blocks || []).map(resolveBlock),
    moduleWide1: resolveBlock(rows[1]?.blocks?.[0]),
    moduleOffsetLarge: resolveBlock(rows[2]?.blocks?.[0]),
    moduleOffsetSmall: resolveBlock(rows[2]?.blocks?.[1]),
    moduleStack: resolveBlock(rows[3]?.blocks?.[0]),
    moduleReverseSmall: resolveBlock(rows[4]?.blocks?.[0]),
    moduleReverseLarge: resolveBlock(rows[4]?.blocks?.[1]),
    moduleVideo: resolveBlock(rows[5]?.blocks?.[0]),
    moduleWide2: resolveBlock(rows[6]?.blocks?.[0]),
    modulePortrait1: resolveBlock(rows[7]?.blocks?.[0]),
    moduleSplitImage: resolveBlock(rows[8]?.blocks?.[0]),
    moduleSplitVideo: resolveBlock(rows[8]?.blocks?.[1]),
    modulePortrait2: resolveBlock(rows[9]?.blocks?.[0]),
  };

  const finalStripImages = resolve(data?.shopProductHandles).map((product) => ({
    src: product.image,
    alt: product.name,
    productId: product.id,
  }));

  const campaignTeaserVideo = fileUrl(data?.campaignTeaserVideo?.video);

  return (
    <CollectionClient
      collectionNumber={data?.number || "I"}
      artistName={data?.artistName || "Richard Kilroy"}
      headerCarouselImages={headerCarouselImages}
      headerCaption={data?.headerCaption}
      aboutText={data?.aboutText}
      lookbookItems={lookbookItems}
      aboutArtist={data?.aboutArtist}
      galleryModules={galleryModules}
      shopTextLine1={data?.shopTextLine1 || "I."}
      shopTextLine2={data?.shopTextLine2 || "Richard Kilroy"}
      finalStripImages={finalStripImages}
      campaignTeaserVideo={campaignTeaserVideo}
    />
  );
}
