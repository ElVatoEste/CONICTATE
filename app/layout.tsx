import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import ClientProvider from "@/components/HOC/ClientProvider";
import { Nav, Footer, ScrollToTop } from "@/paths";

const font = Plus_Jakarta_Sans({ weight: ['200', '300', '400', '500', '600', '700', '800'], subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Conictate | Oportunidades laborales en Nicaragua",
  description:
      "Conictate te conecta con las mejores oportunidades laborales en tecnología, salud, educación y más. Postula, conecta y haz crecer tu carrera.",
  keywords: [
    "trabajo",
    "empleo",
    "oportunidades laborales",
    "Conictate",
    "postulaciones",
    "ofertas de empleo",
    "red profesional",
    "empleos en Nicaragua",
    "empleos en Latinoamérica",
    "networking laboral"
  ],
  authors: [{ name: "VatoDev", url: "https://conictate.vercel.app/" }],
  creator: "VatoDev",
  publisher: "VatoDev",
  metadataBase: new URL("https://conictate.vercel.app/"),
  openGraph: {
    title: "Conictate | Encuentra tu próximo empleo",
    description:
        "Descubrí miles de ofertas laborales en Conictate. Conectá con empresas, enviá tu CV y hacé crecer tu red profesional.",
    url: "https://conictate.vercel.app/",
    siteName: "Conictate",

    locale: "es_NI",
    type: "website"
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png"
  }
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClientProvider>
      <html lang="en">
        <body className={font.className}>
          <Nav />
          {children}
          <ScrollToTop />
          <Footer />
        </body>
      </html>
    </ClientProvider>

  );
}
