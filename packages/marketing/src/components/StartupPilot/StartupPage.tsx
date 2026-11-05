"use client";
import * as React from "react";
import {
  Section,
  Container,
  Grid,
  Button,
  Heading,
  Text,
  Accordion,
  AccordionItem,
} from "@hudbird/ui";
import type {
  BrandProfile,
  PageComposition,
  PromotionalSectionId,
  StartupPageContent,
} from "@hudbird/schemas";
import { BrandScope, HeroSection, ProductDemo } from "../HeroSection";

export interface StartupPageProps {
  brand: BrandProfile;
  composition: PageComposition;
  content: StartupPageContent;
}

export function StartupPage({ brand, composition, content }: StartupPageProps) {
  const sections: Record<PromotionalSectionId, React.ReactNode> = {
    benefits: (
      <Section id="benefits" spacing="lg" className="hb-section" bordered="top">
        <Container size="xl" gutter="lg">
          <Heading as="h2" className="hb-subheading mb-12 max-w-[22ch]">
            {content.benefitsTitle}
          </Heading>
          <Grid cols={3} gap="lg">
            {content.benefits.map((benefit) => (
              <div key={benefit.title} className="border-border min-w-0 border-t pt-6">
                <Heading as="h3" size="h4">
                  {benefit.title}
                </Heading>
                <Text className="text-muted-foreground mt-4 max-w-prose leading-relaxed">
                  {benefit.description}
                </Text>
              </div>
            ))}
          </Grid>
        </Container>
      </Section>
    ),
    demo: (
      <Section id="product-demo" spacing="lg" className="hb-section" bordered="top">
        <Container size="xl" gutter="lg">
          <Grid cols={2} gap="xl" align="center" className="[&>*]:min-w-0">
            <div>
              <Heading as="h2" className="hb-subheading max-w-[20ch]">
                {content.demo.title}
              </Heading>
              <Text className="text-muted-foreground mt-5 max-w-prose leading-relaxed">
                {content.demo.description}
              </Text>
            </div>
            <ProductDemo tabs={content.demo.tabs} label="Workspace demo" />
          </Grid>
        </Container>
      </Section>
    ),
    faq: (
      <Section id="questions" spacing="lg" className="hb-section" bordered="top">
        <Container size="xl" gutter="lg">
          <Grid cols={2} gap="xl" className="[&>*]:min-w-0">
            <Heading as="h2" className="hb-subheading">
              {content.faqTitle}
            </Heading>
            <Accordion variant="light">
              {content.faq.map((item, index) => (
                <AccordionItem
                  key={item.question}
                  itemKey={String(index)}
                  title={item.question}
                  classNames={{ title: "whitespace-normal text-clip overflow-visible" }}
                >
                  {item.answer}
                </AccordionItem>
              ))}
            </Accordion>
          </Grid>
        </Container>
      </Section>
    ),
    cta: (
      <Section id="next-step" spacing="lg" className="hb-section" bordered="top">
        <Container size="xl" gutter="lg">
          <Grid cols={2} gap="lg" align="center">
            <div>
              <Heading as="h2" className="hb-subheading">
                {content.cta.title}
              </Heading>
              <Text className="text-muted-foreground mt-4 leading-relaxed">
                {content.cta.description}
              </Text>
            </div>
            <div className="md:justify-self-end">
              <Button href={content.cta.action.href} className="hb-primary hb-radius">
                {content.cta.action.label}
              </Button>
            </div>
          </Grid>
        </Container>
      </Section>
    ),
  };
  return (
    <BrandScope brand={brand} data-composition={composition.id}>
      <a
        href="#page-content"
        className="bg-background text-foreground sr-only focus:not-sr-only focus:absolute focus:z-50 focus:p-4"
      >
        Skip to content
      </a>
      <Section as="header" spacing="xs" bordered="bottom">
        <Container
          size="xl"
          gutter="lg"
          className="flex flex-wrap items-center justify-between gap-5"
        >
          <a
            href="#page-content"
            aria-label={`${brand.name} home`}
            className="flex min-w-0 items-center gap-3 text-xl font-semibold tracking-tight"
          >
            {brand.logo && (
              <img
                src={brand.logo.src}
                alt={brand.logo.alt}
                width={32}
                height={32}
                className="h-8 w-8 object-contain"
              />
            )}
            {brand.name}
          </a>
          <nav aria-label="Main navigation" className="flex flex-wrap items-center gap-2 sm:gap-5">
            <Button href="#benefits" variant="plain" className="hb-secondary" size="sm">
              Benefits
            </Button>
            <Button href="#questions" variant="plain" className="hb-secondary" size="sm">
              Questions
            </Button>
            <Button
              href="#product-demo"
              variant="outline"
              className="hb-secondary hb-radius"
              size="sm"
            >
              Try the demo
            </Button>
          </nav>
        </Container>
      </Section>
      <main id="page-content">
        <HeroSection id="hero" content={content.hero} config={composition.hero} />
        {Array.from(new Set(composition.sections)).map((id) => (
          <React.Fragment key={id}>{sections[id]}</React.Fragment>
        ))}
      </main>
      <Section as="footer" spacing="sm" bordered="top">
        <Container size="xl" gutter="lg" className="flex flex-wrap justify-between gap-4">
          <Text className="font-medium">{brand.name}</Text>
          <Text variant="small" className="text-muted-foreground max-w-prose">
            {content.footer}
          </Text>
        </Container>
      </Section>
    </BrandScope>
  );
}
