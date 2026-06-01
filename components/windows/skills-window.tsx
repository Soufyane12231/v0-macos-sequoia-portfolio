'use client'

import { motion } from 'framer-motion'

const skillsJson = `{
  "engineer": "Soufyane Elaouni",
  "embedded_&_fpga": ["STM32", "ESP32", "Arduino", "FPGA"],
  "communication_protocols": ["CAN Bus 500kbps", "SPI", "I2C", "IR", "RFID/NFC"],
  "ai_&_control": ["EKF (Extended Kalman Filter)", "Sliding Mode Control", 
                    "PID", "Python", "Machine Learning"],
  "industrial_automation": ["TIA Portal", "WinCC HMI", "MATLAB/Simulink", 
                             "Power BI", "SolidWorks"],
  "programming_languages": ["C/C++ Embedded", "Python", "VHDL"],
  "soft_skills": ["Technical Training", "Team Leadership", 
                  "Competition Organization", "Documentation"]
}`

const skills = [
  { name: 'STM32', level: 90 },
  { name: 'ESP32', level: 88 },
  { name: 'CAN Bus', level: 85 },
  { name: 'Python', level: 80 },
  { name: 'MATLAB/Simulink', level: 75 },
  { name: 'TIA Portal', level: 70 },
  { name: 'FPGA/VHDL', level: 68 },
  { name: 'SolidWorks', level: 60 },
]

export function SkillsWindow() {
  const renderJsonLine = (line: string, lineNumber: number) => {
    // Simple syntax highlighting
    let highlighted = line
      // Keys
      .replace(/"([^"]+)":/g, '<span class="code-key">"$1"</span>:')
      // String values
      .replace(/: "([^"]+)"/g, ': <span class="code-string">"$1"</span>')
      // Array brackets
      .replace(/\[/g, '<span class="code-bracket">[</span>')
      .replace(/\]/g, '<span class="code-bracket">]</span>')
      // Braces
      .replace(/{/g, '<span class="code-bracket">{</span>')
      .replace(/}/g, '<span class="code-bracket">}</span>')
    
    return (
      <div key={lineNumber} className="flex">
        <span className="w-8 text-[#555] text-right pr-4 select-none">{lineNumber}</span>
        <span dangerouslySetInnerHTML={{ __html: highlighted }} />
      </div>
    )
  }
  
  return (
    <div className="flex flex-col h-full">
      {/* Code editor section - top half */}
      <div className="flex-1 border-b border-[rgba(0,240,255,0.08)] overflow-hidden">
        {/* Tab bar */}
        <div className="flex items-center bg-[rgba(0,0,0,0.3)] px-2 py-1 border-b border-[rgba(0,240,255,0.08)]">
          <div className="flex items-center gap-2 px-3 py-1 bg-[rgba(13,13,26,0.8)] rounded-t text-sm">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-[#ffd700]">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="text-[#e8e8f0]">skills.json</span>
          </div>
        </div>
        
        {/* Code content */}
        <div className="p-4 font-mono text-sm text-[#e8e8f0] overflow-auto h-[calc(100%-40px)]">
          {skillsJson.split('\n').map((line, i) => renderJsonLine(line, i + 1))}
        </div>
      </div>
      
      {/* Skills bars section - bottom half */}
      <div className="flex-1 p-4 overflow-auto">
        <h3 className="text-[#8888aa] text-xs uppercase tracking-wider mb-4">
          Proficiency Levels
        </h3>
        
        <div className="grid grid-cols-2 gap-x-8 gap-y-3">
          {skills.map((skill, index) => (
            <div key={skill.name} className="space-y-1">
              <div className="flex justify-between text-sm">
                <span className="text-[#e8e8f0]">{skill.name}</span>
                <span className="text-[#00f0ff]">{skill.level}%</span>
              </div>
              <div className="h-2 bg-[rgba(0,240,255,0.1)] rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-[#00f0ff] to-[#7b2fff] rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${skill.level}%` }}
                  transition={{ delay: index * 0.1, duration: 0.8, ease: 'easeOut' }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Status bar */}
      <div className="px-3 py-1.5 bg-[rgba(0,0,0,0.3)] border-t border-[rgba(0,240,255,0.08)] flex items-center justify-between text-xs text-[#555]">
        <span>JSON · UTF-8</span>
        <span>Ln 18, Col 1</span>
        <span>skills.json</span>
      </div>
    </div>
  )
}
