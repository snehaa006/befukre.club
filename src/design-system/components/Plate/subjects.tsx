/**
 * Hand-drawn SVG subjects used in place of photography.
 * Each takes a unique `id` prefix so gradient references never collide
 * when several plates share a page.
 *
 * All subjects are drawn on a 400 × 520 stage and slice-cropped by the plate.
 */
import type { JSX } from 'react'

export type PlateSubject =
  | 'coupe'
  | 'highball'
  | 'rocks'
  | 'bottle'
  | 'arch'
  | 'velvet'
  | 'smoke'

interface SubjectProps {
  id: string
}

const Glow = ({ id, cx = 200, cy = 230, r = 190 }: SubjectProps & { cx?: number; cy?: number; r?: number }) => (
  <>
    <defs>
      <radialGradient id={`${id}-glow`}>
        <stop offset="0%" stopColor="#DC5C30" stopOpacity="0.55" />
        <stop offset="45%" stopColor="#8A1C2B" stopOpacity="0.28" />
        <stop offset="100%" stopColor="#070405" stopOpacity="0" />
      </radialGradient>
    </defs>
    <circle cx={cx} cy={cy} r={r} fill={`url(#${id}-glow)`} />
  </>
)

/** Shared glass + liquid gradients. */
const GlassDefs = ({ id }: SubjectProps) => (
  <defs>
    <linearGradient id={`${id}-glass`} x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stopColor="#F6F0E7" stopOpacity="0.18" />
      <stop offset="22%" stopColor="#F6F0E7" stopOpacity="0.05" />
      <stop offset="70%" stopColor="#F6F0E7" stopOpacity="0.03" />
      <stop offset="100%" stopColor="#F6F0E7" stopOpacity="0.14" />
    </linearGradient>
    <linearGradient id={`${id}-liquid`} x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stopColor="#E8805A" />
      <stop offset="38%" stopColor="#C8441F" />
      <stop offset="100%" stopColor="#6B1623" />
    </linearGradient>
    <linearGradient id={`${id}-rim`} x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stopColor="#C9A66B" stopOpacity="0.9" />
      <stop offset="50%" stopColor="#F6F0E7" stopOpacity="0.5" />
      <stop offset="100%" stopColor="#C9A66B" stopOpacity="0.9" />
    </linearGradient>
  </defs>
)

const Coupe = ({ id }: SubjectProps): JSX.Element => (
  <>
    <Glow id={id} cy={240} />
    <GlassDefs id={id} />
    {/* Liquid first, so the glass body sits over it. */}
    <path
      d="M113 176C117 248 150 276 200 276s83-28 87-100Z"
      fill={`url(#${id}-liquid)`}
    />
    <ellipse cx="200" cy="177" rx="87" ry="9" fill="#E8805A" opacity="0.75" />
    {/* Bowl */}
    <path
      d="M108 168h184c-4 82-40 114-92 114s-88-32-92-114Z"
      fill={`url(#${id}-glass)`}
      stroke={`url(#${id}-rim)`}
      strokeWidth="1.6"
    />
    <ellipse cx="200" cy="168" rx="92" ry="10" fill="none" stroke={`url(#${id}-rim)`} strokeWidth="1.6" />
    {/* Specular edge on the bowl */}
    <path
      d="M124 182c4 56 26 84 56 92"
      fill="none"
      stroke="#F6F0E7"
      strokeOpacity="0.22"
      strokeWidth="3"
      strokeLinecap="round"
    />
    {/* Stem and foot */}
    <path d="M194 282h12l3 140h-18Z" fill={`url(#${id}-glass)`} stroke="#F6F0E7" strokeOpacity="0.12" />
    <ellipse cx="200" cy="426" rx="62" ry="12" fill={`url(#${id}-glass)`} stroke={`url(#${id}-rim)`} strokeWidth="1.2" />
    <ellipse cx="200" cy="432" rx="78" ry="14" fill="#C8441F" opacity="0.12" />
    {/* Citrus twist on the rim */}
    <path
      d="M246 158c22-12 40-2 36 14-3 12-18 16-28 9"
      fill="none"
      stroke="#E8805A"
      strokeWidth="7"
      strokeLinecap="round"
      opacity="0.9"
    />
  </>
)

