"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Calendar, CircleDot, Sparkles, Search } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { label: "होम", href: "/", icon: Home },
  { label: "पंचांग", href: "/panchang", icon: Calendar },
  { label: "जप माला", href: "/tools/108-jap-mala-counter", icon: CircleDot },
  { label: "स्टेटस", href: "/status-maker", icon: Sparkles },
  { label: "खोजें", href: "/search", icon: Search },
];

export function MobileBottomNav() {
  const pathname = usePathname();

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-cream/95 backdrop-blur-md border-t border-gold/25 py-1.5 px-2 shadow-lg no-print">
      <div className="flex justify-around items-center max-w-md mx-auto">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center py-1 px-2 rounded-xl text-[10px] font-semibold transition-all",
                isActive
                  ? "text-saffron bg-saffron/10 font-bold scale-105"
                  : "text-stone hover:text-maroon"
              )}
            >
              <Icon className="w-5 h-5 mb-0.5" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
