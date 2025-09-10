import Nav from "@/app/components/Nav";
import { Button } from "@/components/ui/button";
import { FileText, FolderOpen, Plus, Search } from "lucide-react";
import React from "react";

const page = () => {
  const spaces = [
    { id: 1, name: "Todothat", used: 0 },
    { id: 2, name: "textbehhindimage", used: 0 },
  ];
  return (
    <>
      <main className="flex flex-col h-screen items-center pt-50">
        <section className="w-full max-w-5xl mt-10">
          <h2 className="text-2xl font-bold text-left py-4">Overview</h2>
          <div className="flex gap-6">
            <div className="bg-primary w-90 h-30 px-4 py-4 rounded-lg">
              <div className="flex justify-between">
                <p className="text-left text-lg font-semibold">Total Text</p>
                <FileText />
              </div>
              <div className="flex gap-2 items-center mt-4 text-left">
                <p className="text-2xl ">0 /</p>
                <span className="font-semibold text-3xl">∞</span>
              </div>
            </div>
            <div className="bg-primary w-90 h-30 px-4 py-4 rounded-lg">
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
              <Button>
                <Plus />
                Create a new space
              </Button>
            </div>
          </div>
          {/* 3-column grid that stays responsive */}
          <ul className="mt-6 grid grid-cols-1 gap-5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {/* Example item – duplicate / map this <li> for every record you fetch */}
            {spaces.map((s) => (
              <li className="bg-primary w-80 h-30 px-4 py-4 rounded-lg list-none">
                <div className="flex justify-between">
                  <p className="text-left text-lg font-semibold">{s.name}</p>
                </div>
                <div className="flex gap-2 items-center mt-4 text-left">
                  <p className="text-2xl">{s.used}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </>
  );
};

export default page;
