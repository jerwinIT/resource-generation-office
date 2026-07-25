import Image from "next/image";
import Link from "next/link";

const categories = [
  {
    label: "School Uniforms",
    href: "/catalog?category=uniforms",
    src: "/assets/schooluniform.png",
  },
  {
    label: "Merchandise",
    href: "/catalog?category=merchandise",
    src: "/assets/merchandise.png",
  },
  {
    label: "School Supplies",
    href: "/catalog?category=supplies",
    src: "/assets/schoolsupplies.png",
  },
];

export default function ShopByCategory() {
  return (
    <section className="w-full px-5 lg:px-10 py-20 ">
      {/* Header */}
      <div className="mb-10">
        <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-widest text-[#D2232A]">
          Browse the Collection
        </p>
        <h2 className="text-3xl font-bold tracking-tight text-foreground lg:text-4xl">
          Shop by Category
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Curated essentials for every BSU student.
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {categories.map((cat) => (
          <Link
            key={cat.label}
            href={cat.href}
            className="group relative overflow-hidden rounded-xl bg-secondary"
          >
            {/* Image */}
            <div className="relative aspect-[3/4] w-full overflow-hidden">
              <Image
                src={cat.src}
                alt={cat.label}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/20" />
            </div>

            {/* Label bar */}
            <div className="flex items-center justify-between px-5 py-4">
              <span className="text-sm font-semibold uppercase tracking-widest text-foreground">
                {cat.label}
              </span>
              <span className="flex size-7 items-center justify-center rounded-full border border-border text-foreground transition-colors group-hover:border-[#D2232A] group-hover:bg-[#D2232A] group-hover:text-white">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M2.5 7h9M7.5 3l4 4-4 4"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </div>

            {/* Red bottom sweep on hover */}
            <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-[#D2232A] transition-all duration-300 group-hover:w-full" />
          </Link>
        ))}
      </div>
    </section>
  );
}
