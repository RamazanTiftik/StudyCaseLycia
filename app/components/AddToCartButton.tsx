"use client";

import { FaCartPlus } from "react-icons/fa";
import { useCart } from "../store/CartStore";
import toast from "react-hot-toast";

interface Props {
  product: {
    id: number;
    name: string;
    price: number;
    image: string;
  };
}

export default function AddToCartButton({ product }: Props) {
  const add = useCart((state) => state.add);

  return (
    <button
      onClick={() => {
        add({
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          quantity: 1,
        });

        toast.success("Ürün sepete eklendi!");
      }}
      className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg text-base md:text-lg flex items-center gap-2 transition-transform duration-300 hover:scale-105"
    >
      <FaCartPlus /> Sepete Ekle
    </button>
  );
}
