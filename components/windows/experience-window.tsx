'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const experiences = [
  {
    id: 'renault',
    period: '2026',
    status: 'ACTIVE',
    role: 'STAGIAIRE SYSTÈMES EMBARQUÉS & DIAGNOSTIC AUTO',
    company: 'Renault Technology Morocco (RTMA)',
    location: 'Tanger, Morocco',
    duration: 'Juin 2026 – Présent',
    supervisor: 'M. A. BOULBEN',
    color: '#ffcc00', // Jaune Renault
    icon: '🏎️',
    summary:
      "Développement d'un outil de diagnostic embarqué low-cost utilisant un ESP32 pour automatiser la validation des ECU sur la ligne de production de véhicules.",
    context: [
      'Renault Technology Morocco (RTMA) — Ingénierie de production',
      'Mission : Automatiser et optimiser la vérification des calculateurs (ECU) avant l\'assemblage du tableau de bord',
      'Remplacement des outils de diagnostic conventionnels lourds par une solution embarquée agile'
    ],
    technical: [
      'Développement d\'un framework de diagnostic modulaire CAN/UDS avec ESP32',
      'Identification et validation de 9 ECUs distincts',
      'Support évolutif permettant l\'ajout d\'ECUs supplémentaires via la configuration des ID CAN',
      'Utilisation des protocoles de communication automobile : CAN, UDS, et ISO-TP',
      'Création d\'un tableau de bord intuitif pour simplifier l\'interaction des opérateurs sur la ligne'
    ],
    results: [
      'Réduction spectaculaire du temps de diagnostic complet du véhicule : de 10 minutes à 19 secondes',
      'Simplification majeure du processus de validation sur la chaîne d\'assemblage',
      'Solution matérielle standalone pleinement fonctionnelle'
    ],
    stack: ['ESP32', 'C/C++', 'CAN', 'UDS', 'ISO-TP', 'Embedded Linux'],
  },
  {
    id: 'lafarge',
    period: '2025',
    status: 'COMPLETED',
    role: 'INDUSTRIAL AUTOMATION INTERN',
    company: 'LafargeHolcim Maroc',
    location: 'Usine de Oujda, Morocco',
    duration: 'Juillet – Août 2025',
    supervisor: 'M. Ayoub GHEZOUTI (Industriel) · M. Mustapha SANBI (Pédagogique)',
    color: '#00f0ff',
    icon: '🏭',
    summary:
      'Conception et implémentation d\'une solution d\'automatisation complète par API (TIA Portal) pour remplacer un séquenceur obsolète (Redecam QE 48u-I) contrôlant un système de nettoyage de filtre à manches à 12 cellules dans la cimenterie LafargeHolcim d\'Oujda — classée 3ème parmi 121 usines Holcim mondiales.',
    context: [
      'LafargeHolcim Maroc — leader des matériaux de construction au Maroc',
      'Usine d\'Oujda : classée 3ème sur 121 usines Holcim à l\'échelle mondiale (2021)',
      'Mission : moderniser le système de nettoyage du filtre à manches REDICAM (Pulse Jet Filter)',
      'Système obsolète : Séquenceur Redecam QE 48u-I — cycle fixe, pas d\'adaptation au ΔP, aucune remontée vers supervision',
      'Filtre à manches : équipement de dépollution atmosphérique critique pour la conformité environnementale',
    ],
    technical: [
      'Architecture : 12 cellules × 12 électrovannes = 144 électrovannes au total',
      '12 capteurs de position (vérins) + 1 capteur ΔP global + 1 capteur température sécurité',
      'Mode 1 — Nettoyage par paires : cellules regroupées (1&12), (2&11)...(6&7) · fermeture vérin 20s · soufflage séquentiel 12 électrovannes',
      'Mode 2 — Séquentiel cellule par cellule : nettoyage basse pression, chaque cellule successivement',
      'Mode 3 — Déclenché par ΔP : activation automatique si ΔP < -12 mbar, arrêt retour à -8 mbar',
      'Sécurité : arrêt d\'urgence à 300°C, fermeture automatique toutes chambres, journalisation alarmes',
      'Logique Auto/Manuel avec déclenchement par pression différentielle',
      'Interface HMI WinCC : choix de mode, réglage temporisations, surveillance temps réel, historique alarmes',
    ],
    results: [
      'Logique de commande opérationnelle complète, structurée et documentée',
      'Modes Auto/Manuel implémentés avec déclenchement ΔP',
      'Intégration HMI WinCC préparée pour acquisition données en production',
      'Système prêt au déploiement — remplacement d\'une technologie vieille de 30+ ans',
      'Architecture modulaire et facilement configurable depuis l\'API',
    ],
    stack: ['TIA Portal', 'WinCC HMI', 'PLC S7', 'Ladder Logic', 'Capteurs ΔP', 'Électrovannes 24VDC'],
  },
  {
    id: 'club',
    period: '2025–Now',
    status: 'ACTIVE',
    role: 'RESPONSABLE FORMATION',
    company: 'Club Mécatronique',
    location: 'ENSA Tétouan',
    duration: '2025 – Présent',
    supervisor: null,
    color: '#00ff88',
    icon: '🤖',
    summary:
      'Conception et animation du programme de formation technique du Club Mécatronique ENSA Tétouan : 5+ workshops intensifs couvrant l\'embarqué, l\'IoT et l\'automatisation industrielle, pour +100 étudiants ingénieurs.',
    context: [
      'Club Mécatronique ENSA Tétouan — club de référence en systèmes embarqués',
      'Rôle : concevoir et animer des formations pratiques hands-on',
      'Public : étudiants ingénieurs 1ère à 4ème année',
    ],
    technical: [
      'Workshop 1 — Arduino : du zéro au prototype embarqué fonctionnel',
      'Workshop 2 — ESP32 : développement WiFi/BLE, IoT et protocoles sans fil',
      'Workshop 3 — Systèmes Embarqués : interruptions, timers, C++ temps réel sur STM32',
      'Workshop 4 — Digitalisation Industrielle : SCADA, IIoT, Industry 4.0',
      'Workshop 5 — Functional Safety : introduction ISO 26262 pour l\'automobile',
    ],
    results: [
      '+100 étudiants formés sur 5+ workshops',
      'Bootcamps intensifs et sessions pratiques hands-on',
      'Curriculum de formation structuré construit de zéro',
      'Impact direct sur le niveau technique des membres du club',
    ],
    stack: ['Arduino', 'ESP32', 'STM32', 'C++', 'MATLAB', 'ISO 26262'],
  },
  {
    id: 'robotics',
    period: '2024–2025',
    status: 'COMPLETED',
    role: 'CO-ORGANISATEUR',
    company: 'Compétition Nationale de Robotique',
    location: 'ENSA Tétouan',
    duration: '2 Éditions — 2024 & 2025',
    supervisor: null,
    color: '#7b2fff',
    icon: '🏆',
    summary:
      'Co-organisation de deux éditions de la Compétition Nationale de Robotique à ENSA Tétouan, gestion de 40+ équipes nationales, pilotage complet du pipeline technique et logistique.',
    context: [
      'Compétition nationale de robotique — ENSA Tétouan',
      'Deux éditions consécutives organisées avec succès',
      'Portée nationale avec équipes de toutes les ENSAs du Maroc',
    ],
    technical: [
      'Conception et validation des arènes de compétition',
      'Définition et documentation du règlement technique',
      'Coordination du système de jugement en temps réel',
      'Gestion technique des équipes participantes',
    ],
    results: [
      '+40 équipes nationales participantes par édition',
      'Pipeline technique & logistique complet piloté',
      '2 éditions consécutives réussies',
      'Positionnement d\'ENSA Tétouan comme acteur clé de la robotique nationale',
    ],
    stack: ['Gestion de Projet', 'Documentation Technique', 'Coordination d\'Équipe'],
  },
]

