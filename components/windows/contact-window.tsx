'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

export function ContactWindow() {
  const [copiedField, setCopiedField] = useState<string | null>(null)

  const handleCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text)
    setCopiedField(field)
    setTimeout(() => setCopiedField(null), 2000)
  }

  const mailtoLink = `mailto:soufyane.el3aouni@gmail.com?subject=Hello Soufyane&body=Hi Soufyane,%0D%0A%0D%0A`

  return (
    <div className="h-full flex flex-col bg-[#0a0a12] font-mono text-sm">
      <div className="flex-1 p-4 overflow-auto">
        <div className="text-[#00ff88] mb-2">soufyane@SoufyaneOS:~$ ./contact.sh</div>
        <div className="text-[#00f0ff] mb-4">Initializing contact protocol...</div>
        <div className="text-[#333] mb-4">━━━━━━━━━━━━━━━━━━━━━━━━━━━</div>

        <div className="text-[#e8e8f0] mb-4">Direct channels:</div>

        <div className="space-y-3 mb-6">
          {[
            { icon: '📧', label: 'soufyane.el3aouni@gmail.com', field: 'email' },
            { icon: '📱', label: '+212 772 257 679', field: 'phone' },
          ].map((item) => (
            <div key={item.field} className="flex items-center gap-2">
              <span className="text-[#00f0ff]">&gt;</span>
              <span>{item.icon}</span>
              <span className="text-[#e8e8f0]">{item.label}</span>
              <button
                onClick={() => handleCopy(item.label, item.field)}
                className="text-[#555] hover:text-[#00f0ff] transition-colors text-xs"
              >
                {copiedField === item.field ? '[copied!]' : '[click to copy]'}
              </button>
            </div>
          ))}

          <div className="flex items-center gap-2">
            <span className="text-[#00f0ff]">&gt;</span>
            <span>💼</span>
            <a href="https://www.linkedin.com/in/soufyane-elaouni-63507732a/" target="_blank" rel="noopener noreferrer" className="text-[#e8e8f0] hover:text-[#00f0ff] transition-colors">
              linkedin.com/in/soufyane-elaouni-63507732a
            </a>
            <span className="text-[#555] text-xs">[open →]</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[#00f0ff]">&gt;</span>
            <span>🐙</span>
            <a href="https://github.com/Soufyane12231" target="_blank" rel="noopener noreferrer" className="text-[#e8e8f0] hover:text-[#00f0ff] transition-colors">
              github.com/Soufyane12231
            </a>
            <span className="text-[#555] text-xs">[open →]</span>
          </div>
        </div>

        <div className="text-[#333] mb-6">━━━━━━━━━━━━━━━━━━━━━━━━━━━</div>

        <div className="text-[#e8e8f0] mb-4">Send a message:</div>

        <motion.a
          href={mailtoLink}
          className="inline-flex items-center gap-2 px-4 py-2 bg-[rgba(0,240,255,0.1)] border border-[rgba(0,240,255,0.3)] rounded text-[#00f0ff] hover:bg-[rgba(0,240,255,0.2)] transition-colors"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <span className="text-[#00ff88]">$</span>
          [▶ open_email_client()]
        </motion.a>

        <div className="mt-2 text-[#555] text-xs">
          → Opens your default email app with my address pre-filled
        </div>

        <div className="mt-6 flex items-center">
          <span className="text-[#00ff88]">soufyane@SoufyaneOS:~$ </span>
          <motion.span
            className="w-2 h-4 bg-[#00ff88] ml-1"
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.53, repeat: Infinity }}
          />
        </div>
      </div>
    </div>
  )
}
