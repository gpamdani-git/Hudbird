import { Card, CardHeader, CardBody, CardFooter } from "@my-lib/core";
import { Button } from "@my-lib/core";

export default function CardDocsPage() {
  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-4xl font-bold tracking-tight mb-2 text-zinc-900 dark:text-zinc-50">Card</h1>
        <p className="text-lg text-zinc-500 dark:text-zinc-400 font-normal">
          A container for text, photos, and actions in the context of a single subject.
        </p>
      </div>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-50">Basic Usage</h2>
        <div className="bg-zinc-50/50 dark:bg-zinc-900/30 border border-zinc-200/60 dark:border-zinc-800/60 rounded-2xl p-6">
          <div className="max-w-sm">
            <Card>
              <CardHeader>
                <h4 className="font-bold text-lg">Daily Summary</h4>
              </CardHeader>
              <CardBody>
                <p className="text-sm text-zinc-500">
                  You have 3 new notifications and 2 upcoming events today.
                </p>
              </CardBody>
              <CardFooter className="flex justify-end gap-2 border-t border-zinc-100 dark:border-zinc-800 pt-4">
                <Button variant="light" color="danger">Dismiss</Button>
                <Button color="primary">View All</Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-50">Variants</h2>
        <div className="bg-zinc-50/50 dark:bg-zinc-900/30 border border-zinc-200/60 dark:border-zinc-800/60 rounded-2xl p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <Card variant="elevated">
              <CardBody>
                <h4 className="font-bold mb-1">Elevated Card</h4>
                <p className="text-sm text-zinc-500">Default variant with shadow.</p>
              </CardBody>
            </Card>
            
            <Card variant="bordered">
              <CardBody>
                <h4 className="font-bold mb-1">Bordered Card</h4>
                <p className="text-sm text-zinc-500">Flat with a border.</p>
              </CardBody>
            </Card>

            <Card variant="flat">
              <CardBody>
                <h4 className="font-bold mb-1">Flat Card</h4>
                <p className="text-sm text-zinc-500">No shadow, no border, soft background.</p>
              </CardBody>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
