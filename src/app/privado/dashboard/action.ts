import { createClient } from "@/utils/supabase/serve";
import { prisma } from "@/lib/prisma";

type User = {
  id: string;
  email: string;
  nome: string;
  setores: string[];
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
    setores: rawUser.sectors.flatMap((s) => {
      try {
        const parsed = JSON.parse(s.sector);
        return Array.isArray(parsed) ? parsed : [s.sector];
      } catch {
        return [s.sector];
      }
    }),
  };
}

export type { User };
