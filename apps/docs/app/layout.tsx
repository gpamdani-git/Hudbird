import "./globals.css";
import Link from "next/link";
import { Sidebar } from "./components/Sidebar";
import { RightSidebar } from "./components/RightSidebar";

export const metadata = { title: "My UI Library", description: "UI Component Library Docs" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 font-sans antialiased flex flex-col">
        <header className="sticky top-0 z-40 w-full h-16 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md border-b border-zinc-200/60 dark:border-zinc-800/60">
          <div className="container mx-auto px-6 max-w-7xl flex h-full items-center">
            <Link href="/" className="flex items-center space-x-2">
              <span className="font-bold sm:inline-block">My UI</span>
            </Link>
          </div>
        </header>
        
        <div className="container mx-auto px-6 max-w-7xl flex-1 flex">
          <Sidebar />
          
          <main className="flex-1 min-w-0 py-8 md:px-8">
            {children}
          </main>

          <RightSidebar />
        </div>
      </body>
    </html>
  );
}
