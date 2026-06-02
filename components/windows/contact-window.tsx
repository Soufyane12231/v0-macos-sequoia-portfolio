'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

export function ContactWindow() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [copiedField, setCopiedField] = useState<string | null>(null)

  const handleCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text)
    setCopiedField(field)
    setTimeout(() => setCopiedField(null), 2000)
  }

const handleSubmit = async () => {
    setIsSubmitting(true)
    setError(null)
    try {
      const emailjs = await import('@emailjs/browser')
      await emailjs.sendForm
      await emailjs.send(
        'service_8zfr17a',
        'template_d74wrcm',
        {
          from_name: formData.name,
          from_email: formData.email,
          subject: formData.subject,
          message: formData.message,
        },
        'qalkF746xHd7Umu9w'
      )
      setIsSubmitted(true)
    } catch (err) {
      setError('Failed to send message. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }
  return (
    <div className="h-full flex flex-col bg-[#0a0a12] font-mono text-sm">
      <div className="flex-1 p-4 overflow-auto">
        <div className="text-[#00ff88] mb-2">soufyane@SoufyaneOS:~$ ./contact.sh</div>
        <div className="text-[#00f0ff] mb-4">Initializing contact protocol...</div>
        <div className="text-[#333] mb-4">━━━━━━━━━━━━━━━━━━━━━━━━━━━</div>

        <div className="text-[#e8e8f0] mb-4">Direct channels:</div>
        <div className="space-y-2 mb-6">
          {[
            { icon: '📧', label: 'soufyane.el3aouni@gmail.com', field: 'email' },
            { icon: '📱', label: '+212 772 257 679', field: 'phone' },
          ].map((item) => (
            <div key={item.field} className="flex items-center gap-2">
              <span className="text-[#00f0ff]">&gt;</span>
              <span>{item.icon}</span>
              <span className="text-[#e8e8f0]">{item.label}</span>
              <button onClick={() => handleCopy(item.label, item.field)} className="text-[#555] hover:text-[#00f0ff] transition-colors text-xs">
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
        </div>

        <div className="text-[#333] mb-4">━━━━━━━━━━━━━━━━━━━━━━━━━━━</div>
        <div className="text-[#e8e8f0] mb-4">Send a message:</div>

        {!isSubmitted ? (
          <div className="space-y-3">
            {[
              { key: 'name', label: 'enter_name', type: 'text' },
              { key: 'email', label: 'enter_email', type: 'email' },
              { key: 'subject', label: 'enter_subject', type: 'text' },
            ].map((field) => (
              <div key={field.key} className="flex items-center gap-2">
                <span className="text-[#00ff88]">$</span>
                <span className="text-[#8888aa]">{field.label}:</span>
                <input
                  type={field.type}
                  value={formData[field.key as keyof typeof formData]}
                  onChange={(e) => setFormData({ ...formData, [field.key]: e.target.value })}
                  className="flex-1 bg-transparent border-b border-[rgba(0,240,255,0.2)] text-[#e8e8f0] focus:outline-none focus:border-[#00f0ff] px-2 py-1"
                  placeholder="_"
                />
              </div>
            ))}
            <div className="flex items-start gap-2">
              <span className="text-[#00ff88]">$</span>
              <span className="text-[#8888aa]">enter_message:</span>
              <textarea
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="flex-1 bg-[rgba(0,240,255,0.05)] border border-[rgba(0,240,255,0.2)] rounded text-[#e8e8f0] focus:outline-none focus:border-[#00f0ff] px-2 py-1 min-h-[80px] resize-none"
                placeholder="Type your message here..."
              />
            </div>

            {error && <div className="text-red-400 text-xs">{error}</div>}

            <motion.button
              onClick={handleSubmit}
              disabled={!formData.name || !formData.email || !formData.message || isSubmitting}
              className="mt-4 px-4 py-2 bg-[rgba(0,240,255,0.1)] border border-[rgba(0,240,255,0.3)] rounded text-[#00f0ff] hover:bg-[rgba(0,240,255,0.2)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="text-[#00ff88]">$</span>
              {isSubmitting ? 'Sending...' : '[▶ execute send_message()]'}
            </motion.button>
          </div>
        ) : (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-2">
            <div className="text-[#00f0ff]">{`>`} Encrypting message... ████████ 100%</div>
            <div className="text-[#00f0ff]">{`>`} Sending to soufyane@SoufyaneOS... OK</div>
            <div className="text-[#00ff88]">{`>`} Message delivered successfully ✓</div>
            <div className="mt-4 text-[#8888aa]">Thank you for reaching out! I&apos;ll get back to you soon.</div>
            <button onClick={() => { setIsSubmitted(false); setFormData({ name: '', email: '', subject: '', message: '' }) }} className="mt-2 text-[#555] hover:text-[#00f0ff] text-xs">
              [send another message]
            </button>
          </motion.div>
        )}

        <div className="mt-4 flex items-center">
          <span className="text-[#00ff88]">soufyane@SoufyaneOS:~$ </span>
          <motion.span className="w-2 h-4 bg-[#00ff88] ml-1" animate={{ opacity: [1, 0] }} transition={{ duration: 0.53, repeat: Infinity }} />
        </div>
      </div>
    </div>
  )
}
