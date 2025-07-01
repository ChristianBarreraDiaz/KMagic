// next
import Image from "@/lib/next/image";

// components
import SigninForm from "@/components/signin/signin-form";

export default function Login() {
  return (
    <section className="from-chetwode-blue-300 to-chetwode-blue-200 mx-auto my-0 grid h-screen w-full place-items-center bg-gradient-to-r px-[15px] lg:w-full lg:grid-cols-[60%_40%] lg:items-center lg:justify-start lg:rounded-2xl lg:bg-white lg:bg-gradient-to-r lg:from-white lg:to-white lg:px-0 lg:py-0">
      <div className="from-chetwode-blue-300 to-chetwode-blue-200 hidden h-full w-full bg-gradient-to-r lg:grid lg:place-content-center">
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
      <SigninForm />
    </section>
  );
}
