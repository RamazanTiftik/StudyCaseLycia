import Hero from "./components/Hero";
import Link from "next/link";
import Footer from "./components/Footer";
import ProductCard from "./components/ProductCard";
import { supabase } from "../lib/supabaseClient";

async function getFeaturedProducts() {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .limit(4)
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
    <main className="min-h-screen bg-white text-black font-body">

      {/* Hero Section */}
      <Hero />

      {/* Brand Story Section */}
      <section className="px-4 py-10 md:py-24 max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-heading text-primary mb-4 tracking-tight">
            Lycia Marka Hikayesi
          </h2>
          <div className="w-16 h-1 bg-secondary mx-auto"></div>
        </div>

        <p className="text-lg text-gray-700 leading-relaxed max-w-4xl mx-auto text-center mb-16 px-4">
          Lycia kozmetik, doğallığı modern bilimle buluşturan bir güzellik markasıdır.
          Kurulduğu günden bu yana, saf içerikler ve yüksek kalite anlayışıyla kullanıcılarına
          güven veren ürünler geliştirmeyi hedefler.
        </p>

        {/* Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {[
            {
              title: "Doğallık",
              desc: "Ürünlerimiz tamamen doğal ve güvenilir içeriklerden üretilir."
            },
            {
              title: "Kalite",
              desc: "Tüm ürünler yüksek kalite standartlarına uygun şekilde geliştirilir."
            },
            {
              title: "Modern Tasarım",
              desc: "Şık ve minimal tasarım anlayışıyla modern estetik çizgileri."
            }
          ].map((item, idx) => (
            <div
              key={idx}
              className="group p-8 border border-gray-100 rounded-xl hover:border-secondary/20 
                         transition-all duration-300 hover:shadow-sm bg-white"
            >
              <div className="mb-4">
                <div className="text-2xl font-heading text-primary mb-2">{item.title}</div>
                <div className="w-8 h-0.5 bg-secondary"></div>
              </div>
              <p className="text-gray-600 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="px-4 py-16 md:py-24 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-heading text-primary mb-4 tracking-tight">
            Öne Çıkan Ürünler
          </h2>
          <div className="w-16 h-1 bg-secondary mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {products.length > 0 ? (
            products.map((product: any) => (
              <ProductCard
                key={product.id}
                product={{
                  id: product.id,
                  name: product.name,
                  price: product.price,
                  image: product.image,
                  description: product.description,
                }}
              />
            ))
          ) : (
            <p className="text-center col-span-full text-gray-500 py-12">
              Ürünler yükleniyor...
            </p>
          )}
        </div>
      </section>

      {/* Footer */}
      <Footer />

    </main>
  );
}