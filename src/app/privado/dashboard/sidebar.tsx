"use client";
import useSWR from "swr";
import { usePathname } from "next/navigation";
import { useMemo } from "react";
import Link from "next/link";
import { LuBadgeHelp } from "react-icons/lu";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
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
import { ChevronDown, Loader2 } from "lucide-react";
import { CiLogout } from "react-icons/ci";
import { logout } from "@/app/login/action";
import { getDashboardsBySetor } from "@/app/privado/dashboard/action";

function setorToSlug(setor: string): string {
  return setor
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "-");
}

function slugToSetor(slug: string): string {
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

type Dashboard = {
  id: string;
  name: string;
  url: string;
  sector: string;
};

interface AppSidebarProps {
  setores: string[];
  userName: string;
}

const fetcher = async (setor: string) => getDashboardsBySetor(setor);

const SetorLink = ({ setor, isActive }: { setor: any; isActive: boolean }) => {
  return (
    <Link
      href={setor.url}
      prefetch={true} // prefetch automático
      className={`w-full flex items-center px-4 py-2 rounded-lg transition-colors text-left ${
        isActive
          ? "bg-blue-100 text-blue-700 font-medium"
          : "hover:bg-gray-100 text-gray-700"
      }`}
    >
      <span className="text-sm">{setor.nome}</span>
    </Link>
  );
};

export function AppSidebar({ setores, userName }: AppSidebarProps) {
  const pathname = usePathname();

  const setoresFormatados = useMemo(
    () =>
      setores.map((setor) => ({
        nome: setor,
        slug: setorToSlug(setor),
        url: `/privado/dashboard/${setorToSlug(setor)}`,
      })),
    [setores]
  );

  const setorAtivo = useMemo(
    () =>
      setoresFormatados.find((setor) => pathname.startsWith(setor.url)) || {
        nome: "Selecione um setor",
        slug: "",
        url: "/privado/dashboard",
      },
    [setoresFormatados, pathname]
  );

  const setorSlug = pathname.split("/dashboard/")[1]?.split("/")[0];
  const setorAtual = setorSlug ? slugToSetor(setorSlug) : null;

  // SWR otimizado com cache e sem revalidação desnecessária
  const { data: dashboards, isLoading } = useSWR(
    setorAtual ? ["dashboards", setorAtual] : null,
    () => fetcher(setorAtual!),
    {
      revalidateOnFocus: false, // evita refetch ao focar
      dedupingInterval: 60000, // 1 minuto de deduplicação
    }
  );

  return (
    <Sidebar className="h-full z-50" variant="sidebar">
      <SidebarContent>
        <SidebarGroup>
          {/* Header */}
          <div className="flex pointer-events-none items-center gap-2 py-3 px-3 border-b border-b-gray-200 mb-3">
            <div className="bg-blue-500 p-5 rounded-2xl w-[50px] h-[50px] flex justify-center items-center text-white text-2xl">
              S
            </div>
            <div className="flex flex-col">
              <div className="font-bold uppercase">Seduc</div>
              <div className="text-blue-500 font-bold">PowerBI</div>
            </div>
          </div>

          {/* Seletor de Setor */}
          <div className="px-3 mb-4 h-full">
            <SidebarGroupLabel className="text-xs">
              SETOR ATUAL
            </SidebarGroupLabel>
            <Collapsible defaultOpen className="mb-3">
              <CollapsibleTrigger className="w-full flex items-center justify-between px-4 py-3 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 cursor-pointer transition-colors group">
                <span className="font-medium text-gray-900 text-sm">
                  {typeof setorAtivo === "string"
                    ? setorAtivo
                    : setorAtivo.nome}
                </span>
                <ChevronDown className="w-4 h-4 text-gray-600 transition-transform group-data-[state=open]:rotate-180" />
              </CollapsibleTrigger>

              <CollapsibleContent className="mt-2 space-y-1">
                {setoresFormatados.map((setor) => (
                  <SetorLink
                    key={setor.slug}
                    setor={setor}
                    isActive={pathname.startsWith(setor.url)}
                  />
                ))}
              </CollapsibleContent>
            </Collapsible>
          </div>

          {/* Seção de Dashboards */}
          <div className="px-3 w-full">
            <SidebarGroupLabel className="text-xs mb-2">
              DASHBOARDS
            </SidebarGroupLabel>

            {!setorAtual ? (
              <div className="text-sm border-4 flex flex-col justify-center py-10 items-center border-dashed text-center">
                <LuBadgeHelp color="#919191" size={70} className="mr-2" />
                <p className="text-[#919191] mx-auto px-3">
                  Selecione um setor para ver os dashboards
                </p>
              </div>
            ) : isLoading ? (
              <div className="flex items-center justify-center py-4">
                <Loader2 className="w-5 h-5 animate-spin text-blue-500" />
              </div>
            ) : dashboards && dashboards.length === 0 ? (
              <div className="text-sm border-4 flex flex-col justify-center py-10 items-center border-dashed text-center">
                <LuBadgeHelp color="#919191" size={70} className="mr-2" />
                <p className="text-[#919191] mx-auto px-3">
                  Nenhum dashboard nesse setor. Por favor, adicione um novo e
                  atribua ao setor {setorAtual}.
                </p>
              </div>
            ) : (
              <div className="space-y-1">
                {dashboards?.map((dashboard) => {
                  const dashboardUrl = `/privado/dashboard/${setorSlug}/${dashboard.id}`;
                  const isActive = pathname === dashboardUrl;

                  return (
                    <Link
                      key={dashboard.id}
                      href={dashboardUrl}
                      prefetch={true}
                      className={`w-full flex items-center px-4 py-2 rounded-lg transition-colors text-left ${
                        isActive
                          ? "bg-blue-100 text-blue-700 font-medium"
                          : "hover:bg-gray-100 text-gray-700"
                      }`}
                    >
                      <span className="text-sm truncate">{dashboard.name}</span>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="bg-white border-t border-t-gray-200">
        <div className="flex justify-between items-center p-4">
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
            <HoverCardContent className="w-[40px] h-[40px] flex justify-center items-center rounded-2xl text-black">
              <div className="text-[15px]">Sair</div>
            </HoverCardContent>
          </HoverCard>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
