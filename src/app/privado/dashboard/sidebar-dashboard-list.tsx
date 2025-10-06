"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";

interface Dashboard {
  id: string;
  name: string;
  url: string;
  sector: string;
}

interface SidebarDashboardListProps {
  dashboards: Dashboard[];
  setor: string;
}

function setorToSlug(setor: string): string {
  return setor
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "-");
}

export function SidebarDashboardList({
  dashboards,
  setor,
}: SidebarDashboardListProps) {
  const pathname = usePathname();
  const setorSlug = setorToSlug(setor);

  return (
    <div className="space-y-1">
      {dashboards.map((dashboard) => {
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
  );
}
