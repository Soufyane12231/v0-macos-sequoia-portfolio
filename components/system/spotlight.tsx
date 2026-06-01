'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useDesktopStore, WindowId } from '@/lib/desktop-store'

interface SearchResult {
  id: WindowId
  title: string
  type: string
  icon: string
}

const searchIndex: SearchResult[] = [
  { id: 'about', title: 'About Me - whoami', type: 'Window', icon: '👤' },
  { id: 'projects', title: 'Projects - ~/projects', type: 'Window', icon: '📁' },
  { id: 'skills', title: 'Skills - skills.json', type: 'Window', icon: '⚡' },
  { id: 'experience', title: 'Experience - experience.log', type: 'Window', icon: '💼' },
  { id: 'certificates', title: 'Certificates', type: 'Window', icon: '🏆' },
  { id: 'contact', title: 'Contact - contact.sh', type: 'Window', icon: '📬' },
]

export function Spotlight() {
  const { spotlightOpen, setSpotlightOpen, openWindow } = useDesktopStore()
  const [query, setQuery] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  
  const results = query.length > 0 
    ? searchIndex.filter(item => 
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.type.toLowerCase().includes(query.toLowerCase())
      )
    : searchIndex.slice(0, 4)
  
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === ' ') {
        e.preventDefault()
        setSpotlightOpen(!spotlightOpen)
      }
      
      if (spotlightOpen) {
        if (e.key === 'Escape') {
          setSpotlightOpen(false)
          setQuery('')
        }
        if (e.key === 'ArrowDown') {
          e.preventDefault()
          setSelectedIndex(i => Math.min(i + 1, results.length - 1))
        }
        if (e.key === 'ArrowUp') {
          e.preventDefault()
          setSelectedIndex(i => Math.max(i - 1, 0))
        }
        if (e.key === 'Enter' && results[selectedIndex]) {
          openWindow(results[selectedIndex].id)
          setSpotlightOpen(false)
          setQuery('')
        }
      }
    }
    
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [spotlightOpen, setSpotlightOpen, results, selectedIndex, openWindow])
  
  useEffect(() => {
    if (spotlightOpen) {
      inputRef.current?.focus()
      setSelectedIndex(0)
    }
  }, [spotlightOpen])
  
  useEffect(() => {
    setSelectedIndex(0)
  }, [query])
  
  return (
    <AnimatePresence>
      {spotlightOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-[rgba(0,0,0,0.5)] z-[300]"
            onClick={() => {
              setSpotlightOpen(false)
              setQuery('')
            }}
          />
          
          {/* Spotlight panel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            className="fixed top-[20%] left-1/2 -translate-x-1/2 z-[301] w-[600px] max-w-[90vw]"
          >
            <div className="bg-[rgba(13,13,26,0.95)] backdrop-blur-2xl border border-[rgba(0,240,255,0.15)] rounded-2xl shadow-2xl overflow-hidden">
              {/* Search input */}
              <div className="flex items-center gap-3 px-4 py-3 border-b border-[rgba(0,240,255,0.08)]">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-[#8888aa]">
                  <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2" />
                  <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search SoufyaneOS..."
                  className="flex-1 bg-transparent text-[#e8e8f0] text-lg focus:outline-none placeholder-[#555]"
                />
                <kbd className="px-2 py-0.5 bg-[rgba(255,255,255,0.1)] rounded text-[#555] text-xs">
                  esc
                </kbd>
              </div>
              
              {/* Results */}
              <div className="max-h-[400px] overflow-auto py-2">
                {results.length > 0 ? (
                  results.map((result, index) => (
                    <button
                      key={result.id}
                      onClick={() => {
                        openWindow(result.id)
                        setSpotlightOpen(false)
                        setQuery('')
                      }}
                      className={`w-full px-4 py-3 flex items-center gap-3 transition-colors ${
                        index === selectedIndex 
                          ? 'bg-[rgba(0,240,255,0.1)]' 
                          : 'hover:bg-[rgba(255,255,255,0.05)]'
                      }`}
                    >
                      <div className="w-10 h-10 rounded-lg bg-[rgba(0,240,255,0.1)] flex items-center justify-center text-xl">
                        {result.icon}
                      </div>
                      <div className="flex-1 text-left">
                        <div className="text-[#e8e8f0] font-medium">{result.title}</div>
                        <div className="text-[#555] text-xs">{result.type}</div>
                      </div>
                      {index === selectedIndex && (
                        <kbd className="px-2 py-0.5 bg-[rgba(0,240,255,0.1)] rounded text-[#00f0ff] text-xs">
                          return
                        </kbd>
                      )}
                    </button>
                  ))
                ) : (
                  <div className="px-4 py-8 text-center text-[#555]">
                    No results found for &quot;{query}&quot;
                  </div>
                )}
              </div>
              
              {/* Footer */}
              <div className="px-4 py-2 border-t border-[rgba(0,240,255,0.08)] flex items-center justify-between text-xs text-[#555]">
                <span>Spotlight Search</span>
                <div className="flex items-center gap-2">
                  <kbd className="px-1.5 py-0.5 bg-[rgba(255,255,255,0.1)] rounded">↑</kbd>
                  <kbd className="px-1.5 py-0.5 bg-[rgba(255,255,255,0.1)] rounded">↓</kbd>
                  <span>to navigate</span>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
