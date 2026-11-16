export type LegalDocKey = "privacy" | "terms" | "cookies" | "license";

export interface LegalVersionOption {
  id: string;
  label: string;
  effectiveDate: string;
  summaryNote: string;
}

export interface LegalDataRow {
  cells: [string, string, string];
}

export interface LegalClause {
  id: string;
  number: string;
  title: string;
  plainSummary: string;
  paragraphs: string[];
  table?: {
    headers: [string, string, string];
    rows: LegalDataRow[];
  };
}

export interface LegalDocumentDefinition {
  key: LegalDocKey;
  tabLabel: string;
  title: string;
  docCode: string;
  summary: string;
  contactEmail: string;
  jurisdiction: string;
  clauses: LegalClause[];
}

export interface CookiePreferenceState {
  essential: true;
  analytics: boolean;
  diagnostics: boolean;
  errorTelemetry: boolean;
}

export interface DsarRequestTypeOption {
  value: string;
  label: string;
  turnaround: string;
}

export const LEGAL_VERSIONS: LegalVersionOption[] = [
  {
    id: "v2.4",
    label: "v2.4 (Nov 14, 2026)",
    effectiveDate: "November 14, 2026",
    summaryNote:
      "Clarified the 30-day DSAR export turnaround and documented Tailwind CSS v4 package boundaries.",
  },
  {
    id: "v2.3",
    label: "v2.3 (Aug 04, 2026)",
    effectiveDate: "August 04, 2026",
    summaryNote:
      "Removed third-party advertising beacons across all documentation and interactive preview hosts.",
  },
  {
    id: "v2.2",
    label: "v2.2 (Mar 18, 2026)",
    effectiveDate: "March 18, 2026",
    summaryNote: "Added explicit MIT Core versus commercial Marketing & Builder seat rules.",
  },
];

export const LEGAL_DSAR_TYPES: DsarRequestTypeOption[] = [
  {
    value: "export",
    label: "Export account archive (JSON)",
    turnaround: "Delivered within 7 business days",
  },
  {
    value: "delete",
    label: "Delete personal & workspace records",
    turnaround: "Completed within 30 calendar days",
  },
  {
    value: "dpa",
    label: "Request countersigned DPA copy",
    turnaround: "Sent within 3 business days",
  },
  {
    value: "withdraw",
    label: "Withdraw optional telemetry consent",
    turnaround: "Applied immediately upon review",
  },
];

export const DEFAULT_COOKIE_PREFERENCES: CookiePreferenceState = {
  essential: true,
  analytics: false,
  diagnostics: true,
  errorTelemetry: true,
};

