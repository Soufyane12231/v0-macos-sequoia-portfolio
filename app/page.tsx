import {
  certifications,
  projects,
  seo,
  site,
  skillGroups,
} from '@/lib/portfolio-data'
import { OnePage } from '@/components/onepage/one-page'

/**
 * Static, developer-authored structured data.
 *
 * It is a literal built from the same content module the page renders, so it
 * cannot drift from what a reader sees, and it ships inside the HTML response
 * for crawlers that never execute JavaScript.
 */
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: site.name,
  jobTitle: site.role.fr,
  description: seo.description.fr,
  url: site.url,
  email: `mailto:${site.email}`,
  telephone: site.phone,
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Tétouan',
    addressCountry: 'MA',
  },
  alumniOf: {
    '@type': 'CollegeOrUniversity',
    name: 'ENSA Tétouan',
  },
  worksFor: {
    '@type': 'Organization',
    name: 'Renault Technology Morocco',
  },
  knowsLanguage: ['ar', 'fr', 'en'],
  knowsAbout: [...skillGroups.flatMap((group) => group.items), ...projects.flatMap((p) => p.tags)],
  hasCredential: certifications.map((cert) => ({
    '@type': 'EducationalOccupationalCredential',
    name: cert.title.fr,
    credentialCategory: 'certification',
    recognizedBy: { '@type': 'Organization', name: cert.issuer },
  })),
  sameAs: [site.links.linkedin, site.links.github],
}

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <OnePage />
    </>
  )
}