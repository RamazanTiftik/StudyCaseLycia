'use client';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
}

export default function AdminHome() {
  const [products, setProducts] = useState<Product[]>([]);
  const [editProduct, setEditProduct] = useState<Product | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const [newProductName, setNewProductName] = useState('');
  const [newProductDescription, setNewProductDescription] = useState('');
  const [newProductPrice, setNewProductPrice] = useState<number>(0);
  const [newProductImage, setNewProductImage] = useState('');
  const [newProductCategory, setNewProductCategory] = useState('Cilt'); // default Cilt

  const fetchProducts = async () => {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('id', { ascending: false });
    if (data) setProducts(data as Product[]);
    if (error) console.error(error.message);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Bu ürünü silmek istediğinizden emin misiniz?')) return;
    const { error } = await supabase.from('products').delete().eq('id', id);
    if (!error) setProducts(products.filter(p => p.id !== id));
    else console.error(error.message);
  };

  const handleAddProduct = async () => {
    const { error } = await supabase
      .from('products')
      .insert([{
        name: newProductName,
        description: newProductDescription,
        price: newProductPrice,
        image: newProductImage,
        category: newProductCategory
      }]);
    if (!error) {
      setIsAddDialogOpen(false);
      setNewProductName('');
      setNewProductDescription('');
      setNewProductPrice(0);
      setNewProductImage('');
      setNewProductCategory('Cilt'); // reset default
      fetchProducts();
    } else {
      console.error(error.message);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const categories = ['Cilt', 'Serum', 'Bakım Seti'];

  return (
    <div className="p-2">
      {/* Header */}
      <div className="flex justify-between items-center mb-2">
        <h1 className="text-2xl font-bold">Ürünler</h1>
        <button
          onClick={() => setIsAddDialogOpen(true)}
          className="bg-green-500 px-4 py-2 rounded text-white hover:bg-green-600 transition"
        >
          Yeni Ürün Ekle
        </button>
      </div>

      {/* Products Grid */}
      {products.length === 0 ? (
        <p>Henüz ürün yok.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map(product => (
            <div key={product.id} className="border p-4 rounded shadow-lg hover:shadow-xl transition relative h-[450px] flex flex-col">
              <img
                src={product.image}
                alt={product.name}
                className="h-56 w-full object-cover mb-2 rounded"
              />
              <h2 className="font-bold text-lg mb-1">{product.name}</h2>
              <p className="text-gray-700 mb-1 overflow-hidden text-ellipsis line-clamp-3">{product.description}</p>
              <p className="text-gray-700 mb-1 font-medium">Kategori: {product.category}</p>
              <p className="text-gray-700 mb-4">{product.price}₺</p>

              {/* Edit & Delete Buttons */}
              <div className="mt-auto flex gap-2">
                <button
                  onClick={() => { setEditProduct(product); setIsEditDialogOpen(true); }}
                  className="bg-blue-500 px-3 py-1 text-white rounded hover:bg-blue-600 transition"
                >
                  Düzenle
                </button>
                <button
                  onClick={() => handleDelete(product.id)}
                  className="bg-red-500 px-3 py-1 text-white rounded hover:bg-red-600 transition"
                >
                  Sil
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Edit Product Dialog */}
      {isEditDialogOpen && editProduct && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50">
          <div className="bg-white p-8 rounded-xl w-11/12 max-w-md shadow-2xl">
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Ürün Düzenle</h2>

            <label className="block mb-2 font-medium text-gray-700">Ürün Adı</label>
            <input
              type="text"
              value={editProduct.name}
              onChange={(e) => setEditProduct({ ...editProduct, name: e.target.value })}
              className="border border-gray-300 p-3 mb-4 w-full rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />

            <label className="block mb-2 font-medium text-gray-700">Ürün Açıklaması</label>
            <textarea
              value={editProduct.description}
              onChange={(e) => setEditProduct({ ...editProduct, description: e.target.value })}
              className="border border-gray-300 p-3 mb-4 w-full rounded-lg text-lg h-32 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
            />

            <label className="block mb-2 font-medium text-gray-700">Fiyat</label>
            <input
              type="number"
              value={editProduct.price}
              onChange={(e) => setEditProduct({ ...editProduct, price: parseFloat(e.target.value) })}
              className="border border-gray-300 p-3 mb-4 w-full rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />

            <label className="block mb-2 font-medium text-gray-700">Kategori</label>
            <select
              value={editProduct.category}
              onChange={(e) => setEditProduct({ ...editProduct, category: e.target.value })}
              className="border border-gray-300 p-3 mb-6 w-full rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
            </select>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setIsEditDialogOpen(false)}
                className="px-5 py-2 rounded-lg border text-gray-700 hover:bg-gray-100 transition"
              >
                İptal
              </button>
              <button
                onClick={async () => {
                  const { error } = await supabase
                    .from('products')
                    .update({
                      name: editProduct.name,
                      description: editProduct.description,
                      price: editProduct.price,
                      category: editProduct.category
                    })
                    .eq('id', editProduct.id);
                  if (!error) {
                    setIsEditDialogOpen(false);
                    fetchProducts();
                  } else console.error(error.message);
                }}
                className="px-5 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
              >
                Kaydet
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Product Dialog */}
      {isAddDialogOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50">
          <div className="bg-white p-8 rounded-xl w-11/12 max-w-md shadow-2xl">
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Yeni Ürün Ekle</h2>

            <label className="block mb-2 font-medium text-gray-700">Ürün Adı</label>
            <input
              type="text"
              value={newProductName}
              onChange={(e) => setNewProductName(e.target.value)}
              className="border border-gray-300 p-3 mb-4 w-full rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            />

            <label className="block mb-2 font-medium text-gray-700">Ürün Açıklaması</label>
            <textarea
              value={newProductDescription}
              onChange={(e) => setNewProductDescription(e.target.value)}
              className="border border-gray-300 p-3 mb-4 w-full rounded-lg text-lg h-32 resize-none focus:outline-none focus:ring-2 focus:ring-green-400"
            />

            <label className="block mb-2 font-medium text-gray-700">Fiyat</label>
            <input
              type="number"
              value={newProductPrice}
              onChange={(e) => setNewProductPrice(parseFloat(e.target.value))}
              className="border border-gray-300 p-3 mb-4 w-full rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            />

            <label className="block mb-2 font-medium text-gray-700">Kategori</label>
            <select
              value={newProductCategory}
              onChange={(e) => setNewProductCategory(e.target.value)}
              className="border border-gray-300 p-3 mb-6 w-full rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            >
              {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
            </select>

            <label className="block mb-2 font-medium text-gray-700">Resim URL</label>
            <input
              type="text"
              value={newProductImage}
              onChange={(e) => setNewProductImage(e.target.value)}
              className="border border-gray-300 p-3 mb-6 w-full rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-green-400"
              placeholder="https://example.com/image.jpg"
            />

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setIsAddDialogOpen(false)}
                className="px-5 py-2 rounded-lg border text-gray-700 hover:bg-gray-100 transition"
              >
                İptal
              </button>
              <button
                onClick={handleAddProduct}
                className="px-5 py-2 rounded-lg bg-green-600 text-white font-semibold hover:bg-green-700 transition"
              >
                Ekle
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Fixed Bottom Buttons */}
      <div className="fixed bottom-4 left-4 flex gap-3">
        <button
          onClick={() => {
            if (confirm('Çıkmak istediğinize emin misiniz?')) {
              console.log('Çıkış yapıldı');
            }
          }}
          className="px-4 py-2 rounded-lg bg-gray-700 text-white hover:bg-gray-800 transition"
        >
          Çıkış Yap
        </button>
      </div>
    </div>
  );
}
