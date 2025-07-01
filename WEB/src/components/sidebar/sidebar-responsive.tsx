// components
import SidebarDesktop from "@/components/sidebar/sidebar-desktop";
import SidebarMobile from "@/components/sidebar/sidebar-mobile";

// types
import { User } from "@/types/user";

type Props = {
  user: User | null;
};

function SidebarResponsive(props: Props) {
  const user: User | null = props.user ?? null;
  return (
    <>
      <SidebarDesktop />
      <SidebarMobile user={user} />
    </>
  );
}

export default SidebarResponsive;
