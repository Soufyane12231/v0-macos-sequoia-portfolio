/**
 * Single source of truth for every piece of content on the one-page site.
 *
 * Rules for this file:
 *  - Every claim is traceable to elaouni-soufyane-cv.pdf (Sept 2026) or to
 *    structural facts already stated on the previous versions of this site.
 *  - No self-assigned skill percentages, star ratings, gauges, levels or
 *    invented KPIs. No invented clients, testimonials or ECU names.
 *  - No emoji anywhere in this file (they are removed from the UI as well).
 *    Decorative iconography lives in components/onepage/schematics.tsx.
 *  - Bilingual: fr is the default (it matches the CV and the primary audience),
 *    en is opt-in. Resolve with `t(value, lang)`.
 *  - Anti-redundancy is structural, not editorial:
 *      · contact links (LinkedIn / GitHub / email / phone / site) exist ONLY in
 *        the Contact section.
 *      · the "Télécharger le CV" call to action exists ONLY in the sticky
 *        header. It used to appear in the hero and again at the foot of
 *        Contact; both were removed as repetitions of the same one action.
 *      · the four figures (19 s, 9 ECU, 80+, 2) exist ONLY in "En bref".
 *      · the internship status exists ONLY in the hero.
 *      · skill tags exist ONLY in Compétences.
 */

export type Lang = 'fr' | 'en'

export type L = { fr: string; en: string }

export const t = (value: L, lang: Lang): string => value[lang]

/* ------------------------------------------------------------------ */
/* Site                                                                */
/* ------------------------------------------------------------------ */

export const site = {
  url: 'https://elaounisoufyane.space',
  name: 'Soufyane Elaouni',
  initials: 'SE',
  school: 'ENSA Tétouan',
  email: 'soufyane.el3aouni@gmail.com',
  phone: '+212 772 257 679',
  phoneHref: 'tel:+212772257679',
  location: { fr: 'Tétouan, Maroc', en: 'Tetouan, Morocco' } satisfies L,
  role: {
    fr: 'Élève ingénieur en Mécatronique',
    en: 'Mechatronics Engineering Student',
  } satisfies L,
  specialty: {
    fr: 'Automatisme industriel & systèmes embarqués',
    en: 'Industrial automation & embedded systems',
  } satisfies L,
  links: {
    github: 'https://github.com/Soufyane12231',
    githubRepo: 'https://github.com/Soufyane12231/v0-macos-sequoia-portfolio',
    linkedin: 'https://www.linkedin.com/in/soufyane-elaouni-63507732a/',
    cv: '/elaouni-soufyane-cv.pdf',
    cvFileName: 'elaouni-soufyane-cv.pdf',
  },
} as const

/* ------------------------------------------------------------------ */
/* SEO                                                                 */
/* ------------------------------------------------------------------ */

export const seo = {
  title: {
    fr: 'Soufyane Elaouni — Élève ingénieur Mécatronique | Automatisme industriel & systèmes embarqués',
    en: 'Soufyane Elaouni — Mechatronics Engineering Student | Industrial automation & embedded systems',
  } satisfies L,
  description: {
    fr: "Élève ingénieur en Mécatronique à l'ENSA Tétouan. Automatisme industriel sous Siemens TIA Portal et WinCC, systèmes embarqués et diagnostic automobile ESP32 / CAN / UDS. Stage en cours chez Renault Technology Morocco.",
    en: 'Mechatronics engineering student at ENSA Tetouan. Industrial automation with Siemens TIA Portal and WinCC, embedded systems and automotive diagnostics with ESP32, CAN and UDS. Currently interning at Renault Technology Morocco.',
  } satisfies L,
  ogTitle: {
    fr: 'Soufyane Elaouni — Mécatronique | Automatisme & systèmes embarqués',
    en: 'Soufyane Elaouni — Mechatronics | Automation & embedded systems',
  } satisfies L,
  ogDescription: {
    fr: "Diagnostic embarqué ESP32 / CAN / UDS · Automatisme TIA Portal · WinCC · STM32 · MATLAB Simulink",
    en: 'Embedded diagnostics ESP32 / CAN / UDS · TIA Portal automation · WinCC · STM32 · MATLAB Simulink',
  } satisfies L,
} satisfies Record<string, unknown>

