import Header from "@/components/Header";
import Provider from "@/components/Provider";
import "@/styles/globals.css";
import { Poppins } from 'next/font/google';

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
        </div>
      </main>
    </Provider>
  );
}
