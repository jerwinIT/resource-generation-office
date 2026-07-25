import Link from "next/link";
import { CalendarCheck, Clock, ShoppingBag, BadgeCheck } from "lucide-react";

const steps = [
  {
    icon: ShoppingBag,
    title: "Browse & Select",
    desc: "Choose your uniforms, merchandise, or supplies from the catalog.",
  },
  {
    icon: CalendarCheck,
    title: "Reserve a Slot",
    desc: "Pick a date and time that works for your schedule to claim your items.",
  },
  {
    icon: Clock,
    title: "Await Confirmation",
    desc: "You'll receive a confirmation once your reservation is approved by the RGO.",
  },
  {
    icon: BadgeCheck,
    title: "Pay & Claim",
    desc: "Visit the office on your reserved slot, settle payment, and take your items home.",
  },
];

export default function ReservationSection() {
  return (
    <section className="flex w-full bg-[#111]">
      {/* Left: Copy — mirrors Hero left panel */}
      <div className="flex flex-1 flex-col justify-center px-5 lg:px-10 py-16">
        <p className="mb-3 text-[11px] font-semibold uppercase tracking-widest text-[#D2232A]">
          How It Works
        </p>
        <h2 className="mb-4 text-5xl font-bold leading-[1.1] tracking-tight text-white lg:text-6xl">
          Reserve Before You{" "}
          <em className="not-italic text-[#D2232A]">Pay & Claim.</em>
        </h2>
        <p className="mb-8 max-w-md text-base leading-relaxed text-white/60">
          All purchases at the Resource Generation Office require a reservation
          slot. Browse our catalog, lock in your schedule, and settle payment
          only when you arrive — no queuing, no hassle.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/reserve"
            className="inline-flex items-center gap-2 rounded-md bg-[#D2232A] px-7 py-3.5 text-sm font-semibold uppercase tracking-widest text-white transition-colors hover:bg-[#b01e23]"
          >
            Reserve Now
            <svg
              width="15"
              height="15"
              viewBox="0 0 15 15"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M3 7.5h9M8.5 4l4 3.5-4 3.5"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </div>
      </div>

      {/* Right: Steps — mirrors Hero right panel width */}
      <div className="hidden w-[46%] flex-shrink-0 flex-col justify-center gap-4 px-12 py-16 lg:flex">
        <div className="grid grid-cols-2 gap-4">
          {steps.map((step, i) => (
            <div
              key={step.title}
              className="flex flex-col gap-3 rounded-xl border border-white/10 bg-white/5 p-5 transition-colors hover:border-[#D2232A]/40 hover:bg-white/[0.07]"
            >
              <div className="flex items-center gap-3">
                <span className="flex size-9 items-center justify-center rounded-lg bg-[#D2232A]/10 text-[#D2232A]">
                  <step.icon className="size-4" />
                </span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-white/25">
                  Step {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <div>
                <p className="mb-1 text-sm font-semibold text-white">
                  {step.title}
                </p>
                <p className="text-xs leading-relaxed text-white/50">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
