import zoid from "@krakenjs/zoid";

export const testimonialWidget = zoid.create({
  tag: "single-testimonial-widget",
  url: ({ props }) =>
    `${process.env.NEXT_PUBLIC_SELF_URL}}/embed/single/${props.id}`,
  dimension: {
    width: "100%",
    height: "400px",
  },
});
