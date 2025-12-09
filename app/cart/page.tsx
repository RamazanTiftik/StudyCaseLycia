"use client";

import { useCart } from "@/app/store/CartStore";
import Image from "next/image";
import Footer from "@/app/components/Footer";
import { FaTrash, FaMinus, FaPlus } from "react-icons/fa";

export default function CartPage() {
  const { items, remove, clear, increase, decrease } = useCart();

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const formattedTotal = total.toLocaleString("tr-TR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 max-w-7xl mx-auto px-4 py-16 md:py-24 font-body w-full">
        <div className="mb-12">
          <h1 className="text-3xl md:text-4xl font-heading text-primary text-center md:text-left">
            Sepetim
          </h1>
          <div className="w-12 h-0.5 bg-secondary mt-2 mx-auto md:mx-0"></div>
        </div>

        {items.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">Sepetiniz boş.</p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">

          {/* Product List */}
          <div className="lg:col-span-8 space-y-6">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-6 p-6 border border-gray-100 rounded-xl
                         hover:border-gray-200 transition-colors bg-white"
              >
                {/* Product Image */}
                <div className="relative w-32 h-32 flex-shrink-0">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="rounded-lg object-cover"
                    sizes="(max-width: 768px) 100vw, 128px"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <h2 className="text-xl font-medium text-gray-900 mb-2">
                    {item.name}
                  </h2>

                  <div className="text-primary font-bold text-lg mb-4">
                    ₺
                    {item.price.toLocaleString("tr-TR", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </div>

                  <div className="flex items-center gap-4">
                    <button
                      className="w-10 h-10 flex items-center justify-center border rounded
                               hover:bg-gray-50 transition-colors"
                      onClick={() => decrease(item.id)}
                    >
                      <FaMinus size={14} />
                    </button>

                    <span className="font-medium text-lg min-w-10 text-center">
                      {item.quantity}
                    </span>

                    <button
                      className="w-10 h-10 flex items-center justify-center border rounded
                               hover:bg-gray-50 transition-colors"
                      onClick={() => increase(item.id)}
                    >
                      <FaPlus size={14} />
                    </button>
                  </div>
                </div>

                <div className="text-right flex flex-col items-end">
                  <div className="font-bold text-xl mb-4">
                    ₺{(item.price * item.quantity).toLocaleString("tr-TR", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </div>
                  <button
                    className="text-gray-400 hover:text-red-500 transition-colors p-2"
                    onClick={() => remove(item.id)}
                  >
                    <FaTrash size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Cart */}
          {items.length > 0 && (
            <div className="lg:col-span-4">
              <div className="border border-gray-100 rounded-xl p-8 h-fit sticky top-24">
                <h2 className="text-2xl font-heading mb-8">Sipariş Özeti</h2>

                <div className="space-y-6 mb-8">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 text-lg">Ara Toplam:</span>
                    <span className="font-semibold text-lg">₺{formattedTotal}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 text-lg">Kargo:</span>
                    <span className="font-semibold text-green-600 text-lg">Ücretsiz</span>
                  </div>
                </div>

                <div className="border-t pt-6 mb-8">
                  <div className="flex justify-between text-xl">
                    <span>Toplam:</span>
                    <span className="font-bold text-primary">
                      ₺{formattedTotal}
                    </span>
                  </div>
                </div>

                <button className="w-full bg-primary text-white py-4 rounded-lg
                               hover:bg-primary/90 transition-colors text-lg font-medium mb-4">
                  Ödemeye Geç
                </button>

                <button
                  onClick={clear}
                  className="w-full border border-gray-300 py-4 rounded-lg
                         hover:border-gray-400 transition-colors text-lg font-medium"
                >
                  Sepeti Temizle
                </button>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}