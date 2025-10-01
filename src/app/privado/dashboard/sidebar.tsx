"use client";
import { usePathname } from "next/navigation";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import Link from "next/link";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDown } from "lucide-react";
import { CiLogout } from "react-icons/ci";
import { logout } from "@/app/login/action";
function setorToSlug(setor: string): string {
  return setor
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "-");
}

interface AppSidebarProps {
  setores: string[];
  userName: string;
  dashboards?: Array<{
    id: string;
    name: string;
    url: string;
    sector: string;
  }>;
}

export function AppSidebar({ setores, userName }: AppSidebarProps) {
  const pathname = usePathname();
  console.log(setores);
  const setoresFormatados = setores.map((setor) => ({
    nome: setor,
    slug: setorToSlug(setor),
    url: `/privado/dashboard/${setorToSlug(setor)}`,
  }));

  const setorAtivo = setoresFormatados.find((setor) =>
    pathname.startsWith(setor.url)
  ) || {
    nome: "Selecione um setor",
    slug: "",
    url: "/privado/dashboard",
  };

  return (
    <Sidebar variant="sidebar">
      <SidebarContent className="bg-white">
        <SidebarGroup>
          <div className="flex pointer-events-none items-center gap-2 py-3 px-3 border-b border-b-gray-200 mb-3">
            <div className="bg-blue-500 p-5 rounded-2xl w-[50px] h-[50px] flex justify-center items-center text-white text-2xl">
              S
            </div>
            <div className="flex flex-col">
              <div className="font-bold uppercase">Seduc</div>
              <div className="text-blue-500 font-bold">PowerBI</div>
            </div>
          </div>

          <div className="px-3 mb-4">
            <SidebarGroupLabel className="text-xs ">
              SETOR ATUAL
            </SidebarGroupLabel>
            <Collapsible className="mb-3">
              <CollapsibleTrigger className="w-full flex items-center justify-between px-4 py-3 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 cursor-pointer transition-colors group">
                <span className="font-medium text-gray-900 text-sm">
                  {typeof setorAtivo === "string"
                    ? setorAtivo
                    : setorAtivo.nome}
                </span>
                <ChevronDown className="w-4 h-4 text-gray-600 transition-transform group-data-[state=open]:rotate-180" />
              </CollapsibleTrigger>

              <CollapsibleContent className="mt-2 space-y-1">
                {setoresFormatados.map((setor) => {
                  const isActive = pathname.startsWith(setor.url);

                  return (
                    <Link
                      key={setor.slug}
                      href={setor.url}
                      className={`w-full flex items-center px-4 py-2 rounded-lg transition-colors text-left ${
                        isActive
                          ? "bg-blue-100 text-blue-700 font-medium"
                          : "hover:bg-gray-100 text-gray-700"
                      }`}
                    >
                      <span className="text-sm">{setor.nome}</span>
                    </Link>
                  );
                })}
              </CollapsibleContent>
            </Collapsible>
          </div>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="bg-white border-t border-t-gray-200">
        <div className="  flex justify-between items-center p-4">
          <p className="text-sm font-medium text-gray-900">{userName}</p>
          <HoverCard openDelay={100} closeDelay={100}>
            <HoverCardTrigger>
              <CiLogout
                size={30}
                color="#2B7FFF"
                onClick={logout}
                className="cursor-pointer"
              />
            </HoverCardTrigger>
            <HoverCardContent className="w-[40px]   h-[40px] flex justify-center items-center rounded-2xl text-black">
              <div className="text-[15px]">Sair</div>
            </HoverCardContent>
          </HoverCard>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
