
'use client';
import Link from 'next/link';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';

export default function AdminNavbar() {
    const router = useRouter();

    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.push('/admin/login');
    };

    return (
        <nav className="bg-gray-800 text-white p-4 flex justify-between">
            <div className="flex gap-4">
                <Link href="/admin">Ürünler</Link>
            </div>
            <button onClick={handleLogout}>Çıkış</button>
        </nav>
    );
}
