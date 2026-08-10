/**
 Este componente define o visual padr├úo de todas as se├º├Áes.
 */

import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export function SectionContainer({
  children,
}: Props) {
  return (
    <section
      className="
        rounded-3xl
        border
        border-slate-200
        bg-white
        p-8
        shadow-sm
        transition-all
        duration-300
        hover:shadow-lg
      "
    >
      {children}
    </section>
  );
}
