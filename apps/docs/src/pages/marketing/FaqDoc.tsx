import React from "react";
import faqCode from "../../../../../packages/marketing/src/components/Faq/Faq.tsx?raw";
import faqCategorizedCode from "../../../../../packages/marketing/src/components/Faq/FaqCategorized.tsx?raw";
import faqIllustrationCode from "../../../../../packages/marketing/src/components/Faq/FaqWithIllustration.tsx?raw";
import { InstallationTabs } from "../../components/InstallationTabs";
import { Faq, FaqCategorized, FaqWithIllustration } from "@hudbird/marketing";
import { MarketingPreview } from "../../components/MarketingPreview";
import { ApiTable, type ApiPropRow } from "../../components/ApiTable";
import { ChevronRight, Menu, Home, MessageCircle, LayoutGrid } from "lucide-react";

export default function FaqDoc({ onOpenSidebar }: { onOpenSidebar?: () => void }) {
  const apiRows: ApiPropRow[] = [
    {
      prop: "label",
      type: "string",
      defaultVal: '"FAQ"',
      description: "Small uppercase label displayed above the title.",
    },
    {
      prop: "title",
      type: "string",
      defaultVal: '"Frequently asked questions"',
      description: "The main heading of the FAQ section.",
    },
    {
      prop: "description",
      type: "string",
      defaultVal: '"..."',
      description: "Optional subheading/description text displayed below the title.",
    },
    {
      prop: "faqs",
      type: "FaqItem[]",
      defaultVal: "DEFAULT_FAQS",
      description: "Array of FAQ objects containing the question and answer.",
    },
    {
      prop: "variant",
      type: '"centered" | "side-by-side"',
      defaultVal: '"side-by-side"',
      description: "The layout style of the FAQ section.",
    },
    {
      prop: "className",
      type: "string",
      defaultVal: "undefined",
      description: "Additional CSS classes to apply to the root section element.",
    },
  ];

  const faqItemTypeRows: ApiPropRow[] = [
    {
      prop: "id",
      type: "string | number",
      defaultVal: "required",
      description: "Unique identifier for the FAQ item.",
    },
    {
      prop: "question",
      type: "string",
      defaultVal: "required",
      description: "The question text.",
    },
    {
      prop: "answer",
      type: "string | React.ReactNode",
      defaultVal: "required",
      description: "The answer text or component.",
    },
  ];

  const faqCategorizedRows: ApiPropRow[] = [
    {
      prop: "label",
      type: "string",
      defaultVal: '"HOW TO GET STARTED"',
      description: "Small uppercase label displayed above the title.",
    },
    {
      prop: "title",
      type: "string",
      defaultVal: '"Frequently asked questions"',
      description: "The main heading of the FAQ section.",
    },
    {
      prop: "categories",
      type: "FaqCategory[]",
      defaultVal: "required",
      description: "Array of category objects containing tabs data and their specific FAQs.",
    },
    {
      prop: "className",
      type: "string",
      defaultVal: "undefined",
      description: "Additional CSS classes to apply to the root section element.",
    },
  ];

  const faqCategoryTypeRows: ApiPropRow[] = [
    {
      prop: "id",
      type: "string",
      defaultVal: "required",
      description: "Unique identifier for the category tab.",
    },
    {
      prop: "label",
      type: "string",
      defaultVal: "required",
      description: "The display name of the category tab.",
    },
    {
      prop: "icon",
      type: "React.ReactNode",
      defaultVal: "undefined",
      description: "Optional icon to display next to the category label.",
    },
    {
      prop: "faqs",
      type: "FaqItem[]",
      defaultVal: "required",
      description: "Array of FAQ objects belonging to this category.",
    },
  ];

  const faqIllustrationRows: ApiPropRow[] = [
    {
      prop: "title",
      type: "string",
      defaultVal: '"Frequently asked questions"',
      description: "The main heading of the FAQ section.",
    },
    {
      prop: "description",
      type: "string",
      defaultVal: '"Explore answers..."',
      description: "Optional subheading/description text displayed below the title.",
    },
    {
      prop: "faqs",
      type: "FaqItem[]",
      defaultVal: "required",
      description: "Array of FAQ objects containing the question and answer.",
    },
    {
      prop: "className",
      type: "string",
      defaultVal: "undefined",
      description: "Additional CSS classes to apply to the root section element.",
    },
  ];

  return (
    <div className="flex w-full flex-col pb-20">
      {/* Header section with breadcrumbs and description */}
      <div className="sticky top-14 z-30 mb-8 w-full border-b border-zinc-200/50 bg-white/80 px-4 py-4 backdrop-blur-md transition-all sm:px-6 lg:px-8 dark:border-zinc-800/50 dark:bg-zinc-950/80">
        <div className="flex items-center gap-3 text-sm font-medium text-zinc-500 dark:text-zinc-400">
          {onOpenSidebar && (
            <button
              onClick={onOpenSidebar}
              className="-ml-1.5 hidden rounded-md p-1.5 text-zinc-600 transition-colors hover:bg-zinc-100 lg:flex dark:text-zinc-300 dark:hover:bg-zinc-800"
              aria-label="Open Navigation"
            >
              <Menu size={18} />
            </button>
          )}
          <span>Marketing section</span>
          <ChevronRight size={14} className="text-zinc-400" />
          <span className="text-zinc-900 dark:text-zinc-100">FAQ</span>
        </div>
      </div>

      <div className="mx-auto w-full max-w-7xl px-4 sm:px-8 lg:px-12">
        <div className="mb-10">
          <h1 className="mb-6 text-4xl font-semibold tracking-tight text-zinc-900 sm:text-5xl dark:text-white">
            FAQ Section
          </h1>
          <p className="max-w-3xl text-lg text-balance text-zinc-600 dark:text-zinc-400">
            Address common objections and provide quick answers with a beautiful, responsive FAQ
            component powered by smooth accordion animations.
          </p>
        </div>

        <div id="installation" className="scroll-mt-24 space-y-4">
          <InstallationTabs componentName="faq" manualCode={faqCode} />
        </div>

        <div className="flex flex-col gap-16">
          <MarketingPreview title="With Animated Illustration" code={faqIllustrationCode}>
            <FaqWithIllustration
              faqs={[
                {
                  id: "i1",
                  question: "How fast are your deliveries?",
                  answer:
                    "We optimize routes and leverage multiple transportation modes to ensure the fastest possible transit times. Our average delivery is 30-50% faster than industry standard.",
                },
                {
                  id: "i2",
                  question: "What regions do you serve?",
                  answer:
                    "We currently serve North America, Europe, and major hubs in Asia-Pacific. We are continuously expanding our network to reach more global destinations.",
                },
                {
                  id: "i3",
                  question: "Are your prices competitive?",
                  answer:
                    "Yes, our automated logistics and volume discounts allow us to offer rates that are highly competitive without compromising on speed or reliability.",
                },
                {
                  id: "i4",
                  question: "How do you track shipments?",
                  answer:
                    "Every shipment is equipped with real-time GPS tracking. You can monitor the exact location and estimated time of arrival through our live dashboard.",
                },
                {
                  id: "i5",
                  question: "Do you handle special cargo?",
                  answer:
                    "We have specialized divisions for cold-chain, oversized, and fragile cargo. Please contact our sales team for custom handling requirements.",
                },
                {
                  id: "i6",
                  question: "How do I get started?",
                  answer:
                    "Getting started is easy. Simply create an account, enter your shipment details into our portal, and you'll receive an instant quote and routing options.",
                },
              ]}
            />
          </MarketingPreview>

          <MarketingPreview title="Categorized (With Tabs)" code={faqCategorizedCode}>
            <FaqCategorized
              categories={[
                {
                  id: "general",
                  label: "General",
                  icon: <Home className="h-4 w-4" />,
                  faqs: [
                    {
                      id: "g1",
                      question: "How to create an account?",
                      answer:
                        "To create an account, find the 'Sign up' or 'Create account' button, fill out the registration form with your personal information, and click 'Create account' or 'Sign up.' Verify your email address if needed, and then log in to start using the platform.",
                    },
                    {
                      id: "g2",
                      question: "Have any trust issue?",
                      answer:
                        "We take privacy and security very seriously. All data is encrypted and we never share your personal information with third parties without your explicit consent.",
                    },
                    {
                      id: "g3",
                      question: "How can I reset my password?",
                      answer:
                        "Click on 'Forgot password' on the login page and follow the instructions sent to your email to reset your password.",
                    },
                    {
                      id: "g4",
                      question: "What is the payment process?",
                      answer:
                        "We accept all major credit cards and PayPal. Billing occurs automatically at the beginning of each billing cycle.",
                    },
                  ],
                },
                {
                  id: "support",
                  label: "Support",
                  icon: <MessageCircle className="h-4 w-4" />,
                  faqs: [
                    {
                      id: "s1",
                      question: "How do I contact support?",
                      answer:
                        "You can reach out to our support team 24/7 via the chat widget in the bottom right corner or by emailing support@example.com.",
                    },
                    {
                      id: "s2",
                      question: "What are your support hours?",
                      answer:
                        "Our standard support operates from 9 AM to 5 PM EST, Monday through Friday. Priority support for Enterprise customers is available 24/7.",
                    },
                  ],
                },
                {
                  id: "others",
                  label: "Others",
                  icon: <LayoutGrid className="h-4 w-4" />,
                  faqs: [
                    {
                      id: "o1",
                      question: "Do you offer a student discount?",
                      answer:
                        "Yes, we offer a 50% discount for students with a valid .edu email address. Please contact support to claim it.",
                    },
                    {
                      id: "o2",
                      question: "Can I use it for commercial projects?",
                      answer:
                        "Yes, all our paid plans include a commercial license allowing you to use our platform for client and commercial projects.",
                    },
                  ],
                },
              ]}
            />
          </MarketingPreview>

          <MarketingPreview title="Side-by-Side" code={faqCode}>
            <Faq variant="side-by-side" />
          </MarketingPreview>

          <MarketingPreview title="Centered" code={faqCode}>
            <Faq variant="centered" />
          </MarketingPreview>
        </div>

        {/* API Reference */}
        <div id="component-api" className="mt-20 scroll-mt-24">
          <h2 className="mb-6 text-2xl font-semibold text-zinc-900 dark:text-white">
            Component API
          </h2>
          <div className="flex flex-col gap-10">
            <ApiTable title="Faq Props" rows={apiRows} />
            <ApiTable title="FaqCategorized Props" rows={faqCategorizedRows} />
            <ApiTable title="FaqWithIllustration Props" rows={faqIllustrationRows} />
            <ApiTable title="FaqItem Object Type" rows={faqItemTypeRows} />
            <ApiTable title="FaqCategory Object Type" rows={faqCategoryTypeRows} />
          </div>
        </div>
      </div>
    </div>
  );
}
