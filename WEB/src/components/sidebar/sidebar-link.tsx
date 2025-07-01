// next
// import Link from "@/lib/next/link";
import { Link as ScrollLink } from "react-scroll";

import { cn } from "@/lib/utils";

type Props = {
  children: React.ReactNode;
  href: string;
  active: boolean;
  onClick?: (() => void) & React.MouseEventHandler<HTMLButtonElement>;
};

function NavSidebarLink({ active, children, href, onClick }: Props) {
  return (
    <ScrollLink
      to={href}
      spy={true}
      smooth={true}
      offset={-60} // Adjust this offset based on your fixed navbar height
      duration={500}
      activeClass="active" // Add this line for the active class
      href={href}
      className={cn(
        "flex h-10 w-full items-center justify-start rounded-md px-4 py-2 text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        { "bg-accent text-black": active === true },
      )}
      onClick={onClick}
    >
      {children}
    </ScrollLink>
  );
}

export default NavSidebarLink;
