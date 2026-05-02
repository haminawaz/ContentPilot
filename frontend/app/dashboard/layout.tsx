import type { Metadata } from "next";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { Topbar } from "@/components/dashboard/Topbar";
import { MobileNav } from "@/components/dashboard/MobileNav";

export const metadata: Metadata = {
  title: "Dashboard",
  description:
    "Your ContentPilot command center: generate SEO articles, review insights, and manage your profile.",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-canvas-cream flex">
      <Sidebar />
      <div className="flex-1 min-w-0 flex flex-col">
        <Topbar />
        <main className="flex-1 px-6 lg:px-10 py-8 pb-28 lg:pb-10">
          {children}
        </main>
      </div>
      <MobileNav />
    </div>
  );
}
