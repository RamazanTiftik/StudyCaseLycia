import { supabase } from "../../lib/supabaseClient";
import Footer from "../components/Footer";
import ProductCard from "../components/ProductCard";

//get products from db
async function getProducts() {
  const { data, error } = await supabase.from("products").select("*");
  if (error) {
    console.error(error);
    return [];
  }
  return data;
}

export default async function StorePage() {
  const products = await getProducts();

  return (
    <main className="bg-white text-black font-body min-h-screen">

      {/* ---------------- Page Header ---------------- */}
      <section className="max-w-[1400px] mx-auto px-4 md:px-6 py-16 text-center md:text-left">
        <h1 className="text-4xl md:text-5xl font-heading text-primary mb-4">
          Lycia Store
        </h1>
        <p className="text-lg md:text-xl text-black max-w-3xl mx-auto md:mx-0 mb-10">
          Lycia kozmetik ürünlerini keşfedin. Doğallık, kalite ve modern tasarım bir arada.
        </p>
      </section>

      {/* ---------------- Products Grid ---------------- */}
      <section className="max-w-[1500px] mx-auto px-2 md:px-4 pb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 md:gap-3">
          {products.map((product: any) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Footer */}
      <Footer />

    </main>
  );
}
