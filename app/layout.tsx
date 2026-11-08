import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = { title: "Abotik Shop | Everyday finds", description: "Discover everyday essentials at Abotik Shop." };
export default function RootLayout({children}:{children:React.ReactNode}) { return <html lang="en"><body>{children}</body></html>; }