/* ------------------------------------------------------------------ */
/* A. Hero — the only place where the internship status appears        */
/* ------------------------------------------------------------------ */

export const hero = {
  eyebrow: {
    fr: 'Stagiaire — Renault Technology Morocco, Tanger',
    en: 'Intern — Renault Technology Morocco, Tangier',
  } satisfies L,
  eyebrowPeriod: {
    fr: 'Juin 2026 – présent',
    en: 'Jun 2026 – present',
  } satisfies L,
  /** Two sentences. Facts only: degree field, the two domains, field experience. */
  intro: {
    fr: "Élève ingénieur en dernière année de Mécatronique à l'ENSA Tétouan. D'un côté la programmation d'automates sous Siemens TIA Portal, la supervision WinCC et la mise en commission ; de l'autre les logiciels de diagnostic embarqués et la communication CAN / UDS.",
    en: 'Final-year Mechatronics engineering student at ENSA Tetouan. On one side PLC programming in Siemens TIA Portal, WinCC supervision and commissioning; on the other, embedded diagnostic software and CAN / UDS communication.',
  } satisfies L,
  /** The hero's single call to action: the CV button lives in the header. */
  ctaSecondary: { fr: 'Me contacter', en: 'Get in touch' } satisfies L,
  /** Opens the command palette, so the hero advertises the keyboard route. */
  ctaNav: { fr: 'Navigation rapide', en: 'Quick navigation' } satisfies L,
  photoAlt: {
    fr: 'Portrait de Soufyane Elaouni',
    en: 'Portrait of Soufyane Elaouni',
  } satisfies L,
  /** Rendered only when no portrait file has been dropped into /public. */
  photoPlaceholder: {
    fr: 'Portrait à venir',
    en: 'Portrait coming soon',
  } satisfies L,
  badge: {
    fr: 'Diagnostic embarqué · 9 calculateurs · 19 s',
    en: 'Embedded diagnostics · 9 control units · 19 s',
  } satisfies L,
} satisfies Record<string, unknown>

/* ------------------------------------------------------------------ */
/* B. En bref — the only place where the four figures appear           */
/* ------------------------------------------------------------------ */

export const figures = [
  {
    id: 'duration',
    value: 19,
    unit: { fr: 's', en: 's' } satisfies L,
    label: {
      fr: 'pour un diagnostic véhicule complet, contre environ 10 minutes auparavant',
      en: 'for a full-vehicle diagnostic, down from roughly 10 minutes',
    } satisfies L,
  },
  {
    id: 'ecus',
    value: 9,
    unit: { fr: 'ECU', en: 'ECUs' } satisfies L,
    label: {
      fr: 'calculateurs identifiés et validés via CAN / UDS',
      en: 'control units identified and validated over CAN / UDS',
    } satisfies L,
  },
  {
    id: 'students',
    value: 80,
    unit: { fr: '+', en: '+' } satisfies L,
    label: {
      fr: 'étudiants ingénieurs formés au Club Mécatronique',
      en: 'engineering students trained at the Mechatronics Club',
    } satisfies L,
  },
  {
    id: 'stages',
    value: 2,
    unit: { fr: '', en: '' } satisfies L,
    label: {
      fr: 'stages en automatisme industriel et en diagnostic automobile',
      en: 'internships in industrial automation and automotive diagnostics',
    } satisfies L,
  },
]

