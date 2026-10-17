import fs from "fs";
import path from "path";

const targetDir = path.resolve("starter-kits/pro-templates/public/assets/nexus");
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

// 1. work-kroma.svg (Institutional Fintech Terminal)
const kromaSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 1000" fill="none">
  <defs>
    <radialGradient id="bgGlow" cx="50%" cy="40%" r="60%">
      <stop offset="0%" stop-color="#794a8b" stop-opacity="0.25"/>
      <stop offset="100%" stop-color="#070609" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="purpleGrad" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#794a8b"/>
      <stop offset="100%" stop-color="#c78ee0"/>
    </linearGradient>
    <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#794a8b" stop-opacity="0.35"/>
      <stop offset="100%" stop-color="#794a8b" stop-opacity="0"/>
    </linearGradient>
    <linearGradient id="glass" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0.08"/>
      <stop offset="100%" stop-color="#ffffff" stop-opacity="0.02"/>
    </linearGradient>
    <filter id="blurFilter" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="60"/>
    </filter>
  </defs>

  <!-- Deep Obsidian Void Background -->
  <rect width="1600" height="1000" fill="#09080d"/>
  <rect width="1600" height="1000" fill="url(#bgGlow)"/>

  <!-- Precision Architectural Grid Lines -->
  <g opacity="0.12" stroke="#ffffff">
    <line x1="200" y1="0" x2="200" y2="1000" stroke-width="1"/>
    <line x1="500" y1="0" x2="500" y2="1000" stroke-width="1"/>
    <line x1="800" y1="0" x2="800" y2="1000" stroke-width="1"/>
    <line x1="1100" y1="0" x2="1100" y2="1000" stroke-width="1"/>
    <line x1="1400" y1="0" x2="1400" y2="1000" stroke-width="1"/>
    <line x1="0" y1="200" x2="1600" y2="200" stroke-width="1"/>
    <line x1="0" y1="500" x2="1600" y2="500" stroke-width="1"/>
    <line x1="0" y1="800" x2="1600" y2="800" stroke-width="1"/>
  </g>

  <!-- Floating Holographic Glass Terminal Card -->
  <g transform="translate(180, 140)">
    <!-- Ambient Drop Shadow -->
    <rect x="20" y="30" width="1200" height="700" rx="24" fill="#000000" opacity="0.6" filter="url(#blurFilter)"/>
    
    <!-- Outer Titanium Bezel -->
    <rect width="1240" height="720" rx="24" fill="#13111a" stroke="#2c2738" stroke-width="1.5"/>
    <rect x="2" y="2" width="1236" height="716" rx="22" fill="url(#glass)"/>

    <!-- Terminal Header Bar -->
    <line x1="0" y1="70" x2="1240" y2="70" stroke="#252130" stroke-width="1"/>
    <circle cx="40" cy="35" r="5" fill="#363045"/>
    <circle cx="60" cy="35" r="5" fill="#363045"/>
    <circle cx="80" cy="35" r="5" fill="#363045"/>
    <text x="120" y="40" font-family="monospace" font-size="13" fill="#8d879c" letter-spacing="3">KROMA CAPITAL / QUANTITATIVE INFRASTRUCTURE</text>
    <text x="1100" y="40" font-family="monospace" font-size="12" fill="#794a8b" letter-spacing="2">ACTIVE SPRINT .04</text>

    <!-- Metric Panel Left -->
    <g transform="translate(60, 120)">
      <text x="0" y="20" font-family="monospace" font-size="12" fill="#7d778c" letter-spacing="2">PORTFOLIO YIELD</text>
      <text x="0" y="80" font-family="system-ui, sans-serif" font-size="64" font-weight="300" fill="#ffffff" letter-spacing="-2">$4.82M</text>
      <rect x="0" y="105" width="90" height="26" rx="13" fill="#794a8b" fill-opacity="0.2"/>
      <text x="15" y="122" font-family="monospace" font-size="12" fill="#c78ee0" font-weight="500">+218.4%</text>

      <!-- Sub metrics -->
      <g transform="translate(0, 180)">
        <text x="0" y="0" font-family="monospace" font-size="11" fill="#5e586c">SHARPE RATIO</text>
        <text x="0" y="25" font-family="monospace" font-size="20" fill="#e2deeb">3.42</text>

        <text x="140" y="0" font-family="monospace" font-size="11" fill="#5e586c">LATENCY</text>
        <text x="140" y="25" font-family="monospace" font-size="20" fill="#e2deeb">1.2ms</text>

        <text x="0" y="80" font-family="monospace" font-size="11" fill="#5e586c">SECURITY AUDIT</text>
        <text x="0" y="105" font-family="monospace" font-size="20" fill="#c78ee0">PASSED 100%</text>
      </g>
    </g>

    <!-- Main Chart Curve Area Right -->
    <g transform="translate(420, 110)">
      <!-- Chart Grid Lines -->
      <line x1="0" y1="60" x2="740" y2="60" stroke="#252130" stroke-width="1" stroke-dasharray="4 6"/>
      <line x1="0" y1="160" x2="740" y2="160" stroke="#252130" stroke-width="1" stroke-dasharray="4 6"/>
      <line x1="0" y1="260" x2="740" y2="260" stroke="#252130" stroke-width="1" stroke-dasharray="4 6"/>
      <line x1="0" y1="360" x2="740" y2="360" stroke="#252130" stroke-width="1" stroke-dasharray="4 6"/>

      <!-- Smooth Bezier Yield Curve Fill & Stroke -->
      <path d="M 0 380 Q 140 370 240 280 T 460 220 T 640 110 L 740 70 L 740 460 L 0 460 Z" fill="url(#chartGrad)"/>
      <path d="M 0 380 Q 140 370 240 280 T 460 220 T 640 110 L 740 70" stroke="url(#purpleGrad)" stroke-width="3" fill="none"/>
      
      <!-- Key Data Marker -->
      <circle cx="740" cy="70" r="6" fill="#c78ee0"/>
      <circle cx="740" cy="70" r="14" stroke="#c78ee0" stroke-width="1.5" stroke-opacity="0.4"/>
    </g>
  </g>
