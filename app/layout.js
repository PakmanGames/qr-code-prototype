import { Inter } from "next/font/google";
import "./globals.css";
import Navigation from './components/Navigation';

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata = {
  title: "Hospital QR System",
  description: "A system for patients to pre-register for hospital visits and generate QR codes for hospital staff to scan",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>
        <Navigation />
        <main>{children}</main>
      </body>
    </html>
  );
}
