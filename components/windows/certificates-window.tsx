'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Certificate {
  id: string
  title: string
  issuer: string
  date: string
  color: string
  icon: string
}

const certificates: Certificate[] = [
  {
    id: 'ge',
    title: 'Electrical Engineering Job Simulation',
    issuer: 'GE Aerospace',
    date: '2026',
    color: '#1a9bff',
    icon: '🟦',
  },
  {
    id: 'datacamp',
    title: 'Working with the OpenAI API',
    issuer: 'DataCamp',
    date: '2025',
    color: '#ff9500',
    icon: '🟠',
  },
  {
    id: 'abb',
    title: 'Industrial Robotics ABB',
    issuer: 'Udemy',
    date: '2025',
    color: '#ff4444',
    icon: '🔴',
  },
  {
    id: 'excel',
    title: 'Excel Macros & VBA',
    issuer: 'Udemy',
    date: '2025',
    color: '#00ff88',
    icon: '🟢',
  },
]

export function CertificatesWindow() {
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null)
  
  return (
    <div className="h-full flex flex-col">
      {/* Toolbar */}
      <div className="px-4 py-2 border-b border-[rgba(0,240,255,0.08)] bg-[rgba(0,0,0,0.2)] flex items-center gap-4">
        <div className="flex items-center gap-2">
          <button className="p-1.5 hover:bg-[rgba(255,255,255,0.1)] rounded">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-[#8888aa]">
              <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button className="p-1.5 hover:bg-[rgba(255,255,255,0.1)] rounded">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-[#8888aa]">
              <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
        <div className="flex-1 text-center text-[#8888aa] text-sm">
          certificates/
        </div>
        <div className="flex items-center gap-1">
          <button className="p-1.5 hover:bg-[rgba(255,255,255,0.1)] rounded text-[#8888aa]">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <rect x="3" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2" />
              <rect x="14" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2" />
              <rect x="3" y="14" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2" />
              <rect x="14" y="14" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2" />
            </svg>
          </button>
          <button className="p-1.5 hover:bg-[rgba(255,255,255,0.1)] rounded text-[#555]">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </div>
      
      {/* Grid content */}
      <div className="flex-1 p-6 overflow-auto">
        <div className="grid grid-cols-4 gap-6">
          {certificates.map((cert, index) => (
            <motion.button
              key={cert.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="flex flex-col items-center gap-2 p-4 rounded-lg hover:bg-[rgba(255,255,255,0.05)] transition-colors group"
              onClick={() => setSelectedCert(cert)}
            >
              {/* Folder icon */}
              <div 
                className="w-16 h-14 rounded-lg flex items-center justify-center relative"
                style={{ backgroundColor: `${cert.color}20` }}
              >
                <svg width="40" height="36" viewBox="0 0 40 36" fill="none">
                  <path 
                    d="M4 8C4 5.79 5.79 4 8 4h8l4 4h16c2.21 0 4 1.79 4 4v20c0 2.21-1.79 4-4 4H8c-2.21 0-4-1.79-4-4V8z" 
                    fill={cert.color}
                    fillOpacity="0.3"
                  />
                  <path 
                    d="M4 8C4 5.79 5.79 4 8 4h8l4 4h16c2.21 0 4 1.79 4 4v20c0 2.21-1.79 4-4 4H8c-2.21 0-4-1.79-4-4V8z" 
                    stroke={cert.color}
                    strokeWidth="1.5"
                  />
                </svg>
                {/* Badge */}
                <div 
                  className="absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-[10px]"
                  style={{ backgroundColor: cert.color }}
                >
                  ✓
                </div>
              </div>
              
              {/* Label */}
              <div className="text-center">
                <div className="text-[#e8e8f0] text-xs font-medium line-clamp-2 group-hover:text-[#00f0ff] transition-colors">
                  {cert.title}
                </div>
                <div className="text-[#555] text-[10px] mt-0.5">
                  {cert.issuer}
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
      
      {/* Status bar */}
      <div className="px-4 py-2 border-t border-[rgba(0,240,255,0.08)] bg-[rgba(0,0,0,0.2)] flex items-center justify-between text-xs text-[#555]">
        <span>{certificates.length} items</span>
        <span className="flex items-center gap-1">
          <span className="text-[#00ff88]">✓</span>
          All verified
        </span>
      </div>
      
      {/* Certificate detail modal */}
      <AnimatePresence>
        {selectedCert && (
          <motion.div
            className="absolute inset-0 bg-[rgba(0,0,0,0.8)] flex items-center justify-center p-8 z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedCert(null)}
          >
            <motion.div
              className="bg-[rgba(13,13,26,0.95)] border border-[rgba(0,240,255,0.2)] rounded-xl p-6 max-w-sm w-full text-center"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Certificate icon */}
              <div 
                className="w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center"
                style={{ backgroundColor: `${selectedCert.color}20`, border: `2px solid ${selectedCert.color}` }}
              >
                <svg width="40" height="40" viewBox="0 0 48 48" fill="none">
                  <path d="M24 4l4 12h12l-10 8 4 12-10-8-10 8 4-12-10-8h12z" fill={selectedCert.color} fillOpacity="0.5" stroke={selectedCert.color} strokeWidth="2" />
                </svg>
              </div>
              
              <h3 className="text-[#e8e8f0] font-semibold text-lg mb-1">
                {selectedCert.title}
              </h3>
              <p className="text-[#8888aa] text-sm mb-1">{selectedCert.issuer}</p>
              <p className="text-[#555] text-xs mb-4">{selectedCert.date}</p>
              
              <div className="flex items-center justify-center gap-2 text-[#00ff88] text-sm mb-4">
                <span>✓</span>
                <span>Verified Certificate</span>
              </div>
              
              <button
                onClick={() => setSelectedCert(null)}
                className="w-full py-2 bg-[rgba(0,240,255,0.1)] border border-[rgba(0,240,255,0.2)] rounded-lg text-[#00f0ff] hover:bg-[rgba(0,240,255,0.2)] transition-colors"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