export const LEGAL_DOCUMENTS: LegalDocumentDefinition[] = [
  {
    key: "privacy",
    tabLabel: "Privacy Policy",
    title: "Privacy Policy",
    docCode: "PRIV-2026-11",
    summary:
      "How Hudbird UI collects, stores, and deletes account records, project configurations, and telemetry data across our web workspace.",
    contactEmail: "privacy@hudbird.io",
    jurisdiction: "Singapore & EU GDPR Compliant",
    clauses: [
      {
        id: "privacy-data-collected",
        number: "1",
        title: "Account & Workspace Data We Collect",
        plainSummary:
          "We only collect the details needed to keep your builder projects synced: work email, chosen display name, billing contacts, and project JSON configs you explicitly save.",
        paragraphs: [
          "When you register an account or request license access, we record your name, business email address, organization domain, and billing receipt metadata provided by our payment processor.",
          "Inside the visual builder, layout presets, section ordering, and theme token overrides remain stored in your browser session unless you trigger a workspace save or submit a contact inquiry.",
          "We do not read source repositories you scaffold offline with our CLI, and we never ingest customer end-user datasets through component packages installed from npm.",
        ],
      },
      {
        id: "privacy-usage",
        number: "2",
        title: "How We Use Service Records",
        plainSummary:
          "Your data pays for subscriptions, authenticates seats, and answers support tickets. We never sell emails or feed private UI layouts into ad networks.",
        paragraphs: [
          "Service records are processed strictly to provision repository access, deliver release advisories for installed packages, authenticate team seats, and respond to technical support requests.",
          "Optional error telemetry captures browser version, stack traces inside the builder shell, and timing metrics so maintainers can reproduce rendering defects.",
          "You may toggle off optional analytics and preview diagnostics at any time using the consent controls at the bottom of this page without losing core editor functionality.",
        ],
      },
      {
        id: "privacy-retention",
        number: "3",
        title: "Retention Windows & Subprocessors",
        plainSummary:
          "Active workspace data stays while your account is open. Deleted accounts clear production databases within 30 days, while tax invoices stay for statutory auditing.",
        paragraphs: [
          "Hudbird UI minimizes third-party data replication. Infrastructure partners operate under signed Data Processing Addenda (DPA) with encryption in transit and at rest.",
        ],
        table: {
          headers: ["Data Category", "Primary Storage", "Retention Window"],
          rows: [
            {
              cells: [
                "Account profile & seat directory",
                "PostgreSQL (ap-southeast-1)",
                "Duration of account plus 30 days after deletion",
              ],
            },
            {
              cells: [
                "Support tickets & DSAR logs",
                "EU & SG encrypted mail store",
                "24 months after ticket resolution",
              ],
            },
            {
              cells: [
                "Invoices & tax receipts",
                "Stripe Billing ledger",
                "7 years per statutory accounting rules",
              ],
            },
            {
              cells: [
                "Optional crash telemetry",
                "Aggregated regional store",
                "90 days rolling deletion",
              ],
            },
          ],
        },
      },
      {
        id: "privacy-rights",
        number: "4",
        title: "Access, Export, and Deletion Rights",
        plainSummary:
          "You can ask for a machine-readable JSON copy of your records or demand full erasure directly from the Data Request panel on this page.",
        paragraphs: [
          "Under GDPR, CCPA, and Singapore PDPA principles, you have the right to inspect held records, correct inaccurate organization metadata, export project archives in JSON format, or request permanent account deletion.",
          "Requests submitted via the DSAR form below are logged with a verification reference and answered by our privacy team within 7 to 30 calendar days.",
        ],
      },
    ],
  },
  {
    key: "terms",
    tabLabel: "Terms of Service",
    title: "Terms of Service",
    docCode: "TERMS-2026-11",
    summary:
      "Contractual rules governing access to the Hudbird website workspace, hosted documentation tools, commercial components, and support guarantees.",
    contactEmail: "legal@hudbird.io",
    jurisdiction: "Republic of Singapore",
    clauses: [
      {
        id: "terms-ownership",
        number: "1",
        title: "Workspace Access & Account Ownership",
        plainSummary:
          "Your company owns every website, React file, and JSON template generated in the builder. Keep credentials restricted to authorized team seats.",
        paragraphs: [
          "By creating a workspace or installing licensed builder packages, you confirm that you act on behalf of yourself or a legally registered organization.",
          "You retain 100% ownership over all application source code, copy, media assets, and customized React output exported from the builder.",
          "Account holders are responsible for rotating compromised access tokens and keeping seat assignments aligned with current engineering team members.",
        ],
      },
      {
        id: "terms-acceptable-use",
        number: "2",
        title: "Permitted Production Use",
        plainSummary:
          "Ship unlimited client websites and commercial SaaS products. Do not repackage our paid library into a competing UI kit or template marketplace.",
        paragraphs: [
          "Commercial subscribers may build, host, and monetize internal applications, public SaaS storefronts, and commissioned client web projects without per-domain royalties.",
          "Automated scraping of hosted preview bundles, credential sharing across unaffiliated agencies, or reselling standalone component source files as a competing starter library is prohibited.",
        ],
      },
      {
        id: "terms-billing",
        number: "3",
        title: "Subscriptions, Renewals, and Cancellations",
        plainSummary:
          "Cancel anytime before renewal from your billing panel. Already downloaded code from paid perpetual versions keeps working forever.",
        paragraphs: [
          "Paid team plans renew according to the billing cycle selected at checkout. Cancellation stops future recurring charges while keeping workspace access active through the end of the current paid period.",
          "Refund requests for duplicate charges or unused annual seats are reviewed within 14 calendar days of the original invoice date by contacting billing@hudbird.io.",
        ],
      },
      {
        id: "terms-liability",
        number: "4",
        title: "Warranties, Liability Cap & Governing Law",
        plainSummary:
          "We fix verified component bugs promptly, provide software as-is without consequential damages, and resolve formal disputes under Singapore law.",
        paragraphs: [
          "While every release undergoes automated regression testing and accessibility checks, software components are provided without implied warranties of fitness for regulated medical, aviation, or critical financial clearing infrastructure.",
          "Total aggregate liability for paid workspace claims will not exceed the fees paid by your organization during the twelve months preceding the claim.",
        ],
      },
    ],
  },
  {
    key: "cookies",
    tabLabel: "Cookie Policy",
    title: "Cookie & Storage Policy",
    docCode: "COOK-2026-11",
    summary:
      "Exact list of browser cookies and localStorage keys written by Hudbird preview tools, why each exists, and how long it stays.",
    contactEmail: "privacy@hudbird.io",
    jurisdiction: "ePrivacy & GDPR Ready",
    clauses: [
      {
        id: "cookies-essential",
        number: "1",
        title: "Essential Session Storage",
        plainSummary:
          "Small keys remember your dark/light theme choice, active route, and CSRF session guard. The editor cannot function safely without these.",
        paragraphs: [
          "Strictly necessary keys preserve security tokens, theme contrast mode, and active project draft state inside your browser so unsaved edits survive accidental tab reloads.",
          "Essential entries contain zero cross-site tracking identifiers and cannot be switched off inside the workspace preferences panel.",
        ],
      },
      {
        id: "cookies-diagnostics",
        number: "2",
        title: "Optional Analytics & Preview Diagnostics",
        plainSummary:
          "Analytics and error telemetry stay off unless you opt in or keep diagnostics active to measure broken docs routes.",
        paragraphs: [
          "When enabled, optional preview diagnostics store aggregated viewport breakpoint counts and interaction latency in memory without recording keystrokes or form contents.",
          "Marketing websites built with Hudbird templates do not bundle hidden tracking scripts by default; you control which consent banner or analytics vendor runs on your deployed domain.",
        ],
      },
      {
        id: "cookies-inventory",
        number: "3",
        title: "Active Cookie & Storage Inventory",
        plainSummary:
          "Inspect every local key and cookie name before toggling switches in Section 3 below.",
        paragraphs: [
          "The inventory table below reflects the complete storage footprint created by the documentation builder and marketing preview runtime.",
        ],
        table: {
          headers: ["Storage Key", "Purpose & Category", "Lifespan"],
          rows: [
            {
              cells: [
                "hb_session_theme",
                "Essential UI color scheme preference",
                "Local session / 365 days",
              ],
            },
            {
              cells: [
                "hb_consent_v2",
                "Essential consent choices record",
                "12 months from last save",
              ],
            },
            {
              cells: ["hb_preview_diag", "Optional viewport & layout timing", "Session only"],
            },
            {
              cells: ["hb_err_sample", "Optional boundary error reference", "30 days rolling"],
            },
          ],
        },
      },
      {
        id: "cookies-controls",
        number: "4",
        title: "Browser-Level Opt-Out Controls",
        plainSummary:
          "Besides our built-in preference switches below, you can clear browser storage at any time via DevTools or privacy extensions.",
        paragraphs: [
          "Clearing site storage in Chromium, Firefox, or Safari immediately resets saved draft projects and optional preferences to factory defaults.",
        ],
      },
    ],
  },
  {
    key: "license",
    tabLabel: "MIT & Pro License",
    title: "MIT & Pro License",
    docCode: "LIC-2026-11",
    summary:
      "Clear breakdown separating open-source MIT core primitives from commercial marketing blocks and visual page templates.",
    contactEmail: "licensing@hudbird.io",
    jurisdiction: "Dual MIT / Commercial Terms",
    clauses: [
      {
        id: "license-mit-core",
        number: "1",
        title: "Open-Source MIT Core Primitives",
        plainSummary:
          "@hudbird/ui components and @hudbird/theme tokens are 100% MIT licensed for personal, open-source, and commercial shipping.",
        paragraphs: [
          "Core UI primitives (Button, Input, Select, Switch, Tabs, Dialog, Calendar, Badge, and typography tokens) are released under the standard MIT License.",
          "You may fork, modify, statically compile, and redistribute applications incorporating MIT core primitives free of charge when preserving the copyright header in source redistributions.",
        ],
      },
      {
        id: "license-pro-blocks",
        number: "2",
        title: "Commercial Marketing & Builder Sections",
        plainSummary:
          "Pre-assembled marketing sections, landing templates, and full-page compositions require an active team seat for commercial distribution.",
        paragraphs: [
          "Commercial sections such as multi-layout Landing Heroes, Interactive Pricing Comparisons, Editorial Blog flows, Contact centers, and Legal pages belong to your licensed Hudbird Pro workspace.",
          "Each licensed engineer editing components directly must hold a seat on the team plan; designers, product managers, and deployed end users viewing exported builds do not require extra seats.",
        ],
      },
      {
        id: "license-matrix",
        number: "3",
        title: "Permitted vs. Restricted Distribution Matrix",
        plainSummary:
          "Use Pro blocks in client work freely. Do not publish raw paid block code inside public Figma kits, Tailwind templates, or UI marketplaces.",
        paragraphs: [
          "Refer to the matrix below before embedding commercial templates into open-source boilerplates or multi-tenant SaaS page builders.",
        ],
        table: {
          headers: ["Distribution Scenario", "MIT Core", "Pro Sections"],
          rows: [
            {
              cells: ["Live commercial SaaS website", "Permitted", "Permitted with active seat"],
            },
            {
              cells: [
                "Client agency delivery (compiled app)",
                "Permitted",
                "Permitted per agency license",
              ],
            },
            {
              cells: ["Open-source GitHub starter kit", "Permitted", "Not permitted"],
            },
            {
              cells: ["Competing theme or UI kit resale", "Conditional (MIT notice)", "Prohibited"],
            },
          ],
        },
      },
      {
        id: "license-attribution",
        number: "4",
        title: "Copyright Notices & Compliance Questions",
        plainSummary:
          "Compiled production bundles need zero visible Powered-by badges. Email licensing@hudbird.io for OEM white-label builders.",
        paragraphs: [
          "Websites compiled for production deployment are never required to display public Hudbird footer badges or attribution links.",
          "Teams embedding our visual website builder inside a SaaS product for third-party end users require a separate OEM distribution agreement.",
        ],
      },
    ],
  },
];

