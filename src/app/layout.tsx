'use client'

import { Inter } from "next/font/google";
import "./globals.css";
import { ApolloWrapper } from "@/components/apollo-wrapper";
import { useEffect } from "react";
import { ThemeModeScript } from "flowbite-react";
import NextProvider from "@/providers/NextProvider";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  useEffect(() => {
    const handleContextmenu = (e: { preventDefault: () => void; }) => {
        e.preventDefault()
    }
    document.addEventListener('contextmenu', handleContextmenu)
    return function cleanup() {
        document.removeEventListener('contextmenu', handleContextmenu)
    }
  }, [])

  return (
    <html lang="en">
      <head>
        <ThemeModeScript />
      </head>
      <body className={`${inter.className} select-none`}>
        <ApolloWrapper>
          <NextProvider>
            {children}
          </NextProvider>
        </ApolloWrapper>
      </body>
    </html>
  );
}
