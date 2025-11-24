import zoid from "@krakenjs/zoid";

export const SocialProofAvatarWidget = zoid.create({
  tag: "social-proof-avatar-widget",
  url: ({ props }) =>
    `${process.env.NEXT_PUBLIC_SELF_URL}/embed/social?spaceId=${props.spaceId}`,
  dimensions: {
    width: "100%",
    height: "600px",
  },
});
