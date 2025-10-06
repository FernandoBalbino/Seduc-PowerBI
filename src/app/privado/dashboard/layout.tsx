import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./sidebar";
import { getUsuario } from "./action";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUsuario();

  return (
    <SidebarProvider>
      {/* Sidebar agora busca os dashboards internamente */}
      <AppSidebar setores={user.setores} userName={user.email} />
      <main className="bg-[#F9FAFB] w-full">
        <SidebarTrigger className="text-6xl" />
        {children}
      </main>
    </SidebarProvider>
  );
}
