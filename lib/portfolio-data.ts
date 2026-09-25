/**
 * Single source of truth for every piece of portfolio content.
 *
 * Rules for this file:
 *  - Every claim must be traceable to Elaouni_Soufyane_CV.pdf (Sept 2026) or to
 *    structural facts already stated on the previous version of the site
 *    (employers, dates, tools).
 *  - No self-assigned skill percentages, star ratings, or invented KPIs.
 *  - Copy is bilingual (fr = default, matching the CV, en = for international
 *    recruiters). Use `t()` to resolve a localized string.
 */

export type Lang = 'fr' | 'en'

export type L = { fr: string; en: string }

export const t = (value: L, lang: Lang): string => value[lang]

export const site = {
  url: 'https://elaounisoufyane.space',
  name: 'Soufyane Elaouni',
  initials: 'SE',
  system: 'SoufyaneOS',
  school: 'ENSA Tétouan',
  email: 'soufyane.el3aouni@gmail.com',
  phone: '+212 772 257 679',
  phoneHref: 'tel:+212772257679',
  location: { fr: 'Tétouan, Maroc', en: 'Tetouan, Morocco' },
  role: {
    fr: 'Élève ingénieur en Mécatronique',
    en: 'Mechatronics Engineering Student',
  },
  specialty: {
    fr: 'Automatisme industriel & systèmes embarqués',
    en: 'Industrial automation & embedded systems',
  },
  links: {
    github: 'https://github.com/Soufyane12231',
    githubRepo: 'https://github.com/Soufyane12231/v0-macos-sequoia-portfolio',
    linkedin: 'https://www.linkedin.com/in/soufyane-elaouni-63507732a/',
    linkedinLabel: 'linkedin.com/in/soufyane-elaouni',
    emailLabel: 'soufyane.el3aouni@gmail.com',
    cv: '/cv/elaouni-soufyane-cv.pdf',
    cvFileName: 'elaouni-soufyane-cv.pdf',
    os: '/os',
  },
} as const

/* ------------------------------------------------------------------ */
/* Profile                                                             */
/* ------------------------------------------------------------------ */

export const profile = {
  headline: {
    fr: 'Automatisme industriel & systèmes embarqués',
    en: 'Industrial automation & embedded systems',
  } satisfies L,
  summary: {
    fr: "Élève ingénieur en dernière année de Mécatronique à l'ENSA Tétouan, avec un profil polyvalent en ingénierie industrielle : programmation d'automates sous Siemens TIA Portal, supervision WinCC et mise en service d'un côté ; développement de logiciels de diagnostic embarqués, communication CAN/UDS et contrôle temps réel de l'autre. Mon expérience terrain (tests systèmes, dépannage, déploiement sur site) complète cette approche logicielle, et me rend à l'aise aussi bien en ingénierie et support production que sur des projets numériques et embarqués.",
    en: 'Final-year Mechatronics engineering student at ENSA Tétouan with a versatile profile in industrial engineering: PLC programming in Siemens TIA Portal, WinCC supervision and commissioning on one side; embedded diagnostic software, CAN/UDS communication and real-time control on the other. Hands-on field experience (system testing, troubleshooting, on-site deployment) rounds out that software approach, and I am at ease both in engineering and production support roles and in digital and embedded projects.',
  } satisfies L,
  status: {
    fr: 'Stagiaire chez Renault Technology Morocco depuis juin 2026',
    en: 'Intern at Renault Technology Morocco since June 2026',
  } satisfies L,
  availability: {
    fr: 'Ouvert aux opportunités en automatisme industriel et systèmes embarqués',
    en: 'Open to industrial automation and embedded systems opportunities',
  } satisfies L,
}

export const highlights: { value: string; label: L }[] = [
  {
    value: '19 s',
    label: {
      fr: 'diagnostic véhicule complet, contre ~10 min auparavant',
      en: 'full-vehicle diagnostic, down from ~10 min',
    },
  },
  {
    value: '9 ECU',
    label: {
      fr: 'calculateurs identifiés et validés via CAN/UDS',
      en: 'ECUs identified and validated over CAN/UDS',
    },
  },
  {
    value: '80+',
    label: {
      fr: 'étudiants ingénieurs formés au Club Mécatronique',
      en: 'engineering students trained at the Mechatronics Club',
    },
  },
  {
    value: '2',
    label: {
      fr: 'stages en automatisme et diagnostic automobile',
      en: 'internships in automation and automotive diagnostics',
    },
  },
]

