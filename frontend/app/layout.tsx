import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
});

export const metadata: Metadata = {
  title: "Elsya's Diary — Your Personal Safe Space",
  description: "Aesthetic, minimalist, and elegant digital diary application.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${jakarta.variable} h-full`}>
      <body className="font-sans bg-[#FDFBF7] text-[#4A4238] antialiased min-h-screen flex flex-col selection:bg-[#F3D2C1] selection:text-[#5A4D41]">
        {children}
      </body>
    </html>
  );
}