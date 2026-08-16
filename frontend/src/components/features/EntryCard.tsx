import Link from "next/link";
import Image from "next/image";

export interface EntryCardProps {
  href: string;
  title: string;
  subtitle: string;
  badge: string;
  accent: string;
  image?: string;
  imagePosition?: string;
  priority?: boolean;
  status?: "em-breve" | "em-construcao";
}

const STATUS_LABEL: Record<"em-breve" | "em-construcao", string> = {
  "em-breve": "Em breve",
  "em-construcao": "Em construção",
};

export function EntryCard({
  href,
  title,
  subtitle,
  badge,
  accent,
  image,
  imagePosition = "top",
  priority = false,
  status,
}: EntryCardProps) {
  return (
    <Link href={href}>
      <article className="group relative overflow-hidden rounded-2xl border border-white/5 cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl bg-stone-900 h-110">
        {image ? (
          <Image
            src={image}
            alt={title}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            style={{ objectPosition: imagePosition }}
            priority={priority}
          />
        ) : (
          <div
            className="absolute inset-0 flex items-center justify-center transition-transform duration-500 group-hover:scale-105"
            style={{ background: `linear-gradient(160deg, ${accent}30, #1c1917 75%)` }}
          >
            <span className="text-8xl font-bold opacity-15" style={{ color: accent }}>
              {title.charAt(0)}
            </span>
          </div>
        )}

        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/30 to-black/10" />

        {status && (
          <span className="absolute top-6 right-6 text-[10px] font-semibold tracking-widest uppercase px-2.5 py-1 rounded-full border border-stone-500/40 bg-black/50 text-stone-300 backdrop-blur-sm">
            {STATUS_LABEL[status]}
          </span>
        )}

        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: `radial-gradient(circle at 50% 110%, ${accent}25 0%, transparent 65%)`,
          }}
        />

        <div className="relative h-full flex flex-col justify-between p-6">
          <span
            className="self-start text-xs font-semibold tracking-widest uppercase px-3 py-1 rounded-full border backdrop-blur-sm"
            style={{
              color: accent,
              borderColor: `${accent}50`,
              backgroundColor: `${accent}15`,
            }}
          >
            {badge}
          </span>

          <div>
            <h2 className="text-2xl font-bold text-white leading-tight mb-3">
              {title}
            </h2>
            <p
              className="text-xs tracking-widest uppercase mb-1 opacity-70"
              style={{ color: accent }}
            >
              {subtitle}
            </p>
            <div
              className="flex items-center gap-2 text-xs font-medium opacity-0 group-hover:opacity-100 transition-all duration-200 translate-y-1 group-hover:translate-y-0"
              style={{ color: accent }}
            >
              <span>Explorar</span>
              <span>→</span>
            </div>
          </div>
        </div>

        <div
          className="absolute bottom-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ backgroundColor: accent }}
        />
      </article>
    </Link>
  );
}
