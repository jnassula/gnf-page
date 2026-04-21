import type { Metadata, Viewport } from "next";
import { Toaster } from "sonner";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://gruponossafarmacia.pt"),
  title: {
    default: "Grupo Nossa Farmácia — 400 farmácias. Uma só voz.",
    template: "%s · Grupo Nossa Farmácia",
  },
  description:
    "Cerca de 400 farmácias associadas em Portugal, unidas para negociar melhor, inovar com tecnologia própria e crescer em conjunto.",
  keywords: [
    "Grupo Nossa Farmácia",
    "farmácias Portugal",
    "grupo de farmácias",
    "Nossa AI",
    "Addo Log",
    "associativismo farmacêutico",
  ],
  authors: [{ name: "Grupo Nossa Farmácia" }],
  openGraph: {
    type: "website",
    locale: "pt_PT",
    title: "Grupo Nossa Farmácia — 400 farmácias. Uma só voz.",
    description:
      "Cerca de 400 farmácias associadas em Portugal, unidas para negociar melhor, inovar com tecnologia própria e crescer em conjunto.",
    siteName: "Grupo Nossa Farmácia",
  },
  twitter: {
    card: "summary_large_image",
    title: "Grupo Nossa Farmácia — 400 farmácias. Uma só voz.",
    description:
      "Cerca de 400 farmácias associadas em Portugal, unidas para negociar melhor, inovar com tecnologia própria e crescer em conjunto.",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f7f9f8" },
    { media: "(prefers-color-scheme: dark)", color: "#0a1110" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-PT" suppressHydrationWarning>
      <body className="bg-background text-foreground antialiased">
        {children}
        <Toaster
          position="bottom-right"
          toastOptions={{
            classNames: {
              toast:
                "!bg-surface !border-border !text-foreground !shadow-[var(--shadow-card)]",
              description: "!text-foreground-muted",
            },
          }}
        />
      </body>
    </html>
  );
}
