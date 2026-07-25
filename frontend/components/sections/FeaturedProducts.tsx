import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const products = [
  {
    id: 1,
    name: "BSU PE Uniform Set",
    category: "Uniforms",
    price: 850,
    badge: "New",
    src: "/assets/peuniform.png",
  },
  {
    id: 2,
    name: "Spartan Varsity Jacket",
    category: "Merchandise",
    price: 1299,
    badge: "New",
    src: "/assets/universityjacket.png",
  },
  {
    id: 3,
    name: "BSU Tote Bag",
    category: "Merchandise",
    price: 350,
    badge: "New",
    src: "/assets/totebag.png",
  },
  {
    id: 4,
    name: "Polo Shirt",
    category: "Uniforms",
    price: 980,
    badge: "New",
    src: "/assets/poloshirt.png",
  },
];

export default function FeaturedProducts() {
  return (
    <section className="w-full px-5 lg:px-10 py-20 ">
      {/* Header */}
      <div className="mb-10 flex items-end justify-between">
        <div>
          <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-widest text-[#D2232A]">
            Just Arrived
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-foreground lg:text-4xl">
            Featured Products
          </h2>
        </div>

        <Link
          href="/catalog"
          className="group inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-foreground transition-colors hover:text-[#D2232A]"
        >
          View All
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>

      {/* Product Cards */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {products.map((product) => (
          <Link
            key={product.id}
            href={`/catalog/${product.id}`}
            className="group flex flex-col"
          >
            {/* Image */}
            <div className="relative aspect-[5/6] w-full overflow-hidden rounded-xl bg-secondary">
              <Image
                src={product.src}
                alt={product.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />

              {/* Badge */}
              <span className="absolute left-3 top-3 rounded-full bg-[#D2232A] px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-white">
                {product.badge}
              </span>

              {/* Quick action overlay */}
              <div className="absolute inset-x-0 bottom-0 translate-y-full bg-foreground py-3 text-center text-[11px] font-semibold uppercase tracking-widest text-background transition-transform duration-300 group-hover:translate-y-0">
                Quick View
              </div>
            </div>

            {/* Info */}
            <div className="mt-3 flex flex-col gap-1 px-0.5">
              <p className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground">
                {product.category}
              </p>
              <p className="text-sm font-semibold text-foreground">
                {product.name}
              </p>
              <p className="text-sm font-bold text-[#D2232A]">
                ₱{product.price.toLocaleString()}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
