import type { Metadata } from 'next'
import { OsDesktop } from './os-desktop'

export const metadata: Metadata = {
  title: 'SoufyaneOS — Interactive desktop',
  description:
    "The interactive SoufyaneOS desktop: open the whoami, projects, experience, skills and contact windows of Soufyane Elaouni, mechatronics engineering student at ENSA Tétouan.",
  alternates: { canonical: '/os' },
  // The canonical, indexable version of the CV lives on the home page.
  robots: { index: false, follow: true },
  // The root metadata points its social cards at "/", so this route has to
  // restate them or a shared link would preview the wrong page.
  openGraph: {
    type: 'website',
    url: '/os',
    title: 'SoufyaneOS — Interactive desktop',
    description:
      'Open the whoami, projects, experience, skills and contact windows of Soufyane Elaouni, mechatronics engineering student at ENSA Tétouan.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SoufyaneOS — Interactive desktop',
    description:
      'Open the whoami, projects, experience, skills and contact windows of Soufyane Elaouni, mechatronics engineering student at ENSA Tétouan.',
  },
}

export default function OsPage() {
  return <OsDesktop />
}
