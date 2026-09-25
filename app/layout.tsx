import type { Metadata, Viewport } from 'next'
import { Inter, JetBrains_Mono, Space_Grotesk } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { LanguageProvider } from '@/components/portfolio/language-provider'
import { site } from '@/lib/portfolio-data'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: 'Soufyane Elaouni — Élève ingénieur en Mécatronique | Automatisme industriel & Systèmes embarqués',
    template: '%s | Soufyane Elaouni',
  },
  description:
    "Portfolio de Soufyane Elaouni, élève ingénieur en dernière année de Mécatronique à l'ENSA Tétouan : automatisme industriel (Siemens TIA Portal, WinCC, mise en service) et systèmes embarqués (diagnostic automobile ESP32, CAN/UDS, contrôle temps réel). Stage en cours chez Renault Technology Morocco.",
  keywords: [
    'Soufyane Elaouni',
    'Mécatronique',
    'Mechatronics',
    'ENSA Tétouan',
    'Automatisme industriel',
    'Systèmes embarqués',
    'Siemens TIA Portal',
    'WinCC',
    'CAN bus',
    'UDS',
    'ESP32',
    'STM32',
    'Diagnostic automobile',
    'Renault Technology Morocco',
  ],
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  alternates: { canonical: '/' },
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/icon-light-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: '/apple-icon.png',
  },
  manifest: '/manifest.webmanifest',
  openGraph: {
    type: 'profile',
    url: site.url,
    siteName: 'SoufyaneOS',
    locale: 'fr_MA',
    alternateLocale: ['en_US'],
    title: 'Soufyane Elaouni — Mécatronique | Automatisme industriel & Systèmes embarqués',
    description:
      "Stagiaire en diagnostic automobile chez Renault Technology Morocco. Automatisme industriel (TIA Portal, WinCC) et systèmes embarqués (ESP32, CAN/UDS, MATLAB/Simulink).",
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Soufyane Elaouni — Mécatronique | Automatisme & Systèmes embarqués',
    description:
      'Diagnostic automobile embarqué (CAN/UDS), automatisme industriel Siemens TIA Portal / WinCC, systèmes embarqués ESP32 & STM32.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
  category: 'portfolio',
}

export const viewport: Viewport = {
  themeColor: '#07070f',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr" className={`${inter.variable} ${jetbrainsMono.variable} ${spaceGrotesk.variable}`}>
      <body className="bg-[#07070f] font-sans text-[#e8e8f0] antialiased">
        <LanguageProvider>{children}</LanguageProvider>
        {process.env.VERCEL === '1' && <Analytics />}
      </body>
    </html>
  )
}
