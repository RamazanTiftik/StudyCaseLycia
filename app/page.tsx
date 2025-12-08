import Hero from "./components/Hero";
import Link from "next/link";
import Footer from "./components/Footer";

const products = [
  { id: 1, name: "Ürün 1", price: 150, img: "/images/hero.png" },
  { id: 2, name: "Ürün 2", price: 200, img: "/images/hero.png" },
  { id: 3, name: "Ürün 3", price: 120, img: "/images/hero.png" },
  { id: 4, name: "Ürün 4", price: 180, img: "/images/hero.png" },
];

export default function Home() {
  return (
    <main className="bg-white text-black font-body">

      {/* ---------------- Hero Section ---------------- */}
      <Hero />

      {/* ---------------- Brand Story Section ---------------- */}
      <section className="max-w-[1400px] mx-auto px-2 md:px-4 py-15 bg-gray-50 rounded-xl shadow-md mt-10">
        {/* Section Title */}
        <h2 className="text-3xl md:text-4xl font-heading mb-6 text-primary text-center md:text-left">
          Lycia Marka Hikayesi
        </h2>

        {/* Section Description */}
        <p className="text-lg md:text-xl mx-auto md:mx-0 mb-8">
          Lycia kozmetik, doğallığı ve kaliteyi ön planda tutan, modern tasarımlı ürünleri ile kullanıcılarına eşsiz deneyimler sunar. Marka kimliğine uygun tasarımlarıyla estetik ve güveni bir arada sunar.
        </p>

        {/* Optional Highlights / Features */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto md:mx-0">
          <div className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition-all duration-300">
            <h3 className="font-heading text-lg mb-2 text-primary">Doğallık</h3>
            <p className="font-body text-sm">
              Ürünlerimiz tamamen doğal içeriklerden üretilir, sağlığınızı ön planda tutar.
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition-all duration-300">
            <h3 className="font-heading text-lg mb-2 text-primary">Kalite</h3>
            <p className="font-body text-sm">
              Her ürünümüz yüksek kalite standartlarında test edilip sizlere sunulur.
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition-all duration-300">
            <h3 className="font-heading text-lg mb-2 text-primary">Modern Tasarım</h3>
            <p className="font-body text-sm">
              Estetik ve şık tasarımlar ile markamız modern ve kurumsal bir görünüm sunar.
            </p>
          </div>
        </div>
      </section>

      {/* ---------------- Featured Products Section ---------------- */}
      <section className="max-w-[1400px] mx-auto px-2 md:px-4 py-18">
        <h2 className="text-3xl md:text-4xl font-heading mb-10 text-primary text-center md:text-left">
          Öne Çıkan Ürünler
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
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
              <div className="p-3 flex flex-col gap-2">
                <h3 className="font-heading text-lg">{product.name}</h3>
                <p className="font-body">₺{product.price}</p>
                <Link href="/store">
                  <button className="mt-2 bg-primary/80 hover:bg-primary/90 text-white px-4 py-2 rounded-lg font-body text-sm md:text-base transition-all duration-300">
                    Ürünü Gör
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />

    </main>
  );
}