</svg>`;

// 2. work-aura.svg (Luxury Biometric Wearable)
const auraSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 900" fill="none">
  <defs>
    <radialGradient id="auraGlow" cx="50%" cy="45%" r="50%">
      <stop offset="0%" stop-color="#794a8b" stop-opacity="0.22"/>
      <stop offset="100%" stop-color="#08070b" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="metal" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#3c3747"/>
      <stop offset="50%" stop-color="#1e1b24"/>
      <stop offset="100%" stop-color="#110f15"/>
    </linearGradient>
    <linearGradient id="goldRim" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#c78ee0"/>
      <stop offset="50%" stop-color="#794a8b"/>
      <stop offset="100%" stop-color="#462552"/>
    </linearGradient>
  </defs>

  <rect width="1200" height="900" fill="#08070b"/>
  <rect width="1200" height="900" fill="url(#auraGlow)"/>

  <!-- Minimal Hairline Pedestal Plinth -->
  <path d="M 250 680 L 950 680 L 850 780 L 350 780 Z" fill="#121017" stroke="#252130" stroke-width="1"/>
  <line x1="150" y1="680" x2="1050" y2="680" stroke="#252130" stroke-width="1" stroke-dasharray="2 6"/>

  <!-- Aura Smart Ring (Sculptural Minimalist Centerpiece) -->
  <g transform="translate(600, 420)">
    <!-- Shadow -->
    <ellipse cx="0" cy="180" rx="200" ry="24" fill="#000000" opacity="0.6"/>

    <!-- Concentric Sensor Rings -->
    <circle cx="0" cy="0" r="190" stroke="#231f2b" stroke-width="1"/>
    <circle cx="0" cy="0" r="160" stroke="#363042" stroke-width="1" stroke-dasharray="4 8"/>

    <!-- Outer Titanium Ring -->
    <circle cx="0" cy="0" r="130" fill="url(#metal)" stroke="#4b4457" stroke-width="2"/>
    <!-- Inner Core Void -->
    <circle cx="0" cy="0" r="95" fill="#0c0a10" stroke="#1d1924" stroke-width="1.5"/>

    <!-- Precision Sensor Arc with Purple Glow -->
    <path d="M -70 -65 A 95 95 0 0 1 70 -65" fill="none" stroke="url(#goldRim)" stroke-width="6" stroke-linecap="round"/>
    <circle cx="0" cy="-65" r="4" fill="#c78ee0"/>

    <!-- Monolithic Index Typography -->
    <text x="0" y="10" font-family="monospace" font-size="12" fill="#8c8699" text-anchor="middle" letter-spacing="4">AURA NEURO</text>
    <text x="0" y="30" font-family="monospace" font-size="10" fill="#595463" text-anchor="middle" letter-spacing="2">TITANIUM BAND 01</text>
  </g>
</svg>`;

