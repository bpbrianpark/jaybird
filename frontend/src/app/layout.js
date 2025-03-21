import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import { Poppins } from 'next/font/google';
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const poppins = Poppins({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900']
});

export const metadata = {
  title: "Jason Park Photography",
  description: "A photography website",
};

export default function RootLayout({ children }) {
  return (
   <html lang="en">
         <body className="bg-gray-100 text-gray-900">
           <NavBar />
           <main className="min-h-screen p-6">{children}</main>
           <Footer />
         </body>
       </html>
  );
}
