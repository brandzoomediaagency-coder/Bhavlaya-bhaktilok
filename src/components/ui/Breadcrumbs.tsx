import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

export function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="Breadcrumb" className="no-print mb-6">
      <ol className="flex flex-wrap items-center gap-1.5 text-xs text-stone">
        <li>
          <Link href="/" className="flex items-center gap-1 hover:text-saffron transition-colors">
            <Home className="w-3.5 h-3.5" />
            <span>होम</span>
          </Link>
        </li>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={index} className="flex items-center gap-1.5">
              <ChevronRight className="w-3 h-3 text-gold/60" />
              {isLast || !item.href ? (
                <span className="font-medium text-maroon truncate max-w-[200px] sm:max-w-xs" aria-current="page">
                  {item.label}
                </span>
              ) : (
                <Link href={item.href} className="hover:text-saffron transition-colors">
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
