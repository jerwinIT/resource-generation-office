"use client";

import Image from "next/image";
import { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  CalendarDays,
  Clock,
  ShoppingBag,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Navbar } from "@/components/navbar";

// ─── Types ────────────────────────────────────────────────────────────────────
type TimeSlot = { label: string; time: string; full?: boolean };

// ─── Mock cart items ──────────────────────────────────────────────────────────
const cartItems = [
  {
    id: 1,
    name: "BSU PE Uniform Set",
    category: "School Uniforms",
    price: 850,
    src: "/assets/peuniform.png",
  },
  {
    id: 2,
    name: "Spartan Varsity Jacket",
    category: "Merchandise",
    price: 1299,
    src: "/assets/universityjacket.png",
  },
];

// ─── Time slots ───────────────────────────────────────────────────────────────
const timeSlots: TimeSlot[] = [
  { label: "8:00 AM", time: "08:00", full: false },
  { label: "9:00 AM", time: "09:00", full: true },
  { label: "10:00 AM", time: "10:00", full: false },
  { label: "11:00 AM", time: "11:00", full: false },
  { label: "12:00 PM", time: "12:00", full: true },
  { label: "1:00 PM", time: "13:00", full: false },
  { label: "2:00 PM", time: "14:00", full: false },
  { label: "3:00 PM", time: "15:00", full: true },
  { label: "4:00 PM", time: "16:00", full: false },
  { label: "5:00 PM", time: "17:00", full: false },
];

