// next
import Image from "@/lib/next/image";

// components
import PageContent from "@/components/signup/page-content";

export default function Login() {
  return (
    <section className="mx-auto my-0 grid min-h-[auto] w-full place-items-center bg-gradient-to-r from-chetwode-blue-300 to-chetwode-blue-200 px-[15px] py-4 xl:w-full xl:grid-cols-[60%_40%] xl:items-center xl:justify-start xl:rounded-2xl xl:bg-white xl:bg-gradient-to-r xl:from-white xl:to-white xl:px-0 xl:py-0">
      <div className="hidden h-full w-full bg-gradient-to-r from-chetwode-blue-300 to-chetwode-blue-200 xl:grid xl:place-content-center">
        <figure className="w-[900px]">
          <Image
            src="/Saly-12.webp"
            alt="reports"
            width={2160}
            height={2160}
            loading="eager"
          />
        </figure>
      </div>
      <PageContent />
    </section>
  );
}
