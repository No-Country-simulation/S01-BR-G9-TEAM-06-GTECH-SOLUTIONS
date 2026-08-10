import { AIAssistant } from "../ai/AIAssistant";

export function RecommendationPanel() {
  return (
    <section
      className="
        rounded-3xl
        border
        border-slate-200
        bg-linear-to-br
        from-yellow-50
        via-white
        to-white
        p-8
        shadow-sm
        transition-colors

        dark:from-slate-900
        dark:via-slate-900
        dark:to-slate-900
        dark:border-slate-700
      "
    >
      <AIAssistant />
    </section>
  );
}
