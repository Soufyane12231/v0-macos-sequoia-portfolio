import { PortfolioSite } from '@/components/portfolio/portfolio-site'
import { profile, site } from '@/lib/portfolio-data'

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: site.name,
  alternateName: 'SoufyaneOS',
  jobTitle: site.role.fr,
  description: profile.summary.fr,
  url: site.url,
  image: `${site.url}/profile.jpeg`,
  email: `mailto:${site.email}`,
  telephone: site.phone,
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Tétouan',
    addressCountry: 'MA',
  },
  // Current affiliations (student + intern), not past ones.
  affiliation: [
    {
      '@type': 'CollegeOrUniversity',
      name: 'ENSA Tétouan',
    },
    {
      '@type': 'Organization',
      name: 'Renault Technology Morocco (RTMA)',
    },
  ],
  knowsLanguage: ['ar', 'fr', 'en'],
  knowsAbout: [
    'Automatisme industriel',
    'Siemens TIA Portal',
    'Supervision WinCC',
    'Systèmes embarqués',
    'Diagnostic automobile',
    'CAN bus',
    'CAN FD',
    'UDS',
    'ISO-TP',
    'ESP32',
    'STM32',
    'MATLAB / Simulink',
    'FPGA',
  ],
  sameAs: [site.links.linkedin, site.links.github],
}

export default function Page() {
  return (
    <>
      {/* Static, developer-authored JSON-LD describing the CV profile. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PortfolioSite />
    </>
  )
}
