/**
 * Hand-drawn SVG line art.
 *
 * Two jobs:
 *  1. Visual stand-ins for the media that does not exist yet. Every one of
 *     these is sized and framed like a technical drawing, so dropping a real
 *     photograph into the same frame is a pure asset swap with no layout work.
 *  2. The animated "engineering" substrate of the page (bus trace, grid,
 *     ladder, beam). All of it is decorative: `aria-hidden`, `focusable=false`,
 *     zero bytes of raster media, and a static frame under reduced motion.
 *
 * No emoji. No external icon font. Stroke colours come from the CSS custom
 * properties so the palette stays in one place.
 */

import type { CSSProperties } from 'react'

const S = {
  line: 'var(--line)',
  soft: 'var(--line-soft)',
  ink: 'var(--menthe)',
  muted: 'var(--muted)',
  sand: 'var(--sable)',
  tan: 'var(--tan)',
  signal: 'var(--signal)',
} as const

const DECO = { 'aria-hidden': true, focusable: false } as const

type Variant = {
  className?: string
  style?: CSSProperties
}

/* ================================================================== */
/* 1. Background bus trace — the signature motif                        */
/* ================================================================== */

/**
 * The vertical data bus that traces itself as the reader scrolls. `progress`
 * (0..1) controls how much of the bus is "carried"; `activeId` highlights the
 * node belonging to the section currently in view.
 */
export function BusTrace({
  progress,
  activeId,
  nodes,
}: {
  progress: number
  activeId: string
  nodes: { id: string; y: number }[]
}) {
  const H = 1000
  const carried = Math.max(0, Math.min(1, progress)) * H
  return (
    <svg
      {...DECO}
      className="pointer-events-none absolute inset-0 h-full w-full"
      viewBox={`0 0 100 ${H}`}
      preserveAspectRatio="none"
    >
      {/* carriage, always full height at 6% opacity */}
      <line x1="14" y1="0" x2="14" y2={H} stroke={S.soft} strokeWidth="1" vectorEffect="non-scaling-stroke" opacity="0.7" />
      {/* signature: the part the bus has actually reached */}
      <line
        x1="14"
        y1="0"
        x2="14"
        y2={carried}
        stroke={S.sand}
        strokeWidth="2"
        vectorEffect="non-scaling-stroke"
      />
      {/* dual lane, the "return" wire */}
      <line x1="18" y1="0" x2="18" y2={Math.max(0, carried - 8)} stroke={S.tan} strokeWidth="1" vectorEffect="non-scaling-stroke" opacity="0.55" />
      {nodes.map((n) => {
        const lit = n.id === activeId
        return (
          <g key={n.id} transform={`translate(0 ${n.y})`}>
            <line x1="14" y1="0" x2="26" y2="0" stroke={S.line} strokeWidth="1" vectorEffect="non-scaling-stroke" />
            <circle
              cx="14"
              cy="0"
              r={lit ? 4.5 : 2.6}
              fill={lit ? S.sand : 'var(--brin)'}
              stroke={lit ? S.sand : S.line}
              strokeWidth="1.5"
              vectorEffect="non-scaling-stroke"
            />
            <line x1="20" y1="0" x2="20" y2="4" stroke={lit ? S.tan : S.line} strokeWidth="1" vectorEffect="non-scaling-stroke" />
          </g>
        )
      })}
    </svg>
  )
}

/* ================================================================== */
/* 2. Hero portrait frame — dimension lines that draw themselves         */
/* ================================================================== */

