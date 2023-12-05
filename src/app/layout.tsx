import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export type SiteConfig = {
    name: string;
    description: string;
    url: string;
    ogImage: string;
};

export const siteConfig: SiteConfig = {
    name: "Visualize Betterer",
    description:
        "The aim of this project is to create effective visualization tools specifically designed to extract valuable insights from betterer test results.",
    url: "https://visualize-betterer.vercel.app/",
    ogImage: "/betterer-og.png",
};

export const metadata: Metadata = {
    title: "Visualize Betterer",
    description: "Generated by create next app",
    icons: {
        icon: "./favicon.ico",
        shortcut: "/favicon-16x16.png",
        apple: "/apple-touch-icon.png",
        // shortcut: {
        //     url: "./favicon-32x32.png",
        //     sizes: "32x32",
        // },
        // apple: {
        //     url: "./apple-touch-icon.png",
        //     sizes: "180x180",
        // },
    },
    openGraph: {
        type: "website",
        locale: "en_US",
        url: siteConfig.url,
        title: siteConfig.name,
        description: siteConfig.description,
        siteName: siteConfig.name,
        images: [
            {
                url: siteConfig.ogImage,
                width: 950,
                height: 537,
                alt: siteConfig.name,
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: siteConfig.name,
        description: siteConfig.description,
        images: [siteConfig.ogImage],
        // images: [`${siteConfig.url}/images/og.png`],
        creator: "@ryanlegler",
    },
    authors: [
        {
            name: "ryanlegler",
            url: "https://github.com/ryanlegler",
        },
    ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className={inter.className}>{children}</body>
        </html>
    );
}
