const fs = require("fs");
const path = require("path");

const examples = {
  accordion: `import { Accordion, AccordionItem } from "@hudbird/ui";
import { Zap, Shield, Sparkles } from "lucide-react";

export default function Example() {
  return (
    <Accordion variant="shadow" defaultSelectedKeys={["1"]}>
      <AccordionItem
        itemKey="1"
        startContent={<Zap className="w-4 h-4 text-indigo-500" />}
        title="What makes our Design System unique?"
        subtitle="Engineered with Tailwind CSS and CVA"
      >
        Our component library is compiled directly from source...
      </AccordionItem>
      <AccordionItem
        itemKey="2"
        startContent={<Shield className="w-4 h-4 text-emerald-500" />}
        title="Is it accessible out-of-the-box?"
      >
        Yes! Every interactive element includes explicit focus rings...
      </AccordionItem>
    </Accordion>
  );
}`,
  alert: `import { Alert } from "@hudbird/ui";
import { Info } from "lucide-react";

export default function Example() {
  return (
    <Alert color="blue" icon={<Info className="w-4 h-4" />}>
      A new software update is available. See what's new.
    </Alert>
  );
}`,
  avatar: `import { Avatar } from "@hudbird/ui";

export default function Example() {
  return (
    <div className="flex gap-4">
      <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026024d" size="md" />
      <Avatar initials="JD" color="primary" size="md" />
    </div>
  );
}`,
  badge: `import { Badge } from "@hudbird/ui";

export default function Example() {
  return (
    <Badge color="emerald">Success</Badge>
  );
}`,
  button: `import { Button } from "@hudbird/ui";
import { ArrowRight } from "lucide-react";

export default function Example() {
  return (
    <Button color="primary">
      Get Started <ArrowRight className="w-4 h-4 ml-2" />
    </Button>
  );
}`,
  card: `import { Card, CardHeader, CardBody, CardFooter, Button, Text } from "@hudbird/ui";

export default function Example() {
  return (
    <Card className="max-w-sm">
      <CardHeader>
        <Text className="text-lg font-semibold">Account Setup</Text>
      </CardHeader>
      <CardBody>
        <Text className="text-sm text-zinc-500">Complete your profile to get started.</Text>
      </CardBody>
      <CardFooter className="flex justify-end gap-2">
        <Button variant="outline">Cancel</Button>
        <Button color="primary">Continue</Button>
      </CardFooter>
    </Card>
  );
}`,
  checkbox: `import { Checkbox, CheckboxField } from "@hudbird/ui";

export default function Example() {
  return (
    <CheckboxField label="Accept terms and conditions">
      <Checkbox defaultChecked />
    </CheckboxField>
  );
}`,
  combobox: `import { ComboBox, ComboBoxItem } from "@hudbird/ui";

export default function Example() {
  return (
    <ComboBox label="Select a framework" placeholder="Choose...">
      <ComboBoxItem id="react">React</ComboBoxItem>
      <ComboBoxItem id="vue">Vue</ComboBoxItem>
      <ComboBoxItem id="svelte">Svelte</ComboBoxItem>
    </ComboBox>
  );
}`,
  "description-list": `import { DescriptionList, DescriptionTerm, DescriptionDetails } from "@hudbird/ui";

export default function Example() {
  return (
    <DescriptionList>
      <DescriptionTerm>Full name</DescriptionTerm>
      <DescriptionDetails>Margot Foster</DescriptionDetails>
      
      <DescriptionTerm>Application for</DescriptionTerm>
      <DescriptionDetails>Backend Developer</DescriptionDetails>
    </DescriptionList>
  );
}`,
  dialog: `import { Dialog, DialogContent, DialogHeader, DialogFooter, Button } from "@hudbird/ui";

export default function Example() {
  return (
    <Dialog open={false}>
      <DialogContent>
        <DialogHeader title="Deactivate account" description="Are you sure you want to deactivate your account?" />
        <DialogFooter>
          <Button variant="outline">Cancel</Button>
          <Button color="red">Deactivate</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}`,
  divider: `import { Divider } from "@hudbird/ui";

export default function Example() {
  return (
    <div className="py-4">
      <Divider />
    </div>
  );
}`,
  dropdown: `import { Dropdown, DropdownButton, DropdownMenu, DropdownItem } from "@hudbird/ui";

export default function Example() {
  return (
    <Dropdown>
      <DropdownButton>Options</DropdownButton>
      <DropdownMenu>
        <DropdownItem>Edit</DropdownItem>
        <DropdownItem>Duplicate</DropdownItem>
        <DropdownItem color="red">Delete</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}`,
  fieldset: `import { Fieldset, Legend, FieldGroup } from "@hudbird/ui";

export default function Example() {
  return (
    <Fieldset>
      <Legend>Personal Information</Legend>
      <FieldGroup>
        {/* Fields go here */}
      </FieldGroup>
    </Fieldset>
  );
}`,
  heading: `import { Heading, Subheading } from "@hudbird/ui";

export default function Example() {
  return (
    <div>
      <Heading>Profile Settings</Heading>
      <Subheading>Manage your account settings and preferences.</Subheading>
    </div>
  );
}`,
  input: `import { Input, Field, Label } from "@hudbird/ui";

export default function Example() {
  return (
    <Field>
      <Label>Email Address</Label>
      <Input type="email" placeholder="you@example.com" />
    </Field>
  );
}`,
  navbar: `import { Navbar, NavbarItem, NavbarSection, NavbarBrand } from "@hudbird/ui";

export default function Example() {
  return (
    <Navbar>
      <NavbarBrand>Acme Corp</NavbarBrand>
      <NavbarSection>
        <NavbarItem href="/">Home</NavbarItem>
        <NavbarItem href="/dashboard">Dashboard</NavbarItem>
      </NavbarSection>
    </Navbar>
  );
}`,
  pagination: `import { Pagination, PaginationPrevious, PaginationNext, PaginationList, PaginationPage } from "@hudbird/ui";

export default function Example() {
  return (
    <Pagination>
      <PaginationPrevious href="?page=1" />
      <PaginationList>
        <PaginationPage href="?page=1">1</PaginationPage>
        <PaginationPage href="?page=2" current>2</PaginationPage>
        <PaginationPage href="?page=3">3</PaginationPage>
      </PaginationList>
      <PaginationNext href="?page=3" />
    </Pagination>
  );
}`,
  "radio-group": `import { RadioGroup, Radio, Field, Label } from "@hudbird/ui";

export default function Example() {
  return (
    <RadioGroup defaultValue="standard">
      <Field className="flex items-center gap-2">
        <Radio value="standard" />
        <Label>Standard shipping (3-5 days)</Label>
      </Field>
      <Field className="flex items-center gap-2">
        <Radio value="express" />
        <Label>Express shipping (1-2 days)</Label>
      </Field>
    </RadioGroup>
  );
}`,
  select: `import { Select, Field, Label } from "@hudbird/ui";

export default function Example() {
  return (
    <Field>
      <Label>Status</Label>
      <Select name="status">
        <option value="active">Active</option>
        <option value="paused">Paused</option>
        <option value="delayed">Delayed</option>
      </Select>
    </Field>
  );
}`,
  "sidebar-layout": `import { Sidebar, SidebarItem, SidebarNav } from "@hudbird/ui";
import { Home, Settings } from "lucide-react";

export default function Example() {
  return (
    <Sidebar>
      <SidebarNav>
        <SidebarItem icon={<Home />}>Home</SidebarItem>
        <SidebarItem icon={<Settings />}>Settings</SidebarItem>
      </SidebarNav>
    </Sidebar>
  );
}`,
  "stacked-layout": `import { Navbar, NavbarItem } from "@hudbird/ui";

export default function Example() {
  return (
    <div className="min-h-screen bg-zinc-50">
      <Navbar>
        <NavbarItem href="/">Home</NavbarItem>
      </Navbar>
      <main className="max-w-7xl mx-auto px-4 py-8">
        Content goes here
      </main>
    </div>
  );
}`,
  "auth-layout": `import { Card, CardBody, Heading } from "@hudbird/ui";

export default function Example() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-50 p-4">
      <Card className="w-full max-w-sm">
        <CardBody className="p-8">
          <Heading className="text-center mb-6">Sign in to your account</Heading>
          {/* Auth form */}
        </CardBody>
      </Card>
    </div>
  );
}`,
  skeleton: `import { Skeleton } from "@hudbird/ui";

export default function Example() {
  return (
    <div className="flex items-center gap-4">
      <Skeleton className="w-12 h-12 rounded-full" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-3 w-24" />
      </div>
    </div>
  );
}`,
  switch: `import { Switch, Field, Label } from "@hudbird/ui";

export default function Example() {
  return (
    <Field className="flex items-center gap-3">
      <Switch defaultChecked />
      <Label>Enable notifications</Label>
    </Field>
  );
}`,
  table: `import { Table, TableHead, TableRow, TableHeader, TableBody, TableCell } from "@hudbird/ui";

export default function Example() {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableHeader>Name</TableHeader>
          <TableHeader>Role</TableHeader>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow>
          <TableCell>Lindsay Walton</TableCell>
          <TableCell>Front-end Developer</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}`,
  tabs: `import { Tabs, TabList, Tab, TabPanels, TabPanel } from "@hudbird/ui";

export default function Example() {
  return (
    <Tabs defaultValue="account">
      <TabList>
        <Tab value="account">Account</Tab>
        <Tab value="password">Password</Tab>
      </TabList>
      <TabPanels>
        <TabPanel value="account">Account settings...</TabPanel>
        <TabPanel value="password">Change password...</TabPanel>
      </TabPanels>
    </Tabs>
  );
}`,
  text: `import { Text, Strong } from "@hudbird/ui";

export default function Example() {
  return (
    <Text>
      By continuing, you agree to our <Strong>Terms of Service</Strong>.
    </Text>
  );
}`,
  textarea: `import { Textarea, Field, Label } from "@hudbird/ui";

export default function Example() {
  return (
    <Field>
      <Label>Bio</Label>
      <Textarea placeholder="Tell us a little bit about yourself" rows={4} />
    </Field>
  );
}`,
  tooltip: `import { Tooltip, Button } from "@hudbird/ui";

export default function Example() {
  return (
    <Tooltip content="Add to library">
      <Button variant="outline">Hover me</Button>
    </Tooltip>
  );
}`,
  "bento-grid": `import { BentoGrid, BentoCard, BentoCardBody } from "@hudbird/marketing";

export default function Example() {
  return (
    <BentoGrid className="md:grid-cols-3 auto-rows-[20rem]">
      <BentoCard className="md:col-span-2">
        <BentoCardBody>Main Feature</BentoCardBody>
      </BentoCard>
      <BentoCard>
        <BentoCardBody>Secondary Feature</BentoCardBody>
      </BentoCard>
    </BentoGrid>
  );
}`,
  "hero-section": `import { Hero, HeroHeader, HeroBody, HeroTitle, HeroDescription } from "@hudbird/marketing";

export default function Example() {
  return (
    <Hero size="lg">
      <HeroHeader logo={<span className="font-bold">Logo</span>} />
      <HeroBody align="center">
        <HeroTitle>Build faster</HeroTitle>
        <HeroDescription>Deploy your next web application in minutes.</HeroDescription>
      </HeroBody>
    </Hero>
  );
}`,
};