/* ------------------------------------------------------------------ */
/* Experience                                                          */
/* ------------------------------------------------------------------ */

export interface Experience {
  id: string
  icon: string
  color: string
  role: L
  company: L
  location: L
  period: L
  current: boolean
  summary: L
  bullets: L[]
  stack: string[]
}

export const experiences: Experience[] = [
  {
    id: 'renault',
    icon: '🚗',
    color: '#ffcc00',
    role: {
      fr: 'Stagiaire — Systèmes embarqués & diagnostic automobile',
      en: 'Intern — Embedded Systems & Automotive Diagnostics',
    },
    company: { fr: 'Renault Technology Morocco (RTMA)', en: 'Renault Technology Morocco (RTMA)' },
    location: { fr: 'Tanger, Maroc', en: 'Tangier, Morocco' },
    period: { fr: 'Juin 2026 – Présent', en: 'Jun 2026 – Present' },
    current: true,
    summary: {
      fr: "Développement d'un outil de diagnostic embarqué low-cost pour automatiser la validation des calculateurs (ECU) en fin de ligne de production.",
      en: 'Development of a low-cost embedded diagnostic tool to automate end-of-line validation of electronic control units (ECUs).',
    },
    bullets: [
      {
        fr: "Outil de diagnostic embarqué low-cost basé sur un ESP32 pour la validation des calculateurs en fin de ligne de production.",
        en: 'Low-cost ESP32-based embedded diagnostic tool used for end-of-line production validation of control units.',
      },
      {
        fr: "Architecture de diagnostic modulaire CAN/UDS capable d'identifier et de valider 9 calculateurs, avec un support évolutif par configuration des identifiants CAN.",
        en: 'Modular CAN/UDS diagnostic architecture able to identify and validate 9 control units, with extensibility through CAN identifier configuration.',
      },
      {
        fr: "Temps de diagnostic d'un véhicule complet réduit d'environ 10 minutes à 19 secondes grâce à un tableau de bord intuitif remplaçant les outils conventionnels.",
        en: 'Full-vehicle diagnostic time reduced from roughly 10 minutes to 19 seconds by an intuitive dashboard replacing conventional diagnostic tools.',
      },
    ],
    stack: ['ESP32', 'C/C++', 'CAN', 'UDS', 'ISO-TP', 'Raspberry Pi', 'Linux embarqué', 'Python'],
  },
  {
    id: 'holcim',
    icon: '🏭',
    color: '#00f0ff',
    role: {
      fr: 'Stagiaire en automatisme industriel',
      en: 'Industrial Automation Intern',
    },
    company: { fr: 'Holcim Maroc', en: 'Holcim Maroc' },
    location: { fr: 'Oujda, Maroc', en: 'Oujda, Morocco' },
    period: { fr: 'Juillet 2025', en: 'Jul 2025' },
    current: false,
    summary: {
      fr: "Développement et optimisation de programmes automates (API) sous Siemens TIA Portal pour le système de contrôle d'un filtre à manches industriel.",
      en: 'Development and optimisation of PLC programs in Siemens TIA Portal for the control system of an industrial bag-filter unit.',
    },
    bullets: [
      {
        fr: "Programmes automates (API) développés et optimisés sous Siemens TIA Portal pour le contrôle du filtre à manches.",
        en: 'PLC programs developed and optimised in Siemens TIA Portal to control the bag-filter unit.',
      },
      {
        fr: "Interface IHM WinCC conçue et configurée pour superviser les variables du procédé et fluidifier l'interaction opérateur.",
        en: 'WinCC HMI designed and configured to supervise process variables and improve operator interaction.',
      },
      {
        fr: 'Participation aux tests système, au dépannage et à la mise en service pour garantir la fiabilité du procédé automatisé.',
        en: 'Involved in system testing, troubleshooting and commissioning to ensure reliable operation of the automated process.',
      },
    ],
    stack: ['Siemens TIA Portal', 'API / PLC', 'WinCC', 'Supervision', 'Capteurs de pression', 'Électrovannes'],
  },
  {
    id: 'club',
    icon: '🤖',
    color: '#00ff88',
    role: {
      fr: 'Responsable formation',
      en: 'Head of Training',
    },
    company: { fr: 'Club Mécatronique — ENSA Tétouan', en: 'Mechatronics Club — ENSA Tétouan' },
    location: { fr: 'ENSA Tétouan', en: 'ENSA Tetouan' },
    period: { fr: '2025 – Présent', en: '2025 – Present' },
    current: true,
    summary: {
      fr: "Conception et animation d'un programme de formation technique pour les étudiants ingénieurs de l'ENSA Tétouan.",
      en: 'Design and delivery of a technical training programme for ENSA Tetouan engineering students.',
    },
    bullets: [
      {
        fr: "Plus de 80 étudiants ingénieurs formés à travers des ateliers techniques hands-on.",
        en: 'More than 80 engineering students trained through hands-on technical workshops.',
      },
      {
        fr: 'Ateliers couvrant les systèmes embarqués, l\'automatisme industriel, le prototypage rapide et les soft skills.',
        en: 'Workshops covering embedded systems, industrial automation, rapid prototyping and soft skills.',
      },
    ],
    stack: ['Systèmes embarqués', 'Automatisme', 'Prototypage', 'Pédagogie'],
  },
  {
    id: 'robotics',
    icon: '🏆',
    color: '#c3a6ff',
    role: {
      fr: 'Co-organisateur',
      en: 'Co-organiser',
    },
    company: {
      fr: 'Compétition Nationale de Robotique',
      en: 'National Robotics Competition',
    },
    location: { fr: 'ENSA Tétouan', en: 'ENSA Tetouan' },
    period: { fr: '2024 – 2025', en: '2024 – 2025' },
    current: false,
    summary: {
      fr: "Coordination de l'organisation d'une compétition nationale de robotique : planification, logistique et engagement des participants.",
      en: 'Coordinated the organisation of a national robotics competition: planning, logistics and participant engagement.',
    },
    bullets: [
      {
        fr: 'Planification de l\'événement, logistique et coordination des équipes participantes.',
        en: 'Event planning, logistics and coordination of participating teams.',
      },
    ],
    stack: ['Gestion de projet', 'Documentation technique', 'Coordination'],
  },
]

