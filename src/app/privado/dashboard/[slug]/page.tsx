import { getDashboardsBySetor } from "../action";
export default async function SetorPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const dashboards = await getDashboardsBySetor(slug);

  return (
    <div>
      <h1>Setor: {slug}</h1>
      {/* Seu conteúdo aqui */}
    </div>
  );
}