const Highball = ({ id }: SubjectProps): JSX.Element => (
  <>
    <Glow id={id} cy={280} r={170} />
    <GlassDefs id={id} />
    <path d="M146 136h108v280a16 16 0 0 1-16 16h-76a16 16 0 0 1-16-16Z" fill={`url(#${id}-liquid)`} opacity="0.92" />
    <path
      d="M146 136h108v280a16 16 0 0 1-16 16h-76a16 16 0 0 1-16-16Z"
      fill={`url(#${id}-glass)`}
      stroke={`url(#${id}-rim)`}
      strokeWidth="1.6"
    />
    <ellipse cx="200" cy="136" rx="54" ry="9" fill="none" stroke={`url(#${id}-rim)`} strokeWidth="1.6" />
    {/* Ice */}
    <g opacity="0.3" fill="#F6F0E7">
      <rect x="160" y="186" width="56" height="52" rx="7" transform="rotate(-12 188 212)" />
      <rect x="186" y="252" width="52" height="48" rx="7" transform="rotate(9 212 276)" />
    </g>
    {/* Citrus wheel */}
    <g transform="translate(200 172)">
      <ellipse rx="40" ry="13" fill="#E8805A" opacity="0.85" />
      <ellipse rx="26" ry="8" fill="#F6C9A0" opacity="0.5" />
    </g>
    <path d="M160 160v250" stroke="#F6F0E7" strokeOpacity="0.2" strokeWidth="4" strokeLinecap="round" />
  </>
)

const Rocks = ({ id }: SubjectProps): JSX.Element => (
  <>
    <Glow id={id} cy={300} r={160} />
    <GlassDefs id={id} />
    <path d="M128 230h144l-12 196a14 14 0 0 1-14 12H154a14 14 0 0 1-14-12Z" fill={`url(#${id}-liquid)`} opacity="0.9" />
    <path
      d="M128 230h144l-12 196a14 14 0 0 1-14 12H154a14 14 0 0 1-14-12Z"
      fill={`url(#${id}-glass)`}
      stroke={`url(#${id}-rim)`}
      strokeWidth="1.8"
    />
    <ellipse cx="200" cy="230" rx="72" ry="12" fill="none" stroke={`url(#${id}-rim)`} strokeWidth="1.8" />
    {/* One large clear cube, the signature of a good bar. */}
    <g transform="rotate(-8 200 320)">
      <rect x="156" y="264" width="90" height="88" rx="8" fill="#F6F0E7" opacity="0.22" />
      <rect x="156" y="264" width="90" height="88" rx="8" fill="none" stroke="#F6F0E7" strokeOpacity="0.4" />
      <path d="M156 288h90M178 264v88" stroke="#F6F0E7" strokeOpacity="0.16" />
    </g>
    <ellipse cx="200" cy="444" rx="92" ry="16" fill="#C8441F" opacity="0.14" />
  </>
)

const Bottle = ({ id }: SubjectProps): JSX.Element => (
  <>
    <Glow id={id} cy={300} r={180} />
    <GlassDefs id={id} />
    <defs>
      <linearGradient id={`${id}-bottle`} x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#2A0810" />
        <stop offset="28%" stopColor="#6B1623" />
        <stop offset="60%" stopColor="#3D0C16" />
        <stop offset="100%" stopColor="#120A0C" />
      </linearGradient>
    </defs>
    <path
      d="M186 92h28v64c0 14 30 30 30 64v212a18 18 0 0 1-18 18h-52a18 18 0 0 1-18-18V220c0-34 30-50 30-64Z"
      fill={`url(#${id}-bottle)`}
      stroke={`url(#${id}-rim)`}
      strokeWidth="1.2"
    />
    <rect x="182" y="78" width="36" height="20" rx="4" fill="#8E7340" />
    {/* Label */}
    <rect x="156" y="276" width="88" height="104" fill="#F6F0E7" opacity="0.1" stroke="#C9A66B" strokeOpacity="0.5" />
    <path d="M176 306h48M176 322h48M186 346h28" stroke="#C9A66B" strokeOpacity="0.6" strokeWidth="2" />
    <path d="M168 200v230" stroke="#F6F0E7" strokeOpacity="0.18" strokeWidth="5" strokeLinecap="round" />
  </>
)

