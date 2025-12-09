import { supabase } from "../../../lib/supabaseClient";
import Image from "next/image";
import Link from "next/link";
import Footer from "../../components/Footer";
import AddToCartButton from "@/app/components/AddToCartButton";

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  description?: string;
}

interface Props {
  params: Promise<{ id: string }>;
}

async function getProduct(id: number) {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .single();

  if (error) return null;
  return data as Product;
}

async function getSimilarProducts(currentId: number) {
  const { data } = await supabase
    .from("products")
    .select("*")
    .neq("id", currentId)
    .limit(3);

  return data as Product[] | null;
}

export default async function ProductPage(props: Props) {
  const { id } = await props.params;
  const productId = Number(id);

  if (isNaN(productId)) {
    return <p className="text-center mt-20 text-gray-600">Geçersiz ürün ID!</p>;
  }

  const product = await getProduct(productId);
  const similarProducts = await getSimilarProducts(productId);

  if (!product) {
    return <p className="text-center mt-20 text-gray-600">Ürün bulunamadı!</p>;
  }

  return (
    <main className="min-h-screen bg-white text-black font-body">
      <section className="max-w-6xl mx-auto px-4 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">

          {/* Product Image */}
          <div className="relative aspect-square rounded-xl overflow-hidden bg-gray-50">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover p-4"
              priority
            />
          </div>

          {/* Product Info */}
          <div className="flex flex-col gap-8">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-0.5 bg-secondary"></div>
                <span className="text-sm text-gray-500">Ürün Detayı</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-heading text-primary mb-4">
                {product.name}
              </h1>
            </div>

            {product.description && (
              <div className="border-l-2 border-secondary/20 pl-4 py-2">
                <p className="text-gray-600 leading-relaxed">
                  {product.description}
                </p>
              </div>
            )}

            {/* Price */}
            <div className="pt-4">
              <div className="text-2xl md:text-3xl font-bold text-primary">
                ₺{product.price.toLocaleString("tr-TR", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </div>
              <div className="text-sm text-gray-500 mt-1">KDV Dahil</div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <AddToCartButton
                product={{
                  id: product.id,
                  name: product.name,
                  price: product.price,
                  image: product.image,
                }}
              />
              <Link href="/store">
                <button className="px-8 py-3 border border-gray-300 rounded-lg 
                                 hover:border-gray-400 transition-colors">
                  Mağazaya Dön
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Similar Products */}
        {similarProducts && similarProducts.length > 0 && (
          <div className="mt-24">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-heading text-primary mb-2">
                Benzer Ürünler
              </h2>
              <div className="w-12 h-0.5 bg-secondary mx-auto"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {similarProducts.map((item) => (
                <Link
                  key={item.id}
                  href={`/product/${item.id}`}
                  className="group"
                >
                  <div className="relative aspect-square mb-4 bg-gray-50 rounded-lg overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="text-center">
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      {item.name}
                    </h3>
                    <div className="text-primary font-bold">
                      ₺{item.price.toLocaleString("tr-TR", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </div>
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