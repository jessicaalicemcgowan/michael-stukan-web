// A single field that can hold either an image or a video file — used
// everywhere the CMS breakdown says "image or video" (homepage header,
// campaign CTA, campaign page blocks). Only one of the two should be
// filled in; the frontend prefers video when both are present.
const mediaAsset = {
  name: "mediaAsset",
  title: "Image or video",
  type: "object",
  fields: [
    {
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
    },
    {
      name: "video",
      title: "Video file",
      type: "file",
      options: { accept: "video/*" },
    },
  ],
  preview: {
    select: { media: "image", video: "video.asset.originalFilename" },
    prepare({ media, video }) {
      return { title: video ? `Video: ${video}` : "Image", media };
    },
  },
};

export default mediaAsset;
