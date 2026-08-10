import { useTranslation } from "@/i18n/useTranslation";

const technologies = [
  "React",
  "TypeScript",
  "Java",
  "FastAPI",
  "Scikit-Learn",
  "Python",
  "Tailwind CSS",
  "Docker",
  "Git",
  "Spring Boot",
  "MySQL",
];

export function Technologies() {
  const { t } = useTranslation();

  return (
    <section
      id="tecnologias"
      className="
        bg-white
        px-6
        py-24
        transition-colors
        duration-300

        dark:bg-slate-950
      "
    >
      <div className="mx-auto max-w-7xl">
        {/* Título */}
        <h2
          className="
            text-center
            text-3xl
            font-bold
            text-slate-900
            transition-colors
            duration-300

            dark:text-white

            md:text-4xl
          "
        >
          {t("technologiesTitle")}
        </h2>

        {/* Tecnologias */}
        <div className="mt-14 flex flex-wrap justify-center gap-4">
          {technologies.map((tech) => (
            <span
              key={tech}
              className="
                rounded-full
                border
                border-slate-300
                bg-slate-50
                px-5
                py-3
                text-sm
                font-medium
                text-slate-700
                transition-all
                duration-300

                hover:-translate-y-0.5
                hover:border-yellow-400
                hover:text-yellow-500

                dark:border-slate-700
                dark:bg-slate-900
                dark:text-slate-300
                dark:hover:border-yellow-400
                dark:hover:bg-slate-800
                dark:hover:text-yellow-400
              "
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}