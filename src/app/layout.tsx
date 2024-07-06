'use client'

import { Inter } from "next/font/google";
import "./globals.css";
import { ApolloWrapper } from "@/providers/apollo-wrapper";
import { useEffect } from "react";
import { ThemeModeScript } from "flowbite-react";
import NextProvider from "@/providers/NextProvider";
import ReduxProvider from "@/providers/ReduxProvider";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import "swiper/swiper-bundle.css"; 
// import function to register Swiper custom elements
import { register } from 'swiper/element/bundle';
// register Swiper custom elements
register();

// pdfjs.GlobalWorkerOptions.workerSrc = new URL(
//   'pdfjs-dist/build/pdf.worker.min.mjs',
//   import.meta.url,
// ).toString();

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
        <script
            src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`}
            async
            defer
          ></script>
          <script async defer src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-element-bundle.min.js"></script>
      </head>
      <body className={`${inter.className} select-none`}>
        <ApolloWrapper>
          <NextProvider>
            <ReduxProvider>
              {children}
              <ToastContainer />
            </ReduxProvider>
          </NextProvider>
        </ApolloWrapper>
      </body>
    </html>
  );
}
