import { redirect } from "next/navigation";
import { logout } from "@/app/login/action";
import { createClient } from "@/utils/supabase/serve";

export default async function PrivatePage() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/login");
  }

  return (
    <>
      <p>Hello {data.user.email}</p>;
      <form action={logout}>
        <button className="cursor-pointer bg-red-200">sair</button>
      </form>
    </>
  );
}
