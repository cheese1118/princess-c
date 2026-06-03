import { Cormorant_Garamond, Inter, Bodoni_Moda } from "next/font/google";
import "./globals.css";

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const serif = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

const display = Bodoni_Moda({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  axes: ["opsz"],
});

export const metadata = {
  title: "Princess Memoir",
  description: "A boutique memory archive for a private princess memoir.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="zh-Hant">
      <body className={`${sans.variable} ${serif.variable} ${display.variable}`}>
        {children}
      </body>
    </html>
  );
}
