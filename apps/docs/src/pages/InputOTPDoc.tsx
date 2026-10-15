// apps/docs/src/pages/InputOTPDoc.tsx
import React, { useState } from "react";
import inputOtpCode from "../../../../packages/core/src/components/InputOTP/InputOTP.tsx?raw";
import { InstallationTabs } from "../components/InstallationTabs";
import { PageToolbar } from "../components/PageToolbar";
import { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator, Button } from "@hudbird/ui";
import { ComponentPreview } from "../components/ComponentPreview";
import { CodeBlock } from "../components/CodeBlock";
import { ApiTable, type ApiPropRow } from "../components/ApiTable";
import { CheckCircle2, RotateCcw, ShieldCheck } from "lucide-react";

export const inputOtpTocItems = [
  { id: "installation", title: "Installation" },
  { id: "component-api", title: "Component API" },
  {
    id: "examples",
    title: "Examples",
    children: [
      { id: "six-digit-otp", title: "6-Digit OTP with Separator" },
      { id: "four-digit-pin", title: "4-Digit PIN Code" },
      { id: "otp-sizes", title: "Sizes & Radii" },
      { id: "validation-states", title: "Validation & Error States" },
      { id: "interactive-customizer", title: "Interactive Verification" },
    ],
  },
];

export default function InputOTPDoc() {
  const [heroValue, setHeroValue] = useState("");
  const [heroComplete, setHeroComplete] = useState(false);

  const [pinValue, setPinValue] = useState("");
  const [errorValue, setErrorValue] = useState("123");
  const [customizerValue, setCustomizerValue] = useState("");
  const [customizerSize, setCustomizerSize] = useState<"sm" | "md" | "lg">("md");
  const [customizerRadius, setCustomizerRadius] = useState<"none" | "sm" | "md" | "lg" | "full">(
    "md"
  );
  const [customizerInvalid, setCustomizerInvalid] = useState(false);

  const apiRows: ApiPropRow[] = [
    {
      prop: "maxLength",
      type: "number",
      defaultVal: "6",
      description: "Total number of code digits/slots accepted by the input.",
    },
    {
      prop: "value",
      type: "string",
      defaultVal: "undefined",
      description: "Controlled string value of the OTP input.",
    },
    {
      prop: "defaultValue",
      type: "string",
      defaultVal: "''",
      description: "Default unmanaged string value.",
    },
    {
      prop: "onChange",
      type: "(value: string) => void",
      defaultVal: "undefined",
      description: "Callback fired whenever the input value changes.",
    },
    {
      prop: "onComplete",
      type: "(value: string) => void",
      defaultVal: "undefined",
      description: "Callback fired when all slots have been completely filled.",
    },
    {
      prop: "size",
      type: "'sm' | 'md' | 'lg'",
      defaultVal: "'md'",
      description: "Slot dimension scale: sm (36px), md (44px), lg (52px).",
    },
    {
      prop: "radius",
      type: "'none' | 'sm' | 'md' | 'lg' | 'full'",
      defaultVal: "'md'",
      description: "Border radius applied to slot corners.",
    },
    {
      prop: "isInvalid",
      type: "boolean",
      defaultVal: "false",
      description: "Renders red error styling across all slots when true.",
    },
    {
      prop: "disabled",
      type: "boolean",
      defaultVal: "false",
      description: "Disables interaction and applies muted opacity.",
    },
    {
      prop: "pattern",
      type: "string",
      defaultVal: "'^[0-9]*$'",
      description: "Regex pattern used to sanitize typed/pasted characters.",
    },
  ];

  return (
    <div className="space-y-16 pb-24">
      {/* Title & Introduction */}
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div className="w-full min-w-0 flex-1 pr-4">
          <div className="mb-3 flex items-center gap-3">
            <h1 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl dark:text-zinc-50">
              Input OTP
            </h1>
            <span className="rounded-full border border-indigo-500/20 bg-indigo-500/10 px-2 py-0.5 text-xs font-semibold text-indigo-600 dark:text-indigo-400">
              Component
            </span>
          </div>
          <p className="pr-32 text-base text-zinc-600 sm:pr-40 dark:text-zinc-400">
            Accessible, modern one-time password and PIN verification inputs with auto-advance,
            backspace handling, separator groups, and clipboard paste support.
          </p>
        </div>
        <PageToolbar />
      </div>

      {/* Hero Showcase Preview */}
      <section className="space-y-4">
        <ComponentPreview>
          <div className="flex flex-col items-center justify-center gap-6 py-6 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-zinc-100 text-zinc-900 shadow-xs dark:bg-zinc-800 dark:text-zinc-50">
              <ShieldCheck className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
            </div>
            <div className="space-y-1">
              <h4 className="font-semibold text-zinc-900 dark:text-zinc-50">
                Two-Factor Authentication
              </h4>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                Enter the 6-digit code sent to your registered authenticator device
              </p>
            </div>

            <InputOTP
              maxLength={6}
              value={heroValue}
              onChange={(val) => {
                setHeroValue(val);
                setHeroComplete(false);
              }}
              onComplete={() => setHeroComplete(true)}
            >
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
              </InputOTPGroup>
              <InputOTPSeparator />
              <InputOTPGroup>
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>

            {heroComplete && (
              <div className="animate-in fade-in-50 flex items-center gap-1.5 text-xs font-medium text-emerald-600 dark:text-emerald-400">
                <CheckCircle2 className="h-4 w-4" />
                Code complete ({heroValue}) - ready for verification
              </div>
            )}
          </div>
        </ComponentPreview>

        <CodeBlock
          code={`import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator,
} from "@hudbird/ui";

export default function VerificationDemo() {
  const [value, setValue] = useState("");

  return (
    <InputOTP
      maxLength={6}
      value={value}
      onChange={setValue}
      onComplete={(code) => console.log("Verifying code:", code)}
    >
      <InputOTPGroup>
        <InputOTPSlot index={0} />
        <InputOTPSlot index={1} />
        <InputOTPSlot index={2} />
      </InputOTPGroup>
      <InputOTPSeparator />
      <InputOTPGroup>
        <InputOTPSlot index={3} />
        <InputOTPSlot index={4} />
        <InputOTPSlot index={5} />
      </InputOTPGroup>
    </InputOTP>
  );
}`}
        />
      </section>

      {/* Installation */}
      <section id="installation" className="scroll-mt-24 space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
          Installation
        </h2>
        <InstallationTabs componentName="InputOTP" manualCode={inputOtpCode} />
      </section>

      {/* Component API */}
      <section id="component-api" className="scroll-mt-24 space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
          Component API
        </h2>
        <ApiTable
          note="InputOTP wraps a native hidden input with tabIndex and ARIA inputmode='numeric', guaranteeing full accessibility and mobile keyboard compatibility."
          rows={apiRows}
        />
      </section>

      {/* Examples */}
      <section id="examples" className="scroll-mt-24 space-y-12">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            Examples
          </h2>
        </div>

        {/* 1. Six digit */}
        <div id="six-digit-otp" className="scroll-mt-24 space-y-4">
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
            6-Digit OTP with Separator
          </h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Organize slots into two distinct chunks with a middle separator for high legibility.
          </p>
          <ComponentPreview>
            <div className="flex justify-center py-4">
              <InputOTP maxLength={6}>
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                </InputOTPGroup>
                <InputOTPSeparator />
                <InputOTPGroup>
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
            </div>
          </ComponentPreview>
        </div>

        {/* 2. Four digit PIN */}
        <div id="four-digit-pin" className="scroll-mt-24 space-y-4">
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
            4-Digit PIN Code
          </h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Single group ideal for transaction PIN authorization and ATM-style security codes.
          </p>
          <ComponentPreview>
            <div className="flex flex-col items-center gap-3 py-4">
              <InputOTP maxLength={4} value={pinValue} onChange={setPinValue}>
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                </InputOTPGroup>
              </InputOTP>
              <span className="text-xs text-zinc-400">Value: {pinValue ? pinValue : "empty"}</span>
            </div>
          </ComponentPreview>
        </div>

        {/* 3. Sizes & Radii */}
        <div id="otp-sizes" className="scroll-mt-24 space-y-4">
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
            Sizes & Corner Radii
          </h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Supports <code className="text-xs">sm</code>, <code className="text-xs">md</code>, and{" "}
            <code className="text-xs">lg</code> dimensions alongside rounded options.
          </p>
          <ComponentPreview>
            <div className="flex flex-col items-center gap-6 py-4">
              <div className="flex flex-col items-center gap-2">
                <span className="font-mono text-xs text-zinc-400">size="sm" radius="sm"</span>
                <InputOTP maxLength={4} size="sm" radius="sm">
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                  </InputOTPGroup>
                </InputOTP>
              </div>

              <div className="flex flex-col items-center gap-2">
                <span className="font-mono text-xs text-zinc-400">
                  size="md" radius="md" (Default)
                </span>
                <InputOTP maxLength={4} size="md" radius="md">
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                  </InputOTPGroup>
                </InputOTP>
              </div>

              <div className="flex flex-col items-center gap-2">
                <span className="font-mono text-xs text-zinc-400">size="lg" radius="lg"</span>
                <InputOTP maxLength={4} size="lg" radius="lg">
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                  </InputOTPGroup>
                </InputOTP>
              </div>
            </div>
          </ComponentPreview>
        </div>

        {/* 4. Validation States */}
        <div id="validation-states" className="scroll-mt-24 space-y-4">
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
            Validation & Error States
          </h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Render distinct red error outlines when code validation fails or expires.
          </p>
          <ComponentPreview>
            <div className="flex flex-col items-center gap-3 py-4">
              <InputOTP maxLength={6} value={errorValue} onChange={setErrorValue} isInvalid>
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                </InputOTPGroup>
                <InputOTPSeparator />
                <InputOTPGroup>
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
              <p className="text-xs font-medium text-rose-600 dark:text-rose-500">
                Invalid verification code. Please check your authenticator and retry.
              </p>
            </div>
          </ComponentPreview>
        </div>

        {/* 5. Interactive Verification Customizer */}
        <div id="interactive-customizer" className="scroll-mt-24 space-y-4">
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
            Interactive Verification
          </h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Configure dimensions, corner radii, and error state dynamically in real-time.
          </p>
          <ComponentPreview>
            <div className="space-y-6">
              <div className="flex flex-wrap items-center justify-center gap-3 rounded-xl border border-zinc-200/80 bg-zinc-50/50 p-4 dark:border-zinc-800 dark:bg-zinc-900/40">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-zinc-500">Size:</span>
                  {(["sm", "md", "lg"] as const).map((sz) => (
                    <Button
                      key={sz}
                      size="sm"
                      variant={customizerSize === sz ? "solid" : "outline"}
                      onClick={() => setCustomizerSize(sz)}
                    >
                      {sz}
                    </Button>
                  ))}
                </div>

                <div className="h-4 w-px bg-zinc-200 dark:bg-zinc-800" />

                <div className="flex items-center gap-2">
                  <span className="text-xs text-zinc-500">Radius:</span>
                  {(["none", "sm", "md", "lg", "full"] as const).map((r) => (
                    <Button
                      key={r}
                      size="sm"
                      variant={customizerRadius === r ? "solid" : "outline"}
                      onClick={() => setCustomizerRadius(r)}
                    >
                      {r}
                    </Button>
                  ))}
                </div>

                <div className="h-4 w-px bg-zinc-200 dark:bg-zinc-800" />

                <Button
                  size="sm"
                  variant={customizerInvalid ? "solid" : "outline"}
                  color={customizerInvalid ? "danger" : "default"}
                  onClick={() => setCustomizerInvalid(!customizerInvalid)}
                >
                  {customizerInvalid ? "Error Active" : "Toggle Error"}
                </Button>

                <Button size="sm" variant="outline" onClick={() => setCustomizerValue("")}>
                  <RotateCcw className="mr-1 h-3.5 w-3.5" />
                  Reset
                </Button>
              </div>

              <div className="flex flex-col items-center justify-center py-6">
                <InputOTP
                  maxLength={6}
                  size={customizerSize}
                  radius={customizerRadius}
                  isInvalid={customizerInvalid}
                  value={customizerValue}
                  onChange={setCustomizerValue}
                >
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                  </InputOTPGroup>
                  <InputOTPSeparator />
                  <InputOTPGroup>
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </div>
            </div>
          </ComponentPreview>
        </div>
      </section>
    </div>
  );
}
