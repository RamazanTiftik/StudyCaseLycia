"use client";

import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
    const [open, setOpen] = useState(false);

    return (
        <nav className="bg-primary text-white px-6 py-4 flex items-center justify-between shadow-lg">
            {/* Logo */}
            <Link href="/">
                <span className="text-2xl font-heading tracking-wide cursor-pointer">
                    LYCIA
                </span>
            </Link>

            {/* Desktop Menu */}
            <ul className="hidden md:flex gap-8 text-lg font-body">
                <li><Link href="/">Anasayfa</Link></li>
                <li><Link href="/store">Mağaza</Link></li>
                <li><Link href="/about">Hakkımızda</Link></li>
                <li><Link href="/contact">İletişim</Link></li>
                <li><Link href="/cart">🛒 Sepet</Link></li>
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
                <ul className="absolute top-16 left-0 w-full bg-primary text-white flex flex-col items-center gap-6 py-6 md:hidden text-lg font-body">
                    <li><Link href="/" onClick={() => setOpen(false)}>Anasayfa</Link></li>
                    <li><Link href="/store" onClick={() => setOpen(false)}>Mağaza</Link></li>
                    <li><Link href="/about" onClick={() => setOpen(false)}>Hakkımızda</Link></li>
                    <li><Link href="/contact" onClick={() => setOpen(false)}>İletişim</Link></li>
                    <li><Link href="/cart" onClick={() => setOpen(false)}>🛒 Sepet</Link></li>
                </ul>
            )}
        </nav>
    );
}
