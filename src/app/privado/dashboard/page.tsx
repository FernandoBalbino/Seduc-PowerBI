import { redirect } from "next/navigation";
import DashView from "./viewDash";
import { createClient } from "@/utils/supabase/serve";

export default async function PrivatePage() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/login");
  }

  return (
    <>
      <DashView />
    </>
  );
}
