import type { Metadata } from "next";
import "@fontsource-variable/newsreader/opsz.css";
import "@fontsource-variable/newsreader/opsz-italic.css";
import "@fontsource-variable/plus-jakarta-sans";
import "@fontsource/ibm-plex-mono/400.css";
import "@fontsource/ibm-plex-mono/500.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kenan Umut Pulat — Web Geliştirici & AI Operasyon Uzmanı",
  description:
    "Ölçeklenebilir web sistemleri, 600+ programatik SEO sayfası, 100+ açılış sayfası ve VPS/Nginx dağıtım altyapıları.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body className="min-h-screen bg-canvas text-ink antialiased">
        {children}
      </body>
    </html>
  );
}
