// One block on the Campaign page (modules 15–20). blockType controls
// which layout renders; order of blocks on the page IS the array order,
// and the CMS breakdown explicitly allows this order to be changed.
const campaignBlock = {
  name: "campaignBlock",
  title: "Campaign block",
  type: "object",
  fields: [
    {
      name: "blockType",
      title: "Layout",
      type: "string",
      options: {
        list: [
          { title: "Full bleed image", value: "fullBleed" },
          { title: "Image right", value: "imageRight" },
          { title: "Image center", value: "imageCenter" },
          { title: "Image left", value: "imageLeft" },
          { title: "Double image", value: "doubleImage" },
          { title: "Overlap", value: "overlap" },
        ],
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: "media",
      title: "Image or video",
      type: "mediaAsset",
      hidden: ({ parent }) =>
        ["doubleImage", "overlap"].includes(parent?.blockType),
      description:
        "Video autoplays, loops, muted, no controls — matches the current full-bleed behaviour.",
    },
    {
      name: "mediaSecondary",
      title: "Second image or video",
      type: "mediaAsset",
      hidden: ({ parent }) => !["doubleImage", "overlap"].includes(parent?.blockType),
    },
    {
      name: "mediaPrimaryFor2Up",
      title: "First image or video",
      type: "mediaAsset",
      hidden: ({ parent }) => !["doubleImage", "overlap"].includes(parent?.blockType),
    },
    {
      name: "caption",
      title: "Caption (shown in the + expanded view)",
      type: "string",
      hidden: ({ parent }) =>
        !["imageRight", "imageCenter", "imageLeft"].includes(parent?.blockType),
    },
  ],
  preview: {
    select: { blockType: "blockType", media: "media.image" },
    prepare({ blockType, media }) {
      return { title: blockType, media };
    },
  },
};

export default campaignBlock;