export const briefLabels = {
  duelTitle: {
    fr: 'Un diagnostic complet, deux durées',
    en: 'One full diagnostic, two durations',
  } satisfies L,
  duelBefore: { fr: 'Avant', en: 'Before' } satisfies L,
  duelAfter: { fr: 'Après', en: 'After' } satisfies L,
  duelBeforeValue: { fr: '10 min', en: '10 min' } satisfies L,
  duelAfterValue: { fr: '19 s', en: '19 s' } satisfies L,
  duelReplay: { fr: 'Rejouer', en: 'Replay' } satisfies L,
  duelReplaying: { fr: 'Lecture en cours', en: 'Playing' } satisfies L,
  busTitle: {
    fr: 'Neuf calculateurs sur le bus',
    en: 'Nine control units on the bus',
  } satisfies L,
  busCaption: {
    fr: 'Identifiés puis validés par identifiants CAN configurables.',
    en: 'Identified then validated through configurable CAN identifiers.',
  } satisfies L,
  gridTitle: { fr: 'Plus de 80 étudiants formés', en: 'Over 80 students trained' } satisfies L,
  gridCaption: {
    fr: 'Ateliers techniques hands-on au Club Mécatronique.',
    en: 'Hands-on technical workshops at the Mechatronics Club.',
  } satisfies L,
  milestonesTitle: { fr: 'Deux étapes de terrain', en: 'Two field stages' } satisfies L,
  // Deliberately without employer names: the internship status belongs to the
  // hero alone, and naming the two employers again would restate it.
  milestones: [
    {
      id: 'holcim',
      period: { fr: 'Juillet 2025', en: 'Jul 2025' } satisfies L,
      label: { fr: 'Automatisme industriel', en: 'Industrial automation' } satisfies L,
    },
    {
      id: 'renault',
      period: { fr: 'Juin 2026', en: 'Jun 2026' } satisfies L,
      label: { fr: 'Diagnostic automobile', en: 'Automotive diagnostics' } satisfies L,
    },
  ],
} satisfies Record<string, unknown>

/* ------------------------------------------------------------------ */
/* C. Experience                                                       */
/* ------------------------------------------------------------------ */

export interface Experience {
  id: string
  role: L
  company: L
  location: L
  period: L
  current: boolean
  summary: L
  bullets: L[]
  stack: string[]
  /** Holcim only: shows the ladder micro-animation inside the dialog. */
  schematic?: 'ladder'
}

