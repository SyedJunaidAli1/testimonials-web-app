"use client";
import {
  Ellipsis,
  Files,
  FileText,
  FolderOpen,
  Link as LinkIcon,
  Lock,
  Rows4,
  TriangleAlert,
  Unlock,
} from "lucide-react";
import CreateSpaceDialog from "@/app/components/CreateSpaceDialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import { Spinner } from "@/components/ui/spinner";
import Link from "next/link";
import { useTestimonialCount } from "@/app/queries/testimonials";
import {
  useCopySpace,
  useDeleteSpace,
  useSpaces,
  useToggleSpaceStatus,
} from "@/app/queries/spaces";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const DashboardPanel = () => {
  const {
    data: spaces,
    isLoading: spacesLoading,
    error: spacesError,
  } = useSpaces();

  const {
    data: testimonialCount,
    isLoading: testimonialCountLoading,
    isError: testimonialCountError,
  } = useTestimonialCount();

  const totalSpaces = spaces?.length ?? 0;
  const removeSpace = useDeleteSpace();
  const copySpace = useCopySpace();
  const toggleStatus = useToggleSpaceStatus();

  if (spacesLoading || testimonialCountLoading)
    return (
      <div className="flex items-center justify-center h-screen w-screen">
        <Spinner className="size-10 text-primary" />
      </div>
    );

  if (spacesError || testimonialCountError)
    return (
      <div className="flex items-center justify-center h-screen w-screen">
        <p>Something went wrong</p>
      </div>
    );

  return (
    <>
      <main className="flex flex-col min-h-screen items-center pt-20 px-4">
        {/* === OVERVIEW === */}
        <section className="w-full max-w-5xl mt-4 sm:mt-10">
          <h2 className="text-2xl font-bold py-4">Overview</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {/* Total Text */}
            <div className="bg-primary border border-border rounded-lg px-4 py-5 h-auto sm:h-32 flex flex-col justify-between">
              <div className="flex justify-between items-center">
                <p className="text-lg font-semibold">Total Text</p>
                <FileText />
              </div>
              <div className="flex gap-2 items-center mt-2 sm:mt-4">
                <p className="text-3xl font-bold">{testimonialCount}</p>
                <span className="text-3xl font-semibold opacity-80">∞</span>
              </div>
            </div>

            {/* Total Spaces */}
            <div className="bg-primary border border-border rounded-lg px-4 py-5 h-auto sm:h-32 flex flex-col justify-between">
              <div className="flex justify-between items-center">
                <p className="text-lg font-semibold">Total Spaces</p>
                <FolderOpen />
              </div>
              <div className="flex gap-2 items-center mt-2 sm:mt-4">
                <p className="text-3xl font-bold">{totalSpaces}</p>
                <span className="text-3xl font-semibold opacity-80">∞</span>
              </div>
            </div>
          </div>
        </section>

        {/* === SPACES LIST === */}
        <section className="w-full max-w-5xl mt-12">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold py-4">Spaces</h2>

            <div className="flex gap-2">
              <CreateSpaceDialog />
            </div>
          </div>

          {/* GRID — AUTO FIT ON RESPONSIVE */}
          <ul className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {spaces?.map((s: any) => (
              <li
                key={s.id}
                className="bg-primary border border-border rounded-lg px-4 py-4 shadow-sm hover:shadow-md transition-all"
              >
                {/* Top Row */}
                <div className="flex justify-between items-start gap-3">
                  <Link
                    href={`/products/${s.slug}`}
                    className="flex items-center gap-3 w-full"
                  >
                    {/* Avatar */}
                    <Avatar className="w-14 h-14 border shadow bg-background shrink-0">
                      <AvatarImage src={s.spaceLogo} alt={s.spacename} />
                      <AvatarFallback>{s.spacename[0]}</AvatarFallback>
                    </Avatar>

                    {/* Name */}
                    <p className="text-lg font-semibold line-clamp-2">
                      {s.spacename}
                    </p>
                  </Link>

                  {/* Dropdown Menu */}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="p-1 rounded-sm hover:bg-blue-800 transition">
                        <Ellipsis size={22} />
                      </button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent align="end" className="min-w-45">
                      <Link href={`/products/${s.slug}`}>
                        <DropdownMenuItem>
                          <Rows4 />
                          Manage testimonials
                        </DropdownMenuItem>
                      </Link>

                      <DropdownMenuItem
                        onClick={() => {
                          const url = `${window.location.origin}/testimonial/${s.slug}`;
                          navigator.clipboard.writeText(url);
                          toast.success("Link copied!");
                        }}
                      >
                        <LinkIcon />
                        Get the Link
                      </DropdownMenuItem>

                      <DropdownMenuItem onClick={() => copySpace.mutate(s.id)}>
                        <Files />
                        Duplicate Space
                      </DropdownMenuItem>

                      <DropdownMenuItem
                        onClick={() => toggleStatus.mutate(s.id)}
                      >
                        {s.disabled ? (
                          <>
                            <Unlock className="text-green-400" />
                            Enable Space
                          </>
                        ) : (
                          <>
                            <Lock className="text-red-400" />
                            Disable Space
                          </>
                        )}
                      </DropdownMenuItem>

                      <DropdownMenuItem
                        onClick={() => removeSpace.mutate(s.id)}
                      >
                        <TriangleAlert className="text-red-500" /> Delete Space
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </>
  );
};

export default DashboardPanel;
