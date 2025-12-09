'use client';
import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';

export default function AdminLogin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMsg('');

        const { data, error } = await supabase.auth.signInWithPassword({ email, password });

        if (error) setErrorMsg(error.message);
        else if (data.session) router.push('/admin');
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <form onSubmit={handleLogin} className="bg-white p-8 rounded shadow-md w-96">
                <h1 className="text-2xl font-bold mb-6 text-center">Admin Giriş</h1>
                {errorMsg && <p className="text-red-500 mb-4">{errorMsg}</p>}
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border p-2 mb-4 w-full"
                    required
                />
                <input
                    type="password"
                    placeholder="Şifre"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="border p-2 mb-4 w-full"
                    required
                />
                <button
                    type="submit"
                    className="bg-blue-500 text-white py-2 px-4 rounded w-full"
                >
                    Giriş Yap
                </button>
            </form>
        </div>
    );
}
