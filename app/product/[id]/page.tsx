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

export default async function ProductPage(props: Props) {

  // open to params with await
  const { id } = await props.params;

  //convert to number 
  const productId = Number(id);

  //error catch 
  if (isNaN(productId)) {
    return <p className="text-red-500 text-center mt-20">Geçersiz ürün ID!</p>;
  }

  //product - model data
  const product = await getProduct(productId);

  //isEmpty check
  if (!product) {
    return <p className="text-red-500 text-center mt-20">Ürün bulunamadı!</p>;
  }

  return (
    <main className="bg-white text-black font-body min-h-screen">
      <section className="max-w-[1200px] mx-auto px-4 md:px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          {/* Product Image */}
          <div className="relative w-full h-96 md:h-[500px] rounded-lg overflow-hidden shadow-lg group">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>

          {/* Product Infos */}
          <div className="flex flex-col gap-6">
            <h1 className="text-3xl md:text-4xl font-heading text-primary flex items-center gap-2">
              <FaTag className="text-primary" /> {product.name}
            </h1>

            {/* Description */}
            {product.description && (
              <p className="text-gray-700 text-base md:text-lg flex items-start gap-2">
                <FaInfoCircle className="text-gray-500 mt-1" />
                {product.description}
              </p>
            )}

            {/* Price */}
            <p className="text-black font-bold text-2xl flex items-center gap-2">
              <FaMoneyBillWave className="text-primary" /> ₺{product.price}
            </p>

            {/* Buttons */}
            <div className="flex flex-wrap gap-4 mt-4">
              <Link href="/store">
                <button className="bg-primary/80 hover:bg-primary/90 text-white px-5 py-2 rounded-lg text-base md:text-lg transition-transform duration-300 hover:scale-105">
                  Mağazaya Dön
                </button>
              </Link>

              {/* Add to Chart */}
              <button className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg text-base md:text-lg flex items-center gap-2 transition-transform duration-300 hover:scale-105">
                <FaCartPlus /> Sepete Ekle
              </button>


            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />

    </main>
  );
}
