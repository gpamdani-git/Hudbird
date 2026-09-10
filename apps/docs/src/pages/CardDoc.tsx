// apps/docs/src/pages/CardDoc.tsx
import cardCode from "../../../../packages/core/src/components/Card/Card.tsx?raw";
import { InstallationTabs } from "../components/InstallationTabs";
import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
  Avatar,
  Badge,
  type CardVariant,
  type CardRadius,
} from "@hudbird/ui";
import {
  Heart,
  Share2,
  Bookmark,
  MoreVertical,
  Play,
  Sparkles,
  ArrowUpRight,
  TrendingUp,
  Music2,
  Volume2,
} from "lucide-react";
import { ComponentPreview } from "../components/ComponentPreview";
import { CodeBlock } from "../components/CodeBlock";
import { ApiTable, type ApiPropRow } from "../components/ApiTable";

export const cardTocItems = [
  { id: "installation", title: "Installation" },
  { id: "component-api", title: "Component API" },
  {
    id: "examples",
    title: "Examples",
    children: [
      { id: "basic-cards", title: "Basic Cards (Shadow, Bordered, Flat)" },
      { id: "interactive-cards", title: "Interactive Cards (Hoverable & Pressable)" },
      { id: "rich-content-card", title: "Rich Content Card (Social & Media)" },
      { id: "image-cover-card", title: "Image Cover Card (Blurred Footer Overlay)" },
      { id: "interactive-customizer", title: "Interactive Card Playground" },
    ],
  },
];

