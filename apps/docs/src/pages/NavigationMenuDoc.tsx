import { useState } from "react";
import {
  Button,
  Heading,
  NavigationMenu,
  NavigationMenuAction,
  NavigationMenuActions,
  NavigationMenuBar,
  NavigationMenuBrand,
  NavigationMenuCard,
  NavigationMenuContent,
  NavigationMenuGroup,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuMobile,
  NavigationMenuSearch,
  NavigationMenuToggle,
  NavigationMenuTrigger,
  Section,
  Text,
  type NavigationMenuLogoPosition,
  type NavigationMenuSurface,
} from "@hudbird/ui";
import { Boxes, Code2, Feather, ShieldCheck } from "lucide-react";
import { ApiTable, type ApiPropRow } from "../components/ApiTable";
import { CodeBlock } from "../components/CodeBlock";
import { ComponentPreview } from "../components/ComponentPreview";
import { DocHeader } from "../components/DocHeader";

const importCode = `import {
  NavigationMenu,
  NavigationMenuAction,
  NavigationMenuActions,
  NavigationMenuBar,
  NavigationMenuBrand,
  NavigationMenuCard,
  NavigationMenuContent,
  NavigationMenuGroup,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuMobile,
  NavigationMenuSearch,
  NavigationMenuToggle,
  NavigationMenuTrigger,
} from "@hudbird/ui";`;

const basicCode = `<NavigationMenu surface="glass" position="sticky">
  <NavigationMenuBar>
    <NavigationMenuBrand href="/">Hudbird</NavigationMenuBrand>

    <NavigationMenuList>
      <NavigationMenuItem>
        <NavigationMenuLink href="/docs" active>Docs</NavigationMenuLink>
      </NavigationMenuItem>
      <NavigationMenuItem value="products">
        <NavigationMenuTrigger>Products</NavigationMenuTrigger>
        <NavigationMenuContent>
          <NavigationMenuGroup>
            <NavigationMenuCard href="/components" description="Accessible primitives">
              Components
            </NavigationMenuCard>
          </NavigationMenuGroup>
        </NavigationMenuContent>
      </NavigationMenuItem>
    </NavigationMenuList>

    <NavigationMenuActions>
      <NavigationMenuSearch shortcut="⌘K" />
      <NavigationMenuAction intent="primary">Open builder</NavigationMenuAction>
      <NavigationMenuToggle />
    </NavigationMenuActions>
  </NavigationMenuBar>

  <NavigationMenuMobile>
    <NavigationMenuLink href="/docs">Docs</NavigationMenuLink>
  </NavigationMenuMobile>
</NavigationMenu>`;

const rootApiRows: ApiPropRow[] = [
  {
    prop: "logoPosition",
    type: '"left" | "center" | "right"',
    defaultVal: '"left"',
    description: "Places the brand and balances the desktop navigation regions.",
  },
  {
    prop: "surface",
    type: '"transparent" | "glass" | "flat"',
    defaultVal: '"glass"',
    description: "Selects the navigation background, border, blur, and elevation treatment.",
  },
  {
    prop: "position",
    type: '"static" | "sticky" | "fixed"',
    defaultVal: '"sticky"',
    description: "Controls how the top navigation is positioned in the document.",
  },
  {
    prop: "scrollBehavior",
    type: '"none" | "elevate" | "hide"',
    defaultVal: '"elevate"',
    description:
      "Keeps the surface still, adds scroll elevation, or hides it while scrolling down.",
  },
  {
    prop: "scrollThreshold",
    type: "number",
    defaultVal: "12",
    description: "Scroll distance in pixels before the elevated or hidden state begins.",
  },
  {
    prop: "value / defaultValue",
    type: "string | null",
    defaultVal: "null",
    description: "Controls or initializes the open desktop dropdown.",
  },
  {
    prop: "onValueChange",
    type: "(value: string | null) => void",
    defaultVal: "-",
    description: "Runs when a desktop dropdown opens or closes.",
  },
  {
    prop: "mobileOpen / defaultMobileOpen",
    type: "boolean",
    defaultVal: "false",
    description: "Controls or initializes the responsive navigation panel.",
  },
  {
    prop: "onMobileOpenChange",
    type: "(open: boolean) => void",
    defaultVal: "-",
    description: "Runs when the responsive panel changes state.",
  },
];