type TabType = 'context' | 'technical' | 'results'

export function ExperienceWindow() {
  const [selectedExp, setSelectedExp] = useState(experiences[0])
  const [activeTab, setActiveTab] = useState<TabType>('technical')

  const tabs: { key: TabType; label: string; icon: string }[] = [
    { key: 'context', label: 'context', icon: '📋' },
    { key: 'technical', label: 'technical', icon: '⚙️' },
    { key: 'results', label: 'results', icon: '✅' },
  ]

  const activeData = {
    context: selectedExp.context,
    technical: selectedExp.technical,
    results: selectedExp.results,
  }

  return (
    <div className="h-full w-full flex flex-col bg-[#0a0a12] overflow-hidden">
      {/* Terminal header */}
      <div className="px-4 py-2 border-b border-[rgba(0,240,255,0.08)] bg-[rgba(0,0,0,0.3)] flex-shrink-0">
        <div className="font-mono text-[#00ff88] text-sm">
          soufyane@SoufyaneOS:~$ cat experience.log
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden min-h-0">
        {/* LEFT SIDEBAR */}
        <div className="w-56 flex-shrink-0 border-r border-[rgba(0,240,255,0.08)] bg-[rgba(0,0,0,0.2)] overflow-y-auto">
          <div className="p-3">
            <div className="font-mono text-[#444] text-xs mb-3 uppercase tracking-widest">
              // career_log
            </div>
            {experiences.map((exp) => (
              <motion.button
                key={exp.id}
                onClick={() => {
                  setSelectedExp(exp)
                  setActiveTab('technical')
                }}
                className={`w-full text-left p-3 rounded-lg mb-2 border transition-all duration-200 ${
                  selectedExp.id === exp.id
                    ? 'border-[rgba(0,240,255,0.25)] bg-[rgba(0,240,255,0.06)]'
                    : 'border-transparent hover:bg-[rgba(255,255,255,0.03)] hover:border-[rgba(255,255,255,0.06)]'
                }`}
                whileHover={{ x: 2 }}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-base">{exp.icon}</span>
                  <span
                    className="text-xs font-mono font-bold"
                    style={{ color: exp.color }}
                  >
                    [{exp.period}]
                  </span>
                </div>
                <div className="text-[#e8e8f0] text-xs font-semibold leading-tight">
                  {exp.role}
                </div>
                <div className="text-[#8888aa] text-xs mt-0.5 truncate">
                  {exp.company}
                </div>
                <div
                  className={`mt-2 text-xs font-mono px-2 py-0.5 rounded-full inline-block ${
                    exp.status === 'ACTIVE'
                      ? 'bg-[rgba(0,255,136,0.1)] text-[#00ff88]'
                      : 'bg-[rgba(0,240,255,0.1)] text-[#00f0ff]'
                  }`}
                >
                  {exp.status === 'ACTIVE' ? '● ACTIVE' : '✓ DONE'}
                </div>
              </motion.button>
            ))}
          </div>
        </div>

        {/* RIGHT DETAIL PANEL */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedExp.id}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.2 }}
            className="flex-1 overflow-y-auto p-5 min-w-0"
          >
            {/* Header block */}
            <div className="mb-4">
              <div className="flex items-start justify-between gap-4 mb-3">
                <div className="flex items-start gap-3">
                  <span className="text-3xl">{selectedExp.icon}</span>
                  <div>
                    <span
                      className="font-mono text-xs font-bold"
                      style={{ color: selectedExp.color }}
                    >
                      [{selectedExp.period}]
                    </span>
                    <h2 className="text-[#e8e8f0] font-bold text-base leading-tight mt-0.5">
                      {selectedExp.role}
                    </h2>
                    <div
                      className="font-semibold text-sm mt-0.5"
                      style={{ color: selectedExp.color }}
                    >
                      {selectedExp.company}
                    </div>
                    <div className="text-[#8888aa] text-xs font-mono mt-1">
                      📍 {selectedExp.location} · 📅 {selectedExp.duration}
                    </div>
                    {selectedExp.supervisor && (
                      <div className="text-[#555] text-xs font-mono mt-1">
                        👨‍🏫 {selectedExp.supervisor}
                      </div>
                    )}
                  </div>
                </div>
                <div
                  className={`text-xs font-mono px-3 py-1 rounded-full flex-shrink-0 border ${
                    selectedExp.status === 'ACTIVE'
                      ? 'bg-[rgba(0,255,136,0.08)] text-[#00ff88] border-[rgba(0,255,136,0.2)]'
                      : 'bg-[rgba(0,240,255,0.08)] text-[#00f0ff] border-[rgba(0,240,255,0.2)]'
                  }`}
                >
                  {selectedExp.status === 'ACTIVE' ? '● ACTIVE' : '✓ COMPLETED'}
                </div>
              </div>

              {/* Stack tags */}
              <div className="flex flex-wrap gap-1.5 mb-3">
                {selectedExp.stack.map((tech) => (
                  <span
                    key={tech}
                    className="text-xs font-mono px-2 py-0.5 rounded border"
                    style={{
                      color: selectedExp.color,
                      borderColor: `${selectedExp.color}33`,
                      backgroundColor: `${selectedExp.color}0d`,
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Summary */}
              <div className="p-3 rounded-lg bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.05)]">
                <div className="font-mono text-[#444] text-xs mb-1">&gt; summary</div>
                <p className="text-[#aaaacc] text-xs leading-relaxed">
                  {selectedExp.summary}
                </p>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-1 mb-4 border-b border-[rgba(255,255,255,0.06)] pb-2">
              {tabs.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`px-3 py-1.5 rounded-t text-xs font-mono transition-all duration-150 ${
                    activeTab === tab.key
                      ? 'text-[#e8e8f0] border-b-2'
                      : 'text-[#666] hover:text-[#aaa]'
                  }`}
                  style={
                    activeTab === tab.key
                      ? { borderBottomColor: selectedExp.color, color: selectedExp.color }
                      : {}
                  }
                >
                  {tab.icon} {tab.label}
                </button>
              ))}
            </div>

            {/* Tab content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.15 }}
                className="font-mono text-xs space-y-2"
              >
                {activeData[activeTab].map((line, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -4 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04 }}
                    className="flex gap-2 p-2.5 rounded bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.04)] hover:border-[rgba(0,240,255,0.12)] transition-colors"
                  >
                    <span style={{ color: selectedExp.color }} className="flex-shrink-0">
                      &gt;
                    </span>
                    <span className="text-[#ccccdd] leading-relaxed">{line}</span>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>

            {/* Footer cursor */}
            <div className="mt-6 flex items-center font-mono text-xs">
              <span className="text-[#00ff88]">soufyane@SoufyaneOS:~$ </span>
              <motion.span
                className="w-2 h-3.5 bg-[#00ff88] ml-1 inline-block"
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.53, repeat: Infinity }}
              />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
