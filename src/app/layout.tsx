import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "SharkFunded",
    description: "SharkFunded Application",
    icons: {
        icon: '/shark-logo-email.png',
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body>{children}</body>
        </html>
    );
}