const compositionRows: ApiPropRow[] = [
  {
    prop: "NavigationMenuContent.layout",
    type: '"dropdown" | "mega"',
    defaultVal: '"dropdown"',
    description: "Chooses a compact vertical panel or a wide mega-menu surface.",
  },
  {
    prop: "NavigationMenuContent.align",
    type: '"start" | "center" | "end"',
    defaultVal: '"start"',
    description: "Aligns the dropdown with its trigger item.",
  },
  {
    prop: "NavigationMenuGroup.columns",
    type: "1 | 2 | 3 | 4",
    defaultVal: "1",
    description: "Sets responsive columns for menu cards.",
  },
  {
    prop: "NavigationMenuAction.intent",
    type: '"primary" | "secondary"',
    defaultVal: '"secondary"',
    description: "Maps navigation actions to Hudbird solid or outline Button styles.",
  },
  {
    prop: "NavigationMenuSearch.shortcut",
    type: "ReactNode",
    defaultVal: "-",
    description: "Shows an optional visual keyboard shortcut without changing the accessible name.",
  },
  {
    prop: "NavigationMenuLink.active",
    type: "boolean",
    defaultVal: "false",
    description: "Adds the active appearance and aria-current page state.",
  },
];

function ProductNavigation({
  surface = "glass",
  logoPosition = "left",
}: {
  surface?: NavigationMenuSurface;
  logoPosition?: NavigationMenuLogoPosition;
}) {
  return (
    <NavigationMenu surface={surface} logoPosition={logoPosition} position="static">
      <NavigationMenuBar>
        <NavigationMenuBrand href="#navigation-menu">hudbird</NavigationMenuBrand>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuLink href="#examples" active>
              Overview
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem value="products">
            <NavigationMenuTrigger>Products</NavigationMenuTrigger>
            <NavigationMenuContent>
              <NavigationMenuGroup>
                <NavigationMenuCard
                  href="#component-api"
                  description="Typed, accessible interface foundations."
                >
                  Core components
                </NavigationMenuCard>
                <NavigationMenuCard
                  href="#mega-menu"
                  description="Responsive navigation for product websites."
                >
                  Navigation patterns
                </NavigationMenuCard>
              </NavigationMenuGroup>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem value="solutions">
            <NavigationMenuTrigger>Solutions</NavigationMenuTrigger>
            <NavigationMenuContent layout="mega" align="center">
              <NavigationMenuGroup columns={2}>
                <NavigationMenuCard
                  href="#surface-variants"
                  startContent={<Feather className="h-4 w-4" />}
                  description="Calm surfaces and clear hierarchy."
                >
                  Product websites
                </NavigationMenuCard>
                <NavigationMenuCard
                  href="#responsive-menu"
                  startContent={<Boxes className="h-4 w-4" />}
                  description="Composable navigation regions."
                >
                  Application shells
                </NavigationMenuCard>
                <NavigationMenuCard
                  href="#component-api"
                  startContent={<ShieldCheck className="h-4 w-4" />}
                  description="Keyboard and focus behavior included."
                >
                  Accessible defaults
                </NavigationMenuCard>
                <NavigationMenuCard
                  href="#installation"
                  startContent={<Code2 className="h-4 w-4" />}
                  description="Source and types remain in your project."
                >
                  React source
                </NavigationMenuCard>
              </NavigationMenuGroup>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
        <NavigationMenuActions>
          <NavigationMenuSearch shortcut="⌘K" />
          <NavigationMenuAction intent="primary">Open builder</NavigationMenuAction>
          <NavigationMenuToggle />
        </NavigationMenuActions>
      </NavigationMenuBar>
      <NavigationMenuMobile className="space-y-1">
        <NavigationMenuLink href="#examples" active className="flex w-full">
          Overview
        </NavigationMenuLink>
        <NavigationMenuLink href="#component-api" className="flex w-full">
          Component API
        </NavigationMenuLink>
        <NavigationMenuAction intent="primary" className="mt-3 w-full">
          Open builder
        </NavigationMenuAction>
      </NavigationMenuMobile>
    </NavigationMenu>
  );
}

const layoutOrder: Record<NavigationMenuLogoPosition, string> = {
  left: "Logo → Menu links → Search + CTA",
  center: "Menu links → Logo → Search + CTA",
  right: "Search + CTA → Menu links → Logo",
};

