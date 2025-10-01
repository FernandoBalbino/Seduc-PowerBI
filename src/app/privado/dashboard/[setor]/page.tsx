import { getDashboardsBySetor } from "../action";
export default async function SetorPage({
  params,
}: {
  params: Promise<{ setor: string }>;
}) {
  const { setor } = await params;
  const dashboards = await getDashboardsBySetor(setor);

  return (
    <div>
      <h1>Setor: {setor}</h1>
      {/* Seu conteúdo aqui */}
    </div>
  );
}