/* ------------------------------------------------------------------ */
/* Projects                                                            */
/* ------------------------------------------------------------------ */

export interface Project {
  id: string
  icon: string
  category: L
  title: L
  tags: string[]
  description: L
  highlightsList: L[]
  context: 'work' | 'school'
}

export const projects: Project[] = [
  {
    id: 'ecu-diagnostics',
    icon: '🚘',
    category: { fr: 'Automobile & Diagnostic', en: 'Automotive & Diagnostics' },
    title: {
      fr: 'Outil de diagnostic automobile (ECU)',
      en: 'Automotive ECU Diagnostic Tool',
    },
    tags: ['C/C++', 'Python', 'Raspberry Pi', 'Linux embarqué', 'CAN', 'UDS'],
    description: {
      fr: "Application de diagnostic embarquée pour la communication et la validation des calculateurs via UDS sur bus CAN.",
      en: 'Embedded diagnostic application for ECU communication and validation over UDS on a CAN bus.',
    },
    highlightsList: [
      {
        fr: 'Architecture modulaire : identification et validation de 9 calculateurs.',
        en: 'Modular architecture: identification and validation of 9 control units.',
      },
      {
        fr: 'Évolutivité par simple configuration des identifiants CAN.',
        en: 'Extensible through CAN identifier configuration alone.',
      },
      {
        fr: "Diagnostic complet d'un véhicule ramené d'environ 10 min à 19 s (9 calculateurs).",
        en: 'Full-vehicle diagnostic brought down from about 10 minutes to 19 seconds (9 control units).',
      },
    ],
    context: 'work',
  },
  {
    id: 'acc',
    icon: '🛣️',
    category: { fr: 'Automobile & Modélisation', en: 'Automotive & Modeling' },
    title: {
      fr: 'Régulateur de vitesse adaptatif (ACC)',
      en: 'Adaptive Cruise Control (ACC)',
    },
    tags: ['MATLAB/Simulink', 'Stateflow', 'AUTOSAR', 'Model-Based Design', 'SIL'],
    description: {
      fr: "Système de régulation de vitesse adaptatif conduit en méthode Agile, de l'ingénierie des exigences à la documentation technique.",
      en: 'Adaptive cruise control system developed with an Agile approach, from requirements engineering to technical documentation.',
    },
    highlightsList: [
      {
        fr: 'Ingénierie des exigences et architecture AUTOSAR.',
        en: 'Requirements engineering and AUTOSAR architecture.',
      },
      {
        fr: 'Conception Model-Based Design sous Stateflow / Simulink.',
        en: 'Model-Based Design in Stateflow / Simulink.',
      },
      {
        fr: 'Validation SIL et documentation technique associée.',
        en: 'SIL validation and associated technical documentation.',
      },
    ],
    context: 'school',
  },
  {
    id: 'ball-beam',
    icon: '⚙️',
    category: { fr: 'Contrôle & Signal', en: 'Control & Signal' },
    title: {
      fr: 'Système de contrôle Balle et Poutre (Ball & Beam)',
      en: 'Ball & Beam Control System',
    },
    tags: ['STM32F411', 'MATLAB/Simulink', 'FPGA', 'PID', 'SMC', 'EKF'],
    description: {
      fr: 'Système de contrôle en boucle fermée sur microcontrôleur, avec logique de commande modélisée sous MATLAB/Simulink et traitement du signal sur FPGA.',
      en: 'Closed-loop control system on a microcontroller, with control logic modelled in MATLAB/Simulink and signal processing on FPGA.',
    },
    highlightsList: [
      {
        fr: 'Implémentation temps réel sur STM32F411.',
        en: 'Real-time implementation on STM32F411.',
      },
      {
        fr: 'Logique de commande conçue sous MATLAB/Simulink.',
        en: 'Control logic designed in MATLAB/Simulink.',
      },
      {
        fr: 'Traitement du signal basé FPGA.',
        en: 'FPGA-based signal processing.',
      },
    ],
    context: 'school',
  },
]

