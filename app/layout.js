import "./globals.css";
import "bootstrap-icons/font/bootstrap-icons.css";

import Header from "./src/components/Header/Header";
import Footer from "./src/components/Footer/Footer";
import { Fredoka } from "next/font/google";
import { SessionProvider } from "./src/components/Session/SessionProvider";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const font = Fredoka({ subsets: ["latin"] });

export const metadata = {
  title: "Footie Friends"
};

export default async function RootLayout({ children }) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <body className="bg-base-100">
        <SessionProvider session={session}>
          <div className="container">
            <Header fontClass={font.className} />
            {children}
            <Footer />
          </div>
        </SessionProvider>
      </body>
    </html>
  );
}
