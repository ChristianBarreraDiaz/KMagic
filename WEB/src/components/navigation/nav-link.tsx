// next
// import Link from "@/lib/next/link";
import { Link as ScrollLink } from "react-scroll";

type Props = {
  children: React.ReactNode;
  href: string;
  active: boolean;
  onClick?: (() => void) & React.MouseEventHandler<HTMLButtonElement>;
};

function NavLink({ active, children, href, onClick }: Props) {
  return (
    <ScrollLink
      to={href}
      spy={true}
      smooth={true}
      offset={-60} // Adjust this offset based on your fixed navbar height
      duration={500}
      activeClass="active" // Add this line for the active class
      href={href}
      className={
        active === true
          ? "after:bg-chetwode-blue-50 relative text-sm font-medium after:absolute after:left-0 after:top-5 after:h-[2px] after:w-full after:content-['']"
          : "after:bg-chetwode-blue-50 relative text-sm font-medium after:absolute after:left-0 after:top-5  after:h-[2px] after:w-0 after:transition-all after:duration-200 after:ease-in-out after:content-[''] hover:after:w-full hover:after:transition-all hover:after:duration-200 hover:after:ease-in-out hover:after:content-['']"
      }
      onClick={onClick}
    >
      {children}
    </ScrollLink>
  );
}

export default NavLink;