export const experiences: Experience[] = [
  {
    id: 'renault',
    role: {
      fr: 'Stagiaire — Systèmes embarqués et diagnostic automobile',
      en: 'Intern — Embedded systems and automotive diagnostics',
    },
    company: { fr: 'Renault Technology Morocco', en: 'Renault Technology Morocco' },
    location: { fr: 'Tanger, Maroc', en: 'Tangier, Morocco' },
    period: { fr: 'Juin 2026 – présent', en: 'Jun 2026 – present' },
    current: true,
    summary: {
      fr: "Développement d'un outil de diagnostic embarqué low-cost pour automatiser la validation des calculateurs en fin de ligne de production.",
      en: 'Development of a low-cost embedded diagnostic tool to automate end-of-line validation of electronic control units.',
    },
    bullets: [
      {
        fr: "Outil de diagnostic embarqué low-cost basé sur un ESP32 pour la validation des calculateurs en fin de ligne de production.",
        en: 'Low-cost ESP32-based embedded diagnostic tool used for end-of-line production validation of control units.',
      },
      {
        fr: "Architecture de diagnostic modulaire CAN / UDS capable d'identifier et de valider 9 calculateurs, avec un support évolutif par configuration des identifiants CAN.",
        en: 'Modular CAN / UDS diagnostic architecture able to identify and validate 9 control units, extensible through CAN identifier configuration.',
      },
      {
        fr: "Temps de diagnostic d'un véhicule complet réduit d'environ 10 minutes à 19 secondes, via un tableau de bord intuitif remplaçant les outils conventionnels.",
        en: 'Full-vehicle diagnostic time reduced from roughly 10 minutes to 19 seconds by an intuitive dashboard replacing conventional diagnostic tools.',
      },
    ],
    stack: ['ESP32', 'C/C++', 'CAN', 'UDS', 'ISO-TP', 'Raspberry Pi', 'Python'],
  },
  {
    id: 'holcim',
    role: {
      fr: 'Stagiaire en automatisme industriel',
      en: 'Industrial automation intern',
    },
    company: { fr: 'Holcim Maroc', en: 'Holcim Maroc' },
    location: { fr: 'Oujda, Maroc', en: 'Oujda, Morocco' },
    period: { fr: 'Juillet 2025', en: 'Jul 2025' },
    current: false,
    summary: {
      fr: "Développement et optimisation de programmes automates sous Siemens TIA Portal pour le système de contrôle d'un filtre à manches industriel.",
      en: 'Development and optimisation of PLC programs in Siemens TIA Portal for the control system of an industrial bag-filter unit.',
    },
    bullets: [
      {
        fr: "Programmes automates développés et optimisés sous Siemens TIA Portal pour le contrôle du filtre à manches.",
        en: 'PLC programs developed and optimised in Siemens TIA Portal to control the bag-filter unit.',
      },
      {
        fr: 'Interface IHM WinCC conçue et configurée pour superviser les variables du procédé et fluidifier l\'interaction opérateur.',
        en: 'WinCC HMI designed and configured to supervise process variables and improve operator interaction.',
      },
      {
        fr: 'Participation aux tests système, au dépannage et à la mise en commission pour garantir la fiabilité du procédé automatisé.',
        en: 'Involved in system testing, troubleshooting and commissioning to ensure reliable operation of the automated process.',
      },
    ],
    stack: ['Siemens TIA Portal', 'API / PLC', 'WinCC', 'Capteurs de pression', 'Électrovannes'],
    schematic: 'ladder',
  },
  {
    id: 'club',
    role: { fr: 'Responsable formation', en: 'Head of training' },
    company: { fr: 'Club Mécatronique — ENSA Tétouan', en: 'Mechatronics Club — ENSA Tetouan' },
    location: { fr: 'ENSA Tétouan', en: 'ENSA Tetouan' },
    period: { fr: '2025 – présent', en: '2025 – present' },
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
        fr: "Ateliers couvrant les systèmes embarqués, l'automatisme industriel, le prototypage rapide et les soft skills.",
        en: 'Workshops covering embedded systems, industrial automation, rapid prototyping and soft skills.',
      },
    ],
    stack: ['Systèmes embarqués', 'Automatisme', 'Prototypage'],
  },
  {
    id: 'robotics',
    role: { fr: 'Co-organisateur', en: 'Co-organiser' },
    company: {
      fr: 'Compétition nationale de robotique',
      en: 'National robotics competition',
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
        fr: "Planification de l'événement, logistique et coordination des équipes participantes.",
        en: 'Event planning, logistics and coordination of participating teams.',
      },
    ],
    stack: ['Gestion de projet', 'Coordination', 'Documentation technique'],
  },
]

/* ------------------------------------------------------------------ */
/* D. Projects                                                         */
/* ------------------------------------------------------------------ */

export interface Project {
  id: string
  category: 'diagnostic' | 'modeling' | 'control'
  title: L
  tags: string[]
  description: L
  highlightsList: L[]
  context: 'work' | 'school'
  contextLabel: L
  schematic: 'ecu' | 'acc' | 'ballbeam'
  /** Optional gallery images; empty until real media is dropped into /public. */
  images: string[]
}

export const projectCategories = {
  all: { fr: 'Tous', en: 'All' } satisfies L,
  diagnostic: { fr: 'Diagnostic automobile', en: 'Automotive diagnostics' } satisfies L,
  modeling: { fr: 'Modélisation', en: 'Modeling' } satisfies L,
  control: { fr: 'Contrôle & signal', en: 'Control & signal' } satisfies L,
} satisfies Record<string, unknown>

