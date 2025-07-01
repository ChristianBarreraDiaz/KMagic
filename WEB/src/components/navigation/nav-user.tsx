"use client";

// next-auth
import { signOut } from "@/lib/next-auth/react";

// components
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// icons
import { GoSignOut } from "@/lib/react-icons/go";
import { PiUser } from "@/lib/react-icons/pi";

// types
import { User } from "@/types/user";
import Link from "@/lib/next/link";
import { MdOutlineDashboard } from "@/lib/react-icons/md";

type Props = {
  user: User | null;
  className: string;
};

function NavUser(props: Props) {
  const user: User | null = props.user ?? null;

  let nameFirstLetter: string = "";
  let name: string = "";
  let username: string = "";
  let rolDescription: string = "";

  if (user) {
    nameFirstLetter = user.name[0];
    username = user.username;
    name = user.name;
    rolDescription = user.rolDecription;
  } else {
    nameFirstLetter = "N/A";
    username = "N/A";
    name = "N/A";
    rolDescription = "N/A";
  }

  const handleSignOut = () => {
    signOut({ callbackUrl: "/" });
  };

  return (
    <div className={props.className}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-8 w-8 rounded-full">
            <Avatar className="h-8 w-8">
              <AvatarImage src="/avatars/01.png" alt="@shadcn" />
              <AvatarFallback>{nameFirstLetter}</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">{name}</p>
              <p className="text-xs leading-none text-muted-foreground">
                {rolDescription}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem className="cursor-pointer">
              <div className="flex w-full items-center justify-between">
                <span>Cuenta</span>
                <PiUser className="mr-2 h-4 w-4" />
              </div>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator
            className={user?.rol === "ADMINISTRADOR" ? "block" : "hidden"}
          />
          <DropdownMenuGroup
            className={user?.rol === "ADMINISTRADOR" ? "block" : "hidden"}
          >
            <DropdownMenuItem className="cursor-pointer">
              <Link
                href="/dashboard"
                className="flex w-full items-center justify-between"
              >
                <span>Dashboard</span>
                <MdOutlineDashboard className="mr-2 h-4 w-4" />
              </Link>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer">
            <div className="flex w-full items-center justify-between">
              <span>Cerrar Sesión</span>
              <GoSignOut className="mr-2 h-4 w-4" />
            </div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export default NavUser;