// 3. work-vesper.svg (Architectural Ceramics & Spatial Design)
const vesperSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 900" fill="none">
  <defs>
    <linearGradient id="warmStone" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#16141c"/>
      <stop offset="100%" stop-color="#0a090e"/>
    </linearGradient>
    <linearGradient id="flutedGlass" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0.15"/>
      <stop offset="50%" stop-color="#794a8b" stop-opacity="0.25"/>
      <stop offset="100%" stop-color="#ffffff" stop-opacity="0.05"/>
    </linearGradient>
  </defs>

  <rect width="1200" height="900" fill="#0b0a0f"/>

  <!-- Architectural Gallery Background Lines -->
  <line x1="300" y1="0" x2="300" y2="900" stroke="#1e1a26" stroke-width="1"/>
  <line x1="900" y1="0" x2="900" y2="900" stroke="#1e1a26" stroke-width="1"/>
  <line x1="0" y1="620" x2="1200" y2="620" stroke="#262130" stroke-width="1"/>

  <!-- Pedestal Block -->
  <rect x="360" y="620" width="480" height="240" fill="url(#warmStone)" stroke="#262130" stroke-width="1"/>

  <!-- Minimalist Sculptural Vessel (Vesper Ceramic Silhouette) -->
  <g transform="translate(520, 360)">
    <ellipse cx="0" cy="240" rx="80" ry="16" fill="#000000" opacity="0.4"/>
    <path d="M -60 230 C -90 120, -50 0, -30 -70 L 30 -70 C 50 0, 90 120, 60 230 Z" fill="#181621" stroke="#3d3747" stroke-width="1.5"/>
    <ellipse cx="0" cy="-70" rx="30" ry="8" fill="#242130" stroke="#4a4357" stroke-width="1"/>
  </g>

  <!-- Luminous Frosted Glass Orb Lamp -->
  <g transform="translate(680, 480)">
    <circle cx="0" cy="0" r="90" fill="url(#flutedGlass)" stroke="#c78ee0" stroke-width="1" stroke-opacity="0.4"/>
    <circle cx="0" cy="0" r="28" fill="#ffffff" fill-opacity="0.85"/>
    <circle cx="0" cy="0" r="50" fill="#794a8b" fill-opacity="0.25"/>
  </g>

  <text x="390" y="660" font-family="monospace" font-size="11" fill="#6d677a" letter-spacing="3">VESPER / SCULPTURAL EDITION</text>
  <text x="390" y="685" font-family="serif" font-style="italic" font-size="18" fill="#c78ee0">Kinfolk &amp; Spatial Form</text>
