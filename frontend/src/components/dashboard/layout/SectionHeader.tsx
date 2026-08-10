/**
 Este componente ser├í respons├ível por padronizar todos os t├¡tulos do Dashboard.
 */

type SectionHeaderProps = {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
};

export function SectionHeader({
  title,
  subtitle,
  action,
}: SectionHeaderProps) {
  return (
    <div className="mb-6 flex items-center justify-between">

      <div>

        <h2 className="text-2xl font-bold text-slate-900">
          {title}
        </h2>

        {subtitle && (
          <p className="mt-2 text-sm text-slate-500">
            {subtitle}
          </p>
        )}

      </div>

      {action}

    </div>
  );
}
