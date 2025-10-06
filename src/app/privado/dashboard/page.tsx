import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/serve";

export default async function PrivatePage() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/login");
  }

  return (
    <>
      <div className="flex rounded-3xl border-8 border-dashed mx-auto items-center justify-center w-[90%] h-[calc(95vh-58px)] ">
        <span className="text-white text-xl font-bold">d</span>
      </div>
    </>
  );
}
