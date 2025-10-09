"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath, revalidateTag } from "next/cache";

type Dashboard = {
  name: string;
  url: string;
  sector: string;
};

type ActionState = {
  success: boolean;
  error?: string;
  dashboard?: Dashboard;
  message?: string;
} | null;

export default async function createDashboard(
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  const nome = formData.get("nome") as string;
  const setor = formData.get("setor") as string;
  const url = formData.get("url") as string;

  if (!nome || !setor || !url) {
    return {
      success: false,
      error: "Todos os campos são obrigatórios",
    };
  }

  try {
    const dashboard = await prisma.dashboard.create({
      data: {
        name: nome,
        sector: setor,
        url: url,
      },
    });

    revalidateTag("dashboards-list");
    revalidatePath("/privado/dashboard");
    return {
      success: true,
      dashboard: {
        name: dashboard.name,
        url: dashboard.url,
        sector: dashboard.sector,
      },
      message: "Dashboard criado com sucesso!",
    };
  } catch (error) {
    console.error("Erro ao criar dashboard:", error);
    return {
      success: false,
      error: "Erro ao criar dashboard. Tente novamente.",
    };
  }
}
