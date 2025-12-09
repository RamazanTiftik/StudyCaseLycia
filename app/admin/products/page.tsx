// app/admin/add-product/page.tsx
'use client';
import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';

export default function AddProduct() {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [image_url, setImageUrl] = useState('');
    const [category, setCategory] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const { error } = await supabase.from('products').insert([{
                name,
                description,
                price: parseFloat(price),
                image_url,
                category
            }]);

            if (error) throw error;

            toast.success('Ürün başarıyla eklendi!');
            setTimeout(() => router.push('/admin'), 1000);
        } catch (error) {
            toast.error('Ürün eklenirken hata oluştu');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-6">
            <div className="mb-8">
                <h1 className="text-3xl font-heading text-primary mb-2">Yeni Ürün Ekle</h1>
                <div className="w-12 h-1 bg-secondary"></div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Ürün Adı
                    </label>
                    <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/30 focus:border-primary transition"
                        placeholder="Örn: Doğal El Kremi"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Açıklama
                    </label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows={4}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/30 focus:border-primary transition"
                        placeholder="Ürün açıklamasını yazın..."
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Fiyat (₺)
                        </label>
                        <input
                            type="number"
                            required
                            step="0.01"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/30 focus:border-primary transition"
                            placeholder="99.99"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Kategori
                        </label>
                        <input
                            type="text"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/30 focus:border-primary transition"
                            placeholder="Örn: Cilt Bakımı"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Resim URL
                    </label>
                    <input
                        type="url"
                        required
                        value={image_url}
                        onChange={(e) => setImageUrl(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/30 focus:border-primary transition"
                        placeholder="https://example.com/resim.jpg"
                    />
                </div>

                <div className="flex gap-4 pt-4">
                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-primary text-white px-8 py-3 rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50"
                    >
                        {loading ? 'Ekleniyor...' : 'Ürünü Ekle'}
                    </button>
                    <button
                        type="button"
                        onClick={() => router.push('/admin')}
                        className="border border-gray-300 px-8 py-3 rounded-lg hover:border-gray-400 transition-colors"
                    >
                        İptal
                    </button>
                </div>
            </form>
        </div>
    );
}