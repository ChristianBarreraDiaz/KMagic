// hooks
import { useNavbarToggle } from "@/store/navbarToggleStore";

type Props = {
  className: string;
};

function HamburgerToggle({ className }: Props) {
  const { isToggled, toggle } = useNavbarToggle();
  return (
    <div
      className={`relative h-5 w-7 cursor-pointer ${className ?? ""}`}
      onClick={toggle}
    >
      <span
        className={
          isToggled
            ? "absolute bottom-0 top-2 h-1 w-7 rotate-45 bg-white transition-transform duration-500 ease-in-out"
            : "block h-1 w-7 bg-white transition-transform duration-500 ease-in-out"
        }
      ></span>
      <span
        className={
          isToggled
            ? "absolute h-1 w-7 -translate-x-[100vw] translate-y-2 transform bg-white transition-transform duration-500 ease-in-out"
            : "my-1 block h-1 w-7 bg-white transition-transform duration-500 ease-in-out"
        }
      ></span>
      <span
        className={
          isToggled
            ? "absolute bottom-0 top-2 h-1 w-7 -rotate-45 bg-white transition-transform duration-500 ease-in-out"
            : "block h-1 w-7 bg-white transition-transform duration-500 ease-in-out"
        }
      ></span>
    </div>
  );
}

export default HamburgerToggle;
