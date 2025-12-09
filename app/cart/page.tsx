"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "./CartProvider";
import { FaTrashAlt } from "react-icons/fa";

export default function CartPage() {
  const { items, updateQuantity, removeItem, clearCart, getTotal } = useCart();

  const total = getTotal();

  if (!items || items.length === 0) {
    return (
      <main className="min-h-screen bg-white text-black font-body">
        <section className="max-w-[1200px] mx-auto px-4 md:px-6 py-20 text-center">
          <h1 className="text-3xl font-heading mb-4">Sepetin</h1>
          <p className="text-gray-600 mb-6">Sepetin şu an boş. Mağazaya gidip ürün ekleyebilirsin.</p>
          <Link href="/store">
            <button className="bg-primary/80 hover:bg-primary/90 text-white px-6 py-3 rounded-lg">
              Mağazaya Git
            </button>
          </Link>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white text-black font-body">
      <section className="max-w-[1200px] mx-auto px-4 md:px-6 py-20">
        <h1 className="text-3xl md:text-4xl font-heading mb-6">Sepetim</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Items list */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((it) => (
              <div key={it.id} className="flex items-center gap-4 bg-white border rounded-lg p-4 shadow-sm">
                <div className="w-28 h-28 relative flex-shrink-0 rounded-md overflow-hidden bg-gray-100">
                  {it.image ? (
                    // next/image kullanıyoruz
                    // if external host configured, it will load; otherwise you can fallback to <img>
                    <Image src={it.image} alt={it.name} fill className="object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">No Image</div>
                  )}
                </div>

                <div className="flex-1">
                  <h3 className="font-heading text-lg">{it.name}</h3>
                  <p className="text-sm text-gray-600">₺{it.price.toFixed(2)}</p>

                  <div className="mt-3 flex items-center gap-2">
                    <label className="text-sm text-gray-600">Adet</label>
                    <input
                      type="number"
                      min={1}
                      value={it.quantity}
                      onChange={(e) => updateQuantity(it.id, Number(e.target.value))}
                      className="w-20 border rounded px-2 py-1 text-sm"
                    />
                    <button
                      onClick={() => removeItem(it.id)}
                      className="ml-4 text-red-600 hover:text-red-700 flex items-center gap-2"
                      aria-label="Ürünü kaldır"
                    >
                      <FaTrashAlt /> Kaldır
                    </button>
                  </div>
                </div>

                <div className="text-right w-28">
                  <p className="font-semibold">₺{(it.price * it.quantity).toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <aside className="bg-gray-50 p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-heading mb-4">Sipariş Özeti</h2>
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Ara Toplam</span>
              <span className="font-semibold">₺{total.toFixed(2)}</span>
            </div>

            {/* shipping or tax placeholders */}
            <div className="flex justify-between mb-4">
              <span className="text-gray-600">Kargo</span>
              <span className="font-semibold">₺0.00</span>
            </div>

            <div className="border-t pt-4">
              <div className="flex justify-between items-center mb-4">
                <span className="font-heading text-lg">Toplam</span>
                <span className="font-bold text-lg">₺{total.toFixed(2)}</span>
              </div>

              <button
                onClick={() => alert("Checkout akışı demo — backend entegrasyonu yok.")}
                className="w-full bg-primary/80 hover:bg-primary/90 text-white px-4 py-3 rounded-lg mb-3"
              >
                Ödemeye Geç
              </button>

              <button
                onClick={() => {
                  if (confirm("Sepeti tamamen temizlemek istiyor musun?")) clearCart();
                }}
                className="w-full border border-gray-200 px-4 py-2 rounded-lg text-gray-700"
              >
                Sepeti Temizle
              </button>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
