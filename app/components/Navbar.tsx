"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { useCart } from "../store/CartStore";

export default function Navbar() {
    const [open, setOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const pathname = usePathname();
    const count = useCart((state) => state.count);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 10);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const isHome = pathname === "/";

    const navbarBg = isHome
        ? scrolled
            ? "bg-white/80 backdrop-blur-xl shadow-sm border-b border-white/20"
            : "bg-transparent"
        : "bg-white/80 backdrop-blur-xl shadow-sm border-b border-white/20";

    return (
        <nav
            className={`
                fixed top-0 left-0 w-full z-50
                px-16 py-6 flex items-center justify-between
                transition-all duration-300
                ${scrolled || !isHome ? "text-black" : "text-white"}
                ${navbarBg}
            `}
        >
            {/* Logo & Menu */}
            <div className="flex items-center gap-12">
                {/* Logo */}
                <Link href="/">
                    <span className="text-2xl font-heading font-bold tracking-wide cursor-pointer">
                        LYCIA
                    </span>
                </Link>

                {/* Menu */}
                <ul className="hidden md:flex gap-8 font-body text-sm tracking-wide font-light">
                    <li><Link href="/">ANASAYFA</Link></li>
                    <li><Link href="/store">MAĞAZA</Link></li>
                    <li><Link href="/about">HAKKIMIZDA</Link></li>
                    <li><Link href="/contact">İLETİŞİM</Link></li>
                </ul>
            </div>

            {/* Cart Icon */}
            <div className="relative">
                <Link href="/cart" className="text-2xl cursor-pointer">
                    🛒
                </Link>

                {/* Cart Count */}
                {count > 0 && (
                    <span className="
                        absolute -top-2 -right-3 bg-primary text-white
                        text-xs px-2 py-0.5 rounded-full shadow
                    ">
                        {count}
                    </span>
                )}
            </div>

            {/* Mobile Button */}
            <button
                className="md:hidden text-3xl"
                onClick={() => setOpen(!open)}
            >
                ☰
            </button>

            {/* Mobile Menu */}
            {open && (
                <ul className="
                    absolute top-16 left-0 w-full bg-white/95 text-black
                    flex flex-col items-center gap-6 py-6 md:hidden text-lg font-body shadow-lg
                ">
                    <li><Link href="/" onClick={() => setOpen(false)}>Anasayfa</Link></li>
                    <li><Link href="/store" onClick={() => setOpen(false)}>Mağaza</Link></li>
                    <li><Link href="/about" onClick={() => setOpen(false)}>Hakkımızda</Link></li>
                    <li><Link href="/contact" onClick={() => setOpen(false)}>İletişim</Link></li>

                    <li className="relative">
                        <Link href="/cart" onClick={() => setOpen(false)} className="text-2xl">
                            🛒
                        </Link>
                        {count > 0 && (
                            <span className="absolute -top-2 -right-3 bg-primary text-white text-xs px-2 py-0.5 rounded-full">
                                {count}
                            </span>
                        )}
                    </li>
                </ul>
            )}
        </nav>
    );
}
