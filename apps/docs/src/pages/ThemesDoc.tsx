import React, { useState } from "react";
import { PageToolbar } from "../components/PageToolbar";
import {
  Card,
  Button,
  Input,
  Badge,
  Tabs,
  Tab,
  Select,
  SelectItem,
  Textarea,
  Checkbox,
  RadioGroup,
  Radio,
  Switch,
  AccordionItem,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  Tooltip,
  Avatar,
  Pagination,
  Alert,
} from "@hudbird/ui";

export default function ThemesDoc() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <div className="mx-auto w-full">
      <div className="mt-16 mb-8 max-w-4xl px-4 sm:px-6">
        <h1 className="text-foreground mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
          Theme Builder
        </h1>
        <p className="text-muted-foreground max-w-2xl text-lg leading-relaxed">
          Customize your design system. Choose your colors, typography, and radius, then copy the
          generated configuration to your project.
        </p>
      </div>

      <div className="w-full px-4 pb-16 sm:px-6">
        {/* BentoGrid Container - scoped for Theme Editor CSS injection */}
        <div
          data-theme-preview
          className="grid auto-rows-min grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
          {/* Card 1: Buttons */}
          <Card className="bg-card text-card-foreground border-border/60 overflow-x-auto p-6 shadow-xs">
            <h3 className="border-border/50 mb-6 border-b pb-3 text-xl font-semibold tracking-tight">
              Buttons
            </h3>

            <div className="space-y-6">
              <div className="space-y-3">
                <h4 className="text-muted-foreground text-sm font-medium">Solid</h4>
                <div className="flex flex-wrap gap-2">
                  <Button variant="solid" color="primary">
                    Primary
                  </Button>
                  <Button variant="solid" color="success">
                    Success
                  </Button>
                  <Button variant="solid" color="warning">
                    Warning
                  </Button>
                  <Button variant="solid" color="danger">
                    Danger
                  </Button>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="text-muted-foreground text-sm font-medium">Soft</h4>
                <div className="flex flex-wrap gap-2">
                  <Button variant="soft" color="primary">
                    Primary
                  </Button>
                  <Button variant="soft" color="success">
                    Success
                  </Button>
                  <Button variant="soft" color="warning">
                    Warning
                  </Button>
                  <Button variant="soft" color="danger">
                    Danger
                  </Button>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="text-muted-foreground text-sm font-medium">Outline</h4>
                <div className="flex flex-wrap gap-2">
                  <Button variant="outline" color="primary">
                    Primary
                  </Button>
                  <Button variant="outline" color="success">
                    Success
                  </Button>
                  <Button variant="outline" color="warning">
                    Warning
                  </Button>
                  <Button variant="outline" color="danger">
                    Danger
                  </Button>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="text-muted-foreground text-sm font-medium">Ghost</h4>
                <div className="flex flex-wrap gap-2">
                  <Button variant="light" color="primary">
                    Primary
                  </Button>
                  <Button variant="light" color="success">
                    Success
                  </Button>
                  <Button variant="light" color="warning">
                    Warning
                  </Button>
                  <Button variant="light" color="danger">
                    Danger
                  </Button>
                </div>
              </div>
            </div>
          </Card>

          {/* Card 2: Badges */}
          <Card className="bg-card text-card-foreground border-border/60 overflow-x-auto p-6 shadow-xs">
            <h3 className="border-border/50 mb-6 border-b pb-3 text-xl font-semibold tracking-tight">
              Badges
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-3">
                <h4 className="text-muted-foreground text-sm font-medium">Solid</h4>
                <div className="flex flex-col items-start gap-2">
                  <Badge variant="solid" color="primary">
                    Primary
                  </Badge>
                  <Badge variant="solid" color="success">
                    Success
                  </Badge>
                  <Badge variant="solid" color="warning">
                    Warning
                  </Badge>
                  <Badge variant="solid" color="danger">
                    Danger
                  </Badge>
                </div>
              </div>
              <div className="space-y-3">
                <h4 className="text-muted-foreground text-sm font-medium">Soft</h4>
                <div className="flex flex-col items-start gap-2">
                  <Badge variant="soft" color="primary">
                    Primary
                  </Badge>
                  <Badge variant="soft" color="success">
                    Success
                  </Badge>
                  <Badge variant="soft" color="warning">
                    Warning
                  </Badge>
                  <Badge variant="soft" color="danger">
                    Danger
                  </Badge>
                </div>
              </div>
            </div>
          </Card>

          {/* Card 3: Inputs & Selects */}
          <Card className="bg-card text-card-foreground border-border/60 overflow-x-auto p-6 shadow-xs md:col-span-2 lg:col-span-1">
            <h3 className="border-border/50 mb-6 border-b pb-3 text-xl font-semibold tracking-tight">
              Inputs & Controls
            </h3>
            <div className="space-y-4">
              <Input label="Email address" placeholder="Enter your email" />
              <Select label="Role" placeholder="Select role">
                <SelectItem value="admin">Administrator</SelectItem>
                <SelectItem value="editor">Editor</SelectItem>
                <SelectItem value="viewer">Viewer</SelectItem>
              </Select>
              <Textarea label="Biography" placeholder="Tell us about yourself" rows={3} />
            </div>
          </Card>

          {/* Card 4: Alerts */}
          <Card className="bg-card text-card-foreground border-border/60 overflow-x-auto p-6 shadow-xs">
            <h3 className="border-border/50 mb-6 border-b pb-3 text-xl font-semibold tracking-tight">
              Alerts
            </h3>
            <div className="space-y-4">
              <Alert
                color="info"
                title="Information (Soft)"
                description="This is an info alert to show semantic info colors."
              />
              <Alert
                color="success"
                title="Success (Flat)"
                variant="flat"
                description="Task completed successfully."
              />
              <Alert
                color="warning"
                title="Warning (Solid)"
                variant="solid"
                description="Please verify your email address."
              />
              <Alert
                color="danger"
                title="Error (Bordered)"
                variant="bordered"
                description="An unexpected error occurred during processing."
              />
            </div>
          </Card>

          {/* Card 5: Tabs & Pagination */}
          <Card className="bg-card text-card-foreground border-border/60 overflow-x-auto p-6 shadow-xs">
            <h3 className="border-border/50 mb-6 border-b pb-3 text-xl font-semibold tracking-tight">
              Navigation
            </h3>
            <div className="space-y-8">
              <div className="space-y-3">
                <h4 className="text-muted-foreground text-sm font-medium">Tabs</h4>
                <Tabs variant="solid" fullWidth>
                  <Tab title="Account" />
                  <Tab title="Password" />
                  <Tab title="Settings" />
                </Tabs>
              </div>
              <div className="space-y-3">
                <h4 className="text-muted-foreground text-sm font-medium">Pagination</h4>
                <div className="flex w-full justify-center">
                  <Pagination total={5} initialPage={1} />
                </div>
              </div>
            </div>
          </Card>

          {/* Card 6: Complex View (Dialogs, Avatars) */}
          <Card className="bg-card text-card-foreground border-border/60 overflow-x-auto shadow-xs md:col-span-2">
            <div className="p-6">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <h3 className="mb-1 text-xl font-bold tracking-tight">Payment Details</h3>
                  <p className="text-muted-foreground text-sm">Enter your payment information.</p>
                </div>
                <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026024d" name="JD" />
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <Input label="Cardholder Name" placeholder="John Doe" />
                <Input label="Card Number" placeholder="0000 0000 0000 0000" />
              </div>
            </div>

            <div className="bg-muted/50 border-border/50 flex items-center justify-end gap-3 border-t px-6 py-4">
              <Button variant="outline" className="mr-auto" onClick={() => setIsDialogOpen(true)}>
                Open Settings Dialog
              </Button>
              <Button variant="ghost">Cancel</Button>
              <Button variant="solid" color="primary">
                Complete Purchase
              </Button>
            </div>

            <Dialog isOpen={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Edit profile</DialogTitle>
                  <DialogDescription>
                    Make changes to your profile here. Click save when you're done.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <Input label="Name" defaultValue="Pedro Duarte" />
                  <Input label="Username" defaultValue="@peduarte" />
                </div>
                <DialogFooter>
                  <Button variant="solid" color="primary" onClick={() => setIsDialogOpen(false)}>
                    Save changes
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </Card>

          {/* Card 7: Accordion */}
          <Card className="bg-card text-card-foreground border-border/60 overflow-x-auto p-6 shadow-xs">
            <h3 className="border-border/50 mb-6 border-b pb-3 text-xl font-semibold tracking-tight">
              Accordion
            </h3>
            <div className="space-y-1">
              <AccordionItem title="Is it accessible?">
                Yes. It adheres to the WAI-ARIA design pattern.
              </AccordionItem>
              <AccordionItem title="Is it styled?">
                Yes. It comes with default styles that matches the other components' aesthetic.
              </AccordionItem>
              <AccordionItem title="Is it animated?">
                Yes. It's animated with Framer Motion natively.
              </AccordionItem>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
