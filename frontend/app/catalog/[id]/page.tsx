"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  ChevronRight,
  Minus,
  Plus,
  ShoppingBag,
  CalendarDays,
  Check,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Navbar } from "@/components/navbar";

// ─── Data model ───────────────────────────────────────────────────────────────
type Size = { label: string; stock: number };
type Variant = {
  id: number;
  color: string;
  hex: string;
  images: string[];
  sizes: Size[];
};
type Product = {
  id: number;
  name: string;
  category: string;
  price: number;
  description: string;
  hasClothingSizes: boolean;
  variants: Variant[];
};

// ─── Mock product ─────────────────────────────────────────────────────────────
const product: Product = {
  id: 1,
  name: "BSU PE Uniform Set",
  category: "School Uniforms",
  price: 850,
  description:
    "The official Batangas State University Physical Education uniform set, compliant with university dress code requirements. Made from breathable, moisture-wicking fabric designed for active use. Includes both the PE shirt and PE shorts.",
  hasClothingSizes: true,
  variants: [
    {
      id: 1,
      color: "Maroon / White",
      hex: "#D2232A",
      images: [
        "/assets/peuniform.png",
        "/assets/poloshirt.png",
        "/assets/peuniform.png",
        "/assets/poloshirt.png",
      ],
      sizes: [
        { label: "XS", stock: 5 },
        { label: "S", stock: 12 },
        { label: "M", stock: 8 },
        { label: "L", stock: 0 },
        { label: "XL", stock: 3 },
        { label: "2XL", stock: 0 },
      ],
    },
    {
      id: 2,
      color: "Navy / White",
      hex: "#1e3a5f",
      images: [
        "/assets/poloshirt.png",
        "/assets/peuniform.png",
        "/assets/poloshirt.png",
        "/assets/peuniform.png",
      ],
      sizes: [
        { label: "XS", stock: 0 },
        { label: "S", stock: 6 },
        { label: "M", stock: 10 },
        { label: "L", stock: 4 },
        { label: "XL", stock: 0 },
        { label: "2XL", stock: 2 },
      ],
    },
  ],
};

// ─── Related products ─────────────────────────────────────────────────────────
const related = [
  {
    id: 2,
    name: "Spartan Varsity Jacket",
    category: "Merchandise",
    price: 1299,
    src: "/assets/universityjacket.png",
    badge: "New",
  },
  {
    id: 4,
    name: "Polo Shirt",
    category: "School Uniforms",
    price: 980,
    src: "/assets/poloshirt.png",
    badge: null,
  },
  {
    id: 3,
    name: "BSU Tote Bag",
    category: "Merchandise",
    price: 350,
    src: "/assets/totebag.png",
    badge: "Sale",
  },
  {
    id: 7,
    name: "Engineering Drawing Set",
    category: "School Supplies",
    price: 480,
    src: "/assets/poloshirt.png",
    badge: "New",
  },
];

