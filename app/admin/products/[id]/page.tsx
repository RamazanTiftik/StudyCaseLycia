'use client';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { supabase } from '../../../../lib/supabaseClient';

export default function EditProductPage() {
    const router = useRouter();
    const { id } = useParams();
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        const fetchProduct = async () => {
            const { data, error } = await supabase.from('products').select('*').eq('id', id).single();
            if (error) console.log(error);
            else {
                setName(data.name);
                setPrice(data.price.toString());
                setImage(data.image);
                setDescription(data.description);
            }
        };
        fetchProduct();
    }, [id]);

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        const { error } = await supabase.from('products').update({
            name, price: parseFloat(price), image, description
        }).eq('id', id);
        if (error) console.log(error);
        else router.push('/admin/products');
    };

    return (
        <div>
            <h1>Ürün Düzenle</h1>
            <form onSubmit={handleUpdate}>
                <input value={name} onChange={e => setName(e.target.value)} required />
                <input type="number" value={price} onChange={e => setPrice(e.target.value)} required />
                <input value={image} onChange={e => setImage(e.target.value)} required />
                <textarea value={description} onChange={e => setDescription(e.target.value)} />
                <button type="submit">Güncelle</button>
            </form>
        </div>
    );
}
