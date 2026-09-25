'use client'

import { useLanguage } from '@/components/portfolio/language-provider'
import { skillGroups, t } from '@/lib/portfolio-data'

function highlightValue(text: string) {
  return text.split(/("(?:[^"\\]|\\.)*")/g).map((part, index) =>
    part.startsWith('"') ? (
      <span key={index} className="code-string">
        {part}
      </span>
    ) : (
      <span key={index}>{part}</span>
    ),
  )
}

function renderLine(line: string, index: number) {
  const keyMatch = line.match(/^(\s*)"([^"]+)":(.*)$/)
  const content = keyMatch ? (
    <>
      {keyMatch[1]}
      <span className="code-key">"{keyMatch[2]}"</span>:{highlightValue(keyMatch[3])}
    </>
  ) : (
    highlightValue(line)
  )

  return (
    <div key={index} className="flex">
      <span className="w-8 pr-4 text-right select-none text-[#8b91a3]">{index + 1}</span>
      <span className="whitespace-pre text-[#e8e8f0]">{content}</span>
    </div>
  )
}

export function SkillsWindow() {
  const { lang } = useLanguage()

  // Same content as the chips below, but rendered as the JSON a recruiter
  // would scan for in a repository.
  const skillsJson = JSON.stringify(
    {
      engineer: 'Soufyane Elaouni',
      role: lang === 'fr' ? 'Automatisme industriel & systèmes embarqués' : 'Industrial automation & embedded systems',
      ...Object.fromEntries(
        skillGroups.map((group) => [t(group.title, lang).toLowerCase(), group.items]),
      ),
    },
    null,
    2,
  )

  return (
    <div className="flex h-full flex-col">
      <div className="flex min-h-0 flex-1 flex-col border-b border-[rgba(0,240,255,0.08)]">
        <div className="flex items-center gap-2 border-b border-[rgba(0,240,255,0.08)] bg-[rgba(0,0,0,0.3)] px-3 py-1.5">
          <span aria-hidden="true" className="text-[#ffd700]">
            ◆
          </span>
          <span className="text-sm text-[#e8e8f0]">skills.json</span>
          <span className="ml-auto font-mono text-[10px] text-[#8b91a3]">JSON · UTF-8</span>
        </div>
        <div className="min-h-0 flex-1 overflow-auto p-4 font-mono text-[11px] leading-relaxed">
          {skillsJson.split('\n').map(renderLine)}
        </div>
      </div>

      <div className="min-h-0 flex-1 overflow-auto p-4">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {skillGroups.map((group) => (
            <section key={group.id}>
              <h3 className="mb-1.5 flex items-center gap-2 text-xs font-semibold text-[#00f0ff]">
                <span aria-hidden="true">{group.icon}</span>
                {t(group.title, lang)}
              </h3>
              <ul className="flex flex-wrap gap-1">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="rounded border border-white/10 bg-white/[0.03] px-1.5 py-0.5 font-mono text-[10px] text-[#a8aec2]"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </div>
    </div>
  )
}
