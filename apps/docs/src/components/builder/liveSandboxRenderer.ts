import type * as React from "react";
import {
  resolvePageFilePath,
  resolveSectionFilePath,
  type WebsitePage,
  type WebsiteProjectConfig,
} from "@hudbird/marketing";
import { buildVirtualFileMap, renderCompiledCustomModule } from "./liveTsxSandbox";

/**
 * Builds renderCustomPage and renderCustomSection callbacks for WebsiteProjectPage
 * so any custom TSX files stored in `project.customFiles` execute live inside the preview.
 */
export function createSandboxRenderHooks(project: WebsiteProjectConfig): {
  renderCustomPage?: (page: WebsitePage) => React.ReactNode | undefined;
  renderCustomSection?: (ctx: {
    page: WebsitePage;
    sectionType: string;
    variant?: string;
  }) => React.ReactNode | undefined;
} {
  const customFiles = project.customFiles;
  if (!customFiles || Object.keys(customFiles).length === 0) {
    return {};
  }

  const fileMap = buildVirtualFileMap(project);

  return {
    renderCustomPage: (page) => {
      const pagePath = resolvePageFilePath(project, page.id);
      if (!(pagePath in customFiles)) return undefined;
      return renderCompiledCustomModule(pagePath, fileMap);
    },
    renderCustomSection: ({ page, sectionType }) => {
      const secPath = resolveSectionFilePath(project, page.id, sectionType);
      if (!(secPath in customFiles)) return undefined;
      return renderCompiledCustomModule(secPath, fileMap);
    },
  };
}