export function buildLegalPlainText(
  doc: LegalDocumentDefinition,
  version: LegalVersionOption,
  brandName: string
): string {
  const divider = "=".repeat(64);
  const lines: string[] = [
    `${brandName} - ${doc.title}`,
    `Document Code: ${doc.docCode}`,
    `Version: ${version.label}`,
    `Effective Date: ${version.effectiveDate}`,
    `Jurisdiction: ${doc.jurisdiction}`,
    `Contact: ${doc.contactEmail}`,
    divider,
    "",
    doc.summary,
    "",
  ];

  for (const clause of doc.clauses) {
    lines.push(`${clause.number}. ${clause.title}`);
    lines.push("-".repeat(48));
    lines.push(`Plain Summary: ${clause.plainSummary}`);
    lines.push("");
    for (const p of clause.paragraphs) {
      lines.push(p);
      lines.push("");
    }
    if (clause.table) {
      lines.push(clause.table.headers.join(" | "));
      for (const row of clause.table.rows) {
        lines.push(row.cells.join(" | "));
      }
      lines.push("");
    }
  }

  return lines.join("\n");
}

export function downloadLegalText(
  doc: LegalDocumentDefinition,
  version: LegalVersionOption,
  brandName: string
): boolean {
  if (typeof window === "undefined" || typeof document === "undefined") {
    return false;
  }

  const content = buildLegalPlainText(doc, version, brandName);
  const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${doc.key}-${version.id}.txt`;
  link.style.display = "none";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
  return true;
}
