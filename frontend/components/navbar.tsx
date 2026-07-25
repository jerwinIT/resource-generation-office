"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { Menu, Search, ShoppingBag, User, X, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/logo";
import { useCart } from "@/context/cart-context";

const leftLinks = [{ href: "/catalog", label: "Shop" }];

const rightLinks = [{ href: "/reserve", label: "Reserve" }];

const allLinks = [...leftLinks, ...rightLinks];

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const { totalQty, lastAdded, popupVisible } = useCart();

  // Animate the badge on qty change
  const [bump, setBump] = useState(false);
  const prevQty = useRef(totalQty);
  useEffect(() => {
    if (totalQty !== prevQty.current) {
      setBump(true);
      prevQty.current = totalQty;
      const t = setTimeout(() => setBump(false), 400);
      return () => clearTimeout(t);
    }
  }, [totalQty]);

  return (
    <header className="sticky top-0 z-50 border-b border-border/40 bg-background/95 backdrop-blur-xl">
      {/* ── Main bar ──────────────────────────────────────────────────── */}
      <div className="flex h-16 w-full items-center justify-between gap-4 px-6 lg:px-10">
        {/* Left: Profile (desktop) / Hamburger (mobile) */}
        <div className="flex shrink-0 items-center">
          <Button
            asChild
            variant="ghost"
            size="icon"
            className="hidden rounded-full lg:inline-flex"
            aria-label="Account"
          >
            <Link href="/dashboard">
              <User className="size-5" />
            </Link>
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="rounded-full lg:hidden"
            aria-label="Menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </Button>
        </div>

        {/* Center: Left links | Logo | Right links (desktop) */}
        <nav className="hidden flex-1 items-center justify-center lg:flex">
          <div className="flex items-center">
            {leftLinks.map((link) => {
              const active = pathname === link.href.split("?")[0];
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={cn(
                    "px-4 py-2 text-sm font-semibold uppercase tracking-widest text-muted-foreground transition-colors hover:text-foreground",
                    active && "text-foreground underline underline-offset-4",
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          <div className="mx-3 h-6 w-px bg-border/60" />

          <Link href="/" aria-label="RGO home" className="shrink-0">
            <Logo />
          </Link>

          <div className="mx-3 h-6 w-px bg-border/60" />

          <div className="flex items-center">
            {rightLinks.map((link) => {
              const active = pathname === link.href.split("?")[0];
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={cn(
                    "px-4 py-2 text-sm font-semibold uppercase tracking-widest text-muted-foreground transition-colors hover:text-foreground",
                    active && "text-foreground underline underline-offset-4",
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>
        </nav>

        {/* Mobile center: Logo */}
        <Link href="/" aria-label="RGO home" className="shrink-0 lg:hidden">
          <Logo />
        </Link>

        {/* Right: Cart icon + popup */}
        <div className="relative flex shrink-0 items-center">
          <Button
            asChild
            variant="ghost"
            size="icon"
            className="relative rounded-full"
            aria-label="Cart"
          >
            <Link href="/reserve">
              <ShoppingBag className="size-5" />
              {totalQty > 0 && (
                <span
                  className={cn(
                    "absolute -right-0.5 -top-0.5 grid min-w-[1rem] place-items-center rounded-full bg-[#D2232A] px-0.5 text-[10px] font-bold text-white transition-transform duration-200",
                    bump && "scale-125",
                  )}
                >
                  {totalQty}
                </span>
              )}
            </Link>
          </Button>

          {/* ── Cart popup ─────────────────────────────────────────────── */}
          <div
            className={cn(
              "absolute right-0 top-[calc(100%+10px)] w-72 origin-top-right rounded-2xl border border-border/60 bg-background shadow-xl transition-all duration-300",
              popupVisible
                ? "pointer-events-auto translate-y-0 opacity-100"
                : "pointer-events-none -translate-y-2 opacity-0",
            )}
          >
            {lastAdded && (
              <>
                {/* Header */}
                <div className="flex items-center gap-2 border-b border-border/40 px-4 py-3">
                  <span className="grid size-5 place-items-center rounded-full bg-green-500">
                    <Check className="size-3 text-white" strokeWidth={3} />
                  </span>
                  <p className="text-[11px] font-semibold uppercase tracking-widest text-foreground">
                    Added to Cart
                  </p>
                </div>

                {/* Product row */}
                <div className="flex items-center gap-3 px-4 py-4">
                  <div className="relative size-14 shrink-0 overflow-hidden rounded-lg bg-secondary">
                    <Image
                      src={lastAdded.src}
                      alt={lastAdded.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                    <p className="truncate text-sm font-semibold text-foreground">
                      {lastAdded.name}
                    </p>
                    <p className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground">
                      {lastAdded.category}
                      {lastAdded.size ? ` · ${lastAdded.size}` : ""}
                    </p>
                    <p className="text-sm font-bold text-[#D2232A]">
                      ₱{lastAdded.price.toLocaleString()}
                    </p>
                  </div>
                </div>

                {/* Footer actions */}
                <div className="flex gap-2 border-t border-border/40 px-4 py-3">
                  <Link
                    href="/catalog"
                    className="flex-1 rounded-md border border-border py-2 text-center text-[11px] font-semibold uppercase tracking-widest text-foreground transition-colors hover:border-foreground"
                  >
                    Continue
                  </Link>
                  <Link
                    href="/reserve"
                    className="flex-1 rounded-md bg-[#D2232A] py-2 text-center text-[11px] font-semibold uppercase tracking-widest text-white transition-colors hover:bg-[#b01e23]"
                  >
                    View Cart
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* ── Mobile menu ───────────────────────────────────────────────── */}
      {open && (
        <nav className="border-t border-border/40 bg-background px-6 py-4 lg:hidden">
          {allLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setOpen(false)}
              className="block rounded-lg px-3 py-3 font-semibold uppercase tracking-widest text-foreground hover:bg-secondary"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/admin"
            onClick={() => setOpen(false)}
            className="block rounded-lg px-3 py-3 text-base font-medium uppercase tracking-widest text-muted-foreground hover:bg-secondary"
          >
            Admin
          </Link>

          <div className="my-3 border-t border-border/40" />

          <div className="flex items-center gap-2 px-3">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full"
              aria-label="Search"
              onClick={() => setOpen(false)}
            >
              <Search className="size-5" />
            </Button>

            <Button
              asChild
              variant="ghost"
              size="icon"
              className="rounded-full"
              aria-label="Account"
            >
              <Link href="/dashboard" onClick={() => setOpen(false)}>
                <User className="size-5" />
              </Link>
            </Button>

            <Button
              asChild
              variant="ghost"
              size="icon"
              className="relative rounded-full"
              aria-label="Cart"
            >
              <Link href="/reserve" onClick={() => setOpen(false)}>
                <ShoppingBag className="size-5" />
                {totalQty > 0 && (
                  <span className="absolute -right-0.5 -top-0.5 grid min-w-[1rem] place-items-center rounded-full bg-[#D2232A] px-0.5 text-[10px] font-bold text-white">
                    {totalQty}
                  </span>
                )}
              </Link>
            </Button>
          </div>
        </nav>
      )}
    </header>
  );
}
