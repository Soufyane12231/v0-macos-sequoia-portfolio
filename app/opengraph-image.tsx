import { ImageResponse } from 'next/og'

export const alt = 'Soufyane Elaouni — Automatisme industriel & systèmes embarqués'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

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
          background: '#07070f',
          color: '#e8e8f0',
          padding: 72,
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          <div style={{ display: 'flex', fontSize: 24, color: '#00f0ff', letterSpacing: 4 }}>
            SOUFYANEOS / PORTFOLIO
          </div>
          <div style={{ display: 'flex', fontSize: 76, fontWeight: 700, lineHeight: 1.05 }}>
            Soufyane Elaouni
          </div>
          <div style={{ display: 'flex', fontSize: 36, color: '#00f0ff' }}>
            Élève ingénieur en Mécatronique
          </div>
          <div style={{ display: 'flex', fontSize: 28, color: '#9aa0b5' }}>
            Automatisme industriel &amp; systèmes embarqués — ENSA Tétouan
          </div>
        </div>
        <div style={{ display: 'flex', fontSize: 24, color: '#00ff88' }}>
          TIA Portal · WinCC · CAN/UDS · ESP32 · STM32 · MATLAB/Simulink
        </div>
      </div>
    ),
    { ...size },
  )
}
