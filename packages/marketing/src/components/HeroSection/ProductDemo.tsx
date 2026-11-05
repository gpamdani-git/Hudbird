"use client";
import * as React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Tabs,
  Tab,
  TabList,
  TabPanel,
  Heading,
  Text,
} from "@hudbird/ui";
import type { ProductDemoTab } from "@hudbird/schemas";

export function ProductDemo({
  tabs,
  label = "Product demo",
}: {
  tabs: ProductDemoTab[];
  label?: string;
}) {
  const [selected, setSelected] = React.useState(tabs[0]?.id ?? "");
  const active = tabs.find((tab) => tab.id === selected) ?? tabs[0];
  return (
    <Card
      data-hudbird-block="product-demo"
      variant="bordered"
      radius="none"
      className="hb-radius min-w-0 overflow-hidden shadow-none"
    >
      <CardHeader className="border-border flex-wrap border-b p-5 sm:p-6">
        <Text className="font-medium">{label}</Text>
        <Text variant="small" className="text-muted-foreground">
          Demo · sample data
        </Text>
      </CardHeader>
      <CardBody padding="none" className="min-w-0 p-5 sm:p-8">
        {active ? (
          <>
            <div className="overflow-x-auto pb-1">
              <Tabs
                variant="solid"
                size="lg"
                radius="md"
                selectedKey={active.id}
                onSelectionChange={setSelected}
              >
                <TabList aria-label={label} className="w-full flex-wrap">
                  {tabs.map((tab) => (
                    <Tab
                      key={tab.id}
                      tabKey={tab.id}
                      className="min-w-0 flex-none px-2 text-xs sm:px-3 sm:text-sm"
                    >
                      {tab.label}
                    </Tab>
                  ))}
                </TabList>
                {tabs.map((tab) => (
                  <TabPanel key={tab.id} tabKey={tab.id}>
                    <div className="min-h-56 pt-5">
                      <Heading as="h3" size="h4">
                        {tab.title}
                      </Heading>
                      <Text className="text-muted-foreground mt-3 max-w-prose leading-relaxed">
                        {tab.description}
                      </Text>
                      <ul className="mt-6 list-none p-0">
                        {tab.items.map((item, index) => (
                          <li
                            key={`${tab.id}-${index}`}
                            className="hb-demo-row border-border flex items-start gap-3 border-b py-3 text-sm leading-relaxed"
                          >
                            <span
                              className="bg-primary mt-2 h-1.5 w-1.5 shrink-0 rounded-full"
                              aria-hidden="true"
                            />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </TabPanel>
                ))}
              </Tabs>
            </div>
          </>
        ) : (
          <Text>No demo content yet. Add a product view to preview it here.</Text>
        )}
      </CardBody>
    </Card>
  );
}
