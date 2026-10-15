// apps/docs/src/pages/FormDoc.tsx
import React, { useState } from "react";
import formCode from "../../../../packages/core/src/components/Form/Form.tsx?raw";
import { InstallationTabs } from "../components/InstallationTabs";
import { PageToolbar } from "../components/PageToolbar";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  Input,
  Textarea,
  Button,
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator,
} from "@hudbird/ui";
import { useForm } from "react-hook-form";
import { ComponentPreview } from "../components/ComponentPreview";
import { CodeBlock } from "../components/CodeBlock";
import { ApiTable, type ApiPropRow } from "../components/ApiTable";
import { CheckCircle2, Send, ShieldAlert, Sparkles } from "lucide-react";

export const formTocItems = [
  { id: "installation", title: "Installation" },
  { id: "component-api", title: "Component API" },
  {
    id: "examples",
    title: "Examples",
    children: [
      { id: "basic-form", title: "Single Field Validation" },
      { id: "otp-integration", title: "Form with InputOTP" },
      { id: "textarea-form", title: "Feedback & Multiline Fields" },
      { id: "validation-states", title: "Realtime Validation Behavior" },
    ],
  },
];

// ----------------------------------------------------
// Demo 1: Hero Profile Form (Self-contained)
// ----------------------------------------------------
type HeroFormValues = {
  username: string;
  email: string;
};