</svg>`;

// 4. work-synapse.svg (AI Foundation Obsidian Cube)
const synapseSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 1000" fill="none">
  <defs>
    <radialGradient id="cubeGlow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#794a8b" stop-opacity="0.3"/>
      <stop offset="100%" stop-color="#000000" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <rect width="1600" height="1000" fill="#08070c"/>
  <rect width="1600" height="1000" fill="url(#cubeGlow)"/>

  <!-- Studio Coordinate Crosshairs -->
  <g opacity="0.15" stroke="#ffffff">
    <line x1="800" y1="100" x2="800" y2="900" stroke-width="1"/>
    <line x1="200" y1="500" x2="1400" y2="500" stroke-width="1"/>
  </g>

  <!-- Isometric Glass Cube & Floating Obsidian Core -->
  <g transform="translate(800, 500)">
    <!-- Glass Box Wireframe -->
    <polygon points="0,-220 220,-90 0,40 -220,-90" fill="#ffffff" fill-opacity="0.03" stroke="#3d374a" stroke-width="1.5"/>
    <polygon points="0,40 220,-90 220,180 0,310" fill="#ffffff" fill-opacity="0.02" stroke="#3d374a" stroke-width="1.5"/>
    <polygon points="0,40 -220,-90 -220,180 0,310" fill="#ffffff" fill-opacity="0.04" stroke="#3d374a" stroke-width="1.5"/>

    <!-- Inner Floating Obsidian Neural Sphere -->
    <circle cx="0" cy="50" r="110" fill="#13101c" stroke="#794a8b" stroke-width="2"/>
    <ellipse cx="0" cy="50" rx="100" ry="30" stroke="#c78ee0" stroke-width="1.2" stroke-opacity="0.5" stroke-dasharray="3 6"/>
    <circle cx="0" cy="50" r="50" fill="#794a8b" fill-opacity="0.35"/>
    <circle cx="0" cy="50" r="12" fill="#ffffff"/>
  </g>

  <text x="800" y="880" font-family="monospace" font-size="13" fill="#8c8599" text-anchor="middle" letter-spacing="4">SYNAPSE INTELLIGENCE SYSTEM</text>
  <text x="800" y="910" font-family="monospace" font-size="11" fill="#794a8b" text-anchor="middle" letter-spacing="2">FOUNDATION MODEL .05</text>
</svg>`;

// 5. Services SVGs
const serviceBrandSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800" fill="none">
  <rect width="1200" height="800" fill="#0a090e"/>
  <rect x="100" y="80" width="1000" height="640" rx="16" fill="#13111a" stroke="#272333" stroke-width="1"/>
  
  <!-- Typography Specimen Rows -->
  <g transform="translate(160, 160)">
    <text x="0" y="0" font-family="monospace" font-size="11" fill="#794a8b" letter-spacing="3">[ TOKEN SYSTEM .01 ]</text>
    <text x="0" y="60" font-family="serif" font-style="italic" font-size="44" fill="#ffffff">Instrument Serif</text>
    <text x="0" y="110" font-family="system-ui, sans-serif" font-size="28" font-weight="300" fill="#a49eb3">Inter Tight Sans Scaled</text>

    <!-- Pantone Chips -->
    <g transform="translate(0, 180)">
      <rect x="0" y="0" width="120" height="150" rx="8" fill="#794a8b"/>
      <rect x="0" y="100" width="120" height="50" rx="0" fill="#1a1624"/>
      <text x="12" y="125" font-family="monospace" font-size="10" fill="#ffffff">#794A8B</text>
      <text x="12" y="140" font-family="monospace" font-size="9" fill="#888196">PRIMARY</text>

      <rect x="150" y="0" width="120" height="150" rx="8" fill="#c78ee0"/>
      <rect x="150" y="100" width="120" height="50" rx="0" fill="#1a1624"/>
      <text x="162" y="125" font-family="monospace" font-size="10" fill="#ffffff">#C78EE0</text>
      <text x="162" y="140" font-family="monospace" font-size="9" fill="#888196">ACCENT</text>

      <rect x="300" y="0" width="120" height="150" rx="8" fill="#1b1824"/>
      <rect x="300" y="100" width="120" height="50" rx="0" fill="#0d0b12"/>
      <text x="312" y="125" font-family="monospace" font-size="10" fill="#ffffff">#1B1824</text>
      <text x="312" y="140" font-family="monospace" font-size="9" fill="#888196">SURFACE</text>
    </g>
  </g>