export default function NavigationMenuDoc() {
  const [surface, setSurface] = useState<NavigationMenuSurface>("glass");
  const [logoPosition, setLogoPosition] = useState<NavigationMenuLogoPosition>("left");

  return (
    <div className="space-y-20 pb-24">
      <DocHeader
        category="Core component"
        title="Navigation Menu"
        badge="New"
        description="A responsive top navigation with simple dropdowns, mega menus, search, calls to action, flexible logo placement, and restrained scroll behavior."
      />

      <Section id="installation" spacing="none" className="space-y-6">
        <Heading as="h2" size="xl">
          Import
        </Heading>
        <Text variant="muted" className="max-w-3xl">
          Navigation Menu is exported from the core package. CLI registration is not documented
          until the component is added to the public registry.
        </Text>
        <CodeBlock code={importCode} filename="NavigationMenuExample.tsx" />
      </Section>

      <Section id="examples" spacing="none" className="space-y-12">
        <div className="space-y-3">
          <Heading as="h2" size="xl">
            Examples
          </Heading>
          <Text variant="muted" className="max-w-3xl">
            Open Products for a vertical dropdown or Solutions for the responsive mega menu.
          </Text>
        </div>

        <div id="standard-navigation" className="space-y-5">
          <Heading as="h3" size="lg">
            Product navigation
          </Heading>
          <ComponentPreview iframeMode="none" title="Default navigation">
            <div className="bg-background min-h-72 w-full">
              <ProductNavigation />
            </div>
          </ComponentPreview>
          <CodeBlock code={basicCode} filename="ProductNavigation.tsx" />
        </div>

        <div id="surface-variants" className="space-y-5">
          <div className="space-y-2">
            <Heading as="h3" size="lg">
              Surface and logo placement
            </Heading>
            <Text variant="muted">
              Change the navigation treatment without rebuilding its content or interaction model.
            </Text>
          </div>
          <div className="flex flex-wrap gap-3">
            <div className="border-border bg-muted inline-flex flex-wrap items-center gap-1 rounded-xl border p-1">
              {(["transparent", "glass", "flat"] as const).map((option) => (
                <Button
                  key={option}
                  type="button"
                  size="sm"
                  variant={surface === option ? "solid" : "plain"}
                  color={surface === option ? "primary" : "zinc"}
                  aria-pressed={surface === option}
                  onClick={() => setSurface(option)}
                >
                  {option}
                </Button>
              ))}
            </div>
            <div className="border-border bg-muted inline-flex flex-wrap items-center gap-1 rounded-xl border p-1">
              {(["left", "center", "right"] as const).map((option) => (
                <Button
                  key={option}
                  type="button"
                  size="sm"
                  variant={logoPosition === option ? "solid" : "plain"}
                  color={logoPosition === option ? "primary" : "zinc"}
                  aria-pressed={logoPosition === option}
                  onClick={() => setLogoPosition(option)}
                >
                  {option}
                </Button>
              ))}
            </div>
          </div>
          <Text variant="muted" aria-live="polite">
            Current layout: {layoutOrder[logoPosition]}. Surface: {surface}.
          </Text>
          <ComponentPreview iframeMode="none" showControls={false}>
            <div className="border-border relative min-h-64 w-full overflow-hidden border-y">
              <div aria-hidden="true" className="bg-background absolute inset-0 grid grid-cols-3">
                <span className="bg-muted/80" />
                <span className="bg-background" />
                <span className="bg-muted/50" />
              </div>
              <div className="relative p-4">
                <ProductNavigation
                  key={`${surface}-${logoPosition}`}
                  surface={surface}
                  logoPosition={logoPosition}
                />
              </div>
            </div>
          </ComponentPreview>
        </div>

        <div id="responsive-menu" className="space-y-5">
          <Heading as="h3" size="lg">
            Responsive menu
          </Heading>
          <Text variant="muted" className="max-w-3xl">
            The toggle controls a separate mobile panel. Escape closes the panel and restores focus
            to its trigger.
          </Text>
          <ComponentPreview iframeMode="none" showControls={false}>
            <div className="bg-background min-h-72 w-full max-w-md">
              <NavigationMenu position="static" surface="flat">
                <NavigationMenuBar maxWidth="full">
                  <NavigationMenuBrand href="#responsive-menu">hudbird</NavigationMenuBrand>
                  <NavigationMenuActions>
                    <NavigationMenuToggle className="inline-flex md:inline-flex" />
                  </NavigationMenuActions>
                </NavigationMenuBar>
                <NavigationMenuMobile className="block md:block">
                  <div className="flex flex-col gap-1">
                    <NavigationMenuLink href="#examples">Examples</NavigationMenuLink>
                    <NavigationMenuLink href="#component-api">API</NavigationMenuLink>
                    <NavigationMenuAction intent="primary" className="mt-3 w-full">
                      Open builder
                    </NavigationMenuAction>
                  </div>
                </NavigationMenuMobile>
              </NavigationMenu>
            </div>
          </ComponentPreview>
        </div>
      </Section>

      <Section id="component-api" spacing="none" className="space-y-8">
        <Heading as="h2" size="xl">
          Component API
        </Heading>
        <ApiTable title="NavigationMenu" rows={rootApiRows} />
        <ApiTable
          title="Composition props"
          note="All subcomponents also accept the native attributes of their rendered element."
          rows={compositionRows}
        />
      </Section>
    </div>
  );
}
