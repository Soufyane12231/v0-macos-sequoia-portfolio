import type { Metadata, Viewport } from 'next'
import { Inter, JetBrains_Mono, Space_Grotesk } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { LanguageProvider } from '@/components/portfolio/language-provider'
import { seo, site } from '@/lib/portfolio-data'
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
    default: seo.title.fr,
    template: '%s | Soufyane Elaouni',
  },
  description: seo.description.fr,
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
  publisher: site.name,
  alternates: {
    canonical: '/',
    languages: { 'fr-FR': '/', 'en': '/' },
  },
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
    siteName: 'Soufyane Elaouni',
    locale: 'fr_MA',
    alternateLocale: ['en_US'],
    title: seo.ogTitle.fr,
    description: seo.ogDescription.fr,
    images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: seo.ogTitle.fr }],
  },
  twitter: {
    card: 'summary_large_image',
    title: seo.ogTitle.fr,
    description: seo.ogDescription.fr,
    images: ['/opengraph-image'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
  category: 'portfolio',
}

export const viewport: Viewport = {
  themeColor: '#05181a',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    // `lang` is updated client-side by LanguageProvider; French is the default
    // because it matches the CV and the primary audience.
    <html lang="fr" className={`${inter.variable} ${jetbrainsMono.variable} ${spaceGrotesk.variable}`}>
      <body className="bg-brin font-sans text-menthe antialiased">
        <LanguageProvider>{children}</LanguageProvider>
        {process.env.VERCEL === '1' && <Analytics />}
      </body>
    </html>
  )
}