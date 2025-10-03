"use client";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState, useCallback, useMemo } from "react";
import { LuBadgeHelp } from "react-icons/lu";

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
import { getDashboardsBySetor } from "./action";
import { ChevronDown, Loader2 } from "lucide-react";
import { CiLogout } from "react-icons/ci";
import { logout } from "@/app/login/action";

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

interface AppSidebarProps {
  setores: string[];
  userName: string;
}

type Dashboard = {
  id: string;
  name: string;
  url: string;
  sector: string;
};

// Cache de dashboards para evitar requisições repetidas
const dashboardsCache = new Map<
  string,
  { data: Dashboard[]; timestamp: number }
>();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutos

export function AppSidebar({ setores, userName }: AppSidebarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [dashboards, setDashboards] = useState<Dashboard[]>([]);
  const [loadingDashboards, setLoadingDashboards] = useState(false);

  // Memoizar setores formatados para evitar recálculos
  const setoresFormatados = useMemo(
    () =>
      setores.map((setor) => ({
        nome: setor,
        slug: setorToSlug(setor),
        url: `/privado/dashboard/${setorToSlug(setor)}`,
      })),
    [setores]
  );

  // Prefetch de todas as rotas de setores
  useEffect(() => {
    setoresFormatados.forEach((setor) => {
      router.prefetch(setor.url);
    });
  }, [setoresFormatados, router]);

  const setorAtivo = useMemo(
    () =>
      setoresFormatados.find((setor) => pathname.startsWith(setor.url)) || {
        nome: "Selecione um setor",
        slug: "",
        url: "/privado/dashboard",
      },
    [setoresFormatados, pathname]
  );

  // Extrai o setor atual da URL
  const setorSlug = pathname.split("/dashboard/")[1]?.split("/")[0];
  const setorAtual = setorSlug ? slugToSetor(setorSlug) : null;

  // Função otimizada para buscar dashboards com cache
  const fetchDashboards = useCallback(
    async (setor: string) => {
      if (!setor) {
        setDashboards([]);
        return;
      }

      // Verificar cache primeiro
      const cached = dashboardsCache.get(setor);
      const now = Date.now();

      if (cached && now - cached.timestamp < CACHE_DURATION) {
        setDashboards(cached.data);
        return;
      }

      try {
        setLoadingDashboards(true);
        const data = await getDashboardsBySetor(setor);

        // Atualizar cache
        dashboardsCache.set(setor, { data, timestamp: now });
        setDashboards(data);

        // Prefetch das rotas dos dashboards em paralelo
        if (data.length > 0) {
          const dashboardSlug = setorToSlug(setor);
          data.forEach((dashboard) => {
            const dashboardUrl = `/privado/dashboard/${dashboardSlug}/${dashboard.id}`;
            router.prefetch(dashboardUrl);
          });
        }
      } catch (err) {
        console.error("Erro ao buscar dashboards:", err);
        setDashboards([]);
      } finally {
        setLoadingDashboards(false);
      }
    },
    [router]
  );

  // Busca os dashboards quando o setor muda
  useEffect(() => {
    if (setorAtual) {
      fetchDashboards(setorAtual);
    } else {
      setDashboards([]);
    }
  }, [setorAtual, fetchDashboards]);

  // Prefetch proativo ao passar mouse sobre setores
  const handleSetorHover = useCallback(
    (setor: string) => {
      const cached = dashboardsCache.get(setor);
      const now = Date.now();

      // Se não está em cache ou cache expirou, fazer prefetch
      if (!cached || now - cached.timestamp >= CACHE_DURATION) {
        getDashboardsBySetor(setor)
          .then((data) => {
            dashboardsCache.set(setor, { data, timestamp: now });

            // Prefetch das rotas dos dashboards
            const dashboardSlug = setorToSlug(setor);
            data.forEach((dashboard) => {
              const dashboardUrl = `/privado/dashboard/${dashboardSlug}/${dashboard.id}`;
              router.prefetch(dashboardUrl);
            });
          })
          .catch(console.error);
      }
    },
    [router]
  );

  return (
    <Sidebar className="h-full " variant="sidebar">
      <SidebarContent className=" ">
        <SidebarGroup className="">
          <div className="flex pointer-events-none items-center gap-2 py-3 px-3 border-b border-b-gray-200 mb-3">
            <div className="bg-blue-500 p-5 rounded-2xl w-[50px] h-[50px] flex justify-center items-center text-white text-2xl">
              S
            </div>
            <div className="flex flex-col">
              <div className="font-bold uppercase">Seduc</div>
              <div className="text-blue-500 font-bold">PowerBI</div>
            </div>
          </div>
          <div className="px-3 mb-4 h-full">
            <SidebarGroupLabel className="text-xs ">
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
                {setoresFormatados.map((setor) => {
                  const isActive = pathname.startsWith(setor.url);

                  return (
                    <Link
                      key={setor.slug}
                      href={setor.url}
                      onMouseEnter={() => handleSetorHover(setor.nome)}
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

          {/* Seção de Dashboards */}
          <div className="px-3  w-full">
            <SidebarGroupLabel className="text-xs mb-2">
              DASHBOARDS
            </SidebarGroupLabel>

            {!setorAtual ? (
              <div className="text-sm border-4 flex flex-col justify-center py-10 items-center border-dashed  text-center">
                <LuBadgeHelp color="#919191" size={70} className="mr-2" />
                <p className="text-[#919191] mx-auto px-3">
                  Selecione um setor para ver os dashboards
                </p>
              </div>
            ) : loadingDashboards ? (
              <div className="flex items-center justify-center py-4">
                <Loader2 className="w-5 h-5 animate-spin text-blue-500" />
              </div>
            ) : dashboards.length === 0 ? (
              <div className="text-sm border-4 flex flex-col justify-center py-10 items-center border-dashed  text-center">
                <LuBadgeHelp color="#919191" size={70} className="mr-2" />
                <p className="text-[#919191] mx-auto px-3">
                  Nenhum dashboard nesse setor. Por favor, adicione um novo e
                  atribua ao setor {setorAtual}.
                </p>
              </div>
            ) : (
              <div className="space-y-1">
                {dashboards.map((dashboard) => {
                  const dashboardUrl = `/privado/dashboard/${setorSlug}/${dashboard.id}`;
                  const isActive = pathname === dashboardUrl;

                  return (
                    <Link
                      key={dashboard.id}
                      href={dashboardUrl}
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
