(function () {
  const script = document.currentScript;
  const spaceId = script.getAttribute("data-space-id");

  const container = document.createElement("div");
  document.body.appendChild(container);

  const iframe = document.createElement("iframe");
  iframe.src = `${process.env.NEXT_PUBLIC_SELF_URL}/embed/social?spaceId=${spaceId}`;
  iframe.style.width = "100%";
  iframe.style.height = "120px";
  iframe.style.border = "none";
  iframe.style.borderRadius = "12px";
  iframe.style.overflow = "hidden";

  container.appendChild(iframe);
})();
