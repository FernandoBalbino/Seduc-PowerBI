import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./sidebar";
import { cookies } from "next/headers";
import { getUsuario, getDashboardsBySetor, type User } from "./action";
export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const user = await getUsuario();
  const defaultOpen = cookieStore.get("sidebar_state")?.value === "true";

  // Buscar dashboards do primeiro setor como exemplo
  // Você pode modificar isso para buscar baseado no setor ativo
  const dashboards =
    user.setores.length > 0 ? await getDashboardsBySetor(user.setores[0]) : [];

  return (
    <SidebarProvider>
      <AppSidebar
        setores={user.setores}
        userName={user.email}
        dashboards={dashboards}
      />
      <main className="bg-[#F9FAFB] w-full">
        <SidebarTrigger className="text-6xl" />
        {children}
      </main>
    </SidebarProvider>
  );
}
