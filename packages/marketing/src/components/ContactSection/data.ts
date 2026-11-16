export interface ContactChannel {
  id: string;
  label: string;
  email: string;
  sla: string;
  description: string;
}

export interface ContactOffice {
  id: string;
  name: string;
  badge: string;
  city: string;
  building: string;
  streetAddress: string;
  postalRegion: string;
  fullAddress: string;
  coordinatesLabel: string;
  lat: number;
  lng: number;
  hours: string;
  timezoneLabel: string;
  transit: string;
  phone: string;
  googleMapsUrl: string;
  osmEmbedUrl: string;
  photoSrc: string;
  photoAlt: string;
}

export interface ContactTimeSlot {
  id: string;
  label: string;
  hour: number;
  minute: number;
  available: boolean;
}

export interface ContactTimezoneOption {
  id: string;
  label: string;
  shortLabel: string;
  offsetHours: number;
}

export const CONTACT_INQUIRY_TOPICS = [
  { value: "enterprise", label: "Enterprise License & Multi-Brand Kit" },
  { value: "architecture", label: "Design System Architecture Review" },
  { value: "support", label: "Technical Integration & Migration" },
  { value: "partnership", label: "Agency & Ecosystem Partnership" },
] as const;

export const CONTACT_TEAM_SIZES = ["1-10", "11-50", "51-200", "200+"] as const;

export const CONTACT_TIMEZONES: ContactTimezoneOption[] = [
  {
    id: "Asia/Jakarta",
    label: "WIB · Asia/Jakarta (UTC+7)",
    shortLabel: "WIB (UTC+7)",
    offsetHours: 7,
  },
  {
    id: "Asia/Singapore",
    label: "SGT · Asia/Singapore (UTC+8)",
    shortLabel: "SGT (UTC+8)",
    offsetHours: 8,
  },
  {
    id: "America/Los_Angeles",
    label: "PST · San Francisco (UTC-8)",
    shortLabel: "PST (UTC-8)",
    offsetHours: -8,
  },
  { id: "UTC", label: "UTC · Coordinated Universal Time", shortLabel: "UTC", offsetHours: 0 },
];

export const DEFAULT_CONTACT_SLOTS: ContactTimeSlot[] = [
  { id: "09:30", label: "09:30", hour: 9, minute: 30, available: true },
  { id: "11:00", label: "11:00", hour: 11, minute: 0, available: true },
  { id: "13:30", label: "13:30", hour: 13, minute: 30, available: false },
  { id: "15:00", label: "15:00", hour: 15, minute: 0, available: true },
  { id: "16:30", label: "16:30", hour: 16, minute: 30, available: true },
  { id: "18:00", label: "18:00", hour: 18, minute: 0, available: true },
];

export const DEFAULT_CONTACT_CHANNELS: ContactChannel[] = [
  {
    id: "enterprise",
    label: "Sales & Enterprise Licensing",
    email: "enterprise@hudbird.studio",
    sla: "Reply < 2h",
    description: "Custom theme contracts, multi-team seats, and procurement paperwork.",
  },
  {
    id: "engineering",
    label: "Design System Engineering",
    email: "hello@hudbird.studio",
    sla: "Reply < 4h",
    description: "Direct component guidance, token audits, and Vite / Next migrations.",
  },
  {
    id: "press",
    label: "Press & Partnerships",
    email: "press@hudbird.studio",
    sla: "Within 1 day",
    description: "Design conferences, open-source collaborations, and media kits.",
  },
];

