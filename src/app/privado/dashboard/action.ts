"use server";
import { createClient } from "@/utils/supabase/serve";
import { prisma } from "@/lib/prisma";
import { unstable_cache, revalidatePath, revalidateTag } from "next/cache";

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
    revalidate: 30,
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

export async function deleteDashboard(
  id: string
): Promise<{ success: boolean; message: string }> {
  try {
    const dashboard = await prisma.dashboard.findUnique({
      where: { id },
    });

    if (!dashboard) {
      return { success: false, message: "Dashboard não encontrado" };
    }
    await prisma.dashboard.delete({
      where: { id },
    });

    revalidateTag("dashboards-list");

    return { success: true, message: "Dashboard deletado com sucesso!" };
  } catch (error) {
    console.error("ERROR AO DELETAR:", error);
    return { success: false, message: "Erro interno ao deletar" };
  }
}

export async function renomearDashboard(
  id: string,
  rename: string
): Promise<{ success: boolean; message: string }> {
  try {
    if (!rename || rename.trim().length === 0) {
      return { success: false, message: "Nome não pode estar vazio" };
    }

    const dashboard = await prisma.dashboard.update({
      where: { id },
      data: {
        name: rename.trim(),
      },
    });

    revalidateTag("dashboards-list");

    return {
      success: true,
      message: "Dashboard renomeado com sucesso!",
    };
  } catch (error) {
    console.error("ERRO AO RENOMEAR:", error);
    return {
      success: false,
      message: "Erro ao renomear dashboard",
    };
  }
}
