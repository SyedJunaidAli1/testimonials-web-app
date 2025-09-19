"use client";
import { useState, useTransition } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createSpaces } from "@/server/spaces";
import { useRouter } from "next/navigation";
import { Plus, GripVertical, Trash } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Image from "next/image";

export default function CreateSpaceDialog() {
  // Text inputs
  const [spacename, setSpacename] = useState("");
  const [customMessage, setCustomMessage] = useState("");
  const [headerTitle, setHeaderTitle] = useState("");

  // Dynamic questions
  const [questions, setQuestions] = useState<string[]>([
    "Who are you / what are you working on?",
    "How has [our product / service] helped you?",
    "What is the best thing about [our product / service]?",
  ]);

  // Switches (booleans)
  const [collectName, setCollectName] = useState(true);
  const [collectEmail, setCollectEmail] = useState(true);
  const [collectTitle, setCollectTitle] = useState(false);
  const [collectSocialLink, setCollectSocialLink] = useState(false);
  const [collectAddress, setCollectAddress] = useState(false);
  const [collectStar, setCollectStar] = useState(true);
  const [customThemeColor, setCustomThemeColor] = useState(false);
  const [spaceLogo, setSpaceLogo] = useState<string | null>(null);
  const [isSquare, setIsSquare] = useState(false);
  const [themeColor, setThemeColor] = useState("#34D399"); // emerald default
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleAddQuestion = () => {
    if (questions.length < 5) {
      setQuestions([...questions, ""]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setSpaceLogo(previewUrl);
    }
  };

  const predefinedColors = [
    "#F87171", // red
    "#60A5FA", // blue
    "#34D399", // emerald
    "#FBBF24", // amber
    "#A78BFA", // violet
    "#F472B6", // pink
    "#000000", // black
    "#FFFFFF", // white
  ];

  const handleRemoveQuestion = (index: number) => {
    setQuestions(questions.filter((_, i) => i !== index));
  };

  const handleChangeQuestion = (index: number, value: string) => {
    const updated = [...questions];
    updated[index] = value;
    setQuestions(updated);
  };

  const handleSubmit = () => {
    if (!spacename.trim()) return;

    startTransition(async () => {
      try {
        const fd = new FormData();

        fd.append("spacename", spacename);
        fd.append("customMessage", customMessage);
        fd.append("headerTitle", headerTitle);
        fd.append("customBtnColor", themeColor);
        fd.append("isShared", "false");

        // append questions
        questions.forEach((q, i) => fd.append(`question${i + 1}`, q));

        // append toggles
        fd.append("collectName", String(collectName));
        fd.append("collectEmail", String(collectEmail));
        fd.append("collectAddress", String(collectAddress));
        fd.append("collectStar", String(collectStar));
        fd.append("collectSocialLink", String(collectSocialLink));
        fd.append("collectTitle", String(collectTitle));
        fd.append("customThemeColor", String(customThemeColor));

        // append file
        const fileInput = document.getElementById(
          "logo-upload"
        ) as HTMLInputElement;
        if (fileInput?.files?.[0]) {
          fd.append("spaceLogo", fileInput.files[0]);
        }

        await createSpaces(fd);

        // reset
        setSpacename("");
        setCustomMessage("");
        setHeaderTitle("");
        setQuestions([]);
        setCollectName(true);
        setCollectEmail(true);
        setCollectAddress(false);
        // router.refresh();
      } catch (err: any) {
        console.error("Failed to create space:", err);
        setError(err);
      }
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Plus /> Create a new space
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Create Space</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-4">
          <form onSubmit={handleSubmit} className="flex flex-col gap-2">
            {error && (
              <p className="text-sm text-red-500">
                {error || "Something went wrong"}
              </p>
            )}
            <Input
              placeholder="Space name"
              value={spacename}
              onChange={(e) => setSpacename(e.target.value)}
              required
            />

            {/* Space Logo Upload */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium">Space Logo</label>

              <div
                className={`relative w-24 h-24 border flex items-center justify-center overflow-hidden ${
                  isSquare ? "rounded-md" : "rounded-full"
                }`}
              >
                {spaceLogo ? (
                  <Image
                    src={spaceLogo}
                    alt="Space logo"
                    fill
                    className="object-cover"
                  />
                ) : (
                  <Image
                    src="/image-holder.png"
                    height={50}
                    width={50}
                    alt="no logo"
                  />
                )}
              </div>

              <div className="flex gap-2 mt-2">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() =>
                    document.getElementById("logo-upload")?.click()
                  }
                >
                  {spaceLogo ? "Change" : "Upload"} Logo
                </Button>
                {spaceLogo && (
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => setSpaceLogo(null)}
                  >
                    Remove
                  </Button>
                )}
              </div>

              <input
                id="logo-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />

              {/* Shape toggle */}
              <div className="flex items-center gap-2 mt-2">
                <input
                  type="checkbox"
                  id="square-check"
                  checked={isSquare}
                  onChange={(e) => setIsSquare(e.target.checked)}
                  className="h-4 w-4"
                />
                <label htmlFor="square-check" className="text-sm">
                  Use square logo
                </label>
              </div>
            </div>

            <Input
              placeholder="Header title"
              value={headerTitle}
              onChange={(e) => setHeaderTitle(e.target.value)}
              required
            />
            <Textarea
              placeholder="Your custom message"
              value={customMessage}
              onChange={(e) => setCustomMessage(e.target.value)}
              required
            />

            {/* Dynamic Questions */}
            <div className="flex flex-col gap-3">
              <p className="text-sm font-medium">Questions</p>
              {questions.map((q, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 border rounded-md p-2"
                >
                  <GripVertical className="w-4 h-4 text-muted-foreground" />
                  <Input
                    value={q}
                    onChange={(e) => handleChangeQuestion(i, e.target.value)}
                    placeholder={`Question ${i + 1}`}
                    maxLength={100}
                  />
                  <span className="text-xs text-muted-foreground whitespace-nowrap">
                    {q.length}/100
                  </span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleRemoveQuestion(i)}
                  >
                    <Trash className="w-4 h-4" />
                  </Button>
                </div>
              ))}

              {questions.length < 5 && (
                <Button
                  variant="ghost"
                  className="flex items-center gap-1 self-start"
                  onClick={handleAddQuestion}
                >
                  <Plus className="w-4 h-4" /> Add one (up to 5)
                </Button>
              )}
            </div>

            {/* Toggles */}
            <div className="flex flex-row items-center justify-center gap-2">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>Data collection options</AccordionTrigger>
                  <AccordionContent>
                    <div className="flex flex-col gap-3 p-2">
                      <div className="flex justify-between items-center">
                        <span>Name</span>
                        <Switch
                          checked={collectName}
                          onCheckedChange={setCollectName}
                        />
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Email</span>
                        <Switch
                          checked={collectEmail}
                          onCheckedChange={setCollectEmail}
                        />
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Title, company</span>
                        <Switch
                          checked={collectTitle}
                          onCheckedChange={setCollectTitle}
                        />
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Social link</span>
                        <Switch
                          checked={collectSocialLink}
                          onCheckedChange={setCollectSocialLink}
                        />
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Address</span>
                        <Switch
                          checked={collectAddress}
                          onCheckedChange={setCollectAddress}
                        />
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
              <p className="flex flex-col gap-2">
                Collect star
                <Switch
                  checked={collectStar}
                  onCheckedChange={setCollectStar}
                />
              </p>
              <p className="flex flex-col gap-2">
                Choose theme
                <Switch
                  checked={customThemeColor}
                  onCheckedChange={setCustomThemeColor}
                />
              </p>
            </div>

            {/* Theme Color Picker */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium">Theme Color</label>

              {/* Predefined colors */}
              <div className="flex flex-wrap gap-2">
                {predefinedColors.map((color) => (
                  <button
                    key={color}
                    type="button"
                    onClick={() => setThemeColor(color)}
                    className={`h-8 w-8 rounded-md border-2 ${
                      themeColor === color
                        ? "border-black"
                        : "border-transparent"
                    }`}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>

              {/* Custom color input */}
              <div className="flex items-center gap-2">
                <Input
                  type="color"
                  value={themeColor}
                  onChange={(e) => setThemeColor(e.target.value)}
                  className="w-16 h-10 p-0 border"
                />
                <Input
                  type="text"
                  placeholder="#000000"
                  value={themeColor}
                  onChange={(e) => setThemeColor(e.target.value)}
                  className="w-28"
                />
              </div>
            </div>

            <Button type="submit" className=" w-full">
              {isPending ? "Creating..." : "Create"}
            </Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
