"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Search, ShoppingBag, SlidersHorizontal } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Navbar } from "@/components/navbar";

// ─── Mock product data ────────────────────────────────────────────────────────
const products = [
  {
    id: 1,
    name: "BSU PE Uniform Set",
    category: "School Uniforms",
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
    badge: "Sale",
    src: "/assets/totebag.png",
  },
  {
    id: 4,
    name: "Polo Shirt",
    category: "School Uniforms",
    price: 980,
    badge: "New",
    src: "/assets/poloshirt.png",
  },
  {
    id: 5,
    name: "Laboratory Gown",
    category: "School Uniforms",
    price: 620,
    badge: null,
    src: "/assets/peuniform.png",
  },
  {
    id: 6,
    name: "BSU Lanyard",
    category: "Merchandise",
    price: 120,
    badge: null,
    src: "/assets/totebag.png",
  },
  {
    id: 7,
    name: "Engineering Drawing Set",
    category: "School Supplies",
    price: 480,
    badge: "New",
    src: "/assets/poloshirt.png",
  },
  {
    id: 8,
    name: "BSU Notebook Pack (5s)",
    category: "School Supplies",
    price: 175,
    badge: null,
    src: "/assets/totebag.png",
  },
  {
    id: 9,
    name: "Spartan Cap",
    category: "Merchandise",
    price: 450,
    badge: "Sale",
    src: "/assets/universityjacket.png",
  },
  {
    id: 10,
    name: "Student ID Lace",
    category: "School Supplies",
    price: 85,
    badge: null,
    src: "/assets/totebag.png",
  },
  {
    id: 11,
    name: "NSTP Uniform Set",
    category: "School Uniforms",
    price: 760,
    badge: null,
    src: "/assets/peuniform.png",
  },
  {
    id: 12,
    name: "BSU Sticker Pack",
    category: "Merchandise",
    price: 95,
    badge: "New",
    src: "/assets/totebag.png",
  },
];

const FILTERS = [
  "All Products",
  "School Uniforms",
  "Merchandise",
  "School Supplies",
] as const;
type Filter = (typeof FILTERS)[number];

// ─── Badge colour map ─────────────────────────────────────────────────────────
const badgeColour: Record<string, string> = {
  New: "bg-[#D2232A] text-white",
  Sale: "bg-foreground text-background",
};

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function CatalogPage() {
  const [active, setActive] = useState<Filter>("All Products");
  const [query, setQuery] = useState("");

  const filtered = products.filter((p) => {
    const matchCat = active === "All Products" || p.category === active;
    const matchQuery = p.name.toLowerCase().includes(query.toLowerCase());
    return matchCat && matchQuery;
  });

  return (
    <div className="flex min-h-screen w-full flex-col">
      <Navbar />

      <main className="flex-1 w-full">
        {/* ── Hero / Heading ─────────────────────────────────────────────── */}
        <section className="w-full border-b border-border/40 px-5 pb-10 pt-14 lg:px-10">
          {/* SHOP tag */}
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.25em] text-[#D2232A]">
            Shop
          </p>

          {/* Main heading */}
          <h1 className="max-w-2xl text-4xl font-bold tracking-tight text-foreground lg:text-5xl">
            Product Catalog
          </h1>

          {/* Subtitle */}
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground lg:text-base">
            Everything the modern BSU student needs — uniforms, merchandise, and
            supplies in one place.
          </p>

          {/* ── Filter row: badges (left) + search (right) ─────────────── */}
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            {/* Category badges */}
            <div className="flex flex-wrap items-center gap-2">
              {FILTERS.map((f) => (
                <button
                  key={f}
                  onClick={() => setActive(f)}
                  className={cn(
                    // base — mimics shadcn Badge outline variant
                    "inline-flex items-center rounded-full border px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-widest transition-all duration-200",
                    active === f
                      ? "border-[#D2232A] bg-[#D2232A] text-white shadow-sm"
                      : "border-border bg-background text-muted-foreground hover:border-foreground/40 hover:text-foreground",
                  )}
                >
                  {f}
                </button>
              ))}
            </div>

            {/* Search bar */}
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search products…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="h-9 w-full rounded-full border border-border bg-secondary/50 pl-9 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-foreground/40 focus:outline-none focus:ring-0"
              />
            </div>
          </div>
        </section>

        {/* ── Product grid ───────────────────────────────────────────────── */}
        <section className="w-full px-5 py-12 lg:px-10">
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-3 py-24 text-center">
              <ShoppingBag className="size-10 text-muted-foreground/40" />
              <p className="text-sm font-medium text-muted-foreground">
                No products found. Try a different filter or search term.
              </p>
            </div>
          ) : (
            <>
              {/* Result count */}
              <p className="mb-6 text-[11px] font-medium uppercase tracking-widest text-muted-foreground">
                {filtered.length}{" "}
                {filtered.length === 1 ? "product" : "products"}
              </p>

              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                {filtered.map((product) => (
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
                      {product.badge && (
                        <span
                          className={cn(
                            "absolute left-3 top-3 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest",
                            badgeColour[product.badge],
                          )}
                        >
                          {product.badge}
                        </span>
                      )}

                      {/* Quick-view overlay */}
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
            </>
          )}
        </section>
      </main>
    </div>
  );
}
