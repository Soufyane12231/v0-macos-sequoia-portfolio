'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useLanguage } from '@/components/portfolio/language-provider'
import { profile, site } from '@/lib/portfolio-data'

export function ContactWindow() {
  const { lang } = useLanguage()
  const [copiedField, setCopiedField] = useState<string | null>(null)

  const handleCopy = async (text: string, field: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedField(field)
      window.setTimeout(() => setCopiedField(null), 2000)
    } catch {
      /* clipboard blocked — the address stays selectable */
    }
  }

  const mailtoLink = `mailto:${site.email}?subject=${encodeURIComponent(
    lang === 'fr' ? 'Opportunité — Mécatronique / Automatisme' : 'Opportunity — Mechatronics / Automation',
  )}&body=${encodeURIComponent(
    lang === 'fr'
      ? `Bonjour Soufyane,\n\nJe vous contacte au sujet de`
      : `Hi Soufyane,\n\nI am reaching out about`,
  )}`

  const channels = [
    { icon: '📧', value: site.email, field: 'email' },
    { icon: '📱', value: site.phone, field: 'phone' },
  ]

  const links = [
    { icon: '💼', label: site.links.linkedinLabel, href: site.links.linkedin, field: 'linkedin' },
    { icon: '🐙', label: 'github.com/Soufyane12231', href: site.links.github, field: 'github' },
  ]

  return (
    <div className="flex h-full flex-col overflow-auto bg-[#0a0a12] font-mono text-sm">
      <div className="p-4">
        <div className="mb-2 text-[#00ff88]">soufyane@SoufyaneOS:~$ ./contact.sh</div>
        <div className="mb-4 text-[#00f0ff]">Initializing contact protocol...</div>
        <div className="mb-4 h-px w-full bg-white/10" aria-hidden="true" />

        <div className="mb-3 text-[#e8e8f0]">
          {lang === 'fr' ? 'Canaux directs :' : 'Direct channels:'}
        </div>

        <div className="mb-6 space-y-3">
          {channels.map((item) => (
            <div key={item.field} className="flex items-center gap-2">
              <span className="text-[#00f0ff]">&gt;</span>
              <span aria-hidden="true">{item.icon}</span>
              <span className="text-[#e8e8f0]">{item.value}</span>
              <button
                type="button"
                onClick={() => handleCopy(item.value, item.field)}
                className="flex min-h-6 items-center rounded px-1 text-xs text-[#8b91a3] transition-colors hover:text-[#00f0ff] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00f0ff]"
              >
                [{copiedField === item.field ? (lang === 'fr' ? 'copié !' : 'copied!') : lang === 'fr' ? 'cliquer pour copier' : 'click to copy'}]
              </button>
            </div>
          ))}

          {links.map((item) => (
            <div key={item.field} className="flex items-center gap-2">
              <span className="text-[#00f0ff]">&gt;</span>
              <span aria-hidden="true">{item.icon}</span>
              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex min-h-6 items-center text-[#e8e8f0] transition-colors hover:text-[#00f0ff]"
              >
                {item.label}
              </a>
              <span className="text-xs text-[#8b91a3]">[open →]</span>
            </div>
          ))}

          <div className="flex items-center gap-2">
            <span className="text-[#00f0ff]">&gt;</span>
            <span aria-hidden="true">📄</span>
            <a
              href={site.links.cv}
              download
              className="flex min-h-6 items-center text-[#e8e8f0] transition-colors hover:text-[#00f0ff]"
            >
              cv/elaouni-soufyane-cv.pdf
            </a>
            <span className="text-xs text-[#8b91a3]">[download]</span>
          </div>
        </div>

        <div className="mb-4 h-px w-full bg-white/10" aria-hidden="true" />

        <div className="mb-4 text-[#e8e8f0]">
          {lang === 'fr' ? 'Envoyer un message :' : 'Send a message:'}
        </div>

        <motion.a
          href={mailtoLink}
          className="inline-flex items-center gap-2 rounded border border-[rgba(0,240,255,0.3)] bg-[rgba(0,240,255,0.1)] px-4 py-2 text-[#00f0ff] transition-colors hover:bg-[rgba(0,240,255,0.2)]"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <span className="text-[#00ff88]">$</span>
          [▶ open_email_client()]
        </motion.a>

        <p className="mt-3 text-xs leading-relaxed text-[#9aa0b5]">
          {lang === 'fr'
            ? 'Ouvre votre application e-mail avec mon adresse pré-remplie.'
            : 'Opens your email app with my address pre-filled.'}
        </p>
        <p className="mt-1 text-xs leading-relaxed text-[#8b91a3]">{profile.availability[lang]}</p>

        <div className="mt-6 flex items-center">
          <span className="text-[#00ff88]">soufyane@SoufyaneOS:~$ </span>
          <motion.span
            className="ml-1 h-4 w-2 bg-[#00ff88]"
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.53, repeat: Infinity }}
          />
        </div>
      </div>
    </div>
  )
}