export const DEFAULT_CONTACT_OFFICES: ContactOffice[] = [
  {
    id: "jakarta-hq",
    name: "Jakarta HQ",
    badge: "Headquarters",
    city: "Jakarta Selatan, Indonesia",
    building: "Treasury Tower, 28th Floor",
    streetAddress: "District 8 SCBD, Jl. Jend. Sudirman Kav. 52-53",
    postalRegion: "Senayan, Kebayoran Baru, Jakarta 12190",
    fullAddress:
      "Treasury Tower, 28th Floor, District 8 SCBD, Jl. Jend. Sudirman Kav. 52-53, Jakarta 12190, Indonesia",
    coordinatesLabel: "6.2269° S, 106.8091° E",
    lat: -6.2269,
    lng: 106.8091,
    hours: "Mon - Fri, 09:00 - 18:00 WIB",
    timezoneLabel: "WIB (UTC+7)",
    transit: "MRT Istora Mandiri Station (4 min walk)",
    phone: "+62 21 5088 4920",
    googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=-6.2269,106.8091",
    osmEmbedUrl:
      "https://www.openstreetmap.org/export/embed.html?bbox=106.8031%2C-6.2315%2C106.8151%2C-6.2223&layer=mapnik&marker=-6.2269%2C106.8091",
    photoSrc:
      "https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg?auto=compress&cs=tinysrgb&w=1400",
    photoAlt: "Hudbird UI Studio engineering room and collaboration table in Jakarta HQ",
  },
  {
    id: "singapore-hub",
    name: "Singapore Hub",
    badge: "APAC Studio",
    city: "Tanjong Pagar, Singapore",
    building: "Guoco Tower, Level 19",
    streetAddress: "1 Wallich Street, Tanjong Pagar",
    postalRegion: "Singapore 078881",
    fullAddress: "Guoco Tower, Level 19, 1 Wallich Street, Tanjong Pagar, Singapore 078881",
    coordinatesLabel: "1.2767° N, 103.8453° E",
    lat: 1.2767,
    lng: 103.8453,
    hours: "Mon - Fri, 09:30 - 18:30 SGT",
    timezoneLabel: "SGT (UTC+8)",
    transit: "MRT Tanjong Pagar EW15 (Direct Exit A)",
    phone: "+65 6812 3409",
    googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=1.2767,103.8453",
    osmEmbedUrl:
      "https://www.openstreetmap.org/export/embed.html?bbox=103.8403%2C1.2725%2C103.8503%2C1.2809&layer=mapnik&marker=1.2767%2C103.8453",
    photoSrc:
      "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1400",
    photoAlt: "Design engineers reviewing component architecture at Hudbird Singapore Hub",
  },
];

function padTwo(n: number): string {
  return String(n).padStart(2, "0");
}

function formatIcsUtcDate(utcDate: Date): string {
  return `${utcDate.getUTCFullYear()}${padTwo(utcDate.getUTCMonth() + 1)}${padTwo(
    utcDate.getUTCDate()
  )}T${padTwo(utcDate.getUTCHours())}${padTwo(utcDate.getUTCMinutes())}00Z`;
}

export interface BookingIcsInput {
  brandName: string;
  attendeeName: string;
  attendeeEmail: string;
  topicLabel: string;
  date: Date;
  hour: number;
  minute: number;
  timezoneOffsetHours: number;
  timezoneShortLabel: string;
  officeLocation: string;
  referenceCode: string;
}

/**
 * Generates an RFC 5545 compliant .ics calendar invite for booked consultations.
 */
export function buildBookingIcsContent(input: BookingIcsInput): string {
  const localEpochMs = Date.UTC(
    input.date.getFullYear(),
    input.date.getMonth(),
    input.date.getDate(),
    input.hour,
    input.minute,
    0
  );
  const startUtc = new Date(localEpochMs - input.timezoneOffsetHours * 60 * 60 * 1000);
  const endUtc = new Date(startUtc.getTime() + 30 * 60 * 1000);
  const nowUtc = formatIcsUtcDate(new Date());

  const escapeText = (raw: string) =>
    raw.replace(/\\/g, "\\\\").replace(/;/g, "\\;").replace(/,/g, "\\,").replace(/\n/g, "\\n");

  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Hudbird UI Studio//Contact Booking//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:${input.referenceCode}@hudbird.studio`,
    `DTSTAMP:${nowUtc}`,
    `DTSTART:${formatIcsUtcDate(startUtc)}`,
    `DTEND:${formatIcsUtcDate(endUtc)}`,
    `SUMMARY:${escapeText(`${input.brandName} Consultation: ${input.topicLabel}`)}`,
    `DESCRIPTION:${escapeText(
      `Booked by ${input.attendeeName} (${input.attendeeEmail}) in ${input.timezoneShortLabel}. Ref: ${input.referenceCode}`
    )}`,
    `LOCATION:${escapeText(input.officeLocation)}`,
    "STATUS:CONFIRMED",
    "END:VEVENT",
    "END:VCALENDAR",
  ];

  return `${lines.join("\r\n")}\r\n`;
}

export function downloadBookingIcs(input: BookingIcsInput): boolean {
  if (typeof document === "undefined" || typeof URL === "undefined") return false;
  const content = buildBookingIcsContent(input);
  const blob = new Blob([content], { type: "text/calendar;charset=utf-8" });
  const objectUrl = typeof URL.createObjectURL === "function" ? URL.createObjectURL(blob) : "";
  if (!objectUrl) return false;
  const link = document.createElement("a");
  link.href = objectUrl;
  link.download = `hudbird-call-${input.referenceCode.toLowerCase()}.ics`;
  link.style.display = "none";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL?.(objectUrl);
  return true;
}

export function getNextBusinessDate(): Date {
  const candidate = new Date();
  candidate.setDate(candidate.getDate() + 1);
  while (candidate.getDay() === 0 || candidate.getDay() === 6) {
    candidate.setDate(candidate.getDate() + 1);
  }
  return new Date(candidate.getFullYear(), candidate.getMonth(), candidate.getDate());
}
