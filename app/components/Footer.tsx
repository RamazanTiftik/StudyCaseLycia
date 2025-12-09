"use client";

import Link from "next/link";
import { FaInstagram, FaFacebook, FaTwitter } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-secondary text-white py-12">
      <div className="max-w-[1400px] mx-auto px-4 md:px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* ---------- Brand Section ---------- */}
        <div className="flex flex-col gap-4">
          <h2 className="text-2xl font-heading">Lycia Kozmetik</h2>
          <p className="text-sm font-body max-w-xs">
            Kurumsal kimliğe uygun, modern tasarım ve estetik yaklaşım.
          </p>
        </div>

        {/* ---------- Quick Links Section ---------- */}
        <div className="flex flex-col gap-2">
          <h3 className="font-heading text-lg mb-2">Hızlı Erişim</h3>
          <Link href="/" className="hover:underline">Ana Sayfa</Link>
          <Link href="/store" className="hover:underline">Mağaza</Link>
          <Link href="/about" className="hover:underline">Hakkımızda</Link>
          <Link href="/contact" className="hover:underline">İletişim</Link>
        </div>

        {/* ---------- Social Media & Contact ---------- */}
        <div className="flex flex-col gap-4">
          <h3 className="font-heading text-lg mb-2">Bizi Takip Edin</h3>
          <div className="flex gap-4 text-xl">
            <a href="#" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
            <a href="#" target="_blank" rel="noopener noreferrer"><FaFacebook /></a>
            <a href="#" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
          </div>
          <p className="text-sm font-body mt-4">
            info@lycia.com
            <br />
            +90 555 123 45 67
          </p>
        </div>

      </div>

      {/* ---------- Copyright ---------- */}
      <div className="mt-12 text-center text-sm font-body border-t border-white/30 pt-4">
        © {new Date().getFullYear()} Lycia Kozmetik. Tüm hakları saklıdır.
      </div>
    </footer>
  );
}