// ─── Calendar helpers ─────────────────────────────────────────────────────────
const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}
function getFirstDayOfMonth(year: number, month: number) {
  return new Date(year, month, 1).getDay();
}
function isWeekend(year: number, month: number, day: number) {
  const dow = new Date(year, month, day).getDay();
  return dow === 0 || dow === 6;
}
function isBefore(year: number, month: number, day: number) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return new Date(year, month, day) < today;
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function ReservationPage() {
  const today = new Date();
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [selDay, setSelDay] = useState<number | null>(null);
  const [selSlot, setSelSlot] = useState<TimeSlot | null>(null);

  const hasItems = cartItems.length > 0;
  const total = cartItems.reduce((s, p) => s + p.price, 0);
  const daysCount = getDaysInMonth(viewYear, viewMonth);
  const firstDow = getFirstDayOfMonth(viewYear, viewMonth);

  function prevMonth() {
    if (viewMonth === 0) {
      setViewYear((y) => y - 1);
      setViewMonth(11);
    } else setViewMonth((m) => m - 1);
    setSelDay(null);
  }
  function nextMonth() {
    if (viewMonth === 11) {
      setViewYear((y) => y + 1);
      setViewMonth(0);
    } else setViewMonth((m) => m + 1);
    setSelDay(null);
  }

  const selDate = selDay ? `${MONTHS[viewMonth]} ${selDay}, ${viewYear}` : null;

  return (
    <div className="flex min-h-screen w-full flex-col">
      <Navbar />

      <main className="flex-1 w-full">
        {/* ── Heading ──────────────────────────────────────────────────── */}
        <section className="w-full border-b border-border/40 px-5 pb-10 pt-14 lg:px-10">
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.25em] text-[#D2232A]">
            Reservation
          </p>
          <h1 className="text-4xl font-bold tracking-tight text-foreground lg:text-5xl">
            Reserve a Pickup Slot
          </h1>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground lg:text-base">
            Choose a date and time between 8:00 AM and 5:00 PM. We'll hold your
            order until you arrive.
          </p>
        </section>

        {/* ── Two-column body ───────────────────────────────────────────── */}
        <section className="w-full px-5 py-12 lg:px-10">
          <div
            className={cn(
              "flex flex-col gap-8",
              hasItems && "lg:grid lg:grid-cols-[1fr_360px] lg:items-start",
            )}
          >
            {/* ── LEFT: Calendar + Time slots ──────────────────────────── */}
            <div className="flex flex-col gap-6">
              {/* Calendar card */}
              <div className="rounded-2xl border border-border/60 bg-background p-6 shadow-sm">
                {/* Month nav */}
                <div className="mb-5 flex items-center justify-between">
                  <button
                    onClick={prevMonth}
                    className="grid size-8 place-items-center rounded-full border border-border transition-colors hover:bg-secondary"
                    aria-label="Previous month"
                  >
                    <ChevronLeft className="size-4" />
                  </button>
                  <p className="text-sm font-semibold uppercase tracking-widest text-foreground">
                    {MONTHS[viewMonth]} {viewYear}
                  </p>
                  <button
                    onClick={nextMonth}
                    className="grid size-8 place-items-center rounded-full border border-border transition-colors hover:bg-secondary"
                    aria-label="Next month"
                  >
                    <ChevronRight className="size-4" />
                  </button>
                </div>

                {/* Day-of-week headers */}
                <div className="mb-2 grid grid-cols-7 text-center">
                  {DAYS.map((d) => (
                    <span
                      key={d}
                      className="pb-2 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground"
                    >
                      {d}
                    </span>
                  ))}
                </div>

                {/* Day cells */}
                <div className="grid grid-cols-7 gap-y-1 text-center">
                  {/* Empty offset cells */}
                  {Array.from({ length: firstDow }).map((_, i) => (
                    <span key={`e-${i}`} />
                  ))}

                  {Array.from({ length: daysCount }, (_, i) => i + 1).map(
                    (day) => {
                      const weekend = isWeekend(viewYear, viewMonth, day);
                      const past = isBefore(viewYear, viewMonth, day);
                      const disabled = weekend || past;
                      const selected = selDay === day;

                      return (
                        <button
                          key={day}
                          disabled={disabled}
                          onClick={() => {
                            setSelDay(day);
                            setSelSlot(null);
                          }}
                          className={cn(
                            "mx-auto flex size-9 items-center justify-center rounded-full text-sm font-medium transition-all duration-150",
                            disabled
                              ? "cursor-not-allowed text-muted-foreground/30"
                              : "hover:bg-secondary text-foreground",
                            selected
                              ? "!bg-[#D2232A] !text-white font-semibold shadow-sm"
                              : "",
                          )}
                        >
                          {day}
                        </button>
                      );
                    },
                  )}
                </div>

                {/* Legend */}
                <div className="mt-5 flex items-center gap-5 border-t border-border/40 pt-4">
                  <span className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
                    <span className="size-2 rounded-full bg-[#D2232A]" />{" "}
                    Selected
                  </span>
                  <span className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
                    <span className="size-2 rounded-full bg-muted-foreground/20" />{" "}
                    Unavailable
                  </span>
                </div>
              </div>

              {/* Time slots card */}
              <div className="rounded-2xl border border-border/60 bg-background p-6 shadow-sm">
                <div className="mb-5 flex items-center gap-2">
                  <Clock className="size-4 text-[#D2232A]" />
                  <p className="text-sm font-semibold uppercase tracking-widest text-foreground">
                    Available Time Slots
                  </p>
                </div>

                {!selDay ? (
                  <p className="text-sm text-muted-foreground">
                    Please select a date first to see available slots.
                  </p>
                ) : (
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                    {timeSlots.map((slot) => (
                      <button
                        key={slot.time}
                        disabled={slot.full}
                        onClick={() => setSelSlot(slot)}
                        className={cn(
                          "relative flex flex-col items-center justify-center rounded-xl border py-3 text-sm font-semibold transition-all duration-150",
                          slot.full
                            ? "cursor-not-allowed border-border/40 bg-secondary/50 text-muted-foreground/40"
                            : selSlot?.time === slot.time
                              ? "border-[#D2232A] bg-[#D2232A] text-white shadow-sm"
                              : "border-border bg-background text-foreground hover:border-foreground/40",
                        )}
                      >
                        {slot.label}
                        {slot.full && (
                          <span className="mt-0.5 text-[9px] font-semibold uppercase tracking-widest text-muted-foreground/50">
                            Full
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* ── RIGHT: Reservation summary (sticky) ──────────────────── */}
            {hasItems && (
              <div className="lg:sticky lg:top-24 lg:self-start">
                <div className="rounded-2xl border border-border/60 bg-background p-6 shadow-sm">
                  <p className="mb-5 text-sm font-semibold uppercase tracking-widest text-foreground">
                    Reservation Summary
                  </p>

                  {/* Product list */}
                  <div className="flex flex-col gap-4">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex items-center gap-3">
                        {/* Thumbnail */}
                        <div className="relative size-14 shrink-0 overflow-hidden rounded-lg bg-secondary">
                          <Image
                            src={item.src}
                            alt={item.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        {/* Info */}
                        <div className="flex flex-1 flex-col gap-0.5 min-w-0">
                          <p className="truncate text-sm font-semibold text-foreground">
                            {item.name}
                          </p>
                          <p className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground">
                            {item.category}
                          </p>
                          <p className="text-sm font-bold text-[#D2232A]">
                            ₱{item.price.toLocaleString()}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Pickup details */}
                  <div className="mt-6 flex flex-col gap-3">
                    <div className="flex items-start gap-3 rounded-lg bg-secondary/60 px-4 py-3">
                      <CalendarDays className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
                      <div>
                        <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                          Pickup Date
                        </p>
                        <p
                          className={cn(
                            "mt-0.5 text-sm font-semibold",
                            selDate
                              ? "text-foreground"
                              : "text-muted-foreground/50",
                          )}
                        >
                          {selDate ?? "No date selected"}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 rounded-lg bg-secondary/60 px-4 py-3">
                      <Clock className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
                      <div>
                        <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                          Time Slot
                        </p>
                        <p
                          className={cn(
                            "mt-0.5 text-sm font-semibold",
                            selSlot
                              ? "text-foreground"
                              : "text-muted-foreground/50",
                          )}
                        >
                          {selSlot?.label ?? "No slot selected"}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Total */}
                  <div className="my-5 border-t border-border/60" />
                  <div className="flex items-center justify-between">
                    <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
                      Total Due at Pickup
                    </p>
                    <p className="text-lg font-bold text-foreground">
                      ₱{total.toLocaleString()}
                    </p>
                  </div>

                  {/* Confirm button */}
                  <button
                    disabled={!selDate || !selSlot}
                    className={cn(
                      "mt-5 w-full rounded-md px-7 py-3.5 text-sm font-semibold uppercase tracking-widest text-white transition-colors",
                      selDate && selSlot
                        ? "bg-[#D2232A] hover:bg-[#b01e23]"
                        : "cursor-not-allowed bg-[#D2232A]/30",
                    )}
                  >
                    Confirm Reservation
                  </button>

                  {(!selDate || !selSlot) && (
                    <p className="mt-3 text-center text-[10px] text-muted-foreground">
                      Select a date and time slot to continue.
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
