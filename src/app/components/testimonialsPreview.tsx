import { Button } from "@/components/ui/button";
import { Pen } from "lucide-react";
import Image from "next/image";

// Preview component
export function TestimonialsPreview({
  customMessage,
  headerTitle,
  questions,
  spaceLogo,
  themeColor,
}: {
  customMessage: string;
  headerTitle: string;
  questions: string[];
  spaceLogo: string | null;
  themeColor: string;
}) {
  return (
    <div className="rounded-lg p-4 w-full">
      {/* Logo */}
      <div className="flex items-center gap-2 mb-4">
        {spaceLogo ? (
          <Image
            src={spaceLogo}
            alt="Preview logo"
            width={50}
            height={50}
            className="rounded-full"
          />
        ) : (
          <div className="w-12 h-12 bg-gray-200 rounded-full" />
        )}
        {/* Header + message */}
        <h2 className="text-lg font-bold" style={{ color: themeColor }}>
          {headerTitle || "Your header here"}
        </h2>
      </div>

      <p className="text-md text-gray-500">
        {customMessage || "Custom message..."}
      </p>

      {/* Questions */}
      <ul className="mt-3 space-y-2 text-gray-500">
        <p className="text-lg">QUESTIONS</p>
        {questions.map((q, i) => (
          <li key={i} className="text-sm">
            • {q}
          </li>
        ))}
      </ul>

      {/* Buttons */}
      <Button className="w-full mt-6" style={{ background: themeColor }}>
        <Pen />
        Send in Text
      </Button>
    </div>
  );
}
