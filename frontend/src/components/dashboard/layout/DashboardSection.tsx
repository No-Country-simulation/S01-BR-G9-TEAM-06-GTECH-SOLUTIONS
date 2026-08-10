/**
 Esse componente une os dois anteriores.
 */

 import type { ReactNode } from "react";

import { SectionContainer } from "./SectionContainer";
import { SectionHeader } from "./SectionHeader";

type Props = {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
  children: ReactNode;
};

export function DashboardSection({
  title,
  subtitle,
  action,
  children,
}: Props) {
  return (
    <SectionContainer>

      <SectionHeader
        title={title}
        subtitle={subtitle}
        action={action}
      />

      {children}

    </SectionContainer>
  );
}
