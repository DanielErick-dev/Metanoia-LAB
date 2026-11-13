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
const TILE_COLUMNS = Array.from({ length: 46 }, (_, i) => i * 48);

export function KitchenScene({ action }: SceneProps) {
  return (
    <svg
      className={`${shared.canvas} ${styles.scene}`}
      data-action={action ?? undefined}
      viewBox="0 0 2200 620"
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

      <rect width="2200" height="620" fill="url(#kitchen-wall)" />
      <g stroke="#1c140e" strokeWidth="1.5" opacity="0.65">
        <rect x="0" y="176" width="2200" height="254" fill="#4a382b" stroke="none" />
        {TILE_ROWS.map((y) => (
          <line key={y} x1="0" y1={y} x2="2200" y2={y} />
        ))}
        {TILE_COLUMNS.map((x) => (
          <line key={x} x1={x} y1="176" x2={x} y2="430" />
        ))}
      </g>
      <rect width="2200" height="620" fill="url(#kitchen-lamp)" />
      <rect x="0" y="560" width="2200" height="60" fill="#1a130e" />

      <rect x="0" y="430" width="2200" height="18" fill="#7c5a3c" />
      <rect x="0" y="448" width="2200" height="112" fill="#33261c" />
      <g fill="none" stroke="#4d3a2b" strokeWidth="3">
        <rect x="175" y="460" width="135" height="88" rx="4" />
        <rect x="322" y="460" width="135" height="88" rx="4" />
        <rect x="845" y="460" width="150" height="88" rx="4" />
        <rect x="1007" y="460" width="150" height="88" rx="4" />
        <rect x="1440" y="460" width="150" height="88" rx="4" />
        <rect x="1602" y="460" width="150" height="88" rx="4" />
        <rect x="1764" y="460" width="150" height="88" rx="4" />
        <rect x="1926" y="460" width="150" height="88" rx="4" />
        <rect x="2088" y="460" width="100" height="88" rx="4" />
      </g>
      <g fill="#a8a29e">
        <rect x="228" y="470" width="30" height="5" rx="2" />
        <rect x="375" y="470" width="30" height="5" rx="2" />
        <rect x="905" y="470" width="30" height="5" rx="2" />
        <rect x="1067" y="470" width="30" height="5" rx="2" />
        <rect x="1500" y="470" width="30" height="5" rx="2" />
        <rect x="1662" y="470" width="30" height="5" rx="2" />
        <rect x="1824" y="470" width="30" height="5" rx="2" />
        <rect x="1986" y="470" width="30" height="5" rx="2" />
        <rect x="2123" y="470" width="30" height="5" rx="2" />
      </g>

      <polygon points="560,40 760,40 800,176 520,176" fill="#292524" />
      <rect x="512" y="176" width="296" height="12" fill="#57534e" />

      <rect x="172" y="132" width="310" height="9" fill="#7c5a3c" />
      <rect x="172" y="262" width="310" height="9" fill="#7c5a3c" />
      <rect x="850" y="112" width="320" height="6" rx="3" fill="#a8a29e" />
      <rect x="1480" y="132" width="360" height="9" fill="#7c5a3c" />
      <rect x="1480" y="262" width="360" height="9" fill="#7c5a3c" />
      <rect x="1850" y="112" width="330" height="6" rx="3" fill="#a8a29e" />

      <Spot term="freezer" labelX={92} labelY={160}>
        <rect x="30" y="172" width="125" height="127" rx="10" fill="#a8a29e" />
        <rect x="30" y="172" width="125" height="127" rx="10" fill="url(#kitchen-steel)" opacity="0.6" />
        <rect x="138" y="225" width="7" height="55" rx="3" fill="#44403c" />
        <path d="M56 214 v28 M44 221 l24 14 M44 235 l24 -14" stroke="#e0f2fe" strokeWidth="3" strokeLinecap="round" />
      </Spot>
      <Spot term="fridge" labelX={92} labelY={440}>
        <rect x="30" y="301" width="125" height="259" rx="10" fill="#a8a29e" />
        <rect x="30" y="301" width="125" height="259" rx="10" fill="url(#kitchen-steel)" opacity="0.6" />
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

      <Spot term="cupboard" labelX={1340} labelY={30}>
        <rect x="1230" y="44" width="220" height="150" rx="6" fill="#5b4331" stroke="#3f2d20" strokeWidth="3" />
        <rect x="1242" y="56" width="94" height="126" rx="4" fill="none" stroke="#7c5a3c" strokeWidth="3" />
        <rect x="1344" y="56" width="94" height="126" rx="4" fill="none" stroke="#7c5a3c" strokeWidth="3" />
        <circle cx="1326" cy="120" r="5" fill="#a8a29e" />
        <circle cx="1354" cy="120" r="5" fill="#a8a29e" />
      </Spot>

      <Spot term="flour" labelX={1505} labelY={48}>
        <path d="M1482 132 v-52 l6 -8 h34 l6 8 v52 z" fill="#f5f5f4" />
        <rect x="1482" y="96" width="46" height="10" fill="#fbbf24" />
      </Spot>
      <Spot term="oats" labelX={1565} labelY={34}>
        <rect x="1545" y="84" width="40" height="48" rx="6" fill="#92400e" />
        <rect x="1542" y="76" width="46" height="10" rx="3" fill="#fde68a" />
      </Spot>
      <Spot term="oil" labelX={1622} labelY={48}>
        <path d="M1612 132 v-40 q0 -9 7 -13 v-12 h8 v12 q7 4 7 13 v40 z" fill="#eab308" opacity="0.85" />
        <rect x="1618" y="61" width="10" height="7" rx="2" fill="#15803d" />
      </Spot>
      <Spot term="margarine" labelX={1686} labelY={34}>
        <path d="M1662 132 l-4 -28 h56 l-4 28 z" fill="#fde047" />
        <rect x="1655" y="96" width="62" height="9" rx="3" fill="#ca8a04" />
      </Spot>
      <Spot term="wheat" labelX={1750} labelY={48}>
        <path d="M1738 132 l-3 -24 h30 l-3 24 z" fill="#a16207" />
        <path d="M1750 108 l-12 -36 M1750 108 v-40 M1750 108 l12 -36" stroke="#ca8a04" strokeWidth="2.5" fill="none" />
        <g fill="#facc15">
          <ellipse cx="1737" cy="70" rx="4" ry="9" transform="rotate(-18 1737 70)" />
          <ellipse cx="1750" cy="64" rx="4" ry="9" />
          <ellipse cx="1763" cy="70" rx="4" ry="9" transform="rotate(18 1763 70)" />
        </g>
      </Spot>
      <Spot term="chopsticks" labelX={1818} labelY={34}>
        <path d="M1808 100 l-6 -40 M1818 100 l6 -40" stroke="#b91c1c" strokeWidth="4" strokeLinecap="round" />
        <rect x="1802" y="98" width="24" height="34" rx="3" fill="#1c1917" />
      </Spot>

      <Spot term="cup" labelX={1500} labelY={204}>
        <ellipse cx="1500" cy="258" rx="24" ry="4" fill="#e7e5e4" />
        <path d="M1486 255 l-2 -22 h32 l-2 22 z" fill="#f5f5f4" />
        <rect x="1485" y="240" width="30" height="5" fill="#2563eb" />
        <path d="M1515 238 q12 0 10 10 q-2 7 -11 6" stroke="#f5f5f4" strokeWidth="4" fill="none" />
      </Spot>
      <Spot term="mug" labelX={1557} labelY={204}>
        <rect x="1540" y="228" width="32" height="34" rx="4" fill="#2563eb" />
        <path d="M1572 236 q14 0 12 12 q-2 10 -12 8" stroke="#2563eb" strokeWidth="5" fill="none" />
      </Spot>
      <Spot term="egg" labelX={1616} labelY={204}>
        <g fill="#fef3c7">
          <ellipse cx="1602" cy="242" rx="7" ry="9" />
          <ellipse cx="1616" cy="240" rx="7" ry="9" />
          <ellipse cx="1630" cy="242" rx="7" ry="9" />
        </g>
        <rect x="1592" y="246" width="48" height="16" rx="2" fill="#a8a29e" />
      </Spot>
      <Spot term="onion" labelX={1676} labelY={204}>
        <path d="M1676 262 q-18 -3 -17 -20 q2 -13 17 -19 q15 6 17 19 q1 17 -17 20 z" fill="#c084fc" />
        <path d="M1676 223 q-2 -8 2 -12" stroke="#4d7c0f" strokeWidth="3" fill="none" />
        <path d="M1676 228 q-10 14 0 32 M1676 228 q10 14 0 32" stroke="#7e22ce" strokeWidth="1.5" fill="none" />
      </Spot>
      <Spot term="lettuce" labelX={1734} labelY={204}>
        <circle cx="1734" cy="244" r="17" fill="#4ade80" />
        <circle cx="1720" cy="252" r="11" fill="#22c55e" />
        <circle cx="1748" cy="252" r="11" fill="#22c55e" />
        <path d="M1734 232 v26" stroke="#bbf7d0" strokeWidth="2" />
      </Spot>
      <Spot term="poultry" labelX={1800} labelY={204}>
        <ellipse cx="1800" cy="258" rx="30" ry="4" fill="#e7e5e4" />
        <path d="M1780 255 q0 -24 22 -24 q20 0 20 24 z" fill="#fca5a5" />
        <path d="M1784 248 l-10 -8 M1818 248 l10 -8" stroke="#fca5a5" strokeWidth="7" strokeLinecap="round" />
        <circle cx="1772" cy="239" r="4" fill="#fef2f2" />
        <circle cx="1830" cy="239" r="4" fill="#fef2f2" />
      </Spot>

      <Hanging x={1875}>
        <Spot term="spatula" labelX={0} labelY={100}>
          <rect x="-3" y="132" width="6" height="60" fill="#1c1917" />
          <rect x="-14" y="190" width="28" height="36" rx="4" fill="#f97316" />
        </Spot>
      </Hanging>
      <Hanging x={1925}>
        <Spot term="tongs" labelX={0} labelY={86}>
          <path d="M-3 132 L-11 226 M3 132 L11 226" stroke="url(#kitchen-steel)" strokeWidth="6" strokeLinecap="round" fill="none" />
          <rect x="-6" y="130" width="12" height="10" rx="3" fill="#44403c" />
        </Spot>
      </Hanging>
      <Hanging x={1975}>
        <Spot term="whisk" labelX={0} labelY={100}>
          <rect x="-4" y="132" width="8" height="42" rx="3" fill="#a8a29e" />
          <path d="M0 172 q-20 32 0 62 q20 -30 0 -62 M0 172 q-9 32 0 62 q9 -30 0 -62" stroke="#d6d3d1" strokeWidth="2.5" fill="none" />
        </Spot>
      </Hanging>
      <Hanging x={2030}>
        <Spot term="peeler" labelX={0} labelY={86}>
          <rect x="-5" y="132" width="10" height="46" rx="4" fill="#16a34a" />
          <rect x="-10" y="178" width="20" height="28" rx="3" fill="none" stroke="#d6d3d1" strokeWidth="3" />
          <line x1="0" y1="181" x2="0" y2="203" stroke="#d6d3d1" strokeWidth="2" />
        </Spot>
      </Hanging>
      <Hanging x={2085}>
        <Spot term="shears" labelX={0} labelY={100}>
          <circle cx="-8" cy="142" r="8" fill="none" stroke="#dc2626" strokeWidth="4" />
          <circle cx="8" cy="142" r="8" fill="none" stroke="#dc2626" strokeWidth="4" />
          <path d="M-5 150 L5 222 M5 150 L-5 222" stroke="url(#kitchen-steel)" strokeWidth="5" strokeLinecap="round" />
        </Spot>
      </Hanging>
      <Hanging x={2145}>
        <Spot term="corkscrew" labelX={0} labelY={86}>
          <rect x="-18" y="132" width="36" height="9" rx="4" fill="#92400e" />
          <path d="M0 141 v8 q9 4 0 8 q-9 4 0 8 q9 4 0 8 q-9 4 0 8 q9 4 0 8 v8" stroke="#d6d3d1" strokeWidth="3" fill="none" />
        </Spot>
      </Hanging>

      <Spot term="dishwasher" labelX={1330} labelY={582}>
        <rect x="1240" y="452" width="180" height="104" rx="4" fill="url(#kitchen-steel)" />
        <rect x="1240" y="452" width="180" height="16" fill="#44403c" />
        <circle cx="1400" cy="460" r="3" fill="#4ade80" />
        <circle cx="1388" cy="460" r="3" fill="#a8a29e" />
        <rect x="1300" y="478" width="60" height="6" rx="3" fill="#292524" />
      </Spot>

      <Spot term="sink" labelX={1270} labelY={412}>
        <rect x="1250" y="420" width="160" height="12" rx="3" fill="url(#kitchen-steel)" />
        <rect x="1262" y="424" width="136" height="5" rx="2" fill="#1c1917" />
      </Spot>
      <rect className={styles.water} x="1300" y="358" width="7" height="64" rx="3" fill="#7dd3fc" style={{ pointerEvents: "none" }} />
      <Spot term="faucet" labelX={1356} labelY={330}>
        <rect x="1342" y="402" width="16" height="20" rx="3" fill="#a8a29e" />
        <path d="M1350 404 V362 q0 -20 -20 -20 h-26 v14" stroke="url(#kitchen-steel)" strokeWidth="9" fill="none" />
        <rect x="1358" y="392" width="16" height="6" rx="3" fill="#57534e" />
      </Spot>

      <Spot term="soap" labelX={1447} labelY={356}>
        <path d="M1436 430 v-38 q0 -8 8 -8 h6 q8 0 8 8 v38 z" fill="#22c55e" />
        <rect x="1444" y="370" width="6" height="14" fill="#e7e5e4" />
        <rect x="1440" y="366" width="16" height="5" rx="2" fill="#e7e5e4" />
      </Spot>
      <Spot term="sponge" labelX={1487} labelY={404}>
        <rect x="1468" y="414" width="38" height="16" rx="3" fill="#facc15" />
        <rect x="1468" y="414" width="38" height="5" rx="2" fill="#16a34a" />
      </Spot>
      <Spot term="colander" labelX={1555} labelY={382}>
        <path d="M1520 400 h70 q-4 30 -35 30 q-31 0 -35 -30 z" fill="#e11d48" />
        <rect x="1512" y="398" width="86" height="5" rx="2" fill="#be123c" />
        <g fill="#261b14">
          <circle cx="1540" cy="412" r="2.5" />
          <circle cx="1555" cy="414" r="2.5" />
          <circle cx="1570" cy="412" r="2.5" />
          <circle cx="1547" cy="422" r="2.5" />
          <circle cx="1563" cy="422" r="2.5" />
        </g>
      </Spot>

      <Spot term="toast" labelX={1660} labelY={346}>
        <g className={styles.toastSlice}>
          <path d="M1634 386 v-18 q0 -8 10 -8 q10 0 10 8 v18 z" fill="#d97706" />
          <path d="M1668 386 v-18 q0 -8 10 -8 q10 0 10 8 v18 z" fill="#d97706" />
        </g>
      </Spot>
      <Spot term="toaster" labelX={1660} labelY={414}>
        <rect x="1615" y="382" width="90" height="48" rx="14" fill="url(#kitchen-steel)" />
        <rect x="1631" y="380" width="26" height="6" rx="2" fill="#1c1917" />
        <rect x="1665" y="380" width="26" height="6" rx="2" fill="#1c1917" />
        <rect x="1703" y="396" width="9" height="6" rx="2" fill="#1c1917" />
      </Spot>

      <Spot term="blender" labelX={1752} labelY={300}>
        <rect x="1728" y="400" width="48" height="30" rx="4" fill="#292524" />
        <circle cx="1752" cy="415" r="4" fill="#ef4444" />
        <path d="M1730 400 l-4 -76 h52 l-4 76 z" fill="#bae6fd" opacity="0.45" />
        <path className={styles.blendContent} d="M1732 400 l-2 -38 h44 l-2 38 z" fill="#f472b6" opacity="0.75" />
        <rect x="1724" y="318" width="56" height="8" rx="3" fill="#1c1917" />
      </Spot>
      <Spot term="juicer" labelX={1815} labelY={382}>
        <path d="M1792 430 q0 -16 23 -16 q23 0 23 16 z" fill="#fbbf24" />
        <path d="M1804 416 l11 -22 l11 22 z" fill="#fde68a" />
      </Spot>
      <Spot term="juice" labelX={1872} labelY={356}>
        <path d="M1857 430 l-3 -48 h36 l-3 48 z" fill="#bae6fd" opacity="0.5" />
        <path d="M1856 404 h34 l-2 26 h-30 z" fill="#fb923c" />
      </Spot>
      <Spot term="grater" labelX={1925} labelY={352}>
        <path d="M1908 430 l4 -60 h26 l4 60 z" fill="url(#kitchen-steel)" />
        <rect x="1916" y="362" width="18" height="7" rx="3" fill="#1c1917" />
        <g fill="#44403c">
          <circle cx="1918" cy="390" r="1.6" />
          <circle cx="1925" cy="390" r="1.6" />
          <circle cx="1932" cy="390" r="1.6" />
          <circle cx="1918" cy="402" r="1.6" />
          <circle cx="1925" cy="402" r="1.6" />
          <circle cx="1932" cy="402" r="1.6" />
          <circle cx="1918" cy="414" r="1.6" />
          <circle cx="1925" cy="414" r="1.6" />
          <circle cx="1932" cy="414" r="1.6" />
        </g>
      </Spot>
      <Spot term="tray" labelX={2010} labelY={402}>
        <rect x="1960" y="423" width="100" height="7" rx="2" fill="#78716c" />
        <g fill="#b45309">
          <ellipse cx="1980" cy="420" rx="9" ry="4" />
          <ellipse cx="2005" cy="420" rx="9" ry="4" />
          <ellipse cx="2030" cy="420" rx="9" ry="4" />
        </g>
      </Spot>
      <Spot term="roll" labelX={2130} labelY={392}>
        <ellipse cx="2128" cy="426" rx="46" ry="5" fill="#fef3c7" />
        <rect x="2090" y="406" width="76" height="14" rx="7" fill="#d4a373" />
        <rect x="2074" y="410" width="18" height="6" rx="3" fill="#92400e" />
        <rect x="2164" y="410" width="18" height="6" rx="3" fill="#92400e" />
      </Spot>
    </svg>
  );
}
