'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Project {
  id: string
  icon: string
  title: string
  tags: { label: string; color: string }[]
  description: string
  details: string
  results: string[]
  stars: number
  category: string
}

const projects: Project[] = [
  {
    id: 'vehicle',
    icon: '🚗',
    title: 'Multiplexed Vehicle Prototype & HIL Bench',
    tags: [
      { label: 'STM32', color: '#00ff88' },
      { label: 'ESP32', color: '#00ff88' },
      { label: 'CAN Bus 500kbps', color: '#00f0ff' },
      { label: 'C++', color: '#7b2fff' },
      { label: 'RFID', color: '#00f0ff' },
      { label: 'ADAS', color: '#7b2fff' },
    ],
    description: 'Dual-ECU automotive architecture with CAN bus communication, ADAS frame prioritization, and RFID authentication.',
    details: 'Designed and implemented a complete automotive prototype featuring dual-ECU architecture communicating over CAN bus at 500kbps. Integrated ADAS functionalities with frame prioritization and RFID-based authentication system. Validated through Hardware-in-the-Loop testing.',
    results: ['CAN error < 0.1%', 'Latency < 50ms', 'HIL validated'],
    stars: 5,
    category: 'Automotive',
  },
  {
    id: 'bms',
    icon: '🔋',
    title: 'Battery Management System — EV',
    tags: [
      { label: 'Python', color: '#7b2fff' },
      { label: 'MATLAB/Simulink', color: '#ff9500' },
      { label: 'EKF', color: '#00f0ff' },
      { label: 'Li-ion', color: '#00ff88' },
      { label: 'SOC Estimation', color: '#7b2fff' },
    ],
    description: 'Extended Kalman Filter vs Coulomb Counting for Li-ion SOC estimation. Equivalent circuit modeled in Simulink.',
    details: 'Developed a comprehensive BMS solution comparing EKF and Coulomb Counting methods for State of Charge estimation. Built an equivalent circuit model in MATLAB/Simulink for accurate battery behavior simulation.',
    results: ['~40% error reduction', 'Real-time capable', 'Simulink validated'],
    stars: 5,
    category: 'Energy Systems',
  },
  {
    id: 'smc',
    icon: '⚙️',
    title: 'Sliding Mode Control on FPGA',
    tags: [
      { label: 'FPGA', color: '#00ff88' },
      { label: 'VHDL', color: '#00ff88' },
      { label: 'SMC', color: '#7b2fff' },
      { label: 'Nonlinear Control', color: '#00f0ff' },
      { label: 'Real-time', color: '#ff9500' },
    ],
    description: 'Robust SMC controller for ball-on-rail nonlinear system implemented on FPGA. Validated on physical bench.',
    details: 'Implemented a Sliding Mode Controller in VHDL on FPGA for a nonlinear ball-on-rail system. Achieved robust stabilization with chattering reduction through boundary layer technique.',
    results: ['Stabilization < 300ms', 'Physical bench validated', 'Chattering minimized'],
    stars: 5,
    category: 'Control Systems',
  },
  {
    id: 'irrigation',
    icon: '🌱',
    title: 'Smart Irrigation System',
    tags: [
      { label: 'ESP32', color: '#00ff88' },
      { label: 'Python', color: '#7b2fff' },
      { label: 'IoT', color: '#00f0ff' },
      { label: 'Power BI', color: '#ff9500' },
      { label: 'Sensors', color: '#00ff88' },
    ],
    description: 'Adaptive IoT irrigation with soil moisture monitoring and ML-based decision logic. Live Power BI dashboard.',
    details: 'Built a complete IoT irrigation system using ESP32 with multiple soil moisture sensors. Implemented ML-based watering decisions and real-time monitoring through Power BI dashboards.',
    results: ['25% water reduction', 'Live dashboard', 'ML-optimized'],
    stars: 4,
    category: 'IoT',
  },
]

const categories = ['All Projects', 'Automotive', 'Energy Systems', 'IoT', 'Control Systems']

