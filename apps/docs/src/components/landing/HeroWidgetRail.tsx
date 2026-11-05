import * as React from "react";
import { Badge, Button, Card, CardBody, Progress, Text } from "@hudbird/ui";
import {
  ArrowDownRight,
  ArrowLeft,
  ArrowRight,
  AudioLines,
  Check,
  CloudSun,
  Disc3,
  Layers3,
  MapPin,
  Mic,
  Pause,
  Play,
  SlidersHorizontal,
  Sun,
} from "lucide-react";
import "./hero-widget-rail.css";

function Kicker({ children }: { children: React.ReactNode }) {
  return (
    <Text as="span" variant="small" className="hw-kicker">
      {children}
    </Text>
  );
}

const wave = [
  12, 29, 45, 24, 60, 43, 70, 27, 51, 33, 66, 50, 29, 77, 64, 88, 54, 35, 71, 48, 29, 61, 36, 19,
  42, 28, 16,
];
const samples = [
  {
    name: "Record sleeve",
    kind: "music",
    body: (
      <>
        <Kicker>
          <Disc3 /> Stereo / 01
        </Kicker>
        <span className="hw-disc" />
        <div className="hw-label">
          <strong>Blue Hour</strong>
          <small>Studio sessions</small>
        </div>
      </>
    ),
  },
  {
    name: "Activity chart",
    kind: "activity",
    body: (
      <>
        <Kicker>
          <AudioLines /> Activity
        </Kicker>
        <strong className="hw-value">4,218</strong>
        <svg viewBox="0 0 150 65" className="hw-spark" aria-hidden="true">
          <path d="M0 21H150 M0 42H150 M0 63H150" fill="none" stroke="currentColor" opacity=".15" />
          <path
            d="M0 62 L13 54 24 57 36 41 47 44 60 35 72 42 84 25 94 29 106 17 119 21 131 10 142 12 150 4 V65 H0Z"
            fill="#c0e7ff"
          />
          <path
            d="M0 62 L13 54 24 57 36 41 47 44 60 35 72 42 84 25 94 29 106 17 119 21 131 10 142 12 150 4"
            fill="none"
            stroke="#087cbe"
            strokeWidth="3"
          />
        </svg>
        <small>Views this week</small>
      </>
    ),
  },
  {
    name: "Coastal photograph",
    kind: "photo",
    body: (
      <>
        <img src="/assets/hospitality/kubu_beach.webp" alt="" loading="lazy" />
        <div className="hw-photo-caption">
          <Kicker>
            <MapPin /> Field notes
          </Kicker>
          <strong>Kubu Beach</strong>
        </div>
      </>
    ),
  },
  {
    name: "Voice recording",
    kind: "voice",
    body: (
      <>
        <Kicker>
          <Mic /> Voice memo
        </Kicker>
        <div className="hw-wave">
          {wave.map((h, i) => (
            <i key={i} style={{ height: h + "%" }} />
          ))}
        </div>
        <div className="hw-label">
          <strong>
            00:42<span>.18</span>
          </strong>
          <small>Studio take 03</small>
        </div>
      </>
    ),
  },
  {
    name: "Weather",
    kind: "weather",
    body: (
      <>
        <Kicker>
          Local weather <Sun />
        </Kicker>
        <CloudSun className="hw-weather-icon" />
        <div className="hw-label">
          <strong className="hw-value">24°</strong>
          <small>Partly cloudy · Bali</small>
        </div>
      </>
    ),
  },
  {
    name: "Studio clock",
    kind: "clock",
    body: (
      <>
        <Kicker>Studio time</Kicker>
        <span className="hw-dial">
          <i />
          <b />
        </span>
        <small>10:08 · Makassar</small>
      </>
    ),
  },
  {
    name: "Project dashboard",
    kind: "project",
    body: (
      <>
        <Kicker>
          <Layers3 /> Workspace
        </Kicker>
        <strong>Launch plan</strong>
        <div className="hw-tasks">
          <span>
            <Check />
            Brand brief
          </span>
          <span>
            <Check />
            Select layout
          </span>
          <span>
            <i />
            Review page
          </span>
        </div>
      </>
    ),
  },
  {
    name: "Calendar",
    kind: "calendar",
    body: (
      <>
        <Kicker>
          September <span>Fri</span>
        </Kicker>
        <strong className="hw-date">18</strong>
        <div className="hw-label">
          <strong>Design review</strong>
          <small>09:30 — 10:00</small>
        </div>
      </>
    ),
  },
  {
    name: "Brand swatches",
    kind: "swatches",
    body: (
      <>
        <Kicker>
          <SlidersHorizontal /> Brand palette
        </Kicker>
        <div className="hw-palette-strip">
          <i />
          <i />
          <i />
          <i />
        </div>
        <div className="hw-label">
          <strong>Cloud study</strong>
          <small>Four color tokens</small>
        </div>
      </>
    ),
  },
  {
    name: "Reading progress",
    kind: "reading",
    body: (
      <>
        <Kicker>Reading list</Kicker>
        <strong className="hw-book">
          Ways of
          <br />
          Seeing
        </strong>
        <Progress aria-label="Book progress" value={62} size="sm" color="default" />
        <small>62% complete</small>
      </>
    ),
  },
  {
    name: "Font specimen",
    kind: "type",
    body: (
      <>
        <Kicker>
          Type specimen <ArrowDownRight />
        </Kicker>
        <strong className="hw-glyph">Aa</strong>
        <div className="hw-label">
          <strong>Outfit</strong>
          <small>Medium / 500</small>
        </div>
      </>
    ),
  },
  {
    name: "Focus session",
    kind: "focus",
    body: (
      <>
        <Badge variant="soft" size="sm" color="zinc">
          Focus session
        </Badge>
        <strong className="hw-time">25:00</strong>
        <div className="hw-focus-ticks" />
        <small>One thing at a time</small>
      </>
    ),
  },
] as const;

