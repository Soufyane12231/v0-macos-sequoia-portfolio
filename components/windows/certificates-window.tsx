'use client'

import { motion } from 'framer-motion'
import { useLanguage } from '@/components/portfolio/language-provider'
import { certifications, site, t } from '@/lib/portfolio-data'

export function CertificatesWindow() {
  const { lang } = useLanguage()

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center gap-2 border-b border-[rgba(0,240,255,0.08)] bg-[rgba(0,0,0,0.2)] px-4 py-2">
        <span aria-hidden="true" className="text-[#00f0ff]">
          🏆
        </span>
        <span className="text-sm text-[#e8e8f0]">
          {lang === 'fr' ? 'certificats/' : 'certificates/'}
        </span>
        <span className="ml-auto font-mono text-[10px] text-[#8b91a3]">
          {certifications.length} {lang === 'fr' ? 'entrées' : 'items'}
        </span>
      </div>

      <div className="flex-1 overflow-auto p-4">
        <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {certifications.map((cert, index) => (
            <motion.li
              key={cert.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.07 }}
              className="rounded-lg border border-white/10 bg-[rgba(0,0,0,0.3)] p-4 transition-colors hover:border-white/20"
            >
              <div className="flex items-start gap-3">
                <span
                  className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full"
                  style={{ backgroundColor: cert.color }}
                  aria-hidden="true"
                />
                <div className="min-w-0">
                  <h3 className="text-sm font-semibold leading-tight text-[#e8e8f0]">{t(cert.title, lang)}</h3>
                  <p className="mt-1 font-mono text-xs text-[#8888aa]">
                    {cert.issuer} · {cert.year}
                  </p>
                </div>
              </div>
            </motion.li>
          ))}
        </ul>

        <p className="mt-5 rounded-lg border border-[rgba(0,240,255,0.15)] bg-[rgba(0,240,255,0.05)] p-3 text-xs leading-relaxed text-[#9aa0b5]">
          {lang === 'fr'
            ? "Les attestations et certificats sont disponibles sur demande — n'hésitez pas à me contacter."
            : 'Certificates and attestations are available on request — feel free to get in touch.'}{' '}
          <a href={`mailto:${site.email}`} className="text-[#00f0ff] underline underline-offset-2">
            {site.email}
          </a>
        </p>
      </div>
    </div>
  )
}
