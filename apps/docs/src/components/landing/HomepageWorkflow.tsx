import { useState } from "react";
import {
  Button,
  Container,
  Grid,
  Heading,
  MotionReveal,
  Section,
  Tab,
  TabList,
  TabPanel,
  Tabs,
  Text,
} from "@hudbird/ui";
import { ArrowUpRight, Check, Copy, Terminal } from "lucide-react";
import "./homepage-workflow.css";

export const homepageBrief = `Build a landing page with Hudbird UI.

Brand: [my name, logo, colors, and font]
Audience: [who the website is for]
Goal: [the action visitors should take]

Use Hudbird components and Section, Container, and Grid.
Suggest two compositions before building.
Ask me for missing content. Do not invent testimonials.
Keep my brand when changing a section.
Check the result on mobile and desktop.`;

const installExample = "npx hudbird-ui@latest init\nnpx hudbird-ui@latest add Button";
const sourceExample = `import { Button } from "@/components/hudbird-ui/Button";

export function StartButton() {
  return (
    <Button color="primary" href="/start">
      Get started
    </Button>
  );
}`;

const steps = [
  {
    id: "brief",
    title: "Start with your idea.",
    description:
      "Give your AI assistant the brand, the audience, and the goal. Hudbird’s skills provide the component and layout rules.",
    link: "Explore the AI skills",
    href: "/#/ai-skills",
  },
  {
    id: "compose",
    title: "Make the design decisions.",
    description:
      "Compare section layouts in the builder. Change the order, hide a section, and try your brand before taking the page into your project.",
    link: "Open the page builder",
    href: "/#/marketing/landing-builder",
  },
  {
    id: "source",
    title: "Take the source with you.",
    description:
      "Export React and JSON from the builder. The CLI adds component source to your project, ready for you or your AI assistant to edit.",
    link: "Read the installation guide",
    href: "/#/installation",
  },
];

function CopyAction({ text, label }: { text: string; label: string }) {
  const [status, setStatus] = useState<"idle" | "copied" | "failed">("idle");
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setStatus("copied");
    } catch {
      setStatus("failed");
    }
  };
  return (
    <div className="hwf-copy-action">
      <Button
        variant="plain"
        onClick={copy}
        startContent={
          status === "copied" ? (
            <Check size={15} aria-hidden="true" />
          ) : (
            <Copy size={15} aria-hidden="true" />
          )
        }
      >
        {status === "copied" ? "Copied" : label}
      </Button>
      <span role="status">
        {status === "failed"
          ? "Copy unavailable. Select and copy the text below."
          : status === "copied"
            ? "Ready to paste into your project."
            : ""}
      </span>
    </div>
  );
}

export function HomepageWorkflow() {
  const [step, setStep] = useState("brief");
  const selected = steps.find((item) => item.id === step)!;
  return (
    <Section id="workflow" spacing="none" className="hwf-section" aria-labelledby="workflow-title">
      <Container size="xl">
        <MotionReveal distance={12}>
          <Grid cols={2} gap="xl" className="hwf-grid" align="center">
            <div className="hwf-copy">
              <Text className="hwf-kicker">From idea to source</Text>
              <Heading id="workflow-title" as="h2" size="inherit">
                You bring the idea.
                <br />
                <span>Keep every decision.</span>
              </Heading>
              <Text className="hwf-intro">
                Work with AI in words. Work with React in code. The same Hudbird components sit
                underneath both.
              </Text>
              <div className="hwf-context" aria-live="polite" aria-atomic="true">
                <span className="hwf-index">
                  0{steps.findIndex((item) => item.id === step) + 1} / 03
                </span>
                <Heading as="h3" size="h3">
                  {selected.title}
                </Heading>
                <Text>{selected.description}</Text>
                <Button
                  href={selected.href}
                  variant="plain"
                  endContent={<ArrowUpRight size={16} aria-hidden="true" />}
                >
                  {selected.link}
                </Button>
              </div>
            </div>
            <Tabs
              selectedKey={step}
              onSelectionChange={setStep}
              className="hwf-editor dark"
              variant="light"
            >
              <div className="hwf-editor-top">
                <span className="hwf-editor-mark" aria-hidden="true">
                  <Terminal size={17} />
                </span>
                <TabList aria-label="Explore the Hudbird workflow">
                  <Tab tabKey="brief">01 Brief</Tab>
                  <Tab tabKey="compose">02 Compose</Tab>
                  <Tab tabKey="source">03 Source</Tab>
                </TabList>
              </div>
              <TabPanel tabKey="brief" className="hwf-panel">
                <div className="hwf-filebar">
                  <span>brand-brief.txt</span>
                  <CopyAction text={homepageBrief} label="Copy brief" />
                </div>
                <pre className="hwf-brief">
                  <code>{homepageBrief}</code>
                </pre>
                <p className="hwf-note">
                  Replace the brackets with your details, then share this with your AI assistant.
                </p>
              </TabPanel>
              <TabPanel tabKey="compose" className="hwf-panel">
                <div className="hwf-filebar">
                  <span>Your page, arranged by you</span>
                  <span className="hwf-file-tag">Builder workflow</span>
                </div>
                <ol className="hwf-compose-list">
                  <li>
                    <span>01</span>
                    <div>
                      <strong>Choose a starting layout</strong>
                      <p>Browse 27 layouts across 12 section types.</p>
                    </div>
                  </li>
                  <li>
                    <span>02</span>
                    <div>
                      <strong>Make it your brand</strong>
                      <p>Set the color, font, radius, and density.</p>
                    </div>
                  </li>
                  <li>
                    <span>03</span>
                    <div>
                      <strong>Put the story in order</strong>
                      <p>Move sections up or down. Show or hide what you need.</p>
                    </div>
                  </li>
                  <li>
                    <span>04</span>
                    <div>
                      <strong>Export the composition</strong>
                      <p>Get React code and the JSON configuration.</p>
                    </div>
                  </li>
                </ol>
                <Button
                  className="hwf-builder-link"
                  href="/#/marketing/landing-builder"
                  variant="bordered"
                  endContent={<ArrowUpRight size={16} aria-hidden="true" />}
                >
                  Try it in the builder
                </Button>
              </TabPanel>
              <TabPanel tabKey="source" className="hwf-panel">
                <div className="hwf-filebar">
                  <span>Start with one component</span>
                  <CopyAction text={installExample} label="Copy commands" />
                </div>
                <pre className="hwf-terminal">
                  <code>{installExample}</code>
                </pre>
                <div className="hwf-filebar hwf-source-file">
                  <span>StartButton.tsx</span>
                  <CopyAction text={sourceExample} label="Copy React" />
                </div>
                <pre className="hwf-code">
                  <code>{sourceExample}</code>
                </pre>
                <p className="hwf-note">
                  Example for a React project with Tailwind CSS configured. Follow the installation
                  guide for setup.
                </p>
              </TabPanel>
            </Tabs>
          </Grid>
        </MotionReveal>
      </Container>
    </Section>
  );
}