export function PortraitFrame({
  src,
  alt,
  children,
}: {
  src?: string
  alt: string
  children?: React.ReactNode
}) {
  return (
    <div className="relative">
      <svg {...DECO} className="pointer-events-none absolute -inset-5 h-[calc(100%+2.5rem)] w-[calc(100%+2.5rem)]" viewBox="0 0 100 130" preserveAspectRatio="none">
        {/* corner brackets */}
        {[
          'M2 14 L2 2 L14 2',
          'M86 2 L98 2 L98 14',
          'M98 116 L98 128 L86 128',
          'M14 128 L2 128 L2 116',
        ].map((d) => (
          <path key={d} d={d} fill="none" stroke={S.tan} strokeWidth="0.6" vectorEffect="non-scaling-stroke" />
        ))}
        {/* vertical dimension line with ticks */}
        <line x1="97" y1="2" x2="97" y2="128" stroke={S.line} strokeWidth="0.4" vectorEffect="non-scaling-stroke" />
        <line x1="94.5" y1="2" x2="99.5" y2="2" stroke={S.line} strokeWidth="0.4" vectorEffect="non-scaling-stroke" />
        <line x1="94.5" y1="128" x2="99.5" y2="128" stroke={S.line} strokeWidth="0.4" vectorEffect="non-scaling-stroke" />
        {/* horizontal dimension line */}
        <line x1="2" y1="131" x2="98" y2="131" stroke={S.line} strokeWidth="0.4" vectorEffect="non-scaling-stroke" />
        <line x1="2" y1="128.5" x2="2" y2="133.5" stroke={S.line} strokeWidth="0.4" vectorEffect="non-scaling-stroke" />
        <line x1="98" y1="128.5" x2="98" y2="133.5" stroke={S.line} strokeWidth="0.4" vectorEffect="non-scaling-stroke" />
      </svg>

      <div className="relative aspect-[4/5] overflow-hidden border border-line bg-brin-deep">
        {src ? (
          // Real media and the placeholder occupy the exact same box: swapping
          // one for the other is an asset change, not a layout change.
          <img
            src={src}
            alt={alt}
            className="h-full w-full object-cover"
            style={{ objectPosition: 'center 22%' }}
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-[radial-gradient(ellipse_at_50%_35%,#0d3a3b_0%,#05181a_70%)]">
            <span
              className="font-display text-[4.5rem] leading-none font-medium tracking-tight text-sable/85 select-none"
              aria-hidden="true"
            >
              SE
            </span>
            <span className="mono text-[0.6rem] tracking-[0.3em] text-muted uppercase">{alt}</span>
          </div>
        )}

        {/* scan line: one pass on load, then it is gone */}
        <div {...DECO} className="scan-once pointer-events-none absolute inset-x-0 top-0 h-px bg-sable/70 shadow-[0_0_12px_2px] shadow-sable/30" />
        {/* engineering reticle over the portrait */}
        <svg {...DECO} className="pointer-events-none absolute inset-0 h-full w-full" viewBox="0 0 100 125" preserveAspectRatio="none">
          <line x1="50" y1="0" x2="50" y2="125" stroke={S.sand} strokeWidth="0.3" vectorEffect="non-scaling-stroke" opacity="0.22" />
          <line x1="0" y1="62.5" x2="100" y2="62.5" stroke={S.sand} strokeWidth="0.3" vectorEffect="non-scaling-stroke" opacity="0.22" />
          <circle cx="50" cy="62.5" r="21" fill="none" stroke={S.sand} strokeWidth="0.3" vectorEffect="non-scaling-stroke" opacity="0.18" />
          <circle cx="50" cy="62.5" r="30" fill="none" stroke={S.sand} strokeWidth="0.3" vectorEffect="non-scaling-stroke" opacity="0.12" />
        </svg>
      </div>

      <svg {...DECO} className="pointer-events-none absolute -bottom-4 left-1/2 h-8 w-px -translate-x-1/2" viewBox="0 0 1 32" preserveAspectRatio="none">
        <line x1="0.5" y1="0" x2="0.5" y2="32" stroke={S.tan} strokeWidth="1" vectorEffect="non-scaling-stroke" />
        <line x1="0" y1="32" x2="1" y2="32" stroke={S.tan} strokeWidth="1" vectorEffect="non-scaling-stroke" />
      </svg>

      {children}
    </div>
  )
}

/* ================================================================== */
/* 3. 19 s vs 10 min — the duel                                          */
/* ================================================================== */

/**
 * Two bars on a shared baseline. The "before" bar is the full track, the
 * "after" bar is 19 s of it — a 3.2% sliver, which is the whole point.
 * `playing` restarts the animation; `runId` changes force a remount key.
 */
export function DuelChart({
  before,
  after,
  playing,
  playId,
}: {
  before: string
  after: string
  playing: boolean
  playId: number
}) {
  // 19 s out of 600 s = 3.17%. Drawn at a 4% floor so the label stays legible.
  const afterPct = 6
  return (
    <div key={playId} className="flex flex-col gap-5">
      <Row label={before} pct={100} variant="before" playing={playing} />
      <Row label={after} pct={afterPct} variant="after" playing={playing} delay={320} />
    </div>
  )
}

function Row({
  label,
  pct,
  variant,
  playing,
  delay = 0,
}: {
  label: string
  pct: number
  variant: 'before' | 'after'
  playing: boolean
  delay?: number
}) {
  return (
    <div>
      <div className="mono mb-1.5 flex items-baseline justify-between text-[0.7rem] tracking-[0.12em] uppercase">
        {/* Both classes, not either/or: `.duel-label` supplies the dark-panel
            default and `.duel-label-after` recolours it, so the same markup
            reads correctly on either substrate. */}
        <span className={`duel-label${variant === 'after' ? ' duel-label-after' : ''}`}>{label}</span>
      </div>
      <div className="relative h-2 w-full overflow-hidden border border-line" style={{ background: 'color-mix(in srgb, var(--brin-deep) 70%, transparent)' }}>
        <div
          className="bar-grow absolute inset-y-0 left-0 origin-left"
          style={
            {
              width: `${pct}%`,
              '--bd': `${delay}ms`,
              background:
                variant === 'after'
                  ? 'linear-gradient(90deg, var(--sable), var(--tan))'
                  : 'color-mix(in srgb, var(--line) 70%, transparent)',
            } as CSSProperties
          }
        />
      </div>
    </div>
  )
}

/* ================================================================== */
/* 4. Nine nodes on the bus                                             */
/* ================================================================== */

const NODE_X = [6, 17, 28, 39, 50, 61, 72, 83, 94] as const

/** Nine control units on one CAN line, with an impulse that walks the bus. */
export function EcuBus({ running }: { running: boolean }) {
  return (
    <svg {...DECO} className={`h-24 w-full ${running ? 'bus-run' : ''}`} viewBox="0 0 100 34" preserveAspectRatio="none">
      <line x1="2" y1="17" x2="98" y2="17" stroke={S.line} strokeWidth="1" vectorEffect="non-scaling-stroke" />
      {/* stub to the tester */}
      <line x1="2" y1="17" x2="2" y2="31" stroke={S.tan} strokeWidth="1" vectorEffect="non-scaling-stroke" />
      <rect x="0" y="30" width="4" height="4" fill="none" stroke={S.tan} strokeWidth="1" vectorEffect="non-scaling-stroke" />
      {NODE_X.map((x, i) => (
        <g key={x}>
          <line x1={x} y1="17" x2={x} y2="9" stroke={S.line} strokeWidth="1" vectorEffect="non-scaling-stroke" />
          <rect
            className="node"
            style={{ '--nd': `${220 + i * 200}ms`, transformBox: 'fill-box', transformOrigin: 'center' } as CSSProperties}
            x={x - 3}
            y="3"
            width="6"
            height="6"
            fill="var(--brin)"
            stroke={S.line}
            strokeWidth="1.2"
            vectorEffect="non-scaling-stroke"
          />
          <line x1={x} y1="9" x2={x} y2="14.5" stroke={S.line} strokeWidth="1" vectorEffect="non-scaling-stroke" />
        </g>
      ))}
      {/* the travelling impulse */}
      <g className="impulse" style={{ '--travel': '440px' } as CSSProperties}>
        <circle cx="2" cy="17" r="2.6" fill={S.sand} />
        <circle cx="2" cy="17" r="5" fill="none" stroke={S.sand} strokeWidth="0.8" opacity="0.5" />
      </g>
    </svg>
  )
}

/* ================================================================== */
/* 5. Dot grid — 80+ students                                            */
/* ================================================================== */

/**
 * A 12 x 7 matrix (84 dots). Lit dots stand for the students actually
 * trained; the animation staggers them on. The count itself lives in the
 * HTML text above, never only in this graphic.
 */
export function DotGrid({ running }: { running: boolean }) {
  const cols = 12
  const rows = 7
  const total = cols * rows
  return (
    <svg {...DECO} className={`h-20 w-full ${running ? 'dots-on' : ''}`} viewBox="0 0 120 40" preserveAspectRatio="none">
      {Array.from({ length: total }, (_, i) => {
        const cx = 6 + (i % cols) * 10
        const cy = 6 + Math.floor(i / cols) * 5.4
        return (
          <circle
            key={i}
            className="dot"
            style={
              {
                '--dd': `${120 + i * 9}ms`,
                transformBox: 'fill-box',
                transformOrigin: 'center',
              } as CSSProperties
            }
            cx={cx}
            cy={cy}
            r="1.7"
            fill={i % 7 === 3 ? S.sand : S.line}
          />
        )
      })}
    </svg>
  )
}

/* ================================================================== */
/* 6. Ladder logic — Holcim micro-animation                             */
/* ================================================================== */

/**
 * Six rungs of PLC ladder. On hover the contacts close and the coils light.
 * Purely a reading aid for the Holcim card; the words describing the sequence
 * are in the dialog text.
 */
export function LadderDiagram() {
  const rungs = [0, 1, 2, 3, 4, 5]
  return (
    <svg {...DECO} className="live-hover h-full w-full" viewBox="0 0 200 120" preserveAspectRatio="xMidYMid meet">
      {/* power rails */}
      <line x1="10" y1="2" x2="10" y2="118" stroke={S.tan} strokeWidth="1.4" vectorEffect="non-scaling-stroke" />
      <line x1="190" y1="2" x2="190" y2="118" stroke={S.tan} strokeWidth="1.4" vectorEffect="non-scaling-stroke" />
      {rungs.map((r) => {
        const y = 12 + r * 18
        return (
          <g key={r}>
            <line x1="10" y1={y} x2="190" y2={y} stroke={S.line} strokeWidth="1" vectorEffect="non-scaling-stroke" />
            {/* contacts */}
            <rect x="52" y={y - 5} width="10" height="10" fill="none" stroke={S.tan} strokeWidth="1.2" vectorEffect="non-scaling-stroke" />
            <line className="contact" x1="52" y1={y + 5} x2="62" y2={y - 5} stroke={S.tan} strokeWidth="1.4" vectorEffect="non-scaling-stroke" />
            <rect x="96" y={y - 5} width="10" height="10" fill="none" stroke={S.tan} strokeWidth="1.2" vectorEffect="non-scaling-stroke" />
            <line className="contact" x1="96" y1={y + 5} x2="106" y2={y - 5} stroke={S.tan} strokeWidth="1.4" vectorEffect="non-scaling-stroke" />
            {/* coil */}
            <circle cx="150" cy={y} r="6" fill="none" stroke={S.tan} strokeWidth="1.2" vectorEffect="non-scaling-stroke" />
            <text
              x="164"
              y={y + 3}
              fill={S.muted}
              fontSize="6"
              fontFamily="var(--font-jetbrains), monospace"
            >
              {`Q${r}`}
            </text>
          </g>
        )
      })}
    </svg>
  )
}

/* ================================================================== */
/* 7. Project schematics                                                */
/* ================================================================== */

export function ProjectSchematic({
  kind,
  live = false,
}: {
  kind: 'ecu' | 'acc' | 'ballbeam'
  /**
   * Run the drawing's own loop. Set inside the dialog, where the reader has
   * deliberately asked to look at it. On a card the same loop runs on hover
   * instead, from the stylesheet.
   */
  live?: boolean
}) {
  if (kind === 'ecu') return <EcuSchematic live={live} />
  if (kind === 'acc') return <AccSchematic live={live} />
  return <BallBeamSchematic live={live} />
}

/** Tester -> transceiver -> CAN line -> ECU, with request/response frames. */
function EcuSchematic({ live }: { live: boolean }) {
  return (
    <svg {...DECO} className={`ecu-sch h-full w-full ${live ? 'live' : ''}`} viewBox="0 0 240 130" preserveAspectRatio="xMidYMid meet">
      {/* tester block */}
      <rect x="6" y="42" width="44" height="46" fill="none" stroke={S.tan} strokeWidth="1.2" />
      <text x="28" y="62" fill={S.ink} fontSize="7" textAnchor="middle" fontFamily="var(--font-jetbrains), monospace">
        ESP32
      </text>
      <text x="28" y="73" fill={S.muted} fontSize="6" textAnchor="middle" fontFamily="var(--font-jetbrains), monospace">
        UDS ON
      </text>
      {/* transceiver */}
      <path d="M56 65 L74 65 L74 55 L92 65 L74 75 L74 71 L56 71 Z" fill="none" stroke={S.tan} strokeWidth="1.2" />
      {/* bus */}
      <line x1="92" y1="65" x2="232" y2="65" stroke={S.line} strokeWidth="1.2" />
      <line x1="92" y1="69" x2="232" y2="69" stroke={S.line} strokeWidth="0.8" />
      {/* four representative nodes, the ninth is off-frame by design */}
      {[112, 146, 180, 214].map((x, i) => (
        <g key={x}>
          <line x1={x} y1="65" x2={x} y2="46" stroke={S.line} strokeWidth="1" />
          <rect
            className="ecu-node"
            style={{ animationDelay: `${560 + i * 640}ms` }}
            x={x - 8}
            y="28"
            width="16"
            height="18"
            fill="var(--brin-deep)"
            stroke={S.tan}
            strokeWidth="1.2"
          />
          <text x={x} y="40" fill={S.muted} fontSize="6" textAnchor="middle" fontFamily="var(--font-jetbrains), monospace">
            {`0x${(0x7 + i * 4).toString(16).toUpperCase()}`}
          </text>
        </g>
      ))}
      {/* request / response frames: both start beside the tester, one leaves
          and one comes back. The travel distance is the loop length in
          globals.css, so the two rules there stay in step with these boxes. */}
      <g className="ecu-req">
        <rect x="96" y="88" width="52" height="14" fill="var(--brin-deep)" stroke={S.sand} strokeWidth="1" />
        <text x="122" y="98" fill={S.sand} fontSize="6" textAnchor="middle" fontFamily="var(--font-jetbrains), monospace">
          0x7DF REQ
        </text>
      </g>
      <g className="ecu-rsp">
        <rect x="96" y="108" width="52" height="14" fill="var(--brin-deep)" stroke={S.sand} strokeWidth="1" />
        <text x="122" y="118" fill={S.sand} fontSize="6" textAnchor="middle" fontFamily="var(--font-jetbrains), monospace">
          0x7E8 RSP
        </text>
      </g>
    </svg>
  )
}

/** ACC: ego vehicle, lead vehicle, gap, controller block. */
function AccSchematic({ live }: { live: boolean }) {
  return (
    <svg {...DECO} className={`acc-sch h-full w-full ${live ? 'live' : ''}`} viewBox="0 0 240 130" preserveAspectRatio="xMidYMid meet">
      {/* road */}
      <line x1="8" y1="92" x2="232" y2="92" stroke={S.line} strokeWidth="1" />
      <line x1="8" y1="100" x2="232" y2="100" stroke={S.line} strokeWidth="0.6" strokeDasharray="8 6" />
      {/* ego */}
      <rect x="26" y="66" width="46" height="24" fill="none" stroke={S.tan} strokeWidth="1.4" />
      <text x="49" y="81" fill={S.ink} fontSize="7" textAnchor="middle" fontFamily="var(--font-jetbrains), monospace">
        EGO
      </text>
      {/* lead vehicle and the measured gap, as one moving group */}
      <g className="acc-lead">
        <rect x="158" y="66" width="46" height="24" fill="none" stroke={S.tan} strokeWidth="1.4" />
        <text x="181" y="81" fill={S.ink} fontSize="7" textAnchor="middle" fontFamily="var(--font-jetbrains), monospace">
          LEAD
        </text>
        <line x1="74" y1="56" x2="156" y2="56" stroke={S.sand} strokeWidth="1" />
        <line x1="74" y1="52" x2="74" y2="60" stroke={S.sand} strokeWidth="1" />
        <line x1="156" y1="52" x2="156" y2="60" stroke={S.sand} strokeWidth="1" />
        <text x="115" y="48" fill={S.sand} fontSize="7" textAnchor="middle" fontFamily="var(--font-jetbrains), monospace">
          d
        </text>
      </g>
      {/* controller */}
      <g className="acc-ctrl">
        <rect x="82" y="14" width="76" height="26" fill="none" stroke={S.tan} strokeWidth="1.2" />
        <text x="120" y="25" fill={S.ink} fontSize="6.5" textAnchor="middle" fontFamily="var(--font-jetbrains), monospace">
          ACC CTRL
        </text>
        <text x="120" y="34" fill={S.muted} fontSize="6" textAnchor="middle" fontFamily="var(--font-jetbrains), monospace">
          SIMULINK
        </text>
      </g>
      <line x1="120" y1="40" x2="120" y2="64" stroke={S.line} strokeWidth="1" strokeDasharray="3 3" />
      <line x1="49" y1="64" x2="49" y2="46" stroke={S.line} strokeWidth="1" strokeDasharray="3 3" />
      <line x1="49" y1="46" x2="82" y2="46" stroke={S.line} strokeWidth="1" strokeDasharray="3 3" />
      <line x1="181" y1="64" x2="181" y2="46" stroke={S.line} strokeWidth="1" strokeDasharray="3 3" />
      <line x1="158" y1="46" x2="181" y2="46" stroke={S.line} strokeWidth="1" strokeDasharray="3 3" />
      <line x1="158" y1="46" x2="120" y2="46" stroke={S.line} strokeWidth="1" strokeDasharray="3 3" />
    </svg>
  )
}

/** Ball & beam: beam, ball, PID block, FPGA line. */
function BallBeamSchematic({ live }: { live: boolean }) {
  return (
    <svg {...DECO} className={`bb-sch h-full w-full ${live ? 'live' : ''}`} viewBox="0 0 240 130" preserveAspectRatio="xMidYMid meet">
      {/* The whole arm rotates about the pivot. `transform-box: view-box` with
          an explicit origin in viewBox units is what makes that rotation land
          on the pivot instead of the SVG's top-left corner. */}
      <g
        className="bb-arm"
        style={{ transformBox: 'view-box', transformOrigin: '126px 94px' }}
      >
        {/* beam, tilted: a control system at work, not a level line */}
        <line x1="26" y1="72" x2="214" y2="62" stroke={S.tan} strokeWidth="2" />
        <line x1="26" y1="80" x2="214" y2="70" stroke={S.line} strokeWidth="0.8" />
        {/* pivot */}
        <path d="M118 78 L126 94 L134 78 Z" fill="none" stroke={S.tan} strokeWidth="1.2" />
        {/* the ball, off-centre: the loop is what closes it */}
        <g className="bb-ball">
          <circle cx="168" cy="62" r="6" fill={S.sand} />
          <circle cx="168" cy="62" r="11" fill="none" stroke={S.sand} strokeWidth="0.7" opacity="0.45" />
        </g>
      </g>
      <line x1="30" y1="94" x2="210" y2="94" stroke={S.line} strokeWidth="1" />
      {/* set point */}
      <line x1="120" y1="34" x2="120" y2="70" stroke={S.muted} strokeWidth="0.7" strokeDasharray="4 4" />
      <text x="120" y="30" fill={S.muted} fontSize="6" textAnchor="middle" fontFamily="var(--font-jetbrains), monospace">
        consigne
      </text>
      {/* controller chain */}
      <rect x="34" y="14" width="40" height="22" fill="none" stroke={S.tan} strokeWidth="1.2" />
      <text x="54" y="28" fill={S.ink} fontSize="7" textAnchor="middle" fontFamily="var(--font-jetbrains), monospace">
        PID
      </text>
      <rect x="98" y="14" width="48" height="22" fill="none" stroke={S.tan} strokeWidth="1.2" />
      <text x="122" y="28" fill={S.ink} fontSize="7" textAnchor="middle" fontFamily="var(--font-jetbrains), monospace">
        STM32F411
      </text>
      <rect x="166" y="14" width="40" height="22" fill="none" stroke={S.tan} strokeWidth="1.2" />
      <text x="186" y="28" fill={S.ink} fontSize="7" textAnchor="middle" fontFamily="var(--font-jetbrains), monospace">
        FPGA
      </text>
      <line x1="74" y1="25" x2="98" y2="25" stroke={S.line} strokeWidth="1" />
      <line x1="146" y1="25" x2="166" y2="25" stroke={S.line} strokeWidth="1" />
      <path d="M186 36 L186 44 L168 44 L168 58" fill="none" stroke={S.line} strokeWidth="1" strokeDasharray="3 3" />
      <path d="M54 36 L54 44 L120 44 L120 40" fill="none" stroke={S.line} strokeWidth="1" strokeDasharray="3 3" />
      <text x="186" y="106" fill={S.muted} fontSize="6" textAnchor="middle" fontFamily="var(--font-jetbrains), monospace">
        acquisition
      </text>
    </svg>
  )
}

/* ================================================================== */
/* 8. Certificate stamp                                                 */
/* ================================================================== */

export function CertStamp({ year }: { year: string }) {
  return (
    <span {...DECO} className="stamp-on inline-grid h-14 w-14 shrink-0 place-items-center rounded-full border border-dashed border-tan/70 text-tan">
      <svg viewBox="0 0 40 40" className="h-full w-full" aria-hidden="true">
        <circle cx="20" cy="20" r="18" fill="none" stroke="currentColor" strokeWidth="0.8" opacity="0.5" />
        <circle cx="20" cy="20" r="14" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.35" />
        <path d="M13 20.5 L18 25 L27.5 15" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="square" />
        <text x="20" y="34" textAnchor="middle" fill="currentColor" fontSize="6.5" fontFamily="var(--font-jetbrains), monospace" opacity="0.8">
          {year}
        </text>
      </svg>
    </span>
  )
}

/* ================================================================== */
/* 9. Section substrate — slow blueprint drift                         */
/* ================================================================== */

/**
 * Deterministic pseudo-random in [0, 1). Math.random() is deliberately not
 * used: these positions have to be identical on the server and on the client,
 * or React reports a hydration mismatch on every page load.
 */
function noise(seed: number) {
  const x = Math.sin(seed * 127.1) * 43758.5453
  return x - Math.floor(x)
}

/**
 * A handful of slow specks drifting upward through a section. Transform and
 * opacity only, `aria-hidden`, `pointer-events: none`, and removed outright by
 * the stylesheet under reduced motion.
 */
export function Motes({ count = 8, seed = 1 }: { count?: number; seed?: number }) {
  return (
    <>
      {Array.from({ length: count }, (_, i) => {
        const s = seed + i * 7.13
        const size = 1 + noise(s + 1) * 1.9
        return (
          <span
            key={i}
            className="mote"
            style={
              {
                left: `${(noise(s + 2) * 100).toFixed(2)}%`,
                top: `${(noise(s + 3) * 96).toFixed(2)}%`,
                width: `${size.toFixed(2)}px`,
                height: `${size.toFixed(2)}px`,
                '--mdur': `${(20 + noise(s + 4) * 24).toFixed(1)}s`,
                // Negative delay, so the field is already mid-flight on load
                // instead of every speck starting from the same bottom edge.
                '--mdelay': `${(-noise(s + 5) * 44).toFixed(1)}s`,
                '--mdx': `${((noise(s + 6) - 0.5) * 72).toFixed(1)}px`,
                '--mdy': `${(-70 - noise(s + 7) * 160).toFixed(1)}px`,
              } as CSSProperties
            }
          />
        )
      })}
    </>
  )
}

/**
 * The technical-drawing substrate behind dark sections. Extremely low
 * contrast on purpose: it must never compete with body text.
 *
 * Three layers, all clipped by the wrapper:
 *   - the plate (bus trace / wave / blueprint grid), oversized by
 *     `.plate-parallax` so the drift and the parallax offset never expose an
 *     edge; the bus and wave variants draw themselves in when the section
 *     arrives, via `data-draw` and the shared reveal observer;
 *   - the motes;
 *   - nothing else. The content sits above all of it in a sibling layer.
 */
export function SectionBackdrop({
  variant = 'bus',
  motes = true,
  seed = 1,
}: {
  variant?: 'bus' | 'wave' | 'grid'
  motes?: boolean
  seed?: number
}) {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <div data-parallax="0.05" className="plate-parallax">
        {variant === 'grid' ? (
          <div className="grid-paper drift h-full w-full opacity-[0.28]" />
        ) : (
          <div className="h-full w-full" data-draw="" style={{ opacity: variant === 'wave' ? 0.16 : 0.18 }}>
            {variant === 'wave' ? <WavePlate /> : <BusPlate />}
          </div>
        )}
      </div>
      {motes ? <Motes count={variant === 'grid' ? 7 : 9} seed={seed} /> : null}
    </div>
  )
}

function WavePlate() {
  return (
    <svg className="h-full w-full" viewBox="0 0 1200 400" preserveAspectRatio="none">
      <path d="M0 300 C 150 300 150 120 300 120 S 450 300 600 300 S 750 120 900 120 S 1050 300 1200 300" fill="none" stroke={S.line} strokeWidth="1.5" />
      <path d="M0 330 C 150 330 150 150 300 150 S 450 330 600 330 S 750 150 900 150 S 1050 330 1200 330" fill="none" stroke={S.soft} strokeWidth="1" />
      <path d="M0 270 C 150 270 150 90 300 90 S 450 270 600 270 S 750 90 900 90 S 1050 270 1200 270" fill="none" stroke={S.soft} strokeWidth="1" />
    </svg>
  )
}

function BusPlate() {
  return (
    <svg className="h-full w-full" viewBox="0 0 1200 400" preserveAspectRatio="none">
      <line x1="0" y1="90" x2="1200" y2="90" stroke={S.line} strokeWidth="1" />
      <line x1="0" y1="95" x2="1200" y2="95" stroke={S.line} strokeWidth="0.6" />
      {Array.from({ length: 13 }, (_, i) => {
        const x = 60 + i * 90
        return (
          <g key={x}>
            <line x1={x} y1="90" x2={x} y2={x % 180 === 0 ? 128 : 112} stroke={S.line} strokeWidth="1" />
            <circle cx={x} cy="90" r="3.5" fill="none" stroke={S.line} strokeWidth="1" />
          </g>
        )
      })}
    </svg>
  )
}