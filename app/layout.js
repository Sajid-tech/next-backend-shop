import { Poppins, Roboto_Mono } from "next/font/google";
import "./globals.css";
import Provider from "../components/Provider";
import Header from "@/components/Header";

const poppin = Poppins({ subsets: ["latin"], weight: '400' });
const robot = Roboto_Mono({ subsets: ["latin"], weight: '400' })

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <>
        <body className={` px-4 ${robot.className}`}>
          <Provider>
            <Header />
            {children}
          </Provider>
        </body>
      </>
    </html>
  );
}
