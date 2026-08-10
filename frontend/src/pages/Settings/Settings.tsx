import { SettingsSection } from "../../components/settings/SettingsSection";

import { AccountSettings } from "../../components/settings/AccountSettings";
import { AppearanceSettings } from "../../components/settings/AppearanceSettings";
import { NotificationSettings } from "../../components/settings/NotificationSettings";
import { AccessibilitySettings } from "../../components/settings/AccessibilitySettings";

import { AISettingsCard } from "../../components/settings/AISettingsCard";
import { PreferencesCard } from "../../components/settings/PreferencesCard";
import { SecurityCard } from "../../components/settings/SecurityCard";
import { SystemInfoCard } from "../../components/settings/SystemInfoCard";

import { useTranslation } from "@/i18n/useTranslation";

export function Settings() {
  const { t } = useTranslation();

  return (
    <div className="space-y-8">

      {/* Cabeçalho */}

      <div>
        <h1
          className="
            text-4xl
            font-bold
            text-slate-900

            dark:text-white
          "
        >
          {t("settings")}
        </h1>

        <p
          className="
            mt-3
            text-slate-500

            dark:text-slate-400
          "
        >
          {t("SettingsDescription")}
        </p>
      </div>

      {/* Conta */}

      <SettingsSection
        title={t("Account")}
        description={t("AccountDescription")}
      >
        <AccountSettings />
      </SettingsSection>

      {/* Aparência */}

      <SettingsSection
        title={t("Appearance")}
        description={t("appearanceDescriptioN")}
      >
        <AppearanceSettings />
      </SettingsSection>

      {/* Notificações */}

      <SettingsSection
        title={t("notificationS")}
        description={t("NotificationsDescription")}
      >
        <NotificationSettings />
      </SettingsSection>

      {/* Acessibilidade */}

      <SettingsSection
        title={t("Accessibility")}
        description={t("AccessibilityDescription")}
      >
        <AccessibilitySettings />
      </SettingsSection>

      {/* Inteligência Artificial */}

      <SettingsSection
        title={t("artificialIntelligence")}
        description={t("aiSettingsDescription")}
      >
        <AISettingsCard />
      </SettingsSection>

      {/* Preferências */}

      <SettingsSection
        title={t("Preferences")}
        description={t("preferencesDescription")}
      >
        <PreferencesCard />
      </SettingsSection>

      {/* Segurança */}

      <SettingsSection
        title={t("securitY")}
        description={t("securityDescription")}
      >
        <SecurityCard />
      </SettingsSection>

      {/* Informações do Sistema */}

      <SettingsSection
        title={t("SystemInformation")}
        description={t("systemInformationDescription")}
      >
        <SystemInfoCard />
      </SettingsSection>

    </div>
  );
}