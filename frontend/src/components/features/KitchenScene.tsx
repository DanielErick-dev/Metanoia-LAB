"use client";

import shared from "./Scene.module.css";
import styles from "./KitchenScene.module.css";
import { SceneProps, SceneSpot as Spot } from "./SceneSpot";

function Hanging({ x, children }: { x: number; children: React.ReactNode }) {
  return (
    <g transform={`translate(${x} 0)`}>
      <path d="M0 118 v14" stroke="#a8a29e" strokeWidth="3" />
      {children}
    </g>
  );
}

const TILE_ROWS = [200, 248, 296, 344, 392];
const TILE_COLUMNS = Array.from({ length: 25 }, (_, i) => i * 48);

export function KitchenScene({ action }: SceneProps) {
  return (
    <svg
      className={`${shared.canvas} ${styles.scene}`}
      data-action={action ?? undefined}
      viewBox="0 0 1200 620"
      role="group"
      aria-label="Cozinha ilustrada: clique em um objeto para ver a palavra em inglês"
    >
      <defs>
        <linearGradient id="kitchen-wall" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#3a2a1f" />
          <stop offset="1" stopColor="#261b14" />
        </linearGradient>
        <linearGradient id="kitchen-steel" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#57534e" />
          <stop offset="0.5" stopColor="#a8a29e" />
          <stop offset="1" stopColor="#57534e" />
        </linearGradient>
        <linearGradient id="kitchen-copper" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#7c3a14" />
          <stop offset="0.5" stopColor="#d97706" />
          <stop offset="1" stopColor="#7c3a14" />
        </linearGradient>
        <radialGradient id="kitchen-oven" cx="0.5" cy="0.6" r="0.75">
          <stop offset="0" stopColor="#fde68a" />
          <stop offset="0.6" stopColor="#f97316" />
          <stop offset="1" stopColor="#7c2d12" />
        </radialGradient>
        <radialGradient id="kitchen-lamp" cx="0.5" cy="0" r="1">
          <stop offset="0" stopColor="#fbbf24" stopOpacity="0.22" />
          <stop offset="1" stopColor="#fbbf24" stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect width="1200" height="620" fill="url(#kitchen-wall)" />
      <g stroke="#1c140e" strokeWidth="1.5" opacity="0.65">
        <rect x="0" y="176" width="1200" height="254" fill="#4a382b" stroke="none" />
        {TILE_ROWS.map((y) => (
          <line key={y} x1="0" y1={y} x2="1200" y2={y} />
        ))}
        {TILE_COLUMNS.map((x) => (
          <line key={x} x1={x} y1="176" x2={x} y2="430" />
        ))}
      </g>
      <rect width="1200" height="620" fill="url(#kitchen-lamp)" />
      <rect x="0" y="560" width="1200" height="60" fill="#1a130e" />

      <rect x="0" y="430" width="1200" height="18" fill="#7c5a3c" />
      <rect x="0" y="448" width="1200" height="112" fill="#33261c" />
      <g fill="none" stroke="#4d3a2b" strokeWidth="3">
        <rect x="175" y="460" width="135" height="88" rx="4" />
        <rect x="322" y="460" width="135" height="88" rx="4" />
        <rect x="845" y="460" width="150" height="88" rx="4" />
        <rect x="1007" y="460" width="150" height="88" rx="4" />
      </g>
      <g fill="#a8a29e">
        <rect x="228" y="470" width="30" height="5" rx="2" />
        <rect x="375" y="470" width="30" height="5" rx="2" />
        <rect x="905" y="470" width="30" height="5" rx="2" />
        <rect x="1067" y="470" width="30" height="5" rx="2" />
      </g>

      <polygon points="560,40 760,40 800,176 520,176" fill="#292524" />
      <rect x="512" y="176" width="296" height="12" fill="#57534e" />

      <rect x="172" y="132" width="310" height="9" fill="#7c5a3c" />
      <rect x="172" y="262" width="310" height="9" fill="#7c5a3c" />
      <rect x="850" y="112" width="320" height="6" rx="3" fill="#a8a29e" />

      <Spot term="fridge" labelX={92} labelY={160}>
        <rect x="30" y="172" width="125" height="388" rx="10" fill="#a8a29e" />
        <rect x="30" y="172" width="125" height="388" rx="10" fill="url(#kitchen-steel)" opacity="0.6" />
        <line x1="30" y1="300" x2="155" y2="300" stroke="#44403c" strokeWidth="3" />
        <rect x="138" y="225" width="7" height="55" rx="3" fill="#44403c" />
        <rect x="138" y="320" width="7" height="85" rx="3" fill="#44403c" />
      </Spot>

      <Spot term="jar" labelX={213} labelY={40}>
        <rect x="188" y="62" width="50" height="70" rx="8" fill="#a7c4bc" opacity="0.55" />
        <rect x="192" y="52" width="42" height="12" rx="3" fill="#b45309" />
        <rect x="194" y="98" width="38" height="30" rx="4" fill="#d97706" opacity="0.8" />
      </Spot>
      <Spot term="container" labelX={288} labelY={52}>
        <rect x="255" y="88" width="66" height="44" rx="6" fill="#e7e5e4" opacity="0.75" />
        <rect x="251" y="80" width="74" height="10" rx="3" fill="#0ea5e9" />
      </Spot>
      <Spot term="jug" labelX={366} labelY={40}>
        <path d="M342 132 l6 -62 h36 l6 62 z" fill="#b45309" />
        <path d="M386 86 q24 2 20 24 q-3 14 -16 12" fill="none" stroke="#b45309" strokeWidth="7" />
      </Spot>
      <Spot term="pitcher" labelX={445} labelY={40}>
        <path d="M423 132 l-4 -66 l-8 -8 h52 l-6 8 l-4 66 z" fill="#93c5fd" opacity="0.7" />
        <path d="M455 80 q22 4 16 28 q-4 12 -18 10" fill="none" stroke="#93c5fd" strokeWidth="6" opacity="0.8" />
      </Spot>

      <Spot term="bowl" labelX={215} labelY={200}>
        <path d="M180 222 h76 q-4 40 -38 40 q-34 0 -38 -40 z" fill="#c2410c" />
      </Spot>
      <Spot term="plate" labelX={298} labelY={224}>
        <ellipse cx="298" cy="256" rx="38" ry="6" fill="#e7e5e4" />
        <ellipse cx="298" cy="250" rx="38" ry="6" fill="#f5f5f4" />
        <ellipse cx="298" cy="244" rx="38" ry="6" fill="#e7e5e4" />
      </Spot>
      <Spot term="dish" labelX={376} labelY={200}>
        <path d="M344 238 h64 l-8 24 h-48 z" fill="#0f766e" />
        <ellipse cx="376" cy="238" rx="34" ry="6" fill="#14b8a6" />
      </Spot>
      <Spot term="glass" labelX={448} labelY={200}>
        <path d="M430 216 h36 l-5 46 h-26 z" fill="#bae6fd" opacity="0.55" />
        <path d="M434 240 h28 l-2 22 h-24 z" fill="#38bdf8" opacity="0.5" />
      </Spot>

      <Spot term="kitchen" labelX={660} labelY={30}>
        <rect x="580" y="62" width="160" height="60" rx="6" fill="#1c1917" stroke="#57534e" strokeWidth="2" />
        <text x="660" y="99" textAnchor="middle" fill="#f59e0b" fontSize="20" fontStyle="italic" fontFamily="var(--font-lora), Georgia, serif">
          the kitchen
        </text>
      </Spot>

      <Hanging x={885}>
        <Spot term="ladle" labelX={0} labelY={100}>
          <rect x="-3" y="132" width="6" height="74" fill="#a8a29e" />
          <path d="M-20 206 h40 q-2 26 -20 26 q-18 0 -20 -26 z" fill="#a8a29e" />
        </Spot>
      </Hanging>
      <Hanging x={935}>
        <Spot term="scoop" labelX={0} labelY={100}>
          <rect x="-3" y="132" width="6" height="58" fill="#d6d3d1" />
          <circle cx="0" cy="203" r="17" fill="#d6d3d1" />
        </Spot>
      </Hanging>
      <Hanging x={985}>
        <Spot term="tablespoon" labelX={0} labelY={86}>
          <rect x="-3" y="132" width="6" height="66" fill="#fbbf24" />
          <ellipse cx="0" cy="210" rx="13" ry="18" fill="#fbbf24" />
        </Spot>
      </Hanging>
      <Hanging x={1035}>
        <Spot term="teaspoon" labelX={0} labelY={100}>
          <rect x="-2" y="132" width="4" height="50" fill="#fbbf24" />
          <ellipse cx="0" cy="190" rx="9" ry="13" fill="#fbbf24" />
        </Spot>
      </Hanging>
      <Hanging x={1080}>
        <Spot term="spoon" labelX={0} labelY={86}>
          <rect x="-3" y="132" width="6" height="66" fill="#92400e" />
          <ellipse cx="0" cy="210" rx="14" ry="20" fill="#92400e" />
        </Spot>
      </Hanging>
      <Hanging x={1120}>
        <Spot term="fork" labelX={0} labelY={100}>
          <rect x="-3" y="132" width="6" height="56" fill="#d6d3d1" />
          <path d="M-11 186 h22 v8 h-3 v26 h-3 v-26 h-4 v26 h-3 v-26 h-4 v26 h-3 v-26 h-2 z" fill="#d6d3d1" />
        </Spot>
      </Hanging>
      <Hanging x={1160}>
        <Spot term="cleaver" labelX={0} labelY={86}>
          <rect x="-4" y="132" width="8" height="42" fill="#451a03" />
          <rect x="-22" y="174" width="44" height="62" rx="3" fill="url(#kitchen-steel)" />
        </Spot>
      </Hanging>

      <Spot term="stove" labelX={805} labelY={582}>
        <rect x="470" y="420" width="370" height="140" rx="4" fill="#44403c" />
        <rect x="470" y="420" width="370" height="13" fill="url(#kitchen-steel)" />
        <g fill="#1c1917">
          <circle cx="500" cy="444" r="6" />
          <circle cx="522" cy="444" r="6" />
          <circle cx="788" cy="444" r="6" />
          <circle cx="810" cy="444" r="6" />
        </g>
      </Spot>

      <Spot term="burner" labelX={436} labelY={410}>
        <rect x="482" y="414" width="86" height="6" rx="2" fill="#0c0a09" />
        <rect x="572" y="414" width="68" height="6" rx="2" fill="#0c0a09" />
        <rect x="652" y="414" width="70" height="6" rx="2" fill="#0c0a09" />
        <rect x="734" y="414" width="76" height="6" rx="2" fill="#0c0a09" />
      </Spot>

      <g fill="#38bdf8">
        <path className={`${styles.flame} ${styles.flamePot}`} d="M495 414 q8 -18 13 -2 q7 -22 14 0 q6 -18 13 0 q6 -14 12 2 z" />
        <path className={styles.flame} d="M585 414 q7 -14 12 0 q6 -16 13 0 q5 -12 12 0 z" />
        <path className={`${styles.flame} ${styles.flameKettle}`} d="M665 414 q7 -14 12 0 q6 -16 13 0 q5 -12 12 0 z" />
        <path className={`${styles.flame} ${styles.flamePan}`} d="M745 414 q8 -18 13 -2 q7 -22 14 0 q6 -18 13 0 z" />
      </g>

      <g fill="none" stroke="#e7e5e4" strokeWidth="5" strokeLinecap="round">
        <path className={`${styles.steam} ${styles.steamPot}`} d="M510 320 q-10 -14 0 -28 q10 -14 0 -28" />
        <path className={`${styles.steam} ${styles.steamPot}`} d="M536 320 q10 -14 0 -28 q-10 -14 0 -28" />
        <path className={`${styles.steam} ${styles.steamKettle}`} d="M738 322 q-10 -14 0 -28 q10 -14 0 -28" />
        <path className={`${styles.steam} ${styles.steamKettle}`} d="M722 310 q10 -14 0 -28 q-10 -14 0 -28" />
      </g>

      <Spot term="pot" labelX={448} labelY={352}>
        <rect x="484" y="346" width="84" height="66" rx="5" fill="url(#kitchen-steel)" />
        <rect x="472" y="358" width="14" height="8" rx="3" fill="#1c1917" />
        <rect x="566" y="358" width="14" height="8" rx="3" fill="#1c1917" />
        <ellipse cx="526" cy="346" rx="42" ry="7" fill="#7dd3fc" />
      </Spot>
      <g fill="#e0f2fe">
        <circle className={styles.bubble} cx="508" cy="345" r="4" />
        <circle className={styles.bubble} cx="524" cy="346" r="5" />
        <circle className={styles.bubble} cx="538" cy="344" r="3.5" />
        <circle className={styles.bubble} cx="552" cy="346" r="4" />
      </g>
      <g className={styles.spoonStir}>
        <rect x="522" y="262" width="7" height="86" rx="3" fill="#92400e" transform="rotate(14 526 305)" />
      </g>

      <Spot term="saucepan" labelX={606} labelY={345}>
        <rect x="576" y="372" width="60" height="40" rx="4" fill="url(#kitchen-copper)" />
        <ellipse cx="606" cy="372" rx="30" ry="5" fill="#451a03" />
        <rect x="598" y="352" width="60" height="7" rx="3" fill="#44403c" transform="rotate(-26 628 356)" />
      </Spot>

      <Spot term="kettle" labelX={688} labelY={323}>
        <path d="M656 412 q-6 -50 32 -52 q38 2 32 52 z" fill="#b91c1c" />
        <path d="M714 384 l26 -30 l6 6 l-22 38 z" fill="#991b1b" />
        <path d="M664 362 q24 -36 48 0" fill="none" stroke="#1c1917" strokeWidth="6" />
        <circle cx="688" cy="358" r="5" fill="#1c1917" />
      </Spot>

      <Spot term="pan" labelX={785} labelY={366}>
        <g className={styles.panBody}>
          <path d="M738 396 h78 l-8 16 h-62 z" fill="#292524" />
          <ellipse cx="777" cy="396" rx="39" ry="6" fill="#57534e" />
          <rect x="812" y="392" width="62" height="7" rx="3" fill="#1c1917" />
        </g>
      </Spot>
      <g fill="#fde047" style={{ pointerEvents: "none" }}>
        <circle className={styles.spatter} cx="755" cy="390" r="3" style={{ "--dx": "-14px" } as React.CSSProperties} />
        <circle className={styles.spatter} cx="770" cy="388" r="2.5" style={{ "--dx": "-5px" } as React.CSSProperties} />
        <circle className={styles.spatter} cx="785" cy="388" r="3" style={{ "--dx": "7px" } as React.CSSProperties} />
        <circle className={styles.spatter} cx="800" cy="390" r="2.5" style={{ "--dx": "15px" } as React.CSSProperties} />
      </g>

      <Spot term="oven" labelX={655} labelY={582}>
        <rect x="528" y="456" width="254" height="96" rx="6" fill="#292524" stroke="#57534e" strokeWidth="3" />
        <rect x="548" y="474" width="214" height="66" rx="4" fill="#120d0a" />
        <rect x="548" y="456" width="214" height="7" rx="3" fill="#d6d3d1" />
      </Spot>
      <g style={{ pointerEvents: "none" }}>
        <rect className={styles.ovenGlow} x="548" y="474" width="214" height="66" rx="4" fill="url(#kitchen-oven)" />
        <path className={styles.loaf} d="M605 536 q-2 -40 50 -40 q52 0 50 40 z" fill="#b45309" />
        <path className={styles.roastItem} d="M600 534 q10 -38 55 -36 q42 2 56 36 z" fill="#7c2d12" />
      </g>

      <Spot term="towel" labelX={498} labelY={582}>
        <path d="M478 456 h40 v82 l-10 -8 l-10 8 l-10 -8 l-10 8 z" fill="#f5f5f4" />
        <rect x="478" y="475" width="40" height="7" fill="#dc2626" />
        <rect x="478" y="492" width="40" height="7" fill="#dc2626" />
      </Spot>

      <Spot term="cloth" labelX={250} labelY={582}>
        <path d="M224 473 h52 v76 l-14 -7 l-12 7 l-13 -7 l-13 7 z" fill="#0d9488" />
      </Spot>

      <Spot term="salt" labelX={196} labelY={362}>
        <path d="M184 430 l4 -52 h16 l4 52 z" fill="#f5f5f4" />
        <rect x="187" y="370" width="18" height="10" rx="3" fill="#a8a29e" />
      </Spot>

      <Spot term="slicer" labelX={282} labelY={382}>
        <path d="M232 430 l18 -34 h72 l14 34 z" fill="#57534e" />
        <path d="M254 402 h60 l6 12 h-72 z" fill="url(#kitchen-steel)" />
      </Spot>

      <g className={styles.servePlate}>
        <ellipse cx="410" cy="424" rx="48" ry="7" fill="#f5f5f4" />
        <path d="M378 420 q32 -38 64 0 z" fill="#d97706" />
      </g>

      <Spot term="board" labelX={1000} labelY={445}>
        <rect x="850" y="418" width="180" height="12" rx="3" fill="#b4834f" />
      </Spot>
      <g style={{ pointerEvents: "none" }}>
        <path d="M880 418 q2 -18 22 -18 h44 v18 z" fill="#f97316" />
        <g fill="#f97316">
          <rect className={styles.piece} x="951" y="400" width="7" height="18" rx="2" />
          <rect className={styles.piece} x="963" y="400" width="7" height="18" rx="2" />
          <rect className={styles.piece} x="975" y="400" width="7" height="18" rx="2" />
          <rect className={styles.piece} x="987" y="400" width="7" height="18" rx="2" />
          <rect className={styles.cube} x="952" y="409" width="9" height="9" rx="1" />
          <rect className={styles.cube} x="964" y="409" width="9" height="9" rx="1" />
          <rect className={styles.cube} x="976" y="409" width="9" height="9" rx="1" />
          <rect className={styles.cube} x="988" y="409" width="9" height="9" rx="1" />
          <rect className={styles.cube} x="958" y="399" width="9" height="9" rx="1" />
          <rect className={styles.cube} x="970" y="399" width="9" height="9" rx="1" />
          <rect className={styles.cube} x="982" y="399" width="9" height="9" rx="1" />
        </g>
      </g>
      <Spot term="knife" labelX={940} labelY={322}>
        <g className={styles.knife}>
          <path d="M946 350 v50 q10 2 16 -14 l-2 -36 z" fill="url(#kitchen-steel)" />
          <rect x="944" y="340" width="20" height="12" rx="2" fill="#451a03" />
        </g>
      </Spot>

      <Spot term="microwave" labelX={1110} labelY={306}>
        <rect x="1048" y="322" width="130" height="108" rx="6" fill="#292524" stroke="#57534e" strokeWidth="2" />
        <rect x="1058" y="334" width="84" height="84" rx="4" fill="#120d0a" />
        <rect className={styles.microwaveGlow} x="1058" y="334" width="84" height="84" rx="4" fill="#fef08a" />
        <rect x="1150" y="336" width="20" height="14" rx="2" fill="#052e16" />
        <text x="1160" y="347" textAnchor="middle" fill="#4ade80" fontSize="9" fontFamily="monospace">
          12:00
        </text>
        <circle cx="1160" cy="375" r="6" fill="#57534e" />
        <circle cx="1160" cy="398" r="6" fill="#57534e" />
      </Spot>
    </svg>
  );
}
