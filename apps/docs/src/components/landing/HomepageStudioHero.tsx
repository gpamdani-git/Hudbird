import { Button, Container, Heading, Section, Text } from "@hudbird/ui";
import { ArrowUpRight } from "lucide-react";
import { hudbirdHomepageHero as content } from "../../data/hudbirdHomepage";
import { navigationData } from "../../navData";
import { HeroWidgetRail } from "./HeroWidgetRail";

const inventory = navigationData.flatMap(({ title, items }) => {
  if ((title === "Core Components" || title === "Signature Blocks") && items.length) {
    return [{ label: title, count: items.length, href: items[0].path }];
  }
  return items
    .filter((item) => item.path === "/marketing/landing-sections" && item.variants)
    .map((item) => ({ label: "Section layouts", count: item.variants!, href: item.path }));
});

export function HomepageStudioHero() {
  return (
    <Section id="hero" spacing="none" className="hb-studio-hero" aria-labelledby="studio-title">
      <Container className="hb-studio-copy" size="xl">
        <Heading id="studio-title" as="h1" size="inherit">
          <span>{content.title}</span> <span>{content.accentTitle}</span>
        </Heading>
        <Text className="hb-studio-description" align="center">
          {content.description}
        </Text>
        <div className="hb-studio-actions">
          <Button href={content.secondaryAction.href} variant="plain" radius="full">
            {content.secondaryAction.label}
          </Button>
          <Button
            href={content.primaryAction.href}
            radius="full"
            className="hb-launch-button"
            endContent={
              <span className="hb-launch-arrow">
                <ArrowUpRight size={17} aria-hidden="true" />
              </span>
            }
          >
            {content.primaryAction.label}
          </Button>
        </div>
      </Container>
      <HeroWidgetRail />
      <Container
        as="nav"
        className="hb-studio-proof"
        size="lg"
        aria-label="Explore the Hudbird catalog"
      >
        {inventory.map(({ label, count, href }) => (
          <Button key={href} href={`/#${href}`} size="sm" variant="plain" radius="full">
            <strong>{count}</strong>
            {label}
          </Button>
        ))}
      </Container>
    </Section>
  );
}