</svg>`;

const serviceWebAppSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800" fill="none">
  <rect width="1200" height="800" fill="#09080d"/>
  <rect x="120" y="100" width="960" height="600" rx="20" fill="#110f17" stroke="#252130" stroke-width="1.5"/>
  <line x1="120" y1="160" x2="1080" y2="160" stroke="#252130" stroke-width="1"/>
  <circle cx="160" cy="130" r="5" fill="#363045"/>
  <circle cx="180" cy="130" r="5" fill="#363045"/>
  <circle cx="200" cy="130" r="5" fill="#363045"/>
  <text x="240" y="135" font-family="monospace" font-size="12" fill="#756f82">app/nexus/page.tsx</text>
  
  <g transform="translate(180, 220)">
    <text x="0" y="0" font-family="monospace" font-size="16" fill="#794a8b">export default function <tspan fill="#ffffff">Application</tspan>() {</text>
    <text x="30" y="40" font-family="monospace" font-size="16" fill="#888196">const [ready, setReady] = useState(true);</text>
    <text x="30" y="80" font-family="monospace" font-size="16" fill="#c78ee0">return &lt;Engine.Canvas mode="instant" /&gt;;</text>
    <text x="0" y="120" font-family="monospace" font-size="16" fill="#794a8b">}</text>

    <!-- Mini Dashboard Render -->
    <rect x="0" y="170" width="840" height="240" rx="12" fill="#171421" stroke="#312a3d" stroke-width="1"/>
    <rect x="30" y="200" width="220" height="180" rx="8" fill="#1e1a2b"/>
    <rect x="280" y="200" width="530" height="180" rx="8" fill="#1e1a2b"/>
  </g>
</svg>`;

const serviceShopifySvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800" fill="none">
  <rect width="1200" height="800" fill="#08070c"/>
  <rect x="140" y="120" width="920" height="560" rx="16" fill="#121017" stroke="#24202e" stroke-width="1"/>
  
  <g transform="translate(200, 200)">
    <rect x="0" y="0" width="360" height="400" rx="12" fill="#191624" stroke="#302a3d" stroke-width="1"/>
    <!-- Perfume Silhouette -->
    <rect x="130" y="80" width="100" height="180" rx="10" fill="#292336" stroke="#483d57" stroke-width="1"/>
    <rect x="150" y="50" width="60" height="30" rx="4" fill="#794a8b"/>
    <text x="180" y="320" font-family="monospace" font-size="12" fill="#a099ad" text-anchor="middle" letter-spacing="2">EAU DE NOIR</text>
    <text x="180" y="350" font-family="monospace" font-size="14" fill="#c78ee0" text-anchor="middle">$280</text>

    <g transform="translate(420, 40)">
      <text x="0" y="0" font-family="monospace" font-size="11" fill="#794a8b" letter-spacing="3">[ COMMERCE ENGINE ]</text>
      <text x="0" y="50" font-family="system-ui, sans-serif" font-size="36" font-weight="300" fill="#ffffff">One-Click Checkout</text>
      <text x="0" y="90" font-family="system-ui, sans-serif" font-size="16" fill="#888196">Sub-second headless Shopify storefront.</text>
      
      <rect x="0" y="140" width="220" height="48" rx="24" fill="#794a8b"/>
      <text x="110" y="170" font-family="system-ui, sans-serif" font-size="14" font-weight="500" fill="#ffffff" text-anchor="middle">Buy in 1-Click</text>
    </g>
  </g>
