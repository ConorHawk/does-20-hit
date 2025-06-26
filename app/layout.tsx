import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { DiceRollerProvider } from "@/components/dice-roller-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Does 20 Hit?",
  description: "A keyboard-only dice roller for tabletop RPGs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <DiceRollerProvider>
          <SidebarProvider>
            <SidebarInset>
              <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
                <div className="flex-1">
                  <h1 className="text-lg font-semibold">Does 20 Hit?</h1>
                </div>
                <SidebarTrigger className="-mr-1" />
              </header>
              <div className="flex flex-1 flex-col gap-4 p-4">
                {children}
              </div>
            </SidebarInset>
            <AppSidebar />
          </SidebarProvider>
        </DiceRollerProvider>
      </body>
    </html>
  );
}
