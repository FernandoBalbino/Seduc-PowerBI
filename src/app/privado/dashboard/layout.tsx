import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./sidebar";
import { getUsuario } from "./action";
import Image from "next/image";
import { IoMdAdd } from "react-icons/io";
import Link from "next/link";
import { IoHomeOutline } from "react-icons/io5";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUsuario();

  return (
    <>
      <div className="bg-white flex justify-end items-center gap-3 rounded-none p-1.5 mb-1 text-black w-full border-b border-gray-200">
        {/* Botão Adicionar */}
        <Link
          prefetch={true}
          href={"/privado/dashboard/adicionar"}
          className="group relative flex items-center cursor-pointer gap-2 px-5 py-2.5 bg-gradient-to-r from-gray-100 to-gray-50 hover:from-gray-200 hover:to-gray-100 border border-gray-300 rounded-lg transition-all duration-300 ease-in-out hover:shadow-md active:scale-95"
        >
          <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
            Adicionar
          </span>
          <IoMdAdd
            className="text-gray-600 group-hover:text-gray-800 transition-colors duration-300"
            size={22}
          />
          <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </Link>

        {/* Botão Início */}
        <Link
          href={"/privado/dashboard"}
          prefetch={true}
          className="group cursor-pointer relative flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-gray-100 to-gray-50 hover:from-gray-200 hover:to-gray-100 border border-gray-300 rounded-lg transition-all duration-300 ease-in-out hover:shadow-md active:scale-95"
        >
          <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
            Início
          </span>
          <IoHomeOutline
            className="text-gray-600 group-hover:text-gray-800 transition-colors duration-300"
            size={22}
          />
          <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </Link>

        {/* Logo */}
        <div className="">
          <Image
            src="/logo.png"
            alt="Logo"
            className="object-cover w-auto h-auto"
            width={100}
            height={100}
          />
        </div>
      </div>

      <SidebarProvider>
        <AppSidebar setores={user.setores} userName={user.email} />
        <main className="bg-[#F9FAFB] h-full w-full">
          <SidebarTrigger className="text-6xl" />
          {children}
        </main>
      </SidebarProvider>
    </>
  );
}
