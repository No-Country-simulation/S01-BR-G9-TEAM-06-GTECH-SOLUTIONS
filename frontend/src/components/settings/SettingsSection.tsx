type SettingsSectionProps = {
  title: string;
  description?: string;
  children: React.ReactNode;
};

export function SettingsSection({
  title,
  description,
  children,
}: SettingsSectionProps) {
  return (
    <section
      className="
        rounded-3xl
        border
        border-slate-200
        bg-white
        p-8
        shadow-sm
        transition-colors
        duration-300

        dark:border-slate-700
        dark:bg-slate-900
      "
    >
      <div className="mb-6">

        <h2
          className="
            text-2xl
            font-bold
            text-slate-900

            dark:text-white
          "
        >
          {title}
        </h2>

        {description && (
          <p
            className="
              mt-2
              text-slate-500

              dark:text-slate-400
            "
          >
            {description}
          </p>
        )}

      </div>

      {children}

    </section>
  );
}
