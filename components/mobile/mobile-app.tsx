'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

type MobileTab = 'home' | 'projects' | 'skills' | 'experience' | 'contact'

export function MobileApp() {
  const [activeTab, setActiveTab] = useState<MobileTab>('home')
  const [activePanel, setActivePanel] = useState<string | null>(null)
  
  const apps = [
    { id: 'about', label: 'About Me', icon: '👤' },
    { id: 'projects', label: 'Projects', icon: '📁' },
    { id: 'skills', label: 'Skills', icon: '⚡' },
    { id: 'experience', label: 'Experience', icon: '💼' },
    { id: 'certificates', label: 'Certificates', icon: '🏆' },
    { id: 'contact', label: 'Contact', icon: '📬' },
    { id: 'linkedin', label: 'LinkedIn', icon: '💼', external: 'https://linkedin.com/in/soufyane-elaouni' },
    { id: 'github', label: 'GitHub', icon: '🐙', external: 'https://github.com/soufyane-elaouni' },
  ]
  
  return (
    <div className="min-h-screen bg-[#07070f] flex flex-col">
      {/* Status bar */}
      <div className="h-12 flex items-center justify-between px-4 bg-[rgba(0,0,0,0.3)]">
        <span className="text-[#e8e8f0] text-sm font-semibold">SoufyaneOS</span>
        <div className="flex items-center gap-2 text-[#8888aa] text-xs">
          <span>87%</span>
          <svg width="20" height="12" viewBox="0 0 24 14" fill="none">
            <rect x="1" y="2" width="18" height="10" rx="2" stroke="currentColor" strokeWidth="1.5" />
            <rect x="3" y="4" width="12" height="6" rx="1" fill="#00ff88" />
            <path d="M21 5v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </div>
      </div>
      
      {/* Banner */}
      <div className="px-4 py-2 bg-[rgba(0,240,255,0.1)] border-b border-[rgba(0,240,255,0.1)]">
        <p className="text-[#00f0ff] text-xs text-center">
          Full desktop experience on larger screens
        </p>
      </div>
      
      {/* Main content */}
      <div className="flex-1 overflow-auto p-4">
        <AnimatePresence mode="wait">
          {activeTab === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              {/* Profile header */}
              <div className="flex flex-col items-center mb-8 pt-4">
                <motion.div
                  className="w-24 h-24 rounded-full bg-gradient-to-br from-[#0d0d1a] to-[#1a1a2e] flex items-center justify-center border-2 border-[#00f0ff] mb-4"
                  animate={{ 
                    boxShadow: [
                      '0 0 20px rgba(0, 240, 255, 0.3)',
                      '0 0 40px rgba(0, 240, 255, 0.5)',
                      '0 0 20px rgba(0, 240, 255, 0.3)',
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <span className="text-3xl font-bold text-[#00f0ff]">SE</span>
                </motion.div>
                <h1 className="text-[#e8e8f0] text-xl font-semibold">Soufyane Elaouni</h1>
                <p className="text-[#8888aa] text-sm">Ingénieur Mécatronique</p>
                <p className="text-[#555] text-xs">ENSA Tétouan</p>
              </div>
              
              {/* App grid */}
              <div className="grid grid-cols-4 gap-4">
                {apps.map((app, index) => (
                  <motion.button
                    key={app.id}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => {
                      if (app.external) {
                        window.open(app.external, '_blank')
                      } else {
                        setActivePanel(app.id)
                      }
                    }}
                    className="flex flex-col items-center gap-1"
                  >
                    <div className="w-14 h-14 rounded-2xl bg-[rgba(0,240,255,0.1)] border border-[rgba(0,240,255,0.15)] flex items-center justify-center text-2xl">
                      {app.icon}
                    </div>
                    <span className="text-[#e8e8f0] text-[10px]">{app.label}</span>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
          
          {activeTab === 'projects' && <MobileProjects />}
          {activeTab === 'skills' && <MobileSkills />}
          {activeTab === 'experience' && <MobileExperience />}
          {activeTab === 'contact' && <MobileContact />}
        </AnimatePresence>
      </div>
      
      {/* Panel overlay */}
      <AnimatePresence>
        {activePanel && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-[rgba(0,0,0,0.8)] z-50"
            onClick={() => setActivePanel(null)}
          >
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 30 }}
              className="absolute bottom-0 left-0 right-0 top-20 bg-[#0d0d1a] rounded-t-3xl overflow-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Handle */}
              <div className="flex justify-center py-3">
                <div className="w-10 h-1 bg-[#333] rounded-full" />
              </div>
              
              {/* Close button */}
              <button
                onClick={() => setActivePanel(null)}
                className="absolute top-4 right-4 p-2 text-[#8888aa]"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </button>
              
              {/* Panel content */}
              <div className="p-4">
                {activePanel === 'about' && <MobilePanelAbout />}
                {activePanel === 'projects' && <MobileProjects />}
                {activePanel === 'skills' && <MobileSkills />}
                {activePanel === 'experience' && <MobileExperience />}
                {activePanel === 'certificates' && <MobileCertificates />}
                {activePanel === 'contact' && <MobileContact />}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Tab bar */}
      <div className="h-20 bg-[rgba(13,13,26,0.95)] backdrop-blur-xl border-t border-[rgba(0,240,255,0.08)] flex items-center justify-around px-4 pb-4">
        {[
          { id: 'home', label: 'Home', icon: '🏠' },
          { id: 'projects', label: 'Projects', icon: '📁' },
          { id: 'skills', label: 'Skills', icon: '⚡' },
          { id: 'experience', label: 'Exp', icon: '💼' },
          { id: 'contact', label: 'Contact', icon: '📬' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as MobileTab)}
            className={`flex flex-col items-center gap-1 py-2 px-3 rounded-lg transition-colors ${
              activeTab === tab.id 
                ? 'text-[#00f0ff]' 
                : 'text-[#555]'
            }`}
          >
            <span className="text-xl">{tab.icon}</span>
            <span className="text-[10px]">{tab.label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

function MobilePanelAbout() {
  return (
    <div className="space-y-4">
      <h2 className="text-[#00f0ff] text-lg font-semibold">About Me</h2>
      <p className="text-[#e8e8f0] leading-relaxed text-sm">
        4th-year engineering student at ENSA Tétouan with a passion for 
        building intelligent embedded systems. I bridge the gap between 
        hardware and software — from bare-metal C++ on STM32 to Extended 
        Kalman Filters in Python.
      </p>
      
      <div className="flex flex-wrap gap-2">
        {['Tétouan, Maroc', 'ENSA Tétouan', '4ème Année'].map((tag) => (
          <span key={tag} className="px-3 py-1 bg-[rgba(0,240,255,0.1)] rounded-full text-xs text-[#00f0ff]">
            {tag}
          </span>
        ))}
      </div>
      
      <div className="pt-4 space-y-3">
        <h3 className="text-[#8888aa] text-xs uppercase">Languages</h3>
        {[
          { lang: 'Arabic', level: 100 },
          { lang: 'French', level: 85 },
          { lang: 'English', level: 85 },
        ].map((l) => (
          <div key={l.lang}>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-[#e8e8f0]">{l.lang}</span>
              <span className="text-[#00f0ff]">{l.level}%</span>
            </div>
            <div className="h-1.5 bg-[rgba(0,240,255,0.1)] rounded-full">
              <div className="h-full bg-gradient-to-r from-[#00f0ff] to-[#7b2fff] rounded-full" style={{ width: `${l.level}%` }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function MobileProjects() {
  const projects = [
    { title: 'Multiplexed Vehicle Prototype', icon: '🚗', tags: ['STM32', 'CAN Bus'] },
    { title: 'Battery Management System', icon: '🔋', tags: ['Python', 'EKF'] },
    { title: 'Sliding Mode Control on FPGA', icon: '⚙️', tags: ['FPGA', 'VHDL'] },
    { title: 'Smart Irrigation System', icon: '🌱', tags: ['ESP32', 'IoT'] },
  ]
  
  return (
    <div className="space-y-4">
      <h2 className="text-[#00f0ff] text-lg font-semibold">Projects</h2>
      {projects.map((p, i) => (
        <div key={i} className="p-4 bg-[rgba(0,0,0,0.3)] rounded-xl border-l-2 border-[#00f0ff]">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xl">{p.icon}</span>
            <span className="text-[#e8e8f0] font-medium text-sm">{p.title}</span>
          </div>
          <div className="flex gap-2">
            {p.tags.map((tag) => (
              <span key={tag} className="px-2 py-0.5 bg-[rgba(0,240,255,0.1)] rounded text-[10px] text-[#00f0ff]">
                {tag}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

function MobileSkills() {
  const skills = [
    { name: 'STM32', level: 90 },
    { name: 'ESP32', level: 88 },
    { name: 'CAN Bus', level: 85 },
    { name: 'Python', level: 80 },
    { name: 'MATLAB', level: 75 },
    { name: 'TIA Portal', level: 70 },
  ]
  
  return (
    <div className="space-y-4">
      <h2 className="text-[#00f0ff] text-lg font-semibold">Skills</h2>
      {skills.map((s) => (
        <div key={s.name}>
          <div className="flex justify-between text-sm mb-1">
            <span className="text-[#e8e8f0]">{s.name}</span>
            <span className="text-[#00f0ff]">{s.level}%</span>
          </div>
          <div className="h-2 bg-[rgba(0,240,255,0.1)] rounded-full">
            <motion.div 
              className="h-full bg-gradient-to-r from-[#00f0ff] to-[#7b2fff] rounded-full" 
              initial={{ width: 0 }}
              animate={{ width: `${s.level}%` }}
              transition={{ duration: 0.8 }}
            />
          </div>
        </div>
      ))}
    </div>
  )
}

function MobileExperience() {
  const experiences = [
    { title: 'Industrial Automation Intern', company: 'LafargeHolcim', date: '2025' },
    { title: 'Head of Training', company: 'Mechatronics Club', date: '2025–Now' },
    { title: 'Co-Organizer', company: 'National Robotics Competition', date: '2024–2025' },
  ]
  
  return (
    <div className="space-y-4">
      <h2 className="text-[#00f0ff] text-lg font-semibold">Experience</h2>
      {experiences.map((e, i) => (
        <div key={i} className="p-4 bg-[rgba(0,0,0,0.3)] rounded-xl">
          <div className="text-[#00ff88] text-xs mb-1">{e.date}</div>
          <div className="text-[#e8e8f0] font-medium">{e.title}</div>
          <div className="text-[#8888aa] text-sm">{e.company}</div>
        </div>
      ))}
    </div>
  )
}

function MobileCertificates() {
  const certs = [
    { title: 'Electrical Engineering Job Simulation', issuer: 'GE Aerospace' },
    { title: 'Working with the OpenAI API', issuer: 'DataCamp' },
    { title: 'Industrial Robotics ABB', issuer: 'Udemy' },
    { title: 'Excel Macros & VBA', issuer: 'Udemy' },
  ]
  
  return (
    <div className="space-y-4">
      <h2 className="text-[#00f0ff] text-lg font-semibold">Certificates</h2>
      {certs.map((c, i) => (
        <div key={i} className="p-4 bg-[rgba(0,0,0,0.3)] rounded-xl flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[rgba(0,240,255,0.1)] flex items-center justify-center">
            🏆
          </div>
          <div>
            <div className="text-[#e8e8f0] font-medium text-sm">{c.title}</div>
            <div className="text-[#8888aa] text-xs">{c.issuer}</div>
          </div>
        </div>
      ))}
    </div>
  )
}

function MobileContact() {
  return (
    <div className="space-y-4">
      <h2 className="text-[#00f0ff] text-lg font-semibold">Contact</h2>
      
      <a href="mailto:soufyane.el3aouni@gmail.com" className="flex items-center gap-3 p-4 bg-[rgba(0,0,0,0.3)] rounded-xl">
        <span className="text-xl">📧</span>
        <span className="text-[#e8e8f0] text-sm">soufyane.el3aouni@gmail.com</span>
      </a>
      
      <a href="tel:+212772257679" className="flex items-center gap-3 p-4 bg-[rgba(0,0,0,0.3)] rounded-xl">
        <span className="text-xl">📱</span>
        <span className="text-[#e8e8f0] text-sm">+212 772 257 679</span>
      </a>
      
      <a href="https://linkedin.com/in/soufyane-elaouni" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-4 bg-[rgba(0,0,0,0.3)] rounded-xl">
        <span className="text-xl">💼</span>
        <span className="text-[#e8e8f0] text-sm">LinkedIn</span>
      </a>
    </div>
  )
}
