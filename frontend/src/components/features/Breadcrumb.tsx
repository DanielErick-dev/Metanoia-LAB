import Link from "next/link";

interface Crumb {
  label: string;
  href: string;
}

interface BreadcrumbProps {
  items: Crumb[];
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav className="flex items-center gap-2 text-xs text-stone-500 flex-wrap">
      <Link href="/" className="hover:text-stone-300 transition-colors">
        Início
      </Link>
      {items.map((item, i) => (
        <span key={item.href} className="flex items-center gap-2">
          <span className="text-stone-700">/</span>
          {i === items.length - 1 ? (
            <span className="text-stone-300">{item.label}</span>
          ) : (
            <Link href={item.href} className="hover:text-stone-300 transition-colors">
              {item.label}
            </Link>
          )}
        </span>
      ))}
    </nav>
  );
}
