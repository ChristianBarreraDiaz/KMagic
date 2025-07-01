// next
import type { Metadata } from "@/lib/next";
import { roboto_mono } from "@/app/fonts/fonts";

// css
import "./globals.css";

// context
import Provider from "@/context/Provider";

import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "Key Magic",
  description: "Shortcuts integrales",
  icons: [
    { rel: "apple-touch-icon", sizes: "180x180", url: "/apple-touch-icon.png" },
    {
      rel: "icon",
      type: "image/png",
      sizes: "32x32",
      url: "/favicon-32x32.png",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "16x16",
      url: "/favicon-16x16.png",
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${roboto_mono.variable} antialiased`}>
      <Provider>
        <body className="relative">
          <main className="my-0 grid h-screen w-full bg-white lg:relative lg:w-full">
            {children}
          </main>
          <Toaster />
        </body>
      </Provider>
    </html>
  );
}
