"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

export default function Navbar() {
    const [open, setOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const pathname = usePathname();

    // Scroll Listener
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 10);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Anasayfada mı?
    const isHome = pathname === "/";

    // Navbar Background Logic
    const navbarBg = isHome
        ? scrolled
            ? "bg-gradient-to-r from-primary/70 via-primary/60 to-primary/70 backdrop-blur-xl "
            : "bg-transparent"
        : "bg-gradient-to-r from-primary/70 via-primary/60 to-primary/70 backdrop-blur-xl border-b border-white/10";


    return (
        <nav
            className={`
                fixed top-0 left-0 w-full z-50
                px-6 py-8 flex items-center justify-between text-white
                transition-all duration-300
                ${navbarBg}
            `}
        >
            {/* Logo */}
            <Link href="/">
                <span className="text-2xl font-heading tracking-wide cursor-pointer font-bold">
                    LYCIA
                </span>
            </Link>

            {/* Desktop Menu */}
            <ul className="hidden md:flex gap-8 text-lg font-body">
                <li><Link href="/">Anasayfa</Link></li>
                <li><Link href="/store">Mağaza</Link></li>
                <li><Link href="/about">Hakkımızda</Link></li>
                <li><Link href="/contact">İletişim</Link></li>
                <li><Link href="/cart">🛒</Link></li>
            </ul>

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
                    absolute top-16 left-0 w-full
                    bg-primary text-white
                    flex flex-col items-center gap-6 py-6 md:hidden text-lg font-body
                    shadow-lg
                ">
                    <li><Link href="/" onClick={() => setOpen(false)}>Anasayfa</Link></li>
                    <li><Link href="/store" onClick={() => setOpen(false)}>Mağaza</Link></li>
                    <li><Link href="/about" onClick={() => setOpen(false)}>Hakkımızda</Link></li>
                    <li><Link href="/contact" onClick={() => setOpen(false)}>İletişim</Link></li>
                    <li><Link href="/cart" onClick={() => setOpen(false)}>🛒</Link></li>
                </ul>
            )}
        </nav>
    );
}
