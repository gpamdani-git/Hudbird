#!/bin/bash

if [ -z "$1" ]; then
  echo "❌ Error: Harap masukkan nama komponen."
  echo "Cara penggunaan: ./setup.sh <NamaKomponen>"
  echo "Contoh: ./setup.sh Badge"
  exit 1
fi

COMPONENT_NAME=$1
LOWER_NAME=$(echo "$COMPONENT_NAME" | tr '[:upper:]' '[:lower:]')

echo "🚀 Memulai Generator Komponen: $COMPONENT_NAME..."

# 1. Buat folder komponen di packages/core
mkdir -p "packages/core/src/components/$COMPONENT_NAME"

# 2. Buat file implementasi komponen ({Name}.tsx)
cat << COMPONENT_TSX > "packages/core/src/components/$COMPONENT_NAME/$COMPONENT_NAME.tsx"
"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../utils/cn";

const ${LOWER_NAME}Variants = cva(
  "inline-flex items-center justify-center transition-colors font-medium rounded-xl",
  {
    variants: {
      variant: {
        solid: "bg-zinc-900 text-zinc-50 dark:bg-zinc-50 dark:text-zinc-900",
        flat: "bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-50",
      },
      size: {
        sm: "h-8 px-3 text-xs",
        md: "h-10 px-4 text-sm",
        lg: "h-12 px-6 text-base",
      },
    },
    defaultVariants: {
      variant: "solid",
      size: "md",
    },
  }
);

export interface ${COMPONENT_NAME}Props
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof ${LOWER_NAME}Variants> {}

const ${COMPONENT_NAME} = React.forwardRef<HTMLDivElement, ${COMPONENT_NAME}Props>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(${LOWER_NAME}Variants({ variant, size, className }))}
        {...props}
      />
    );
  }
);
${COMPONENT_NAME}.displayName = "${COMPONENT_NAME}";

export { ${COMPONENT_NAME}, ${LOWER_NAME}Variants };
COMPONENT_TSX

# 3. Buat file index.ts untuk ekspor
cat << COMPONENT_INDEX > "packages/core/src/components/$COMPONENT_NAME/index.ts"
export * from './$COMPONENT_NAME';
COMPONENT_INDEX

# 4. Buat Halaman Preview Dokumentasi Vite
mkdir -p "apps/docs/src/pages"
cat << PAGE_TSX > "apps/docs/src/pages/${COMPONENT_NAME}Doc.tsx"
import React from "react";
// import { ${COMPONENT_NAME} } from "@my-lib/core"; // Uncomment jika sudah di-export di packages/core/src/index.ts

export default function ${COMPONENT_NAME}Doc() {
  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-4xl font-bold tracking-tight mb-2 text-zinc-900 dark:text-zinc-50">${COMPONENT_NAME}</h1>
        <p className="text-lg text-zinc-500 dark:text-zinc-400 font-normal">
          A premium ${COMPONENT_NAME} component.
        </p>
      </div>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-50">Preview</h2>
        <div className="bg-zinc-50/50 dark:bg-zinc-900/30 border border-zinc-200/60 dark:border-zinc-800/60 rounded-2xl p-12 flex items-center justify-center">
          <div className="text-zinc-500 dark:text-zinc-400">
            {/* <${COMPONENT_NAME} variant="solid">Example</${COMPONENT_NAME}> */}
            ${COMPONENT_NAME} Preview
          </div>
        </div>
      </section>
    </div>
  );
}
PAGE_TSX

chmod +x setup.sh

echo "✅ Berhasil membuat komponen $COMPONENT_NAME!"
echo "⚠️  Langkah Selanjutnya:"
echo "1. Export komponen ini di packages/core/src/index.ts: export * from './components/$COMPONENT_NAME';"
echo "2. Daftarkan halamannya di apps/docs/src/App.tsx"