export const projects: Project[] = [
  {
    id: 'ecu-diagnostics',
    category: 'diagnostic',
    title: {
      fr: 'Outil de diagnostic automobile (ECU)',
      en: 'Automotive ECU diagnostic tool',
    },
    tags: ['C/C++', 'Python', 'CAN', 'UDS', 'Raspberry Pi'],
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
        fr: "Diagnostic complet d'un véhicule ramené d'environ 10 min à 19 s.",
        en: 'Full-vehicle diagnostic brought down from about 10 minutes to 19 seconds.',
      },
    ],
    context: 'work',
    contextLabel: { fr: 'Projet de stage', en: 'Internship project' },
    schematic: 'ecu',
    images: [],
  },
  {
    id: 'acc',
    category: 'modeling',
    title: {
      fr: 'Régulateur de vitesse adaptatif (ACC)',
      en: 'Adaptive cruise control (ACC)',
    },
    tags: ['MATLAB/Simulink', 'Stateflow', 'AUTOSAR', 'SIL'],
    description: {
      fr: "Système de régulation de vitesse adaptatif conduit en méthode agile, de l'ingénierie des exigences à la documentation technique.",
      en: 'Adaptive cruise control system developed with an agile approach, from requirements engineering to technical documentation.',
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
    contextLabel: { fr: 'Projet académique', en: 'School project' },
    schematic: 'acc',
    images: [],
  },
  {
    id: 'ball-beam',
    category: 'control',
    title: {
      fr: 'Contrôle Balle et Poutre (Ball & Beam)',
      en: 'Ball & Beam control system',
    },
    tags: ['STM32F411', 'MATLAB/Simulink', 'FPGA', 'PID'],
    description: {
      fr: "Système de contrôle en boucle fermée sur microcontrôleur, avec logique de commande modélisée sous MATLAB / Simulink et traitement du signal sur FPGA.",
      en: 'Closed-loop control system on a microcontroller, with control logic modelled in MATLAB / Simulink and signal processing on FPGA.',
    },
    highlightsList: [
      {
        fr: 'Implémentation temps réel sur STM32F411.',
        en: 'Real-time implementation on STM32F411.',
      },
      {
        fr: 'Logique de commande conçue sous MATLAB / Simulink.',
        en: 'Control logic designed in MATLAB / Simulink.',
      },
      {
        fr: 'Traitement du signal basé FPGA.',
        en: 'FPGA-based signal processing.',
      },
    ],
    context: 'school',
    contextLabel: { fr: 'Projet académique', en: 'School project' },
    schematic: 'ballbeam',
    images: [],
  },
]

/* ------------------------------------------------------------------ */
/* E. Skills — the only place where skill tags appear                  */
/* ------------------------------------------------------------------ */

export interface SkillGroup {
  id: string
  index: string
  title: L
  items: string[]
}

export const skillGroups: SkillGroup[] = [
  {
    id: 'automation',
    index: 'M01',
    title: { fr: 'Automatisme et contrôle-commande', en: 'Automation and control' },
    items: ['Siemens TIA Portal', 'Programmation API / PLC', 'WinCC', 'Mise en commission'],
  },
  {
    id: 'embedded',
    index: 'M02',
    title: { fr: 'Systèmes embarqués', en: 'Embedded systems' },
    items: ['ESP32', 'STM32 / STM32F411', 'Raspberry Pi', 'C/C++'],
  },
  {
    id: 'bus',
    index: 'M03',
    title: { fr: 'Réseaux et protocoles embarqués', en: 'Embedded networks' },
    items: ['CAN', 'CAN FD', 'UDS', 'ISO-TP'],
  },
  {
    id: 'simulation',
    index: 'M04',
    title: { fr: 'Simulation et contrôle', en: 'Simulation and control' },
    items: ['MATLAB / Simulink', 'PID', 'SMC', 'EKF'],
  },
  {
    id: 'modeling',
    index: 'M05',
    title: { fr: 'Modélisation et méthodes', en: 'Modeling and methods' },
    items: ['AUTOSAR', 'Stateflow', 'Model-Based Design', 'Validation SIL'],
  },
  {
    id: 'tools',
    index: 'M06',
    title: { fr: 'Outils', en: 'Tools' },
    items: ['Python', 'Git', 'Linux', 'VS Code'],
  },
]

/* ------------------------------------------------------------------ */
/* F. Education, certifications, languages                             */
/* ------------------------------------------------------------------ */

