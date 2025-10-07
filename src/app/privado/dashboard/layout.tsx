import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./sidebar";
import { getUsuario } from "./action";
import Image from "next/image";
import { IoMdAdd } from "react-icons/io";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUsuario();

  return (
    <>
      <div className=" bg-white flex  justify-end items-center rounded-none  m-1 text-black w-full  border-b-2 ">
        <div className="border[#2B7FFF] flex justify-center items-center border-2 mr-2 p-1.5 cursor-pointer">
          <div>Adicionar</div>
          <IoMdAdd className="outline-none" color="black" size={30} />
        </div>
        <div>
          <Image
            src="/logo.png"
            alt="Logo"
            className="object-cover w-auto h-auto mr-2"
            width={100}
            height={100}
          />
        </div>
      </div>
      <SidebarProvider>
        {/* Sidebar agora busca os dashboards internamente */}
        <AppSidebar setores={user.setores} userName={user.email} />
        <main className="bg-[#F9FAFB] h-full w-full">
          <SidebarTrigger className="text-6xl" />
          {children}
        </main>
      </SidebarProvider>
    </>
  );
}
