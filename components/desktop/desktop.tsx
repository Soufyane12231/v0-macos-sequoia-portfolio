"use client";

import { useDesktopStore } from "@/lib/desktop-store";
import { BiosBoot } from "@/components/boot/bios-boot";
import { LoginScreen } from "@/components/boot/login-screen";
import { DesktopWallpaper } from "@/components/desktop/wallpaper";
import { MenuBar } from "@/components/desktop/menu-bar";
import { DesktopIcons } from "@/components/desktop/desktop-icons";
import { Dock } from "@/components/desktop/dock";
import { WindowFrame } from "@/components/windows/window-frame";
import { AboutWindow } from "@/components/windows/about-window";
import { ProjectsWindow } from "@/components/windows/projects-window";
import { SkillsWindow } from "@/components/windows/skills-window";
import { ExperienceWindow } from "@/components/windows/experience-window";
import { CertificatesWindow } from "@/components/windows/certificates-window";
import { ContactWindow } from "@/components/windows/contact-window";
import { FinderWindow, SettingsWindow, TerminalWindow, TrashWindow } from "@/components/windows/misc-windows";
import { Notification } from "@/components/system/notification";
import { DesktopContextMenu } from "@/components/system/context-menu";
import { Spotlight } from "@/components/system/spotlight";
import { MobileApp } from "@/components/mobile/mobile-app";
import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const windowComponents: Record<string, React.ComponentType> = {
  about: AboutWindow,
  projects: ProjectsWindow,
  skills: SkillsWindow,
  experience: ExperienceWindow,
  certificates: CertificatesWindow,
  contact: ContactWindow,
  finder: FinderWindow,
  settings: SettingsWindow,
  terminal: TerminalWindow,
  trash: TrashWindow,
};

export function Desktop() {
  const {
    bootPhase,
    setBootPhase,
    windows,
    notifications,
    removeNotification,
    showSpotlight,
    setShowSpotlight,
    addNotification,
  } = useDesktopStore();

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setShowSpotlight(!showSpotlight);
      }
      if (e.key === "Escape") {
        setShowSpotlight(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [showSpotlight, setShowSpotlight]);

  // Welcome notification after login
  useEffect(() => {
    if (bootPhase === "desktop") {
      const timer = setTimeout(() => {
        addNotification({
          title: "Welcome to SoufyaneOS",
          message: "Click icons to explore my portfolio!",
        });
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [bootPhase, addNotification]);

  if (isMobile) {
    return <MobileApp />;
  }

  if (bootPhase === "bios") {
    return <BiosBoot onComplete={() => setBootPhase("login")} />;
  }

  if (bootPhase === "login") {
    return <LoginScreen onLogin={() => setBootPhase("desktop")} />;
  }

  return (
    <DesktopContextMenu>
      <div className="relative h-screen w-screen overflow-hidden select-none">
        <DesktopWallpaper />
        <MenuBar />
        <DesktopIcons />

        <AnimatePresence>
          {windows.map((window) => {
            const WindowContent = windowComponents[window.id];
            return (
              <WindowFrame key={window.id} window={window}>
                {WindowContent && <WindowContent />}
              </WindowFrame>
            );
          })}
        </AnimatePresence>

        <Dock />

        <div className="fixed top-8 right-4 z-[9999] flex flex-col gap-2">
          <AnimatePresence>
            {notifications.map((notification) => (
              <Notification
                key={notification.id}
                notification={notification}
                onClose={() => removeNotification(notification.id)}
              />
            ))}
          </AnimatePresence>
        </div>

        <AnimatePresence>
          {showSpotlight && <Spotlight />}
        </AnimatePresence>
      </div>
    </DesktopContextMenu>
  );
}
