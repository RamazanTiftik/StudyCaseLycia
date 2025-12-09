'use client';
import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';

export default function AddProduct() {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [category, setCategory] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleAdd = async () => {
        if (!name || !price || !imageUrl) return alert('Ürün adı, fiyat ve resim URL zorunlu.');

        setLoading(true);
        const { error } = await supabase
            .from('products')
            .insert([{ name, description, price: parseFloat(price), image_url: imageUrl, category }]);

        setLoading(false);

        if (error) return alert(error.message);
        router.push('/admin');
    };

    return (
        <div className="p-8 max-w-xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">Yeni Ürün Ekle</h1>

            <div className="flex flex-col gap-3">
                <input
                    type="text"
                    placeholder="Ürün Adı"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="border p-2 rounded w-full"
                />
                <textarea
                    placeholder="Açıklama"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="border p-2 rounded w-full"
                />
                <input
                    type="number"
                    placeholder="Fiyat"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="border p-2 rounded w-full"
                />
                <input
                    type="text"
                    placeholder="Resim URL"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    className="border p-2 rounded w-full"
                />
                <input
                    type="text"
                    placeholder="Kategori"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="border p-2 rounded w-full"
                />
                <button
                    onClick={handleAdd}
                    disabled={loading}
                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded transition"
                >
                    {loading ? 'Ekleniyor...' : 'Ekle'}
                </button>
            </div>
        </div>
    );
}
