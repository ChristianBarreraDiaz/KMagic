// next
import Image from "@/lib/next/image";

// components
import Sidebar from "@/components/sidebar/sidebar";
import Navbar from "@/components/navigation/navbar";
import Footer from "@/components/footer/footer";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="relative h-full w-full">
      <div className="fixed left-0 top-0 z-20 h-[60px] w-full">
        <Navbar />
      </div>
      <div className="pt-[60px] lg:relative lg:h-screen lg:w-full">
        <Sidebar />
        <div className="mx-auto my-0 w-full">
          <section
            id="hero"
            className="background-image-primary grid min-h-[calc(100vh-60px)] grid-cols-1 items-baseline px-[5%] py-8 text-white md:content-center md:items-center md:gap-4 md:py-14 lg:grid-cols-2 lg:justify-items-center lg:py-0 xl:gap-16 xl:px-[10%]"
          >
            <div className="md:pb-8 2xl:pb-0">
              <h1 className="mb-4 text-3xl font-extrabold md:text-7xl">
                Transforma Tú Celular en una Varita Mágica para Tu PC
              </h1>
              <p className="text-sm md:text-base">
                Descubre el poder de la sincronización perfecta entre tu
                teléfono y tu computadora con KeyMagic. Convierte tu dispositivo
                móvil en una herramienta mágica que ejecuta arreglos de acciones
                en tu PC con un solo toque. Simplifica tu experiencia digital y
                desata un nuevo nivel de productividad. ¡Haz que tu interacción
                con la tecnología sea tan fluida como la magia misma con
                KeyMagic!
              </p>
            </div>
            <figure className="relative xl:w-[800px]">
              <Image
                src="/Saly-2.webp"
                alt="world map"
                width={2160}
                height={2160}
                loading="eager"
              />
            </figure>
          </section>

          <section
            id="discover"
            className="grid min-h-[calc(100vh-60px)] grid-cols-1 items-baseline bg-secondary px-[5%] py-8 text-white md:content-center md:items-center md:gap-4 md:py-14 lg:grid-cols-2 lg:justify-items-center lg:py-0 xl:gap-16 xl:px-[10%]"
          >
            <figure className="relative order-2 lg:order-1">
              <Image
                src="/Saly-24.webp"
                alt="stock chart"
                width={2996}
                height={1594}
                loading="eager"
              />
            </figure>
            <div className="order-1 text-chetwode-blue-600 md:pb-8 lg:order-2 2xl:pb-0">
              <h2 className="mb-4 text-3xl font-extrabold md:text-5xl">
                Descubre la Magia de KeyMagic
              </h2>
              <p>
                Bienvenido a una nueva dimensión de interacción digital con
                KeyMagic. Antes de sumergirnos en detalles, permítenos
                explicarte los conceptos clave que hacen posible esta
                experiencia única. En el mundo de KeyMagic, &apos;Arreglos&apos;
                son conjuntos prediseñados de comandos que simplifican acciones
                específicas. Imagina tener a tu disposición un teclado
                especializado con funciones optimizadas, como nuestro potente
                Arreglo Gamer y el práctico Teclado Numérico.
              </p>
            </div>
          </section>

          <section
            id="sync"
            className="background-image-primary grid min-h-[calc(100vh-60px)] grid-cols-1 items-baseline px-[5%] py-8 text-white md:content-center md:items-center md:gap-4 md:py-14 lg:grid-cols-2 lg:justify-items-center lg:py-0 xl:gap-16 xl:px-[10%]"
          >
            <div className="md:pb-8 2xl:pb-0">
              <h2 className="mb-4 text-3xl font-extrabold md:text-5xl">
                Sincronización Instantánea
              </h2>
              <p className="text-sm md:text-base">
                Ahora que conoces los conceptos básicos, sumérgete en la magia
                de la sincronización instantánea. KeyMagic te permite
                seleccionar intuitivamente entre nuestros arreglos
                especializados. Desde acciones en tus juegos favoritos hasta
                tareas de productividad, estos &apos;Comandos&apos; son las
                acciones específicas que tu PC ejecutará al toque de tu
                dispositivo móvil. Experimenta la sinergia perfecta entre
                dispositivos y observa cómo tus acciones cobran vida en la
                pantalla de tu PC.
              </p>
            </div>
            <figure className="relative">
              <Image
                src="/Saly-10.webp"
                alt="devices sync"
                width={842}
                height={589}
                loading="eager"
              />
            </figure>
          </section>

          <Footer />
        </div>
      </div>
    </div>
  );
}
