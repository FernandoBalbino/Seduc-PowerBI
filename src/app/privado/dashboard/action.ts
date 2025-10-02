import { createClient } from "@/utils/supabase/serve";
import { prisma } from "@/lib/prisma";

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
export async function getDashboardsBySetor(
  setor: string
): Promise<Dashboard[]> {
  const dashboards = await prisma.dashboard.findMany({
    where: {
      sector: {
        equals: setor, // Filtra dashboards que contêm o setor especificado
        mode: "insensitive", // Ignora maiúsculas/minúsculas na comparação
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

  return dashboards;
}
export type { User };
