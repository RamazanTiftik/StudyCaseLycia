
"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isHome = pathname === "/";

  // Admin sayfalarında normal navbar ve footer gösterme
  const isAdminPage = pathname?.startsWith("/admin");

  return (
    <>
      {!isAdminPage && <Navbar />}

      <main className={!isAdminPage && !isHome ? "pt-24" : ""}>
        {children}
      </main>

    </>
  );
}