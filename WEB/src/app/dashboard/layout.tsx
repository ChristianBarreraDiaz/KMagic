// components
import Sidebar from "@/components/sidebar/sidebar";
import Navbar from "@/components/navigation/navbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <section className="fixed left-0 top-0 z-20 h-[60px] w-full">
        <Navbar />
      </section>
      <section className="lg:relative lg:grid lg:h-screen lg:w-full lg:grid-cols-[28%_78%] lg:grid-rows-[60px_calc(100%-60px)] lg:items-start lg:justify-start xl:h-auto xl:grid-cols-[23%_77%] 2xl:grid-cols-[20%_80%]">
        <Sidebar />
        <section className="row-start-2 row-end-3 h-full w-full max-w-[100vw] bg-slate-50 p-5 pt-[60px] lg:pt-0">
          {children}
        </section>
      </section>
    </>
  );
}
