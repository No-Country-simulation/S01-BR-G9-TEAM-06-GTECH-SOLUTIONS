export function SectionTitle({
  badge,
  title,
  subtitle,
}: {
  badge: string;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="text-center">
      <span
        className="
          inline-flex
          rounded-full
          bg-yellow-100
          px-4
          py-2
          text-sm
          font-semibold
          text-yellow-700
          transition-colors
          duration-300

          dark:bg-yellow-500/10
          dark:text-yellow-400
        "
      >
        {badge}
      </span>

      <h2
        className="
          mt-5
          text-3xl
          font-bold
          text-slate-900
          transition-colors
          duration-300

          dark:text-white

          md:text-4xl
        "
      >
        {title}
      </h2>

      <p
        className="
          mx-auto
          mt-4
          max-w-2xl
          text-lg
          leading-8
          text-slate-600
          transition-colors
          duration-300

          dark:text-slate-300
        "
      >
        {subtitle}
      </p>
    </div>
  );
}