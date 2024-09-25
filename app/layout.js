import localFont from "next/font/local";
import "./globals.css";
import Header from "./src/components/Header/Header";
import Navbar from "./src/components/Navbar/Navbar";
import Footer from "./src/components/Footer/Footer";
import styles from "./page.module.css";
import { Fredoka } from "next/font/google";

const font = Fredoka({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${styles.container} ${font.className}`}>
        <Header />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
