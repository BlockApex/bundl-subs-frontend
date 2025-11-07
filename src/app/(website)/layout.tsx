import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "../globals.css"; // still include global styles if needed
import Script from "next/script";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Bundl — Landing Page",
  description: "Welcome to Bundl. Simplify your subscriptions effortlessly.",
};

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Google Analytics */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
          `}
        </Script>

      </head>
      <body className={`${poppins.variable} antialiased font-body`}>
        <main className="w-full min-h-screen bg-white">
          {children}
        </main>
      </body>
    </html>
  );
}
