"use client";

import * as React from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  ArrowUpRight,
  CalendarCheck2,
  CalendarDays,
  Check,
  Clock,
  Copy,
  Download,
  ExternalLink,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  TrainFront,
} from "lucide-react";
import {
  Badge,
  Button,
  Calendar,
  Container,
  Heading,
  Input,
  Section,
  Select,
  SelectItem,
  Switch,
  Tab,
  Tabs,
  Text,
  Textarea,
} from "@hudbird/ui";
import { cn } from "../../utils/cn";
import { ABOUT_EASE_OUT, useSafeSectionReveal } from "../AboutUsSection/shared";
import {
  CONTACT_INQUIRY_TOPICS,
  CONTACT_TEAM_SIZES,
  CONTACT_TIMEZONES,
  DEFAULT_CONTACT_CHANNELS,
  DEFAULT_CONTACT_OFFICES,
  DEFAULT_CONTACT_SLOTS,
  downloadBookingIcs,
  getNextBusinessDate,
  type BookingIcsInput,
  type ContactChannel,
  type ContactOffice,
  type ContactTimeSlot,
} from "./data";
import "./contact-section.css";

export type ContactTabKey = "message" | "calendar";

export type ContactSectionBlockId = "contact-mail" | "contact-form-call" | "contact-locations";

export interface ContactInquiryPayload {
  name: string;
  email: string;
  company: string;
  topic: string;
  teamSize: string;
  message: string;
  requireNda: boolean;
  referenceId: string;
}

export interface ContactBookingPayload {
  name: string;
  email: string;
  date: Date;
  slotId: string;
  slotLabel: string;
  timezoneId: string;
  timezoneShortLabel: string;
  topic: string;
  referenceCode: string;
}

export interface ContactMailSectionProps {
  id?: string;
  brandName?: string;
  title?: string;
  description?: string;
  channels?: ContactChannel[];
  featuredOffice?: ContactOffice;
  className?: string;
}

export interface ContactFormCallSectionProps {
  id?: string;
  brandName?: string;
  heading?: string;
  subheading?: string;
  defaultTab?: ContactTabKey;
  slots?: ContactTimeSlot[];
  defaultOfficeLocation?: string;
  onSubmitInquiry?: (payload: ContactInquiryPayload) => void;
  onConfirmBooking?: (payload: ContactBookingPayload) => void;
  className?: string;
}

export interface ContactLocationMapSectionProps {
  id?: string;
  heading?: string;
  subheading?: string;
  offices?: ContactOffice[];
  className?: string;
}

export interface ContactPageSectionProps {
  id?: string;
  brandName?: string;
  title?: string;
  description?: string;
  formHeading?: string;
  formSubheading?: string;
  locationsHeading?: string;
  locationsSubheading?: string;
  defaultTab?: ContactTabKey;
  channels?: ContactChannel[];
  offices?: ContactOffice[];
  slots?: ContactTimeSlot[];
  visibleSections?: Partial<Record<ContactSectionBlockId, boolean>>;
  onSubmitInquiry?: (payload: ContactInquiryPayload) => void;
  onConfirmBooking?: (payload: ContactBookingPayload) => void;
  className?: string;
}

/**
 * Section 1: Contact Mail Section
 * Editorial title, studio response SLA, monochrome-to-color studio photography,
 * and direct routing email channels with one-click copy feedback.
 */
