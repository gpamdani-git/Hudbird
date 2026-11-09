import React, { useState } from "react";
import type { BrandProfile, SharedBlockSelection, SharedPageCategorySlug } from "@hudbird/schemas";
import {
  Alert,
  Avatar,
  Badge,
  Button,
  Card,
  CardBody,
  CardHeader,
  Checkbox,
  DescriptionList,
  DescriptionListItem,
  DescriptionListLabel,
  DescriptionListValue,
  Divider,
  Grid,
  Heading,
  IconBox,
  Input,
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
  Text,
} from "@hudbird/ui";
import {
  ArrowLeft,
  ArrowUpRight,
  BookOpen,
  CheckCircle2,
  Compass,
  FileCode2,
  KeyRound,
  Lock,
  Mail,
  ShieldCheck,
  Sparkles,
  Terminal,
  UserPlus,
} from "lucide-react";
import { getSharedPageCategory } from "./catalog";

export interface SharedBlockRendererProps {
  block: SharedBlockSelection;
  brand: BrandProfile;
  category: SharedPageCategorySlug;
}

export const SharedBlockRenderer: React.FC<SharedBlockRendererProps> = ({
  block,
  brand,
  category,
}) => {
  const [otpValue, setOtpValue] = useState("482910");
  const [submittedMessage, setSubmittedMessage] = useState<string | null>(null);

  if (!block.enabled) return null;

  const categoryDef = getSharedPageCategory(category);
  const brandDomain = `${brand.id || "hudbird"}.dev`;

  switch (block.type) {
    case "brand-bar": {
      return (
        <div
          data-shared-block="brand-bar"
          data-variant={block.variant}
          className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-200/80 px-6 py-4 dark:border-white/[0.08]"
        >
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-zinc-900 text-xs font-bold text-white dark:bg-white dark:text-zinc-950">
              {brand.name.slice(0, 2).toUpperCase()}
            </div>
            <div>
              <span className="text-sm font-bold tracking-tight text-zinc-950 dark:text-white">
                {brand.name}
              </span>
              <span className="ml-2 font-mono text-[11px] text-zinc-500 dark:text-zinc-400">
                {brandDomain}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge size="sm" variant="flat" color="primary">
              Shared: Application UI + Marketing
            </Badge>
            {block.variant === "back-link-bar" && (
              <Button size="sm" variant="ghost">
                <ArrowLeft className="mr-1.5 h-3.5 w-3.5" />
                Return to Workspace
              </Button>
            )}
          </div>
        </div>
      );
    }

    case "core-flow": {
      if (block.variant === "signup-form") {
        return (
          <div data-shared-block="core-flow" data-variant={block.variant} className="space-y-5">
            <div className="space-y-2">
              <div className="flex items-center gap-2.5">
                <IconBox size="sm" variant="brand" icon={UserPlus} showGlow={false} />
                <Badge size="sm" variant="flat" color="primary">
                  {categoryDef.badge}
                </Badge>
              </div>
              <Heading as="h3" className="text-2xl font-bold tracking-tight">
                Create your {brand.name} workspace
              </Heading>
              <Text className="text-xs text-zinc-500 dark:text-zinc-400">
                Provision a dedicated tenant on {brandDomain} with full Base UI + Page Builder
                access.
              </Text>
            </div>

            {submittedMessage && (
              <Alert
                variant="flat"
                color="success"
                title="Workspace Provisioned"
                description={submittedMessage}
              />
            )}

            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSubmittedMessage(`Tenant created for ${brand.name}. Verification dispatched.`);
              }}
              className="space-y-4"
            >
              <Grid cols={1} className="gap-3 sm:grid-cols-2">
                <Input label="Full Name" placeholder="Elena Rostova" defaultValue="Elena Rostova" />
                <Input label="Organization" placeholder={brand.name} defaultValue={brand.name} />
              </Grid>
              <Input
                label="Work Email"
                type="email"
                placeholder={`elena@${brandDomain}`}
                defaultValue={`elena@${brandDomain}`}
              />
              <Input
                label="Master Passphrase"
                type="password"
                defaultValue="correct-horse-battery-staple"
                description="Minimum 12 characters with hardware passkey enrollment support."
              />
              <Checkbox defaultChecked>
                <span className="text-xs text-zinc-600 dark:text-zinc-300">
                  I agree to the {brand.name} Master Subscription Agreement & DPA
                </span>
              </Checkbox>
              <Button type="submit" variant="solid" color="primary" className="w-full">
                Provision Workspace
              </Button>
            </form>
          </div>
        );
      }

      if (block.variant === "otp-verification") {
        return (
          <div data-shared-block="core-flow" data-variant={block.variant} className="space-y-5">
            <div className="space-y-2">
              <div className="flex items-center gap-2.5">
                <IconBox size="sm" variant="brand" icon={KeyRound} showGlow={false} />
                <Badge size="sm" variant="flat" color="primary">
                  Step-Up Verification
                </Badge>
              </div>
              <Heading as="h3" className="text-2xl font-bold tracking-tight">
                Verify your security token
              </Heading>
              <Text className="text-xs text-zinc-500 dark:text-zinc-400">
                Enter the 6-digit verification code sent to <strong>security@{brandDomain}</strong>.
              </Text>
            </div>

            <div className="rounded-2xl border border-zinc-200/80 bg-zinc-50/70 p-5 dark:border-white/[0.08] dark:bg-white/[0.02]">
              <div className="flex flex-col items-center gap-4">
                <InputOTP
                  maxLength={6}
                  value={otpValue}
                  onChange={(val) => setOtpValue(val)}
                  aria-label="One-time verification code"
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
                <span className="font-mono text-[11px] text-zinc-500 dark:text-zinc-400">
                  Current token: <strong>{otpValue}</strong> • Valid for 04:59
                </span>
              </div>
            </div>

            <Alert
              variant="flat"
              color="info"
              title="Hardware Security Key Ready"
              description="You can also tap your registered YubiKey / Passkey to complete step-up authentication."
            />

            <div className="flex flex-col gap-2 sm:flex-row">
              <Button variant="solid" color="primary" className="flex-1">
                Verify & Continue
              </Button>
              <Button variant="bordered">Resend Code</Button>
            </div>
          </div>
        );
      }

      if (block.variant === "password-recovery") {
        return (
          <div data-shared-block="core-flow" data-variant={block.variant} className="space-y-5">
            <div className="space-y-2">
              <div className="flex items-center gap-2.5">
                <IconBox size="sm" variant="brand" icon={Lock} showGlow={false} />
                <Badge size="sm" variant="flat" color="warning">
                  Credential Recovery
                </Badge>
              </div>
              <Heading as="h3" className="text-2xl font-bold tracking-tight">
                Reset your workspace credentials
              </Heading>
              <Text className="text-xs text-zinc-500 dark:text-zinc-400">
                We will dispatch a cryptographically signed recovery link valid for 15 minutes.
              </Text>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSubmittedMessage("Signed recovery link dispatched to your verified inbox.");
              }}
              className="space-y-4"
            >
              <Input
                label="Verified Account Email"
                type="email"
                defaultValue={`architect@${brandDomain}`}
              />
              <Alert
                variant="flat"
                color="success"
                title="Zero-Knowledge Recovery Guard"
                description="Active API tokens remain scoped until your new passphrase or passkey is confirmed."
              />
              <Button type="submit" variant="solid" color="primary" className="w-full">
                Send Signed Recovery Link
              </Button>
            </form>
          </div>
        );
      }

      if (block.variant === "error-404") {
        return (
          <div data-shared-block="core-flow" data-variant={block.variant} className="space-y-5">
            <div className="space-y-2">
              <div className="flex items-center gap-2.5">
                <IconBox size="sm" variant="brand" icon={Compass} showGlow={false} />
                <Badge size="sm" variant="flat" color="danger">
                  HTTP 404 • Route Not Found
                </Badge>
              </div>
              <Heading as="h3" className="text-2xl font-bold tracking-tight">
                We could not resolve that blueprint route
              </Heading>
              <Text className="text-xs text-zinc-500 dark:text-zinc-400">
                The requested resource in <strong>{brand.name}</strong> may have moved to a new
                registry namespace or requires elevated permissions.
              </Text>
            </div>

            <div className="rounded-2xl border border-zinc-200/80 bg-zinc-50/80 p-4 font-mono text-xs text-zinc-600 dark:border-white/[0.08] dark:bg-white/[0.02] dark:text-zinc-300">
              <div>trace_id: hb_route_404_99281f</div>
              <div>domain: {brandDomain}</div>
              <div>fallback: /#/builder/studio</div>
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              <Button variant="solid" color="primary">
                Open Studio Page Builder
              </Button>
              <Button variant="bordered">Browse Component Registry</Button>
            </div>
          </div>
        );
      }

      if (block.variant === "transactional-email") {
        return (
          <div data-shared-block="core-flow" data-variant={block.variant} className="space-y-5">
            <div className="flex items-center justify-between rounded-2xl border border-zinc-200/80 bg-zinc-50/90 px-4 py-3 text-xs dark:border-white/[0.08] dark:bg-white/[0.03]">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-indigo-500" />
                <span>
                  <strong>Subject:</strong> You have been invited to join {brand.name} on Hudbird
                  Studio
                </span>
              </div>
              <Badge size="sm" variant="flat" color="success">
                DKIM + SPF Signed
              </Badge>
            </div>

            <Card className="border border-zinc-200/80 dark:border-white/[0.08]">
              <CardHeader className="border-b border-zinc-200/70 p-5 dark:border-white/[0.08]">
                <div className="space-y-1">
                  <Badge size="sm" variant="flat" color="primary">
                    Transactional Email Template
                  </Badge>
                  <Heading as="h4" className="text-lg font-bold">
                    Join the {brand.name} Design & Engineering Workspace
                  </Heading>
                </div>
              </CardHeader>
              <CardBody className="space-y-4 p-5">
                <Text className="text-xs leading-relaxed text-zinc-600 dark:text-zinc-300">
                  Dani Akbar (<strong>dani@{brandDomain}</strong>) invited you to collaborate on{" "}
                  <strong>{brand.name}</strong> with Principal Architect permissions across
                  Application UI, Shared Pages, and Marketing blueprints.
                </Text>
                <DescriptionList variant="card" orientation="horizontal">
                  <DescriptionListItem>
                    <DescriptionListLabel>Workspace Domain</DescriptionListLabel>
                    <DescriptionListValue>{brandDomain}</DescriptionListValue>
                  </DescriptionListItem>
                  <DescriptionListItem>
                    <DescriptionListLabel>Assigned Role</DescriptionListLabel>
                    <DescriptionListValue>Staff Design Engineer</DescriptionListValue>
                  </DescriptionListItem>
                  <DescriptionListItem>
                    <DescriptionListLabel>Invitation Expiry</DescriptionListLabel>
                    <DescriptionListValue>72 hours (Hardware MFA required)</DescriptionListValue>
                  </DescriptionListItem>
                </DescriptionList>
                <div className="flex flex-wrap items-center gap-3 pt-1">
                  <Button variant="solid" color="primary">
                    Accept Workspace Invitation
                  </Button>
                  <Button variant="bordered">Inspect Security Fingerprint</Button>
                </div>
              </CardBody>
            </Card>
          </div>
        );
      }

      return (
        <div data-shared-block="core-flow" data-variant={block.variant} className="space-y-5">
          <div className="space-y-2">
            <div className="flex items-center gap-2.5">
              <IconBox size="sm" variant="brand" icon={ShieldCheck} showGlow={false} />
              <Badge size="sm" variant="flat" color="primary">
                {categoryDef.badge}
              </Badge>
            </div>
            <Heading as="h3" className="text-2xl font-bold tracking-tight">
              Sign in to {brand.name}
            </Heading>
            <Text className="text-xs text-zinc-500 dark:text-zinc-400">
              Use your verified {brandDomain} credentials or hardware passkey.
            </Text>
          </div>

          {submittedMessage && (
            <Alert
              variant="flat"
              color="success"
              title="Session Authenticated"
              description={submittedMessage}
            />
          )}

          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSubmittedMessage(`Authenticated session for ${brandDomain}.`);
            }}
            className="space-y-4"
          >
            <Input
              label="Work Email"
              type="email"
              placeholder={`dani@${brandDomain}`}
              defaultValue={`dani@${brandDomain}`}
            />
            <Input label="Passphrase" type="password" defaultValue="correct-horse-battery-staple" />
            <div className="flex items-center justify-between">
              <Checkbox defaultChecked>
                <span className="text-xs text-zinc-600 dark:text-zinc-300">
                  Trust device for 14 days
                </span>
              </Checkbox>
              <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400">
                Forgot passphrase?
              </span>
            </div>
            <Button type="submit" variant="solid" color="primary" className="w-full">
              Sign In to {brand.name}
            </Button>
          </form>
        </div>
      );
    }

    case "social-auth": {
      if (block.variant === "hidden") return null;

      if (block.variant === "sso-enterprise") {
        return (
          <div
            data-shared-block="social-auth"
            data-variant={block.variant}
            className="space-y-3 pt-2"
          >
            <Divider />
            <Button variant="bordered" className="w-full">
              <KeyRound className="mr-2 h-4 w-4" />
              Continue with SAML 2.0 / Okta Enterprise SSO
            </Button>
          </div>
        );
      }

      return (
        <div
          data-shared-block="social-auth"
          data-variant={block.variant}
          className="space-y-3 pt-2"
        >
          <Divider />
          <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
            <Button variant="bordered" className="w-full">
              Continue with GitHub
            </Button>
            <Button variant="bordered" className="w-full">
              Continue with Google Workspace
            </Button>
          </div>
        </div>
      );
    }

    case "trust-aside": {
      if (block.variant === "none") return null;

      if (block.variant === "editorial-quote") {
        return (
          <Card
            data-shared-block="trust-aside"
            data-variant={block.variant}
            className="h-full border border-zinc-200/80 bg-zinc-900 text-white dark:border-white/[0.1] dark:bg-[#141418]"
          >
            <CardBody className="flex h-full flex-col justify-between space-y-6 p-6">
              <div className="space-y-3">
                <Badge size="sm" variant="flat" color="primary">
                  Verified Enterprise Architecture
                </Badge>
                <p className="text-lg leading-relaxed font-semibold text-white">
                  “Unifying our Application UI shells, Shared Auth flows, and Marketing pages on a
                  single typed Hudbird blueprint cut our release cycle from 3 weeks to 4 hours.”
                </p>
              </div>
              <div className="flex items-center justify-between border-t border-white/10 pt-4">
                <div className="flex items-center gap-3">
                  <Avatar size="sm" name="Elena Rostova" />
                  <div>
                    <div className="text-xs font-bold text-white">Elena Rostova</div>
                    <div className="text-[11px] text-zinc-400">VP of Engineering, {brand.name}</div>
                  </div>
                </div>
                <Badge size="sm" variant="flat" color="success">
                  99.99% SLA
                </Badge>
              </div>
            </CardBody>
          </Card>
        );
      }

      if (block.variant === "documentation-links") {
        const links = [
          {
            title: "Application UI Blueprints",
            desc: "Dashboards 01/02, Settings 01/02, and Informational shells.",
            icon: Terminal,
          },
          {
            title: "Shared Auth & Transactional Pages",
            desc: "Login, Signup, InputOTP verification, and Email templates.",
            icon: FileCode2,
          },
          {
            title: "Marketing Sections & Page Builder",
            desc: "18 marketing component categories & 10 full-page examples.",
            icon: BookOpen,
          },
        ];
        return (
          <div data-shared-block="trust-aside" data-variant={block.variant} className="space-y-3">
            {links.map((item) => (
              <Card key={item.title} className="border border-zinc-200/80 dark:border-white/[0.08]">
                <CardBody className="flex items-start justify-between gap-3 p-4">
                  <div className="flex items-start gap-3">
                    <IconBox size="sm" variant="default" icon={item.icon} showGlow={false} />
                    <div>
                      <p className="text-xs font-bold text-zinc-900 dark:text-white">
                        {item.title}
                      </p>
                      <p className="mt-0.5 text-[11px] text-zinc-500 dark:text-zinc-400">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                  <ArrowUpRight className="h-4 w-4 shrink-0 text-zinc-400" />
                </CardBody>
              </Card>
            ))}
          </div>
        );
      }

      return (
        <Card
          data-shared-block="trust-aside"
          data-variant={block.variant}
          className="h-full border border-zinc-200/80 bg-zinc-50/90 dark:border-white/[0.08] dark:bg-[#141418]"
        >
          <CardBody className="flex h-full flex-col justify-between space-y-5 p-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Badge size="sm" variant="flat" color="success">
                  Live Control Plane
                </Badge>
                <span className="font-mono text-[11px] text-zinc-500">{brandDomain}</span>
              </div>
              <Heading as="h4" className="text-lg font-bold">
                {brand.name} Unified Blueprint Runtime
              </Heading>
              <Text className="text-xs text-zinc-500 dark:text-zinc-400">
                Every shared page is built from the exact same @hudbird/ui Base UI primitives used
                across your dashboards and marketing funnels.
              </Text>
            </div>

            <div className="space-y-2.5 rounded-2xl border border-zinc-200/80 bg-white p-4 dark:border-white/[0.08] dark:bg-[#1b1b20]">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold">Zero-Trust Session Attestation</span>
                <CheckCircle2 className="h-4 w-4 text-emerald-500" />
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold">Hardware WebAuthn / Passkey Ready</span>
                <Sparkles className="h-4 w-4 text-indigo-500" />
              </div>
              <div className="flex items-center justify-between font-mono text-[11px] text-zinc-500">
                <span>Region: eu-central-1</span>
                <span>TLS 1.3 • AES-256</span>
              </div>
            </div>
          </CardBody>
        </Card>
      );
    }

    case "support-footer": {
      return (
        <div
          data-shared-block="support-footer"
          data-variant={block.variant}
          className="flex flex-wrap items-center justify-between gap-2 border-t border-zinc-200/80 px-6 py-3.5 text-[11px] text-zinc-500 dark:border-white/[0.08] dark:text-zinc-400"
        >
          <span>
            Protected by <strong>{brand.name}</strong> Zero-Trust Identity • SOC2 Type II
          </span>
          <div className="flex items-center gap-3">
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <span>Status: 99.99%</span>
          </div>
        </div>
      );
    }
  }
};

