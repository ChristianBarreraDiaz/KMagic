import Breadcrumbs from "@/components/ui/breadcrumbs";
import MockBarChart from "./components/mock-bar-chart";
import MockBarLinesChart from "./components/mock-bar-lines-chart";
import PolarAreaChart from "./components/mock-polar-area-chart";

export default function Home() {
  return (
    <div>
      <Breadcrumbs
        className="mt-[10px]"
        basePath={[{ name: "Dashboard", url: "/dashboard" }]}
        currentPath={{ name: "inicio", url: "/dashboard/inicio" }}
      />
      <h1 className="my-4 text-2xl font-bold">Inicio</h1>
      <div>
        <p>Por definir</p>
      </div>
      {/* <div className="grid md:grid-cols-2">
        <div className="flex flex-col items-center justify-between gap-8 md:block md:items-start md:justify-normal md:gap-0">
          <div>
            <MockBarChart />
          </div>
          <div>
            <MockBarLinesChart />
          </div>
        </div>
        <div className="mt-8 flex justify-center md:mt-0 md:block md:justify-normal">
          <div>
            <PolarAreaChart />
          </div>
        </div>
      </div> */}
    </div>
  );
}
