import type { Metadata } from "next";
import "./globals.css";
import ClientLayout from "./components/ClientLayout";
import { Toaster } from "react-hot-toast";
import { Montserrat, Tenor_Sans } from "next/font/google";


const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-body",
});

const tenor = Tenor_Sans({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-heading",
});

export const metadata: Metadata = {
  title: "Lycia Kozmetik",
  description: "Lycia Web Sitesi",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr">
      <body className={`${montserrat.variable} ${tenor.variable} antialiased`}>
        {/* Client-side wrapper */}
        <ClientLayout>
          {children}
          <Toaster position="bottom-center" />
        </ClientLayout>
      </body>
    </html>
  );
}
