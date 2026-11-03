"use client";

import * as React from "react";
import { motion, LayoutGroup } from "framer-motion";
import {
  Section,
  Container,
  Grid,
  DoubleBezelCard,
  LiquidGlass,
  LiquidGlassBody,
  LiquidGlassStage,
  LiquidGlassIslandCompact,
  LiquidGlassIslandExpanded,
  type LiquidGlassMode,
  type LiquidGlassSpecular,
  type LiquidGlassKeylineTint,
  type LiquidGlassStageWallpaper,
  Divider,
  Avatar,
  Badge,
  Progress,
  CircularProgress,
  Slider,
  Button,
  Tabs,
  Tab,
  IconBox,
  Heading,
  Text,
  Lead,
  Code,
} from "@hudbird/ui";
import {
  Music2,
  Disc3,
  Mic,
  Trophy,
  Phone,
  PhoneOff,
  MicOff,
  Timer as TimerIcon,
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Shuffle,
  Minimize2,
  RotateCcw,
  Square,
  Navigation,
  CornerUpRight,
  Share2,
  Plane,
  Car,
  Headphones,
  SlidersHorizontal,
} from "lucide-react";

export type MorphingIslandMode =
  | "spotify"
  | "music"
  | "record"
  | "sport"
  | "call"
  | "timer"
  | "navigation"
  | "airdrop"
  | "flight"
  | "delivery"
  | "airpods";

export type DynamicIslandPresentation = "compact" | "minimal" | "expanded";

export interface MorphingIslandProps {
  /** Initial active Dynamic Island activity */
  defaultMode?: MorphingIslandMode;
  /** Controlled active mode */
  mode?: MorphingIslandMode;
  /** Callback fired when island mode changes */
  onModeChange?: (mode: MorphingIslandMode) => void;
  /** Initial WidgetKit DynamicIsland presentation ("compact" | "minimal" | "expanded") */
  defaultPresentation?: DynamicIslandPresentation;
  /** Controlled WidgetKit DynamicIsland presentation */
  presentation?: DynamicIslandPresentation;
  /** Callback fired when DynamicIsland presentation changes */
  onPresentationChange?: (presentation: DynamicIslandPresentation) => void;
  /** Apply WidgetKit .keylineTint(_:) semantic 1px perimeter border tint (@default false) */
  enableKeylineTint?: boolean;
  /** Initial surface mode: Golden Gate glassmorphic, Obsidian dark, or Daylight light */
  defaultSurfaceMode?: LiquidGlassMode;
  /** Controlled surface mode */
  surfaceMode?: LiquidGlassMode;
  /** Callback fired when surface mode changes */
  onSurfaceModeChange?: (mode: LiquidGlassMode) => void;
  /** Initial Golden Gate optical blur radius in px (0-64) */
  defaultBlur?: number;
  /** Controlled Golden Gate optical blur radius in px (0-64) */
  blur?: number;
  /** Callback fired when blur radius changes */
  onBlurChange?: (blur: number) => void;
  /** Initial Liquid Glass frost opacity (8-92) */
  defaultIntensity?: number;
  /** Controlled Liquid Glass frost opacity (8-92) */
  intensity?: number;
  /** Callback fired when frost opacity changes */
  onIntensityChange?: (intensity: number) => void;
  /** Color diffusion saturation percentage (100-220) */
  saturation?: number;
  /** Specular rim highlight style */
  specular?: LiquidGlassSpecular;
  /** Ambient stage backdrop used when surfaceMode="glass" */
  wallpaper?: LiquidGlassStageWallpaper;
  /** Show inline Golden Gate Blur & Frost tuning sliders */
  showGlassControls?: boolean;
  /** Backward-compatible shorthand for starting in Expanded vs Compact presentation */
  defaultExpanded?: boolean;
  /** Render a single dedicated Dynamic Island block without the multi-mode tab bar */
  standalone?: boolean;
  /** Automatically cycle through modes until user interacts (when standalone is false) */
  autoCycle?: boolean;
  /** Interval in ms for auto-cycling states */
  cycleIntervalMs?: number;
  /** Section headline */
  title?: string;
  /** Section description */
  description?: string;
  /** Optional className for root Section */
  className?: string;
}

const ISLAND_MORPH_SPRING = {
  type: "spring" as const,
  stiffness: 400,
  damping: 32,
  mass: 0.8,
};

const CONTENT_TRANSITION = {
  duration: 0.18,
  ease: [0.16, 1, 0.3, 1] as const,
};

const ACTIVITY_KEYLINE_TINT: Record<MorphingIslandMode, Exclude<LiquidGlassKeylineTint, "none">> = {
  spotify: "emerald",
  music: "indigo",
  record: "rose",
  sport: "rose",
  call: "emerald",
  timer: "amber",
  navigation: "sky",
  airdrop: "indigo",
  flight: "indigo",
  delivery: "sky",
  airpods: "emerald",
};

interface TrackItem {
  title: string;
  artist: string;
  albumArt: string;
  durationSec: number;
}

const MUSIC_TRACKS: readonly TrackItem[] = [
  {
    title: "Sugar On My Tongue",
    artist: "Tyler, The Creator",
    albumArt:
      "https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=400",
    durationSec: 152,
  },
  {
    title: "Midnight City",
    artist: "M83 · Hurry Up, We're Dreaming",
    albumArt:
      "https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=400",
    durationSec: 243,
  },
  {
    title: "After Hours",
    artist: "The Weeknd",
    albumArt:
      "https://images.pexels.com/photos/167092/pexels-photo-167092.jpeg?auto=compress&cs=tinysrgb&w=400",
    durationSec: 200,
  },
];

const SPOTIFY_COVER =
  "https://images.pexels.com/photos/1699161/pexels-photo-1699161.jpeg?auto=compress&cs=tinysrgb&w=400";
const CALLER_AVATAR =
  "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400";
const AIRDROP_AVATAR =
  "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400";
const COURIER_AVATAR =
  "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400";

const NAV_STEPS = [
  { distance: "200 m", street: "Turn right onto Page St", shortStreet: "Page St", progress: 64 },
  {
    distance: "450 m",
    street: "Continue on Market Blvd",
    shortStreet: "Market Blvd",
    progress: 84,
  },
  {
    distance: "60 m",
    street: "Destination on the right",
    shortStreet: "Arrival",
    progress: 100,
  },
] as const;

const FLIGHT_PHASES = [
  {
    badge: "Gate G9",
    expandedBadge: "Boarding · Gate G9",
    badgeColor: "success" as const,
    corridorLabel: "Pre-flight boarding · Group 1",
    progress: 18,
  },
  {
    badge: "In Air",
    expandedBadge: "Cruising · 38,000 ft",
    badgeColor: "primary" as const,
    corridorLabel: "Pacific corridor · 4h 12m remaining",
    progress: 64,
  },
  {
    badge: "Approach",
    expandedBadge: "Descending · Runway 34R",
    badgeColor: "warning" as const,
    corridorLabel: "Tokyo Bay approach · 18 min left",
    progress: 92,
  },
  {
    badge: "Landed",
    expandedBadge: "Arrived · Terminal 3",
    badgeColor: "success" as const,
    corridorLabel: "Taxiing to Gate 108 · On schedule",
    progress: 100,
  },
] as const;

const DELIVERY_STAGES = [
  {
    etaCompact: "4 min",
    status: "Approaching Market St pickup zone",
    etaLabel: "Driver en route · 1.2 km remaining",
    badge: "4 min ETA",
    badgeColor: "primary" as const,
    progress: 58,
  },
  {
    etaCompact: "1 min",
    status: "Turning onto Curbside Bay B",
    etaLabel: "Pulling up · Hazard lights active",
    badge: "1 min ETA",
    badgeColor: "warning" as const,
    progress: 86,
  },
  {
    etaCompact: "Here",
    status: "Waiting at main entrance pin",
    etaLabel: "Vehicle arrived · Trunk unlocked",
    badge: "Arrived at Curb",
    badgeColor: "success" as const,
    progress: 100,
  },
] as const;

type AncControlMode = "anc" | "adaptive" | "transparency";

const ANC_LABELS: Record<AncControlMode, string> = {
  anc: "ANC On",
  adaptive: "Adaptive",
  transparency: "Transparency",
};

const MODE_DEFAULTS: Record<MorphingIslandMode, { title: string; description: string }> = {
  spotify: {
    title: "Spotify Live Audio Capsule",
    description:
      "Compact audio status pill flanking the TrueDepth sensor that morphs into a 4-region expanded playback island with concentric cover art, tabular clock, and 44pt transport controls.",
  },
  music: {
    title: "Music Player & Scrubber Island",
    description:
      "Transitions across Compact, Minimal, and Expanded WidgetKit regions with ContainerRelativeShape album art, interactive timeline slider, and lossless transport controls.",
  },
  record: {
    title: "Screen & Mic Capture Island",
    description:
      "Live capture indicator with monospaced session timer, semantic rose keyline tint, real-time input gain meter, and tactile pause or stop controls.",
  },
  sport: {
    title: "Live Match Scoreboard Island",
    description:
      "Compact club crest scoreline flanking the sensor that expands into a full scoreboard in the unobstructed center region with possession telemetry.",
  },
  call: {
    title: "Incoming & Active Call Island",
    description:
      "Concentric caller capsule that transitions cleanly between macro-tappable compact call status, minimal attached avatar, and 44pt expanded call controls.",
  },
  timer: {
    title: "Countdown Timer Island",
    description:
      "Compact circular progress ring and tabular countdown pill that expands into live countdown typography with ergonomic pause, resume, and reset buttons.",
  },
  navigation: {
    title: "Turn-by-Turn Navigation Island",
    description:
      "Glanceable maneuver distance and street capsule that opens into full turn guidance, sky keyline tint, and route progress inside 20pt margins.",
  },
  airdrop: {
    title: "AirDrop Transfer Island",
    description:
      "Compact sender avatar and live percentage pill that morphs into an expanded transfer card with circular completion ring and replay trigger.",
  },
  flight: {
    title: "Flight Boarding & Corridor Island",
    description:
      "Airport pair and gate pill flanking the TrueDepth sensor that expands into SFO to HND corridor progress, seat assignment, and phase switching.",
  },
  delivery: {
    title: "Live Ride & Pickup Tracker Island",
    description:
      "Curbside pickup ETA and vehicle plate pill that expands into live vehicle telemetry, pickup progress bar, and stage advancement.",
  },
  airpods: {
    title: "AirPods Pro & Spatial Audio Island",
    description:
      "Hardware connection capsule with circular battery ring that morphs into Noise Cancel, Adaptive, and Transparency controls within inset margins.",
  },
};

