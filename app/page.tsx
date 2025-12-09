import Hero from "./components/Hero";
import Link from "next/link";
import Footer from "./components/Footer";
import ProductCard from "./components/ProductCard"; // ProductCard component
import { supabase } from "../lib/supabaseClient";

//get datas from db
async function getFeaturedProducts() {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .limit(4) // max limit
    .order("id", { ascending: true });

  if (error) {
    console.error(error);
    return [];
  }
  return data;
}

export default async function Home() {
  const products = await getFeaturedProducts();

  return (
    <main className="bg-white text-black font-body min-h-screen">

      {/* ---------------- Hero Section ---------------- */}
      <Hero />

      {/* ---------------- Brand Story Section ---------------- */}
      <section className="max-w-[1400px] mx-auto px-2 md:px-4 py-16 bg-gray-50 rounded-xl shadow-md mt-10">
        <h2 className="text-3xl md:text-4xl font-heading mb-6 text-primary text-center md:text-left">
          Lycia Marka Hikayesi
        </h2>
        <p className="text-lg md:text-xl mx-auto md:mx-0 mb-8">
          Lycia kozmetik, doğallığı ve kaliteyi ön planda tutan, modern tasarımlı ürünleri ile kullanıcılarına eşsiz deneyimler sunar. Marka kimliğine uygun tasarımlarıyla estetik ve güveni bir arada sunar.
        </p>

        {/* Highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 mx-auto md:mx-0">
          <div className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition-all duration-300">
            <h3 className="font-heading text-lg mb-2 text-accent">Doğallık</h3>
            <p className="font-body text-sm">Ürünlerimiz tamamen doğal içeriklerden üretilir, sağlığınızı ön planda tutar.</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition-all duration-300">
            <h3 className="font-heading text-lg mb-2 text-accent">Kalite</h3>
            <p className="font-body text-sm">Her ürünümüz yüksek kalite standartlarında test edilip sizlere sunulur.</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition-all duration-300">
            <h3 className="font-heading text-lg mb-2 text-accent">Modern Tasarım</h3>
            <p className="font-body text-sm">Estetik ve şık tasarımlar ile markamız modern ve kurumsal bir görünüm sunar.</p>
          </div>
        </div>
      </section>

      {/* ---------------- Featured Products Section ---------------- */}
      <section className="max-w-[1500px] mx-auto px-2 md:px-4 py-18">
        <h2 className="text-3xl md:text-4xl font-heading mb-10 text-primary text-center md:text-left">
          Öne Çıkan Ürünler
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 md:gap-4">
          {products.length > 0 ? (
            products.map((product: any) => (
              <ProductCard key={product.id} product={{
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
                description: product.description,
              }} />
            ))
          ) : (
            <p className="text-center col-span-full text-gray-500">Ürünler yükleniyor...</p>
          )}
        </div>
      </section>

      {/* ---------------- Footer ---------------- */}
      <Footer />

    </main>
  );
}
