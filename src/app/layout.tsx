import type { Metadata } from "next";
import { Inter as FontSans, Poppins as FontPoppins } from "next/font/google"
import "./globals.css";
import { cn } from "@/lib/utils"
import { StoreProvider } from "@/app/GlobalRedux/Provider";

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const fontPoppins = FontPoppins({
  subsets: ['devanagari'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  variable: "--font-poppins",
})


export const metadata: Metadata = {
  title: "Hello UOVT - AI Powered Chat Assistant",
  description: "AI Powered Chat Assistant",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(
        "h-screen bg-background font-sans antialiased",
        fontPoppins.variable
      )}>
        <StoreProvider>
          {children}
        </StoreProvider>
      </body>
    </html>
  );
}
