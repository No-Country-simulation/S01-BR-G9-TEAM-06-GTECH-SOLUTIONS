import {
  Bell,
  Moon,
  Sun,
  UserCircle,
  Settings,
  LogOut,
} from "lucide-react";

import { useTheme } from "@/context/theme/useTheme";
import { LanguageSelector } from "@/components/layout/LanguageSelector";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "@/context/auth/useAuth";
import { ROUTES } from "@/constants/routes";

import { useTranslation } from "@/i18n/useTranslation";

import { useNotifications } from "@/context/notifications/useNotifications";
import { useSettings } from "@/context/settings/useSettings";

export function Header() {
  const {
    isDark,
    toggleTheme,
  } = useTheme();

  const {
    user,
    logout,
  } = useAuth();

  const { t } = useTranslation();

  const {
    notifications,
    markAsRead,
    markAllAsRead,
  } = useNotifications();

  const {
    settings,
  } = useSettings();

  const [profileOpen, setProfileOpen] =
    useState(false);

  const [notificationsOpen, setNotificationsOpen] =
    useState(false);

  const navigate = useNavigate();

  /*
   * Filtra as notificações de acordo com
   * as preferências configuradas pelo usuário.
   */
  const visibleNotifications =
    notifications.filter((notification) => {
      if (
        notification.type === "analysis"
      ) {
        return settings.notifications.aiAlerts;
      }

      if (
        notification.type === "profile"
      ) {
        return settings.notifications
          .consumptionAlerts;
      }

      if (
        notification.type === "recommendation"
      ) {
        return settings.notifications
          .weeklyReports;
      }

      return true;
    });

  /*
   * Somente notificações visíveis e não lidas
   * entram no contador do sino.
   */
  const unreadCount =
    visibleNotifications.filter(
      (notification) =>
        !notification.read
    ).length;

  function handleNotificationClick(
    id: string
  ) {
    markAsRead(id);
  }

  function handleMarkAllAsRead() {
    markAllAsRead();
  }

  return (
    <header
      className="
        sticky
        top-0
        z-40
        flex
        h-20
        items-center
        justify-between
        border-b
        border-slate-200
        bg-white/95
        px-8
        backdrop-blur-md
        transition-colors
        duration-300

        dark:border-slate-700
        dark:bg-slate-900/95
      "
    >
      {/* Idioma */}

      <LanguageSelector />

      {/* Ações */}

      <div className="flex items-center gap-6">

        {/* ================================================== */}
        {/* NOTIFICAÇÕES */}
        {/* ================================================== */}

        <div className="relative">

          <button
            onClick={() => {
              setNotificationsOpen(
                (prev) => !prev
              );

              setProfileOpen(false);
            }}
            className="
              relative
              rounded-xl
              p-2
              transition-all
              duration-300
              hover:bg-slate-100

              dark:hover:bg-slate-800
            "
            aria-label={t(
              "notifications"
            )}
            aria-expanded={
              notificationsOpen
            }
          >
            <Bell
              className="
                text-slate-700

                dark:text-slate-300
              "
            />

            {/* Contador */}

            {unreadCount > 0 && (
              <span
                className="
                  absolute
                  -right-1
                  -top-1
                  flex
                  h-5
                  min-w-5
                  items-center
                  justify-center
                  rounded-full
                  bg-yellow-500
                  px-1
                  text-[10px]
                  font-bold
                  text-white
                "
              >
                {unreadCount}
              </span>
            )}
          </button>

          {/* Painel */}

          {notificationsOpen && (
            <div
              className="
                absolute
                right-0
                top-12
                z-50
                w-80
                overflow-hidden
                rounded-2xl
                border
                border-slate-200
                bg-white
                shadow-xl

                dark:border-slate-700
                dark:bg-slate-900
              "
            >

              {/* Cabeçalho */}

              <div
                className="
                  border-b
                  border-slate-200
                  px-5
                  py-4

                  dark:border-slate-700
                "
              >
                <div className="flex items-start justify-between gap-3">

                  <div>
                    <h3
                      className="
                        font-semibold
                        text-slate-900
                        dark:text-white
                      "
                    >
                      {t("notifications")}
                    </h3>

                    <p
                      className="
                        mt-1
                        text-sm
                        text-slate-500
                        dark:text-slate-400
                      "
                    >
                      {t(
                        "notificationsdescription"
                      )}
                    </p>
                  </div>

                </div>
              </div>

              {/* Lista */}

              <div className="max-h-80 overflow-y-auto">

                {visibleNotifications.length ===
                0 ? (
                  <div
                    className="
                      px-5
                      py-8
                      text-center
                    "
                  >
                    <Bell
                      className="
                        mx-auto
                        mb-3
                        text-slate-300

                        dark:text-slate-600
                      "
                      size={30}
                    />

                    <p
                      className="
                        text-sm
                        font-medium
                        text-slate-600

                        dark:text-slate-300
                      "
                    >
                      {t(
                        "noNotifications"
                      )}
                    </p>
                  </div>
                ) : (
                  visibleNotifications.map(
                    (notification) => (
                      <button
                        key={notification.id}
                        onClick={() =>
                          handleNotificationClick(
                            notification.id
                          )
                        }
                        className={`
                          w-full
                          border-b
                          border-slate-100
                          px-5
                          py-4
                          text-left
                          transition
                          hover:bg-slate-50

                          dark:border-slate-800
                          dark:hover:bg-slate-800

                          ${
                            notification.read
                              ? "opacity-60"
                              : "bg-yellow-50/40 dark:bg-yellow-500/5"
                          }
                        `}
                      >
                        <div className="flex items-start gap-3">

                          {/* Indicador */}

                          <span
                            className={`
                              mt-1.5
                              h-2
                              w-2
                              shrink-0
                              rounded-full

                              ${
                                notification.read
                                  ? "bg-slate-300 dark:bg-slate-600"
                                  : "bg-yellow-500"
                              }
                            `}
                          />

                          <div className="min-w-0">

                            <p
                              className="
                                font-semibold
                                text-slate-900
                                dark:text-white
                              "
                            >
                              {t(
                                notification.titleKey
                              )}
                            </p>

                            <p
                              className="
                                mt-1
                                text-sm
                                text-slate-500
                                dark:text-slate-400
                              "
                            >
                              {t(
                                notification.descriptionKey
                              )}
                            </p>

                          </div>

                        </div>
                      </button>
                    )
                  )
                )}

              </div>

              {/* Rodapé */}

              {visibleNotifications.length >
                0 && (
                <div
                  className="
                    flex
                    items-center
                    justify-between
                    border-t
                    border-slate-200
                    px-5
                    py-3

                    dark:border-slate-700
                  "
                >

                  <button
                    onClick={
                      handleMarkAllAsRead
                    }
                    disabled={
                      unreadCount === 0
                    }
                    className="
                      text-sm
                      font-semibold
                      text-yellow-600
                      transition
                      hover:text-yellow-700
                      disabled:cursor-not-allowed
                      disabled:opacity-40

                      dark:text-yellow-400
                      dark:hover:text-yellow-300
                    "
                  >
                    {t(
                      "markAllAsRead"
                    )}
                  </button>

                  <span
                    className="
                      text-xs
                      text-slate-400
                      dark:text-slate-500
                    "
                  >
                    {unreadCount}
                  </span>

                </div>
              )}

            </div>
          )}

        </div>

        {/* ================================================== */}
        {/* TEMA */}
        {/* ================================================== */}

        <button
          onClick={toggleTheme}
          className="
            rounded-xl
            p-2
            transition-all
            duration-300

            hover:bg-slate-100

            dark:hover:bg-slate-800
          "
          aria-label={
            isDark
              ? t("lightTheme")
              : t("darkTheme")
          }
        >
          {isDark ? (
            <Sun
              className="
                text-yellow-400
                transition-transform
                duration-300
                hover:rotate-180
              "
            />
          ) : (
            <Moon
              className="
                text-slate-700
                transition-transform
                duration-300
                hover:-rotate-12
              "
            />
          )}
        </button>

        {/* ================================================== */}
        {/* PERFIL */}
        {/* ================================================== */}

        <div className="relative">

          <button
            onClick={() => {
              setProfileOpen(
                (prev) => !prev
              );

              setNotificationsOpen(
                false
              );
            }}
            className="
              rounded-full
              transition-all
              duration-300
              hover:scale-105
            "
            aria-label={t(
              "openProfile"
            )}
          >
            <UserCircle
              size={34}
              className="
                text-slate-700

                dark:text-slate-300
              "
            />
          </button>

          {profileOpen && (
            <div
              className="
                absolute
                right-0
                top-12
                z-50
                w-64
                overflow-hidden
                rounded-2xl
                border
                border-slate-200
                bg-white
                shadow-xl

                dark:border-slate-700
                dark:bg-slate-900
              "
            >

              {/* Usuário */}

              <div
                className="
                  border-b
                  border-slate-200
                  px-5
                  py-4

                  dark:border-slate-700
                "
              >
                <p
                  className="
                    font-semibold
                    text-slate-900
                    dark:text-white
                  "
                >
                  {user?.nome ??
                    t("user")}
                </p>

                <p
                  className="
                    mt-1
                    truncate
                    text-sm
                    text-slate-500
                    dark:text-slate-400
                  "
                >
                  {user?.email ?? ""}
                </p>
              </div>

              {/* Configurações */}

              <button
                onClick={() => {
                  navigate(
                    ROUTES.SETTINGS
                  );

                  setProfileOpen(
                    false
                  );
                }}
                className="
                  flex
                  w-full
                  items-center
                  gap-3
                  px-5
                  py-3
                  text-left
                  text-slate-700
                  transition
                  hover:bg-slate-100

                  dark:text-slate-200
                  dark:hover:bg-slate-800
                "
              >
                <Settings
                  size={18}
                />

                <span>
                  {t("settings")}
                </span>
              </button>

              {/* Sair */}

              <button
                onClick={() => {
                  logout();

                  setProfileOpen(
                    false
                  );
                }}
                className="
                  flex
                  w-full
                  items-center
                  gap-3
                  px-5
                  py-3
                  text-left
                  text-red-600
                  transition
                  hover:bg-red-50

                  dark:text-red-400
                  dark:hover:bg-red-500/10
                "
              >
                <LogOut
                  size={18}
                />

                <span>
                  {t("logout")}
                </span>
              </button>

            </div>
          )}

        </div>

      </div>
    </header>
  );
}