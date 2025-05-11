"use client";

import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function CryptoPage() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-screener.js";
    script.async = true;
    script.innerHTML = JSON.stringify({
      width: "100%",
      height: "600",
      defaultColumn: "overview",
      screener_type: "crypto_mkt",
      displayCurrency: "USD",
      colorTheme: "light",
      locale: "en",
      isTransparent: false,
    });
    document
      .getElementById("tradingview-widget-container")
      ?.appendChild(script);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container py-12">
        <h1 className="heading-xl gradient-text mb-10 text-center">
          All Cryptocurrencies
        </h1>
        <div id="tradingview-widget-container" />
      </main>
      <Footer />
    </div>
  );
}