// ─── Breadcrumb map ───────────────────────────────────────────────────────────
const categorySlug: Record<string, string> = {
  "School Uniforms": "uniforms",
  Merchandise: "merchandise",
  "School Supplies": "supplies",
};

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function ProductPage() {
  const [activeVariant, setActiveVariant] = useState<Variant>(
    product.variants[0],
  );
  const [activeImage, setActiveImage] = useState(0);
  const [selSize, setSelSize] = useState<string | null>(null);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  const slug = categorySlug[product.category] ?? "catalog";

  function handleVariant(v: Variant) {
    setActiveVariant(v);
    setActiveImage(0);
    setSelSize(null);
  }

  function incQty() {
    setQty((q) => q + 1);
  }
  function decQty() {
    setQty((q) => Math.max(1, q - 1));
  }

  function handleAddToCart() {
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  const selectedSizeStock =
    activeVariant.sizes.find((s) => s.label === selSize)?.stock ?? 0;
  const canAdd = product.hasClothingSizes
    ? selSize !== null && selectedSizeStock > 0
    : true;

  return (
    <div className="flex min-h-screen w-full flex-col">
      <Navbar />

      <main className="flex-1 w-full">
        {/* ── Breadcrumbs ──────────────────────────────────────────────── */}
        <nav className="w-full border-b border-border/40 px-5 py-3 lg:px-10">
          <ol className="flex flex-wrap items-center gap-1 text-[11px] font-medium uppercase tracking-widest text-muted-foreground">
            {[
              { label: "Home", href: "/" },
              { label: "Catalog", href: "/catalog" },
              { label: product.category, href: `/catalog?category=${slug}` },
              { label: product.name, href: null },
            ].map((crumb, i, arr) => (
              <li key={i} className="flex items-center gap-1">
                {crumb.href ? (
                  <Link
                    href={crumb.href}
                    className="transition-colors hover:text-foreground"
                  >
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-foreground">{crumb.label}</span>
                )}
                {i < arr.length - 1 && (
                  <ChevronRight className="size-3 text-muted-foreground/40" />
                )}
              </li>
            ))}
          </ol>
        </nav>

        {/* ── Two-column product layout ─────────────────────────────────── */}
        <section className="w-full px-5 py-10 lg:px-10">
          <div className="flex flex-col gap-10 lg:grid lg:grid-cols-[1fr_1fr] lg:items-start lg:gap-14">
            {/* ── LEFT: Image gallery ──────────────────────────────────── */}
            <div className="flex flex-col gap-3">
              {/* Main image */}
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-secondary">
                <Image
                  key={`${activeVariant.id}-${activeImage}`}
                  src={activeVariant.images[activeImage]}
                  alt={product.name}
                  fill
                  className="object-cover transition-opacity duration-300"
                  priority
                />
                {/* Variant colour dot */}
                <span
                  className="absolute right-4 top-4 size-4 rounded-full border-2 border-white shadow-md"
                  style={{ backgroundColor: activeVariant.hex }}
                />
              </div>

              {/* Thumbnail strip */}
              <div className="flex gap-2 overflow-x-auto pb-1">
                {activeVariant.images.map((src, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    className={cn(
                      "relative size-20 shrink-0 overflow-hidden rounded-lg border-2 transition-all duration-150",
                      activeImage === i
                        ? "border-[#D2232A] shadow-sm"
                        : "border-transparent hover:border-border",
                    )}
                  >
                    <Image
                      src={src}
                      alt={`Preview ${i + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* ── RIGHT: Product details ───────────────────────────────── */}
            <div className="flex flex-col gap-6">
              {/* Category tag */}
              <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#D2232A]">
                {product.category}
              </p>

              {/* Name */}
              <div className="-mt-4">
                <h1 className="text-4xl font-bold tracking-tight text-foreground lg:text-5xl">
                  {product.name}
                </h1>
              </div>

              {/* Price */}
              <p className="text-3xl font-bold text-foreground">
                ₱{product.price.toLocaleString()}
              </p>

              {/* Description */}
              <p className="text-sm leading-relaxed text-muted-foreground">
                {product.description}
              </p>

              {/* Divider */}
              <div className="border-t border-border/40" />

              {/* Colour / variant selector */}
              {product.variants.length > 1 && (
                <div className="flex flex-col gap-2.5">
                  <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
                    Color —{" "}
                    <span className="text-foreground">
                      {activeVariant.color}
                    </span>
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {product.variants.map((v) => (
                      <button
                        key={v.id}
                        onClick={() => handleVariant(v)}
                        title={v.color}
                        className={cn(
                          "flex size-8 items-center justify-center rounded-full border-2 transition-all duration-150",
                          activeVariant.id === v.id
                            ? "border-foreground scale-110 shadow-md"
                            : "border-transparent hover:border-border",
                        )}
                        style={{ backgroundColor: v.hex }}
                      >
                        {activeVariant.id === v.id && (
                          <Check className="size-3.5 text-white drop-shadow" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Size selector (clothing only) */}
              {product.hasClothingSizes && (
                <div className="flex flex-col gap-2.5">
                  <div className="flex items-center justify-between">
                    <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
                      Size{" "}
                      {selSize && (
                        <span className="text-foreground">— {selSize}</span>
                      )}
                    </p>
                    <button className="text-[10px] font-semibold uppercase tracking-widest text-[#D2232A] hover:underline">
                      Size Guide
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {activeVariant.sizes.map((s) => {
                      const oos = s.stock === 0;
                      return (
                        <button
                          key={s.label}
                          disabled={oos}
                          onClick={() => setSelSize(s.label)}
                          className={cn(
                            "relative flex h-10 min-w-[3rem] items-center justify-center rounded-lg border px-3 text-sm font-semibold transition-all duration-150",
                            oos
                              ? "cursor-not-allowed border-border/30 text-muted-foreground/30"
                              : selSize === s.label
                                ? "border-[#D2232A] bg-[#D2232A] text-white shadow-sm"
                                : "border-border bg-background text-foreground hover:border-foreground/60",
                          )}
                        >
                          {s.label}
                          {/* OOS strikethrough line */}
                          {oos && (
                            <span className="absolute inset-0 flex items-center justify-center">
                              <span className="absolute h-px w-full rotate-[20deg] bg-muted-foreground/20" />
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                  {selSize &&
                    selectedSizeStock > 0 &&
                    selectedSizeStock <= 5 && (
                      <p className="text-[11px] font-semibold text-amber-500">
                        Only {selectedSizeStock} left in stock
                      </p>
                    )}
                </div>
              )}

              {/* Quantity */}
              <div className="flex flex-col gap-2.5">
                <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
                  Quantity
                </p>
                <div className="inline-flex items-center rounded-lg border border-border">
                  <button
                    onClick={decQty}
                    className="flex h-10 w-10 items-center justify-center rounded-l-lg text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="size-3.5" />
                  </button>
                  <span className="flex h-10 w-12 items-center justify-center border-x border-border text-sm font-semibold text-foreground">
                    {qty}
                  </span>
                  <button
                    onClick={incQty}
                    className="flex h-10 w-10 items-center justify-center rounded-r-lg text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                    aria-label="Increase quantity"
                  >
                    <Plus className="size-3.5" />
                  </button>
                </div>
              </div>

              {/* CTA buttons */}
              <div className="flex flex-wrap gap-3">
                <button
                  disabled={!canAdd}
                  onClick={handleAddToCart}
                  className={cn(
                    "inline-flex flex-1 items-center justify-center gap-2 rounded-md px-7 py-3.5 text-sm font-semibold uppercase tracking-widest text-white transition-all duration-200",
                    canAdd
                      ? added
                        ? "bg-green-600 hover:bg-green-700"
                        : "bg-[#D2232A] hover:bg-[#b01e23]"
                      : "cursor-not-allowed bg-[#D2232A]/30",
                  )}
                >
                  {added ? (
                    <>
                      <Check className="size-4" /> Added
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="size-4" /> Add to Cart
                    </>
                  )}
                </button>

                <Link
                  href="/reserve"
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-md border border-border px-7 py-3.5 text-sm font-semibold uppercase tracking-widest text-foreground transition-colors hover:border-foreground"
                >
                  <CalendarDays className="size-4" />
                  Reserve Pickup
                </Link>
              </div>

              {!canAdd && product.hasClothingSizes && !selSize && (
                <p className="text-[11px] text-muted-foreground">
                  Please select a size to continue.
                </p>
              )}
            </div>
          </div>
        </section>

        {/* ── You may also like ─────────────────────────────────────────── */}
        <section className="w-full border-t border-border/40 px-5 py-14 lg:px-10">
          <div className="mb-8">
            <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-widest text-[#D2232A]">
              Explore More
            </p>
            <h2 className="text-2xl font-bold tracking-tight text-foreground lg:text-3xl">
              You May Also Like
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {related.map((item) => (
              <Link
                key={item.id}
                href={`/catalog/${item.id}`}
                className="group flex flex-col"
              >
                <div className="relative aspect-[5/6] w-full overflow-hidden rounded-xl bg-secondary">
                  <Image
                    src={item.src}
                    alt={item.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {item.badge && (
                    <span
                      className={cn(
                        "absolute left-3 top-3 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest",
                        item.badge === "New"
                          ? "bg-[#D2232A] text-white"
                          : "bg-foreground text-background",
                      )}
                    >
                      {item.badge}
                    </span>
                  )}
                  <div className="absolute inset-x-0 bottom-0 translate-y-full bg-foreground py-3 text-center text-[11px] font-semibold uppercase tracking-widest text-background transition-transform duration-300 group-hover:translate-y-0">
                    Quick View
                  </div>
                </div>
                <div className="mt-3 flex flex-col gap-1 px-0.5">
                  <p className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground">
                    {item.category}
                  </p>
                  <p className="text-sm font-semibold text-foreground">
                    {item.name}
                  </p>
                  <p className="text-sm font-bold text-[#D2232A]">
                    ₱{item.price.toLocaleString()}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