/* ------------------------------------------------------------------ */
/* Skills, education, certifications, languages                       */
/* ------------------------------------------------------------------ */

export interface SkillGroup {
  id: string
  icon: string
  title: L
  items: string[]
}

export const skillGroups: SkillGroup[] = [
  {
    id: 'automation',
    icon: '🏭',
    title: { fr: 'Automatisme & contrôle-commande', en: 'Automation & control' },
    items: ['Siemens TIA Portal', 'Programmation API / PLC', 'WinCC (IHM & supervision)', 'Automates', 'Mise en commission'],
  },
  {
    id: 'embedded',
    icon: '🔌',
    title: { fr: 'Systèmes embarqués', en: 'Embedded systems' },
    items: ['ESP32', 'STM32 / STM32F411', 'Raspberry Pi', 'Firmware temps réel', 'C/C++ embarqué'],
  },
  {
    id: 'bus',
    icon: '🚌',
    title: { fr: 'Réseaux & protocoles embarqués', en: 'Embedded networking' },
    items: ['CAN', 'CAN FD', 'UDS', 'ISO-TP'],
  },
  {
    id: 'simulation',
    icon: '📈',
    title: { fr: 'Simulation & contrôle', en: 'Simulation & control' },
    items: ['MATLAB / Simulink', 'PID', 'SMC (modes glissants)', 'EKF (Kalman étendu)'],
  },
  {
    id: 'modeling',
    icon: '🧩',
    title: { fr: 'Modélisation & méthodes', en: 'Modeling & methods' },
    items: ['AUTOSAR', 'Stateflow', 'Model-Based Design', 'Validation SIL', 'Méthodes agiles', 'Ingénierie des exigences'],
  },
  {
    id: 'tools',
    icon: '🛠️',
    title: { fr: 'Outils', en: 'Tools' },
    items: ['Python', 'Git', 'Linux', 'VS Code', 'Google Workspace'],
  },
]

export interface EducationItem {
  id: string
  title: L
  school: L
  period: L
}

