import zoid from "@krakenjs/zoid";

export const wallOfLoveWidget = zoid.create({
  tag: "wall-of-love=widget",
  url: ({ props }) => `http://localhost:3000/embed/wall?spaceId=${props.spaceId}`,
  dimensions: {
    width: "100%",
    height: "600px",
  },
});
