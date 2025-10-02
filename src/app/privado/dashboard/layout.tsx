import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./sidebar";
import { getUsuario, getDashboardsBySetor } from "./action";
export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUsuario();

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