</svg>`;

const serviceAuditSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800" fill="none">
  <rect width="1200" height="800" fill="#09080d"/>
  <rect x="140" y="120" width="920" height="560" rx="16" fill="#121017" stroke="#24202e" stroke-width="1"/>
  
  <g transform="translate(240, 240)">
    <!-- 4 Gauge Circles -->
    <g transform="translate(0, 0)">
      <circle cx="60" cy="60" r="54" stroke="#252130" stroke-width="8"/>
      <circle cx="60" cy="60" r="54" stroke="#794a8b" stroke-width="8" stroke-dasharray="320 340" stroke-linecap="round"/>
      <text x="60" y="68" font-family="monospace" font-size="28" font-weight="300" fill="#ffffff" text-anchor="middle">100</text>
      <text x="60" y="150" font-family="monospace" font-size="11" fill="#888196" text-anchor="middle" letter-spacing="2">PERF</text>
    </g>

    <g transform="translate(180, 0)">
      <circle cx="60" cy="60" r="54" stroke="#252130" stroke-width="8"/>
      <circle cx="60" cy="60" r="54" stroke="#c78ee0" stroke-width="8" stroke-dasharray="310 340" stroke-linecap="round"/>
      <text x="60" y="68" font-family="monospace" font-size="28" font-weight="300" fill="#ffffff" text-anchor="middle">98</text>
      <text x="60" y="150" font-family="monospace" font-size="11" fill="#888196" text-anchor="middle" letter-spacing="2">ACCESSIBILITY</text>
    </g>

    <g transform="translate(360, 0)">
      <circle cx="60" cy="60" r="54" stroke="#252130" stroke-width="8"/>
      <circle cx="60" cy="60" r="54" stroke="#794a8b" stroke-width="8" stroke-dasharray="320 340" stroke-linecap="round"/>
      <text x="60" y="68" font-family="monospace" font-size="28" font-weight="300" fill="#ffffff" text-anchor="middle">100</text>
      <text x="60" y="150" font-family="monospace" font-size="11" fill="#888196" text-anchor="middle" letter-spacing="2">BEST PRACTICES</text>
    </g>

    <g transform="translate(540, 0)">
      <circle cx="60" cy="60" r="54" stroke="#252130" stroke-width="8"/>
      <circle cx="60" cy="60" r="54" stroke="#c78ee0" stroke-width="8" stroke-dasharray="320 340" stroke-linecap="round"/>
      <text x="60" y="68" font-family="monospace" font-size="28" font-weight="300" fill="#ffffff" text-anchor="middle">100</text>
      <text x="60" y="150" font-family="monospace" font-size="11" fill="#888196" text-anchor="middle" letter-spacing="2">SEO</text>
    </g>
  </g>
  <text x="600" y="580" font-family="monospace" font-size="13" fill="#888196" text-anchor="middle" letter-spacing="3">ZERO LAYOUT SHIFT (CLS 0.0) · LCP 0.38S</text>
</svg>`;

// Write all files
fs.writeFileSync(path.join(targetDir, "work-kroma.svg"), kromaSvg);
fs.writeFileSync(path.join(targetDir, "work-aura.svg"), auraSvg);
fs.writeFileSync(path.join(targetDir, "work-vesper.svg"), vesperSvg);
fs.writeFileSync(path.join(targetDir, "work-synapse.svg"), synapseSvg);
fs.writeFileSync(path.join(targetDir, "service-brand.svg"), serviceBrandSvg);
fs.writeFileSync(path.join(targetDir, "service-webapp.svg"), serviceWebAppSvg);
fs.writeFileSync(path.join(targetDir, "service-shopify.svg"), serviceShopifySvg);
fs.writeFileSync(path.join(targetDir, "service-audit.svg"), serviceAuditSvg);

console.log("Successfully generated 8 luxury SVG assets matching the Header aesthetic!");
