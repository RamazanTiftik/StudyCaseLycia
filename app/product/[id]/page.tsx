import { supabase } from "../../../lib/supabaseClient";
import Image from "next/image";
import Link from "next/link";
import Footer from "../../components/Footer";
import { FaTag, FaInfoCircle, FaMoneyBillWave, FaCartPlus } from "react-icons/fa";

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  description?: string;
}

interface Props {
  params: Promise<{ id: string }>; // promised
}

//get product data from db
async function getProduct(id: number) {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error("Supabase error:", error);
    return null;
  }
  return data as Product;
}

//get similar products
async function getSimilarProducts(currentId: number) {
  const { data } = await supabase
    .from("products")
    .select("*")
    .neq("id", currentId)
    .limit(3);

  return data as Product[] | null;
}


export default async function ProductPage(props: Props) {

  // open to params with await
  const { id } = await props.params;

  //convert to number 
  const productId = Number(id);

  //error catch 
  if (isNaN(productId)) {
    return <p className="text-red-500 text-center mt-20">Geçersiz ürün ID!</p>;
  }

  const product = await getProduct(productId);
  const similarProducts = await getSimilarProducts(productId);

  if (!product) {
    return <p className="text-red-500 text-center mt-20">Ürün bulunamadı!</p>;
  }

  return (
    <main className="bg-white text-black font-body min-h-screen">
      <section className="max-w-[1200px] mx-auto px-4 md:px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          {/* Ürün Görsel */}
          <div className="relative w-full h-96 md:h-[600px] rounded-lg overflow-hidden shadow-lg group">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>

          {/* Ürün Bilgileri */}
          <div className="flex flex-col gap-6 ">
            <h1 className="text-3xl md:text-4xl font-heading text-primary flex items-center gap-2">
              <FaTag className="text-primary" /> {product.name}
            </h1>

            {product.description && (
              <p className="text-gray-700 text-base md:text-lg flex items-start gap-2">
                <FaInfoCircle className="text-gray-500 mt-1" />
                {product.description}
              </p>
            )}

            <p className="text-black font-bold text-2xl flex items-center gap-2">
              <FaMoneyBillWave className="text-primary" /> ₺{product.price}
            </p>

            {/* Butonlar */}
            <div className="flex flex-wrap gap-4 mt-70">
              <Link href="/store">
                <button className="bg-primary/80 hover:bg-primary/90 text-white px-5 py-2 rounded-lg text-base md:text-lg transition-transform duration-300 hover:scale-105">
                  Mağazaya Dön
                </button>
              </Link>

              <button className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg text-base md:text-lg flex items-center gap-2 transition-transform duration-300 hover:scale-105">
                <FaCartPlus /> Sepete Ekle
              </button>
            </div>
          </div>
        </div>

        {/* Benzer Ürünler */}
        {similarProducts && similarProducts.length > 0 && (
          <div className="mt-20">
            <h2 className="text-2xl md:text-3xl font-heading text-primary mb-8">
              Benzer Ürünler
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {similarProducts.map((item) => (
                <Link
                  key={item.id}
                  href={`/product/${item.id}`}
                  className="group bg-white shadow-md rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="relative w-full h-86 overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>

                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {item.name}
                    </h3>
                    <p className="text-primary font-bold mt-2">₺{item.price}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </section>

      <Footer />
    </main>
  );
}