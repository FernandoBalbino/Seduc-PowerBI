import { getDashboardsByID } from "../../action";
import DashboardViewer from "./dashboardViewer";

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string; dash: string }>;
}) {
  const { dash } = await params;
  const dashboard = await getDashboardsByID(dash);

  return (
    <div>
      <DashboardViewer params={dashboard} />
    </div>
  );
}
