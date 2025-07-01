// import { Roboto_Mono } from "next/font/google";
import localFont from "next/font/local";

// export const roboto_mono = Roboto_Mono({
//   subsets: ["latin"],
//   style: ["normal", "italic"],
//   display: "swap",
// });

export const roboto_mono = localFont({
  src: "../../../public/fonts/RobotoMono-VariableFont_wght.woff",
  display: "swap",
  preload: true,
  variable: "--font-roboto-mono",
});