function HeroFormDemo() {
  const [submittedData, setSubmittedData] = useState<HeroFormValues | null>(null);

  const form = useForm<HeroFormValues>({
    defaultValues: {
      username: "",
      email: "",
    },
  });

  const onSubmit = (data: HeroFormValues) => {
    setSubmittedData(data);
  };

  return (
    <div className="mx-auto w-full max-w-md py-4">
      <Form {...form}>
        <form noValidate onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <FormField
            control={form.control}
            name="username"
            rules={{
              required: "Username is required",
              minLength: {
                value: 3,
                message: "Must be at least 3 characters",
              },
            }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. alex_chen" {...field} />
                </FormControl>
                <FormDescription>
                  This will be your unique handle across the platform.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            rules={{
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Please enter a valid email address",
              },
            }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Work Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="alex@company.com" {...field} />
                </FormControl>
                <FormDescription>We will send verification instructions here.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="pt-2">
            <Button type="submit" color="primary" className="w-full">
              <Send className="mr-2 h-4 w-4" />
              Save Account Settings
            </Button>
          </div>
        </form>
      </Form>

      {submittedData && (
        <div className="animate-in fade-in-50 mt-6 rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-4 text-emerald-800 dark:text-emerald-300">
          <div className="flex items-center gap-2 text-sm font-medium">
            <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
            Account settings saved:
          </div>
          <pre className="mt-2 overflow-x-auto rounded-lg bg-white/60 p-2.5 font-mono text-xs dark:bg-black/40">
            {JSON.stringify(submittedData, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}

// ----------------------------------------------------
// Demo 2: Basic Single Field Form (Self-contained)
// ----------------------------------------------------
type BasicFormValues = {
  username: string;
};

function BasicFormDemo() {
  const [result, setResult] = useState<BasicFormValues | null>(null);

  const form = useForm<BasicFormValues>({
    defaultValues: {
      username: "",
    },
  });

  const onSubmit = (data: BasicFormValues) => {
    setResult(data);
  };

  return (
    <div className="mx-auto w-full max-w-sm py-2">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="username"
            rules={{
              required: "Username is required",
              minLength: {
                value: 3,
                message: "Username must be at least 3 characters",
              },
            }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="Enter username" {...field} />
                </FormControl>
                <FormDescription>Your unique user handle.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" size="sm">
            Validate & Submit
          </Button>
        </form>
      </Form>

      {result && (
        <div className="animate-in fade-in-50 mt-4 rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-3 text-xs font-medium text-emerald-700 dark:text-emerald-400">
          <div className="flex items-center gap-1.5 font-semibold">
            <CheckCircle2 className="h-4 w-4" />
            Single field valid:
          </div>
          <pre className="mt-1 rounded bg-white/50 p-2 font-mono text-[11px] dark:bg-black/30">
            {JSON.stringify(result, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}

// ----------------------------------------------------
// Demo 3: OTP Form (Self-contained)
// ----------------------------------------------------
type OtpFormValues = {
  pin: string;
};

function OtpFormDemo() {
  const [result, setResult] = useState<OtpFormValues | null>(null);

  const form = useForm<OtpFormValues>({
    defaultValues: {
      pin: "",
    },
  });

  const onSubmit = (data: OtpFormValues) => {
    setResult(data);
  };

  return (
    <div className="mx-auto w-full max-w-sm py-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <FormField
            control={form.control}
            name="pin"
            rules={{
              required: "6-digit code is required",
              minLength: {
                value: 6,
                message: "Please enter all 6 digits",
              },
            }}
            render={({ field, fieldState }) => (
              <FormItem className="flex flex-col items-center">
                <FormLabel>Security Authorization Code</FormLabel>
                <FormControl>
                  <InputOTP
                    maxLength={6}
                    value={field.value}
                    onChange={field.onChange}
                    isInvalid={!!fieldState.error}
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
                </FormControl>
                <FormDescription>Enter the code from your mobile banking app.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-center">
            <Button type="submit" color="primary" size="sm">
              Authorize Transfer
            </Button>
          </div>
        </form>
      </Form>

      {result && (
        <div className="animate-in fade-in-50 mt-4 rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-3 text-center text-xs font-medium text-emerald-700 dark:text-emerald-400">
          <div className="flex items-center justify-center gap-1.5 font-semibold">
            <CheckCircle2 className="h-4 w-4" />
            PIN Verified:
          </div>
          <span className="mt-1 block font-mono text-sm font-bold tracking-widest">
            {result.pin}
          </span>
        </div>
      )}
    </div>
  );
}

// ----------------------------------------------------
// Demo 4: Textarea Form (Self-contained)
// ----------------------------------------------------
type TextareaFormValues = {
  bio: string;
};

function TextareaFormDemo() {
  const [result, setResult] = useState<TextareaFormValues | null>(null);

  const form = useForm<TextareaFormValues>({
    defaultValues: {
      bio: "",
    },
  });

  const onSubmit = (data: TextareaFormValues) => {
    setResult(data);
  };

  return (
    <div className="mx-auto w-full max-w-sm py-2">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="bio"
            rules={{
              required: "Bio description is required",
              maxLength: {
                value: 120,
                message: "Bio cannot exceed 120 characters",
              },
            }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Platform Bio</FormLabel>
                <FormControl>
                  <Textarea placeholder="Tell us about yourself..." rows={3} {...field} />
                </FormControl>
                <FormDescription>Brief summary shown on your public profile.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" size="sm" variant="outline">
            Save Bio
          </Button>
        </form>
      </Form>

      {result && (
        <div className="animate-in fade-in-50 mt-4 rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-3 text-xs font-medium text-emerald-700 dark:text-emerald-400">
          <div className="flex items-center gap-1.5 font-semibold">
            <CheckCircle2 className="h-4 w-4" />
            Bio saved:
          </div>
          <p className="mt-1 rounded bg-white/50 p-2 text-xs italic dark:bg-black/30">
            "{result.bio}"
          </p>
        </div>
      )}
    </div>
  );
}

export default function FormDoc() {
  const apiRows: ApiPropRow[] = [
    {
      prop: "<Form />",
      type: "FormProvider",
      defaultVal: "-",
      description: "Root context provider wrapping React Hook Form's FormProvider.",
    },
    {
      prop: "<FormField />",
      type: "ControllerProps",
      defaultVal: "-",
      description:
        "Controls a single field binding using RHF Controller, exposing field & fieldState.",
    },
    {
      prop: "<FormItem />",
      type: "HTMLDivElement",
      defaultVal: "-",
      description:
        "Layout wrapper generating accessible unique IDs for label, control, and messages.",
    },
    {
      prop: "<FormLabel />",
      type: "HTMLLabelElement",
      defaultVal: "-",
      description: "Semantic label automatically linked via htmlFor to the input control ID.",
    },
    {
      prop: "<FormControl />",
      type: "Slot",
      defaultVal: "-",
      description:
        "Polymorphic slot forwarding id, aria-describedby, and aria-invalid to child input.",
    },
    {
      prop: "<FormDescription />",
      type: "HTMLParagraphElement",
      defaultVal: "-",
      description: "Accessible hint paragraph bound to aria-describedby of the input control.",
    },
    {
      prop: "<FormMessage />",
      type: "HTMLParagraphElement",
      defaultVal: "-",
      description:
        "Error message paragraph rendered with red styling and aria-describedby linkage.",
    },
    {
      prop: "useFormField()",
      type: "Hook",
      defaultVal: "-",
      description:
        "Hook exposing { id, name, formItemId, formDescriptionId, formMessageId, error }.",
    },
  ];

  return (
    <div className="space-y-16 pb-24">
      {/* Title & Introduction */}
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div className="w-full min-w-0 flex-1 pr-4">
          <div className="mb-3 flex items-center gap-3">
            <h1 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl dark:text-zinc-50">
              Form
            </h1>
            <span className="rounded-full border border-indigo-500/20 bg-indigo-500/10 px-2 py-0.5 text-xs font-semibold text-indigo-600 dark:text-indigo-400">
              Component
            </span>
          </div>
          <p className="pr-32 text-base text-zinc-600 sm:pr-40 dark:text-zinc-400">
            Comprehensive form orchestration built on React Hook Form and accessible Slot
            primitives, automatically managing ARIA associations, focus flow, and validation states.
          </p>
        </div>
        <PageToolbar />
      </div>

      {/* Hero Showcase Preview */}
      <section className="space-y-4">
        <ComponentPreview>
          <HeroFormDemo />
        </ComponentPreview>

        <CodeBlock
          code={`import { useForm } from "react-hook-form";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  Input,
  Button,
} from "@hudbird/ui";

export default function AccountForm() {
  const form = useForm({
    defaultValues: { username: "", email: "" },
  });

  const onSubmit = (data) => console.log(data);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="username"
          rules={{ required: "Username is required" }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="username" {...field} />
              </FormControl>
              <FormDescription>Your public platform handle.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}`}
        />
      </section>

      {/* Installation */}
      <section id="installation" className="scroll-mt-24 space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
          Installation
        </h2>
        <InstallationTabs componentName="Form" manualCode={formCode} />
      </section>

      {/* Component API */}
      <section id="component-api" className="scroll-mt-24 space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
          Component API
        </h2>
        <ApiTable
          note="Form components seamlessly coordinate unique React useId() hooks across labels, inputs, descriptions, and error spans, ensuring 100% WCAG 2.1 AA compliance."
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

        {/* 1. Basic Form */}
        <div id="basic-form" className="scroll-mt-24 space-y-4">
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
            Single Field Validation
          </h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Clean form field with individual validation rules and automatic focus management.
          </p>
          <ComponentPreview>
            <BasicFormDemo />
          </ComponentPreview>
        </div>

        {/* 2. OTP Form Integration */}
        <div id="otp-integration" className="scroll-mt-24 space-y-4">
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
            Form with InputOTP
          </h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Demonstrating how <code className="text-xs">FormControl</code> leverages{" "}
            <code className="text-xs">Slot</code> to wire validation and accessibility directly into
            customized components like <code className="text-xs">InputOTP</code>.
          </p>
          <ComponentPreview>
            <OtpFormDemo />
          </ComponentPreview>
        </div>

        {/* 3. Textarea Form */}
        <div id="textarea-form" className="scroll-mt-24 space-y-4">
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
            Feedback & Multiline Fields
          </h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Works universally across all BlankUI input elements including Textarea and ComboBox.
          </p>
          <ComponentPreview>
            <TextareaFormDemo />
          </ComponentPreview>
        </div>

        {/* 4. Realtime Validation States */}
        <div id="validation-states" className="scroll-mt-24 space-y-4">
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
            Realtime Validation Behavior
          </h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Labels automatically transition to <code className="text-xs">text-rose-600</code> and
            error text animates smoothly into view when validation fails.
          </p>
          <ComponentPreview>
            <div className="mx-auto w-full max-w-sm py-4">
              <div className="flex items-center gap-2 rounded-lg bg-rose-50 p-3 text-xs text-rose-700 dark:bg-rose-950/20 dark:text-rose-400">
                <ShieldAlert className="h-4 w-4 shrink-0" />
                <span>
                  Validation errors automatically set{" "}
                  <code className="font-mono">aria-invalid="true"</code> on the active control
                  element.
                </span>
              </div>
            </div>
          </ComponentPreview>
        </div>
      </section>
    </div>
  );
}
