import { create } from 'zustand'

export type WindowId = 
  | 'about' 
  | 'projects' 
  | 'skills' 
  | 'experience' 
  | 'certificates' 
  | 'contact'
  | 'trash'
  | 'finder'
  | 'settings'
  | 'terminal'

export interface WindowState {
  id: WindowId
  title: string
  isOpen: boolean
  isMinimized: boolean
  isMaximized: boolean
  position: { x: number; y: number }
  size: { width: number; height: number }
  zIndex: number
}

/**
 * The public portfolio has no password gate: a recruiter never has to log in
 * to read the CV. The only remaining phase is the short, skippable boot
 * sequence that introduces the interactive desktop.
 */
export type BootPhase = 'bios' | 'desktop'
export type AccentColor = 'cyan' | 'purple' | 'green'

export interface NotificationData {
  id: string
  title: string
  message: string
}

interface DesktopState {
  bootPhase: BootPhase
  setBootPhase: (phase: BootPhase) => void
  
  windowsMap: Record<WindowId, WindowState>
  windows: WindowState[]
  activeWindowId: WindowId | null
  
  openWindow: (id: WindowId) => void
  closeWindow: (id: WindowId) => void
  minimizeWindow: (id: WindowId) => void
  maximizeWindow: (id: WindowId) => void
  focusWindow: (id: WindowId) => void
  updateWindowPosition: (id: WindowId, position: { x: number; y: number }) => void
  updateWindowSize: (id: WindowId, size: { width: number; height: number }) => void
  
  accentColor: AccentColor
  setAccentColor: (color: AccentColor) => void
  
  notifications: NotificationData[]
  addNotification: (notification: Omit<NotificationData, 'id'>) => void
  removeNotification: (id: string) => void
  
  showSpotlight: boolean
  setShowSpotlight: (open: boolean) => void
  
  contextMenu: { x: number; y: number } | null
  setContextMenu: (pos: { x: number; y: number } | null) => void
}

/**
 * Windows stack above the welcome terminal (z-20) and below the dock (z-100),
 * so a window can never be hidden by the intro terminal nor cover the chrome.
 */
const WINDOW_Z_BASE = 30

const defaultWindowsMap: Record<WindowId, WindowState> = {
  about: {
    id: 'about',
    title: 'whoami',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    // Clears the welcome terminal in the bottom-left corner, so both read as
    // separate surfaces on a wide screen.
    position: { x: 460, y: 80 },
    size: { width: 700, height: 500 },
    zIndex: 1,
  },
  projects: {
    id: 'projects',
    title: '~/projects',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    position: { x: 150, y: 100 },
    size: { width: 900, height: 600 },
    zIndex: 1,
  },
  skills: {
    id: 'skills',
    title: 'skills.json',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    position: { x: 200, y: 120 },
    size: { width: 750, height: 550 },
    zIndex: 1,
  },
  experience: {
    id: 'experience',
    title: 'experience.log',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    position: { x: 180, y: 90 },
    size: { width: 750, height: 500 },
    zIndex: 1,
  },
  certificates: {
    id: 'certificates',
    title: 'certificates/',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    position: { x: 220, y: 110 },
    size: { width: 650, height: 450 },
    zIndex: 1,
  },
  contact: {
    id: 'contact',
    title: 'contact.sh',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    position: { x: 250, y: 130 },
    size: { width: 650, height: 500 },
    zIndex: 1,
  },
  trash: {
    id: 'trash',
    title: 'Trash',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    position: { x: 300, y: 150 },
    size: { width: 400, height: 300 },
    zIndex: 1,
  },
  finder: {
    id: 'finder',
    title: 'Finder',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    position: { x: 120, y: 70 },
    size: { width: 800, height: 500 },
    zIndex: 1,
  },
  settings: {
    id: 'settings',
    title: 'System Preferences',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    position: { x: 140, y: 80 },
    size: { width: 700, height: 450 },
    zIndex: 1,
  },
  terminal: {
    id: 'terminal',
    title: 'Terminal',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    position: { x: 160, y: 90 },
    size: { width: 700, height: 450 },
    zIndex: 1,
  },
}

const getOpenWindows = (windowsMap: Record<WindowId, WindowState>): WindowState[] => {
  return Object.values(windowsMap).filter(w => w.isOpen && !w.isMinimized)
}

/** Height of the macOS-style menu bar, and the room the dock needs at the bottom. */
const MENUBAR_HEIGHT = 28
const WINDOW_GAP = 8

/**
 * The desktop is locked to the viewport, so a window that remembers a 900×600
 * size from a large screen must not hang off a smaller one when it reopens.
 * Clamp both the size and the position against the space actually available.
 */
const fitToViewport = (win: WindowState): WindowState => {
  if (typeof window === 'undefined') return win
  const maxWidth = Math.max(300, window.innerWidth - WINDOW_GAP * 2)
  const maxHeight = Math.max(220, window.innerHeight - MENUBAR_HEIGHT - 70)
  const width = Math.min(win.size.width, maxWidth)
  const height = Math.min(win.size.height, maxHeight)
  return {
    ...win,
    size: { width, height },
    position: {
      x: Math.max(WINDOW_GAP, Math.min(win.position.x, window.innerWidth - width - WINDOW_GAP)),
      y: Math.max(MENUBAR_HEIGHT, Math.min(win.position.y, window.innerHeight - height - WINDOW_GAP)),
    },
  }
}

