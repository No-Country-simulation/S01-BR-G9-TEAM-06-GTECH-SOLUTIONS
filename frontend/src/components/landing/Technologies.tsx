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
];

export function Technologies() {
  return (
    <section
      id="tecnologias"
      className="bg-slate-900 py-24 text-white"
    >
      <div className="mx-auto max-w-7xl px-8">

        <h2 className="text-center text-4xl font-bold">
          Tecnologias utilizadas
        </h2>

        <div className="mt-14 flex flex-wrap justify-center gap-4">
          {technologies.map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-slate-700 px-5 py-3 text-sm transition hover:border-yellow-400 hover:text-yellow-400"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}