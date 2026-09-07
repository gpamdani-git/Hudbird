# Hudbird UI

**Fly through your development. Minimize the noise, keep the essence.**

Hudbird UI is a premium, headless-friendly React component library built with Tailwind CSS and Class Variance Authority (CVA). Designed to be beautiful out of the box, it seamlessly blends precise engineering with aesthetic elegance.

## 🧬 The Hudbird DNA

- **Precise Navigation:** Seperti burung Hudhud yang terkenal dengan navigasinya yang luar biasa akurat, library ini menawarkan komponen dengan struktur tata letak (layout) dan spacing Tailwind yang sangat presisi.
- **Aesthetic Crown:** Terinspirasi dari mahkota khas Hudhud, komponen ini memberikan sentuhan akhir yang elegan dan premium meskipun mengusung tema minimalis.
- **Featherweight Core:** Sangat ringan, cepat, dan berfokus menghilangkan visual noise yang tidak perlu pada performa web modern.

## 🚀 Getting Started

### Menginstal ekosistem Hudbird ke proyek Tailwind Anda

```bash
pnpm dlx hudbird-ui@latest init
```

### Usage

```tsx
import { Button, Card, Text } from '@hudbird/ui'

export default function App() {
  return (
    <Card>
      <Text variant="strong">Hello Hudbird</Text>
      <Text className="mt-2 mb-4">Minimize the noise, keep the essence.</Text>
      <Button color="indigo">Get Started</Button>
    </Card>
  )
}
```

## 📦 Deployment (Vercel)

The documentation site is a React SPA built with Vite. It is fully optimized for Vercel deployment.

1. Connect your repository to Vercel.
2. Select the `apps/docs` directory as the Root Directory (or run the build from the monorepo root).
3. Build command: `npm run build`
4. Output directory: `dist`

## 🛠 Tech Stack

- React 18+
- TypeScript
- Tailwind CSS
- class-variance-authority (CVA)
- tailwind-merge & clsx
- Radix UI (Primitives)
- Lucide React (Icons)
- Framer Motion (Animations)

## License

MIT