function processFile(filePath) {
  let content = fs.readFileSync(filePath, "utf8");

  // Find <InstallationTabs componentName="..." />
  const regex = /<InstallationTabs\s+componentName="([^"]+)"(.*?)>/g;
  let modified = false;

  const newContent = content.replace(regex, (match, componentName, rest) => {
    // If it already has manualCode="..." or manualCode={...}
    // We want to replace it.
    let codeStr =
      examples[componentName] ||
      `import { ${componentName.replace(/-/g, "")} } from "@hudbird/ui";

export default function Example() {
  return <div />;
}`;

    // We need to properly escape the code string for a template literal if we put it in manualCode={\`...\`}
    const escapedCodeStr = codeStr
      .replace(/\\/g, "\\\\")
      .replace(/`/g, "\\`")
      .replace(/\$/g, "\\$");

    // Remove existing manualCode prop if any
    const cleanRest = rest.replace(/\smanualCode=\{.*?\}/s, "").replace(/\smanualCode=".*?"/s, "");

    modified = true;

    // Self closing logic
    if (match.endsWith("/>")) {
      return `<InstallationTabs componentName="${componentName}"${cleanRest.replace(/\/$/, "")} manualCode={\`${escapedCodeStr}\`} />`;
    } else {
      return `<InstallationTabs componentName="${componentName}"${cleanRest} manualCode={\`${escapedCodeStr}\`}>`;
    }
  });

  if (modified && newContent !== content) {
    fs.writeFileSync(filePath, newContent, "utf8");
    console.log(`Updated ${filePath}`);
  }
}

function scanDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      scanDir(fullPath);
    } else if (fullPath.endsWith("Doc.tsx")) {
      processFile(fullPath);
    }
  }
}

scanDir(path.join(__dirname, "../src/pages"));
