"use client";

// next
import { usePathname } from "@/lib/next/navigation";

// components
import SideBarContent from "@/components/sidebar/sidebar-content";
import { ScrollArea } from "@/components/ui/scroll-area";

function SidebarDesktop() {
  const pathname = usePathname();

  return (
    <aside
      className={`background-image-primary row-start-2 row-end-3 hidden h-full w-full text-white ${
        pathname && pathname.includes("/dashboard") ? "lg:block" : "hidden"
      }`}
    >
      <ScrollArea className="background-image-primary h-full w-full">
        <SideBarContent />
      </ScrollArea>
    </aside>
  );
}

export default SidebarDesktop;
