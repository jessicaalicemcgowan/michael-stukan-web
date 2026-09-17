// Objects (reusable field shapes)
import shopifyProductRef from "./objects/shopifyProductRef";
import captionedImage from "./objects/captionedImage";
import headingTextBlock from "./objects/headingTextBlock";
import lookbookItem from "./objects/lookbookItem";
import mediaAsset from "./objects/mediaAsset";
import galleryBlock from "./objects/galleryBlock";
import galleryRow from "./objects/galleryRow";
import campaignBlock from "./objects/campaignBlock";
import pressItem from "./objects/pressItem";
import stockist from "./objects/stockist";

// Documents (one per page/template, per the CMS breakdown)
import homepage from "./documents/homepage";
import collection from "./documents/collection";
import campaign from "./documents/campaign";
import aboutPage from "./documents/aboutPage";
import shopSettings from "./documents/shopSettings";

export const schemaTypes = [
  // documents
  homepage,
  collection,
  campaign,
  aboutPage,
  shopSettings,
  // objects
  shopifyProductRef,
  captionedImage,
  headingTextBlock,
  lookbookItem,
  mediaAsset,
  galleryBlock,
  galleryRow,
  campaignBlock,
  pressItem,
  stockist,
];