export const education = [
  {
    id: 'ensa',
    title: {
      fr: "Cycle d'ingénieur d'État en Mécatronique",
      en: "State engineer's degree in Mechatronics",
    } satisfies L,
    school: { fr: 'ENSA Tétouan', en: 'ENSA Tetouan' } satisfies L,
    period: { fr: '2023 – présent', en: '2023 – present' } satisfies L,
  },
  {
    id: 'cpge',
    title: {
      fr: "Classes préparatoires aux grandes écoles — Mathématiques et Physique",
      en: 'Preparatory classes — Mathematics and Physics',
    } satisfies L,
    school: { fr: 'Maroc', en: 'Morocco' } satisfies L,
    period: { fr: '2021 – 2023', en: '2021 – 2023' } satisfies L,
  },
  {
    id: 'bac',
    title: {
      fr: 'Baccalauréat Sciences Mathématiques',
      en: 'High-school diploma, Mathematics',
    } satisfies L,
    school: { fr: 'Maroc', en: 'Morocco' } satisfies L,
    period: { fr: '2021', en: '2021' } satisfies L,
  },
]

export const certifications = [
  {
    id: 'abb',
    title: { fr: 'Robotique industrielle — ABB', en: 'Industrial robotics — ABB' } satisfies L,
    issuer: 'Udemy',
    year: '2025',
  },
  {
    id: 'ge',
    title: {
      fr: "Job simulation en ingénierie électrique",
      en: 'Electrical engineering job simulation',
    } satisfies L,
    issuer: 'GE Aerospace',
    year: '2026',
  },
  {
    id: 'datacamp',
    title: {
      fr: "Travailler avec l'API OpenAI",
      en: 'Working with the OpenAI API',
    } satisfies L,
    issuer: 'DataCamp',
    year: '2025',
  },
]

export const spokenLanguages = [
  {
    id: 'ar',
    name: { fr: 'Arabe', en: 'Arabic' } satisfies L,
    level: { fr: 'Langue maternelle', en: 'Native' } satisfies L,
  },
  {
    id: 'fr',
    name: { fr: 'Français', en: 'French' } satisfies L,
    level: { fr: 'Courant', en: 'Fluent' } satisfies L,
  },
  {
    id: 'en',
    name: { fr: 'Anglais', en: 'English' } satisfies L,
    level: { fr: 'Courant', en: 'Fluent' } satisfies L,
  },
]

/* ------------------------------------------------------------------ */
/* G. Contact — the only place where the profile links appear          */
/* ------------------------------------------------------------------ */

export const contact = {
  kicker: {
    fr: 'Ouvert aux opportunités en automatisme industriel et systèmes embarqués',
    en: 'Open to opportunities in industrial automation and embedded systems',
  } satisfies L,
  mailSubject: {
    fr: 'Candidature — automatisme industriel / systèmes embarqués',
    en: 'Application — industrial automation / embedded systems',
  } satisfies L,
  mailBody: {
    fr: "Bonjour Soufyane,\n\nJe vous contacte au sujet de ",
    en: 'Hello Soufyane,\n\nI am reaching out about ',
  } satisfies L,
  mailBodyTail: {
    fr: '\n\n---\nEnvoyé depuis elaounisoufyane.space',
    en: '\n\n---\nSent from elaounisoufyane.space',
  } satisfies L,
  form: {
    name: { fr: 'Nom', en: 'Name' } satisfies L,
    company: { fr: 'Société', en: 'Company' } satisfies L,
    subject: { fr: 'Objet', en: 'Subject' } satisfies L,
    message: { fr: 'Message', en: 'Message' } satisfies L,
    send: { fr: 'Ouvrir dans ma messagerie', en: 'Open in my mail app' } satisfies L,
    hint: {
      fr: "Ce formulaire n'envoie rien à un serveur : il prépare un e-mail dans votre client de messagerie, que vous pouvez relire avant l'envoi.",
      en: 'This form sends nothing to a server: it prepares an email in your mail client, which you can review before sending.',
    } satisfies L,
    required: { fr: 'Requis', en: 'Required' } satisfies L,
    optional: { fr: 'Facultatif', en: 'Optional' } satisfies L,
    invalid: {
      fr: 'Renseignez votre nom, un objet et un message.',
      en: 'Please fill in your name, a subject and a message.',
    } satisfies L,
  } satisfies Record<string, unknown>,
  links: {
    email: { fr: 'E-mail', en: 'Email' } satisfies L,
    phone: { fr: 'Téléphone', en: 'Phone' } satisfies L,
    linkedin: { fr: 'LinkedIn', en: 'LinkedIn' } satisfies L,
    github: { fr: 'GitHub', en: 'GitHub' } satisfies L,
    site: { fr: 'Site', en: 'Website' } satisfies L,
  } satisfies Record<string, unknown>,
  copy: { fr: 'Copier', en: 'Copy' } satisfies L,
  copied: { fr: 'Copié', en: 'Copied' } satisfies L,
  copyFailed: { fr: 'Copie impossible', en: 'Copy failed' } satisfies L,
  open: {
    fr: 'Ouvrir dans un nouvel onglet',
    en: 'Open in a new tab',
  } satisfies L,
}