export function ProjectsWindow() {
  const [activeCategory, setActiveCategory] = useState('All Projects')
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  
  const filteredProjects = activeCategory === 'All Projects' 
    ? projects 
    : projects.filter(p => p.category === activeCategory)
  
  return (
    <div className="flex h-full">
      {/* Sidebar */}
      <div className="w-48 border-r border-[rgba(0,240,255,0.08)] p-3 shrink-0">
        <div className="text-[#555] text-xs uppercase tracking-wider mb-2 px-2">
          Favorites
        </div>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`w-full text-left px-3 py-1.5 rounded-md text-sm transition-colors ${
              activeCategory === cat 
                ? 'bg-[rgba(0,240,255,0.15)] text-[#00f0ff]' 
                : 'text-[#e8e8f0] hover:bg-[rgba(255,255,255,0.05)]'
            }`}
          >
            {cat === 'All Projects' ? '📁 ' : ''}
            {cat === 'Automotive' ? '🚗 ' : ''}
            {cat === 'Energy Systems' ? '🔋 ' : ''}
            {cat === 'IoT' ? '🌱 ' : ''}
            {cat === 'Control Systems' ? '⚙️ ' : ''}
            {cat}
            {cat === 'All Projects' && ` (${projects.length})`}
          </button>
        ))}
      </div>
      
      {/* Main content */}
      <div className="flex-1 p-4 overflow-auto">
        <div className="grid grid-cols-2 gap-4">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-[rgba(0,0,0,0.3)] rounded-lg border-l-2 border-[#00f0ff] p-4 hover:bg-[rgba(0,240,255,0.05)] transition-colors cursor-pointer"
              onClick={() => setSelectedProject(project)}
            >
              {/* Header */}
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">{project.icon}</span>
                <h3 className="text-[#e8e8f0] font-semibold font-mono text-sm leading-tight">
                  {project.title}
                </h3>
              </div>
              
              {/* Tags */}
              <div className="flex flex-wrap gap-1 mb-3">
                {project.tags.slice(0, 4).map((tag, i) => (
                  <span
                    key={i}
                    className="px-2 py-0.5 rounded-full text-[10px] font-medium"
                    style={{ 
                      backgroundColor: `${tag.color}20`,
                      color: tag.color,
                      border: `1px solid ${tag.color}40`
                    }}
                  >
                    {tag.label}
                  </span>
                ))}
                {project.tags.length > 4 && (
                  <span className="px-2 py-0.5 rounded-full text-[10px] text-[#555]">
                    +{project.tags.length - 4}
                  </span>
                )}
              </div>
              
              {/* Description */}
              <p className="text-[#8888aa] text-xs mb-3 line-clamp-2">
                {project.description}
              </p>
              
              {/* Footer */}
              <div className="flex items-center justify-between">
                <button className="text-[#00f0ff] text-xs hover:underline">
                  View Details →
                </button>
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <span 
                      key={i} 
                      className={i < project.stars ? 'text-[#ffd700]' : 'text-[#333]'}
                    >
                      ⭐
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Project detail modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            className="absolute inset-0 bg-[rgba(0,0,0,0.8)] flex items-center justify-center p-8 z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              className="bg-[rgba(13,13,26,0.95)] border border-[rgba(0,240,255,0.2)] rounded-xl p-6 max-w-lg w-full max-h-[80%] overflow-auto"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center gap-3 mb-4">
                <span className="text-4xl">{selectedProject.icon}</span>
                <div>
                  <h2 className="text-[#e8e8f0] font-semibold text-lg">
                    {selectedProject.title}
                  </h2>
                  <span className="text-[#555] text-xs">{selectedProject.category}</span>
                </div>
              </div>
              
              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {selectedProject.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 rounded-full text-xs font-medium"
                    style={{ 
                      backgroundColor: `${tag.color}20`,
                      color: tag.color,
                      border: `1px solid ${tag.color}40`
                    }}
                  >
                    {tag.label}
                  </span>
                ))}
              </div>
              
              {/* Description */}
              <p className="text-[#e8e8f0] mb-4 leading-relaxed">
                {selectedProject.details}
              </p>
              
              {/* Results */}
              <div className="bg-[rgba(0,240,255,0.05)] rounded-lg p-4 mb-4">
                <h4 className="text-[#00f0ff] text-sm font-semibold mb-2">Key Results</h4>
                <ul className="space-y-1">
                  {selectedProject.results.map((result, i) => (
                    <li key={i} className="text-[#e8e8f0] text-sm flex items-center gap-2">
                      <span className="text-[#00ff88]">✓</span>
                      {result}
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* Close button */}
              <button
                onClick={() => setSelectedProject(null)}
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
