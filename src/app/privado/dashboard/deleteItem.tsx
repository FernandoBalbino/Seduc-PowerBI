import { SlOptions } from "react-icons/sl";
import { BsTrash3 } from "react-icons/bs";
import { useSWRConfig } from "swr";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface PropsDash {
  dashboardId: string;
  setorAtual: string;
  onDelete?: () => void;
}

import { deleteDashboard, renomearDashboard } from "./action";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function DeleteItem({
  dashboardId,
  setorAtual,
  onDelete,
}: PropsDash) {
  const { mutate } = useSWRConfig();
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);
  const [valueInput, setValue] = useState("");
  const [renomeando, setRenomeando] = useState(false);
  async function handleDelete() {
    if (isDeleting) return;
    setIsDeleting(true);

    try {
      onDelete?.();

      const res = await deleteDashboard(dashboardId);

      if (res.success) {
        await mutate(["dashboards", setorAtual], undefined, {
          revalidate: true,
        });
        router.refresh();
      }
    } finally {
      setIsDeleting(false);
    }
  }

  async function handleRename(dashboardId: string, rename: string) {
    if (renomeando) return;
    setRenomeando(true);

    const res = await renomearDashboard(dashboardId, rename);
    try {
      if (res.success) {
        await mutate(["dashboards", setorAtual], undefined, {
          revalidate: true,
        });
        router.refresh();
      }
    } finally {
      setRenomeando(false);
    }
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="cursor-pointer">
          <SlOptions size={20} color="black" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-24" align="start">
        <DropdownMenuGroup>
          <DropdownMenuItem
            onClick={handleDelete}
            className="cursor-pointer"
            disabled={isDeleting}
          >
            {isDeleting ? "Deletando..." : "Deletar"}
            <DropdownMenuShortcut>
              <BsTrash3 color="red" />
            </DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuGroup>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>Renomear</DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent className=" p-4">
                <div className="flex w-full justify-center gap-x-1 h-full items-center">
                  <div className="w-full h-full">
                    <input
                      value={valueInput}
                      onChange={(i) => {
                        setValue(i.target.value);
                      }}
                      placeholder={renomeando ? "Salvando..." : "Novo nome..."}
                      type="text"
                      className="border-2 rounded-lg px-3 py-2"
                    />
                  </div>
                  <div className="w-full h-full">
                    <button
                      onClick={(i) => {
                        handleRename(dashboardId, valueInput);
                        setValue("");
                      }}
                      className="bg-green-600 flex justify-center items-center cursor-pointer w-[120px] rounded-lg border-2 px-3 py-2  h-full text-white "
                    >
                      {renomeando ? "Atualizando" : "Atualizar"}
                    </button>
                  </div>
                </div>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