// Positions are in cards, so resizing the viewport preserves the current sample.
export function HeroWidgetRail() {
  const viewport = React.useRef<HTMLUListElement>(null);
  const offset = React.useRef(0);
  const hovered = React.useRef(false);
  const redraw = React.useRef<() => void>(() => {});
  const [paused, setPaused] = React.useState(false);
  const [reduced, setReduced] = React.useState(false);
  const [announcement, setAnnouncement] = React.useState("");

  React.useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  React.useLayoutEffect(() => {
    const list = viewport.current!;
    const slots = Array.from(list.children) as HTMLElement[];
    let width = 0,
      card = 0,
      frame = 0,
      speed = 0,
      previous = 0;
    let inView = false;

    function paint() {
      const step = card + Math.max(9, card * 0.09);
      slots.forEach((slot, i) => {
        const count = slots.length;
        const distance = ((i - offset.current + count * 1.5) % count) - count / 2;
        const x = distance * step;
        const t = Math.max(-1, Math.min(1, x / Math.max(width / 2, card * 2)));
        const y = t * t * Math.min(54, width * 0.09);
        const placement = `translate3d(${x.toFixed(2)}px,${y.toFixed(2)}px,0) perspective(720px) rotateY(${(t * 38).toFixed(2)}deg) rotateZ(${(t * 7).toFixed(2)}deg) scale(${(1 - t * t * 0.09).toFixed(4)})`;
        // BrandScope disables animated transforms in reduced motion; keep static positions.
        slot.style.setProperty("transform", placement, reduced ? "important" : "");
      });
    }
    function measure() {
      width = list.clientWidth;
      card = slots[0].offsetWidth;
      paint();
    }
    function advance(now: number) {
      const elapsed = previous ? Math.min(50, now - previous) / 1000 : 0;
      previous = now;
      const target = hovered.current ? 0.035 : 0.16;
      speed += (target - speed) * (1 - Math.exp(-5 * elapsed));
      offset.current = (offset.current + speed * elapsed) % slots.length;
      paint();
      frame = requestAnimationFrame(advance);
    }
    function playback() {
      cancelAnimationFrame(frame);
      previous = 0;
      if (inView && !document.hidden && !paused && !reduced) frame = requestAnimationFrame(advance);
    }
    redraw.current = paint;
    measure();
    const size = new ResizeObserver(measure);
    size.observe(list);
    const visibility = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      playback();
    });
    visibility.observe(list);
    document.addEventListener("visibilitychange", playback);
    return () => {
      cancelAnimationFrame(frame);
      size.disconnect();
      visibility.disconnect();
      document.removeEventListener("visibilitychange", playback);
    };
  }, [paused, reduced]);

  function step(direction: number) {
    setPaused(true);
    const next = (Math.round(offset.current) + direction + samples.length) % samples.length;
    offset.current = next;
    redraw.current();
    setAnnouncement(`${next + 1} of ${samples.length}: ${samples[next].name}`);
  }
  return (
    <div
      className="hw-rail"
      role="region"
      aria-label="Hudbird widget samples"
      aria-roledescription="carousel"
    >
      <div className="hw-entrance">
        <ul className="hw-viewport" ref={viewport} aria-label="Twelve component examples">
          {samples.map(({ name, kind, body }) => (
            <li
              key={kind}
              className="hw-slot"
              aria-label={name}
              onPointerEnter={(event) => {
                hovered.current = event.pointerType === "mouse";
              }}
              onPointerLeave={() => {
                hovered.current = false;
              }}
            >
              <Card variant="flat" className={`hw-card hw-${kind}`}>
                <CardBody padding="none" className="hw-body">
                  {body}
                </CardBody>
              </Card>
            </li>
          ))}
        </ul>
      </div>
      <div className="hw-controls" aria-label="Gallery controls">
        <Button
          variant="plain"
          size="md"
          isIconOnly
          aria-label="Previous widget"
          onClick={() => step(-1)}
        >
          <ArrowLeft size={15} />
        </Button>
        {!reduced && (
          <Button
            variant="plain"
            size="md"
            isIconOnly
            aria-label={paused ? "Play widget gallery" : "Pause widget gallery"}
            onClick={() => setPaused(!paused)}
          >
            {paused ? <Play size={13} /> : <Pause size={13} />}
          </Button>
        )}
        <Button
          variant="plain"
          size="md"
          isIconOnly
          aria-label="Next widget"
          onClick={() => step(1)}
        >
          <ArrowRight size={15} />
        </Button>
      </div>
      <span role="status" className="sr-only">
        {announcement}
      </span>
    </div>
  );
}