export function ContactMailSection({
  id = "contact-mail",
  brandName = "Hudbird UI",
  title = "Talk with the engineers building Hudbird UI.",
  description = "Scope an enterprise license, request a design-token architecture review, or book a working session directly with our core engineering team.",
  channels = DEFAULT_CONTACT_CHANNELS,
  featuredOffice = DEFAULT_CONTACT_OFFICES[0],
  className,
}: ContactMailSectionProps) {
  const prefersReducedMotion = Boolean(useReducedMotion());
  const rootRef = React.useRef<HTMLDivElement>(null);
  const isVisible = useSafeSectionReveal(rootRef);

  const revealInitial = (y: number, scale = 1) =>
    prefersReducedMotion ? false : { opacity: 0, y, scale };
  const revealTarget = isVisible ? { opacity: 1, y: 0, scale: 1 } : undefined;

  const [copiedId, setCopiedId] = React.useState<string | null>(null);

  const handleCopyEmail = async (channelId: string, email: string) => {
    try {
      if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(email);
      }
    } catch {
      // Clipboard API may be restricted in headless contexts
    }
    const key = `channel-${channelId}`;
    setCopiedId(key);
    window.setTimeout(() => {
      setCopiedId((current) => (current === key ? null : current));
    }, 2200);
  };

  return (
    <div ref={rootRef} data-landing-section="contact-mail" className="w-full">
      <Section
        id={id}
        spacing="none"
        className={cn(
          "hb-contact-section bg-background text-foreground pt-8 pb-12 sm:pt-12 sm:pb-16",
          className
        )}
      >
        <Container size="xl" gutter="lg">
          <div className="mx-auto w-full max-w-6xl">
            {/* Editorial Intro + Studio Photograph Split */}
            <div className="grid grid-cols-1 items-center gap-8 min-[960px]:grid-cols-12 min-[960px]:gap-12">
              <motion.div
                initial={revealInitial(14)}
                animate={revealTarget}
                transition={{ duration: 0.36, ease: ABOUT_EASE_OUT }}
                className="min-[960px]:col-span-7"
              >
                <div className="inline-flex items-center gap-2 text-xs font-medium text-zinc-600 dark:text-zinc-300">
                  <span className="h-2 w-2 rounded-full bg-emerald-500" aria-hidden="true" />
                  <span>{brandName} Studio · Replies under 2 hours (WIB)</span>
                </div>

                <Heading
                  as="h1"
                  size="inherit"
                  data-hb-node="heading"
                  data-hb-edit="contact-mail:title"
                  className="text-foreground mt-3 text-[clamp(2rem,3.8vw,3.25rem)] leading-[1.08] font-semibold tracking-[-0.03em]"
                >
                  {title}
                </Heading>

                <Text
                  variant="muted"
                  data-hb-node="text"
                  data-hb-edit="contact-mail:description"
                  className="mt-4 max-w-2xl text-base leading-relaxed sm:text-lg"
                >
                  {description}
                </Text>
              </motion.div>

              {featuredOffice && (
                <motion.figure
                  initial={revealInitial(16, 0.99)}
                  animate={revealTarget}
                  transition={{ duration: 0.4, delay: 0.05, ease: ABOUT_EASE_OUT }}
                  className="min-[960px]:col-span-5"
                >
                  <div className="hb-contact-media-frame aspect-[16/10] w-full overflow-hidden rounded-2xl bg-zinc-100 dark:bg-zinc-900">
                    <img
                      src={featuredOffice.photoSrc}
                      alt={featuredOffice.photoAlt}
                      className="hb-contact-media-img h-full w-full object-cover"
                    />
                  </div>
                  <figcaption className="mt-2.5 flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400">
                    <span>
                      {featuredOffice.name} · {featuredOffice.city}
                    </span>
                    <span>{featuredOffice.hours}</span>
                  </figcaption>
                </motion.figure>
              )}
            </div>

            {/* 3-Column Direct Email Routing Cards */}
            <motion.div
              initial={revealInitial(16)}
              animate={revealTarget}
              transition={{ duration: 0.38, delay: 0.08, ease: ABOUT_EASE_OUT }}
              className="mt-10 grid grid-cols-1 gap-4 min-[860px]:grid-cols-3"
            >
              {channels.map((channel, channelIdx) => {
                const isCopied = copiedId === `channel-${channel.id}`;
                return (
                  <div
                    key={channel.id}
                    data-hb-node="card"
                    data-hb-item={channelIdx}
                    className="flex flex-col justify-between rounded-2xl border border-zinc-200/80 bg-zinc-50/60 p-5 sm:p-6 dark:border-white/10 dark:bg-[#141416]"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <p
                          data-hb-node="heading"
                          data-hb-item={channelIdx}
                          data-hb-edit={`contact-mail:channels.${channelIdx}.label`}
                          className="text-foreground text-sm leading-snug font-semibold"
                        >
                          {channel.label}
                        </p>
                        <Badge
                          variant="modern"
                          size="sm"
                          data-hb-node="badge"
                          data-hb-item={channelIdx}
                          data-hb-edit={`contact-mail:channels.${channelIdx}.sla`}
                          className="shrink-0"
                        >
                          <span data-hb-edit-text="">{channel.sla}</span>
                        </Badge>
                      </div>
                      <p
                        data-hb-node="text"
                        data-hb-item={channelIdx}
                        data-hb-edit={`contact-mail:channels.${channelIdx}.description`}
                        className="mt-2 text-xs leading-relaxed text-zinc-500 dark:text-zinc-400"
                      >
                        {channel.description}
                      </p>
                    </div>

                    <div className="mt-5 flex items-center justify-between gap-2 border-t border-zinc-200/70 pt-3.5 dark:border-white/[0.08]">
                      <a
                        href={`mailto:${channel.email}`}
                        data-hb-node="links"
                        data-hb-item={channelIdx}
                        data-hb-edit={`contact-mail:channels.${channelIdx}.email`}
                        className="text-foreground inline-flex min-h-11 min-w-0 items-center gap-1.5 text-xs font-medium underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 sm:text-[13px]"
                      >
                        <Mail className="h-3.5 w-3.5 shrink-0 text-zinc-500" aria-hidden="true" />
                        <span data-hb-edit-text="" className="truncate">
                          {channel.email}
                        </span>
                      </a>
                      <Button
                        type="button"
                        variant="plain"
                        size="sm"
                        aria-label={`Copy ${channel.email}`}
                        className="hb-contact-btn-tap min-h-11 shrink-0 gap-1.5 px-2.5 text-xs text-zinc-600 dark:text-zinc-300"
                        onClick={() => handleCopyEmail(channel.id, channel.email)}
                      >
                        {isCopied ? (
                          <>
                            <Check
                              className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400"
                              aria-hidden="true"
                            />
                            <span>Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="h-3.5 w-3.5" aria-hidden="true" />
                            <span>Copy</span>
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                );
              })}
            </motion.div>
          </div>
        </Container>
      </Section>
    </div>
  );
}

/**
 * Section 2: Form & Call Section
 * Dedicated interactive workspace with underline Tabs for smart inquiry routing
 * and 30-minute consultation scheduling with .ics calendar export.
 */
export function ContactFormCallSection({
  id = "contact-form-call",
  brandName = "Hudbird UI",
  heading = "Send a message or book a working session",
  subheading = "Share your repository context and timeline for a written engineering response, or reserve a 30-minute architecture call.",
  defaultTab = "message",
  slots = DEFAULT_CONTACT_SLOTS,
  defaultOfficeLocation = "Jakarta HQ (Online Meet + Studio)",
  onSubmitInquiry,
  onConfirmBooking,
  className,
}: ContactFormCallSectionProps) {
  const prefersReducedMotion = Boolean(useReducedMotion());
  const rootRef = React.useRef<HTMLDivElement>(null);
  const isVisible = useSafeSectionReveal(rootRef);

  const revealInitial = (y: number, scale = 1) =>
    prefersReducedMotion ? false : { opacity: 0, y, scale };
  const revealTarget = isVisible ? { opacity: 1, y: 0, scale: 1 } : undefined;

  const [activeTab, setActiveTab] = React.useState<ContactTabKey>(defaultTab);

  // Inquiry form state
  const [inquiryName, setInquiryName] = React.useState("");
  const [inquiryEmail, setInquiryEmail] = React.useState("");
  const [inquiryCompany, setInquiryCompany] = React.useState("");
  const [inquiryTopic, setInquiryTopic] = React.useState<string>(CONTACT_INQUIRY_TOPICS[0].value);
  const [teamSize, setTeamSize] = React.useState<string>(CONTACT_TEAM_SIZES[1]);
  const [inquiryMessage, setInquiryMessage] = React.useState("");
  const [requireNda, setRequireNda] = React.useState(false);
  const [inquiryError, setInquiryError] = React.useState<string | null>(null);
  const [submittedTicket, setSubmittedTicket] = React.useState<ContactInquiryPayload | null>(null);

  // Calendar booking state
  const [selectedDate, setSelectedDate] = React.useState<Date>(() => getNextBusinessDate());
  const [selectedSlotId, setSelectedSlotId] = React.useState<string>(
    slots.find((slot) => slot.available)?.id ?? slots[0]?.id ?? "09:30"
  );
  const [selectedTimezoneId, setSelectedTimezoneId] = React.useState<string>(
    CONTACT_TIMEZONES[0].id
  );
  const [bookingName, setBookingName] = React.useState("");
  const [bookingEmail, setBookingEmail] = React.useState("");
  const [bookingTopic, setBookingTopic] = React.useState<string>(CONTACT_INQUIRY_TOPICS[1].value);
  const [bookingError, setBookingError] = React.useState<string | null>(null);
  const [confirmedBooking, setConfirmedBooking] = React.useState<ContactBookingPayload | null>(
    null
  );
  const [icsDownloaded, setIcsDownloaded] = React.useState(false);

  const selectedSlot = React.useMemo(
    () => slots.find((slot) => slot.id === selectedSlotId) ?? slots[0],
    [slots, selectedSlotId]
  );
  const selectedTimezone = React.useMemo(
    () => CONTACT_TIMEZONES.find((tz) => tz.id === selectedTimezoneId) ?? CONTACT_TIMEZONES[0],
    [selectedTimezoneId]
  );

  const formattedSelectedDate = React.useMemo(
    () =>
      new Intl.DateTimeFormat("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric",
      }).format(selectedDate),
    [selectedDate]
  );

  const handleInquirySubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const cleanName = inquiryName.trim();
    const cleanEmail = inquiryEmail.trim();
    const cleanMessage = inquiryMessage.trim();

    if (!cleanName || !cleanEmail || !cleanMessage) {
      setInquiryError("Please fill in your full name, work email, and project details.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
      setInquiryError("Please enter a valid work email address.");
      return;
    }

    const payload: ContactInquiryPayload = {
      name: cleanName,
      email: cleanEmail,
      company: inquiryCompany.trim() || "Independent Team",
      topic: CONTACT_INQUIRY_TOPICS.find((t) => t.value === inquiryTopic)?.label ?? inquiryTopic,
      teamSize,
      message: cleanMessage,
      requireNda,
      referenceId: `HB-MSG-${String(Date.now()).slice(-6)}`,
    };

    setInquiryError(null);
    setSubmittedTicket(payload);
    onSubmitInquiry?.(payload);
  };

  const handleBookingSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const cleanName = bookingName.trim();
    const cleanEmail = bookingEmail.trim();

    if (!selectedDate || !selectedSlot) {
      setBookingError("Please choose an available date and time slot.");
      return;
    }
    if (!cleanName || !cleanEmail) {
      setBookingError("Please enter your name and work email to lock in the time slot.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
      setBookingError("Please enter a valid work email address.");
      return;
    }

    const payload: ContactBookingPayload = {
      name: cleanName,
      email: cleanEmail,
      date: selectedDate,
      slotId: selectedSlot.id,
      slotLabel: selectedSlot.label,
      timezoneId: selectedTimezone.id,
      timezoneShortLabel: selectedTimezone.shortLabel,
      topic: CONTACT_INQUIRY_TOPICS.find((t) => t.value === bookingTopic)?.label ?? bookingTopic,
      referenceCode: `HB-CALL-${String(Date.now()).slice(-6)}`,
    };

    setBookingError(null);
    setIcsDownloaded(false);
    setConfirmedBooking(payload);
    onConfirmBooking?.(payload);
  };

  const handleDownloadIcs = () => {
    if (!confirmedBooking || !selectedSlot) return;
    const icsInput: BookingIcsInput = {
      brandName,
      attendeeName: confirmedBooking.name,
      attendeeEmail: confirmedBooking.email,
      topicLabel: confirmedBooking.topic,
      date: confirmedBooking.date,
      hour: selectedSlot.hour,
      minute: selectedSlot.minute,
      timezoneOffsetHours: selectedTimezone.offsetHours,
      timezoneShortLabel: selectedTimezone.shortLabel,
      officeLocation: defaultOfficeLocation,
      referenceCode: confirmedBooking.referenceCode,
    };
    downloadBookingIcs(icsInput);
    setIcsDownloaded(true);
    window.setTimeout(() => setIcsDownloaded(false), 2600);
  };

  return (
    <div ref={rootRef} data-landing-section="contact-form-call" className="w-full">
      <Section
        id={id}
        spacing="none"
        className={cn("hb-contact-section bg-background text-foreground py-12 sm:py-16", className)}
      >
        <Container size="xl" gutter="lg">
          <div className="mx-auto w-full max-w-6xl border-t border-zinc-200/80 pt-12 sm:pt-14 dark:border-white/[0.08]">
            <motion.div
              initial={revealInitial(14)}
              animate={revealTarget}
              transition={{ duration: 0.36, ease: ABOUT_EASE_OUT }}
              className="max-w-2xl"
            >
              <Heading
                as="h2"
                size="inherit"
                data-hb-node="heading"
                data-hb-edit="contact-form-call:heading"
                className="text-foreground text-2xl font-semibold tracking-[-0.025em] sm:text-3xl"
              >
                {heading}
              </Heading>
              <Text
                variant="muted"
                data-hb-node="text"
                data-hb-edit="contact-form-call:subheading"
                className="mt-2 text-sm leading-relaxed sm:text-base"
              >
                {subheading}
              </Text>
            </motion.div>

            <motion.div
              initial={revealInitial(18, 0.99)}
              animate={revealTarget}
              transition={{ duration: 0.4, delay: 0.05, ease: ABOUT_EASE_OUT }}
              className="mt-8 rounded-2xl border border-zinc-200/80 bg-zinc-50/60 p-5 sm:p-8 dark:border-white/10 dark:bg-[#141416]"
            >
              {/* Underline Tabs Mode Switcher */}
              <Tabs
                variant="underlined"
                size="md"
                selectedKey={activeTab}
                onSelectionChange={(key) => setActiveTab(String(key) as ContactTabKey)}
                aria-label="Contact workflow mode"
                classNames={{
                  tabList: "w-full gap-6 border-b border-zinc-200/80 dark:border-white/10 pb-0",
                  tab: "min-h-11 px-1 text-sm font-medium whitespace-nowrap",
                }}
              >
                <Tab
                  key="message"
                  tabKey="message"
                  title={
                    <span className="inline-flex items-center gap-2">
                      <Mail className="h-4 w-4" aria-hidden="true" />
                      <span>Send Message</span>
                    </span>
                  }
                />
                <Tab
                  key="calendar"
                  tabKey="calendar"
                  title={
                    <span className="inline-flex items-center gap-2">
                      <CalendarDays className="h-4 w-4" aria-hidden="true" />
                      <span>Book a Call</span>
                    </span>
                  }
                />
              </Tabs>

              {/* Tab Panels with /animate Compositor Transitions */}
              <AnimatePresence mode="wait" initial={false}>
                {activeTab === "message" ? (
                  <motion.div
                    key="tab-message"
                    initial={prefersReducedMotion ? false : { opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={prefersReducedMotion ? undefined : { opacity: 0, y: -4 }}
                    transition={{ duration: 0.18, ease: ABOUT_EASE_OUT }}
                    className="mt-6"
                  >
                    {submittedTicket ? (
                      <div
                        role="status"
                        className="space-y-5 rounded-2xl border border-zinc-200/80 bg-white p-6 dark:border-white/10 dark:bg-zinc-900/60"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                              <Check className="h-5 w-5" aria-hidden="true" />
                            </div>
                            <div>
                              <Heading as="h3" size="inherit" className="text-lg font-semibold">
                                Inquiry received
                              </Heading>
                              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                                Ticket {submittedTicket.referenceId} · Estimated reply within 2
                                hours
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-2 rounded-xl border border-zinc-200/70 bg-zinc-50/70 p-4 text-sm dark:border-white/[0.08] dark:bg-zinc-950/50">
                          <p>
                            <span className="font-semibold">Topic:</span> {submittedTicket.topic}
                          </p>
                          <p>
                            <span className="font-semibold">Team size:</span>{" "}
                            {submittedTicket.teamSize} engineers
                          </p>
                          <p>
                            <span className="font-semibold">Reply to:</span> {submittedTicket.email}
                          </p>
                          {submittedTicket.requireNda && (
                            <p className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-700 dark:text-emerald-400">
                              <ShieldCheck className="h-4 w-4" aria-hidden="true" />
                              <span>Mutual NDA packet requested</span>
                            </p>
                          )}
                        </div>

                        <div className="flex flex-wrap gap-3">
                          <Button
                            type="button"
                            color="primary"
                            size="md"
                            className="hb-contact-btn-tap min-h-11 gap-2"
                            onClick={() => setActiveTab("calendar")}
                          >
                            <CalendarDays className="h-4 w-4" aria-hidden="true" />
                            <span>Also book a 30-min call</span>
                          </Button>
                          <Button
                            type="button"
                            variant="outline"
                            size="md"
                            className="hb-contact-btn-tap min-h-11"
                            onClick={() => {
                              setSubmittedTicket(null);
                              setInquiryName("");
                              setInquiryEmail("");
                              setInquiryCompany("");
                              setInquiryMessage("");
                              setRequireNda(false);
                            }}
                          >
                            Send another message
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <form onSubmit={handleInquirySubmit} noValidate className="space-y-5">
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                          <Input
                            id="contact-name"
                            label="Full name"
                            variant="bordered"
                            radius="lg"
                            value={inquiryName}
                            onChange={(e) => {
                              setInquiryName(e.target.value);
                              if (inquiryError) setInquiryError(null);
                            }}
                            placeholder="e.g. Nadia Kusuma"
                          />
                          <Input
                            id="contact-email"
                            type="email"
                            label="Work email"
                            variant="bordered"
                            radius="lg"
                            value={inquiryEmail}
                            onChange={(e) => {
                              setInquiryEmail(e.target.value);
                              if (inquiryError) setInquiryError(null);
                            }}
                            placeholder="you@company.com"
                          />
                        </div>

                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                          <Input
                            id="contact-company"
                            label="Company or organization"
                            variant="bordered"
                            radius="lg"
                            value={inquiryCompany}
                            onChange={(e) => setInquiryCompany(e.target.value)}
                            placeholder="Optional"
                          />
                          <Select
                            id="contact-topic"
                            label="Inquiry topic"
                            variant="bordered"
                            radius="lg"
                            value={inquiryTopic}
                            onValueChange={setInquiryTopic}
                          >
                            {CONTACT_INQUIRY_TOPICS.map((item) => (
                              <SelectItem key={item.value} value={item.value}>
                                {item.label}
                              </SelectItem>
                            ))}
                          </Select>
                        </div>

                        {/* Team Size Selector (Mobile-Reflow Safe 2x2 -> 4x1 Grid) */}
                        <div className="space-y-2">
                          <span className="text-foreground block text-xs font-medium sm:text-sm">
                            Engineering team size
                          </span>
                          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                            {CONTACT_TEAM_SIZES.map((sizeOption) => {
                              const active = teamSize === sizeOption;
                              return (
                                <button
                                  key={sizeOption}
                                  type="button"
                                  aria-pressed={active}
                                  onClick={() => setTeamSize(sizeOption)}
                                  className={cn(
                                    "hb-contact-slot flex min-h-11 cursor-pointer items-center justify-center rounded-xl border px-3 text-sm font-medium",
                                    active
                                      ? "border-zinc-900 bg-zinc-900 text-white dark:border-white dark:bg-white dark:text-zinc-950"
                                      : "border-zinc-200/90 bg-white text-zinc-700 hover:border-zinc-400 dark:border-white/10 dark:bg-zinc-900/60 dark:text-zinc-300 dark:hover:border-white/25"
                                  )}
                                >
                                  {sizeOption}
                                </button>
                              );
                            })}
                          </div>
                        </div>

                        <Textarea
                          id="contact-message"
                          label="Project requirements"
                          variant="bordered"
                          radius="lg"
                          rows={4}
                          value={inquiryMessage}
                          onChange={(e) => {
                            setInquiryMessage(e.target.value);
                            if (inquiryError) setInquiryError(null);
                          }}
                          placeholder="Tell us about your React/Vite stack, release timeline, or custom token requirements..."
                        />

                        <div className="rounded-xl border border-zinc-200/80 bg-white p-4 dark:border-white/[0.08] dark:bg-zinc-900/50">
                          <Switch
                            checked={requireNda}
                            onChange={(e) => setRequireNda(e.target.checked)}
                            label="Include mutual NDA & compliance intake packet"
                            description="Our solutions engineer attaches a countersigned standard NDA to the initial response."
                          />
                        </div>

                        {inquiryError && (
                          <p
                            role="alert"
                            className="text-xs font-medium text-rose-600 dark:text-rose-400"
                          >
                            {inquiryError}
                          </p>
                        )}

                        <div className="flex flex-col gap-3 pt-1 sm:flex-row sm:items-center sm:justify-between">
                          <p className="text-xs text-zinc-500 dark:text-zinc-400">
                            Reviewed directly by senior design engineers, never automated drip
                            queues.
                          </p>
                          <Button
                            type="submit"
                            color="primary"
                            size="lg"
                            className="hb-contact-btn-tap min-h-11 w-full shrink-0 gap-2 sm:w-auto"
                          >
                            <span>Send inquiry</span>
                            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                          </Button>
                        </div>
                      </form>
                    )}
                  </motion.div>
                ) : (
                  <motion.div
                    key="tab-calendar"
                    initial={prefersReducedMotion ? false : { opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={prefersReducedMotion ? undefined : { opacity: 0, y: -4 }}
                    transition={{ duration: 0.18, ease: ABOUT_EASE_OUT }}
                    className="mt-6"
                  >
                    {confirmedBooking ? (
                      <div
                        role="status"
                        className="space-y-5 rounded-2xl border border-zinc-200/80 bg-white p-6 dark:border-white/10 dark:bg-zinc-900/60"
                      >
                        <div className="flex items-start gap-3">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                            <CalendarCheck2 className="h-5 w-5" aria-hidden="true" />
                          </div>
                          <div>
                            <Heading as="h3" size="inherit" className="text-lg font-semibold">
                              Consultation scheduled
                            </Heading>
                            <p className="text-xs text-zinc-500 dark:text-zinc-400">
                              Reference {confirmedBooking.referenceCode} · 30-min Video Meet
                            </p>
                          </div>
                        </div>

                        <div className="space-y-2 rounded-xl border border-zinc-200/70 bg-zinc-50/70 p-4 text-sm dark:border-white/[0.08] dark:bg-zinc-950/50">
                          <p>
                            <span className="font-semibold">Date:</span>{" "}
                            {new Intl.DateTimeFormat("en-US", {
                              weekday: "long",
                              month: "long",
                              day: "numeric",
                              year: "numeric",
                            }).format(confirmedBooking.date)}
                          </p>
                          <p>
                            <span className="font-semibold">Time:</span>{" "}
                            {confirmedBooking.slotLabel} · {confirmedBooking.timezoneShortLabel}
                          </p>
                          <p>
                            <span className="font-semibold">Session:</span> {confirmedBooking.topic}
                          </p>
                          <p>
                            <span className="font-semibold">Attendee:</span> {confirmedBooking.name}{" "}
                            ({confirmedBooking.email})
                          </p>
                        </div>

                        <div className="flex flex-wrap gap-3">
                          <Button
                            type="button"
                            color="primary"
                            size="md"
                            className="hb-contact-btn-tap min-h-11 gap-2"
                            onClick={handleDownloadIcs}
                          >
                            {icsDownloaded ? (
                              <>
                                <Check className="h-4 w-4" aria-hidden="true" />
                                <span>Invite downloaded</span>
                              </>
                            ) : (
                              <>
                                <Download className="h-4 w-4" aria-hidden="true" />
                                <span>Download .ics invite</span>
                              </>
                            )}
                          </Button>
                          <Button
                            type="button"
                            variant="outline"
                            size="md"
                            className="hb-contact-btn-tap min-h-11"
                            onClick={() => setConfirmedBooking(null)}
                          >
                            Reschedule
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <form onSubmit={handleBookingSubmit} noValidate className="space-y-5">
                        {/* Call Session Header + Timezone Select */}
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:items-end">
                          <Select
                            id="booking-topic"
                            label="Session focus"
                            variant="bordered"
                            radius="lg"
                            value={bookingTopic}
                            onValueChange={setBookingTopic}
                          >
                            {CONTACT_INQUIRY_TOPICS.map((item) => (
                              <SelectItem key={item.value} value={item.value}>
                                {item.label}
                              </SelectItem>
                            ))}
                          </Select>

                          <Select
                            id="booking-timezone"
                            label="Timezone"
                            variant="bordered"
                            radius="lg"
                            value={selectedTimezoneId}
                            onValueChange={setSelectedTimezoneId}
                          >
                            {CONTACT_TIMEZONES.map((tz) => (
                              <SelectItem key={tz.id} value={tz.id}>
                                {tz.label}
                              </SelectItem>
                            ))}
                          </Select>
                        </div>

                        {/* Calendar Date Picker + Time Slot Grid */}
                        <div className="grid grid-cols-1 gap-6 min-[860px]:grid-cols-12">
                          <div className="min-[860px]:col-span-6">
                            <span className="text-foreground mb-2 block text-xs font-medium sm:text-sm">
                              Pick a date (Mon - Fri)
                            </span>
                            <Calendar
                              size="sm"
                              color="primary"
                              showYearNavigation={false}
                              disablePastDates
                              disableWeekends
                              showTodayButton={false}
                              value={selectedDate}
                              onChange={(date) => {
                                setSelectedDate(date);
                                if (bookingError) setBookingError(null);
                              }}
                              aria-label="Consultation date calendar"
                              className="w-full max-w-full border border-zinc-200/80 shadow-none dark:border-white/10"
                            />
                          </div>

                          <div className="flex flex-col justify-between gap-5 min-[860px]:col-span-6">
                            <div>
                              <div className="mb-2 flex items-center justify-between gap-2">
                                <Heading
                                  as="h3"
                                  size="inherit"
                                  className="text-foreground text-xs font-semibold sm:text-sm"
                                >
                                  Available slots
                                </Heading>
                                <span className="text-[11px] font-medium text-zinc-500 dark:text-zinc-400">
                                  30 min
                                </span>
                              </div>

                              <p className="mb-3 truncate text-xs text-zinc-500 dark:text-zinc-400">
                                {formattedSelectedDate}
                              </p>

                              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                                {slots.map((slot) => {
                                  const active = selectedSlotId === slot.id;
                                  return (
                                    <button
                                      key={slot.id}
                                      type="button"
                                      disabled={!slot.available}
                                      aria-pressed={active}
                                      aria-label={`Time slot ${slot.label} ${slot.available ? "" : "unavailable"}`}
                                      onClick={() => {
                                        setSelectedSlotId(slot.id);
                                        if (bookingError) setBookingError(null);
                                      }}
                                      className={cn(
                                        "hb-contact-slot flex min-h-11 items-center justify-center gap-1.5 rounded-xl border px-3 text-sm font-medium",
                                        !slot.available &&
                                          "cursor-not-allowed border-dashed border-zinc-200 bg-zinc-100/60 text-zinc-400 line-through dark:border-white/10 dark:bg-zinc-900/30 dark:text-zinc-600",
                                        slot.available &&
                                          active &&
                                          "cursor-pointer border-zinc-900 bg-zinc-900 text-white dark:border-white dark:bg-white dark:text-zinc-950",
                                        slot.available &&
                                          !active &&
                                          "cursor-pointer border-zinc-200/90 bg-white text-zinc-700 hover:border-zinc-400 dark:border-white/10 dark:bg-zinc-900/60 dark:text-zinc-300 dark:hover:border-white/25"
                                      )}
                                    >
                                      <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                                      <span>{slot.label}</span>
                                    </button>
                                  );
                                })}
                              </div>
                            </div>

                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                              <Input
                                id="booking-name"
                                label="Your name"
                                variant="bordered"
                                radius="lg"
                                value={bookingName}
                                onChange={(e) => {
                                  setBookingName(e.target.value);
                                  if (bookingError) setBookingError(null);
                                }}
                                placeholder="e.g. Raka Pratama"
                              />
                              <Input
                                id="booking-email"
                                type="email"
                                label="Invite email"
                                variant="bordered"
                                radius="lg"
                                value={bookingEmail}
                                onChange={(e) => {
                                  setBookingEmail(e.target.value);
                                  if (bookingError) setBookingError(null);
                                }}
                                placeholder="you@company.com"
                              />
                            </div>
                          </div>
                        </div>

                        {bookingError && (
                          <p
                            role="alert"
                            className="text-xs font-medium text-rose-600 dark:text-rose-400"
                          >
                            {bookingError}
                          </p>
                        )}

                        <div className="flex flex-col gap-3 pt-1 sm:flex-row sm:items-center sm:justify-between">
                          <p className="text-xs text-zinc-500 dark:text-zinc-400">
                            {formattedSelectedDate} · {selectedSlot?.label} (
                            {selectedTimezone.shortLabel})
                          </p>
                          <Button
                            type="submit"
                            color="primary"
                            size="lg"
                            className="hb-contact-btn-tap min-h-11 w-full shrink-0 gap-2 sm:w-auto"
                          >
                            <span>Confirm 30-min call</span>
                            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                          </Button>
                        </div>
                      </form>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </Container>
      </Section>
    </div>
  );
}

/**
 * Section 3: Location with Map Section
 * Multi-office switcher, complete physical address & transit coordinates,
 * one-click address copy, Google Maps deep link, and monochrome-to-color OpenStreetMap iframe.
 */
export function ContactLocationMapSection({
  id = "contact-locations",
  heading = "Studios and regional hubs",
  subheading = "Meet our product engineering leads in person, inspect hardware demos, or join live design system clinics by appointment.",
  offices = DEFAULT_CONTACT_OFFICES,
  className,
}: ContactLocationMapSectionProps) {
  const prefersReducedMotion = Boolean(useReducedMotion());
  const rootRef = React.useRef<HTMLDivElement>(null);
  const isVisible = useSafeSectionReveal(rootRef);

  const revealInitial = (y: number) => (prefersReducedMotion ? false : { opacity: 0, y });
  const revealTarget = isVisible ? { opacity: 1, y: 0 } : undefined;

  const [activeOfficeId, setActiveOfficeId] = React.useState<string>(
    offices[0]?.id ?? "jakarta-hq"
  );
  const activeOffice = React.useMemo(
    () => offices.find((office) => office.id === activeOfficeId) ?? offices[0],
    [offices, activeOfficeId]
  );
  const [mapColorPinned, setMapColorPinned] = React.useState(false);
  const [copiedOfficeId, setCopiedOfficeId] = React.useState<string | null>(null);

  const handleCopyAddress = async (officeId: string, fullAddress: string) => {
    try {
      if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(fullAddress);
      }
    } catch {
      // Clipboard API may be restricted in headless contexts
    }
    const key = `office-${officeId}`;
    setCopiedOfficeId(key);
    window.setTimeout(() => {
      setCopiedOfficeId((current) => (current === key ? null : current));
    }, 2200);
  };

  if (!activeOffice) return null;

  return (
    <div ref={rootRef} data-landing-section="contact-locations" className="w-full">
      <Section
        id={id}
        spacing="none"
        aria-labelledby="contact-locations-heading"
        className={cn(
          "hb-contact-section bg-background text-foreground pt-12 pb-16 sm:pt-14 sm:pb-24",
          className
        )}
      >
        <Container size="xl" gutter="lg">
          <div className="mx-auto w-full max-w-6xl border-t border-zinc-200/80 pt-12 sm:pt-14 dark:border-white/[0.08]">
            <motion.div
              initial={revealInitial(14)}
              animate={revealTarget}
              transition={{ duration: 0.36, ease: ABOUT_EASE_OUT }}
              className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between"
            >
              <div>
                <Heading
                  as="h2"
                  id="contact-locations-heading"
                  size="inherit"
                  data-hb-node="heading"
                  data-hb-edit="contact-locations:heading"
                  className="text-foreground text-2xl font-semibold tracking-[-0.025em] sm:text-3xl"
                >
                  {heading}
                </Heading>
                <Text
                  variant="muted"
                  data-hb-node="text"
                  data-hb-edit="contact-locations:subheading"
                  className="mt-2 max-w-2xl text-sm sm:text-base"
                >
                  {subheading}
                </Text>
              </div>

              {/* Multi-Office Switcher */}
              <div
                role="group"
                aria-label="Select studio location"
                className="inline-flex w-full gap-2 sm:w-auto"
              >
                {offices.map((office) => {
                  const active = office.id === activeOffice.id;
                  return (
                    <button
                      key={office.id}
                      type="button"
                      aria-pressed={active}
                      onClick={() => setActiveOfficeId(office.id)}
                      className={cn(
                        "hb-contact-slot min-h-11 flex-1 cursor-pointer rounded-xl border px-4 text-sm font-medium sm:flex-initial",
                        active
                          ? "border-zinc-900 bg-zinc-900 text-white dark:border-white dark:bg-white dark:text-zinc-950"
                          : "border-zinc-200/90 bg-white text-zinc-700 hover:border-zinc-400 dark:border-white/10 dark:bg-[#141416] dark:text-zinc-300 dark:hover:border-white/25"
                      )}
                    >
                      {office.name}
                    </button>
                  );
                })}
              </div>
            </motion.div>

            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={activeOffice.id}
                initial={prefersReducedMotion ? false : { opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={prefersReducedMotion ? undefined : { opacity: 0, y: -4 }}
                transition={{ duration: 0.18, ease: ABOUT_EASE_OUT }}
                className="mt-8 grid grid-cols-1 gap-6 min-[960px]:grid-cols-12 min-[960px]:gap-8"
              >
                {/* Detailed Address & Directions Card */}
                {(() => {
                  const officeIdx = Math.max(
                    0,
                    offices.findIndex((o) => o.id === activeOffice.id)
                  );
                  return (
                    <div
                      data-hb-node="card"
                      data-hb-item={officeIdx}
                      className="flex flex-col justify-between rounded-2xl border border-zinc-200/80 bg-zinc-50/60 p-6 min-[960px]:col-span-5 sm:p-8 dark:border-white/10 dark:bg-[#141416]"
                    >
                      <div className="space-y-6">
                        <div
                          data-hb-node="media"
                          data-hb-item={officeIdx}
                          data-hb-edit={`contact-locations:offices.${officeIdx}.photoSrc`}
                          data-hb-edit-mode="popover"
                          className="hb-contact-media-frame aspect-[16/9] w-full overflow-hidden rounded-xl bg-zinc-100 min-[960px]:hidden dark:bg-zinc-900"
                        >
                          <img
                            src={activeOffice.photoSrc}
                            alt={activeOffice.photoAlt}
                            className="hb-contact-media-img h-full w-full object-cover"
                          />
                        </div>
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <Badge
                              variant="modern"
                              size="sm"
                              data-hb-node="badge"
                              data-hb-item={officeIdx}
                              data-hb-edit={`contact-locations:offices.${officeIdx}.badge`}
                            >
                              <span data-hb-edit-text="">{activeOffice.badge}</span>
                            </Badge>
                            <Heading
                              as="h3"
                              size="inherit"
                              data-hb-node="heading"
                              data-hb-item={officeIdx}
                              data-hb-edit={`contact-locations:offices.${officeIdx}.name`}
                              className="text-foreground mt-3 text-xl font-semibold tracking-[-0.02em] sm:text-2xl"
                            >
                              {activeOffice.name}
                            </Heading>
                            <p
                              data-hb-node="text"
                              data-hb-item={officeIdx}
                              data-hb-edit={`contact-locations:offices.${officeIdx}.city`}
                              className="mt-0.5 text-sm text-zinc-500 dark:text-zinc-400"
                            >
                              {activeOffice.city}
                            </p>
                          </div>
                          <span
                            data-hb-node="badge"
                            data-hb-item={officeIdx}
                            data-hb-edit={`contact-locations:offices.${officeIdx}.timezoneLabel`}
                            className="rounded-lg border border-zinc-200/80 bg-white px-2.5 py-1 text-xs font-medium text-zinc-600 dark:border-white/10 dark:bg-zinc-900 dark:text-zinc-300"
                          >
                            {activeOffice.timezoneLabel}
                          </span>
                        </div>

                        <div className="space-y-4 border-t border-zinc-200/70 pt-5 text-sm dark:border-white/[0.08]">
                          <div className="flex items-start gap-3">
                            <MapPin
                              className="mt-0.5 h-4 w-4 shrink-0 text-zinc-500"
                              aria-hidden="true"
                            />
                            <div className="space-y-0.5">
                              <p
                                data-hb-node="text"
                                data-hb-item={officeIdx}
                                data-hb-edit={`contact-locations:offices.${officeIdx}.building`}
                                className="text-foreground font-semibold"
                              >
                                {activeOffice.building}
                              </p>
                              <p
                                data-hb-node="text"
                                data-hb-item={officeIdx}
                                data-hb-edit={`contact-locations:offices.${officeIdx}.streetAddress`}
                                className="text-zinc-600 dark:text-zinc-300"
                              >
                                {activeOffice.streetAddress}
                              </p>
                              <p
                                data-hb-node="text"
                                data-hb-item={officeIdx}
                                data-hb-edit={`contact-locations:offices.${officeIdx}.postalRegion`}
                                className="text-zinc-500 dark:text-zinc-400"
                              >
                                {activeOffice.postalRegion}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-start gap-3">
                            <Clock
                              className="mt-0.5 h-4 w-4 shrink-0 text-zinc-500"
                              aria-hidden="true"
                            />
                            <div>
                              <p
                                data-hb-node="text"
                                data-hb-item={officeIdx}
                                data-hb-edit={`contact-locations:offices.${officeIdx}.hours`}
                                className="text-foreground font-medium"
                              >
                                {activeOffice.hours}
                              </p>
                              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                                GPS: {activeOffice.coordinatesLabel}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-start gap-3">
                            <TrainFront
                              className="mt-0.5 h-4 w-4 shrink-0 text-zinc-500"
                              aria-hidden="true"
                            />
                            <p
                              data-hb-node="text"
                              data-hb-item={officeIdx}
                              data-hb-edit={`contact-locations:offices.${officeIdx}.transit`}
                              className="text-zinc-600 dark:text-zinc-300"
                            >
                              {activeOffice.transit}
                            </p>
                          </div>

                          <div className="flex items-center gap-3">
                            <Phone className="h-4 w-4 shrink-0 text-zinc-500" aria-hidden="true" />
                            <a
                              href={`tel:${activeOffice.phone.replace(/\s+/g, "")}`}
                              data-hb-node="links"
                              data-hb-item={officeIdx}
                              data-hb-edit={`contact-locations:offices.${officeIdx}.phone`}
                              className="text-foreground font-medium underline-offset-4 hover:underline"
                            >
                              {activeOffice.phone}
                            </a>
                          </div>
                        </div>
                      </div>

                      <div className="mt-8 flex flex-wrap gap-3 border-t border-zinc-200/70 pt-6 dark:border-white/[0.08]">
                        <Button
                          type="button"
                          variant="outline"
                          size="md"
                          className="hb-contact-btn-tap min-h-11 gap-2"
                          onClick={() =>
                            handleCopyAddress(activeOffice.id, activeOffice.fullAddress)
                          }
                        >
                          {copiedOfficeId === `office-${activeOffice.id}` ? (
                            <>
                              <Check
                                className="h-4 w-4 text-emerald-600 dark:text-emerald-400"
                                aria-hidden="true"
                              />
                              <span>Address copied</span>
                            </>
                          ) : (
                            <>
                              <Copy className="h-4 w-4" aria-hidden="true" />
                              <span>Copy address</span>
                            </>
                          )}
                        </Button>

                        <Button
                          href={activeOffice.googleMapsUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          variant="solid"
                          color="primary"
                          size="md"
                          className="hb-contact-btn-tap min-h-11 gap-2 no-underline"
                        >
                          <span>Open in Google Maps</span>
                          <ExternalLink className="h-4 w-4" aria-hidden="true" />
                        </Button>
                      </div>
                    </div>
                  );
                })()}

                {/* Interactive Embed Map Frame (Monochrome Default -> Color on Hover / Toggle) */}
                <div className="hb-contact-map-shell relative min-h-[320px] overflow-hidden rounded-2xl border border-zinc-200/80 bg-zinc-100 min-[960px]:col-span-7 sm:min-h-[390px] dark:border-white/10 dark:bg-zinc-900">
                  <iframe
                    title={`${activeOffice.name} map location`}
                    src={activeOffice.osmEmbedUrl}
                    loading="eager"
                    referrerPolicy="no-referrer-when-downgrade"
                    data-color-active={mapColorPinned ? "true" : "false"}
                    className="hb-contact-map-frame h-full min-h-[320px] w-full border-0 sm:min-h-[390px]"
                  />

                  {/* Corner Pin Label Top-Left & Color Map Toggle Bottom-Left (leaves OSM +/- zoom clear) */}
                  <div className="pointer-events-none absolute top-3 left-3 max-w-[calc(100%-4.5rem)]">
                    <span className="pointer-events-auto inline-flex items-center gap-1.5 rounded-xl border border-zinc-200/90 bg-white/95 px-3 py-1.5 text-xs font-medium text-zinc-900 shadow-xs dark:border-white/15 dark:bg-zinc-950/90 dark:text-zinc-100">
                      <MapPin className="h-3.5 w-3.5 shrink-0 text-blue-600" aria-hidden="true" />
                      <span className="truncate">{activeOffice.building}</span>
                    </span>
                  </div>

                  <div className="pointer-events-none absolute bottom-8 left-3">
                    <button
                      type="button"
                      aria-pressed={mapColorPinned}
                      onClick={() => setMapColorPinned((prev) => !prev)}
                      className="hb-contact-btn-tap pointer-events-auto min-h-11 cursor-pointer rounded-xl border border-zinc-200/90 bg-white/95 px-3.5 text-xs font-medium text-zinc-800 shadow-xs transition-colors hover:bg-white dark:border-white/15 dark:bg-zinc-950/90 dark:text-zinc-100"
                    >
                      {mapColorPinned ? "Monochrome map" : "Color map"}
                    </button>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </Container>
      </Section>
    </div>
  );
}

/**
 * Full Contact Us Page composition combining:
 * 1. ContactMailSection ("contact-mail")
 * 2. ContactFormCallSection ("contact-form-call")
 * 3. ContactLocationMapSection ("contact-locations")
 */
export function ContactPageSection({
  id = "contact-page",
  brandName = "Hudbird UI",
  title = "Talk with the engineers building Hudbird UI.",
  description = "Scope an enterprise license, request a design-token architecture review, or book a working session directly with our core engineering team.",
  formHeading,
  formSubheading,
  locationsHeading,
  locationsSubheading,
  defaultTab = "message",
  channels = DEFAULT_CONTACT_CHANNELS,
  offices = DEFAULT_CONTACT_OFFICES,
  slots = DEFAULT_CONTACT_SLOTS,
  visibleSections,
  onSubmitInquiry,
  onConfirmBooking,
  className,
}: ContactPageSectionProps) {
  const showMail = visibleSections?.["contact-mail"] ?? true;
  const showFormCall = visibleSections?.["contact-form-call"] ?? true;
  const showLocations = visibleSections?.["contact-locations"] ?? true;

  return (
    <div id={id} data-landing-section="contact-page" className={cn("w-full", className)}>
      {showMail && (
        <ContactMailSection
          brandName={brandName}
          title={title}
          description={description}
          channels={channels}
          featuredOffice={offices[0]}
        />
      )}
      {showFormCall && (
        <ContactFormCallSection
          brandName={brandName}
          heading={formHeading}
          subheading={formSubheading}
          defaultTab={defaultTab}
          slots={slots}
          defaultOfficeLocation={
            offices[0] ? `${offices[0].name} (Online Meet + Studio)` : "Online Meet"
          }
          onSubmitInquiry={onSubmitInquiry}
          onConfirmBooking={onConfirmBooking}
        />
      )}
      {showLocations && (
        <ContactLocationMapSection
          heading={locationsHeading}
          subheading={locationsSubheading}
          offices={offices}
        />
      )}
    </div>
  );
}
