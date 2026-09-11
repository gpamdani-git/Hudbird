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

const ColorScaleCard = ({ name, colorBase }: { name: string; colorBase: string }) => {
  const steps = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];
  return (
    <Card className="bg-card text-card-foreground border-border/60 space-y-3 p-4">
      <h3 className="text-sm font-semibold capitalize">{name}</h3>
      <div className="border-border/50 flex h-8 w-full overflow-hidden rounded-md border">
        {steps.map((step) => (
          <div
            key={step}
            className="h-full flex-1"
            style={{ backgroundColor: `hsl(var(--${colorBase}-${step}))` }}
            title={`${name}-${step}`}
          />
        ))}
      </div>
      <div className="text-muted-foreground flex justify-between px-1 font-mono text-[10px]">
        <span>50</span>
        <span>500</span>
        <span>950</span>
      </div>
    </Card>
  );
};

export default function ThemesDoc() {
  const [activeTab, setActiveTab] = useState("account");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <div className="mx-auto w-full">
      <div className="mb-8 max-w-4xl px-4 sm:px-6">
        <h1 className="text-foreground mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
          Theme Builder
        </h1>
        <p className="text-muted-foreground max-w-2xl text-lg leading-relaxed">
          Customize your design system. Choose your colors, typography, and radius, then copy the
          generated configuration to your project.
        </p>
      </div>

      <div className="custom-scrollbar w-full overflow-x-auto px-4 pb-16 sm:px-6">
        {/* Horizontal scroll container */}
        <div className="flex min-w-[1500px] items-start gap-8 xl:min-w-full">
          {/* Column 0: Color Scales (New) */}
          <div className="max-w-[350px] min-w-[300px] flex-1 space-y-4">
            <h3 className="mb-2 text-lg font-semibold">Color Scales</h3>
            <ColorScaleCard name="Primary" colorBase="primary" />
            <ColorScaleCard name="Secondary" colorBase="secondary" />
            <ColorScaleCard name="Success" colorBase="success" />
            <ColorScaleCard name="Info" colorBase="info" />
            <ColorScaleCard name="Warning" colorBase="warning" />
            <ColorScaleCard name="Danger" colorBase="destructive" />
          </div>

          {/* Column 1: Buttons & Badges Comprehensive Preview */}
          <div className="max-w-[450px] min-w-[350px] flex-1 space-y-6">
            <Card className="bg-card text-card-foreground border-border/60 space-y-6 p-6">
              <h3 className="border-border/50 border-b pb-2 text-lg font-semibold">Buttons</h3>

              <div className="space-y-4">
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
                  <Button variant="solid" color="default">
                    Default
                  </Button>
                </div>
              </div>

              <div className="space-y-4">
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
                  <Button variant="soft" color="default">
                    Default
                  </Button>
                </div>
              </div>

              <div className="space-y-4">
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
                  <Button variant="outline" color="default">
                    Default
                  </Button>
                </div>
              </div>

              <div className="space-y-4">
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
                  <Button variant="light" color="default">
                    Default
                  </Button>
                </div>
              </div>
            </Card>

            <Card className="bg-card text-card-foreground border-border/60 space-y-6 p-6">
              <h3 className="border-border/50 border-b pb-2 text-lg font-semibold">Badges</h3>

              <div className="space-y-4">
                <h4 className="text-muted-foreground text-sm font-medium">Solid</h4>
                <div className="flex flex-wrap gap-2">
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
                  <Badge variant="solid" color="default">
                    Default
                  </Badge>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="text-muted-foreground text-sm font-medium">Soft</h4>
                <div className="flex flex-wrap gap-2">
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
                  <Badge variant="soft" color="default">
                    Default
                  </Badge>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="text-muted-foreground text-sm font-medium">Outline</h4>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" color="primary">
                    Primary
                  </Badge>
                  <Badge variant="outline" color="success">
                    Success
                  </Badge>
                  <Badge variant="outline" color="warning">
                    Warning
                  </Badge>
                  <Badge variant="outline" color="danger">
                    Danger
                  </Badge>
                  <Badge variant="outline" color="default">
                    Default
                  </Badge>
                </div>
              </div>
            </Card>

            <Card className="bg-card text-card-foreground border-border/60 space-y-6 p-6">
              <h3 className="border-border/50 border-b pb-2 text-lg font-semibold">Alerts</h3>
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
                  description="This is a success alert."
                />
                <Alert
                  color="danger"
                  title="Danger (Bordered)"
                  variant="bordered"
                  description="This is a danger alert."
                />
                <Alert
                  color="warning"
                  title="Warning (Solid)"
                  variant="solid"
                  description="This is a warning alert."
                />
              </div>
            </Card>
          </div>

          {/* Column 2: Inputs, Textareas, and Accordions */}
          <div className="max-w-[400px] min-w-[350px] flex-1 space-y-6">
            <Card className="bg-card text-card-foreground border-border/60 space-y-6 p-6">
              <h3 className="text-lg font-semibold">Inputs</h3>
              <div className="space-y-4">
                <Input label="Email address" placeholder="Enter your email" />
                <div className="grid grid-cols-2 gap-4">
                  <Select label="Country" placeholder="Select">
                    <SelectItem value="us">United States</SelectItem>
                    <SelectItem value="uk">United Kingdom</SelectItem>
                  </Select>
                  <Select label="Role" placeholder="Role" variant="bordered">
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="user">User</SelectItem>
                  </Select>
                </div>
                <Textarea label="Bio" placeholder="Tell us about yourself" rows={3} />
              </div>
            </Card>

            <Card className="bg-card text-card-foreground border-border/60 p-6">
              <h3 className="mb-4 text-lg font-semibold">Accordion</h3>
              <div className="border-border/40 space-y-2 border-t pt-2">
                <AccordionItem title="Is it accessible?">
                  Yes. It adheres to the WAI-ARIA design pattern.
                </AccordionItem>
                <AccordionItem title="Is it styled?">
                  Yes. It comes with default styles that matches the other components&apos;
                  aesthetic.
                </AccordionItem>
              </div>
            </Card>

            <Card className="bg-card text-card-foreground border-border/60 p-6">
              <h3 className="mb-4 text-lg font-semibold">Pagination</h3>
              <div className="flex justify-center">
                <Pagination total={10} initialPage={1} />
              </div>
            </Card>
          </div>

          {/* Column 3: Complex Views, Cards, Dialogs */}
          <div className="max-w-[400px] min-w-[350px] flex-1 space-y-6">
            <Card className="bg-card text-card-foreground border-border/60 overflow-hidden">
              <div className="p-6">
                <div className="mb-6 flex items-center justify-between">
                  <div>
                    <h3 className="mb-1 text-xl font-bold">Payment Details</h3>
                    <p className="text-muted-foreground text-sm">Enter your payment information.</p>
                  </div>
                  <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026024d" name="JD" />
                </div>

                <div className="space-y-4">
                  <Input label="Cardholder Name" placeholder="John Doe" />
                  <Input label="Card Number" placeholder="0000 0000 0000 0000" />
                </div>
              </div>
              <div className="bg-muted border-border/50 flex justify-end gap-3 border-t px-6 py-4">
                <Button variant="ghost">Cancel</Button>
                <Button variant="solid" color="primary">
                  Complete Purchase
                </Button>
              </div>
            </Card>

            <Card className="bg-card text-card-foreground border-border/60 p-6">
              <h3 className="mb-4 text-lg font-semibold">Tabs & Dialog</h3>
              <div className="space-y-6">
                <Tabs variant="solid" fullWidth>
                  <Tab title="Account" />
                  <Tab title="Password" />
                  <Tab title="Settings" />
                </Tabs>

                <div className="border-border/50 border-t pt-4">
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => setIsDialogOpen(true)}
                  >
                    Open Dialog Example
                  </Button>
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
                        <Button
                          variant="solid"
                          color="primary"
                          onClick={() => setIsDialogOpen(false)}
                        >
                          Save changes
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
