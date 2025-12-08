import Link from "next/link";

const products = [
  { id: 1, name: "Ürün 1", price: 150, img: "/images/hero.png" },
  { id: 2, name: "Ürün 2", price: 200, img: "/images/hero.png" },
  { id: 3, name: "Ürün 3", price: 120, img: "/images/hero.png" },
  { id: 4, name: "Ürün 4", price: 180, img: "/images/hero.png" },
  { id: 5, name: "Ürün 5", price: 210, img: "/images/hero.png" },
  { id: 6, name: "Ürün 6", price: 90, img: "/images/hero.png" },
];

export default function Store() {
  return (
    <main className="bg-white text-foreground font-body min-h-screen">
      {/* ---------------- Page Header ---------------- */}
      <section className="max-w-[1400px] mx-auto px-4 md:px-6 py-16">
        <h1 className="text-4xl md:text-5xl font-heading mb-4 text-primary text-center md:text-left">
          Mağaza
        </h1>
        <p className="text-lg md:text-xl text-foreground max-w-3xl mx-auto md:mx-0 mb-10 text-center md:text-left">
          Lycia kozmetik ürünlerini keşfedin. Doğal ve kaliteli ürünlerimiz ile kendinize ve sevdiklerinize özel deneyimler sunabilirsiniz.
        </p>

        {/* ---------------- Product Grid ---------------- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white shadow-lg rounded-lg overflow-hidden transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
            >
              <img
                src={product.img}
                alt={product.name}
                className="w-full h-64 object-cover"
              />
              <div className="p-4 flex flex-col gap-2">
                <h3 className="font-heading text-lg">{product.name}</h3>
                <p className="text-foreground font-body">₺{product.price}</p>
                <Link href={`/store/${product.id}`}>
                  <button className="mt-2 bg-primary/80 hover:bg-primary/90 text-white px-4 py-2 rounded-lg font-body text-sm md:text-base transition-all duration-300">
                    Ürünü Gör
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
