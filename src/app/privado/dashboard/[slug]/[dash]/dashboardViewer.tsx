type Dashboard = {
  id: string;
  name: string;
  url: string;
  sector: string;
};
import { FaFileArchive } from "react-icons/fa";
import { RiArchive2Fill } from "react-icons/ri";

import { SiLooker } from "react-icons/si";

import ModelLooker from "./modelLooker";
export default function DashboardViewer({
  params,
}: {
  params: Dashboard | null;
}) {
  const dashboardItem = params;
  return (
    <>
      <div className=" border-2 rounded-2xl p-4 mx-auto w-[80%] mt-3 flex justify-between ">
        <div className="flex items-center justify-center gap-x-2 ">
          <div>Modelo: Looker Studio Google</div>
          <div className="bg-blue-500 w-[60px] flex justify-center items-center h-[60px] rounded-full p-2">
            <SiLooker color="white" size={40} />
          </div>
        </div>
        <div className="flex items-center justify-center gap-x-2 ">
          <div className="bg-blue-500 w-[60px] flex justify-center items-center h-[60px] rounded-full p-2">
            <RiArchive2Fill color="white" size={30} />
          </div>
          <div>Nome do Dashboard: {dashboardItem?.name}</div>
        </div>
        <div className="flex items-center justify-center gap-x-2 ">
          <div className="bg-blue-500 w-[60px] flex justify-center items-center h-[60px] rounded-full p-2">
            <FaFileArchive color="white" size={30} />
          </div>
          <div>Setor do Dashboard: {dashboardItem?.sector}</div>
        </div>
      </div>
      <div className="flex rounded-3xl  border-8 border-dashed bg-white mt-3  mx-auto items-center justify-center w-[98%] h-[calc(100vh-157px)] ">
        <ModelLooker params={dashboardItem?.url ? dashboardItem.url : ""} />
      </div>
    </>
  );
}
