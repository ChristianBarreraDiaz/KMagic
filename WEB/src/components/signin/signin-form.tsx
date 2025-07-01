"use client";

// react
import { ChangeEvent, useState, MouseEvent, FocusEvent } from "@/lib/react";

// next
import Image from "@/lib/next/image";
import { useRouter } from "@/lib/next/navigation";

// others packages
import { signIn } from "@/lib/next-auth/react";

// componenets
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// utils
import { validateEmail } from "@/utils/emailValidator";
import Link from "@/lib/next/link";
import { IoIosArrowRoundBack } from "@/lib/react-icons/io";

// types
type ValidationStatus = "default" | "valid" | "invalid";

type Message = "" | "Las credenciales ingresadas son inválidas";

export default function SigninForm() {
  const [data, setData] = useState({
    username: "",
    password: "",
  });

  const [isUsernameValid, setIsUsernameValid] =
    useState<ValidationStatus>("default");

  const [isPasswordValid, setIsPasswordValid] =
    useState<ValidationStatus>("default");

  const [message, setMessage] = useState<Message>("");

  const router = useRouter();

  let usernameTimeout: NodeJS.Timeout | null = null;
  let passwordTimeout: NodeJS.Timeout | null = null;

  const validateUsername = (username: string) => {
    const isValid = validateEmail(username);
    setIsUsernameValid(isValid ? "valid" : "invalid");
    console.log(
      "🚀 ~ file: signin-form.tsx:33 ~ SigninForm ~ isUsernameValid:",
      isUsernameValid,
    );
  };

  const validatePassword = (password: string) => {
    console.log(
      "🚀 ~ file: signin-form.tsx:50 ~ validatePassword ~ password:",
      password,
    );
    setIsPasswordValid(password ? "valid" : "invalid");
  };

  const handleUsernameChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setMessage("");
    // Clear the previous timeout
    if (usernameTimeout) {
      clearTimeout(usernameTimeout);
    }

    // Set a new timeout
    usernameTimeout = setTimeout(() => {
      validateUsername(e.target.value);
    }, 700);
    setData({ ...data, username: e.target.value });
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setMessage("");
    // Clear the previous timeout
    if (passwordTimeout) {
      clearTimeout(passwordTimeout);
    }

    // Set a new timeout
    passwordTimeout = setTimeout(() => {
      validatePassword(e.target.value);
    }, 700);
    setData({ ...data, password: e.target.value });
  };

  const handleSubmit = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    validateUsername(data.username);
    validatePassword(data.password);

    if (isUsernameValid !== "valid" || isPasswordValid !== "valid") {
      setMessage("Las credenciales ingresadas son inválidas");
      return;
    }

    setMessage("");

    const result = await signIn("credentials", {
      ...data,
      redirect: true,
      callbackUrl: "/dashboard",
    });
  };

  return (
    <form className="shadow-full-sm flex w-full flex-col gap-4 rounded-[10px] bg-white px-[30px] py-[50px] md:max-w-[340px] lg:rounded-none lg:p-0 lg:shadow-none">
      <div className="relative mx-auto">
        <Image
          src="/hero.png"
          className="max-w-full object-cover"
          width={360}
          height={360}
          alt="hero"
        />
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="username" className="font-bold">
            Usuario
          </Label>
        </div>
        <Input
          type="text"
          placeholder="Ingrese su usuario"
          id="username"
          name="username"
          required
          value={data.username}
          // onBlur={handleUsernameBlur}
          onChange={handleUsernameChange}
          className={
            isUsernameValid === "valid" || isUsernameValid === "default"
              ? ""
              : "border-red-600"
          }
        />
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="password" className="font-bold">
            Contraseña
          </Label>
        </div>
        <Input
          id="password"
          name="password"
          placeholder="Ingrese su contraseña"
          required
          type="password"
          value={data.password}
          // onBlur={handlePasswordBlur}
          onChange={handlePasswordChange}
          className={
            isPasswordValid === "valid" || isPasswordValid === "default"
              ? ""
              : "border-red-600"
          }
        />
      </div>
      <span className={message ? "block text-red-600" : "hidden"}>
        {message}
      </span>
      <Button type="submit" variant={"default"} onClick={handleSubmit}>
        Iniciar sesión
      </Button>
      <Link
        href="/"
        className="relative mx-auto my-0 flex w-fit items-center gap-4 text-sm font-medium after:absolute  after:right-0 after:top-6  after:h-[2px] after:w-0 after:bg-chetwode-blue-700 after:transition-all after:duration-200 after:ease-in-out after:content-[''] hover:after:w-[94%] hover:after:transition-all hover:after:duration-200 hover:after:ease-in-out hover:after:content-['']"
      >
        <IoIosArrowRoundBack className="h-7 w-7" />
        <span>Volver</span>
      </Link>
    </form>
  );
}
