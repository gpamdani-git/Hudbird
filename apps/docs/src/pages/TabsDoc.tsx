// apps/docs/src/pages/TabsDoc.tsx
import React, { useState } from "react";
import { Tabs, Tab, TabList, TabPanel, Card, CardBody, Button, Badge } from "@hudbird/ui";
import { Music, Image, Video, Settings, User, Bell, Shield, Heart } from "lucide-react";
import { ComponentPreview } from "../components/ComponentPreview";
import { CodeBlock } from "../components/CodeBlock";
import { ApiTable, type ApiPropRow } from "../components/ApiTable";

export const tabsTocItems = [
  { id: "component-api", title: "Component API" },
  {
    id: "examples",
    title: "Examples",
    children: [
      { id: "basic-tabs", title: "Basic Usage" },
      { id: "tab-variants", title: "Variants (Solid, Bordered, Light, Underlined)" },
      { id: "tab-colors", title: "Color Options" },
      { id: "sizes-and-radius", title: "Sizes & Radius" },
      { id: "icons-and-badges", title: "With Icons & Badges" },
      { id: "vertical-tabs", title: "Vertical Orientation" },
      { id: "disabled-state", title: "Disabled States" },
      { id: "full-width-tabs", title: "Full Width" },
    ],
  },
];

export default function TabsDoc() {
  const [selectedKey, setSelectedKey] = useState("photos");
  const [variantSelected, setVariantSelected] = useState("account");

  const tabsApiRows: ApiPropRow[] = [
    {
      prop: "variant",
      type: '"solid" | "bordered" | "light" | "underlined"',
      defaultVal: '"solid"',
      description: "Visual appearance style of the tab list container.",
    },
    {
      prop: "color",
      type: '"default" | "primary" | "success" | "warning" | "danger"',
      defaultVal: '"primary"',
      description: "Accent color applied to the active tab.",
    },
    {
      prop: "size",
      type: '"sm" | "md" | "lg"',
      defaultVal: '"md"',
      description: "Size dimensions of tabs and labels.",
    },
    {
      prop: "radius",
      type: '"none" | "sm" | "md" | "lg" | "full"',
      defaultVal: '"md"',
      description: "Border radius applied to tabs and container.",
    },
    {
      prop: "selectedKey",
      type: "string",
      defaultVal: "-",
      description: "Controlled key of the currently active tab.",
    },
    {
      prop: "defaultSelectedKey",
      type: "string",
      defaultVal: "first child key",
      description: "Default initial tab key when uncontrolled.",
    },
    {
      prop: "onSelectionChange",
      type: "(key: string) => void",
      defaultVal: "-",
      description: "Callback invoked when selected tab changes.",
    },
    {
      prop: "orientation",
      type: '"horizontal" | "vertical"',
      defaultVal: '"horizontal"',
      description: "Layout direction of the tab items.",
    },
    {
      prop: "fullWidth",
      type: "boolean",
      defaultVal: "false",
      description: "Whether tabs expand to occupy full container width.",
    },
    {
      prop: "isDisabled",
      type: "boolean",
      defaultVal: "false",
      description: "Disables all tabs in the group.",
    },
  ];

  const tabItemApiRows: ApiPropRow[] = [
    {
      prop: "title",
      type: "ReactNode",
      defaultVal: "-",
      description: "Tab button label text or element.",
    },
    {
      prop: "icon",
      type: "ReactNode",
      defaultVal: "-",
      description: "Leading icon displayed in the tab trigger.",
    },
    {
      prop: "badge",
      type: "ReactNode",
      defaultVal: "-",
      description: "Trailing count or status indicator pill.",
    },
    {
      prop: "isDisabled",
      type: "boolean",
      defaultVal: "false",
      description: "Disables individual tab interaction.",
    },
  ];

  return (
    <div className="space-y-16 pb-24">
      {/* Title & Subtitle */}
      <div>
        <div className="flex items-center gap-3 mb-3">
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">
            Tabs
          </h1>
          <span className="text-xs font-semibold px-2 py-0.5 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-full border border-emerald-500/20">
            New
          </span>
          <span className="text-xs font-semibold px-2 py-0.5 bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 rounded-full border border-indigo-500/20">
            Component
          </span>
        </div>
        <p className="text-base text-zinc-600 dark:text-zinc-400">
          Tabs organize related content across multiple panels, allowing users to switch between
          different views within the same context with full keyboard navigation and WAI-ARIA compliance.
        </p>
      </div>

      {/* Main Preview */}
      <section className="space-y-4">
        <ComponentPreview>
          <div className="w-full max-w-md mx-auto">
            <Tabs
              selectedKey={selectedKey}
              onSelectionChange={setSelectedKey}
              aria-label="Media options"
              color="primary"
            >
              <Tab key="photos" title="Photos" icon={<Image className="w-4 h-4" />}>
                <Card className="border border-zinc-200 dark:border-zinc-800 shadow-2xs">
                  <CardBody className="p-4 space-y-2">
                    <h4 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                      Photo Gallery
                    </h4>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">
                      Explore your high-resolution albums, cloud synchronizations, and shared family
                      memories.
                    </p>
                    <div className="pt-2">
                      <Button size="sm" variant="flat">Upload photos</Button>
                    </div>
                  </CardBody>
                </Card>
              </Tab>
              <Tab key="music" title="Music" icon={<Music className="w-4 h-4" />} badge="12">
                <Card className="border border-zinc-200 dark:border-zinc-800 shadow-2xs">
                  <CardBody className="p-4 space-y-2">
                    <h4 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                      Audio Library
                    </h4>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">
                      Curated playlists, recent podcast episodes, and offline audio downloads.
                    </p>
                    <div className="pt-2">
                      <Button size="sm" variant="solid">Play recent</Button>
                    </div>
                  </CardBody>
                </Card>
              </Tab>
              <Tab key="videos" title="Videos" icon={<Video className="w-4 h-4" />}>
                <Card className="border border-zinc-200 dark:border-zinc-800 shadow-2xs">
                  <CardBody className="p-4 space-y-2">
                    <h4 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                      Video Stream
                    </h4>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">
                      4K HDR video captures, live recording logs, and shared reels.
                    </p>
                    <div className="pt-2">
                      <Button size="sm" variant="outline">Browse library</Button>
                    </div>
                  </CardBody>
                </Card>
              </Tab>
            </Tabs>
          </div>
        </ComponentPreview>

        <CodeBlock
          code={`import { Tabs, Tab, Card, CardBody } from "@hudbird/ui";
import { Image, Music, Video } from "lucide-react";

export default function Example() {
  return (
    <Tabs aria-label="Media Options" color="primary">
      <Tab key="photos" title="Photos" icon={<Image className="w-4 h-4" />}>
        <Card>
          <CardBody>Photo Gallery Content</CardBody>
        </Card>
      </Tab>
      <Tab key="music" title="Music" icon={<Music className="w-4 h-4" />} badge="12">
        <Card>
          <CardBody>Audio Library Content</CardBody>
        </Card>
      </Tab>
      <Tab key="videos" title="Videos" icon={<Video className="w-4 h-4" />}>
        <Card>
          <CardBody>Video Stream Content</CardBody>
        </Card>
      </Tab>
    </Tabs>
  );
}`}
        />
      </section>

      {/* Component API */}
      <section className="space-y-6" id="component-api">
        <div className="border-b border-zinc-200 dark:border-zinc-800 pb-2">
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
            Component API
          </h2>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">
            Properties and handlers for the root <code className="text-xs font-mono bg-zinc-100 dark:bg-zinc-800 px-1 py-0.5 rounded">Tabs</code> and <code className="text-xs font-mono bg-zinc-100 dark:bg-zinc-800 px-1 py-0.5 rounded">Tab</code> subcomponent.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 mb-3">
            Tabs Props
          </h3>
          <ApiTable rows={tabsApiRows} />
        </div>

        <div>
          <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 mb-3">
            Tab Item Props
          </h3>
          <ApiTable rows={tabItemApiRows} />
        </div>
      </section>

      {/* Examples & Variants */}
      <div className="space-y-12" id="examples">
        <div className="border-b border-zinc-200 dark:border-zinc-800 pb-2">
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
            Examples & Variants
          </h2>
        </div>

        {/* Basic Usage */}
        <section className="space-y-4" id="basic-tabs">
          <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
            Basic Usage
          </h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            A standard tab bar with declarative panels rendered inside.
          </p>
          <ComponentPreview>
            <div className="w-full max-w-md">
              <Tabs aria-label="Simple tabs">
                <Tab key="overview" title="Overview">
                  <div className="p-4 rounded-lg bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200/80 dark:border-zinc-800 text-sm">
                    Overview panel with project analytics summary.
                  </div>
                </Tab>
                <Tab key="activity" title="Activity">
                  <div className="p-4 rounded-lg bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200/80 dark:border-zinc-800 text-sm">
                    Recent deployment events and team changes.
                  </div>
                </Tab>
                <Tab key="settings" title="Settings">
                  <div className="p-4 rounded-lg bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200/80 dark:border-zinc-800 text-sm">
                    Workspace and notification preferences.
                  </div>
                </Tab>
              </Tabs>
            </div>
          </ComponentPreview>
          <CodeBlock
            code={`<Tabs aria-label="Simple tabs">
  <Tab key="overview" title="Overview">Overview panel content</Tab>
  <Tab key="activity" title="Activity">Activity logs</Tab>
  <Tab key="settings" title="Settings">Settings panel</Tab>
</Tabs>`}
          />
        </section>

        {/* Variants */}
        <section className="space-y-4" id="tab-variants">
          <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
            Variants
          </h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Tabs support 4 distinct visual variants: <code className="text-xs bg-zinc-100 dark:bg-zinc-800 px-1 py-0.5 rounded">solid</code>, <code className="text-xs bg-zinc-100 dark:bg-zinc-800 px-1 py-0.5 rounded">bordered</code>, <code className="text-xs bg-zinc-100 dark:bg-zinc-800 px-1 py-0.5 rounded">light</code>, and <code className="text-xs bg-zinc-100 dark:bg-zinc-800 px-1 py-0.5 rounded">underlined</code>.
          </p>
          <ComponentPreview>
            <div className="w-full max-w-lg space-y-6">
              <div>
                <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider block mb-2">
                  Solid (Default)
                </span>
                <Tabs variant="solid" defaultSelectedKey="dashboard">
                  <Tab key="dashboard" title="Dashboard" />
                  <Tab key="analytics" title="Analytics" />
                  <Tab key="reports" title="Reports" />
                </Tabs>
              </div>

              <div>
                <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider block mb-2">
                  Bordered
                </span>
                <Tabs variant="bordered" defaultSelectedKey="dashboard">
                  <Tab key="dashboard" title="Dashboard" />
                  <Tab key="analytics" title="Analytics" />
                  <Tab key="reports" title="Reports" />
                </Tabs>
              </div>

              <div>
                <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider block mb-2">
                  Light
                </span>
                <Tabs variant="light" defaultSelectedKey="dashboard">
                  <Tab key="dashboard" title="Dashboard" />
                  <Tab key="analytics" title="Analytics" />
                  <Tab key="reports" title="Reports" />
                </Tabs>
              </div>

              <div>
                <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider block mb-2">
                  Underlined
                </span>
                <Tabs variant="underlined" defaultSelectedKey="dashboard">
                  <Tab key="dashboard" title="Dashboard" />
                  <Tab key="analytics" title="Analytics" />
                  <Tab key="reports" title="Reports" />
                </Tabs>
              </div>
            </div>
          </ComponentPreview>
          <CodeBlock
            code={`<Tabs variant="solid">...</Tabs>
<Tabs variant="bordered">...</Tabs>
<Tabs variant="light">...</Tabs>
<Tabs variant="underlined">...</Tabs>`}
          />
        </section>

        {/* Colors */}
        <section className="space-y-4" id="tab-colors">
          <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
            Colors
          </h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Choose from 5 dynamic semantic color variations.
          </p>
          <ComponentPreview>
            <div className="w-full max-w-lg flex flex-col gap-4">
              <Tabs color="primary" defaultSelectedKey="1">
                <Tab key="1" title="Primary" />
                <Tab key="2" title="Selected" />
              </Tabs>
              <Tabs color="success" defaultSelectedKey="1">
                <Tab key="1" title="Success" />
                <Tab key="2" title="Approved" />
              </Tabs>
              <Tabs color="warning" defaultSelectedKey="1">
                <Tab key="1" title="Warning" />
                <Tab key="2" title="Pending" />
              </Tabs>
              <Tabs color="danger" defaultSelectedKey="1">
                <Tab key="1" title="Danger" />
                <Tab key="2" title="Archived" />
              </Tabs>
              <Tabs color="default" defaultSelectedKey="1">
                <Tab key="1" title="Default" />
                <Tab key="2" title="Neutral" />
              </Tabs>
            </div>
          </ComponentPreview>
          <CodeBlock
            code={`<Tabs color="primary">...</Tabs>
<Tabs color="success">...</Tabs>
<Tabs color="warning">...</Tabs>
<Tabs color="danger">...</Tabs>
<Tabs color="default">...</Tabs>`}
          />
        </section>

        {/* Sizes and Radius */}
        <section className="space-y-4" id="sizes-and-radius">
          <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
            Sizes & Radius
          </h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Control the height, padding, and corner curvature of your tabs.
          </p>
          <ComponentPreview>
            <div className="w-full max-w-lg space-y-4">
              <Tabs size="sm" radius="sm" defaultSelectedKey="1">
                <Tab key="1" title="Small (sm)" />
                <Tab key="2" title="Compact" />
              </Tabs>
              <Tabs size="md" radius="md" defaultSelectedKey="1">
                <Tab key="1" title="Medium (md)" />
                <Tab key="2" title="Standard" />
              </Tabs>
              <Tabs size="lg" radius="full" defaultSelectedKey="1">
                <Tab key="1" title="Large Full Pill (lg)" />
                <Tab key="2" title="Pill Rounded" />
              </Tabs>
            </div>
          </ComponentPreview>
          <CodeBlock
            code={`<Tabs size="sm" radius="sm">...</Tabs>
<Tabs size="md" radius="md">...</Tabs>
<Tabs size="lg" radius="full">...</Tabs>`}
          />
        </section>

        {/* Icons & Badges */}
        <section className="space-y-4" id="icons-and-badges">
          <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
            With Icons & Badges
          </h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Pair informative Lucide vector icons or counter badges next to tab titles.
          </p>
          <ComponentPreview>
            <div className="w-full max-w-md">
              <Tabs variant="underlined" color="primary" defaultSelectedKey="notifications">
                <Tab
                  key="account"
                  title="Account"
                  icon={<User className="w-4 h-4" />}
                />
                <Tab
                  key="notifications"
                  title="Notifications"
                  icon={<Bell className="w-4 h-4" />}
                  badge="3"
                />
                <Tab
                  key="security"
                  title="Security"
                  icon={<Shield className="w-4 h-4" />}
                />
              </Tabs>
            </div>
          </ComponentPreview>
          <CodeBlock
            code={`<Tabs variant="underlined" color="primary">
  <Tab key="account" title="Account" icon={<User className="w-4 h-4" />} />
  <Tab key="notifications" title="Notifications" icon={<Bell className="w-4 h-4" />} badge="3" />
  <Tab key="security" title="Security" icon={<Shield className="w-4 h-4" />} />
</Tabs>`}
          />
        </section>

        {/* Vertical Orientation */}
        <section className="space-y-4" id="vertical-tabs">
          <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
            Vertical Orientation
          </h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Switch <code className="text-xs bg-zinc-100 dark:bg-zinc-800 px-1 py-0.5 rounded">orientation="vertical"</code> to layout tabs along the left side with vertical Arrow navigation.
          </p>
          <ComponentPreview>
            <div className="w-full max-w-md">
              <Tabs orientation="vertical" variant="light" color="primary" defaultSelectedKey="profile">
                <Tab key="profile" title="Profile" icon={<User className="w-4 h-4" />}>
                  <div className="p-4 rounded-lg bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 text-sm">
                    Manage your public profile information and avatar photo.
                  </div>
                </Tab>
                <Tab key="billing" title="Billing" icon={<Heart className="w-4 h-4" />}>
                  <div className="p-4 rounded-lg bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 text-sm">
                    Payment methods, credit cards, and invoice history.
                  </div>
                </Tab>
                <Tab key="settings" title="Settings" icon={<Settings className="w-4 h-4" />}>
                  <div className="p-4 rounded-lg bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 text-sm">
                    Application settings, language, and dark mode toggles.
                  </div>
                </Tab>
              </Tabs>
            </div>
          </ComponentPreview>
          <CodeBlock
            code={`<Tabs orientation="vertical" variant="light" color="primary">
  <Tab key="profile" title="Profile" icon={<User className="w-4 h-4" />}>
    Profile Content
  </Tab>
  <Tab key="billing" title="Billing" icon={<Heart className="w-4 h-4" />}>
    Billing Content
  </Tab>
</Tabs>`}
          />
        </section>

        {/* Disabled States */}
        <section className="space-y-4" id="disabled-state">
          <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
            Disabled States
          </h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Tabs can be disabled individually using <code className="text-xs bg-zinc-100 dark:bg-zinc-800 px-1 py-0.5 rounded">isDisabled</code> on a tab or globally on the root.
          </p>
          <ComponentPreview>
            <div className="w-full max-w-md">
              <Tabs defaultSelectedKey="active">
                <Tab key="active" title="Available" />
                <Tab key="disabled" title="Disabled" isDisabled />
                <Tab key="pro" title="Pro Feature" isDisabled badge="Locked" />
              </Tabs>
            </div>
          </ComponentPreview>
          <CodeBlock
            code={`<Tabs>
  <Tab key="active" title="Available" />
  <Tab key="disabled" title="Disabled" isDisabled />
  <Tab key="pro" title="Pro Feature" isDisabled badge="Locked" />
</Tabs>`}
          />
        </section>

        {/* Full Width */}
        <section className="space-y-4" id="full-width-tabs">
          <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
            Full Width
          </h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Tabs can expand to equally distribute space across the parent container using <code className="text-xs bg-zinc-100 dark:bg-zinc-800 px-1 py-0.5 rounded">fullWidth</code>.
          </p>
          <ComponentPreview>
            <div className="w-full max-w-md">
              <Tabs fullWidth defaultSelectedKey="tab1">
                <Tab key="tab1" title="Monthly" />
                <Tab key="tab2" title="Annually (Save 20%)" />
              </Tabs>
            </div>
          </ComponentPreview>
          <CodeBlock
            code={`<Tabs fullWidth>
  <Tab key="monthly" title="Monthly" />
  <Tab key="annually" title="Annually (Save 20%)" />
</Tabs>`}
          />
        </section>
      </div>
    </div>
  );
}
