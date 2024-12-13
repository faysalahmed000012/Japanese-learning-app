import Providers from "@/lib/Providers";
import type { Metadata } from "next";
import { Toaster } from "sonner";
import "./globals.css";

// const notoSansJP = Noto_Sans_JP({ subsets: ["latin"] });
// const poppins = Poppins({ subsets: ["latin"], weight: "400" });

export const metadata: Metadata = {
  title: "~日本~Learn - Start Learning Japanese By One Click",
  description: "Japanese Learning App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`  antialiased`}>
        <Providers>{children}</Providers>
        <Toaster />
      </body>
    </html>
  );
}
