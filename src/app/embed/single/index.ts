import zoid from "@krakenjs/zoid";

export const testimonialWidget = zoid.create({
  tag: "single-testimonial-widget",
  url: ({ props }) => `https://localhost:3000/embed/single/${props.id}`,
  dimension: {
    width: "100%",
    height: "400px",
  },
});
