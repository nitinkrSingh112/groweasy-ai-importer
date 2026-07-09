import type { Metadata } from "next";
import "./globals.css";


export const metadata: Metadata = {

  title:
    "GrowEasy AI CSV Importer",

  description:
    "AI-powered CSV importer that converts messy lead data into GrowEasy CRM format",

};



export default function RootLayout({

  children,

}: Readonly<{

  children: React.ReactNode;

}>) {


  return (

    <html lang="en">


      <body>

        {children}

      </body>


    </html>

  );

}