export interface SharedPageRendererProps {
  category: SharedPageCategorySlug;
  blocks: SharedBlockSelection[];
  brand: BrandProfile;
}

export const SharedPageRenderer: React.FC<SharedPageRendererProps> = ({
  category,
  blocks,
  brand,
}) => {
  const brandBar = blocks.find((b) => b.type === "brand-bar" && b.enabled);
  const coreFlow = blocks.find((b) => b.type === "core-flow" && b.enabled);
  const socialAuth = blocks.find((b) => b.type === "social-auth" && b.enabled);
  const trustAside = blocks.find(
    (b) => b.type === "trust-aside" && b.enabled && b.variant !== "none"
  );
  const supportFooter = blocks.find((b) => b.type === "support-footer" && b.enabled);

  return (
    <div
      data-hudbird-domain="shared-pages"
      data-shared-category={category}
      className="overflow-hidden rounded-3xl border border-zinc-200/90 bg-white text-zinc-900 shadow-xs dark:border-white/[0.08] dark:bg-[#111114] dark:text-zinc-100"
    >
      {brandBar && <SharedBlockRenderer block={brandBar} brand={brand} category={category} />}

      <div
        className={
          trustAside
            ? "grid min-h-[540px] grid-cols-1 gap-6 p-6 lg:grid-cols-12 lg:items-center lg:p-8"
            : "mx-auto max-w-xl p-6 sm:p-8"
        }
      >
        <div className={trustAside ? "space-y-4 lg:col-span-7" : "space-y-4"}>
          {coreFlow && <SharedBlockRenderer block={coreFlow} brand={brand} category={category} />}
          {socialAuth && (
            <SharedBlockRenderer block={socialAuth} brand={brand} category={category} />
          )}
        </div>
        {trustAside && (
          <div className="lg:col-span-5">
            <SharedBlockRenderer block={trustAside} brand={brand} category={category} />
          </div>
        )}
      </div>

      {supportFooter && (
        <SharedBlockRenderer block={supportFooter} brand={brand} category={category} />
      )}
    </div>
  );
};
