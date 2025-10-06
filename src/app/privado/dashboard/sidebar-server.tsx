import { getDashboardsBySetor } from "./action";
import { SidebarDashboardList } from "./sidebar-dashboard-list";

import { LuBadgeHelp } from "react-icons/lu";
interface SidebarDashboardsProps {
  setor: string | null;
}
export const revalidate = 120;
export const dynamic = "force-static"; // forçar a revalidação a cada acesso
export async function SidebarDashboards({ setor }: SidebarDashboardsProps) {
  if (!setor) {
    return (
      <div className="text-sm border-4 flex flex-col justify-center py-10 items-center border-dashed text-center">
        <LuBadgeHelp color="#919191" size={70} className="mr-2" />
        <p className="text-[#919191] mx-auto px-3">
          Selecione um setor para ver os dashboards
        </p>
      </div>
    );
  }

  const dashboards = await getDashboardsBySetor(setor);

  if (dashboards.length === 0) {
    return (
      <div className="text-sm border-4 flex flex-col justify-center py-10 items-center border-dashed text-center">
        <LuBadgeHelp color="#919191" size={70} className="mr-2" />
        <p className="text-[#919191] mx-auto px-3">
          Nenhum dashboard nesse setor. Por favor, adicione um novo e atribua ao
          setor {setor}.
        </p>
      </div>
    );
  }

  return <SidebarDashboardList dashboards={dashboards} setor={setor} />;
}
