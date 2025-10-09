"use server";
import { createClient } from "@/utils/supabase/serve";
import { prisma } from "@/lib/prisma";
import { unstable_cache } from "next/cache";

type User = {
  id: string;
  email: string;
  nome: string;
  setores: string[];
};

type Dashboard = {
  id: string;
  name: string;
  url: string;
  sector: string;
};

/**
 * Função dinâmica (não pode ser cacheada porque usa cookies do Supabase)
 */
export async function getUsuario(): Promise<User> {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();

  if (!data.user?.id) {
    throw new Error("Sessão inválida");
  }

  const rawUser = await prisma.user.findUnique({
    where: { id: data.user.id },
    select: {
      id: true,
      email: true,
      nome: true,
      sectors: { select: { sector: true } },
    },
  });

  if (!rawUser) {
    throw new Error("Usuário não encontrado");
  }

  return {
    id: rawUser.id,
    email: rawUser.email,
    nome: rawUser.nome,
    setores: rawUser.sectors.flatMap((s: { sector: string }) => {
      try {
        const parsed = JSON.parse(s.sector) as unknown;
        return Array.isArray(parsed) ? (parsed as string[]) : [s.sector];
      } catch {
        return [s.sector];
      }
    }),
  };
}

/**
 * Função cacheada (só Prisma, sem cookies)
 */
export const getDashboardsBySetor = unstable_cache(
  async (setor: string): Promise<Dashboard[]> => {
    return prisma.dashboard.findMany({
      where: {
        sector: {
          equals: setor,
          mode: "insensitive",
        },
      },
      select: {
        id: true,
        name: true,
        url: true,
        sector: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  },
  ["dashboards"], // chave do cache
  {
    revalidate: 60,
    tags: ["dashboards-list"],
  }
);

export const getDashboardsByID = unstable_cache(
  async (id: string): Promise<Dashboard | null> => {
    return prisma.dashboard.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        url: true,
        sector: true,
      },
    });
  },
  ["dashboardByID"], // chave do cache
  { revalidate: 120 } // 2 minutos
);
