type SectionTitleProps = {
  badge?: string;
  title: string;
  subtitle?: string;
};

export function SectionTitle({
  badge,
  title,
  subtitle,
}: SectionTitleProps) {
  return (
    <div className="text-center">
      {badge && (
        <span className="rounded-full bg-yellow-100 px-4 py-2 text-sm font-semibold text-yellow-700">
          {badge}
        </span>
      )}

      <h2 className="mt-6 text-4xl font-bold text-slate-900">
        {title}
      </h2>

      {subtitle && (
        <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-600">
          {subtitle}
        </p>
      )}
    </div>
  );
}