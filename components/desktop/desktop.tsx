"use client";

import { useEffect, useState, type ComponentType } from "react";
import { AnimatePresence, MotionConfig } from "framer-motion";
import { useDesktopStore } from "@/lib/desktop-store";
import { BiosBoot } from "@/components/boot/bios-boot";
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
import { WelcomeTerminal } from "@/components/desktop/WelcomeTerminal";

const windowComponents: Record<string, ComponentType> = {
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

const BOOT_SEEN_KEY = "soufyaneos:boot-seen";

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
    openWindow,
    closeWindow,
    activeWindowId,
  } = useDesktopStore();

  // Initialised from the viewport so a phone never paints the desktop shell
  // for a frame before the resize listener swaps in the mobile app.
  const [isMobile, setIsMobile] = useState(() =>
    typeof window === "undefined" ? false : window.innerWidth < 768,
  );

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // The boot sequence is a treat, not a toll booth: it only plays once per
  // browser session and can always be skipped.
  useEffect(() => {
    try {
      if (window.sessionStorage.getItem(BOOT_SEEN_KEY) === "1") {
        setBootPhase("desktop");
      }
    } catch {
      /* sessionStorage unavailable — play the boot sequence */
    }
  }, [setBootPhase]);

  useEffect(() => {
    if (bootPhase !== "desktop" || isMobile) return;
    // Never greet a visitor with an empty desktop.
    if (!useDesktopStore.getState().windowsMap.about.isOpen) {
      openWindow("about");
    }
  }, [bootPhase, isMobile, openWindow]);

  // Keyboard shortcuts belong to the desktop: not to the BIOS boot screen and
  // not to the mobile app, where Ctrl/⌘+K would hijack the browser.
  useEffect(() => {
    if (bootPhase !== "desktop" || isMobile) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setShowSpotlight(!showSpotlight);
      }
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "w" && activeWindowId) {
        e.preventDefault();
        closeWindow(activeWindowId);
      }
      if (e.key === "Escape") {
        setShowSpotlight(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [showSpotlight, setShowSpotlight, bootPhase, isMobile, activeWindowId, closeWindow]);

  useEffect(() => {
    if (bootPhase !== "desktop" || isMobile) return;
    const timer = window.setTimeout(() => {
      addNotification({
        title: "Welcome to SoufyaneOS",
        message:
          "Click a dock icon to open a window, or press Ctrl/⌘ + K to search. The full CV is on the home page.",
      });
    }, 1200);
    return () => window.clearTimeout(timer);
  }, [bootPhase, isMobile, addNotification]);

  if (isMobile) {
    return <MobileApp />;
  }

  if (bootPhase === "bios") {
    return (
      <BiosBoot
        onComplete={() => {
          try {
            window.sessionStorage.setItem(BOOT_SEEN_KEY, "1");
          } catch {
            /* ignore */
          }
          setBootPhase("desktop");
        }}
      />
    );
  }

  return (
    <MotionConfig reducedMotion="user">
      <DesktopContextMenu>
        <main aria-label="SoufyaneOS interactive desktop">
          <div className="relative h-screen w-screen overflow-hidden select-none">
            <DesktopWallpaper />
            <MenuBar />
            <DesktopIcons />

            <AnimatePresence>
              {windows.map((win) => {
                const WindowContent = windowComponents[win.id];
                return (
                  <WindowFrame key={win.id} window={win}>
                    {WindowContent && <WindowContent />}
                  </WindowFrame>
                );
              })}
            </AnimatePresence>

            <Dock />

            {/* Welcome terminal — floating bottom-left */}
            <WelcomeTerminal />

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

            <AnimatePresence>{showSpotlight && <Spotlight />}</AnimatePresence>
          </div>
        </main>
      </DesktopContextMenu>
    </MotionConfig>
  );
}
