import zoid from "@krakenjs/zoid";

export const wallOfLoveWidget = zoid.create({
  tag: "wall-of-love-widget",
  url: ({ props }) =>
    `${process.env.NEXT_PUBLIC_SELF_URL}/embed/wall?spaceId=${props.spaceId}`,
  dimensions: {
    width: "100%",
    height: "600px",
  },
});
