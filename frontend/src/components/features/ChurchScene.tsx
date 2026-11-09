"use client";

import shared from "./Scene.module.css";
import styles from "./ChurchScene.module.css";
import { SceneProps, SceneSpot as Spot } from "./SceneSpot";

const PERSON_COLORS = ["#a16207", "#57534e", "#7c2d12", "#d6d3d1", "#44403c", "#92400e", "#a8a29e"];
const ROW_BACK = [150, 205, 260, 315, 370, 425, 480, 720, 775, 830, 885, 940, 995, 1050];
const ROW_FRONT = [110, 170, 230, 290, 350, 410, 470, 730, 790, 850, 910, 970, 1030, 1090];
const NOTES = [
  [230, 470],
  [395, 455],
  [525, 480],
  [800, 465],
  [1010, 450],
];
const PETALS = [
  [410, 215],
  [515, 200],
  [610, 230],
  [705, 205],
  [800, 222],
];

function Person({
  x,
  top,
  bottom,
  color,
  skin = "#d8a27a",
  armClass,
  armSide = 1,
}: {
  x: number;
  top: number;
  bottom: number;
  color: string;
  skin?: string;
  armClass?: string;
  armSide?: number;
}) {
  return (
    <g>
      <path d={`M${x - 22} ${bottom} v-${bottom - top - 42} q0 -22 22 -22 q22 0 22 22 v${bottom - top - 42} z`} fill={color} />
      <circle cx={x} cy={top + 6} r="16" fill={skin} />
      {armClass && (
        <rect
          className={armClass}
          x={armSide > 0 ? x + 18 : x - 26}
          y={top + 8}
          width="8"
          height="42"
          rx="4"
          fill={color}
        />
      )}
    </g>
  );
}

