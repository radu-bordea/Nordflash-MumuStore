"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { LuImage } from "react-icons/lu";

function DownloadDashboardPdfButton({ targetId }: { targetId: string }) {
  const [loading, setLoading] = useState(false);

  const handleDownload = async () => {
    setLoading(true);
    try {
      const element = document.getElementById(targetId);
      if (!element) throw new Error("Fant ikke innholdet som skal lastes ned");

      // Loaded only in the browser, on click — both libraries touch
      // `document`/`window`, which don't exist during server rendering.
      const html2canvas = (await import("html2canvas")).default;
      const { jsPDF } = await import("jspdf");

const canvas = await html2canvas(element, {
  scale: 2,
  backgroundColor: "#ffffff",
  useCORS: true,
});

const imgData = canvas.toDataURL("image/png");

const marginMm = 10; // white border on every side
const pdfWidth = 210; // A4 mm
const pdfHeight = 297;
const usableWidth = pdfWidth - marginMm * 2;
const usableHeight = pdfHeight - marginMm * 2;

const imgWidth = usableWidth;
const imgHeight = (canvas.height * imgWidth) / canvas.width;

const pdf = new jsPDF("p", "mm", "a4");
let heightLeft = imgHeight;
let position = marginMm;

pdf.addImage(imgData, "PNG", marginMm, position, imgWidth, imgHeight);
heightLeft -= usableHeight;

while (heightLeft > 0) {
  position = heightLeft - imgHeight + marginMm;
  pdf.addPage();
  pdf.addImage(imgData, "PNG", marginMm, position, imgWidth, imgHeight);
  heightLeft -= usableHeight;
}

pdf.save(`salgsdashboard-${new Date().toISOString().slice(0, 10)}.pdf`);
    } catch (error) {
      console.error("Kunne ikke lage PDF av siden:", error);
      alert("Noe gikk galt ved generering av PDF. Prøv igjen.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button type="button" variant="outline" onClick={handleDownload} disabled={loading} className="cursor-pointer">
      <LuImage className="mr-2 h-4 w-4" />
      {loading ? "Genererer..." : "Last ned dashboard (PDF)"}
    </Button>
  );
}
export default DownloadDashboardPdfButton;