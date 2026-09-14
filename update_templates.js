const fs = require("fs");
const path = require("path");

const templatesDir = path.join(__dirname, "apps/docs/src/components/templates");

// Helper to define common props
const CtaCenteredProps = `
      <CtaCentered
        title="Ready to transform your business?"
        description="Join thousands of companies using our platform to scale their operations and increase revenue."
        primaryAction={{ label: "Get Started Free", onClick: () => {} }}
        secondaryAction={{ label: "Contact Sales", href: "#" }}
      />
`;

const CtaSplitProps = `
      <CtaSplit
        title="Download our app today."
        description="Get full access to all features directly from your mobile device. Available on iOS and Android."
        imageSrc="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=2850&q=80"
        primaryAction={{ label: "App Store", href: "#" }}
        secondaryAction={{ label: "Google Play", href: "#" }}
      />
`;

const FooterMegaProps = `
      <FooterMega
        brandName="Hudbird UI"
        description="Making the world a better place through elegant design."
        linkGroups={[
          {
            title: "Product",
            links: [
              { label: "Features", href: "#" },
              { label: "Integrations", href: "#" },
              { label: "Pricing", href: "#" },
              { label: "Changelog", href: "#" }
            ]
          },
          {
            title: "Company",
            links: [
              { label: "About Us", href: "#" },
              { label: "Careers", href: "#" },
              { label: "Blog", href: "#" },
              { label: "Contact", href: "#" }
            ]
          },
          {
            title: "Legal",
            links: [
              { label: "Privacy Policy", href: "#" },
              { label: "Terms of Service", href: "#" }
            ]
          }
        ]}
        copyright="&copy; 2026 Hudbird UI, Inc. All rights reserved."
      />
`;

const FooterSimpleProps = `
      <FooterSimple
        links={[
          { label: "About", href: "#" },
          { label: "Blog", href: "#" },
          { label: "Jobs", href: "#" },
          { label: "Press", href: "#" },
          { label: "Partners", href: "#" }
        ]}
        copyright="&copy; 2026 Hudbird UI, Inc. All rights reserved."
      />
`;

function replaceInFile(filename, replacements) {
  let content = fs.readFileSync(path.join(templatesDir, filename), "utf8");
  for (const [target, replacement] of replacements) {
    content = content.replace(target, replacement.trim());
  }
  fs.writeFileSync(path.join(templatesDir, filename), content);
}

replaceInFile("AiStartupTemplate.tsx", [
  ["<CtaCentered />", CtaCenteredProps],
  ["<FooterMega />", FooterMegaProps],
]);

replaceInFile("FintechTemplate.tsx", [
  ["<CtaSplit />", CtaSplitProps],
  ["<FooterSimple />", FooterSimpleProps],
]);

replaceInFile("EcommerceTemplate.tsx", [
  ["<CtaCentered />", CtaCenteredProps],
  ["<FooterMega />", FooterMegaProps],
]);

console.log("Templates updated successfully!");