export function ChurchScene({ action }: SceneProps) {
  return (
    <svg
      className={`${shared.canvas} ${styles.scene}`}
      data-action={action ?? undefined}
      viewBox="0 0 1200 620"
      role="group"
      aria-label="Interior de uma igreja: clique em algo para ver a palavra em inglês"
    >
      <defs>
        <linearGradient id="church-wall" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#2b2442" />
          <stop offset="1" stopColor="#1a1529" />
        </linearGradient>
        <linearGradient id="church-beam" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fde68a" stopOpacity="0.9" />
          <stop offset="1" stopColor="#fde68a" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="church-wood" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#7c5a3c" />
          <stop offset="1" stopColor="#4d3623" />
        </linearGradient>
        <linearGradient id="church-brass" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#92400e" />
          <stop offset="0.5" stopColor="#fbbf24" />
          <stop offset="1" stopColor="#92400e" />
        </linearGradient>
      </defs>

      <rect width="1200" height="620" fill="url(#church-wall)" />
      <rect x="0" y="436" width="1200" height="184" fill="#231a15" />

      <g fill="#352c50">
        <rect x="222" y="0" width="16" height="436" />
        <rect x="962" y="0" width="16" height="436" />
      </g>

      <g opacity="0.9">
        <path d="M270 250 v-130 a35 35 0 0 1 70 0 v130 z" fill="#1e3a5f" />
        <path d="M270 190 h70 M305 85 v165" stroke="#120e1f" strokeWidth="4" />
        <path d="M860 250 v-130 a35 35 0 0 1 70 0 v130 z" fill="#5b2149" />
        <path d="M860 190 h70 M895 85 v165" stroke="#120e1f" strokeWidth="4" />
      </g>

      <polygon className={styles.beam} points="510,300 690,300 800,452 400,452" fill="url(#church-beam)" />

      <Spot term="faith" labelX={600} labelY={24}>
        <path d="M500 300 V130 a100 100 0 0 1 200 0 V300 z" fill="#120e1f" />
        <g className={styles.pane}>
          <path d="M508 292 V130 a92 92 0 0 1 86 -91 V128 H508" fill="#1d4ed8" />
          <path d="M606 39 a92 92 0 0 1 86 91 V128 H606 z" fill="#b91c1c" />
          <rect x="508" y="140" width="86" height="152" fill="#b45309" />
          <rect x="606" y="140" width="86" height="152" fill="#047857" />
          <rect x="594" y="39" width="12" height="253" fill="#fde68a" />
          <rect x="508" y="128" width="184" height="12" fill="#fde68a" />
        </g>
      </Spot>

      <rect x="240" y="400" width="720" height="24" fill="url(#church-wood)" />
      <rect x="240" y="424" width="720" height="28" fill="#3b2a1c" />

      <Spot term="church" labelX={110} labelY={24}>
        <rect x="58" y="34" width="104" height="6" rx="3" fill="#57534e" />
        <g className={styles.bell}>
          <rect x="106" y="40" width="8" height="10" fill="#a16207" />
          <path d="M84 104 q10 -8 10 -30 q0 -24 16 -24 q16 0 16 24 q0 22 10 30 z" fill="url(#church-brass)" />
          <circle cx="110" cy="108" r="6" fill="#92400e" />
        </g>
        <g fill="none" stroke="#fde68a" strokeWidth="3">
          <path className={`${styles.arc} ${styles.bellWave}`} d="M70 66 q-14 16 0 34" />
          <path className={`${styles.arc} ${styles.bellWave}`} d="M150 66 q14 16 0 34" />
        </g>
        <rect x="40" y="128" width="140" height="44" rx="6" fill="#120e1f" stroke="#57534e" strokeWidth="2" />
        <text x="110" y="157" textAnchor="middle" fill="#c4b5fd" fontSize="20" fontStyle="italic" fontFamily="var(--font-lora), Georgia, serif">
          the church
        </text>
      </Spot>

      <path d="M42 452 V245 a68 68 0 0 1 136 0 V452 z" fill="#120e1f" />
      <path className={styles.doorLight} d="M48 452 V245 a62 62 0 0 1 124 0 V452 z" fill="#fde68a" />
      <path className={styles.door} d="M48 452 V245 a62 62 0 0 1 124 0 V452 z" fill="#6b4a2f" stroke="#3b2a1c" strokeWidth="3" />
      <rect x="148" y="340" width="8" height="28" rx="3" fill="#fbbf24" style={{ pointerEvents: "none" }} />

      <Spot term="minister" labelX={205} labelY={254}>
        <Person x={205} top={276} bottom={452} color="#312e81" armClass={`${styles.arm} ${styles.ministerArm}`} armSide={-1} />
      </Spot>

      <Spot term="ceremony" labelX={296} labelY={292}>
        <rect x="264" y="366" width="66" height="34" fill="#f5f5f4" />
        <rect x="258" y="360" width="78" height="8" rx="2" fill="#d6d3d1" />
        <g fill="#f5f5f4">
          <rect x="272" y="322" width="9" height="38" rx="2" />
          <rect x="292" y="310" width="9" height="50" rx="2" />
          <rect x="312" y="322" width="9" height="38" rx="2" />
        </g>
        <g fill="#fbbf24">
          <path className={styles.candle} d="M276 322 q-7 -10 0 -20 q7 10 0 20 z" />
          <path className={styles.candle} d="M296 310 q-7 -10 0 -20 q7 10 0 20 z" />
          <path className={styles.candle} d="M316 322 q-7 -10 0 -20 q7 10 0 20 z" />
        </g>
      </Spot>

      <Spot term="wedding" labelX={378} labelY={342}>
        <rect x="346" y="376" width="62" height="24" fill="#f5f5f4" />
        <rect x="340" y="370" width="74" height="7" rx="2" fill="#e7e5e4" />
        <g className={styles.ring} fill="none" stroke="#fbbf24" strokeWidth="4" style={{ opacity: 1 }}>
          <circle cx="368" cy="358" r="10" />
          <circle cx="384" cy="358" r="10" />
        </g>
      </Spot>

      <Spot term="pastor" labelX={468} labelY={258}>
        <Person x={468} top={280} bottom={400} color="#1f2937" armClass={`${styles.arm} ${styles.pastorArm}`} />
      </Spot>

      <Spot term="preacher" labelX={520} labelY={330}>
        <Person x={600} top={266} bottom={350} color="#7f1d1d" armClass={`${styles.arm} ${styles.preacherArm}`} />
      </Spot>

      <g fill="none" stroke="#fde68a" strokeWidth="3" strokeLinecap="round" style={{ pointerEvents: "none" }}>
        <path className={styles.arc} d="M655 262 q18 18 0 40" />
        <path className={styles.arc} d="M672 250 q28 32 0 64" />
        <path className={styles.arc} d="M545 262 q-18 18 0 40" />
        <path className={styles.arc} d="M528 250 q-28 32 0 64" />
      </g>

      <path d="M556 342 h88 l-10 58 h-68 z" fill="url(#church-wood)" stroke="#3b2a1c" strokeWidth="2" />
      <Spot term="sermon" labelX={600} labelY={420}>
        <g className={styles.book}>
          <path d="M552 342 l48 -12 l48 12 v8 h-96 z" fill="#f5f5f4" />
          <path d="M600 330 v20" stroke="#a8a29e" strokeWidth="2" />
        </g>
      </Spot>

      <Spot term="church leader" labelX={755} labelY={258}>
        <g className={styles.nod}>
          <Person x={735} top={290} bottom={400} color="#065f46" />
        </g>
        <g className={styles.nod}>
          <Person x={778} top={296} bottom={400} color="#a16207" />
        </g>
      </Spot>

      <Spot term="anointment" labelX={855} labelY={392}>
        <path d="M838 400 q2 -46 28 -46 q26 0 28 46 z" fill="#9f1239" />
        <circle cx="866" cy="342" r="15" fill="#d8a27a" />
        <circle className={styles.anointGlow} cx="866" cy="342" r="26" fill="#fde68a" />
      </Spot>

      <Spot term="anoint" labelX={925} labelY={256}>
        <Person x={925} top={278} bottom={400} color="#4c1d95" />
        <rect x="878" y="298" width="36" height="8" rx="4" fill="#4c1d95" />
        <g className={styles.flask}>
          <path d="M860 306 q-2 -16 8 -20 v-10 h12 v10 q10 4 8 20 q-14 10 -28 0 z" fill="url(#church-brass)" />
          <rect x="866" y="270" width="16" height="7" rx="2" fill="#92400e" />
        </g>
      </Spot>
      <path className={styles.drop} d="M866 308 q-5 8 0 12 q5 -4 0 -12 z" fill="#fde047" style={{ pointerEvents: "none" }} />

      <Spot term="Sunday" labelX={1085} labelY={158}>
        <rect x="1030" y="172" width="110" height="104" rx="6" fill="#f5f5f4" />
        <rect x="1030" y="172" width="110" height="28" rx="6" fill="#b91c1c" />
        <text x="1085" y="192" textAnchor="middle" fill="#fff" fontSize="14" fontWeight="700" fontFamily="var(--font-dm-sans), sans-serif">
          SUN
        </text>
        <text x="1085" y="252" textAnchor="middle" fill="#1c1917" fontSize="44" fontWeight="700" fontFamily="var(--font-lora), Georgia, serif">
          7
        </text>
      </Spot>

      <Spot term="sing" labelX={1080} labelY={322}>
        <path d="M1080 382 L1054 452 M1080 382 L1106 452 M1080 372 V452" stroke="#a8a29e" strokeWidth="5" fill="none" />
        <rect x="1036" y="334" width="88" height="48" rx="3" fill="#f5f5f4" transform="rotate(-4 1080 358)" />
        <g stroke="#57534e" strokeWidth="1.5">
          <line x1="1046" y1="346" x2="1114" y2="342" />
          <line x1="1047" y1="356" x2="1115" y2="352" />
          <line x1="1048" y1="366" x2="1116" y2="362" />
        </g>
        <text x="1076" y="366" textAnchor="middle" fill="#1c1917" fontSize="24">
          ♪
        </text>
      </Spot>

      <Spot term="congregation" labelX={600} labelY={530}>
        {ROW_BACK.map((x, i) => (
          <circle key={x} className={styles.head} cx={x} cy="486" r="19" fill={PERSON_COLORS[i % PERSON_COLORS.length]} />
        ))}
        <rect x="120" y="498" width="400" height="44" rx="6" fill="url(#church-wood)" />
        <rect x="690" y="498" width="400" height="44" rx="6" fill="url(#church-wood)" />
        {ROW_FRONT.map((x, i) => (
          <circle key={x} className={styles.head} cx={x} cy="552" r="22" fill={PERSON_COLORS[(i + 3) % PERSON_COLORS.length]} />
        ))}
        <rect x="70" y="566" width="460" height="54" rx="6" fill="url(#church-wood)" />
        <rect x="680" y="566" width="460" height="54" rx="6" fill="url(#church-wood)" />
      </Spot>

      <g fill="#fde68a" fontSize="26" style={{ pointerEvents: "none" }}>
        {NOTES.map(([x, y], i) => (
          <text key={x} className={styles.note} x={x} y={y}>
            {i % 2 === 0 ? "♪" : "♫"}
          </text>
        ))}
      </g>

      <g fill="#fda4af" style={{ pointerEvents: "none" }}>
        {PETALS.map(([x, y]) => (
          <ellipse key={x} className={styles.petal} cx={x} cy={y} rx="6" ry="3.5" />
        ))}
      </g>
    </svg>
  );
}
