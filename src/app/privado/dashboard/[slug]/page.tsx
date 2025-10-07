import { AiFillDatabase } from "react-icons/ai";

export default async function SetorPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return (
    <div>
      <div className="flex rounded-3xl  border-8 border-dashed bg-white mt-3  mx-auto items-center justify-center w-[98%] h-[calc(97vh-63px)] ">
        <div className="pointer-events-none justify-center items-center flex">
          <div>
            <AiFillDatabase className="mx-auto" color="#919191" size={150} />
          </div>
          <h1 className="text-6xl w-[80%] text-center mx-auto font-bold text-gray-400">
            Setor selecionado:{" "}
            <div className=" block uppercase text-gray-500">{slug}</div>
          </h1>
        </div>
      </div>
    </div>
  );
}
