import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="flex w-full min-h-[calc(100vh-64px)]">
      {/* Left: Copy */}
      <div className="flex flex-1 flex-col justify-center  px-5 lg:px-10 py-12 ">
        {/* Badge */}
        <span className="mb-5 inline-flex w-fit items-center gap-2 rounded-full bg-red-50 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-red-700">
          <span className="size-1.5 rounded-full bg-red-600" />
          Official BSU Store
        </span>

        {/* Headline */}
        <h1 className="mb-4 text-5xl font-bold leading-[1.1] tracking-tight text-foreground lg:text-6xl">
          Gear Up for <em className="not-italic text-[#D2232A]">Excellence.</em>
        </h1>

        {/* Sub */}
        <p className="mb-8 max-w-md text-base leading-relaxed text-muted-foreground">
          Shop official Batangas State University uniforms, merchandise, and
          supplies — then reserve your pickup slot in minutes.
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap gap-3">
          <Link
            href="/catalog"
            className="rounded-md bg-[#D2232A] px-7 py-3.5 text-sm font-semibold uppercase tracking-widest text-white transition-colors hover:bg-[#b01e23]"
          >
            Shop Now
          </Link>
          <Link
            href="/reserve"
            className="rounded-md border border-border px-7 py-3.5 text-sm font-semibold uppercase tracking-widest text-foreground transition-colors hover:border-foreground"
          >
            Reserve Slot
          </Link>
        </div>
      </div>

      {/* Right: Image */}
      <div className="relative hidden w-[46%] flex-shrink-0 lg:block">
        {/* Red accent bar */}
        <div className="absolute inset-y-0 left-0 z-10 w-1.5 bg-[#D2232A]" />

        <Image
          src="/assets/hero-image.png"
          alt="BSU official uniform"
          fill
          className="object-cover object-center"
          priority
        />

        {/* Floating tag */}
        <div className="absolute bottom-8 left-6 z-10 flex items-center gap-3 rounded-lg border border-border bg-background px-4 py-3 shadow-sm">
          <span className="size-2.5 rounded-full bg-[#D2232A]" />
          <div>
            <p className="text-xs font-semibold text-foreground">
              New Collection
            </p>
            <p className="text-[11px] text-muted-foreground">AY 2025–2026</p>
          </div>
        </div>
      </div>
    </section>
  );
}
