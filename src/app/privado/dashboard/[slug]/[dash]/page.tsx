import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

interface DashboardPageProps {
  params: {
    setor: string;
    dashboardId: string;
  };
}

export default async function DashboardPage({ params }: DashboardPageProps) {
  const { dashboardId } = params;

  return (
    <div className="h-full w-full p-6">
      <h1 className="text-2xl font-bold mb-4">teste</h1>
      <div className="w-full h-[calc(100vh-120px)] border rounded-lg overflow-hidden"></div>
    </div>
  );
}
