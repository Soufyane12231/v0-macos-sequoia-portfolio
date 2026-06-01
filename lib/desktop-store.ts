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

export type BootPhase = 'bios' | 'login' | 'desktop'
export type AccentColor = 'cyan' | 'purple' | 'green'

interface DesktopState {
  bootPhase: BootPhase
  setBootPhase: (phase: BootPhase) => void
  
  windows: Record<WindowId, WindowState>
  activeWindowId: WindowId | null
  highestZIndex: number
  
  openWindow: (id: WindowId) => void
  closeWindow: (id: WindowId) => void
  minimizeWindow: (id: WindowId) => void
  maximizeWindow: (id: WindowId) => void
  focusWindow: (id: WindowId) => void
  updateWindowPosition: (id: WindowId, position: { x: number; y: number }) => void
  updateWindowSize: (id: WindowId, size: { width: number; height: number }) => void
  
  accentColor: AccentColor
  setAccentColor: (color: AccentColor) => void
  
  showNotification: boolean
  notificationMessage: string
  setNotification: (message: string) => void
  clearNotification: () => void
  
  spotlightOpen: boolean
  setSpotlightOpen: (open: boolean) => void
  
  contextMenu: { x: number; y: number } | null
  setContextMenu: (pos: { x: number; y: number } | null) => void
}

const defaultWindows: Record<WindowId, WindowState> = {
  about: {
    id: 'about',
    title: 'whoami',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    position: { x: 100, y: 80 },
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
}

export const useDesktopStore = create<DesktopState>((set) => ({
  bootPhase: 'bios',
  setBootPhase: (phase) => set({ bootPhase: phase }),
  
  windows: defaultWindows,
  activeWindowId: null,
  highestZIndex: 1,
  
  openWindow: (id) => set((state) => {
    const newZIndex = state.highestZIndex + 1
    return {
      windows: {
        ...state.windows,
        [id]: {
          ...state.windows[id],
          isOpen: true,
          isMinimized: false,
          zIndex: newZIndex,
        },
      },
      activeWindowId: id,
      highestZIndex: newZIndex,
    }
  }),
  
  closeWindow: (id) => set((state) => ({
    windows: {
      ...state.windows,
      [id]: {
        ...state.windows[id],
        isOpen: false,
        isMinimized: false,
        isMaximized: false,
      },
    },
    activeWindowId: state.activeWindowId === id ? null : state.activeWindowId,
  })),
  
  minimizeWindow: (id) => set((state) => ({
    windows: {
      ...state.windows,
      [id]: {
        ...state.windows[id],
        isMinimized: true,
      },
    },
    activeWindowId: state.activeWindowId === id ? null : state.activeWindowId,
  })),
  
  maximizeWindow: (id) => set((state) => ({
    windows: {
      ...state.windows,
      [id]: {
        ...state.windows[id],
        isMaximized: !state.windows[id].isMaximized,
      },
    },
  })),
  
  focusWindow: (id) => set((state) => {
    if (state.windows[id].isMinimized) {
      const newZIndex = state.highestZIndex + 1
      return {
        windows: {
          ...state.windows,
          [id]: {
            ...state.windows[id],
            isMinimized: false,
            zIndex: newZIndex,
          },
        },
        activeWindowId: id,
        highestZIndex: newZIndex,
      }
    }
    
    const newZIndex = state.highestZIndex + 1
    return {
      windows: {
        ...state.windows,
        [id]: {
          ...state.windows[id],
          zIndex: newZIndex,
        },
      },
      activeWindowId: id,
      highestZIndex: newZIndex,
    }
  }),
  
  updateWindowPosition: (id, position) => set((state) => ({
    windows: {
      ...state.windows,
      [id]: {
        ...state.windows[id],
        position,
      },
    },
  })),
  
  updateWindowSize: (id, size) => set((state) => ({
    windows: {
      ...state.windows,
      [id]: {
        ...state.windows[id],
        size,
      },
    },
  })),
  
  accentColor: 'cyan',
  setAccentColor: (color) => set({ accentColor: color }),
  
  showNotification: false,
  notificationMessage: '',
  setNotification: (message) => set({ 
    showNotification: true, 
    notificationMessage: message 
  }),
  clearNotification: () => set({ 
    showNotification: false, 
    notificationMessage: '' 
  }),
  
  spotlightOpen: false,
  setSpotlightOpen: (open) => set({ spotlightOpen: open }),
  
  contextMenu: null,
  setContextMenu: (pos) => set({ contextMenu: pos }),
}))
