"use client";

// react
import { useEffect, useState } from "@/lib/react";

// components
import Breadcrumbs from "@/components/ui/breadcrumbs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ButtonAddUsuario from "./button-submit";
import SelectPerfil from "./select-perfil";

// icons
import { RiEyeFill, RiEyeOffFill } from "@/lib/react-icons/ri";

// utils
import { cn } from "@/lib/utils";
import { isOnlyString } from "@/utils/IsOnlyStringValidator";
import { capitalizeFirstLetter } from "@/utils/capitalizeLetterFormatter";
import { useResetStore } from "@/store/resetToggleStore";
import { validateRut } from "@/utils/rutValidator";
import { formatRut } from "@/utils/rutFormatter";
import { validateEmail } from "@/utils/emailValidator";
import { isValidChileanCellNumber } from "@/utils/chileanPhoneNumberValidator";

import { MdOutlineCleaningServices } from "@/lib/react-icons/md";

// types
import { Perfil } from "@prisma/client";

type Props = {
  perfilesData: Perfil[];
};

type IsUsuarioValid = {
  status: boolean;
  message: string;
};

type PerfilSelect = {
  value: string;
  label: string;
  id: string;
};

type FormValidationState = {
  [key: string]: IsUsuarioValid;
};

export default function PageContent({ perfilesData }: Props) {
  console.log(
    "🚀 ~ file: page-content.tsx:41 ~ PageContent ~ perfilesData:",
    perfilesData,
  );
  // input validation
  const [isUsuarioNombreValid, setIsUsuarioNombreValid] =
    useState<IsUsuarioValid>({
      status: false,
      message: "",
    });
  const [isUsuarioApePaternoValid, setIsUsuarioApePaternoValid] =
    useState<IsUsuarioValid>({
      status: false,
      message: "",
    });
  const [isUsuarioApeMaternoValid, setIsUsuarioApeMaternoValid] =
    useState<IsUsuarioValid>({
      status: false,
      message: "",
    });
  const [isUsuarioUsernameValid, setIsUsuarioUsernameValid] =
    useState<IsUsuarioValid>({
      status: false,
      message: "",
    });
  const [isUsuarioPhoneValid, setIsUsuarioPhoneValid] =
    useState<IsUsuarioValid>({
      status: false,
      message: "",
    });
  const [isUsuarioPassValid, setIsUsuarioPassValid] = useState<IsUsuarioValid>({
    status: false,
    message: "",
  });
  const [isUsuarioRePassValid, setIsUsuarioRePassValid] =
    useState<IsUsuarioValid>({
      status: false,
      message: "",
    });
  const [isSelectedPerfilValid, setSelectedPerfilValid] =
    useState<IsUsuarioValid>({
      status: false,
      message: "",
    });
  const [isFormValid, setIsFormValid] = useState(false);

  // base state
  const [usuarioNombre, setUsuarioNombre] = useState<string>("");
  const [usuarioUsername, setUsuarioUsername] = useState<string>("");
  const [usuarioApellidoPaterno, setUsuarioApellidoPaterno] =
    useState<string>("");
  const [usuarioApellidoMaterno, setUsuarioApellidoMaterno] =
    useState<string>("");
  const [usuarioPhone, setUsuarioPhone] = useState<number | undefined>();
  const [usuarioPass, setUsuarioPass] = useState<string>("");
  const [usuarioRePass, setUsuarioRePass] = useState<string>("");
  const { reset, setReset } = useResetStore();
  const [selectedPerfil, setSelectedPerfil] = useState<PerfilSelect>({
    id: "",
    label: "",
    value: "",
  });

  // pass validation state
  const [lengthValid, setLengthValid] = useState(false);
  const [uppercaseValid, setUppercaseValid] = useState(false);
  const [lowercaseValid, setLowercaseValid] = useState(false);
  const [numberValid, setNumberValid] = useState(false);
  const [specialCharValid, setSpecialCharValid] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState(false);

  // inputs change validation
  const [usuarioNombreChanged, setUsuarioNombreChanged] = useState(false);
  const [usuarioApePaternoChanged, setUsuarioApePaternoChanged] =
    useState(false);
  const [usuarioApeMaternoChanged, setUsuarioApeMaternoChanged] =
    useState(false);
  const [usuarioUsernameChanged, setUsuarioUsernameChanged] = useState(false);
  const [usuarioPhoneChanged, setUsuarioPhoneChanged] = useState(false);
  const [usuarioPassChanged, setUsuarioPassChanged] = useState(false);
  const [usuarioRePassChanged, setUsuarioRePassChanged] = useState(false);
  const [usuarioPerfilChanged, setUsuarioPerfilChanged] = useState(false);

  const formValidationState: FormValidationState = {
    usuarioNombre: isUsuarioNombreValid,
    usuarioApePaterno: isUsuarioApePaternoValid,
    usuarioApeMaterno: isUsuarioApeMaternoValid,
    usuarioUsername: isUsuarioUsernameValid,
    usuarioPhone: isUsuarioPhoneValid,
    usuarioPass: isUsuarioPassValid,
    usuarioRePass: isUsuarioRePassValid,
    selectedPerfil: isSelectedPerfilValid,
  };

  const validateForm = () => {
    const isValid = Object.values(formValidationState).every(
      (field) => field.status,
    );
    console.log(
      "🚀 ~ file: page-content.tsx:152 ~ validateForm ~ isValid:",
      isValid,
    );
    setIsFormValid(isValid);
  };

  useEffect(() => {
    console.log(
      "🚀 ~ file: page-content.tsx:162 ~ PageContent ~ isUsuarioNombreValid:",
      isUsuarioNombreValid,
    );
    console.log(
      "🚀 ~ file: page-content.tsx:164 ~ PageContent ~ isUsuarioApePaternoValid:",
      isUsuarioApePaternoValid,
    );
    console.log(
      "🚀 ~ file: page-content.tsx:166 ~ PageContent ~ isUsuarioApeMaternoValid:",
      isUsuarioApeMaternoValid,
    );
    console.log(
      "🚀 ~ file: page-content.tsx:168 ~ PageContent ~ isUsuarioUsernameValid:",
      isUsuarioUsernameValid,
    );
    console.log(
      "🚀 ~ file: page-content.tsx:171 ~ PageContent ~ isUsuarioPassValid:",
      isUsuarioPassValid,
    );
    console.log(
      "🚀 ~ file: page-content.tsx:173 ~ PageContent ~ isUsuarioRePassValid:",
      isUsuarioRePassValid,
    );
    console.log(
      "🚀 ~ file: page-content.tsx:175 ~ PageContent ~ isSelectedPerfilValid:",
      isSelectedPerfilValid,
    );
    validateForm();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    isUsuarioNombreValid,
    isUsuarioApePaternoValid,
    isUsuarioApeMaternoValid,
    isUsuarioUsernameValid,
    isUsuarioPhoneValid,
    isUsuarioPassValid,
    isUsuarioRePassValid,
    isSelectedPerfilValid,
  ]);

  const perfilesSelect: PerfilSelect[] = perfilesData.map((perfil) => {
    return {
      value: perfil.PRF_NOM,
      label: perfil.PRF_DSC,
      id: perfil.PRF_ID,
    };
  });

  const [perfilesSelectData, setPerfilesSelectData] =
    useState<PerfilSelect[]>(perfilesSelect);

  useEffect(() => {
    const perfilesSelect: PerfilSelect[] = perfilesData.map((perfil) => {
      return {
        value: perfil.PRF_NOM,
        label: perfil.PRF_DSC,
        id: perfil.PRF_ID,
      };
    });
    setPerfilesSelectData(perfilesSelect);
  }, [perfilesData]);

  const handleInputNombreChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setUsuarioNombre(e.target.value);
    setUsuarioNombreChanged(true);
  };

  const handleInputApePaternoChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    e.preventDefault();
    setUsuarioApellidoPaterno(e.target.value);
    setUsuarioApePaternoChanged(true);
  };

  const handleInputApeMaternoChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    e.preventDefault();
    setUsuarioApellidoMaterno(e.target.value);
    setUsuarioApeMaternoChanged(true);
  };

  const handleInputRUTChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setUsuarioUsername(e.target.value);
    setUsuarioUsernameChanged(true);
  };

  const validatePassword = (value: string) => {
    // Check length
    setLengthValid(value.length >= 8);

    // Check for uppercase letter
    setUppercaseValid(/[A-Z]/.test(value));

    // Check for lowercase letter
    setLowercaseValid(/[a-z]/.test(value));

    // Check for at least one number
    setNumberValid(/\d/.test(value));

    // Check for at least one special character
    setSpecialCharValid(/[!@#$%^&*(),.?":{}|<>]/.test(value));
  };

  const validatePasswordMatch = (password: string, confirmPassword: string) => {
    setPasswordMatch(password === confirmPassword);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleRePasswordVisibility = () => {
    setShowRePassword(!showRePassword);
  };

  const handleInputPassChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setUsuarioPass(e.target.value);
    validatePassword(e.target.value);
    validatePasswordMatch(usuarioPass, e.target.value);
    setUsuarioPassChanged(true);
  };

  const handleInputRePassChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setUsuarioRePass(e.target.value);
    validatePasswordMatch(usuarioPass, e.target.value);
    setUsuarioRePassChanged(true);
  };

  const handleInputPhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setUsuarioPhone(parseInt(e.target.value));
    setUsuarioPhoneChanged(true);
  };

  useEffect(() => {
    if (selectedPerfil?.id && typeof selectedPerfil?.id === "string") {
      setUsuarioPerfilChanged(true);
      setSelectedPerfilValid({ status: true, message: "" });
    } else {
      setIsUsuarioNombreValid({
        status: false,
        message: "Seleccione un perfil",
      });
    }
  }, [selectedPerfil]);

  const handleNombreBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const usuarioNombreIsValid = isOnlyString(e.target.value);
    if (usuarioNombreIsValid) {
      const capitaliedNombreLocalidad = capitalizeFirstLetter(e.target.value);
      setUsuarioNombre(capitaliedNombreLocalidad);
      setIsUsuarioNombreValid({ status: true, message: "" });
    } else {
      setIsUsuarioNombreValid({ status: false, message: "Nombre inválido" });
    }
  };

  const handleApePaternoBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const usuarioNombreIsValid = isOnlyString(e.target.value);
    if (usuarioNombreIsValid) {
      const capitaliedNombreLocalidad = capitalizeFirstLetter(e.target.value);
      setUsuarioApellidoPaterno(capitaliedNombreLocalidad);
      setIsUsuarioApePaternoValid({ status: true, message: "" });
    } else {
      setIsUsuarioApePaternoValid({
        status: false,
        message: "Apellido paterno inválido",
      });
    }
  };

  const handleApeMaternoBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const usuarioNombreIsValid = isOnlyString(e.target.value);
    if (usuarioNombreIsValid) {
      const capitaliedNombreLocalidad = capitalizeFirstLetter(e.target.value);
      setUsuarioApellidoMaterno(capitaliedNombreLocalidad);
      setIsUsuarioApeMaternoValid({ status: true, message: "" });
    } else {
      setIsUsuarioApeMaternoValid({
        status: false,
        message: "Apellido materno inválido",
      });
    }
  };

  const handleUsernameBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    // const formattedRut = formatRut(e.target.value);
    // const isRutValid = validateRut(formattedRut);
    const isUsernameValid = validateEmail(e.target.value);
    if (isUsernameValid) {
      setUsuarioUsername(e.target.value);
      setIsUsuarioUsernameValid({ status: true, message: "" });
    } else {
      setIsUsuarioUsernameValid({ status: false, message: "RUT inválido" });
    }
  };

  const handlePassBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (
      lengthValid &&
      uppercaseValid &&
      lowercaseValid &&
      numberValid &&
      specialCharValid &&
      passwordMatch
    ) {
      setUsuarioPass(e.target.value);
      setIsUsuarioPassValid({ status: true, message: "" });
    } else {
      setIsUsuarioPassValid({ status: false, message: "Contraseña inválida" });
    }
  };

  const handleRePassBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (
      lengthValid &&
      uppercaseValid &&
      lowercaseValid &&
      numberValid &&
      specialCharValid &&
      passwordMatch
    ) {
      setUsuarioRePass(e.target.value);
      setIsUsuarioRePassValid({ status: true, message: "" });
      setIsUsuarioPassValid({ status: true, message: "" });
    } else {
      setIsUsuarioRePassValid({
        status: false,
        message: "Contraseña inválida",
      });
    }
  };

  const handlePhoneBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const usuarioPhoneIsValid = isValidChileanCellNumber(e.target.value);
    if (usuarioPhoneIsValid) {
      setIsUsuarioPhoneValid({ status: true, message: "" });
    } else {
      setIsUsuarioPhoneValid({
        status: false,
        message: "Número celular inválido",
      });
    }
  };

  const setAllInputStatesToDefault = () => {
    // Reset all input-related state variables to their default values
    setIsUsuarioNombreValid({
      status: false,
      message: "",
    });
    setIsUsuarioApePaternoValid({
      status: false,
      message: "",
    });
    setIsUsuarioApeMaternoValid({
      status: false,
      message: "",
    });
    setIsUsuarioUsernameValid({
      status: false,
      message: "",
    });
    setIsUsuarioPhoneValid({
      status: false,
      message: "",
    });
    setIsUsuarioPassValid({
      status: false,
      message: "",
    });
    setIsUsuarioRePassValid({
      status: false,
      message: "",
    });
    setSelectedPerfilValid({
      status: false,
      message: "",
    });
    setIsFormValid(false);

    // Reset all input values to their default values
    setUsuarioNombre("");
    setUsuarioUsername("");
    setUsuarioApellidoPaterno("");
    setUsuarioApellidoMaterno("");
    setUsuarioPhone(0);
    setUsuarioPass("");
    setUsuarioRePass("");
    setSelectedPerfil({
      id: "",
      label: "",
      value: "",
    });

    // Reset other input-related state variables to their default values
    setLengthValid(false);
    setUppercaseValid(false);
    setLowercaseValid(false);
    setNumberValid(false);
    setSpecialCharValid(false);
    setShowPassword(false);
    setShowRePassword(false);
    setPasswordMatch(false);
    setUsuarioNombreChanged(false);
    setUsuarioApePaternoChanged(false);
    setUsuarioApeMaternoChanged(false);
    setUsuarioUsernameChanged(false);
    setUsuarioPhoneChanged(false);
    setUsuarioPassChanged(false);
    setUsuarioRePassChanged(false);
    setUsuarioPerfilChanged(false);
  };

  const handleFormReset = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault();
    setAllInputStatesToDefault();
  };

  useEffect(() => {
    console.log(
      "🚀 ~ file: page-content.tsx:94 ~ useEffect ~ resetForm:",
      reset,
    );
    if (reset === true) {
      setAllInputStatesToDefault();
      setReset(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reset]);

  return (
    <div>
      <Breadcrumbs className="mt-[10px]" />
      <h1 className="my-4 text-2xl font-bold">Ingresar Usuario</h1>
      <div className="rounded-lg bg-white px-4 py-4 shadow-sm">
        <div className="flex flex-col items-start justify-center gap-5">
          <div className="flex w-full flex-col gap-4 md:flex-row ">
            <div className="flex w-full flex-col items-start gap-4">
              <div className="flex w-full max-w-[350px] flex-col items-start justify-center gap-4">
                <Label htmlFor="user" className="font-bold">
                  Usuario
                </Label>
                <Input
                  type="text"
                  placeholder="mail@example.com"
                  id="user"
                  name="user"
                  required
                  className={cn(
                    {
                      "border-red-500":
                        isUsuarioUsernameValid.status === false &&
                        usuarioUsernameChanged === true,
                    },
                    {
                      "border-green-500":
                        isUsuarioUsernameValid.status === true &&
                        usuarioUsernameChanged === true,
                    },
                  )}
                  value={usuarioUsername}
                  onChange={handleInputRUTChange}
                  onBlur={handleUsernameBlur}
                />
                <span
                  className={cn("hidden text-sm text-current", {
                    "block text-red-500":
                      isUsuarioUsernameValid.status === false &&
                      usuarioUsernameChanged === true,
                  })}
                >
                  {isUsuarioUsernameValid.message}
                </span>
              </div>
              <div className="flex w-full max-w-[350px] flex-col items-start justify-center gap-4">
                <Label htmlFor="pass" className="font-bold">
                  Contraseña
                </Label>
                <div className="relative w-full">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="ingrese contraseña..."
                    id="pass"
                    name="pass"
                    required
                    className={cn(
                      {
                        "border-red-500":
                          isUsuarioPassValid.status === false &&
                          usuarioPassChanged === true,
                      },
                      {
                        "border-green-500":
                          isUsuarioPassValid.status === true &&
                          usuarioPassChanged === true,
                      },
                    )}
                    value={usuarioPass}
                    onChange={handleInputPassChange}
                    onBlur={handlePassBlur}
                  />
                  <button
                    onClick={togglePasswordVisibility}
                    className="absolute right-[0.8rem] top-[0.8rem]"
                  >
                    {showPassword ? <RiEyeOffFill /> : <RiEyeFill />}
                  </button>
                </div>

                <ul>
                  <li
                    className={cn(
                      "text-sm",
                      {
                        "text-green-500":
                          lengthValid === true && usuarioPassChanged === true,
                      },
                      {
                        "text-red-500":
                          lengthValid === false && usuarioPassChanged === true,
                      },
                    )}
                  >
                    Al menos 8 caracteres
                  </li>
                  <li
                    className={cn(
                      "text-sm",
                      {
                        "text-green-500":
                          uppercaseValid === true &&
                          usuarioPassChanged === true,
                      },
                      {
                        "text-red-500":
                          uppercaseValid === false &&
                          usuarioPassChanged === true,
                      },
                    )}
                  >
                    Al menos una mayúscula
                  </li>
                  <li
                    className={cn(
                      "text-sm",
                      {
                        "text-green-500":
                          lowercaseValid === true &&
                          usuarioPassChanged === true,
                      },
                      {
                        "text-red-500":
                          lowercaseValid === false &&
                          usuarioPassChanged === true,
                      },
                    )}
                  >
                    Al menos una minuscula
                  </li>
                  <li
                    className={cn(
                      "text-sm",
                      {
                        "text-green-500":
                          numberValid === true && usuarioPassChanged === true,
                      },
                      {
                        "text-red-500":
                          numberValid === false && usuarioPassChanged === true,
                      },
                    )}
                  >
                    Al menos un número
                  </li>
                  <li
                    className={cn(
                      "text-sm",
                      {
                        "text-green-500":
                          specialCharValid === true &&
                          usuarioPassChanged === true,
                      },
                      {
                        "text-red-500":
                          specialCharValid === false &&
                          usuarioPassChanged === true,
                      },
                    )}
                  >
                    Al menos un caracter especial
                  </li>
                  <li
                    className={cn(
                      "text-sm",
                      {
                        "text-green-500":
                          passwordMatch === true && usuarioPassChanged === true,
                      },
                      {
                        "text-red-500":
                          passwordMatch === false &&
                          usuarioPassChanged === true,
                      },
                    )}
                  >
                    Coincidencia de Contraseñas
                  </li>
                </ul>
              </div>
              <div className="flex w-full max-w-[350px] flex-col items-start justify-center gap-4">
                <Label htmlFor="re-pass" className="font-bold">
                  Re-ingrese la contraseña
                </Label>
                <div className="relative w-full">
                  <Input
                    type={showRePassword ? "text" : "password"}
                    placeholder="re-ingrese contraseña"
                    id="re-pass"
                    name="re-pass"
                    required
                    className={cn(
                      {
                        "border-red-500":
                          isUsuarioRePassValid.status === false &&
                          usuarioRePassChanged === true,
                      },
                      {
                        "border-green-500":
                          isUsuarioRePassValid.status === true &&
                          usuarioRePassChanged === true,
                      },
                    )}
                    value={usuarioRePass}
                    onChange={handleInputRePassChange}
                    onBlur={handleRePassBlur}
                  />
                  <button
                    onClick={toggleRePasswordVisibility}
                    className="absolute right-[0.8rem] top-[0.8rem]"
                  >
                    {showRePassword ? <RiEyeOffFill /> : <RiEyeFill />}
                  </button>
                </div>
              </div>
            </div>

            <div className="flex w-full flex-col items-start gap-4">
              <div className="flex w-full max-w-[350px] flex-col items-start justify-center gap-4">
                <Label htmlFor="nombre" className="font-bold">
                  Nombre
                </Label>
                <Input
                  type="text"
                  placeholder="Jhon"
                  id="nombre"
                  name="nombre"
                  required
                  className={cn(
                    {
                      "border-red-500":
                        isUsuarioNombreValid.status === false &&
                        usuarioNombreChanged === true,
                    },
                    {
                      "border-green-500":
                        isUsuarioNombreValid.status === true &&
                        usuarioNombreChanged === true,
                    },
                  )}
                  value={usuarioNombre}
                  onChange={handleInputNombreChange}
                  onBlur={handleNombreBlur}
                />
                <span
                  className={cn("hidden text-sm text-current", {
                    "block text-red-600":
                      isUsuarioNombreValid.status === false &&
                      usuarioNombreChanged === true,
                  })}
                >
                  {isUsuarioNombreValid.message}
                </span>
              </div>
              <div className="flex w-full max-w-[350px] flex-col items-start justify-center gap-4">
                <Label htmlFor="apellido-paterno" className="font-bold">
                  Apellido paterno
                </Label>
                <Input
                  type="text"
                  placeholder="Doe"
                  id="apellido-paterno"
                  name="apellido-paterno"
                  required
                  className={cn(
                    {
                      "border-red-500":
                        isUsuarioApePaternoValid.status === false &&
                        usuarioApePaternoChanged === true,
                    },
                    {
                      "border-green-500":
                        isUsuarioApePaternoValid.status === true &&
                        usuarioApePaternoChanged === true,
                    },
                  )}
                  value={usuarioApellidoPaterno}
                  onChange={handleInputApePaternoChange}
                  onBlur={handleApePaternoBlur}
                />
                <span
                  className={cn("hidden text-sm text-current", {
                    "block text-red-600":
                      isUsuarioApePaternoValid.status === false &&
                      usuarioApePaternoChanged === true,
                  })}
                >
                  {isUsuarioApePaternoValid.message}
                </span>
              </div>
              <div className="flex w-full max-w-[350px] flex-col items-start justify-center gap-4">
                <Label htmlFor="apellido-materno" className="font-bold">
                  Apellido materno
                </Label>
                <Input
                  type="text"
                  placeholder="Jhonson"
                  id="apellido-materno"
                  name="apellido-materno"
                  required
                  className={cn(
                    {
                      "border-red-600":
                        isUsuarioApeMaternoValid.status === false &&
                        usuarioApeMaternoChanged === true,
                    },
                    {
                      "border-green-500":
                        isUsuarioApeMaternoValid.status === true &&
                        usuarioApeMaternoChanged === true,
                    },
                  )}
                  value={usuarioApellidoMaterno}
                  onChange={handleInputApeMaternoChange}
                  onBlur={handleApeMaternoBlur}
                />
                <span
                  className={cn("hidden text-sm text-current", {
                    "block text-red-600":
                      isUsuarioApeMaternoValid.status === false &&
                      usuarioApeMaternoChanged === true,
                  })}
                >
                  {isUsuarioApeMaternoValid.message}
                </span>
              </div>
              <div className="flex w-full max-w-[350px] flex-col items-start justify-center gap-4">
                <Label htmlFor="celular" className="font-bold">
                  Número Celular
                </Label>
                <Input
                  type="number"
                  placeholder="942567891"
                  id="celular"
                  name="celular"
                  required
                  className={cn(
                    {
                      "border-red-500":
                        isUsuarioPhoneValid.status === false &&
                        usuarioPhoneChanged === true,
                    },
                    {
                      "border-green-500":
                        isUsuarioPhoneValid.status === true &&
                        usuarioPhoneChanged === true,
                    },
                  )}
                  value={usuarioPhone}
                  onChange={handleInputPhoneChange}
                  onBlur={handlePhoneBlur}
                />
                <span
                  className={cn("hidden text-sm text-current", {
                    "block text-red-600":
                      isUsuarioPhoneValid.status === false &&
                      usuarioPhoneChanged === true,
                  })}
                >
                  {isUsuarioPhoneValid.message}
                </span>
              </div>
            </div>

            <div className="w-full">
              <div className="flex w-full max-w-[350px] flex-col items-start justify-center gap-4">
                <div className="flex items-center gap-2">
                  <Label className="font-bold">Perfil</Label>
                </div>
                <SelectPerfil
                  PerfilSelectData={perfilesSelectData}
                  setSelectedPerfil={setSelectedPerfil}
                  selectedPerfil={selectedPerfil}
                />
                <span
                  className={cn("hidden text-sm text-current", {
                    "block text-red-600":
                      isSelectedPerfilValid.status === false &&
                      usuarioPerfilChanged === true,
                  })}
                ></span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <ButtonAddUsuario
              usuario={{
                USU_NOM: usuarioNombre,
                PRF_ID: selectedPerfil.id,
                USU_AMA: usuarioApellidoMaterno,
                USU_APA: usuarioApellidoPaterno,
                USU_PSS: usuarioPass,
                USU_TEL: usuarioPhone ?? 0,
                USU_USR: usuarioUsername,
                // USU_RUT: usuarioUsername,
                EST_ID: "",
              }}
              isFormValid={isFormValid}
            />
            <Button
              type="button"
              variant={"outline"}
              onClick={handleFormReset}
              className="hover:bg-chetwode-blue-200 flex items-center gap-2"
            >
              <span className="block">Limpiar</span>
              <MdOutlineCleaningServices className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
