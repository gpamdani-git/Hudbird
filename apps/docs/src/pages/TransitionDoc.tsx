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
} from "@hudbird/ui";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useSpring,
  useMotionValue,
  useTransform,
  css,
} from "framer-motion";
import { ApiTable } from "../components/ApiTable";
import { ComponentPreview } from "../components/ComponentPreview";
import { DocHeader } from "../components/DocHeader";
import { InstallationTabs } from "../components/InstallationTabs";

const durationScale = {
  xfast: "100ms",
  fast: "150ms",
  medium: "200ms",
  slow: "400ms",
  xslow: "800ms",
};

const easingScale = {
  quietEase: "cubic-bezier(0.22, 1, 0.36, 1)",
  "ease-out": "cubic-bezier(0.23, 1, 0.32, 1)",
  "ease-in-out": "cubic-bezier(0.77, 0, 0.175, 1)",
  linear: "linear",
};

export default function TransitionDoc() {
  const reduce = useReducedMotion();

  return (
    <div className="space-y-14 pb-24">
      <DocHeader
        category="Transition"
        title="Tokenized transitions for Hudbird"
        description="Production-ready CSS transitions following the transitions.dev motion-token scale. All animations respect reduced motion, use GPU-accelerated properties, and follow Emil Kowalski's craft standards."
      />
      <Section spacing="none">
        <Container size="fluid" gutter="none">
          <Grid cols={2} gap="lg">
            <ComponentPreview
              title="Duration Scale"
              description="Choose the right duration for your UI pattern."
            >
              <div className="space-y-4">
                {Object.entries(durationScale).map(([key, value]) => (
                  <Alert key={key} variant="outline">
                    <p className="font-medium">{key}</p>
                    <p>{value}</p>
                  </Alert>
                ))}
              </div>
            </ComponentPreview>

            <ComponentPreview
              title="Easing Scale"
              description="Strong custom curves for deliberate motion."
            >
              <div className="space-y-4">
                {Object.entries(easingScale).map(([key, value]) => (
                  <Alert key={key} variant="outline">
                    <p className="font-medium">{key}</p>
                    <p>{value}</p>
                  </Alert>
                ))}
              </div>
            </ComponentPreview>
          </Grid>
        </Container>
      </Section>

      <Section spacing="none">
        <Container size="fluid" gutter="none">
          <Grid cols={1} gap="lg">
            <ComponentPreview
              title="Physicality Rules"
              description="Never scale(0). Scale from trigger. Modals exempt."
            >
              <Alert variant="base">
                <strong>Never scale(0)</strong> — nothing in the real world appears from nothing.
                Target: scale(0.9–0.97) + opacity: 0.
              </Alert>
              <Alert variant="base">
                <strong>Popovers/dropdowns</strong> scale from their trigger, not center.
                <code>transform-origin: var(--transform-origin)</code> — Base UI pattern.
                <strong>Modals are exempt</strong> — transform-origin: center is correct.
              </Alert>
              <Alert variant="base">
                <strong>Button press feedback</strong>: transform: scale(0.97) on :active,
                transition: transform 160ms ease-out. Subtle (0.95–0.98).
              </Alert>
            </ComponentPreview>
          </Grid>
        </Container>
      </Section>

      <Section spacing="none">
        <Container size="fluid" gutter="none">
          <Grid cols={1} gap="lg">
            <ComponentPreview
              title="Interruptibility"
              description="CSS transitions retarget from current state; keyframes restart from zero."
            >
              <Alert variant="info">
                <strong>CSS transitions</strong> can be interrupted and retargeted mid-animation.
              </Alert>
              <Alert variant="destructive">
                <strong>Keyframes</strong> restart from zero. Avoid for toasts, toggles, or anything
                triggered rapidly.
              </Alert>
              <p className="mt-4 text-zinc-600">
                For gesture-driven motion (drag, swipe), use springs — they carry velocity when
                interrupted.
              </p>
            </ComponentPreview>
          </Grid>
        </Container>
      </Section>

      <Section spacing="none">
        <Container size="fluid" gutter="none">
          <Grid cols={1} gap="lg">
            <ComponentPreview
              title="Accessibility: Reduced Motion"
              description="Honors prefers-reduced-motion — drop transform, keep opacity/color."
            >
              <Alert variant="base">
                Reduced motion means fewer and gentler animations, not zero — keep transitions that
                aid comprehension, remove position changes.
              </Alert>
              <p className="mt-4 text-zinc-600">
                All transition components in Hudbird respect
                <code>prefers-reduced-motion</code>. When enabled, transform-based motion is
                replaced with instant opacity/color feedback.
              </p>
            </ComponentPreview>
          </Grid>
        </Container>
      </Section>

      <Section spacing="none">
        <Container size="fluid" gutter="none">
          <ApiTable
            title="Transition patterns & tokens"
            rows={[
              {
                pattern: "Notification badge appear",
                duration: "fast (150ms)",
                easing: "quietEase",
                physicality: "scale from 0.95",
                interruptible: "CSS transition",
              },
              {
                pattern: "Dropdown popover",
                duration: "medium (200ms)",
                easing: "quietEase",
                physicality: "scale from trigger",
                interruptible: "CSS transition",
              },
              {
                pattern: "Page crossfade transition",
                duration: "slow (400ms)",
                easing: "ease-in-out",
                physicality: "blur mask during crossfade",
                interruptible: "CSS transition with mode=crossfade",
              },
              {
                pattern: "Plus-to-menu morph (FAB)",
                duration: "fast (150ms)",
                easing: "quietEase",
                physicality: "scale 0.95→1 on press",
                interruptible: "CSS transition with repeat on hover",
              },
              {
                pattern: "Toast notification",
                duration: "medium (300ms)",
                easing: "quietEase",
                physicality: "slide up + fade",
                interruptible: "CSS transition, safe for rapid add/remove",
              },
            ]}
          />
        </Container>
      </Section>
    </div>
  );
}
