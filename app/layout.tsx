import type { Metadata } from "next";
import { Sora, Inter, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const sora = Sora({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-sora",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Tauseef Iqbal — Machine Learning Engineer",
  description:
    "ML Engineer building LLM applications, RAG systems, and AI automation pipelines. Python, LangChain, LangGraph, n8n.",
  metadataBase: new URL("https://tauseefiqbal.dev"),
  openGraph: {
    title: "Tauseef Iqbal — Machine Learning Engineer",
    description:
      "ML Engineer building LLM applications, RAG systems, and AI automation pipelines.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${sora.variable} ${inter.variable} ${plexMono.variable}`}>
      <body className="font-body antialiased grain">{children}</body>
    </html>
  );
}
