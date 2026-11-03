"use client";

import * as React from "react";
import {
  Section,
  Container,
  Grid,
  DoubleBezelCard,
  Card,
  Alert,
  Divider,
  DescriptionList,
  DescriptionListItem,
  DescriptionListLabel,
  DescriptionListValue,
  Fieldset,
  FieldsetContent,
  FieldsetRow,
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
  Slider,
  BarChart,
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator,
  RadarChart,
  Switch,
  Badge,
  Button,
  Heading,
  Text,
  Lead,
} from "@hudbird/ui";
import { ShieldCheck, Rocket, Globe, RefreshCw, KeyRound, Zap } from "lucide-react";

export interface InteractiveBentoShowcaseProps {
  /** Kept for backward compatibility */
  badgeText?: string;
  /** Section headline */
  title?: string;
  /** Section description */
  description?: string;
  /** Default monthly request volume (in millions) for the cost estimator */
  defaultTrafficMillions?: number;
  /** Optional className for root Section */
  className?: string;
}

const DEMO_OTP_CODE = "849204";

export const InteractiveBentoShowcase: React.FC<InteractiveBentoShowcaseProps> = ({
  title = "Interactive Component Grid",
  description = "Four working controls built from @hudbird/ui components. Filter commands, drag the request slider, enter a 6-digit code, and toggle routing rules.",
  defaultTrafficMillions = 120,
  className,
}) => {
  // 1. Command Palette State
  const [lastCommand, setLastCommand] = React.useState<{
    label: string;
    latency: string;
  }>({
    label: "Promote release",
    latency: "18ms",
  });

  // 2. Cost Estimator State
  const [trafficMillions, setTrafficMillions] = React.useState<number>(defaultTrafficMillions);

  // 3. Two-Factor InputOTP State
  const [otpValue, setOtpValue] = React.useState<string>("");
  const isVaultUnlocked = otpValue.length === 6;

  // 4. Routing & Caching Controls State
  const [anycastTurbo, setAnycastTurbo] = React.useState<boolean>(true);
  const [ebpfWaf, setEbpfWaf] = React.useState<boolean>(true);
  const [warmPool, setWarmPool] = React.useState<boolean>(false);

  const legacyMonthlyCost = Math.round(trafficMillions * 24);
  const hudbirdMonthlyCost = Math.round(trafficMillions * 7.5);
  const annualSavings = (legacyMonthlyCost - hudbirdMonthlyCost) * 12;

  const roiChartData = React.useMemo(
    () => [
      {
        tier: "CPU",
        "Standard Cloud": Math.round(legacyMonthlyCost * 0.55),
        Hudbird: Math.round(hudbirdMonthlyCost * 0.52),
      },
      {
        tier: "Egress",
        "Standard Cloud": Math.round(legacyMonthlyCost * 0.3),
        Hudbird: Math.round(hudbirdMonthlyCost * 0.28),
      },
      {
        tier: "Reqs",
        "Standard Cloud": Math.round(legacyMonthlyCost * 0.15),
        Hudbird: Math.round(hudbirdMonthlyCost * 0.2),
      },
    ],
    [legacyMonthlyCost, hudbirdMonthlyCost]
  );

  const radarData = React.useMemo(
    () => [
      {
        metric: "Throughput",
        Current: 68 + (anycastTurbo ? 20 : 0) + (warmPool ? 10 : 0),
        Baseline: 62,
      },
      {
        metric: "Cache Hit",
        Current: 72 + (anycastTurbo ? 18 : 0) + (warmPool ? 6 : 0),
        Baseline: 65,
      },
      {
        metric: "TLS Speed",
        Current: 75 + (anycastTurbo ? 16 : 0) + (ebpfWaf ? 5 : 0),
        Baseline: 68,
      },
      {
        metric: "Firewall",
        Current: 64 + (ebpfWaf ? 34 : 0),
        Baseline: 60,
      },
      {
        metric: "Warm Start",
        Current: 62 + (warmPool ? 36 : 0),
        Baseline: 55,
      },
    ],
    [anycastTurbo, ebpfWaf, warmPool]
  );

  const edgeScore = React.useMemo(() => {
    const sum = radarData.reduce((acc, item) => acc + item.Current, 0);
    return Math.round(sum / radarData.length);
  }, [radarData]);

  return (
    <Section spacing="lg" className={className}>
      <Container size="xl">
        <Container size="prose" gutter="none">
          <Section spacing="sm">
            <div className="flex flex-col items-center gap-4 text-center">
              <Heading as="h2" size="h1" tracking="tight">
                {title}
              </Heading>

              <Lead align="center">{description}</Lead>
            </div>
          </Section>
        </Container>

        <div className="flex flex-col gap-6">
          {/* ROW 1: 2-to-1 Asymmetric Layout */}
          <Grid layout="bento-2-1" gap="md" align="stretch">
            {/* CELL 1 (2 Cols): Command Palette */}
            <DoubleBezelCard variant="default" padding="md">
              <div className="flex h-full flex-col justify-between gap-4">
                <div className="flex flex-col gap-1">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <Heading as="h3" size="h4">
                      Command Palette
                    </Heading>
                    <Badge variant="soft" color="success" size="sm">
                      Last run: {lastCommand.label} ({lastCommand.latency})
                    </Badge>
                  </div>
                  <Text variant="small">
                    Type to filter actions or press Enter to run the selected item.
                  </Text>
                </div>

                <Divider variant="solid" />

                <Card variant="bordered" radius="full">
                  <Command>
                    <CommandInput placeholder="Search deployment, cache, or key actions..." />
                    <CommandList>
                      <CommandEmpty>No matching command found.</CommandEmpty>
                      <CommandGroup heading="Operations">
                        <CommandItem
                          value="Promote release"
                          keywords={["deploy", "ship", "release"]}
                          onSelect={() =>
                            setLastCommand({
                              label: "Promote release",
                              latency: "18ms",
                            })
                          }
                        >
                          <Rocket className="h-4 w-4 shrink-0" />
                          <Text as="span" variant="strong" className="leading-none">
                            Promote release
                          </Text>
                          <CommandShortcut>⌘P</CommandShortcut>
                        </CommandItem>

                        <CommandItem
                          value="Purge CDN cache"
                          keywords={["invalidate", "edge", "cdn"]}
                          onSelect={() =>
                            setLastCommand({
                              label: "Purge CDN cache",
                              latency: "24ms",
                            })
                          }
                        >
                          <Globe className="h-4 w-4 shrink-0" />
                          <Text as="span" variant="strong" className="leading-none">
                            Purge CDN cache
                          </Text>
                          <CommandShortcut>⇧⌘K</CommandShortcut>
                        </CommandItem>

                        <CommandItem
                          value="Rotate API keys"
                          keywords={["security", "token", "secret"]}
                          onSelect={() =>
                            setLastCommand({
                              label: "Rotate API keys",
                              latency: "12ms",
                            })
                          }
                        >
                          <KeyRound className="h-4 w-4 shrink-0" />
                          <Text as="span" variant="strong" className="leading-none">
                            Rotate API keys
                          </Text>
                          <CommandShortcut>⌘R</CommandShortcut>
                        </CommandItem>

                        <CommandItem
                          value="Rebalance worker pool"
                          keywords={["scale", "workers", "cpu"]}
                          onSelect={() =>
                            setLastCommand({
                              label: "Rebalance worker pool",
                              latency: "31ms",
                            })
                          }
                        >
                          <Zap className="h-4 w-4 shrink-0" />
                          <Text as="span" variant="strong" className="leading-none">
                            Rebalance worker pool
                          </Text>
                          <CommandShortcut>⌥S</CommandShortcut>
                        </CommandItem>
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </Card>
              </div>
            </DoubleBezelCard>

            {/* CELL 2 (1 Col): Monthly Cost Estimator (Clean Stacked Header, Zero Mid-Word Wrapping) */}
            <DoubleBezelCard variant="solid" padding="md">
              <div className="flex h-full flex-col justify-between gap-4">
                <div className="flex flex-col gap-1">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <Heading as="h3" size="h4">
                      Cost Estimator
                    </Heading>
                    <Badge variant="soft" color="primary" size="sm">
                      Save ${annualSavings.toLocaleString()}/yr
                    </Badge>
                  </div>
                  <Text variant="small">
                    Estimated monthly spend by request volume (sample rates).
                  </Text>
                </div>

                <Divider variant="solid" />

                <Slider
                  label="Monthly requests"
                  min={20}
                  max={400}
                  step={10}
                  value={trafficMillions}
                  onChange={setTrafficMillions}
                  showValue
                  formatValue={(v) => `${v}M / mo`}
                  color="primary"
                  size="sm"
                />

                <Grid cols={2} gap="sm" align="start">
                  <DescriptionList variant="flat" orientation="vertical">
                    <DescriptionListItem>
                      <DescriptionListLabel>Standard Cloud</DescriptionListLabel>
                      <DescriptionListValue>
                        <Text as="span" variant="strong" className="text-base leading-none">
                          ${legacyMonthlyCost.toLocaleString()}/mo
                        </Text>
                      </DescriptionListValue>
                    </DescriptionListItem>
                  </DescriptionList>

                  <DescriptionList variant="flat" orientation="vertical">
                    <DescriptionListItem>
                      <DescriptionListLabel>Hudbird Plan</DescriptionListLabel>
                      <DescriptionListValue>
                        <Text
                          as="span"
                          variant="strong"
                          color="success"
                          className="text-base leading-none"
                        >
                          ${hudbirdMonthlyCost.toLocaleString()}/mo
                        </Text>
                      </DescriptionListValue>
                    </DescriptionListItem>
                  </DescriptionList>
                </Grid>

                <Divider variant="solid" />

                <BarChart
                  className="h-36"
                  data={roiChartData}
                  index="tier"
                  categories={["Standard Cloud", "Hudbird"]}
                  colors={["zinc", "indigo"]}
                  valueFormatter={(v) => `$${v}`}
                  showLegend={false}
                  showYAxis={false}
                />
              </div>
            </DoubleBezelCard>
          </Grid>

          {/* ROW 2: 1-to-2 Asymmetric Layout */}
          <Grid layout="bento-1-2" gap="md" align="stretch">
            {/* CELL 3 (1 Col): 6-Digit Verification Code */}
            <DoubleBezelCard variant="solid" padding="md">
              <div className="flex h-full flex-col justify-between gap-4">
                <div className="flex flex-col gap-1">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <Heading as="h3" size="h4">
                      Two-Factor Check
                    </Heading>
                    <Badge variant="soft" color={isVaultUnlocked ? "success" : "warning"} size="sm">
                      {isVaultUnlocked ? "Verified" : "Locked"}
                    </Badge>
                  </div>
                  <Text variant="small">
                    Enter any 6 digits or fill the sample code to test validation.
                  </Text>
                </div>

                <Divider variant="solid" />

                <div className="flex flex-col items-center justify-center py-2">
                  <InputOTP
                    maxLength={6}
                    value={otpValue}
                    onChange={setOtpValue}
                    size="md"
                    radius="lg"
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

                <Alert
                  variant="soft"
                  color={isVaultUnlocked ? "success" : "primary"}
                  icon={<ShieldCheck className="h-4 w-4" />}
                  title={isVaultUnlocked ? "Code accepted" : "6-digit code required"}
                  description={
                    isVaultUnlocked
                      ? "Deployment controls are unlocked for this session."
                      : "Type 6 digits above or click Fill sample code."
                  }
                />

                <div className="flex flex-wrap items-center justify-between gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    radius="lg"
                    onClick={() => setOtpValue("")}
                    disabled={otpValue.length === 0}
                  >
                    <RefreshCw className="h-3.5 w-3.5" />
                    Clear
                  </Button>

                  <Button
                    size="sm"
                    variant="solid"
                    color="primary"
                    radius="lg"
                    onClick={() => setOtpValue(DEMO_OTP_CODE)}
                  >
                    Fill sample ({DEMO_OTP_CODE})
                  </Button>
                </div>
              </div>
            </DoubleBezelCard>

            {/* CELL 4 (2 Cols): Routing & Security Controls + Radar Chart */}
            <DoubleBezelCard variant="default" padding="md">
              <div className="flex h-full flex-col justify-between gap-4">
                <div className="flex flex-col gap-1">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <Heading as="h3" size="h4">
                      Routing and Caching Controls
                    </Heading>
                    <Badge variant="soft" color="success" size="sm">
                      Average score: {edgeScore}/100
                    </Badge>
                  </div>
                  <Text variant="small">
                    Toggle options on the left to update the 5-axis performance chart.
                  </Text>
                </div>

                <Divider variant="solid" />

                <Grid cols={2} gap="md" align="center">
                  <Fieldset variant="inset-grouped">
                    <FieldsetContent>
                      <FieldsetRow
                        label="Anycast routing"
                        description="Routes requests to the nearest POP"
                      >
                        <Switch
                          size="sm"
                          color="primary"
                          checked={anycastTurbo}
                          onChange={(e) => setAnycastTurbo(e.target.checked)}
                        />
                      </FieldsetRow>
                      <FieldsetRow
                        label="Request filtering"
                        description="Blocks malformed L7 traffic at the edge"
                      >
                        <Switch
                          size="sm"
                          color="success"
                          checked={ebpfWaf}
                          onChange={(e) => setEbpfWaf(e.target.checked)}
                        />
                      </FieldsetRow>
                      <FieldsetRow
                        label="Pre-warmed workers"
                        description="Keeps standby instances in memory"
                      >
                        <Switch
                          size="sm"
                          color="primary"
                          checked={warmPool}
                          onChange={(e) => setWarmPool(e.target.checked)}
                        />
                      </FieldsetRow>
                    </FieldsetContent>
                  </Fieldset>

                  <RadarChart
                    className="h-56"
                    data={radarData}
                    index="metric"
                    categories={["Current", "Baseline"]}
                    colors={["indigo", "cyan"]}
                    fillOpacity={0.28}
                    showLegend={false}
                  />
                </Grid>
              </div>
            </DoubleBezelCard>
          </Grid>
        </div>
      </Container>
    </Section>
  );
};

InteractiveBentoShowcase.displayName = "InteractiveBentoShowcase";
