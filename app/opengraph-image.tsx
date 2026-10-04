import { ImageResponse } from 'next/og'

export const alt = 'Soufyane Elaouni — Automatisme industriel & systèmes embarqués'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

/**
 * Petrol and sand, matching the site palette. Drawn with flat fills only:
 * ImageResponse supports a small subset of CSS, so the grain and gradients of
 * the page cannot be reproduced here.
 */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#05181a',
          color: '#d2eae4',
          padding: 72,
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
            <div
              style={{
                display: 'flex',
                width: 56,
                height: 56,
                border: '2px solid #fecb9b',
                color: '#fecb9b',
                fontSize: 22,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              SE
            </div>
            <div style={{ display: 'flex', fontSize: 22, letterSpacing: 6, color: '#fecb9b' }}>
              MÉCATRONIQUE
            </div>
          </div>
          <div style={{ display: 'flex', fontSize: 84, fontWeight: 700, lineHeight: 1.05 }}>
            Soufyane Elaouni
          </div>
          <div style={{ display: 'flex', fontSize: 34, color: '#fecb9b' }}>
            Élève ingénieur en Mécatronique
          </div>
          <div style={{ display: 'flex', fontSize: 26, color: '#8fb3ae' }}>
            Automatisme industriel &amp; systèmes embarqués — ENSA Tétouan
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderTop: '1px solid #1d5454',
            paddingTop: 28,
            fontSize: 22,
            color: '#8fb3ae',
          }}
        >
          <div style={{ display: 'flex' }}>TIA Portal · WinCC · CAN/UDS · ESP32 · STM32</div>
          <div style={{ display: 'flex', color: '#fecb9b' }}>elaounisoufyane.space</div>
        </div>
      </div>
    ),
    { ...size },
  )
}