import React from "react";
import { FooterMega } from "@hudbird/marketing";
import { Zap } from "lucide-react";
import { MEGA_LINK_GROUPS, SOCIALS } from "../app/landingpage/components/shared";

export function SiteFooter() {
  return (
    <FooterMega
      logo={
        <div className="flex items-center gap-2">
          <Zap className="h-6 w-6 text-blue-500" fill="currentColor" />
          <span className="font-outfit text-xl font-semibold tracking-tight text-zinc-900 dark:text-white">
            hudbird UI
          </span>
        </div>
      }
      description="Ship pixel-perfect interfaces in hours, not months. A premium React component library with flawless design and accessible code."
      linkGroups={MEGA_LINK_GROUPS}
      socials={SOCIALS}
      copyright="© 2026 Hudbird Studio. All rights reserved."
      hideNewsletter={true}
    />
  );
}
