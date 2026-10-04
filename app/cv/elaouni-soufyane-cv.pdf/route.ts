/**
 * The CV is served from a single canonical path — /elaouni-soufyane-cv.pdf.
 * The older /cv/elaouni-soufyane-cv.pdf URL is kept alive as a permanent
 * redirect so links already shared in emails, applications and LinkedIn do not
 * break. 308 preserves the method and is cacheable.
 */
export function GET() {
  return new Response(null, {
    status: 308,
    headers: { Location: '/elaouni-soufyane-cv.pdf' },
  })
}