export const education: EducationItem[] = [
  {
    id: 'ensa',
    title: { fr: "Cycle d'Ingénieur d'État en Mécatronique", en: "State Engineer's Degree in Mechatronics" },
    school: { fr: 'ENSA Tétouan', en: 'ENSA Tetouan' },
    period: { fr: '2023 – Présent', en: '2023 – Present' },
  },
  {
    id: 'cpge',
    title: {
      fr: "Classes Préparatoires aux Grandes Écoles (Mathématiques & Physique)",
      en: 'Preparatory classes — Mathematics & Physics',
    },
    school: { fr: 'Maroc', en: 'Morocco' },
    period: { fr: '2021 – 2023', en: '2021 – 2023' },
  },
  {
    id: 'bac',
    title: { fr: 'Baccalauréat Sciences Mathématiques', en: 'High-school diploma, Mathematics' },
    school: { fr: 'Maroc', en: 'Morocco' },
    period: { fr: '2021', en: '2021' },
  },
]

export interface Certification {
  id: string
  title: L
  issuer: string
  year: string
  color: string
}

export const certifications: Certification[] = [
  {
    id: 'abb',
    title: { fr: 'Robotique industrielle — ABB', en: 'Industrial Robotics — ABB' },
    issuer: 'Udemy',
    year: '2025',
    color: '#ff4444',
  },
  {
    id: 'ge',
    title: {
      fr: "Job Simulation en Ingénierie Électrique",
      en: 'Electrical Engineering Job Simulation',
    },
    issuer: 'GE Aerospace',
    year: '2026',
    color: '#1a9bff',
  },
  {
    id: 'datacamp',
    title: { fr: "Travailler avec l'API OpenAI", en: 'Working with the OpenAI API' },
    issuer: 'DataCamp',
    year: '2025',
    color: '#ff9500',
  },
]

export const spokenLanguages: { flag: string; name: L; level: L }[] = [
  { flag: '🇲🇦', name: { fr: 'Arabe', en: 'Arabic' }, level: { fr: 'Langue maternelle', en: 'Native' } },
  { flag: '🇫🇷', name: { fr: 'Français', en: 'French' }, level: { fr: 'Courant', en: 'Fluent' } },
  { flag: '🇬🇧', name: { fr: 'Anglais', en: 'English' }, level: { fr: 'Courant', en: 'Fluent' } },
]

/* ------------------------------------------------------------------ */
/* UI copy                                                            */
/* ------------------------------------------------------------------ */

export const ui = {
  nav: {
    profile: { fr: 'Profil', en: 'Profile' },
    experience: { fr: 'Expérience', en: 'Experience' },
    projects: { fr: 'Projets', en: 'Projects' },
    skills: { fr: 'Compétences', en: 'Skills' },
    contact: { fr: 'Contact', en: 'Contact' },
  },
  actions: {
    downloadCv: { fr: 'Télécharger le CV', en: 'Download CV' },
    contactMe: { fr: 'Me contacter', en: 'Get in touch' },
    openOs: { fr: 'Ouvrir SoufyaneOS', en: 'Open SoufyaneOS' },
    openOsHint: {
      fr: 'Version interactive du portfolio (bureau façon OS)',
      en: 'Interactive desktop version of the portfolio',
    },
    copy: { fr: 'Copier', en: 'Copy' },
    copied: { fr: 'Copié', en: 'Copied' },
    viewProject: { fr: 'Voir le détail', en: 'View details' },
    close: { fr: 'Fermer', en: 'Close' },
    menu: { fr: 'Menu', en: 'Menu' },
    skipToContent: { fr: 'Aller au contenu principal', en: 'Skip to main content' },
  },
  sections: {
    profile: { fr: 'Profil', en: 'Profile' },
    highlights: { fr: 'En bref', en: 'At a glance' },
    experience: { fr: 'Expérience professionnelle', en: 'Professional experience' },
    projects: { fr: "Projets d'ingénierie", en: 'Engineering projects' },
    skills: { fr: 'Compétences techniques', en: 'Technical skills' },
    education: { fr: 'Formation', en: 'Education' },
    certifications: { fr: 'Certifications & langues', en: 'Certifications & languages' },
    contact: { fr: 'Contact', en: 'Contact' },
  },
} satisfies Record<string, unknown>

export const sectionTitles = ui.sections
export const navLabels = ui.nav
export const actionLabels = ui.actions
