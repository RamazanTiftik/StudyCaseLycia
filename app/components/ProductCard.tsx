import Link from "next/link";
import Image from "next/image";
import { FaTag, FaInfoCircle, FaMoneyBillWave } from "react-icons/fa";

interface ProductCardProps {
    product: {
        id: number;
        name: string;
        price: number;
        image: string;
        description?: string;
    };
}

export default function ProductCard({ product }: ProductCardProps) {
    return (
        <div className="group bg-white shadow-lg rounded-xl overflow-hidden transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl flex flex-col relative">

            {/* Product Image */}
            <div className="relative w-full h-80">
                <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                />
            </div>

            {/* Product Info */}
            <div className="p-4 flex flex-col flex-1 relative pb-16">

                {/* Title */}
                <h3 className="font-heading text-lg md:text-xl mb-1 flex items-center gap-1">
                    <FaTag className="text-primary" /> {product.name}
                </h3>

                {/* Description */}
                {product.description && (
                    <p className="text-gray-700 text-sm md:text-base line-clamp-2 mb-1 flex items-center gap-1">
                        <FaInfoCircle className="text-gray-500" /> {product.description}
                    </p>
                )}

                {/* Price */}
                <p className="absolute bottom-4 left-4 text-black font-bold text-base flex items-center gap-1 transition-transform duration-300 group-hover:-translate-y-1">
                    <FaMoneyBillWave className="text-primary" /> ₺{product.price}
                </p>

                {/* See Details */}
                <Link href={`/product/${product.id}`}>
                    <button className="absolute bottom-4 right-4 bg-primary/80 hover:bg-primary/90 text-white px-3 py-1.5 rounded-lg font-body text-sm md:text-base transition-all duration-300 group-hover:scale-105">
                        Ürünü Gör
                    </button>
                </Link>

            </div>
        </div>
    );
}
