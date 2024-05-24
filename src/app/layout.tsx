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

// import 'tinymce/tinymce';
// import 'tinymce/themes/silver/theme';
// import 'tinymce/icons/default/icons';
// import 'tinymce/plugins/advlist';
// import 'tinymce/plugins/autolink';
// import 'tinymce/plugins/lists';
// import 'tinymce/plugins/link';
// import 'tinymce/plugins/image';
// import 'tinymce/plugins/charmap';
// //import 'tinymce/plugins/print';
// import 'tinymce/plugins/preview';
// import 'tinymce/plugins/anchor';
// import 'tinymce/plugins/searchreplace';
// import 'tinymce/plugins/visualblocks';
// import 'tinymce/plugins/code';
// import 'tinymce/plugins/fullscreen';
// import 'tinymce/plugins/insertdatetime';
// import 'tinymce/plugins/media';
// import 'tinymce/plugins/table';
// //import 'tinymce/plugins/paste';
// import 'tinymce/plugins/help';
// import 'tinymce/plugins/wordcount';

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
