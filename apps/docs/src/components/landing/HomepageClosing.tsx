import {
  Accordion,
  AccordionItem,
  Button,
  Container,
  Grid,
  Heading,
  MotionReveal,
  Section,
  Text,
} from "@hudbird/ui";
import { ArrowUpRight } from "lucide-react";
import { useBrandMode } from "@hudbird/marketing";
import "./homepage-closing.css";

const questions = [
  {
    id: "experience",
    title: "Do I need to know how to code?",
    answer:
      "You can explore layouts and try your brand in the Page Builder without writing code. To turn the result into a working website, you’ll need a React project and either a developer or an AI coding assistant to help with setup, content, and deployment.",
  },
  {
    id: "ai",
    title: "How does Hudbird work with AI?",
    answer:
      "Hudbird gives your coding assistant components, layout rules, and skills to follow. You provide the brief and choose the direction. The assistant works in your project using that system. The builder itself is a local composition tool; it does not generate a site through an AI service.",
  },
  {
    id: "export",
    title: "What do I get from the builder?",
    answer:
      "A React page and a JSON configuration describing the sections, order, variants, and brand. Install the required Hudbird components through the CLI, then add the page to your project. The installation guide covers the React and Tailwind CSS setup.",
  },
  {
    id: "brand",
    title: "Can I make it look like my brand?",
    answer:
      "Yes. Set your logo, colors, font, radius, and spacing density, then swap section layouts while keeping those choices. Because the component source lives in your project, you can also make more specific changes with your developer or AI assistant.",
  },
  {
    id: "backend",
    title: "Are the demos connected to a backend?",
    answer:
      "The previews use sample data to demonstrate the interface. Add your own content, API, authentication, and payments when your project needs them. Hudbird provides the UI components and layout system for that work.",
  },
];

const footerLinks = [
  { label: "Docs", href: "/#/docs" },
  { label: "Sections", href: "/#/marketing/landing-sections" },
  { label: "Builder", href: "/#/marketing/landing-builder" },
  { label: "GitHub", href: "https://github.com/gpamdani-git/Hudbird" },
  { label: "Pro", href: "https://danihudbird.gumroad.com/l/hudbirdui-pro-allaccess" },
];

export function HomepageQuestions() {
  return (
    <Section
      id="questions"
      spacing="none"
      className="hbc-questions"
      aria-labelledby="questions-title"
    >
      <Container size="xl">
        <MotionReveal distance={12}>
          <Grid cols={2} gap="xl" className="hbc-question-grid">
            <div>
              <Text className="hbc-kicker">A few things to know</Text>
              <Heading id="questions-title" as="h2" size="inherit">
                Before your
                <br />
                first build.
              </Heading>
              <Text className="hbc-question-description">
                A clear starting point, whether you think in pixels, prompts, or React.
              </Text>
              <Button
                href="/#/docs"
                variant="plain"
                className="hbc-docs-link"
                endContent={<ArrowUpRight size={16} aria-hidden="true" />}
              >
                Get to know Hudbird
              </Button>
            </div>
            <Accordion variant="light" className="hbc-accordion" selectionMode="multiple">
              {questions.map((question) => (
                <AccordionItem
                  key={question.id}
                  itemKey={question.id}
                  title={question.title}
                  classNames={{
                    trigger: "hbc-question-trigger",
                    title: "hbc-question-title",
                    content: "hbc-question-answer",
                  }}
                >
                  {question.answer}
                </AccordionItem>
              ))}
            </Accordion>
          </Grid>
        </MotionReveal>
      </Container>
    </Section>
  );
}

export function HomepageClosing() {
  return (
    <Section id="start" spacing="none" className="hbc-closing" aria-labelledby="closing-title">
      <Container size="xl">
        <MotionReveal distance={12} className="hbc-invitation">
          <span className="hbc-invitation-label">Your idea. Your brand. Your source.</span>
          <Heading id="closing-title" as="h2" size="inherit">
            Build the first page
            <br />
            with your own brand.
          </Heading>
          <Text>Start with a section. See where it takes you.</Text>
          <div className="hbc-actions">
            <Button
              href="/#/marketing/landing-builder"
              radius="full"
              className="hbc-start-button"
              endContent={<ArrowUpRight size={18} aria-hidden="true" />}
            >
              Open the page builder
            </Button>
            <Button
              href="/#/marketing/landing-sections"
              radius="full"
              variant="plain"
              className="hbc-browse-button"
            >
              Explore the sections
            </Button>
          </div>
          <span className="hbc-invitation-corner" aria-hidden="true">
            ↗
          </span>
        </MotionReveal>
      </Container>
    </Section>
  );
}

export function HomepageFooter() {
  const mode = useBrandMode();
  return (
    <Section as="footer" spacing="none" className="hbc-footer">
      <Container size="xl">
        <Grid cols={2} gap="lg" align="center" className="hbc-footer-top">
          <Text>Make room for your next idea.</Text>
          <nav aria-label="Footer navigation">
            {footerLinks.map((link) => (
              <Button key={link.label} href={link.href} variant="plain" size="sm">
                {link.label}
              </Button>
            ))}
          </nav>
        </Grid>
        <div className="hbc-footer-signature">
          <a href="/#/" aria-label="Hudbird home">
            <img
              src={`/assets/logo/hudbird-logo-${mode === "dark" ? "white" : "black"}.png`}
              width="570"
              height="113"
              alt="Hudbird UI"
              loading="lazy"
            />
          </a>
          <span>
            Built from the same
            <br />
            components you’ll use.
          </span>
        </div>
      </Container>
    </Section>
  );
}
