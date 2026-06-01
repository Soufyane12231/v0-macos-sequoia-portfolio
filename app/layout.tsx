import type { Metadata, Viewport } from 'next'
import { Inter, JetBrains_Mono, Space_Grotesk } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter'
})

const jetbrainsMono = JetBrains_Mono({ 
  subsets: ['latin'],
  variable: '--font-jetbrains'
})

const spaceGrotesk = Space_Grotesk({ 
  subsets: ['latin'],
  variable: '--font-space'
})

export const metadata: Metadata = {
  title: 'SoufyaneOS | Soufyane Elaouni - Mechatronics Engineer',
  description: 'Interactive macOS-style portfolio for Soufyane Elaouni - Embedded Systems, Industrial AI, Control Theory specialist at ENSA Tétouan',
  keywords: ['Mechatronics', 'Embedded Systems', 'STM32', 'ESP32', 'CAN Bus', 'FPGA', 'Industrial AI', 'Control Systems'],
  authors: [{ name: 'Soufyane Elaouni' }],
  openGraph: {
    title: 'SoufyaneOS | Mechatronics Engineer Portfolio',
    description: 'Interactive macOS-style portfolio showcasing embedded systems and industrial automation projects',
    type: 'website',
  },
}

export const viewport: Viewport = {
  themeColor: '#07070f',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable} ${spaceGrotesk.variable}`}>
      <body className="font-sans antialiased bg-[#07070f] overflow-hidden">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
