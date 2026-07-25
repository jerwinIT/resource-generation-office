import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/navbar";
import Hero from "@/components/sections/Hero";
import ShopByCategory from "@/components/sections/ShopByCategory";
import FeaturedProducts from "@/components/sections/FeaturedProducts";
import ReservationSection from "@/components/sections/ReservationSection";

export default function Home() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <Navbar />
      <main className="flex-1 w-full">
        <Hero />
        <ShopByCategory />
        <FeaturedProducts />
        <ReservationSection />
      </main>
    </div>
  );
}
