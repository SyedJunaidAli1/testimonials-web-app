const page = () => {
  return (
    <div className="flex flex-wrap gap-6 items-center justify-center py-10">
      <iframe
        src="https://betterstacks.com/embed/profile/syedjunaidali790"
        width="33%"
        height="400px"
        scrolling="auto"
      ></iframe>
      <iframe
        src="https://betterstacks.com/embed/profile/subha60kundu"
        width="33%"
        height="400px"
        scrolling="auto"
      ></iframe>
      <iframe
        src="http://localhost:3000/embed/wall?spaceId=28746b2e-3487-41c1-87c3-8c70fcc095b2"
        width="100%"
        height="400px"
        scrolling="no"
      ></iframe>
      <iframe
        id="testimonialto-b3f710ea-9bd4-483f-889d-a4ae7aaa088b"
        src="https://embed-v2.testimonial.to/w/sdasd?id=b3f710ea-9bd4-483f-889d-a4ae7aaa088b"
        frameborder="0"
        scrolling="no"
        width="100%"
        height="800px"
      ></iframe>
      <iframe
        src="http://localhost:3000/embed/single?id=7fff8002-ca68-4732-b87e-bdc020077fc5"
        width="33%"
        height="400px"
        scrolling="auto"
      ></iframe>
      <iframe
        src="http://localhost:3000/embed/single?id=dd210e2a-b0a1-4d58-bef6-3ab8a1ee550f"
        width="33%"
        height="300px"
        scrolling="auto"
        style={{ border: "none", borderRadius: "10px" }}
      ></iframe>
      <iframe
        src="http://localhost:3000/embed/single?id=8809810c-e496-4501-a811-0d5f72cb0700"
        width="33%"
        height="400px"
        scrolling="auto"
        style={{ border: "none", borderRadius: "10px" }}
      ></iframe>
    </div>
  );
};

export default page;
