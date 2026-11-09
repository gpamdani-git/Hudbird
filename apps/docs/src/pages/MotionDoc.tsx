import * as React from "react";
import {
  Accordion,
  AccordionItem,
  AccordionItemContent,
  AccordionItemTitle,
  AccordionItemSubtitle,
  Alert,
  Animation,
  AnimationFrame,
  Avatar,
  Badge,
  Banner,
  BannerItem,
  BannerSeparator,
  Blockquote,
  Breadcrumbs,
  Carousel,
  Chart1,
  Chart2,
  Chart3,
  Checkbox,
  CircularProgress,
  Clipboard,
  Clock,
  Code,
  Code2,
  Collapse,
  Container,
  Control,
  Cookie,
  CreditCard,
  Crosshead,
  Cta,
  Curve,
  Dashboard,
  Date,
  DescriptionList,
  DescriptionListItem,
  DescriptionListLabel,
  DescriptionListValue,
  Dialog,
  Divider,
  Drawer,
  Dropzone,
  Elevation,
  FaIcon,
  FaIcon2,
  File,
  Flag,
  Folder,
  FolderOpen,
  Frame,
  Gallery,
  Grid,
  Heading,
  Heading2,
  Heading3,
  Hero,
  HeroImage,
  Image,
  Inline,
  Input,
  Label,
  Layer,
  Lead,
  Link,
  List,
  ListItem,
  Loader,
  Magnet,
  Map,
  Menu,
  Navigation,
  Next,
  Notice,
  NoticeRed,
  Number,
  Outline,
  Package,
  Paragraph,
  Pin,
  Placeholder,
  Popover,
  Progress,
  PullQuote,
  QRCode,
  Radio,
  Rating,
  Section,
  Select,
  Slider,
  Spinner,
  State,
  Table,
  Tabs,
  Tab,
  Text,
  Textarea,
  TextQuote,
  Timeline,
  Tag,
  Table2,
  Textures,
  Toast,
  Toggle,
  Tooltip,
  Video,
  ViewTransition,
  Wave,
  Button,
  Card,
  CardBody,
  MotionReveal,
  MotionStagger,
  MotionStaggerItem,
  MotionTicker,
  MotionSlideshow,
  MotionCrossfade,
} from "@hudbird/ui";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useSpring,
  useMotionValue,
  useTransform,
} from "framer-motion";
import motionCode from "../../../../packages/core/src/components/Motion/Motion.tsx?raw";
import { ApiTable } from "../components/ApiTable";
import { ComponentPreview } from "../components/ComponentPreview";
import { DocHeader } from "../components/DocHeader";
import { InstallationTabs } from "../components/InstallationTabs";

const tickerItems = ["Reveal", "Stagger", "Ticker", "Slideshow", "Crossfade"].map((label) => (
  <span key={label} className="px-8 text-lg font-medium tracking-tight">
    {label}
  </span>
));

