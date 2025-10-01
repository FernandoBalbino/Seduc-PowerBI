import { redirect } from "next/navigation";
import { logout } from "@/app/login/action";

import { createClient } from "@/utils/supabase/serve";
import { getUsuario } from "./action";
export default async function PrivatePage() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/login");
  }
  const usuario = await getUsuario();

  return (
    <>
      <p>Hello, VOCE TEM SETORES: {usuario.setores}</p>;
      <form action={logout}>
        <button className="cursor-pointer bg-red-200">sair</button>
      </form>
    </>
  );
}