/** After closing or minimising the focused window, hand focus to the next one up. */
const topmostWindowId = (windowsMap: Record<WindowId, WindowState>): WindowId | null => {
  const open = getOpenWindows(windowsMap)
  if (open.length === 0) return null
  return open.reduce((top, win) => (win.zIndex > top.zIndex ? win : top)).id
}

/**
 * Put one window on top of the others and renumber the whole stack from
 * WINDOW_Z_BASE. Numbering on every focus — instead of a counter that only
 * grows — keeps the stack inside the band reserved for windows however long
 * the desktop is used, and preserves the relative order of the rest.
 */
const restack = (
  windowsMap: Record<WindowId, WindowState>,
  id: WindowId,
  overrides: Partial<WindowState> = {},
): Record<WindowId, WindowState> => {
  const below = getOpenWindows(windowsMap)
    .filter((win) => win.id !== id)
    .sort((a, b) => a.zIndex - b.zIndex)

  const next: Record<WindowId, WindowState> = { ...windowsMap }
  below.forEach((win, index) => {
    next[win.id] = { ...win, zIndex: WINDOW_Z_BASE + index + 1 }
  })
  next[id] = {
    ...windowsMap[id],
    ...overrides,
    zIndex: WINDOW_Z_BASE + below.length + 1,
  }
  return next
}

export const useDesktopStore = create<DesktopState>((set, get) => ({
  bootPhase: 'bios',
  setBootPhase: (phase) => set({ bootPhase: phase }),
  
  windowsMap: defaultWindowsMap,
  windows: [],
  activeWindowId: null,
  
  openWindow: (id) => set((state) => {
    const current = state.windowsMap[id]
    // Re-fit on a fresh open; a window the visitor already arranged keeps its geometry.
    const base = current.isOpen ? current : fitToViewport(current)
    const newWindowsMap = restack(state.windowsMap, id, {
      ...base,
      isOpen: true,
      isMinimized: false,
    })
    return {
      windowsMap: newWindowsMap,
      windows: getOpenWindows(newWindowsMap),
      activeWindowId: id,
    }
  }),
  
  closeWindow: (id) => set((state) => {
    const newWindowsMap = {
      ...state.windowsMap,
      [id]: {
        ...state.windowsMap[id],
        isOpen: false,
        isMinimized: false,
        isMaximized: false,
      },
    }
    return {
      windowsMap: newWindowsMap,
      windows: getOpenWindows(newWindowsMap),
      activeWindowId: state.activeWindowId === id ? topmostWindowId(newWindowsMap) : state.activeWindowId,
    }
  }),
  
  minimizeWindow: (id) => set((state) => {
    const newWindowsMap = {
      ...state.windowsMap,
      [id]: {
        ...state.windowsMap[id],
        isMinimized: true,
      },
    }
    return {
      windowsMap: newWindowsMap,
      windows: getOpenWindows(newWindowsMap),
      activeWindowId: state.activeWindowId === id ? topmostWindowId(newWindowsMap) : state.activeWindowId,
    }
  }),
  
  maximizeWindow: (id) => set((state) => {
    const newWindowsMap = {
      ...state.windowsMap,
      [id]: {
        ...state.windowsMap[id],
        isMaximized: !state.windowsMap[id].isMaximized,
      },
    }
    return {
      windowsMap: newWindowsMap,
      windows: getOpenWindows(newWindowsMap),
    }
  }),
  
  focusWindow: (id) => set((state) => {
    const current = state.windowsMap[id]
    // Restoring from the dock: the viewport may have shrunk while it was hidden.
    const base = current.isMinimized ? fitToViewport({ ...current, isMinimized: false }) : current
    const newWindowsMap = restack(state.windowsMap, id, { ...base, isMinimized: false })
    return {
      windowsMap: newWindowsMap,
      windows: getOpenWindows(newWindowsMap),
      activeWindowId: id,
    }
  }),
  
  updateWindowPosition: (id, position) => set((state) => {
    const newWindowsMap = {
      ...state.windowsMap,
      [id]: {
        ...state.windowsMap[id],
        position,
      },
    }
    return {
      windowsMap: newWindowsMap,
      windows: getOpenWindows(newWindowsMap),
    }
  }),
  
  updateWindowSize: (id, size) => set((state) => {
    const newWindowsMap = {
      ...state.windowsMap,
      [id]: {
        ...state.windowsMap[id],
        size,
      },
    }
    return {
      windowsMap: newWindowsMap,
      windows: getOpenWindows(newWindowsMap),
    }
  }),
  
  accentColor: 'cyan',
  setAccentColor: (color) => set({ accentColor: color }),
  
  notifications: [],
  addNotification: (notification) => set((state) => ({
    notifications: [
      ...state.notifications,
      { ...notification, id: Math.random().toString(36).slice(2) }
    ],
  })),
  removeNotification: (id) => set((state) => ({
    notifications: state.notifications.filter(n => n.id !== id),
  })),
  
  showSpotlight: false,
  setShowSpotlight: (open) => set({ showSpotlight: open }),
  
  contextMenu: null,
  setContextMenu: (pos) => set({ contextMenu: pos }),
}))