export default function MotionDoc() {
  const reduce = useReducedMotion();

  return (
    <div className="space-y-14 pb-24">
      <DocHeader
        category="Motion"
        title="Calm motion, one shared language."
        description="Reusable Hudbird primitives for scroll reveals, staggered groups, tickers, slideshows, and page progress. Reduced motion is built in."
      />
      <Section spacing="none">
        <Container size="fluid" gutter="none">
          <InstallationTabs componentName="Motion" manualCode={motionCode} />
        </Container>
      </Section>

      {/* =========================================
       * REVEAL & STAGGER
       * ========================================= */}
      <Section spacing="none">
        <Container size="fluid" gutter="none">
          <Grid cols={2} gap="lg">
            <ComponentPreview title="Reveal" description="A short, one-time viewport entrance.">
              <div className="p-10">
                <MotionReveal>
                  <Card variant="bordered" className="shadow-none">
                    <CardBody className="space-y-2 p-7">
                      <Heading as="h3" size="h4">
                        Quiet entrance
                      </Heading>
                      <Text>
                        Opacity and transform only, with no hidden content under reduced motion.
                      </Text>
                    </CardBody>
                  </Card>
                </MotionReveal>
              </div>
            </ComponentPreview>

            <ComponentPreview
              title="Stagger"
              description="A restrained sequence for related items."
            >
              <MotionStagger className="space-y-3 p-10">
                {["Brief", "Build", "Review"].map((item) => (
                  <MotionStaggerItem key={item}>
                    <Card variant="bordered" className="shadow-none">
                      <CardBody className="p-4">
                        <Text>{item}</Text>
                      </CardBody>
                    </Card>
                  </MotionStaggerItem>
                ))}
              </MotionStagger>
            </ComponentPreview>
          </Grid>
        </Container>
      </Section>

      {/* =========================================
       * TICKER & SLIDESHOW
       * ========================================= */}
      <Section spacing="none">
        <Container size="fluid" gutter="none">
          <Grid cols={2} gap="lg">
            <ComponentPreview
              title="Ticker"
              description="Pauses on hover, focus, and reduced motion."
            >
              <div className="py-12">
                <MotionTicker
                  items={tickerItems}
                  aria-label="Motion primitive ticker"
                  reducedMotion={reduce}
                />
              </div>
            </ComponentPreview>

            <ComponentPreview
              title="Slideshow"
              description="Manual controls and an announced position."
            >
              <div className="p-8">
                <MotionSlideshow
                  slides={["Plan", "Compose", "Ship"].map((label) => (
                    <Card key={label} variant="bordered" className="shadow-none">
                      <CardBody className="p-10 text-center">
                        <Heading as="h3">{label}</Heading>
                      </CardBody>
                    </Card>
                  ))}
                  reducedMotion={reduce}
                />
              </div>
            </ComponentPreview>
          </Grid>
        </Container>
      </Section>

      {/* =========================================
       * CROSSFADE
       * ========================================= */}
      <Section spacing="none">
        <Container size="fluid" gutter="none">
          <Grid cols={2} gap="lg">
            <ComponentPreview
              title="Crossfade"
              description="Interruptible fade between two states."
            >
              <MotionCrossfade transitionKey="1">
                <Card variant="default" padding="md">
                  <CardBody className="p-6">
                    <Heading as="h3" size="h4">
                      State A
                    </Heading>
                    <Text>
                      This is the first state. Content can include any Hudbird components.
                    </Text>
                  </CardBody>
                </Card>
              </MotionCrossfade>

              <MotionCrossfade transitionKey="2">
                <Card variant="default" padding="md">
                  <CardBody className="p-6">
                    <Heading as="h3" size="h4">
                      State B
                    </Heading>
                    <Text>
                      This is the second state. Notice the fade transition when switching.
                    </Text>
                  </CardBody>
                </Card>
              </MotionCrossfade>
            </ComponentPreview>

            <ApiTable
              title="MotionCrossfade props"
              rows={[
                {
                  prop: "transitionKey",
                  type: "React.Key",
                  description: "Unique key for crossfade animation.",
                },
                {
                  prop: "children",
                  type: "React.ReactNode",
                  description: "Content to crossfade between.",
                },
              ]}
            />
          </Grid>
        </Container>
      </Section>

      {/* =========================================
       * PHYSICALITY: MORPHING ISLAND PATTERN
       * ========================================= */}
      <Section spacing="none">
        <Container size="fluid" gutter="none">
          <Grid cols={1} gap="lg">
            <ComponentPreview
              title="MorphingIsland Pattern"
              description="Dynamic Island clone with scale + fade entries."
              disabled
            >
              <div className="rounded-xl bg-zinc-50 p-6">
                <Heading as="h3" size="h4" className="mb-4">
                  Physicality in Motion
                </Heading>
                <Alert variant="info">
                  <strong>Never scale(0)</strong> — nothing in the real world appears from nothing.
                  Target: scale(0.9–0.97) + opacity: 0.
                </Alert>
                <p className="mb-4 text-zinc-600">
                  All MorphingIsland content entries use initial scale: 0.95, fading to 1 with the
                  repo's quietEase curve for physical weight.
                </p>
                <Text>
                  This pattern is used in Hudbird's signature blocks (MorphingIsland) to ensure
                  content feels grounded and deliberate rather than flat or floaty.
                </Text>
              </div>
            </ComponentPreview>
          </Grid>
        </Container>
      </Section>

      {/* =========================================
       * ACCESSIBILITY: REDUCED MOTION
       * ========================================= */}
      <Section spacing="none">
        <Container size="fluid" gutter="none">
          <Grid cols={1} gap="lg">
            <ComponentPreview
              title="Reduced Motion"
              description="Honors prefers-reduced-motion preference."
            >
              <div className="p-10">
                <Alert variant="base">
                  <strong>Reduced motion policy:</strong> Drop transform-based motion, keep
                  opacity/color feedback only.
                </Alert>
                <p className="mb-4 text-zinc-600">
                  All MotionReveal, MotionStagger, and MotionTicker components respect
                  <code>prefers-reduced-motion</code>. When enabled, transforms are replaced with
                  instant opacity/color changes.
                </p>
                <p>
                  <Button variant="outline" size="sm">
                    Toggle reduced motion preview
                  </Button>
                </p>
              </div>
            </ComponentPreview>
          </Grid>
        </Container>
      </Section>

      {/* =========================================
       * TRANSITION PATTERNS (transitions.dev)
       * ========================================= */}
      <Section spacing="none">
        <Container size="fluid" gutter="none">
          <Grid cols={1} gap="lg">
            <ComponentPreview
              title="Transition Patterns"
              description="Tokenized transitions from the transitions.dev library."
            >
              <div className="space-y-6 p-8">
                <Alert variant="info">
                  <strong>Duration scale:</strong> xfast (100ms) · fast (150ms) · medium (200ms) ·
                  slow (400ms) · xslow (800ms)
                </Alert>

                <Alert variant="base">
                  <strong>Easing:</strong> quietEase = cubic-bezier(0.22, 1, 0.36, 1) — strong
                  ease-out for UI. Never ease-in on UI.
                </Alert>

                <p className="text-zinc-600">
                  <strong>Physicality:</strong> Never scale(0). Scale from trigger element.
                  Popovers/dropdowns scale from their trigger, not center. Modals are exempt —
                  transform-origin: center is correct.
                </p>

                <p className="text-zinc-600">
                  <strong>Interruptibility:</strong> CSS transitions can be interrupted and
                  retargeted mid-animation; keyframes restart from zero. Use transitions for dynamic
                  UI, springs for gesture-driven motion.
                </p>
              </div>
            </ComponentPreview>
          </Grid>
        </Container>
      </Section>

      {/* =========================================
       * API REFERENCE TABLE
       * ========================================= */}
      <Section spacing="none">
        <Container size="fluid" gutter="none">
          <ApiTable
            title="Motion primitives"
            rows={[
              {
                prop: "MotionReveal",
                type: "MotionRevealProps",
                description: "One-time viewport reveal with reduced motion support.",
              },
              {
                prop: "MotionStagger",
                type: "HTMLMotionProps",
                description: "Coordinates a short child sequence with staggered delay.",
              },
              {
                prop: "MotionTicker",
                type: "MotionTickerProps",
                description: "Accessible continuous content row with hover/reduce pause.",
              },
              {
                prop: "MotionSlideshow",
                type: "MotionSlideshowProps",
                description: "Controlled, keyboard-operable slide presentation.",
              },
              {
                prop: "MotionCrossfade",
                type: "MotionCrossfadeProps",
                description: "Interruptible fade between two states via AnimatePresence.",
              },
            ]}
          />
        </Container>
      </Section>
    </div>
  );
}
