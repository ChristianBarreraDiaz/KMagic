"use client";

// next
import Link from "@/lib/next/link";
import { usePathname } from "@/lib/next/navigation";

// Components
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/expandable-menu";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

// icons
import { PiUser } from "@/lib/react-icons/pi";
import { HiOutlineUsers } from "@/lib/react-icons/hi2";
import {
  MdOutlineBusinessCenter,
  MdOutlineWaterDrop,
} from "@/lib/react-icons/md";

import {
  TbTruck,
  TbMapCheck,
  TbMapX,
  TbChartInfographic,
  TbMapShare,
  TbMapPlus,
  TbMapUp,
} from "@/lib/react-icons/tb";

import {
  BiHistory,
  BiSolidMapPin,
  BiMapPin,
  BiMap,
} from "@/lib/react-icons/bi";
import { LiaMapMarkedAltSolid } from "@/lib/react-icons/lia";
import { RiWaterPercentLine } from "@/lib/react-icons/ri";

export default function SideBarContent() {
  const pathname = usePathname();
  return (
    <div className="space-y-4 py-4">
      <div className="px-3 py-2">
        <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
          Dashboard
        </h2>
        <div className="space-y-1">
          <Button
            variant={
              typeof pathname === "string" && pathname === "/dashboard"
                ? "secondary"
                : "ghost"
            }
            className="w-full justify-start"
            asChild
          >
            <Link href="/dashboard">
              <TbChartInfographic className="mr-4 h-4 w-4" />
              <span>Inicio</span>
            </Link>
          </Button>
        </div>
      </div>
      <div className="px-3 opacity-50">
        <Separator />
      </div>
      <div className="px-3 py-2">
        <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
          Mantenedores
        </h2>
        <div className="mb-2 space-y-1">
          <Button
            variant={
              typeof pathname === "string" &&
              pathname.includes("/dashboard/usuarios")
                ? "secondary"
                : "ghost"
            }
            className="w-full justify-start"
            asChild
          >
            <Link href="/dashboard/usuarios">
              <PiUser className="mr-4 h-4 w-4" />
              <span>Usuarios</span>
            </Link>
          </Button>
        </div>
        {/* <div className="space-y-1">
          <Accordion type="single" collapsible className="w-full justify-start">
            <AccordionItem value="item-1">
              <AccordionTrigger active={false}>
                <div className="flex items-center gap-2">
                  <LiaMapMarkedAltSolid className="mr-2 h-4 w-4" />
                  <span>División territorial</span>
                </div>
              </AccordionTrigger>
              <Link href="/dashboard/regiones">
                <AccordionContent
                  active={
                    typeof pathname === "string" &&
                    pathname.includes("/dashboard/regiones")
                      ? true
                      : false
                  }
                  className="mb-2 data-[state=closed]:mb-0"
                >
                  <>
                    <BiMap className="mr-2 h-4 w-4" />
                    <span className="block">Regiones</span>
                  </>
                </AccordionContent>
              </Link>
              <Link href="/dashboard/provincias">
                <AccordionContent
                  active={
                    typeof pathname === "string" &&
                    pathname.includes("/dashboard/provincias")
                      ? true
                      : false
                  }
                  className="mb-2 data-[state=closed]:mb-0"
                >
                  <>
                    <BiMap className="mr-2 h-4 w-4" />
                    <span className="block">Provincias</span>
                  </>
                </AccordionContent>
              </Link>
              <Link href="/dashboard/comunas">
                <AccordionContent
                  active={
                    typeof pathname === "string" &&
                    pathname.includes("/dashboard/comunas")
                      ? true
                      : false
                  }
                  className="mb-2 data-[state=closed]:mb-0"
                >
                  <>
                    <BiMap className="mr-2 h-4 w-4" />
                    <span className="block">Comunas</span>
                  </>
                </AccordionContent>
              </Link>
              <Link href="/dashboard/localidades">
                <AccordionContent
                  active={
                    typeof pathname === "string" &&
                    pathname.includes("/dashboard/localidades")
                      ? true
                      : false
                  }
                >
                  <>
                    <BiMap className="mr-2 h-4 w-4" />
                    <span className="block">Localidades</span>
                  </>
                </AccordionContent>
              </Link>
            </AccordionItem>
          </Accordion>
        </div> */}
      </div>
    </div>
  );
}
