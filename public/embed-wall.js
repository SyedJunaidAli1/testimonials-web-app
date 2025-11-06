(function () {
  const script = document.currentScript;
  const spaceId = script.getAttribute("data-space-id");

  if (!spaceId) {
    console.error("❌ Missing data-space-id attribute in embed script");
    return;
  }

  const container = document.createElement("div");
  container.style.width = "100%";
  container.style.maxWidth = "900px";
  container.style.margin = "0 auto";
  document.body.appendChild(container);

  const iframe = document.createElement("iframe");
  iframe.src = `http://localhost:3000/embed/wall?spaceId=${spaceId}`;
  iframe.style.width = "100%";
  iframe.style.height = "600px";
  iframe.style.border = "none";
  iframe.style.borderRadius = "12px";
  iframe.style.overflow = "hidden";
  iframe.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.1)";

  container.appendChild(iframe);
})();
