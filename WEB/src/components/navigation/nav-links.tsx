// components
import NavLink from "@/components/navigation/nav-link";
import { useSectionStore } from "@/store/sectionStore";

// types
type Props = {
  pathname: string;
  className: string;
};

export default function NavLinks({ pathname, className }: Props) {
  const { currentSection, setCurrentSection } = useSectionStore();

  const handleHeroSectionClick = () => {
    setCurrentSection("hero");
  };

  const handleDiscoverSectionClick = () => {
    setCurrentSection("discover");
  };

  const handleSyncSectionClick = () => {
    setCurrentSection("sync");
  };

  return (
    <div
      className={`items-center gap-5 text-accent-foreground ${
        pathname === "/" ? className : "hidden"
      }`}
    >
      <NavLink
        href="hero"
        active={currentSection === "hero" || currentSection === ""}
        onClick={handleHeroSectionClick}
      >
        Inicio
      </NavLink>
      <NavLink
        href="discover"
        active={currentSection === "discover"}
        onClick={handleDiscoverSectionClick}
      >
        Descubre
      </NavLink>
      <NavLink
        href="sync"
        active={currentSection === "sync"}
        onClick={handleSyncSectionClick}
      >
        Sincronización entre dispositivos
      </NavLink>
    </div>
  );
}
