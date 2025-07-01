// next
import Link from "@/lib/next/link";

//components
import SidebarLinks from "./sidebar-links";
import { Button } from "@/components/ui/button";

// utils
import { cn } from "@/lib/utils";

// types
import { User } from "@/types/user";

type Props = {
  user: User | null;
};

export default function SideBarContentGuest(props: Props) {
  const user: User | null = props.user ?? null;

  return (
    <div className="space-y-4 py-4">
      <div className="px-3 py-2">
        <div className="flex flex-col gap-2">
          <SidebarLinks />
          <Button
            variant={"default"}
            asChild
            className="mt-7 bg-chetwode-blue-500 hover:bg-chetwode-blue-400"
          >
            <Link href="/auth/signin" className={user ? "flex" : "hidden"}>
              Iniciar Sesión
            </Link>
          </Button>
          <Button variant={"secondary"} asChild>
            <Link href="/auth/signup" className={user ? "flex" : "hidden"}>
              {" "}
              Registrase
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
