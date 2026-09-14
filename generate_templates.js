import fs from "fs";
import path from "path";

function extractJSX(filePath, codeVar) {
  const content = fs.readFileSync(filePath, "utf8");
  // Match the code string assigned to the variable
  const varRegex = new RegExp(`const ${codeVar}\\s*=\\s*\`([\\s\\S]*?)\`;`);
  const varMatch = content.match(varRegex);
  if (!varMatch) return `<!-- Missing ${codeVar} -->`;

  const codeStr = varMatch[1];
  // Extract JSX inside the main return (...)
  const returnRegex = /return \(\s*([\s\S]*?)\n {2}\)\n\}/;
  const match = codeStr.match(returnRegex);
  if (match) {
    return match[1];
  }
  return `<!-- Could not extract JSX from ${codeVar} -->`;
}

function extractImports(filePath, codeVar) {
  const content = fs.readFileSync(filePath, "utf8");
  const varRegex = new RegExp(`const ${codeVar}\\s*=\\s*\`([\\s\\S]*?)\`;`);
  const varMatch = content.match(varRegex);
  if (!varMatch) return [];

  const codeStr = varMatch[1];
  const importRegex = /import\s+.*?\s+from\s+['"].*?['"]/g;
  const matches = codeStr.match(importRegex) || [];
  return matches;
}

const docsDir = "./apps/docs/src/pages/marketing";

const templates = [
  {
    name: "SaaSLaunchpad",
    file: "./apps/docs/src/components/templates/SaaSTemplate.tsx",
    sections: [
      { file: "HeroDoc.tsx", codeVar: "splitCode" },
      { file: "LogoCloudDoc.tsx", codeVar: "staticGridCode" },
      { file: "FeatureSectionDoc.tsx", codeVar: "alternatingCode" },
      { file: "PricingDoc.tsx", codeVar: "threeTierCode" },
      { file: "FaqDoc.tsx", codeVar: "sideBySideCode" },
      { file: "FooterDoc.tsx", codeVar: "megaCode" },
    ],
  },
  {
    name: "ModernAppTemplate",
    file: "./apps/docs/src/components/templates/ModernAppTemplate.tsx",
    sections: [
      { file: "HeroDoc.tsx", codeVar: "minimalistCode" },
      { file: "BentoGridDoc.tsx", codeVar: "bentoGridGlassCode" },
      { file: "TestimonialsDoc.tsx", codeVar: "marqueeCode" },
      { file: "CtaDoc.tsx", codeVar: "centeredCode" },
      { file: "FooterDoc.tsx", codeVar: "simpleCode" },
    ],
  },
  {
    name: "DigitalAgencyTemplate",
    file: "./apps/docs/src/components/templates/DigitalAgencyTemplate.tsx",
    sections: [
      { file: "HeroDoc.tsx", codeVar: "fullImageSplitCode" },
      { file: "LogoCloudDoc.tsx", codeVar: "tickerCode" },
      { file: "FeatureSectionDoc.tsx", codeVar: "gridCode" },
      { file: "TestimonialsDoc.tsx", codeVar: "columnsCode" },
      { file: "CtaDoc.tsx", codeVar: "splitCode" },
      { file: "FooterDoc.tsx", codeVar: "megaCode" },
    ],
  },
];

templates.forEach((t) => {
  let allImports = new Set();
  let jsx = "";

  t.sections.forEach((s) => {
    const fPath = path.join(docsDir, s.file);
    if (!fs.existsSync(fPath)) {
      console.error("Missing file", fPath);
      return;
    }
    const imports = extractImports(fPath, s.codeVar);
    imports.forEach((i) => allImports.add(i));

    const snippet = extractJSX(fPath, s.codeVar);
    jsx += `      {/* ${s.codeVar} */}\n      ${snippet}\n\n`;
  });

  // A naive way to combine imports, but we should just use a catch-all import block to be safe.
  // Instead of parsing imports deeply, let's just use a hardcoded mega-import block that covers everything they might need.

  const megaImports = `import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  Button, Card, Badge, Avatar, AvatarGroup, Input, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Accordion, AccordionItem 
} from "@hudbird/ui";
import { 
  Hero, HeroHeader, HeroBody, HeroContent, HeroMedia, HeroBackground, HeroBadge, HeroTitle, HeroDescription, HeroActions, HeroGlass, HeroThreeBackground,
  LogoCloud, LogoCloudTitle, LogoCloudGrid, LogoCloudTicker, LogoCloudItem,
  FeatureSection, FeatureHeader, FeatureBadge, FeatureTitle, FeatureDescription, FeatureGrid, FeatureCard, FeatureIcon, FeatureCardTitle, FeatureCardDescription,
  PricingSection, PricingHeader, PricingBadge, PricingTitle, PricingDescription, PricingGrid, PricingCard, PricingCardHeader, PricingCardName, PricingCardPrice, PricingCardDescription, PricingCardFeatures, PricingCardAction,
  BentoGrid, BentoCard, BentoCardBackground, BentoCardContent, BentoCardHeader, BentoCardBody, BentoCardFooter, BentoGridGlass,
  Testimonials, TestimonialCard, TestimonialsMarquee, TestimonialsColumns, TestimonialsGrid,
  CtaCentered, CtaSplit,
  Faq,
  FooterSimple, FooterMega
} from "@hudbird/marketing";
import { 
  ArrowRight, Play, Zap, Shield, Globe, Lock, Twitter, Github, Linkedin, Instagram,
  MessageCircle, Briefcase, Camera, Check, ChevronRight, PenTool, Layout, Megaphone, Smartphone, Cloud, Menu, X, Star
} from "lucide-react";`;

  const finalCode = `${megaImports}\n\nexport const ${t.name} = () => {\n  const [isAnnual, setIsAnnual] = useState(false);\n  return (\n    <div className="w-full min-h-screen bg-background flex flex-col">\n${jsx}    </div>\n  );\n};\n`;

  fs.writeFileSync(t.file, finalCode, "utf8");
  console.log(`Generated ${t.file}`);
});
