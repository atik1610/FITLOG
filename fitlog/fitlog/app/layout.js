import {Oswald,Inter} from "next/font/google";
import "./globals.css";
import {Store} from "@/components/Store";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
const oswald=Oswald({subsets:["latin"],variable:"--font-oswald"});
const inter=Inter({subsets:["latin"],variable:"--font-inter"});
export const metadata={title:"FitLog — Workout Library",description:"Pick a lift, lock it into today's plan, log every set."};
export default function RootLayout({children}){
  return(<html lang="en"><body className={`${oswald.variable} ${inter.variable} min-h-screen flex flex-col`}>
    <Store><Navbar/><main className="flex-1">{children}</main><Footer/></Store></body></html>);
}