export default function CardDoc() {
  const [isLiked, setIsLiked] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [clickCounter, setClickCounter] = useState(0);

  // Customizer state
  const [custVariant, setCustVariant] = useState<CardVariant>("shadow");
  const [custRadius, setCustRadius] = useState<CardRadius>("lg");
  const [custIsHoverable, setCustIsHoverable] = useState(true);
  const [custIsPressable, setCustIsPressable] = useState(false);

  const apiRows: ApiPropRow[] = [
    {
      prop: "variant",
      defaultVal: "'shadow'",
      description: (
        <span>
          Visual surface treatment:{" "}
          <code className="rounded bg-zinc-100 px-1 py-0.5 font-mono text-[11px] dark:bg-zinc-800">
            'shadow'
          </code>{" "}
          (clean white/zinc-900 surface with subtle elevation),{" "}
          <code className="rounded bg-zinc-100 px-1 py-0.5 font-mono text-[11px] dark:bg-zinc-800">
            'bordered'
          </code>{" "}
          (translucent container with delicate stroke), or{" "}
          <code className="rounded bg-zinc-100 px-1 py-0.5 font-mono text-[11px] dark:bg-zinc-800">
            'flat'
          </code>{" "}
          (soft solid filled backdrop).
        </span>
      ),
    },
    {
      prop: "radius",
      defaultVal: "'lg'",
      description: (
        <span>
          Corner curvature radius:{" "}
          <code className="rounded bg-zinc-100 px-1 py-0.5 font-mono text-[11px] dark:bg-zinc-800">
            'none'
          </code>
          ,{" "}
          <code className="rounded bg-zinc-100 px-1 py-0.5 font-mono text-[11px] dark:bg-zinc-800">
            'md'
          </code>{" "}
          (12px / rounded-xl),{" "}
          <code className="rounded bg-zinc-100 px-1 py-0.5 font-mono text-[11px] dark:bg-zinc-800">
            'lg'
          </code>{" "}
          (16px / rounded-2xl), or{" "}
          <code className="rounded bg-zinc-100 px-1 py-0.5 font-mono text-[11px] dark:bg-zinc-800">
            'full'
          </code>{" "}
          (24px / rounded-3xl).
        </span>
      ),
    },
    {
      prop: "isHoverable",
      defaultVal: "false",
      description: "Applies a smooth upward micro-translation and elevated shadow depth on hover.",
    },
    {
      prop: "isPressable",
      defaultVal: "false",
      description:
        "Enables interactive button semantics, cursor pointers, focus rings, and active press scale feedback.",
    },
    {
      prop: "isFooterBlurred",
      defaultVal: "false",
      description:
        "Adds backdrop-blur glassmorphic styling to absolute bottom-aligned CardFooter components.",
    },
  ];

  return (
    <div className="space-y-16 pb-24">
      {/* Header */}
      <div>
        <div className="mb-3 flex items-center gap-3">
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl dark:text-zinc-50">
            Card
          </h1>
          <span className="rounded-full border border-indigo-500/20 bg-indigo-500/10 px-2 py-0.5 text-xs font-semibold text-indigo-600 dark:text-indigo-400">
            Component
          </span>
        </div>
        <p className="text-base text-zinc-600 dark:text-zinc-400">
          A modular, versatile surface container composed of{" "}
          <code className="font-mono text-xs font-semibold text-zinc-800 dark:text-zinc-200">
            Card
          </code>
          ,{" "}
          <code className="font-mono text-xs font-semibold text-zinc-800 dark:text-zinc-200">
            CardHeader
          </code>
          ,{" "}
          <code className="font-mono text-xs font-semibold text-zinc-800 dark:text-zinc-200">
            CardBody
          </code>
          , and{" "}
          <code className="font-mono text-xs font-semibold text-zinc-800 dark:text-zinc-200">
            CardFooter
          </code>{" "}
          with interactive hover, press feedback, and glassmorphic overlay support.
        </p>
      </div>

      {/* Hero Preview */}
      <section className="space-y-4">
        <ComponentPreview>
          <div className="w-full max-w-sm py-4">
            <Card variant="shadow" isHoverable>
              <CardHeader className="justify-between">
                <div className="flex items-center gap-3">
                  <Avatar
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
                    alt="Sophia Chen"
                    size="md"
                    radius="full"
                  />
                  <div className="flex flex-col">
                    <span className="text-sm leading-tight font-semibold text-zinc-900 dark:text-zinc-50">
                      Sophia Chen
                    </span>
                    <span className="text-xs text-zinc-500 dark:text-zinc-400">@sophiachen</span>
                  </div>
                </div>
                <Button
                  size="sm"
                  variant={isFollowing ? "outline" : "solid"}
                  color={isFollowing ? "zinc" : "dark"}
                  onClick={() => setIsFollowing(!isFollowing)}
                >
                  {isFollowing ? "Following" : "Follow"}
                </Button>
              </CardHeader>
              <CardBody>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  Staff Frontend Architect building open-source design systems with TypeScript,
                  Tailwind CSS, and Class Variance Authority. 🚀
                </p>
              </CardBody>
              <CardFooter className="justify-between pt-2">
                <div className="flex items-center gap-4 text-xs font-medium text-zinc-500 dark:text-zinc-400">
                  <span>
                    <strong className="font-semibold text-zinc-900 dark:text-zinc-100">1.4k</strong>{" "}
                    Following
                  </span>
                  <span>
                    <strong className="font-semibold text-zinc-900 dark:text-zinc-100">
                      48.2k
                    </strong>{" "}
                    Followers
                  </span>
                </div>
              </CardFooter>
            </Card>
          </div>
        </ComponentPreview>

        <CodeBlock
          code={`import { Card, CardHeader, CardBody, CardFooter, Avatar, Button } from '@hudbird/ui'

export default function Example() {
  const [isFollowing, setIsFollowing] = useState(false)

  return (
    <Card variant="shadow" isHoverable className="max-w-sm">
      <CardHeader className="justify-between">
        <div className="flex items-center gap-3">
          <Avatar
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150"
            alt="Sophia Chen"
            size="md"
            radius="full"
          />
          <div className="flex flex-col">
            <span className="text-sm font-semibold leading-tight">Sophia Chen</span>
            <span className="text-xs text-zinc-500">@sophiachen</span>
          </div>
        </div>
        <Button
          size="sm"
          variant={isFollowing ? "outline" : "solid"}
          onClick={() => setIsFollowing(!isFollowing)}
        >
          {isFollowing ? "Following" : "Follow"}
        </Button>
      </CardHeader>

      <CardBody>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          Staff Frontend Architect building open-source design systems. 🚀
        </p>
      </CardBody>

      <CardFooter className="justify-between">
        <div className="flex items-center gap-4 text-xs text-zinc-500">
          <span><strong>1.4k</strong> Following</span>
          <span><strong>48.2k</strong> Followers</span>
        </div>
      </CardFooter>
    </Card>
  )
}`}
        />
      </section>
      <div id="installation" className="scroll-mt-24 space-y-4">
        <InstallationTabs componentName="card" manualCode={cardCode} />
      </div>

      {/* Component API */}
      <section id="component-api" className="scroll-mt-24 space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
          Component API
        </h2>
        <ApiTable
          note="Card and its sub-components extend standard HTML div attributes (e.g. onClick, id, role, className, tabIndex)."
          rows={apiRows}
        />
      </section>

      {/* Examples Header */}
      <section id="examples" className="scroll-mt-24 space-y-14">
        <div>
          <h2 className="mb-2 text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            Examples
          </h2>
        </div>

        {/* 1. Basic Cards */}
        <div id="basic-cards" className="scroll-mt-24 space-y-4">
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
            Basic Cards (Shadow, Bordered, Flat)
          </h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Select between three built-in visual styles:{" "}
            <code className="rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-xs text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200">
              shadow
            </code>{" "}
            (elevated),{" "}
            <code className="rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-xs text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200">
              bordered
            </code>{" "}
            (clean outline), and{" "}
            <code className="rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-xs text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200">
              flat
            </code>{" "}
            (soft fill):
          </p>

          <ComponentPreview>
            <div className="grid w-full max-w-4xl grid-cols-1 gap-6 py-4 md:grid-cols-3">
              {/* Shadow */}
              <Card variant="shadow">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <div className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
                    <span className="text-sm font-semibold">Shadow (Default)</span>
                  </div>
                </CardHeader>
                <CardBody>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">
                    Crisp background with subtle elevation shadow suitable for main dashboard
                    widgets and data containers.
                  </p>
                </CardBody>
                <CardFooter>
                  <span className="text-xs font-medium text-zinc-400">Updated 2m ago</span>
                </CardFooter>
              </Card>

              {/* Bordered */}
              <Card variant="bordered">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <div className="h-2.5 w-2.5 rounded-full bg-indigo-500" />
                    <span className="text-sm font-semibold">Bordered</span>
                  </div>
                </CardHeader>
                <CardBody>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">
                    Transparent surface framed by an adaptive 1px border. Perfect for nested items
                    or dense information matrices.
                  </p>
                </CardBody>
                <CardFooter>
                  <span className="text-xs font-medium text-zinc-400">Outline style</span>
                </CardFooter>
              </Card>

              {/* Flat */}
              <Card variant="flat">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <div className="h-2.5 w-2.5 rounded-full bg-amber-500" />
                    <span className="text-sm font-semibold">Flat</span>
                  </div>
                </CardHeader>
                <CardBody>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">
                    Muted background fill without harsh borders or shadows. Ideal for secondary
                    callouts and helper blocks.
                  </p>
                </CardBody>
                <CardFooter>
                  <span className="text-xs font-medium text-zinc-400">Soft backdrop</span>
                </CardFooter>
              </Card>
            </div>
          </ComponentPreview>

          <CodeBlock
            code={`import { Card, CardHeader, CardBody, CardFooter } from '@hudbird/ui'

{/* 1. Shadow Variant (Default) */}
<Card variant="shadow">
  <CardHeader><span className="font-semibold">Shadow Variant</span></CardHeader>
  <CardBody><p>Elevated crisp background.</p></CardBody>
  <CardFooter><span className="text-xs text-zinc-400">Footer content</span></CardFooter>
</Card>

{/* 2. Bordered Variant */}
<Card variant="bordered">
  <CardHeader><span className="font-semibold">Bordered Variant</span></CardHeader>
  <CardBody><p>Transparent surface with clean border.</p></CardBody>
  <CardFooter><span className="text-xs text-zinc-400">Footer content</span></CardFooter>
</Card>

{/* 3. Flat Variant */}
<Card variant="flat">
  <CardHeader><span className="font-semibold">Flat Variant</span></CardHeader>
  <CardBody><p>Soft neutral background fill.</p></CardBody>
  <CardFooter><span className="text-xs text-zinc-400">Footer content</span></CardFooter>
</Card>`}
          />
        </div>

        {/* 2. Interactive Cards */}
        <div id="interactive-cards" className="scroll-mt-24 space-y-4">
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
            Interactive Cards (Hoverable & Pressable)
          </h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Enable{" "}
            <code className="rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-xs text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200">
              isHoverable
            </code>{" "}
            for floating depth lift and{" "}
            <code className="rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-xs text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200">
              isPressable
            </code>{" "}
            for tactile scale click feedback:
          </p>

          <ComponentPreview>
            <div className="grid w-full max-w-2xl grid-cols-1 gap-6 py-4 sm:grid-cols-2">
              {/* Hoverable Card */}
              <Card variant="shadow" isHoverable className="group">
                <CardHeader className="justify-between">
                  <div className="rounded-xl bg-indigo-50 p-2.5 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400">
                    <Sparkles size={18} />
                  </div>
                  <ArrowUpRight
                    size={16}
                    className="text-zinc-400 transition-colors group-hover:text-zinc-900 dark:group-hover:text-white"
                  />
                </CardHeader>
                <CardBody>
                  <h4 className="mb-1 text-base font-semibold text-zinc-900 dark:text-zinc-50">
                    Hoverable Card
                  </h4>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">
                    Hover your cursor over this card to witness a subtle vertical micro-lift and
                    deepened shadow elevation.
                  </p>
                </CardBody>
                <CardFooter>
                  <span className="text-xs font-medium text-indigo-600 dark:text-indigo-400">
                    isHoverable={true}
                  </span>
                </CardFooter>
              </Card>

              {/* Pressable Card */}
              <Card
                variant="bordered"
                isPressable
                isHoverable
                onClick={() => setClickCounter((c) => c + 1)}
                className="group"
              >
                <CardHeader className="justify-between">
                  <div className="rounded-xl bg-emerald-50 p-2.5 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400">
                    <TrendingUp size={18} />
                  </div>
                  <Badge color="success" size="sm" variant="soft">
                    Click Me
                  </Badge>
                </CardHeader>
                <CardBody>
                  <h4 className="mb-1 text-base font-semibold text-zinc-900 dark:text-zinc-50">
                    Pressable Card
                  </h4>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">
                    Click anywhere inside to experience button-like active depression with full
                    keyboard accessibility.
                  </p>
                </CardBody>
                <CardFooter className="justify-between">
                  <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">
                    Clicks: <strong className="font-bold">{clickCounter}</strong>
                  </span>
                  <span className="text-xs text-zinc-400">isPressable={true}</span>
                </CardFooter>
              </Card>
            </div>
          </ComponentPreview>

          <CodeBlock
            code={`import { useState } from 'react'
import { Card, CardHeader, CardBody, CardFooter, Badge } from '@hudbird/ui'

export function InteractiveCardsExample() {
  const [clicks, setClicks] = useState(0)

  return (
    <div className="grid grid-cols-2 gap-6">
      {/* 1. Lift on hover */}
      <Card variant="shadow" isHoverable>
        <CardBody>
          <h4>Hoverable Card</h4>
          <p>Micro-lift animation on mouse enter.</p>
        </CardBody>
      </Card>

      {/* 2. Tactile click feedback */}
      <Card
        variant="bordered"
        isPressable
        isHoverable
        onClick={() => setClicks(c => c + 1)}
      >
        <CardBody>
          <h4>Pressable Card</h4>
          <p>Total clicks: {clicks}</p>
        </CardBody>
      </Card>
    </div>
  )
}`}
          />
        </div>

        {/* 3. Rich Content Card */}
        <div id="rich-content-card" className="scroll-mt-24 space-y-4">
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
            Rich Content Card (Social & Media)
          </h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Combine sub-components with Avatar, Badges, Heading, and Button actions for rich
            dashboards and social streams:
          </p>

          <ComponentPreview>
            <div className="w-full max-w-md py-4">
              <Card variant="shadow" className="overflow-hidden">
                {/* Header */}
                <CardHeader className="justify-between pb-3">
                  <div className="flex items-center gap-3">
                    <Avatar
                      src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80"
                      alt="Alex Rivera"
                      size="md"
                      radius="full"
                    />
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-sm font-bold text-zinc-900 dark:text-zinc-50">
                          Alex Rivera
                        </span>
                        <Badge color="primary" size="sm" variant="soft">
                          PRO
                        </Badge>
                      </div>
                      <span className="text-xs text-zinc-500 dark:text-zinc-400">
                        Senior Product Designer • 4h ago
                      </span>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="cursor-pointer rounded-lg p-1.5 text-zinc-400 transition-colors hover:bg-zinc-100 hover:text-zinc-600 dark:hover:bg-zinc-800 dark:hover:text-zinc-200"
                    aria-label="Options"
                  >
                    <MoreVertical size={16} />
                  </button>
                </CardHeader>

                {/* Body */}
                <CardBody className="space-y-3 pb-4">
                  <p className="text-sm text-zinc-700 dark:text-zinc-300">
                    Just wrapped up the newly engineered component system with native dark mode
                    support and micro-interactions! Take a look at the preview layout below:
                  </p>
                  <div className="relative aspect-video overflow-hidden rounded-xl bg-zinc-100 dark:bg-zinc-800">
                    <img
                      src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80"
                      alt="Modern Abstract Wave"
                      className="h-full w-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </CardBody>

                {/* Footer */}
                <CardFooter className="justify-between border-t border-zinc-100 pt-3 dark:border-zinc-800/80">
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => setIsLiked(!isLiked)}
                      className={`flex cursor-pointer items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${
                        isLiked
                          ? "bg-rose-50 text-rose-600 dark:bg-rose-950/40"
                          : "text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
                      }`}
                    >
                      <Heart size={14} className={isLiked ? "fill-current" : ""} />
                      <span>{isLiked ? "343" : "342"}</span>
                    </button>
                    <button
                      type="button"
                      className="flex cursor-pointer items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-900 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
                    >
                      <Share2 size={14} />
                      <span>Share</span>
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => setIsBookmarked(!isBookmarked)}
                    className={`cursor-pointer rounded-lg p-1.5 text-xs font-semibold transition-colors ${
                      isBookmarked
                        ? "bg-indigo-50 text-indigo-600 dark:bg-indigo-950/40"
                        : "text-zinc-400 hover:bg-zinc-100 hover:text-zinc-900 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
                    }`}
                    aria-label="Bookmark"
                  >
                    <Bookmark size={15} className={isBookmarked ? "fill-current" : ""} />
                  </button>
                </CardFooter>
              </Card>
            </div>
          </ComponentPreview>

          <CodeBlock
            code={`import { Card, CardHeader, CardBody, CardFooter, Avatar, Badge } from '@hudbird/ui'
import { Heart, Share2, Bookmark, MoreVertical } from 'lucide-react'

export function RichContentCard() {
  return (
    <Card variant="shadow" className="max-w-md">
      <CardHeader className="justify-between">
        <div className="flex items-center gap-3">
          <Avatar src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150" />
          <div>
            <span className="font-bold text-sm">Alex Rivera</span>
            <span className="text-xs text-zinc-500 block">Senior Product Designer</span>
          </div>
        </div>
        <Badge color="indigo" size="sm">PRO</Badge>
      </CardHeader>

      <CardBody className="space-y-3">
        <p className="text-sm">Just wrapped up the newly engineered component system!</p>
        <img src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800" className="rounded-xl aspect-video object-cover" />
      </CardBody>

      <CardFooter className="justify-between border-t border-zinc-100 dark:border-zinc-800 pt-3">
        <div className="flex gap-2">
          <button className="flex items-center gap-1 text-xs"><Heart size={14} /> 342</button>
          <button className="flex items-center gap-1 text-xs"><Share2 size={14} /> Share</button>
        </div>
        <button><Bookmark size={15} /></button>
      </CardFooter>
    </Card>
  )
}`}
          />
        </div>

        {/* 4. Image Cover Card */}
        <div id="image-cover-card" className="scroll-mt-24 space-y-4">
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
            Image Cover Card (Blurred Footer Overlay)
          </h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Use full-bleed background imagery combined with{" "}
            <code className="rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-xs text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200">
              &lt;CardFooter isBlurred&gt;
            </code>{" "}
            to render a premium glassmorphic frosted overlay over visual media:
          </p>

          <ComponentPreview>
            <div className="grid w-full max-w-2xl grid-cols-1 gap-6 py-4 sm:grid-cols-2">
              {/* Music Album Card */}
              <Card variant="shadow" isHoverable className="group relative h-80 w-full">
                <img
                  src="https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&auto=format&fit=crop&q=80"
                  alt="Soundtrack Cover"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-3 right-3 z-20">
                  <span className="flex items-center gap-1 rounded-full border border-white/10 bg-black/50 px-2.5 py-1 text-[11px] font-semibold text-white backdrop-blur-md">
                    <Music2 size={12} />
                    <span>Now Playing</span>
                  </span>
                </div>
                <CardFooter isBlurred className="justify-between px-4 py-3">
                  <div className="flex flex-col text-left">
                    <span className="text-xs font-semibold tracking-wider text-zinc-600 uppercase dark:text-zinc-300">
                      Midnight Symphony
                    </span>
                    <span className="text-sm font-bold text-zinc-900 dark:text-zinc-50">
                      Acoustic Horizon • 3:45
                    </span>
                  </div>
                  <Button size="sm" color="indigo" variant="solid" className="rounded-full !px-3">
                    <Play size={14} className="fill-current" />
                  </Button>
                </CardFooter>
              </Card>

              {/* Gallery Highlight Card */}
              <Card variant="shadow" isHoverable className="group relative h-80 w-full">
                <img
                  src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600&auto=format&fit=crop&q=80"
                  alt="Yosemite Valley"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-3 left-3 z-20">
                  <span className="flex items-center gap-1 rounded-full border border-white/10 bg-black/50 px-2.5 py-1 text-[11px] font-semibold text-white backdrop-blur-md">
                    <Volume2 size={12} />
                    <span>Nature Ambient</span>
                  </span>
                </div>
                <CardFooter isBlurred className="justify-between px-4 py-3">
                  <div className="flex flex-col text-left">
                    <span className="text-xs font-semibold tracking-wider text-zinc-600 uppercase dark:text-zinc-300">
                      Yosemite Valley
                    </span>
                    <span className="text-sm font-bold text-zinc-900 dark:text-zinc-50">
                      California, USA
                    </span>
                  </div>
                  <Button size="sm" color="dark" variant="solid" className="rounded-full">
                    Explore
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </ComponentPreview>

          <CodeBlock
            code={`import { Card, CardFooter, Button } from '@hudbird/ui'
import { Play, Music2 } from 'lucide-react'

export function ImageCoverCard() {
  return (
    <Card variant="shadow" isHoverable className="h-80 relative group">
      <img
        src="https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600"
        alt="Soundtrack"
        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
      />
      
      {/* Frosted Glassmorphism Footer */}
      <CardFooter isBlurred className="justify-between px-4 py-3">
        <div>
          <span className="text-xs uppercase text-zinc-400 block">Midnight Symphony</span>
          <span className="text-sm font-bold text-white">Acoustic Horizon</span>
        </div>
        <Button size="sm" color="indigo" className="rounded-full">
          <Play size={14} className="fill-current" />
        </Button>
      </CardFooter>
    </Card>
  )
}`}
          />
        </div>

        {/* 5. Interactive Playground */}
        <div id="interactive-customizer" className="scroll-mt-24 space-y-4">
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
            Interactive Card Playground
          </h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Test combinations of surface variants, corner radii, hover lift, and press states:
          </p>

          {/* Controls Bar */}
          <div className="grid grid-cols-1 gap-4 rounded-xl border border-zinc-200 bg-zinc-50 p-4 sm:grid-cols-2 dark:border-zinc-800 dark:bg-zinc-900/50">
            {/* Variant */}
            <div>
              <label className="mb-1.5 block text-xs font-semibold tracking-wider text-zinc-500 uppercase dark:text-zinc-400">
                Variant
              </label>
              <select
                value={custVariant}
                onChange={(e) => setCustVariant(e.target.value as CardVariant)}
                className="h-9 w-full rounded-lg border border-zinc-300 bg-white px-2.5 text-xs font-medium text-zinc-900 outline-none focus:ring-2 focus:ring-indigo-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"
              >
                <option value="shadow">Shadow (Elevated)</option>
                <option value="bordered">Bordered (Outline)</option>
                <option value="flat">Flat (Solid Fill)</option>
              </select>
            </div>

            {/* Radius */}
            <div>
              <label className="mb-1.5 block text-xs font-semibold tracking-wider text-zinc-500 uppercase dark:text-zinc-400">
                Corner Radius
              </label>
              <select
                value={custRadius}
                onChange={(e) => setCustRadius(e.target.value as CardRadius)}
                className="h-9 w-full rounded-lg border border-zinc-300 bg-white px-2.5 text-xs font-medium text-zinc-900 outline-none focus:ring-2 focus:ring-indigo-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"
              >
                <option value="none">None (rounded-none)</option>
                <option value="md">Medium (rounded-xl / 12px)</option>
                <option value="lg">Large (rounded-2xl / 16px - Default)</option>
                <option value="full">Full (rounded-3xl / 24px)</option>
              </select>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Button
              size="sm"
              variant={custIsHoverable ? "solid" : "outline"}
              color={custIsHoverable ? "indigo" : "zinc"}
              onClick={() => setCustIsHoverable(!custIsHoverable)}
            >
              isHoverable: {custIsHoverable ? "True" : "False"}
            </Button>
            <Button
              size="sm"
              variant={custIsPressable ? "solid" : "outline"}
              color={custIsPressable ? "indigo" : "zinc"}
              onClick={() => setCustIsPressable(!custIsPressable)}
            >
              isPressable: {custIsPressable ? "True" : "False"}
            </Button>
          </div>

          <ComponentPreview>
            <div className="w-full max-w-md py-6">
              <Card
                variant={custVariant}
                radius={custRadius}
                isHoverable={custIsHoverable}
                isPressable={custIsPressable}
              >
                <CardHeader className="justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-500/10 text-xs font-bold text-indigo-600 dark:bg-indigo-500/20 dark:text-indigo-400">
                      UI
                    </div>
                    <div>
                      <h4 className="text-sm leading-tight font-semibold">Configured Card</h4>
                      <span className="text-[11px] text-zinc-400">Live preview container</span>
                    </div>
                  </div>
                  <Badge color="primary" size="sm" variant="soft">
                    Active
                  </Badge>
                </CardHeader>
                <CardBody>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">
                    This card dynamically mirrors all currently selected props: variant{" "}
                    <code className="font-mono text-xs font-semibold text-zinc-800 dark:text-zinc-200">
                      "{custVariant}"
                    </code>
                    , radius{" "}
                    <code className="font-mono text-xs font-semibold text-zinc-800 dark:text-zinc-200">
                      "{custRadius}"
                    </code>
                    , hoverable{" "}
                    <code className="font-mono text-xs font-semibold text-zinc-800 dark:text-zinc-200">
                      {String(custIsHoverable)}
                    </code>
                    , and pressable{" "}
                    <code className="font-mono text-xs font-semibold text-zinc-800 dark:text-zinc-200">
                      {String(custIsPressable)}
                    </code>
                    .
                  </p>
                </CardBody>
                <CardFooter className="justify-between">
                  <span className="text-xs text-zinc-400">@hudbird/ui</span>
                  <Button size="sm" color="indigo" variant="flat">
                    Action
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </ComponentPreview>
        </div>
      </section>
    </div>
  );
}
