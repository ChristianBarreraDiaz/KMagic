"use client";

// next
import { usePathname } from "@/lib/next/navigation";

// components
import SideBarContent from "@/components/sidebar/sidebar-content";
import SideBarContentGuest from "@/components/sidebar/sidebar-content-guest";
import { ScrollArea } from "@/components/ui/scroll-area";

// hooks
import { useNavbarToggle } from "@/store/navbarToggleStore";

// utils
import { cn } from "@/lib/utils";

// types
import { User } from "@/types/user";

type Props = {
  user: User | null;
};

function SidebarMobile(props: Props) {
  const { isToggled } = useNavbarToggle();
  const pathname = usePathname();
  const user: User | null = props.user ?? null;

  return (
    <aside
      className={cn(
        "h-100svh left-0 top-[60px] z-10 row-start-2 row-end-3 block w-full bg-primary text-white transition-transform duration-300 ease-in-out md:max-w-[320px] lg:static lg:hidden lg:max-w-full",
        { "shadow-full-soft fixed translate-x-0": isToggled === true },
        { "absolute -translate-x-full": isToggled === false },
      )}
    >
      <ScrollArea className="background-image-primary h-full w-full">
        {pathname && pathname.includes("/dashboard") === true ? (
          <SideBarContent />
        ) : (
          <SideBarContentGuest user={user} />
        )}
      </ScrollArea>
      <div
        role="banner"
        className={cn(
          "absolute left-0 top-0 -z-10 hidden h-full w-[100vw] translate-x-[320px] bg-primary bg-slate-800 transition-all duration-300 ease-in-out lg:hidden",
          { "opacity-20 md:block lg:hidden": isToggled === true },
          { "opacity-0 md:hidden": isToggled === false },
        )}
      ></div>
    </aside>
  );
}

export default SidebarMobile;
