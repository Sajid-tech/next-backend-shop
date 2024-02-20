import Header from "@/components/Header";
import Provider from "@/components/Provider";
import "@/styles/globals.css";
import { Poppins } from 'next/font/google';
import { Toaster } from "react-hot-toast";

const inter = Poppins({
  subsets: ['latin'],
  weight: '400'
});

export default function App({ Component, pageProps }) {
  return (
    <Provider>
      <main className={`${inter.className}`}>
        <Header />
        <div className="min-h-screen max-w-screen-2xl mx-auto">

          <Component {...pageProps} />
          <Toaster position="top-center" reverseOrder={false} />
        </div>
      </main>
    </Provider>
  );
}