/* ------------------------------------------------------------------ */
/* UI copy                                                             */
/* ------------------------------------------------------------------ */

export const ui = {
  skipToContent: { fr: 'Aller au contenu principal', en: 'Skip to main content' } satisfies L,
  menu: { fr: 'Menu', en: 'Menu' } satisfies L,
  close: { fr: 'Fermer', en: 'Close' } satisfies L,
  backToTop: { fr: 'Retour en haut', en: 'Back to top' } satisfies L,
  sections: {
    hero: { fr: 'Accueil', en: 'Home' } satisfies L,
    bref: { fr: 'En bref', en: 'At a glance' } satisfies L,
    experience: { fr: 'Expérience', en: 'Experience' } satisfies L,
    projects: { fr: 'Projets', en: 'Projects' } satisfies L,
    skills: { fr: 'Compétences', en: 'Skills' } satisfies L,
    parcours: { fr: 'Formation', en: 'Education' } satisfies L,
    certifications: { fr: 'Certifications', en: 'Certifications' } satisfies L,
    languages: { fr: 'Langues', en: 'Languages' } satisfies L,
    contact: { fr: 'Contact', en: 'Contact' } satisfies L,
  } satisfies Record<string, unknown>,
  sectionHeadings: {
    bref: { fr: 'En bref', en: 'At a glance' } satisfies L,
    experience: {
      fr: 'Expérience et engagements',
      en: 'Experience and commitments',
    } satisfies L,
    projects: { fr: "Projets d'ingénierie", en: 'Engineering projects' } satisfies L,
    skills: { fr: 'Compétences techniques', en: 'Technical skills' } satisfies L,
    parcours: { fr: 'Formation, certifications et langues', en: 'Education, certifications and languages' } satisfies L,
    contact: { fr: 'Contact', en: 'Contact' } satisfies L,
  } satisfies Record<string, unknown>,
  sectionLeads: {
    bref: {
      fr: "Quatre mesures tirées du travail réel, pas d'estimations.",
      en: 'Four figures taken from real work, not estimates.',
    } satisfies L,
    experience: {
      fr: "Stages de terrain et engagements associatifs, du plus récent au plus ancien.",
      en: 'Field internships and community commitments, most recent first.',
    } satisfies L,
    projects: {
      fr: 'Trois projets, avec leur contexte et ce qu’ils démontrent.',
      en: 'Three projects, with their context and what they demonstrate.',
    } satisfies L,
    skills: {
      fr: 'Six modules, des langages d’automatisme aux protocoles embarqués.',
      en: 'Six modules, from automation languages to embedded protocols.',
    } satisfies L,
    parcours: {
      fr: 'Parcours académique, certifications et langues.',
      en: 'Academic path, certifications and languages.',
    } satisfies L,
    contact: {
      fr: 'Le plus rapide est un message direct.',
      en: 'The fastest route is a direct message.',
    } satisfies L,
  } satisfies Record<string, unknown>,
  details: { fr: 'Voir le détail', en: 'View details' } satisfies L,
  closeDialog: { fr: 'Fermer la fenêtre', en: 'Close dialog' } satisfies L,
  contextStack: { fr: 'Technologies', en: 'Technologies' } satisfies L,
  gallery: { fr: 'Galerie', en: 'Gallery' } satisfies L,
  galleryEmpty: {
    fr: 'Visuel de travail à venir. Le schéma ci-dessus illustre le principe.',
    en: 'Work visual coming soon. The schematic above illustrates the principle.',
  } satisfies L,
  palette: {
    trigger: { fr: 'Navigation rapide', en: 'Quick navigation' } satisfies L,
    title: { fr: 'Aller à', en: 'Go to' } satisfies L,
    hint: { fr: 'Tapez une section ou choisissez une action', en: 'Type a section or pick an action' } satisfies L,
    empty: { fr: 'Aucun résultat', en: 'No result' } satisfies L,
    language: { fr: 'Langue', en: 'Language' } satisfies L,
    downloadCv: { fr: 'Télécharger le CV', en: 'Download CV' } satisfies L,
    contact: { fr: 'Aller au contact', en: 'Go to contact' } satisfies L,
    backToTop: { fr: 'Retour en haut', en: 'Back to top' } satisfies L,
    legend: {
      navigate: { fr: 'naviguer', en: 'navigate' } satisfies L,
      open: { fr: 'ouvrir', en: 'open' } satisfies L,
      close: { fr: 'fermer', en: 'close' } satisfies L,
    } satisfies Record<string, unknown>,
  } satisfies Record<string, unknown>,
  /** The shortcuts dialog: every key that does something on this site. */
  shortcuts: {
    title: { fr: 'Raccourcis clavier', en: 'Keyboard shortcuts' } satisfies L,
    trigger: { fr: 'Raccourcis', en: 'Shortcuts' } satisfies L,
    lead: {
      fr: 'Le site se parcourt entièrement au clavier, sans souris.',
      en: 'The whole site can be traversed from the keyboard, no mouse needed.',
    } satisfies L,
    note: {
      fr: "Les animations suivent le réglage système « réduire les animations » : désactivé, le site s'affiche à l'état final.",
      en: 'Animations follow the system "reduce motion" setting: switch it on and the site renders in its final state.',
    } satisfies L,
    rows: [
      {
        id: 'palette',
        keys: ['Ctrl', 'K'],
        action: { fr: 'Ouvrir la navigation rapide', en: 'Open quick navigation' } satisfies L,
      },
      {
        id: 'arrows',
        keys: ['↑', '↓'],
        action: { fr: 'Se déplacer dans la liste', en: 'Move through the list' } satisfies L,
      },
      {
        id: 'enter',
        keys: ['↵'],
        action: { fr: 'Ouvrir la sélection', en: 'Open the selection' } satisfies L,
      },
      {
        id: 'modules',
        keys: ['←', '→'],
        action: { fr: 'Changer de module de compétences', en: 'Change skill module' } satisfies L,
      },
      {
        id: 'tab',
        keys: ['Tab'],
        action: { fr: 'Aller à l’élément suivant', en: 'Move to the next element' } satisfies L,
      },
      {
        id: 'escape',
        keys: ['Échap'],
        action: { fr: 'Fermer la fenêtre', en: 'Close the dialog' } satisfies L,
      },
    ] satisfies Record<string, unknown>[],
  } satisfies Record<string, unknown>,
  footer: {
    built: { fr: 'Conçu et développé par Soufyane Elaouni', en: 'Designed and built by Soufyane Elaouni' } satisfies L,
  } satisfies Record<string, unknown>,
} satisfies Record<string, unknown>

/** Ordered section registry: drives the nav, the data bus nodes and the palette. */
export const sections = [
  { id: 'hero', key: 'hero' },
  { id: 'en-bref', key: 'bref' },
  { id: 'experience', key: 'experience' },
  { id: 'projects', key: 'projects' },
  { id: 'skills', key: 'skills' },
  { id: 'parcours', key: 'parcours' },
  { id: 'contact', key: 'contact' },
] as const

export type SectionId = (typeof sections)[number]['id']