import { supabase } from "../../lib/supabaseClient";
import Footer from "../components/Footer";
import ProductCard from "../components/ProductCard";
import FilterScript from "./FilterScript";

async function getProducts() {
  const { data, error } = await supabase.from("products").select("*");
  if (error) {
    console.error(error);
    return [];
  }
  return data;
}

async function getCategories() {
  const { data, error } = await supabase
    .from("products")
    .select("category");

  if (error) {
    console.error(error);
    return [];
  }

  return Array.from(new Set(data.map((p) => p.category)));
}

export default async function StorePage() {
  const products = await getProducts();
  const categories = await getCategories();

  return (
    <main className="bg-white text-black font-body min-h-screen">

      {/* ---------------- Page Header ---------------- */}
      <section className="max-w-[1500px] mx-auto px-4 md:px-6 pt-10 pb-10 text-center md:text-left">
        <h1 className="text-4xl md:text-5xl font-heading text-primary mb-4">
          Lycia Store
        </h1>
        <p className="text-lg md:text-xl max-w-4xl mx-auto md:mx-0 ">
          Lycia kozmetik ürünlerini keşfedin. Doğallık, kalite ve modern tasarım bir arada.
        </p>
      </section>

      {/* ---------------- Filter Section ---------------- */}
      <section className="max-w-[1500px] mx-auto px-4 mb-10">
        <div className="flex flex-wrap gap-3">

          {/* ALL BUTTON */}
          <button
            data-filter="all"
            className="px-4 py-2 rounded-full border border-primary text-primary hover:bg-primary hover:text-white transition"
          >
            Tümü
          </button>

          {/* DYNAMIC CATEGORY BUTTONS */}
          {categories.map((cat: any, index: number) => (
            <button
              key={index}
              data-filter={cat}
              className="px-4 py-2 rounded-full border border-gray-400 text-gray-700 hover:bg-primary hover:text-white transition"
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* ---------------- Products Grid ---------------- */}
      <section className="max-w-[1500px] mx-auto px-2 md:px-4 pb-20">
        <div id="product-grid" className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 md:gap-3">
          {products.map((product: any) => (
            <div key={product.id} data-category={product.category}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </section>

      {/* Filter */}
      <FilterScript />

      {/* Footer */}
      <Footer />
    </main>
  );
}
