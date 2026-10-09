import { ImageResponse } from 'next/og'

export const alt = 'Soufyane Elaouni — Automatisme industriel & systèmes embarqués'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

/**
 * Cream and terracotta, matching the site palette. Drawn with flat fills
 * only: ImageResponse supports a small subset of CSS, so the grain and
 * gradients of the page cannot be reproduced here.
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
          background: '#faf7f2',
          color: '#2b2d42',
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
                border: '2px solid #b04a2e',
                color: '#b04a2e',
                fontSize: 22,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              SE
            </div>
            <div style={{ display: 'flex', fontSize: 22, letterSpacing: 6, color: '#b04a2e' }}>
              MÉCATRONIQUE
            </div>
          </div>
          <div style={{ display: 'flex', fontSize: 84, fontWeight: 700, lineHeight: 1.05 }}>
            Soufyane Elaouni
          </div>
          <div style={{ display: 'flex', fontSize: 34, color: '#b04a2e' }}>
            Élève ingénieur en Mécatronique
          </div>
          <div style={{ display: 'flex', fontSize: 26, color: '#5c6078' }}>
            Automatisme industriel &amp; systèmes embarqués — ENSA Tétouan
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderTop: '1px solid #e3dacb',
            paddingTop: 28,
            fontSize: 22,
            color: '#5c6078',
          }}
        >
          <div style={{ display: 'flex' }}>TIA Portal · WinCC · CAN/UDS · ESP32 · STM32</div>
          <div style={{ display: 'flex', color: '#b04a2e' }}>elaounisoufyane.space</div>
        </div>
      </div>
    ),
    { ...size },
  )
}