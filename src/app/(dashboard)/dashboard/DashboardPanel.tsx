"use client";
import { Button } from "@/components/ui/button";
import {
  Ellipsis,
  Files,
  FileText,
  FolderOpen,
  Link as LinkIcon,
  Lock,
  Rows4,
  Search,
  TriangleAlert,
} from "lucide-react";
import CreateSpaceDialog from "@/app/components/CreateSpaceDialog";
import Image from "next/image";
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
import { useCopySpace, useDeleteSpace, useSpaces } from "@/app/queries/spaces";

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

  if (spacesLoading || testimonialCountLoading)
    return (
      <div className="flex items-center justify-center h-screen w-screen">
        <Spinner className="size-10 text-primary" />
      </div>
    );

  if (spacesError || testimonialCountError) return <p>Something went wrong</p>;

  return (
    <>
      <main className="flex flex-col h-screen items-center pt-20">
        <section className="w-full max-w-5xl mt-10">
          <h2 className="text-2xl font-bold text-left py-4">Overview</h2>
          <div className="flex gap-6">
            <div className="bg-primary border border-border w-[22rem] h-[8rem] px-4 py-4 rounded-lg">
              <div className="flex justify-between">
                <p className="text-left text-lg font-semibold">Total Text</p>
                <FileText />
              </div>
              <div className="flex gap-2 items-center mt-4 text-left">
                <p className="text-2xl ">{testimonialCount} /</p>
                <span className="font-semibold text-3xl">∞</span>
              </div>
            </div>
            <div className="bg-primary border border-border w-[22rem] h-[8rem] px-4 py-4 rounded-lg">
              <div className="flex justify-between">
                <p className="text-left text-lg font-semibold">Total Spaces</p>
                <FolderOpen />
              </div>
              <div className="flex gap-2 items-center mt-4 text-left">
                <p className="text-2xl ">{totalSpaces} /</p>
                <span className="font-semibold text-3xl">∞</span>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full max-w-5xl mt-10">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-left py-4">Spaces</h2>
            <div className="flex gap-2">
              <Button>
                <Search />
                Search
              </Button>
              <CreateSpaceDialog />
            </div>
          </div>
          {/* 3-column grid that stays responsive */}
          <ul className="mt-6 grid grid-cols-1 gap-5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3 ">
            {/* Example item – duplicate / map this <li> for every record you fetch */}
            {spaces?.map((s: any) => (
              <li
                key={s.id}
                className="bg-primary border border-border w-80 h-30 px-4 py-4 rounded-lg list-none"
              >
                <div className="flex justify-between items-center">
                  <Link href={`/products/${s.slug}`}>
                    <div className="flex gap-2 items-center">
                      <Image
                        width={45}
                        height={45}
                        alt="spacelogo"
                        src={s.spaceLogo}
                      />
                      <p className="text-lg font-semibold">{s.spacename}</p>
                    </div>
                  </Link>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="p-1 rounded-sm hover:bg-blue-800">
                        <Ellipsis size={26} />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
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
                          toast.success("✅ Link copied to clipboard!");
                        }}
                      >
                        <LinkIcon />
                        Get the Link
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => copySpace.mutate(s.id)}>
                        <Files />
                        Duplicate the Space
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => console.log("Edit", s.id)}
                      >
                        <Lock />
                        Disable the Space
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => removeSpace.mutate(s.id)}
                      >
                        <TriangleAlert /> Delete the Space
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <div className="flex items-center mt-2 text-left">
                  <p className="text-2xl">{s.used ?? 0}</p>
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
