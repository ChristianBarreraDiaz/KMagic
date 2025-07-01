"use client";

// next
import Image from "@/lib/next/image";
import { usePathname } from "@/lib/next/navigation";
import Link from "@/lib/next/link";
import { Button } from "@/components/ui/button";

// components
import NavUser from "@/components/navigation/nav-user";
import HambugerToggle from "@/components/navigation/humburger";
import NavLinks from "@/components/navigation/nav-links";
import { Separator } from "@/components/ui/separator";

// types
import { User } from "@/types/user";

type Props = {
  user: User | null;
};

function NavbarContent(props: Props) {
  const user: User | null = props.user ?? null;
  const pathname = usePathname();

  return (
    <>
      <nav className="background-image-primary z-10 flex h-full w-full items-center justify-between px-7 md:flex">
        <HambugerToggle className="mr-1 block lg:hidden" />
        <Link href="/" className="cursor-pointer">
          <Image
            src={"/hero-2.png"}
            width={360}
            height={360}
            alt="hero logo"
            loading="eager"
            className={`w-[50px] ${
              !user ? "mx-auto my-0 lg:mx-0 lg:my-0" : "mx-0 my-0"
            }}`}
          />
        </Link>

        <NavLinks
          className="hidden text-chetwode-blue-50 lg:flex"
          pathname={pathname}
        />
        <div className="flex items-center gap-3">
          <Link
            href="/auth/signin"
            className={`grid h-10 w-full max-w-[150px] place-content-center rounded-md bg-accent px-4 py-2 text-sm font-medium text-accent-foreground text-black ring-offset-background transition-colors hover:bg-accent/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
              !user ? "hidden lg:grid" : "hidden"
            }`}
          >
            Iniciar sesión
          </Link>

          <Button variant={"secondary"} asChild>
            <Link
              href="/auth/signup"
              className={!user ? "hidden lg:flex" : "hidden"}
            >
              Registrase
            </Link>
          </Button>
        </div>
        <NavUser
          user={user ? user : null}
          className={!user ? "hidden" : "block lg:ml-[118px]"}
        />
      </nav>
      <div className="opacity-50">
        <Separator />
      </div>
    </>
  );
}

export default NavbarContent;