function formatClock(totalSeconds: number): string {
  const safe = Math.max(0, Math.floor(totalSeconds));
  const mins = Math.floor(safe / 60);
  const secs = safe % 60;
  return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}

export const MorphingIsland: React.FC<MorphingIslandProps> = ({
  defaultMode = "spotify",
  mode: controlledMode,
  onModeChange,
  defaultPresentation,
  presentation: controlledPresentation,
  onPresentationChange,
  enableKeylineTint = false,
  defaultSurfaceMode = "glass",
  surfaceMode: controlledSurfaceMode,
  onSurfaceModeChange,
  defaultBlur = 22,
  blur: controlledBlur,
  onBlurChange,
  defaultIntensity = 56,
  intensity: controlledIntensity,
  onIntensityChange,
  saturation = 175,
  specular = "crisp",
  wallpaper = "golden-gate",
  showGlassControls = false,
  defaultExpanded = true,
  standalone = false,
  autoCycle: initialAutoCycle = false,
  cycleIntervalMs = 4200,
  title,
  description,
  className,
}) => {
  const instanceId = React.useId();

  const initialPresentation: DynamicIslandPresentation =
    defaultPresentation ?? (defaultExpanded === false ? "compact" : "expanded");

  const [uncontrolledMode, setUncontrolledMode] = React.useState<MorphingIslandMode>(defaultMode);
  const [uncontrolledPresentation, setUncontrolledPresentation] =
    React.useState<DynamicIslandPresentation>(initialPresentation);
  const [uncontrolledSurface, setUncontrolledSurface] =
    React.useState<LiquidGlassMode>(defaultSurfaceMode);
  const [uncontrolledBlur, setUncontrolledBlur] = React.useState<number>(defaultBlur);
  const [uncontrolledIntensity, setUncontrolledIntensity] =
    React.useState<number>(defaultIntensity);
  const [tunerOpen, setTunerOpen] = React.useState<boolean>(showGlassControls);
  const [isAutoCycling, setIsAutoCycling] = React.useState<boolean>(initialAutoCycle);

  // Activity States
  const [spotifyPlaying, setSpotifyPlaying] = React.useState<boolean>(true);
  const [spotifySec, setSpotifySec] = React.useState<number>(51);

  const [trackIndex, setTrackIndex] = React.useState<number>(0);
  const [musicPlaying, setMusicPlaying] = React.useState<boolean>(true);
  const [musicSec, setMusicSec] = React.useState<number>(81);
  const [shuffleOn, setShuffleOn] = React.useState<boolean>(false);

  const [isRecording, setIsRecording] = React.useState<boolean>(true);
  const [recordSec, setRecordSec] = React.useState<number>(42);

  const [arsScore, setArsScore] = React.useState<number>(2);
  const [mciScore, setMciScore] = React.useState<number>(1);
  const [matchMinute, setMatchMinute] = React.useState<number>(78);

  const [callState, setCallState] = React.useState<"incoming" | "active">("incoming");
  const [callSec, setCallSec] = React.useState<number>(14);
  const [isMuted, setIsMuted] = React.useState<boolean>(false);

  const [timerRunning, setTimerRunning] = React.useState<boolean>(true);
  const [timerSec, setTimerSec] = React.useState<number>(22);
  const timerTotalSec = 60;

  const [navStepIdx, setNavStepIdx] = React.useState<number>(0);
  const [airdropProgress, setAirdropProgress] = React.useState<number>(76);

  const [flightPhaseIdx, setFlightPhaseIdx] = React.useState<number>(1);
  const [deliveryStageIdx, setDeliveryStageIdx] = React.useState<number>(0);
  const [ancMode, setAncMode] = React.useState<AncControlMode>("anc");
  const [spatialTracked, setSpatialTracked] = React.useState<boolean>(true);
  const budsBattery = 94;

  const activeMode = controlledMode !== undefined ? controlledMode : uncontrolledMode;
  const activePresentation =
    controlledPresentation !== undefined ? controlledPresentation : uncontrolledPresentation;
  const activeSurfaceMode =
    controlledSurfaceMode !== undefined ? controlledSurfaceMode : uncontrolledSurface;
  const activeBlur = controlledBlur !== undefined ? controlledBlur : uncontrolledBlur;
  const activeIntensity =
    controlledIntensity !== undefined ? controlledIntensity : uncontrolledIntensity;

  const isExpanded = activePresentation === "expanded";
  const isCompact = activePresentation === "compact";
  const isMinimal = activePresentation === "minimal";

  const activeKeylineTint: LiquidGlassKeylineTint = enableKeylineTint
    ? ACTIVITY_KEYLINE_TINT[activeMode]
    : "none";

  const resolvedTitle =
    title ?? (standalone ? MODE_DEFAULTS[activeMode].title : "Dynamic Island Activity Suite");
  const resolvedDescription =
    description ??
    (standalone
      ? MODE_DEFAULTS[activeMode].description
      : "Official Apple WidgetKit DynamicIsland architecture across Compact, Minimal, and Expanded presentations with Golden Gate Liquid Glass.");

  const currentTrack = MUSIC_TRACKS[trackIndex];
  const currentNav = NAV_STEPS[navStepIdx];
  const currentFlight = FLIGHT_PHASES[flightPhaseIdx];
  const currentDelivery = DELIVERY_STAGES[deliveryStageIdx];

  const setMode = React.useCallback(
    (nextMode: MorphingIslandMode) => {
      if (controlledMode === undefined) {
        setUncontrolledMode(nextMode);
      }
      onModeChange?.(nextMode);
    },
    [controlledMode, onModeChange]
  );

  const setPresentation = React.useCallback(
    (nextPresentation: DynamicIslandPresentation) => {
      if (controlledPresentation === undefined) {
        setUncontrolledPresentation(nextPresentation);
      }
      onPresentationChange?.(nextPresentation);
    },
    [controlledPresentation, onPresentationChange]
  );

  const setSurfaceMode = React.useCallback(
    (nextSurface: LiquidGlassMode) => {
      if (controlledSurfaceMode === undefined) {
        setUncontrolledSurface(nextSurface);
      }
      onSurfaceModeChange?.(nextSurface);
    },
    [controlledSurfaceMode, onSurfaceModeChange]
  );

  const setBlurValue = React.useCallback(
    (nextBlur: number) => {
      if (controlledBlur === undefined) {
        setUncontrolledBlur(nextBlur);
      }
      onBlurChange?.(nextBlur);
    },
    [controlledBlur, onBlurChange]
  );

  const setIntensityValue = React.useCallback(
    (nextIntensity: number) => {
      if (controlledIntensity === undefined) {
        setUncontrolledIntensity(nextIntensity);
      }
      onIntensityChange?.(nextIntensity);
    },
    [controlledIntensity, onIntensityChange]
  );

  React.useEffect(() => {
    setIsAutoCycling(initialAutoCycle);
  }, [initialAutoCycle]);

  React.useEffect(() => {
    setTunerOpen(showGlassControls);
  }, [showGlassControls]);

  React.useEffect(() => {
    if (!isAutoCycling || standalone) return;
    const order: MorphingIslandMode[] = [
      "spotify",
      "music",
      "record",
      "sport",
      "call",
      "timer",
      "navigation",
      "airdrop",
      "flight",
      "delivery",
      "airpods",
    ];
    const interval = window.setInterval(() => {
      const idx = order.indexOf(activeMode);
      const next = order[(idx + 1) % order.length];
      setMode(next);
      setPresentation("expanded");
    }, cycleIntervalMs);
    return () => window.clearInterval(interval);
  }, [isAutoCycling, standalone, activeMode, cycleIntervalMs, setMode, setPresentation]);

  React.useEffect(() => {
    const tick = window.setInterval(() => {
      if ((activeMode === "spotify" || isMinimal) && spotifyPlaying) {
        setSpotifySec((prev) => (prev >= 200 ? 0 : prev + 1));
      }
      if (activeMode === "music" && musicPlaying) {
        setMusicSec((prev) => (prev >= currentTrack.durationSec ? 0 : prev + 1));
      }
      if (activeMode === "record" && isRecording) {
        setRecordSec((prev) => prev + 1);
      }
      if (activeMode === "call" && callState === "active") {
        setCallSec((prev) => prev + 1);
      }
      if ((activeMode === "timer" || isMinimal) && timerRunning) {
        setTimerSec((prev) => (prev <= 0 ? timerTotalSec : prev - 1));
      }
    }, 1000);
    return () => window.clearInterval(tick);
  }, [
    activeMode,
    isMinimal,
    spotifyPlaying,
    musicPlaying,
    currentTrack.durationSec,
    isRecording,
    callState,
    timerRunning,
  ]);

  const handleSelectMode = (key: string) => {
    setIsAutoCycling(false);
    setMode(key as MorphingIslandMode);
  };

  const handleNextTrack = () => {
    setIsAutoCycling(false);
    setTrackIndex((prev) => (prev + 1) % MUSIC_TRACKS.length);
    setMusicSec(0);
    setMusicPlaying(true);
  };

  const handlePrevTrack = () => {
    setIsAutoCycling(false);
    setTrackIndex((prev) => (prev - 1 + MUSIC_TRACKS.length) % MUSIC_TRACKS.length);
    setMusicSec(0);
    setMusicPlaying(true);
  };

  const timerProgress = Math.round((timerSec / timerTotalSec) * 100);
  const remainingMusicSec = Math.max(0, currentTrack.durationSec - musicSec);
  const spotifyProgress = Math.min(100, Math.round((spotifySec / 200) * 100));

  const sharedGlassProps = {
    mode: activeSurfaceMode,
    blur: activeBlur,
    intensity: activeIntensity,
    saturation,
    specular,
    keylineTint: activeKeylineTint,
  } as const;

  const secondaryConcurrentMode: MorphingIslandMode = activeMode === "timer" ? "spotify" : "timer";
  const secondaryKeylineTint: LiquidGlassKeylineTint = enableKeylineTint
    ? ACTIVITY_KEYLINE_TINT[secondaryConcurrentMode]
    : "none";

  const renderMinimalLeading = () => {
    switch (activeMode) {
      case "spotify":
        return (
          <motion.div
            layoutId={`${instanceId}-sp-art`}
            className="flex shrink-0 items-center justify-center leading-none"
          >
            <Avatar src={SPOTIFY_COVER} alt="Blinding Lights" size="sm" radius="full" />
          </motion.div>
        );
      case "music":
        return (
          <motion.div
            layoutId={`${instanceId}-mu-art`}
            className="flex shrink-0 items-center justify-center leading-none"
          >
            <Avatar src={currentTrack.albumArt} alt={currentTrack.title} size="sm" radius="full" />
          </motion.div>
        );
      case "record":
        return (
          <Badge variant="solid" color="danger" size="sm">
            REC
          </Badge>
        );
      case "sport":
        return <Avatar size="sm" name="ARS" color="danger" radius="full" />;
      case "call":
        return (
          <motion.div
            layoutId={`${instanceId}-call-av`}
            className="flex shrink-0 items-center justify-center leading-none"
          >
            <Avatar src={CALLER_AVATAR} alt="Tania Castillo" size="sm" radius="full" />
          </motion.div>
        );
      case "timer":
        return <CircularProgress size="sm" color="warning" value={timerProgress} />;
      case "navigation":
        return (
          <div className="flex items-center gap-1.5 pl-1">
            <CornerUpRight className="h-4 w-4 shrink-0" />
            <Text as="span" variant="strong" tabularNums className="text-xs leading-none">
              {currentNav.distance}
            </Text>
          </div>
        );
      case "airdrop":
        return (
          <motion.div
            layoutId={`${instanceId}-air-av`}
            className="flex shrink-0 items-center justify-center leading-none"
          >
            <Avatar src={AIRDROP_AVATAR} alt="Jae Woo" size="sm" radius="full" />
          </motion.div>
        );
      case "flight":
        return (
          <div className="flex items-center gap-1.5 pl-1">
            <Plane className="h-4 w-4 shrink-0" />
            <Text as="span" variant="strong" className="text-xs leading-none">
              SFO
            </Text>
          </div>
        );
      case "delivery":
        return (
          <motion.div
            layoutId={`${instanceId}-dlv-av`}
            className="flex shrink-0 items-center justify-center leading-none"
          >
            <Avatar src={COURIER_AVATAR} alt="Pickup vehicle" size="sm" radius="full" />
          </motion.div>
        );
      case "airpods":
        return (
          <div className="flex items-center gap-1.5 pl-1">
            <Headphones className="h-4 w-4 shrink-0" />
            <Text as="span" variant="strong" tabularNums className="text-xs leading-none">
              {budsBattery}%
            </Text>
          </div>
        );
    }
  };

  const handleDetachedBubbleActivate = () => {
    setIsAutoCycling(false);
    if (!standalone) {
      setMode(secondaryConcurrentMode);
      setPresentation("expanded");
    } else {
      setPresentation("expanded");
    }
  };

  return (
    <Section spacing="md" className={className}>
      <Container size="xl">
        <Container size="prose" gutter="none">
          <Section spacing="xs">
            <div className="flex flex-col items-center gap-3 text-center">
              <Heading as="h2" size={standalone ? "h2" : "h1"} tracking="tight">
                {resolvedTitle}
              </Heading>

              <Lead align="center">{resolvedDescription}</Lead>

              <div className="flex flex-wrap items-center justify-center gap-2.5 pt-2">
                {!standalone && (
                  <Tabs
                    variant="solid"
                    size="sm"
                    radius="lg"
                    selectedKey={activeMode}
                    onSelectionChange={handleSelectMode}
                  >
                    <Tab
                      tabKey="spotify"
                      title="Spotify"
                      icon={<Disc3 className="h-3.5 w-3.5" />}
                    />
                    <Tab tabKey="music" title="Music" icon={<Music2 className="h-3.5 w-3.5" />} />
                    <Tab tabKey="record" title="Record" icon={<Mic className="h-3.5 w-3.5" />} />
                    <Tab tabKey="sport" title="Sport" icon={<Trophy className="h-3.5 w-3.5" />} />
                    <Tab tabKey="call" title="Call" icon={<Phone className="h-3.5 w-3.5" />} />
                    <Tab
                      tabKey="timer"
                      title="Timer"
                      icon={<TimerIcon className="h-3.5 w-3.5" />}
                    />
                    <Tab
                      tabKey="navigation"
                      title="Maps"
                      icon={<Navigation className="h-3.5 w-3.5" />}
                    />
                    <Tab
                      tabKey="airdrop"
                      title="AirDrop"
                      icon={<Share2 className="h-3.5 w-3.5" />}
                    />
                    <Tab tabKey="flight" title="Flight" icon={<Plane className="h-3.5 w-3.5" />} />
                    <Tab tabKey="delivery" title="Ride" icon={<Car className="h-3.5 w-3.5" />} />
                    <Tab
                      tabKey="airpods"
                      title="AirPods"
                      icon={<Headphones className="h-3.5 w-3.5" />}
                    />
                  </Tabs>
                )}

                <Tabs
                  variant="solid"
                  size="sm"
                  radius="lg"
                  selectedKey={activePresentation}
                  onSelectionChange={(key) => {
                    setIsAutoCycling(false);
                    setPresentation(key as DynamicIslandPresentation);
                  }}
                >
                  <Tab tabKey="compact" title="Compact" />
                  <Tab tabKey="minimal" title="Minimal" />
                  <Tab tabKey="expanded" title="Expanded" />
                </Tabs>

                <Tabs
                  variant="solid"
                  size="sm"
                  radius="lg"
                  selectedKey={activeSurfaceMode}
                  onSelectionChange={(key) => setSurfaceMode(key as LiquidGlassMode)}
                >
                  <Tab tabKey="glass" title="Glass" />
                  <Tab tabKey="dark" title="Dark" />
                  <Tab tabKey="light" title="Light" />
                </Tabs>

                <Button
                  size="sm"
                  variant={tunerOpen ? "solid" : "outline"}
                  color={tunerOpen ? "primary" : "zinc"}
                  radius="full"
                  onClick={() => setTunerOpen((prev) => !prev)}
                >
                  <SlidersHorizontal className="h-3.5 w-3.5" />
                  Golden Gate Blur
                </Button>

                {!standalone && (
                  <Button
                    size="sm"
                    variant="outline"
                    radius="full"
                    onClick={() => setIsAutoCycling((prev) => !prev)}
                  >
                    {isAutoCycling ? (
                      <>
                        <Pause className="h-3.5 w-3.5" />
                        Pause Cycle
                      </>
                    ) : (
                      <>
                        <Play className="h-3.5 w-3.5 translate-x-[0.5px]" />
                        Auto-Cycle
                      </>
                    )}
                  </Button>
                )}
              </div>

              {tunerOpen && (
                <Container size="sm" gutter="none" className="pt-2 text-left">
                  <LiquidGlass mode="light" blur={18} intensity={94} radius="lg">
                    <LiquidGlassBody padding="compact">
                      <Grid cols={2} gap="sm">
                        <div className="space-y-1.5">
                          <div className="flex items-center justify-between">
                            <Text
                              as="span"
                              variant="small"
                              weight="semibold"
                              className="leading-none"
                            >
                              Optical Blur Radius
                            </Text>
                            <Code>{activeBlur}px</Code>
                          </div>
                          <Slider
                            size="sm"
                            color="primary"
                            aria-label="Golden Gate optical blur radius"
                            min={0}
                            max={48}
                            value={activeBlur}
                            onChange={setBlurValue}
                          />
                        </div>

                        <div className="space-y-1.5">
                          <div className="flex items-center justify-between">
                            <Text
                              as="span"
                              variant="small"
                              weight="semibold"
                              className="leading-none"
                            >
                              Liquid Glass Opacity
                            </Text>
                            <Code>{activeIntensity}%</Code>
                          </div>
                          <Slider
                            size="sm"
                            color="primary"
                            aria-label="Golden Gate Liquid Glass frost opacity"
                            min={10}
                            max={90}
                            value={activeIntensity}
                            onChange={setIntensityValue}
                          />
                        </div>
                      </Grid>
                    </LiquidGlassBody>
                  </LiquidGlass>
                </Container>
              )}
            </div>
          </Section>
        </Container>

        <Container size="md" gutter="none">
          <DoubleBezelCard variant="default" padding="none">
            <LiquidGlassStage
              mode={activeSurfaceMode}
              wallpaper={wallpaper}
              padding="lg"
              containerSize="sm"
            >
              <LayoutGroup id={`${instanceId}-stage`}>
                <div className="flex min-h-[290px] flex-col items-center justify-center gap-5">
                  <div
                    className={
                      isExpanded ? "flex w-full justify-center" : "flex w-auto justify-center"
                    }
                  >
                    {/* MINIMAL PRESENTATION (Concurrent Attached Pill + Detached 44pt Circular Bubble) */}
                    {isMinimal && (
                      <div className="flex items-center justify-center gap-2.5">
                        <motion.div
                          key={`${activeMode}-minimal-attached`}
                          layoutId={`${instanceId}-shell`}
                          transition={ISLAND_MORPH_SPRING}
                          style={{ willChange: "transform" }}
                        >
                          <LiquidGlass
                            {...sharedGlassProps}
                            radius="capsule"
                            isPressable
                            aria-label={`Expand ${MODE_DEFAULTS[activeMode].title}`}
                            onClick={() => setPresentation("expanded")}
                          >
                            <LiquidGlassBody padding="compactPill">
                              <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={CONTENT_TRANSITION}
                                className="w-full"
                              >
                                <LiquidGlassIslandCompact leading={renderMinimalLeading()} />
                              </motion.div>
                            </LiquidGlassBody>
                          </LiquidGlass>
                        </motion.div>

                        <motion.div
                          key={`${activeMode}-minimal-detached`}
                          initial={{ opacity: 0, scale: 0.82 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={ISLAND_MORPH_SPRING}
                          style={{ willChange: "transform" }}
                        >
                          <LiquidGlass
                            mode={activeSurfaceMode}
                            blur={activeBlur}
                            intensity={activeIntensity}
                            saturation={saturation}
                            specular={specular}
                            keylineTint={secondaryKeylineTint}
                            radius="capsule"
                            isPressable
                            aria-label={
                              standalone
                                ? "Expand concurrent Live Activity"
                                : `Switch to concurrent ${secondaryConcurrentMode} Live Activity`
                            }
                            onClick={handleDetachedBubbleActivate}
                          >
                            <LiquidGlassBody padding="minimal">
                              {secondaryConcurrentMode === "timer" ? (
                                <CircularProgress size="sm" color="warning" value={timerProgress} />
                              ) : (
                                <Avatar
                                  src={SPOTIFY_COVER}
                                  alt="Concurrent Spotify playback"
                                  size="sm"
                                  radius="full"
                                />
                              )}
                            </LiquidGlassBody>
                          </LiquidGlass>
                        </motion.div>
                      </div>
                    )}

                    {/* 1. SPOTIFY LIVE ACTIVITY */}
                    {activeMode === "spotify" && isCompact && (
                      <motion.div
                        key="spotify-compact"
                        layoutId={`${instanceId}-shell`}
                        transition={ISLAND_MORPH_SPRING}
                        style={{ willChange: "transform" }}
                        className="w-[296px] sm:w-[320px]"
                      >
                        <LiquidGlass
                          {...sharedGlassProps}
                          radius="capsule"
                          isPressable
                          aria-label="Expand Spotify Live Activity"
                          onClick={() => setPresentation("expanded")}
                        >
                          <LiquidGlassBody padding="compactPill">
                            <motion.div
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={CONTENT_TRANSITION}
                              className="w-full"
                            >
                              <LiquidGlassIslandCompact
                                leading={
                                  <motion.div
                                    layoutId={`${instanceId}-sp-art`}
                                    className="flex shrink-0 items-center justify-center leading-none"
                                  >
                                    <Avatar
                                      src={SPOTIFY_COVER}
                                      alt="Blinding Lights"
                                      size="sm"
                                      radius="full"
                                    />
                                  </motion.div>
                                }
                                trailing={
                                  <motion.div
                                    layoutId={`${instanceId}-sp-clock`}
                                    className="flex shrink-0 items-center justify-center leading-none"
                                  >
                                    <Code>{formatClock(spotifySec)}</Code>
                                  </motion.div>
                                }
                              />
                            </motion.div>
                          </LiquidGlassBody>
                        </LiquidGlass>
                      </motion.div>
                    )}

                    {activeMode === "spotify" && isExpanded && (
                      <motion.div
                        key="spotify-expanded"
                        layoutId={`${instanceId}-shell`}
                        transition={ISLAND_MORPH_SPRING}
                        style={{ willChange: "transform" }}
                        className="w-full"
                      >
                        <LiquidGlass {...sharedGlassProps} radius="island">
                          <LiquidGlassBody padding="island">
                            <motion.div
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={CONTENT_TRANSITION}
                              className="w-full"
                            >
                              <LiquidGlassIslandExpanded
                                leading={
                                  <motion.div
                                    layoutId={`${instanceId}-sp-art`}
                                    className="flex shrink-0 items-center justify-center leading-none"
                                  >
                                    <Avatar
                                      src={SPOTIFY_COVER}
                                      alt="Blinding Lights cover"
                                      size="lg"
                                      radius="lg"
                                    />
                                  </motion.div>
                                }
                                trailing={
                                  <Badge variant="solid" color="success" size="sm">
                                    Spotify
                                  </Badge>
                                }
                                center={
                                  <div className="flex items-center justify-between gap-3">
                                    <div className="flex min-w-0 flex-col justify-center gap-0.5 leading-tight">
                                      <Heading as="h3" size="h5">
                                        Blinding Lights
                                      </Heading>
                                      <Text variant="small">The Weeknd · After Hours</Text>
                                    </div>
                                    <motion.div
                                      layoutId={`${instanceId}-sp-clock`}
                                      className="flex shrink-0 items-center justify-center leading-none"
                                    >
                                      <Code>{formatClock(spotifySec)}</Code>
                                    </motion.div>
                                  </div>
                                }
                                bottom={
                                  <>
                                    <Progress
                                      size="sm"
                                      radius="full"
                                      color="success"
                                      value={spotifyProgress}
                                    />
                                    <Divider variant="solid" />
                                    <div className="flex items-center justify-between gap-3">
                                      <Text variant="small" tabularNums className="leading-none">
                                        {formatClock(spotifySec)} / 03:20
                                      </Text>
                                      <div className="flex items-center gap-2">
                                        <Button
                                          isIconOnly
                                          size="md"
                                          variant="solid"
                                          color="success"
                                          radius="full"
                                          aria-label={
                                            spotifyPlaying ? "Pause Spotify" : "Play Spotify"
                                          }
                                          onClick={() => setSpotifyPlaying((prev) => !prev)}
                                        >
                                          {spotifyPlaying ? (
                                            <Pause className="h-4 w-4" />
                                          ) : (
                                            <Play className="h-4 w-4 translate-x-[1px]" />
                                          )}
                                        </Button>

                                        <Button
                                          isIconOnly
                                          size="md"
                                          variant="ghost"
                                          radius="full"
                                          aria-label="Collapse to compact pill"
                                          onClick={() => setPresentation("compact")}
                                        >
                                          <Minimize2 className="h-4 w-4" />
                                        </Button>
                                      </div>
                                    </div>
                                  </>
                                }
                              />
                            </motion.div>
                          </LiquidGlassBody>
                        </LiquidGlass>
                      </motion.div>
                    )}

                    {/* 2. MUSIC PLAYER LIVE ACTIVITY */}
                    {activeMode === "music" && isCompact && (
                      <motion.div
                        key="music-compact"
                        layoutId={`${instanceId}-shell`}
                        transition={ISLAND_MORPH_SPRING}
                        style={{ willChange: "transform" }}
                        className="w-[300px] sm:w-[324px]"
                      >
                        <LiquidGlass
                          {...sharedGlassProps}
                          radius="capsule"
                          isPressable
                          aria-label="Expand Music Live Activity"
                          onClick={() => setPresentation("expanded")}
                        >
                          <LiquidGlassBody padding="compactPill">
                            <motion.div
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={CONTENT_TRANSITION}
                              className="w-full"
                            >
                              <LiquidGlassIslandCompact
                                leading={
                                  <motion.div
                                    layoutId={`${instanceId}-mu-art`}
                                    className="flex shrink-0 items-center justify-center leading-none"
                                  >
                                    <Avatar
                                      src={currentTrack.albumArt}
                                      alt={currentTrack.title}
                                      size="sm"
                                      radius="full"
                                    />
                                  </motion.div>
                                }
                                trailing={<Code>-{formatClock(remainingMusicSec)}</Code>}
                              />
                            </motion.div>
                          </LiquidGlassBody>
                        </LiquidGlass>
                      </motion.div>
                    )}

                    {activeMode === "music" && isExpanded && (
                      <motion.div
                        key="music-expanded"
                        layoutId={`${instanceId}-shell`}
                        transition={ISLAND_MORPH_SPRING}
                        style={{ willChange: "transform" }}
                        className="w-full"
                      >
                        <LiquidGlass {...sharedGlassProps} radius="island">
                          <LiquidGlassBody padding="island">
                            <motion.div
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={CONTENT_TRANSITION}
                              className="w-full"
                            >
                              <LiquidGlassIslandExpanded
                                leading={
                                  <motion.div
                                    layoutId={`${instanceId}-mu-art`}
                                    className="flex shrink-0 items-center justify-center leading-none"
                                  >
                                    <Avatar
                                      src={currentTrack.albumArt}
                                      alt={currentTrack.title}
                                      size="lg"
                                      radius="lg"
                                    />
                                  </motion.div>
                                }
                                trailing={
                                  <Badge variant="soft" color="primary" size="sm">
                                    Lossless
                                  </Badge>
                                }
                                center={
                                  <div className="flex flex-col justify-center gap-0.5 leading-tight">
                                    <Heading as="h3" size="h5">
                                      {currentTrack.title}
                                    </Heading>
                                    <Text variant="small">{currentTrack.artist}</Text>
                                  </div>
                                }
                                bottom={
                                  <>
                                    <div className="space-y-2">
                                      <Slider
                                        size="sm"
                                        color="primary"
                                        aria-label="Track playback position"
                                        min={0}
                                        max={currentTrack.durationSec}
                                        value={musicSec}
                                        onChange={(val) => setMusicSec(val)}
                                      />
                                      <div className="flex items-center justify-between">
                                        <Text
                                          as="span"
                                          variant="small"
                                          tabularNums
                                          className="leading-none"
                                        >
                                          {formatClock(musicSec)}
                                        </Text>
                                        <Text
                                          as="span"
                                          variant="small"
                                          tabularNums
                                          className="leading-none"
                                        >
                                          -{formatClock(remainingMusicSec)}
                                        </Text>
                                      </div>
                                    </div>

                                    <Divider variant="solid" />

                                    <div className="flex items-center justify-between gap-2">
                                      <Button
                                        isIconOnly
                                        size="md"
                                        variant={shuffleOn ? "flat" : "ghost"}
                                        color={shuffleOn ? "primary" : "zinc"}
                                        radius="full"
                                        aria-label="Toggle shuffle"
                                        onClick={() => setShuffleOn((prev) => !prev)}
                                      >
                                        <Shuffle className="h-4 w-4" />
                                      </Button>

                                      <div className="flex items-center gap-2">
                                        <Button
                                          isIconOnly
                                          size="md"
                                          variant="ghost"
                                          radius="full"
                                          aria-label="Previous track"
                                          onClick={handlePrevTrack}
                                        >
                                          <SkipBack className="h-4 w-4" />
                                        </Button>

                                        <Button
                                          isIconOnly
                                          size="md"
                                          variant="solid"
                                          color="primary"
                                          radius="full"
                                          aria-label={musicPlaying ? "Pause track" : "Play track"}
                                          onClick={() => setMusicPlaying((prev) => !prev)}
                                        >
                                          {musicPlaying ? (
                                            <Pause className="h-4 w-4" />
                                          ) : (
                                            <Play className="h-4 w-4 translate-x-[1px]" />
                                          )}
                                        </Button>

                                        <Button
                                          isIconOnly
                                          size="md"
                                          variant="ghost"
                                          radius="full"
                                          aria-label="Next track"
                                          onClick={handleNextTrack}
                                        >
                                          <SkipForward className="h-4 w-4" />
                                        </Button>
                                      </div>

                                      <Button
                                        isIconOnly
                                        size="md"
                                        variant="ghost"
                                        radius="full"
                                        aria-label="Collapse music player"
                                        onClick={() => setPresentation("compact")}
                                      >
                                        <Minimize2 className="h-4 w-4" />
                                      </Button>
                                    </div>
                                  </>
                                }
                              />
                            </motion.div>
                          </LiquidGlassBody>
                        </LiquidGlass>
                      </motion.div>
                    )}

                    {/* 3. SCREEN & VOICE RECORDING LIVE ACTIVITY */}
                    {activeMode === "record" && isCompact && (
                      <motion.div
                        key="record-compact"
                        layoutId={`${instanceId}-shell`}
                        transition={ISLAND_MORPH_SPRING}
                        style={{ willChange: "transform" }}
                        className="w-[296px] sm:w-[320px]"
                      >
                        <LiquidGlass
                          {...sharedGlassProps}
                          radius="capsule"
                          isPressable
                          aria-label="Expand Screen Recording Live Activity"
                          onClick={() => setPresentation("expanded")}
                        >
                          <LiquidGlassBody padding="compactPill">
                            <motion.div
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={CONTENT_TRANSITION}
                              className="w-full"
                            >
                              <LiquidGlassIslandCompact
                                leading={
                                  <Badge variant="solid" color="danger" size="sm">
                                    {isRecording ? "REC" : "HOLD"}
                                  </Badge>
                                }
                                trailing={
                                  <motion.div
                                    layoutId={`${instanceId}-rec-clock`}
                                    className="flex shrink-0 items-center justify-center leading-none"
                                  >
                                    <Code>{formatClock(recordSec)}</Code>
                                  </motion.div>
                                }
                              />
                            </motion.div>
                          </LiquidGlassBody>
                        </LiquidGlass>
                      </motion.div>
                    )}

                    {activeMode === "record" && isExpanded && (
                      <motion.div
                        key="record-expanded"
                        layoutId={`${instanceId}-shell`}
                        transition={ISLAND_MORPH_SPRING}
                        style={{ willChange: "transform" }}
                        className="w-full"
                      >
                        <LiquidGlass {...sharedGlassProps} radius="island">
                          <LiquidGlassBody padding="island">
                            <motion.div
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={CONTENT_TRANSITION}
                              className="w-full"
                            >
                              <LiquidGlassIslandExpanded
                                leading={
                                  <IconBox size="sm" variant="glass" showGlow={false} icon={Mic} />
                                }
                                trailing={
                                  <motion.div
                                    layoutId={`${instanceId}-rec-clock`}
                                    className="flex shrink-0 items-center justify-center leading-none"
                                  >
                                    <Badge variant="soft" color="danger" size="md">
                                      {formatClock(recordSec)}
                                    </Badge>
                                  </motion.div>
                                }
                                center={
                                  <div className="flex flex-col justify-center gap-0.5 leading-tight">
                                    <Heading as="h3" size="h5">
                                      Screen & Mic Capture
                                    </Heading>
                                    <Text variant="small">60 fps · Studio voice isolation</Text>
                                  </div>
                                }
                                bottom={
                                  <>
                                    <Progress
                                      size="sm"
                                      radius="full"
                                      color="danger"
                                      isStriped={isRecording}
                                      value={isRecording ? 78 : 22}
                                      label={
                                        isRecording ? "Input gain · -6 dB active" : "Capture paused"
                                      }
                                      showValueLabel
                                    />

                                    <Divider variant="solid" />

                                    <div className="flex items-center justify-between gap-2">
                                      <Button
                                        size="sm"
                                        variant="outline"
                                        radius="full"
                                        onClick={() => setIsRecording((prev) => !prev)}
                                      >
                                        {isRecording ? "Pause" : "Resume"}
                                      </Button>

                                      <div className="flex items-center gap-2">
                                        <Button
                                          size="sm"
                                          variant="solid"
                                          color="danger"
                                          radius="full"
                                          onClick={() => {
                                            setIsRecording(false);
                                            setRecordSec(0);
                                          }}
                                        >
                                          <Square className="h-3.5 w-3.5" />
                                          Stop Capture
                                        </Button>

                                        <Button
                                          isIconOnly
                                          size="md"
                                          variant="ghost"
                                          radius="full"
                                          aria-label="Collapse recording view"
                                          onClick={() => setPresentation("compact")}
                                        >
                                          <Minimize2 className="h-4 w-4" />
                                        </Button>
                                      </div>
                                    </div>
                                  </>
                                }
                              />
                            </motion.div>
                          </LiquidGlassBody>
                        </LiquidGlass>
                      </motion.div>
                    )}

                    {/* 4. LIVE SPORTS SCOREBOARD LIVE ACTIVITY */}
                    {activeMode === "sport" && isCompact && (
                      <motion.div
                        key="sport-compact"
                        layoutId={`${instanceId}-shell`}
                        transition={ISLAND_MORPH_SPRING}
                        style={{ willChange: "transform" }}
                        className="w-[304px] sm:w-[328px]"
                      >
                        <LiquidGlass
                          {...sharedGlassProps}
                          radius="capsule"
                          isPressable
                          aria-label="Expand Match Scoreboard Live Activity"
                          onClick={() => setPresentation("expanded")}
                        >
                          <LiquidGlassBody padding="compactPill">
                            <motion.div
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={CONTENT_TRANSITION}
                              className="w-full"
                            >
                              <LiquidGlassIslandCompact
                                leading={
                                  <div className="flex items-center gap-2">
                                    <Avatar size="sm" name="ARS" color="danger" radius="full" />
                                    <Text
                                      as="span"
                                      variant="strong"
                                      tabularNums
                                      className="text-sm leading-none"
                                    >
                                      {arsScore}
                                    </Text>
                                  </div>
                                }
                                trailing={
                                  <div className="flex items-center gap-2">
                                    <Text
                                      as="span"
                                      variant="strong"
                                      tabularNums
                                      className="text-sm leading-none"
                                    >
                                      {mciScore}
                                    </Text>
                                    <Avatar size="sm" name="MCI" color="primary" radius="full" />
                                  </div>
                                }
                              />
                            </motion.div>
                          </LiquidGlassBody>
                        </LiquidGlass>
                      </motion.div>
                    )}

                    {activeMode === "sport" && isExpanded && (
                      <motion.div
                        key="sport-expanded"
                        layoutId={`${instanceId}-shell`}
                        transition={ISLAND_MORPH_SPRING}
                        style={{ willChange: "transform" }}
                        className="w-full"
                      >
                        <LiquidGlass {...sharedGlassProps} radius="island">
                          <LiquidGlassBody padding="island">
                            <motion.div
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={CONTENT_TRANSITION}
                              className="w-full"
                            >
                              <LiquidGlassIslandExpanded
                                leading={
                                  <div className="flex items-center gap-2">
                                    <Avatar size="sm" name="ARS" color="danger" radius="full" />
                                    <Text
                                      as="span"
                                      variant="strong"
                                      className="text-sm leading-none"
                                    >
                                      ARS
                                    </Text>
                                  </div>
                                }
                                trailing={
                                  <div className="flex items-center gap-2">
                                    <Text
                                      as="span"
                                      variant="strong"
                                      className="text-sm leading-none"
                                    >
                                      MCI
                                    </Text>
                                    <Avatar size="sm" name="MCI" color="primary" radius="full" />
                                  </div>
                                }
                                center={
                                  <div className="flex items-center justify-between gap-4">
                                    <div className="flex flex-col justify-center gap-0.5 leading-tight">
                                      <Text variant="strong" className="leading-none">
                                        Arsenal vs Man City
                                      </Text>
                                      <Text variant="small">
                                        Emirates Stadium · {matchMinute}&apos;
                                      </Text>
                                    </div>
                                    <Heading as="h4" size="h2" tracking="tight" tabularNums>
                                      {arsScore} - {mciScore}
                                    </Heading>
                                  </div>
                                }
                                bottom={
                                  <>
                                    <Progress
                                      size="sm"
                                      radius="full"
                                      color="danger"
                                      value={56}
                                      label="Possession · ARS 56% / MCI 44%"
                                    />

                                    <Divider variant="solid" />

                                    <div className="flex items-center justify-between gap-2">
                                      <div className="flex items-center gap-2">
                                        <Button
                                          size="sm"
                                          variant="flat"
                                          color="danger"
                                          radius="full"
                                          onClick={() => {
                                            setArsScore((prev) => prev + 1);
                                            setMatchMinute((prev) => Math.min(90, prev + 2));
                                          }}
                                        >
                                          +1 ARS Goal
                                        </Button>
                                        <Button
                                          size="sm"
                                          variant="flat"
                                          color="primary"
                                          radius="full"
                                          onClick={() => {
                                            setMciScore((prev) => prev + 1);
                                            setMatchMinute((prev) => Math.min(90, prev + 2));
                                          }}
                                        >
                                          +1 MCI Goal
                                        </Button>
                                      </div>

                                      <Button
                                        isIconOnly
                                        size="md"
                                        variant="ghost"
                                        radius="full"
                                        aria-label="Collapse scoreboard"
                                        onClick={() => setPresentation("compact")}
                                      >
                                        <Minimize2 className="h-4 w-4" />
                                      </Button>
                                    </div>
                                  </>
                                }
                              />
                            </motion.div>
                          </LiquidGlassBody>
                        </LiquidGlass>
                      </motion.div>
                    )}

                    {/* 5. INCOMING & ACTIVE CALL LIVE ACTIVITY */}
                    {activeMode === "call" && isCompact && (
                      <motion.div
                        key="call-compact"
                        layoutId={`${instanceId}-shell`}
                        transition={ISLAND_MORPH_SPRING}
                        style={{ willChange: "transform" }}
                        className="w-[300px] sm:w-[324px]"
                      >
                        <LiquidGlass
                          {...sharedGlassProps}
                          radius="capsule"
                          isPressable
                          aria-label="Expand Call Live Activity"
                          onClick={() => setPresentation("expanded")}
                        >
                          <LiquidGlassBody padding="compactPill">
                            <motion.div
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={CONTENT_TRANSITION}
                              className="w-full"
                            >
                              <LiquidGlassIslandCompact
                                leading={
                                  <motion.div
                                    layoutId={`${instanceId}-call-av`}
                                    className="flex shrink-0 items-center justify-center leading-none"
                                  >
                                    <Avatar
                                      src={CALLER_AVATAR}
                                      alt="Tania Castillo"
                                      size="sm"
                                      radius="full"
                                    />
                                  </motion.div>
                                }
                                trailing={
                                  <Badge variant="soft" color="success" size="sm">
                                    {callState === "active" ? formatClock(callSec) : "Ring"}
                                  </Badge>
                                }
                              />
                            </motion.div>
                          </LiquidGlassBody>
                        </LiquidGlass>
                      </motion.div>
                    )}

                    {activeMode === "call" && isExpanded && (
                      <motion.div
                        key="call-expanded"
                        layoutId={`${instanceId}-shell`}
                        transition={ISLAND_MORPH_SPRING}
                        style={{ willChange: "transform" }}
                        className="w-full"
                      >
                        <LiquidGlass {...sharedGlassProps} radius="island">
                          <LiquidGlassBody padding="island">
                            <motion.div
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={CONTENT_TRANSITION}
                              className="w-full"
                            >
                              <LiquidGlassIslandExpanded
                                leading={
                                  <motion.div
                                    layoutId={`${instanceId}-call-av`}
                                    className="flex shrink-0 items-center justify-center leading-none"
                                  >
                                    <Avatar
                                      src={CALLER_AVATAR}
                                      alt="Tania Castillo"
                                      size="lg"
                                      radius="full"
                                    />
                                  </motion.div>
                                }
                                trailing={
                                  <Badge variant="soft" color="success" size="md">
                                    {callState === "active" ? formatClock(callSec) : "Incoming"}
                                  </Badge>
                                }
                                center={
                                  <div className="flex flex-col justify-center gap-0.5 leading-tight">
                                    <Heading as="h3" size="h5">
                                      Tania Castillo
                                    </Heading>
                                    <Text variant="small" tabularNums>
                                      {callState === "active"
                                        ? `iPhone Audio · Connected ${formatClock(callSec)}`
                                        : "Mobile · Spatial Voice HD"}
                                    </Text>
                                  </div>
                                }
                                bottom={
                                  <>
                                    <Divider variant="solid" />
                                    <div className="flex items-center justify-between gap-3">
                                      <Button
                                        isIconOnly
                                        size="md"
                                        variant={isMuted ? "solid" : "flat"}
                                        color={isMuted ? "warning" : "zinc"}
                                        radius="full"
                                        aria-label="Toggle microphone mute"
                                        onClick={() => setIsMuted((prev) => !prev)}
                                      >
                                        <MicOff className="h-4 w-4" />
                                      </Button>

                                      <div className="flex items-center gap-2.5">
                                        {callState === "incoming" && (
                                          <Button
                                            isIconOnly
                                            size="md"
                                            variant="solid"
                                            color="success"
                                            radius="full"
                                            aria-label="Accept call"
                                            onClick={() => {
                                              setCallState("active");
                                              setCallSec(1);
                                            }}
                                          >
                                            <Phone className="h-4 w-4" />
                                          </Button>
                                        )}

                                        <Button
                                          isIconOnly
                                          size="md"
                                          variant="solid"
                                          color="danger"
                                          radius="full"
                                          aria-label="End call"
                                          onClick={() => {
                                            setCallState("incoming");
                                            setCallSec(0);
                                            setPresentation("compact");
                                          }}
                                        >
                                          <PhoneOff className="h-4 w-4" />
                                        </Button>

                                        <Button
                                          isIconOnly
                                          size="md"
                                          variant="ghost"
                                          radius="full"
                                          aria-label="Collapse call controls"
                                          onClick={() => setPresentation("compact")}
                                        >
                                          <Minimize2 className="h-4 w-4" />
                                        </Button>
                                      </div>
                                    </div>
                                  </>
                                }
                              />
                            </motion.div>
                          </LiquidGlassBody>
                        </LiquidGlass>
                      </motion.div>
                    )}

                    {/* 6. COUNTDOWN TIMER LIVE ACTIVITY */}
                    {activeMode === "timer" && isCompact && (
                      <motion.div
                        key="timer-compact"
                        layoutId={`${instanceId}-shell`}
                        transition={ISLAND_MORPH_SPRING}
                        style={{ willChange: "transform" }}
                        className="w-[292px] sm:w-[316px]"
                      >
                        <LiquidGlass
                          {...sharedGlassProps}
                          radius="capsule"
                          isPressable
                          aria-label="Expand Timer Live Activity"
                          onClick={() => setPresentation("expanded")}
                        >
                          <LiquidGlassBody padding="compactPill">
                            <motion.div
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={CONTENT_TRANSITION}
                              className="w-full"
                            >
                              <LiquidGlassIslandCompact
                                leading={
                                  <CircularProgress
                                    size="sm"
                                    color="warning"
                                    value={timerProgress}
                                  />
                                }
                                trailing={<Code>{formatClock(timerSec)}</Code>}
                              />
                            </motion.div>
                          </LiquidGlassBody>
                        </LiquidGlass>
                      </motion.div>
                    )}

                    {activeMode === "timer" && isExpanded && (
                      <motion.div
                        key="timer-expanded"
                        layoutId={`${instanceId}-shell`}
                        transition={ISLAND_MORPH_SPRING}
                        style={{ willChange: "transform" }}
                        className="w-full"
                      >
                        <LiquidGlass {...sharedGlassProps} radius="island">
                          <LiquidGlassBody padding="island">
                            <motion.div
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={CONTENT_TRANSITION}
                              className="w-full"
                            >
                              <LiquidGlassIslandExpanded
                                leading={
                                  <Badge variant="soft" color="warning" size="md">
                                    Timer
                                  </Badge>
                                }
                                trailing={
                                  <CircularProgress
                                    size="md"
                                    color="warning"
                                    value={timerProgress}
                                    showValueLabel
                                  />
                                }
                                center={
                                  <div className="flex items-baseline justify-between gap-3">
                                    <Text variant="small">Studio Focus Interval</Text>
                                    <Heading as="h3" size="h1" tracking="tight" tabularNums>
                                      {formatClock(timerSec)}
                                    </Heading>
                                  </div>
                                }
                                bottom={
                                  <>
                                    <Divider variant="solid" />
                                    <div className="flex items-center justify-between gap-2">
                                      <div className="flex items-center gap-2">
                                        <Button
                                          isIconOnly
                                          size="md"
                                          variant="flat"
                                          color="warning"
                                          radius="full"
                                          aria-label={timerRunning ? "Pause timer" : "Start timer"}
                                          onClick={() => setTimerRunning((prev) => !prev)}
                                        >
                                          {timerRunning ? (
                                            <Pause className="h-4 w-4" />
                                          ) : (
                                            <Play className="h-4 w-4 translate-x-[1px]" />
                                          )}
                                        </Button>

                                        <Button
                                          isIconOnly
                                          size="md"
                                          variant="outline"
                                          radius="full"
                                          aria-label="Reset timer"
                                          onClick={() => {
                                            setTimerSec(timerTotalSec);
                                            setTimerRunning(true);
                                          }}
                                        >
                                          <RotateCcw className="h-4 w-4" />
                                        </Button>
                                      </div>

                                      <Button
                                        isIconOnly
                                        size="md"
                                        variant="ghost"
                                        radius="full"
                                        aria-label="Collapse timer"
                                        onClick={() => setPresentation("compact")}
                                      >
                                        <Minimize2 className="h-4 w-4" />
                                      </Button>
                                    </div>
                                  </>
                                }
                              />
                            </motion.div>
                          </LiquidGlassBody>
                        </LiquidGlass>
                      </motion.div>
                    )}

                    {/* 7. TURN-BY-TURN NAVIGATION LIVE ACTIVITY */}
                    {activeMode === "navigation" && isCompact && (
                      <motion.div
                        key="nav-compact"
                        layoutId={`${instanceId}-shell`}
                        transition={ISLAND_MORPH_SPRING}
                        style={{ willChange: "transform" }}
                        className="w-[304px] sm:w-[328px]"
                      >
                        <LiquidGlass
                          {...sharedGlassProps}
                          radius="capsule"
                          isPressable
                          aria-label="Expand Navigation Live Activity"
                          onClick={() => setPresentation("expanded")}
                        >
                          <LiquidGlassBody padding="compactPill">
                            <motion.div
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={CONTENT_TRANSITION}
                              className="w-full"
                            >
                              <LiquidGlassIslandCompact
                                leading={
                                  <div className="flex items-center gap-1.5 pl-1">
                                    <CornerUpRight className="h-4 w-4 shrink-0" />
                                    <Text
                                      as="span"
                                      variant="strong"
                                      tabularNums
                                      className="text-sm leading-none"
                                    >
                                      {currentNav.distance}
                                    </Text>
                                  </div>
                                }
                                trailing={
                                  <Badge variant="soft" color="info" size="sm">
                                    {currentNav.shortStreet}
                                  </Badge>
                                }
                              />
                            </motion.div>
                          </LiquidGlassBody>
                        </LiquidGlass>
                      </motion.div>
                    )}

                    {activeMode === "navigation" && isExpanded && (
                      <motion.div
                        key="nav-expanded"
                        layoutId={`${instanceId}-shell`}
                        transition={ISLAND_MORPH_SPRING}
                        style={{ willChange: "transform" }}
                        className="w-full"
                      >
                        <LiquidGlass {...sharedGlassProps} radius="island">
                          <LiquidGlassBody padding="island">
                            <motion.div
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={CONTENT_TRANSITION}
                              className="w-full"
                            >
                              <LiquidGlassIslandExpanded
                                leading={
                                  <IconBox
                                    size="sm"
                                    variant="brand"
                                    showGlow={false}
                                    icon={CornerUpRight}
                                  />
                                }
                                trailing={
                                  <Badge variant="soft" color="info" size="md">
                                    ETA 4 min
                                  </Badge>
                                }
                                center={
                                  <div className="flex flex-col justify-center gap-0.5 leading-tight">
                                    <Heading as="h3" size="h4" tabularNums>
                                      {currentNav.distance}
                                    </Heading>
                                    <Text variant="small">{currentNav.street}</Text>
                                  </div>
                                }
                                bottom={
                                  <>
                                    <Progress
                                      size="sm"
                                      radius="full"
                                      color="primary"
                                      value={currentNav.progress}
                                      label="Route progress"
                                      showValueLabel
                                    />

                                    <Divider variant="solid" />

                                    <div className="flex items-center justify-between gap-2">
                                      <Button
                                        size="sm"
                                        variant="flat"
                                        color="primary"
                                        radius="full"
                                        onClick={() =>
                                          setNavStepIdx((prev) => (prev + 1) % NAV_STEPS.length)
                                        }
                                      >
                                        Next Turn
                                      </Button>

                                      <Button
                                        isIconOnly
                                        size="md"
                                        variant="ghost"
                                        radius="full"
                                        aria-label="Collapse navigation"
                                        onClick={() => setPresentation("compact")}
                                      >
                                        <Minimize2 className="h-4 w-4" />
                                      </Button>
                                    </div>
                                  </>
                                }
                              />
                            </motion.div>
                          </LiquidGlassBody>
                        </LiquidGlass>
                      </motion.div>
                    )}

                    {/* 8. AIRDROP PHOTO TRANSFER LIVE ACTIVITY */}
                    {activeMode === "airdrop" && isCompact && (
                      <motion.div
                        key="airdrop-compact"
                        layoutId={`${instanceId}-shell`}
                        transition={ISLAND_MORPH_SPRING}
                        style={{ willChange: "transform" }}
                        className="w-[296px] sm:w-[320px]"
                      >
                        <LiquidGlass
                          {...sharedGlassProps}
                          radius="capsule"
                          isPressable
                          aria-label="Expand AirDrop Live Activity"
                          onClick={() => setPresentation("expanded")}
                        >
                          <LiquidGlassBody padding="compactPill">
                            <motion.div
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={CONTENT_TRANSITION}
                              className="w-full"
                            >
                              <LiquidGlassIslandCompact
                                leading={
                                  <motion.div
                                    layoutId={`${instanceId}-air-av`}
                                    className="flex shrink-0 items-center justify-center leading-none"
                                  >
                                    <Avatar
                                      src={AIRDROP_AVATAR}
                                      alt="Jae Woo"
                                      size="sm"
                                      radius="full"
                                    />
                                  </motion.div>
                                }
                                trailing={
                                  <Badge
                                    variant="soft"
                                    color={airdropProgress >= 100 ? "success" : "primary"}
                                    size="sm"
                                  >
                                    {airdropProgress}%
                                  </Badge>
                                }
                              />
                            </motion.div>
                          </LiquidGlassBody>
                        </LiquidGlass>
                      </motion.div>
                    )}

                    {activeMode === "airdrop" && isExpanded && (
                      <motion.div
                        key="airdrop-expanded"
                        layoutId={`${instanceId}-shell`}
                        transition={ISLAND_MORPH_SPRING}
                        style={{ willChange: "transform" }}
                        className="w-full"
                      >
                        <LiquidGlass {...sharedGlassProps} radius="island">
                          <LiquidGlassBody padding="island">
                            <motion.div
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={CONTENT_TRANSITION}
                              className="w-full"
                            >
                              <LiquidGlassIslandExpanded
                                leading={
                                  <motion.div
                                    layoutId={`${instanceId}-air-av`}
                                    className="flex shrink-0 items-center justify-center leading-none"
                                  >
                                    <Avatar
                                      src={AIRDROP_AVATAR}
                                      alt="Jae Woo"
                                      size="lg"
                                      radius="full"
                                    />
                                  </motion.div>
                                }
                                trailing={
                                  <CircularProgress
                                    size="md"
                                    color={airdropProgress >= 100 ? "success" : "primary"}
                                    value={airdropProgress}
                                    showValueLabel
                                  />
                                }
                                center={
                                  <div className="flex flex-col justify-center gap-0.5 leading-tight">
                                    <Heading as="h3" size="h5">
                                      AirDrop · 1 RAW Photo
                                    </Heading>
                                    <Text variant="small">From Jae Woo · Wi-Fi Direct</Text>
                                  </div>
                                }
                                bottom={
                                  <>
                                    <Divider variant="solid" />
                                    <div className="flex items-center justify-between gap-2">
                                      <Button
                                        size="sm"
                                        variant="flat"
                                        color={airdropProgress >= 100 ? "success" : "primary"}
                                        radius="full"
                                        onClick={() =>
                                          setAirdropProgress((prev) =>
                                            prev >= 100 ? 35 : Math.min(100, prev + 25)
                                          )
                                        }
                                      >
                                        {airdropProgress >= 100 ? "Saved · Replay" : "Step +25%"}
                                      </Button>

                                      <Button
                                        isIconOnly
                                        size="md"
                                        variant="ghost"
                                        radius="full"
                                        aria-label="Collapse AirDrop"
                                        onClick={() => setPresentation("compact")}
                                      >
                                        <Minimize2 className="h-4 w-4" />
                                      </Button>
                                    </div>
                                  </>
                                }
                              />
                            </motion.div>
                          </LiquidGlassBody>
                        </LiquidGlass>
                      </motion.div>
                    )}

                    {/* 9. FLIGHT BOARDING & CORRIDOR LIVE ACTIVITY */}
                    {activeMode === "flight" && isCompact && (
                      <motion.div
                        key="flight-compact"
                        layoutId={`${instanceId}-shell`}
                        transition={ISLAND_MORPH_SPRING}
                        style={{ willChange: "transform" }}
                        className="w-[304px] sm:w-[328px]"
                      >
                        <LiquidGlass
                          {...sharedGlassProps}
                          radius="capsule"
                          isPressable
                          aria-label="Expand Flight Live Activity"
                          onClick={() => setPresentation("expanded")}
                        >
                          <LiquidGlassBody padding="compactPill">
                            <motion.div
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={CONTENT_TRANSITION}
                              className="w-full"
                            >
                              <LiquidGlassIslandCompact
                                leading={
                                  <div className="flex items-center gap-1.5 pl-1">
                                    <Plane className="h-4 w-4 shrink-0" />
                                    <Text
                                      as="span"
                                      variant="strong"
                                      className="text-sm leading-none"
                                    >
                                      SFO
                                    </Text>
                                  </div>
                                }
                                trailing={
                                  <motion.div
                                    layoutId={`${instanceId}-fl-badge`}
                                    className="flex shrink-0 items-center justify-center leading-none"
                                  >
                                    <Badge
                                      variant="soft"
                                      color={currentFlight.badgeColor}
                                      size="sm"
                                    >
                                      {currentFlight.badge}
                                    </Badge>
                                  </motion.div>
                                }
                              />
                            </motion.div>
                          </LiquidGlassBody>
                        </LiquidGlass>
                      </motion.div>
                    )}

                    {activeMode === "flight" && isExpanded && (
                      <motion.div
                        key="flight-expanded"
                        layoutId={`${instanceId}-shell`}
                        transition={ISLAND_MORPH_SPRING}
                        style={{ willChange: "transform" }}
                        className="w-full"
                      >
                        <LiquidGlass {...sharedGlassProps} radius="island">
                          <LiquidGlassBody padding="island">
                            <motion.div
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={CONTENT_TRANSITION}
                              className="w-full"
                            >
                              <LiquidGlassIslandExpanded
                                leading={
                                  <div className="flex items-center gap-2">
                                    <IconBox
                                      size="sm"
                                      variant="brand"
                                      showGlow={false}
                                      icon={Plane}
                                    />
                                    <Text
                                      as="span"
                                      variant="strong"
                                      className="text-sm leading-none"
                                    >
                                      NH107
                                    </Text>
                                  </div>
                                }
                                trailing={
                                  <motion.div
                                    layoutId={`${instanceId}-fl-badge`}
                                    className="flex shrink-0 items-center justify-center leading-none"
                                  >
                                    <Badge
                                      variant="soft"
                                      color={currentFlight.badgeColor}
                                      size="md"
                                    >
                                      {currentFlight.expandedBadge}
                                    </Badge>
                                  </motion.div>
                                }
                                center={
                                  <div className="flex items-center justify-between gap-4">
                                    <div className="flex flex-col justify-center gap-0.5 leading-tight">
                                      <Heading as="h4" size="h3" tracking="tight">
                                        SFO
                                      </Heading>
                                      <Text variant="small" tabularNums className="leading-none">
                                        11:45 AM
                                      </Text>
                                    </div>

                                    <Code>SFO → HND</Code>

                                    <div className="flex flex-col justify-center gap-0.5 text-right leading-tight">
                                      <Heading as="h4" size="h3" tracking="tight">
                                        HND
                                      </Heading>
                                      <Text variant="small" tabularNums className="leading-none">
                                        03:05 PM +1
                                      </Text>
                                    </div>
                                  </div>
                                }
                                bottom={
                                  <>
                                    <Progress
                                      size="sm"
                                      radius="full"
                                      color="primary"
                                      value={currentFlight.progress}
                                      label={currentFlight.corridorLabel}
                                      showValueLabel
                                    />

                                    <Divider variant="solid" />

                                    <div className="flex items-center justify-between gap-2">
                                      <Code>Seat 4A · Group 1</Code>

                                      <div className="flex items-center gap-2">
                                        <Button
                                          size="sm"
                                          variant="flat"
                                          color="primary"
                                          radius="full"
                                          onClick={() =>
                                            setFlightPhaseIdx(
                                              (prev) => (prev + 1) % FLIGHT_PHASES.length
                                            )
                                          }
                                        >
                                          Next Flight Phase
                                        </Button>

                                        <Button
                                          isIconOnly
                                          size="md"
                                          variant="ghost"
                                          radius="full"
                                          aria-label="Collapse flight tracker"
                                          onClick={() => setPresentation("compact")}
                                        >
                                          <Minimize2 className="h-4 w-4" />
                                        </Button>
                                      </div>
                                    </div>
                                  </>
                                }
                              />
                            </motion.div>
                          </LiquidGlassBody>
                        </LiquidGlass>
                      </motion.div>
                    )}

                    {/* 10. LIVE RIDE & PICKUP TRACKER LIVE ACTIVITY */}
                    {activeMode === "delivery" && isCompact && (
                      <motion.div
                        key="delivery-compact"
                        layoutId={`${instanceId}-shell`}
                        transition={ISLAND_MORPH_SPRING}
                        style={{ willChange: "transform" }}
                        className="w-[300px] sm:w-[324px]"
                      >
                        <LiquidGlass
                          {...sharedGlassProps}
                          radius="capsule"
                          isPressable
                          aria-label="Expand Ride Tracker Live Activity"
                          onClick={() => setPresentation("expanded")}
                        >
                          <LiquidGlassBody padding="compactPill">
                            <motion.div
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={CONTENT_TRANSITION}
                              className="w-full"
                            >
                              <LiquidGlassIslandCompact
                                leading={
                                  <motion.div
                                    layoutId={`${instanceId}-dlv-av`}
                                    className="flex shrink-0 items-center justify-center leading-none"
                                  >
                                    <Avatar
                                      src={COURIER_AVATAR}
                                      alt="Pickup vehicle"
                                      size="sm"
                                      radius="full"
                                    />
                                  </motion.div>
                                }
                                trailing={
                                  <Badge
                                    variant="soft"
                                    color={currentDelivery.badgeColor}
                                    size="sm"
                                  >
                                    {currentDelivery.etaCompact}
                                  </Badge>
                                }
                              />
                            </motion.div>
                          </LiquidGlassBody>
                        </LiquidGlass>
                      </motion.div>
                    )}

                    {activeMode === "delivery" && isExpanded && (
                      <motion.div
                        key="delivery-expanded"
                        layoutId={`${instanceId}-shell`}
                        transition={ISLAND_MORPH_SPRING}
                        style={{ willChange: "transform" }}
                        className="w-full"
                      >
                        <LiquidGlass {...sharedGlassProps} radius="island">
                          <LiquidGlassBody padding="island">
                            <motion.div
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={CONTENT_TRANSITION}
                              className="w-full"
                            >
                              <LiquidGlassIslandExpanded
                                leading={
                                  <motion.div
                                    layoutId={`${instanceId}-dlv-av`}
                                    className="flex shrink-0 items-center justify-center leading-none"
                                  >
                                    <Avatar
                                      src={COURIER_AVATAR}
                                      alt="Pickup vehicle"
                                      size="md"
                                      radius="full"
                                    />
                                  </motion.div>
                                }
                                trailing={<Code>8HUD492</Code>}
                                center={
                                  <div className="flex flex-col justify-center gap-0.5 leading-tight">
                                    <Heading as="h3" size="h5">
                                      Rivian R1S · Silver
                                    </Heading>
                                    <Text variant="small">{currentDelivery.status}</Text>
                                  </div>
                                }
                                bottom={
                                  <>
                                    <Progress
                                      size="sm"
                                      radius="full"
                                      color="success"
                                      value={currentDelivery.progress}
                                      label={currentDelivery.etaLabel}
                                      showValueLabel
                                    />

                                    <Divider variant="solid" />

                                    <div className="flex items-center justify-between gap-2">
                                      <Badge
                                        variant="soft"
                                        color={currentDelivery.badgeColor}
                                        size="md"
                                      >
                                        {currentDelivery.badge}
                                      </Badge>

                                      <div className="flex items-center gap-2">
                                        <Button
                                          size="sm"
                                          variant="flat"
                                          color="primary"
                                          radius="full"
                                          onClick={() =>
                                            setDeliveryStageIdx(
                                              (prev) => (prev + 1) % DELIVERY_STAGES.length
                                            )
                                          }
                                        >
                                          Advance Pickup
                                        </Button>

                                        <Button
                                          isIconOnly
                                          size="md"
                                          variant="ghost"
                                          radius="full"
                                          aria-label="Collapse pickup tracker"
                                          onClick={() => setPresentation("compact")}
                                        >
                                          <Minimize2 className="h-4 w-4" />
                                        </Button>
                                      </div>
                                    </div>
                                  </>
                                }
                              />
                            </motion.div>
                          </LiquidGlassBody>
                        </LiquidGlass>
                      </motion.div>
                    )}

                    {/* 11. AIRPODS PRO & SPATIAL AUDIO LIVE ACTIVITY */}
                    {activeMode === "airpods" && isCompact && (
                      <motion.div
                        key="airpods-compact"
                        layoutId={`${instanceId}-shell`}
                        transition={ISLAND_MORPH_SPRING}
                        style={{ willChange: "transform" }}
                        className="w-[296px] sm:w-[320px]"
                      >
                        <LiquidGlass
                          {...sharedGlassProps}
                          radius="capsule"
                          isPressable
                          aria-label="Expand AirPods Pro Live Activity"
                          onClick={() => setPresentation("expanded")}
                        >
                          <LiquidGlassBody padding="compactPill">
                            <motion.div
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={CONTENT_TRANSITION}
                              className="w-full"
                            >
                              <LiquidGlassIslandCompact
                                leading={
                                  <div className="flex items-center gap-2 pl-1">
                                    <Headphones className="h-4 w-4 shrink-0" />
                                    <Text
                                      as="span"
                                      variant="strong"
                                      className="text-xs leading-none"
                                    >
                                      Pro
                                    </Text>
                                  </div>
                                }
                                trailing={
                                  <div className="flex items-center gap-1.5">
                                    <motion.div
                                      layoutId={`${instanceId}-pods-ring`}
                                      className="flex shrink-0 items-center justify-center leading-none"
                                    >
                                      <CircularProgress
                                        size="sm"
                                        color="success"
                                        value={budsBattery}
                                      />
                                    </motion.div>
                                    <Code>{budsBattery}%</Code>
                                  </div>
                                }
                              />
                            </motion.div>
                          </LiquidGlassBody>
                        </LiquidGlass>
                      </motion.div>
                    )}

                    {activeMode === "airpods" && isExpanded && (
                      <motion.div
                        key="airpods-expanded"
                        layoutId={`${instanceId}-shell`}
                        transition={ISLAND_MORPH_SPRING}
                        style={{ willChange: "transform" }}
                        className="w-full"
                      >
                        <LiquidGlass {...sharedGlassProps} radius="island">
                          <LiquidGlassBody padding="island">
                            <motion.div
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={CONTENT_TRANSITION}
                              className="w-full"
                            >
                              <LiquidGlassIslandExpanded
                                leading={
                                  <IconBox
                                    size="sm"
                                    variant="glass"
                                    showGlow={false}
                                    icon={Headphones}
                                  />
                                }
                                trailing={
                                  <div className="flex items-center gap-2">
                                    <motion.div
                                      layoutId={`${instanceId}-pods-ring`}
                                      className="flex shrink-0 items-center justify-center leading-none"
                                    >
                                      <CircularProgress
                                        size="sm"
                                        color="success"
                                        value={budsBattery}
                                      />
                                    </motion.div>
                                    <Code>{budsBattery}%</Code>
                                  </div>
                                }
                                center={
                                  <div className="flex items-center justify-between gap-3">
                                    <div className="flex flex-col justify-center gap-0.5 leading-tight">
                                      <Heading as="h3" size="h5">
                                        AirPods Pro · USB-C
                                      </Heading>
                                      <Text variant="small">
                                        Spatial Audio ·{" "}
                                        {spatialTracked ? "Head Tracked" : "Fixed Stage"}
                                      </Text>
                                    </div>
                                    <Badge variant="soft" color="success" size="sm">
                                      {ANC_LABELS[ancMode]}
                                    </Badge>
                                  </div>
                                }
                                bottom={
                                  <>
                                    <Tabs
                                      variant="solid"
                                      size="sm"
                                      radius="lg"
                                      fullWidth
                                      selectedKey={ancMode}
                                      onSelectionChange={(k) => setAncMode(k as AncControlMode)}
                                    >
                                      <Tab tabKey="anc" title="Noise Cancel" />
                                      <Tab tabKey="adaptive" title="Adaptive" />
                                      <Tab tabKey="transparency" title="Transparency" />
                                    </Tabs>

                                    <Divider variant="solid" />

                                    <div className="flex items-center justify-between gap-2">
                                      <Badge variant="soft" color="zinc" size="md">
                                        Case 88%
                                      </Badge>

                                      <div className="flex items-center gap-2">
                                        <Button
                                          size="sm"
                                          variant={spatialTracked ? "solid" : "flat"}
                                          color="primary"
                                          radius="full"
                                          onClick={() => setSpatialTracked((prev) => !prev)}
                                        >
                                          {spatialTracked ? "Head Tracked" : "Fixed Spatial"}
                                        </Button>

                                        <Button
                                          isIconOnly
                                          size="md"
                                          variant="ghost"
                                          radius="full"
                                          aria-label="Collapse AirPods controls"
                                          onClick={() => setPresentation("compact")}
                                        >
                                          <Minimize2 className="h-4 w-4" />
                                        </Button>
                                      </div>
                                    </div>
                                  </>
                                }
                              />
                            </motion.div>
                          </LiquidGlassBody>
                        </LiquidGlass>
                      </motion.div>
                    )}
                  </div>

                  <LiquidGlass
                    mode={activeSurfaceMode}
                    blur="md"
                    intensity={76}
                    specular="subtle"
                    radius="capsule"
                  >
                    <LiquidGlassBody padding="capsule">
                      <Text variant="small" align="center" className="px-2.5 leading-snug">
                        {isExpanded
                          ? "Expanded Presentation (leading, trailing, center, bottom). Switch to Compact or Minimal above."
                          : isMinimal
                            ? "Minimal Presentation: primary activity attached to sensor + detached 44pt concurrent Live Activity bubble."
                            : "Compact Presentation: compactLeading and compactTrailing flank the TrueDepth sensor. Tap to expand."}
                      </Text>
                    </LiquidGlassBody>
                  </LiquidGlass>
                </div>
              </LayoutGroup>
            </LiquidGlassStage>
          </DoubleBezelCard>
        </Container>
      </Container>
    </Section>
  );
};

MorphingIsland.displayName = "MorphingIsland";
