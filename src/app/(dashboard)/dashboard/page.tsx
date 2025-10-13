"use client";
import { Button } from "@/components/ui/button";
import {
  Ellipsis,
  Files,
  FileText,
  FolderOpen,
  Link,
  Lock,
  Rows4,
  Search,
  TriangleAlert,
} from "lucide-react";
import CreateSpaceDialog from "@/app/components/CreateSpaceDialog";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteSpaces, duplicateSpace, getSpaces } from "@/server/spaces";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import { Spinner } from "@/components/ui/spinner";


const Page = () => {
  const {
    data: spaces,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["spaces"],
    queryFn: async () => {
      return await getSpaces();
    },
  });

  const queryClient = useQueryClient();

  const { mutate: removeSpace } = useMutation({
    mutationFn: async (id: string) => await deleteSpaces(id),
    onSuccess: () => {
      toast.success("Space deleted");
      queryClient.invalidateQueries({ queryKey: ["spaces"] });
    },
    onError: (err: any) => {
      toast.error(err.message || "Failed to delete space");
    },
  });

  const { mutate: copySpace } = useMutation({
    mutationFn: async (spaceId: string) => {
      return await duplicateSpace(spaceId);
    },
    onSuccess: () => {
      toast.success("Space duplicated successfully");
      queryClient.invalidateQueries({ queryKey: ["spaces"] });
    },
    onError: (err: any) => {
      toast.error(err.message || "Failed to duplicate space");
    },
  });

  if (isLoading)
    return (
      <div className="flex items-center justify-center h-screen w-screen">
        <Spinner className="size-10 text-primary" />
      </div>
    );
  if (error) return <p>Something went wrong</p>;

  return (
    <>
      <main className="flex flex-col h-screen items-center pt-20">
        <section className="w-full max-w-5xl mt-10">
          <h2 className="text-2xl font-bold text-left py-4">Overview</h2>
          <div className="flex gap-6">
            <div className="bg-primary w-[22rem] h-[8rem] px-4 py-4 rounded-lg">
              <div className="flex justify-between">
                <p className="text-left text-lg font-semibold">Total Text</p>
                <FileText />
              </div>
              <div className="flex gap-2 items-center mt-4 text-left">
                <p className="text-2xl ">0 /</p>
                <span className="font-semibold text-3xl">∞</span>
              </div>
            </div>
            <div className="bg-primary w-[22rem] h-[8rem] px-4 py-4 rounded-lg">
              <div className="flex justify-between">
                <p className="text-left text-lg font-semibold">Total Spaces</p>
                <FolderOpen />
              </div>
              <div className="flex gap-2 items-center mt-4 text-left">
                <p className="text-2xl ">0 /</p>
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
          <ul className="mt-6 grid grid-cols-1 gap-5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3 bg-gray-400">
            {/* Example item – duplicate / map this <li> for every record you fetch */}
            {spaces?.map((s: any) => (
              <li
                key={s.id}
                className="bg-primary w-80 h-30 px-4 py-4 rounded-lg list-none"
              >
                <div className="flex justify-between items-center">
                  <div className="flex gap-2 items-center">
                    <Image
                      width={45}
                      height={45}
                      alt="spacelogo"
                      src={s.spaceLogo}
                    />
                    <p className="text-lg font-semibold">{s.spacename}</p>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="p-1 rounded-sm hover:bg-purple-800">
                        <Ellipsis size={26} />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onClick={() => console.log("Edit", s.id)}
                      >
                        <Rows4 />
                        Manage testimonials
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => {
                          const url = `${window.location.origin}/testimonial/${s.slug}`;
                          navigator.clipboard.writeText(url);
                          toast.success("✅ Link copied to clipboard!");
                        }}
                      >
                        <Link />
                        Get the Link
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => copySpace(s.id)}>
                        <Files />
                        Duplicate the Space
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => console.log("Edit", s.id)}
                      >
                        <Lock />
                        Disable the Space
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => removeSpace(s.id)}>
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

export default Page;
