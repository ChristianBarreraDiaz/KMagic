//components
import SidebarLink from "./sidebar-link";
import { useSectionStore } from "@/store/sectionStore";

// types
import { User } from "@/types/user";

export default function SideBarContentGuest() {
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
    <div className="flex flex-col gap-2">
      <SidebarLink
        href="hero"
        active={currentSection === "hero" || currentSection === ""}
        onClick={handleHeroSectionClick}
      >
        Inicio
      </SidebarLink>
      <SidebarLink
        href="discover"
        active={currentSection === "discover"}
        onClick={handleDiscoverSectionClick}
      >
        Descubre
      </SidebarLink>
      <SidebarLink
        href="sync"
        active={currentSection === "sync"}
        onClick={handleSyncSectionClick}
      >
        Sincronización entre dispositivos
      </SidebarLink>
    </div>
  );
}
