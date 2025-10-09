import { type } from "os";
import { getUsuario } from "../action";
import AdicionarDashForm from "./form";

export default async function AdicionarDash() {
  const { setores } = await getUsuario();

  return (
    <>
      <div className="">
        <AdicionarDashForm setores={setores} />
      </div>
    </>
  );
}
