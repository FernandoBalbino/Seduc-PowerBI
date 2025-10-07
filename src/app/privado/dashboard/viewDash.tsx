import { TiChartPie } from "react-icons/ti";

export default function DashView() {
  return (
    <>
      <div className="flex rounded-3xl  border-8 border-dashed bg-white mt-3  mx-auto items-center justify-center w-[98%] h-[calc(97vh-63px)] ">
        <div className="pointer-events-none">
          <div>
            <TiChartPie className="mx-auto" color="#919191" size={180} />
          </div>
          <h1 className="text-6xl w-[80%] text-center mx-auto font-bold text-gray-400">
            Escolha o setor para acessar o dashboard
          </h1>
        </div>
      </div>
    </>
  );
}
