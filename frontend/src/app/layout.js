import "./globals.css";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import ImageProtection from "./components/ImageProtection";

export const metadata = {
  title: "Jason Park Photography",
  description: "A photography website",
};
  
  export default function RootLayout({ children }) {
    return (
     <html lang="en" className="scroll-smooth">
           <body className="main-page">
             <ImageProtection />
             <NavBar />
             <main>{children}</main>
             <Footer />
           </body>
         </html>
    );
  }
  
