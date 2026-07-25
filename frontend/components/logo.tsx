import Image from "next/image";
import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center", className)}>
      <Image
        src="/logo.png"
        alt="RGO BSU Logo"
        width={200}
        height={200}
        priority
        className="h-12 w-auto object-contain"
      />
      <p className="px-2 text-md font-semibold uppercase tracking-widest text-foreground transition-colors ">
        SparStock
      </p>
    </span>
  );
}
