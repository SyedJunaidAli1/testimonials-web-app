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
  const [collectSocial, setCollectSocial] = useState(false);
  const [collectAddress, setCollectAddress] = useState(false);
  const [collectStar, setCollectStar] = useState(true);
  const [customThemeColor, setCustomThemeColor] = useState(false);

  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleAddQuestion = () => {
    if (questions.length < 5) {
      setQuestions([...questions, ""]);
    }
  };

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
        await createSpaces({
          name: spacename,
          customMessage,
          headerTitle,
          question1: questions[0] || "",
          question2: questions[1] || "",
          question3: questions[2] || "",
          question4: questions[3] || "",
          question5: questions[4] || "",
          collectName,
          collectEmail,
          collectAddress,
          collectStar,
          customBtnColor: "#000", // placeholder for now
          spaceLogo: "",
          isShared: false,
        });

        // Reset form
        setSpacename("");
        setCustomMessage("");
        setHeaderTitle("");
        setQuestions([]);
        setCollectName(true);
        setCollectEmail(true);
        setCollectTitle(false);
        setCollectSocial(false);
        setCollectAddress(false);

        router.refresh();
      } catch (error) {
        console.error("Failed to create space:", error);
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
          <Input
            placeholder="Space name"
            value={spacename}
            onChange={(e) => setSpacename(e.target.value)}
            required
          />
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
                        checked={collectSocial}
                        onCheckedChange={setCollectSocial}
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
              <Switch checked={collectStar} onCheckedChange={setCollectStar} />
            </p>
            <p className="flex flex-col gap-2">
              Choose theme
              <Switch
                checked={customThemeColor}
                onCheckedChange={setCustomThemeColor}
              />
            </p>
          </div>

          <div>
            <p>Custom button color</p>
            <Button>color</Button>
          </div>

          <Button
            onClick={handleSubmit}
            disabled={isPending || !spacename.trim()}
          >
            {isPending ? "Creating..." : "Create"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
