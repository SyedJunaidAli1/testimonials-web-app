import jsPDF from "jspdf";

export const downloadSingleTestimonialPDF = (t: any) => {
  const doc = new jsPDF();

  const startY = 20;
  doc.setFontSize(14);
  doc.text(`Reviewer name: ${t.responseName}`, 15, startY);

  if (t.responseEmail)
    doc.text(`Reviewer email: ${t.responseEmail}`, 15, startY + 28);

  if (t.responseStars) {
    doc.text(`Rating: ${t.responseStars} / 5`, 15, startY + 7);
  }

  doc.text(`Text testimonial: ${t.responseMessage}`, 15, startY + 21);
  doc.text(`Title: ${t.responseTitle}`, 15, startY + 14);

  if (t.responseAddress)
    doc.text(`Address: ${t.responseAddress}`, 15, startY + 35);
  if (t.responseSocialLink)
    doc.text(`Social: ${t.responseSocialLink}`, 15, startY + 42);

  doc.save(`${t.responseName || "testimonial"}.pdf`);
};
