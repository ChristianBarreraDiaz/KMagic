// next-auth
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "@/lib/next-auth";

// components
import SidebarResponsive from "@/components/sidebar/sidebar-responsive";

// types
import { User } from "@/types/user";

async function sidebar() {
  const serverSession = await getServerSession(authOptions);

  let user: User = {
    id: "",
    name: "",
    username: "",
    rol: "",
    rolDecription: "",
  };

  if (serverSession && serverSession.hasOwnProperty("user")) {
    user = serverSession.user ?? {
      id: "",
      name: "",
      username: "",
      rol: "",
      rolDecription: "",
    };
  }

  const isUserEmpty = Object.values(user).every((value) => !value);

  return <SidebarResponsive user={isUserEmpty ? user : null} />;
}

export default sidebar;