/** The vaulted corridor from the interior references. */
const Arch = ({ id }: SubjectProps): JSX.Element => {
  /* Concentric vaults, each smaller and darker than the one in front, so the
   * corridor reads as depth rather than as rings. Drawn front to back. */
  const vaults = [
    { rx: 200, ry: 168, spring: 268, fill: '#8A1C2B' },
    { rx: 168, ry: 148, spring: 292, fill: '#6B1623' },
    { rx: 137, ry: 128, spring: 315, fill: '#51121E' },
    { rx: 106, ry: 108, spring: 338, fill: '#3D0C16' },
    { rx: 77, ry: 88, spring: 360, fill: '#2A0810' },
  ]

  const vaultPath = (rx: number, ry: number, spring: number) =>
    `M${200 - rx} 520V${spring}a${rx} ${ry} 0 0 1 ${rx * 2} 0V520Z`

  return (
    <>
      <defs>
        <radialGradient id={`${id}-doorlight`}>
          <stop offset="0%" stopColor="#E8805A" stopOpacity="0.9" />
          <stop offset="55%" stopColor="#C8441F" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#C8441F" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`${id}-floor`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#E8805A" stopOpacity="0.22" />
          <stop offset="100%" stopColor="#E8805A" stopOpacity="0" />
        </linearGradient>
      </defs>

      <rect width="400" height="520" fill="#1A0F12" />

      {vaults.map((v) => (
        <g key={v.rx}>
          <path d={vaultPath(v.rx, v.ry, v.spring)} fill={v.fill} />
          {/* Gilt trim catching the light on each rib. */}
          <path
            d={vaultPath(v.rx, v.ry, v.spring)}
            fill="none"
            stroke="#C9A66B"
            strokeOpacity="0.3"
            strokeWidth="1"
          />
        </g>
      ))}

      {/* Light spilling from the far door. */}
      <ellipse cx="200" cy="430" rx="150" ry="130" fill={`url(#${id}-doorlight)`} />

      <path
        d="M152 520V392a48 62 0 0 1 96 0v128Z"
        fill="#0B0607"
        stroke="#C9A66B"
        strokeOpacity="0.6"
        strokeWidth="1.4"
      />
      <path d="M200 334v186" stroke="#C9A66B" strokeOpacity="0.35" />
      <circle cx="200" cy="470" r="8" fill="none" stroke="#C9A66B" strokeOpacity="0.85" strokeWidth="2" />

      {/* Polished floor picking up the glow. */}
      <rect y="470" width="400" height="50" fill={`url(#${id}-floor)`} />
    </>
  )
}

/** Draped curtain, the backdrop of half the reference set. */
const Velvet = ({ id }: SubjectProps): JSX.Element => {
  const folds = [0, 48, 104, 150, 208, 262, 310, 356]
  return (
    <>
      <defs>
        <linearGradient id={`${id}-velvet`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#51121E" />
          <stop offset="60%" stopColor="#3D0C16" />
          <stop offset="100%" stopColor="#1A0F12" />
        </linearGradient>
        <linearGradient id={`${id}-fold`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#070405" stopOpacity="0.55" />
          <stop offset="45%" stopColor="#A82836" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#070405" stopOpacity="0.55" />
        </linearGradient>
      </defs>
      <rect width="400" height="520" fill={`url(#${id}-velvet)`} />
      {folds.map((x, i) => (
        <rect
          key={x}
          x={x}
          y="0"
          width={i % 2 === 0 ? 40 : 28}
          height="520"
          fill={`url(#${id}-fold)`}
          opacity={i % 3 === 0 ? 0.9 : 0.55}
        />
      ))}
      <ellipse cx="200" cy="120" rx="210" ry="150" fill="#E8805A" opacity="0.1" />
    </>
  )
}

const Smoke = ({ id }: SubjectProps): JSX.Element => (
  <>
    <defs>
      <filter id={`${id}-blur`} x="-30%" y="-30%" width="160%" height="160%">
        <feGaussianBlur stdDeviation="22" />
      </filter>
      <radialGradient id={`${id}-smokeglow`}>
        <stop offset="0%" stopColor="#C8441F" stopOpacity="0.5" />
        <stop offset="100%" stopColor="#070405" stopOpacity="0" />
      </radialGradient>
    </defs>
    <rect width="400" height="520" fill="#0B0607" />
    <circle cx="200" cy="330" r="200" fill={`url(#${id}-smokeglow)`} />
    <g filter={`url(#${id}-blur)`} fill="#CFC2B2" opacity="0.26">
      <ellipse cx="170" cy="200" rx="70" ry="44" />
      <ellipse cx="238" cy="150" rx="54" ry="34" />
      <ellipse cx="196" cy="96" rx="40" ry="26" />
      <ellipse cx="150" cy="300" rx="96" ry="52" />
      <ellipse cx="262" cy="356" rx="84" ry="44" />
    </g>
    <g filter={`url(#${id}-blur)`} fill="#E8805A" opacity="0.18">
      <ellipse cx="210" cy="256" rx="110" ry="60" />
    </g>
  </>
)

export const SUBJECTS: Record<PlateSubject, (p: SubjectProps) => JSX.Element> = {
  coupe: Coupe,
  highball: Highball,
  rocks: Rocks,
  bottle: Bottle,
  arch: Arch,
  velvet: Velvet,
  smoke: Smoke,
}
