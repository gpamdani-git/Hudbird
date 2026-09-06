const fs = require('fs');
let content = fs.readFileSync('apps/docs/src/pages/NavbarDoc.tsx', 'utf8');

content = content.replace(
  /<ComponentPreview iframeMode="none">\s*<IframePreview minHeight=\{480\}>\s*<div className="relative w-full h-full flex flex-col justify-between bg-white dark:bg-zinc-950 select-none">\s*<Navbar\s*position="static"\s*isBordered\s*mobileMenuVariant="top"\s*isMenuOpen=\{topDrawerOpen\}\s*onMenuOpenChange=\{setTopDrawerOpen\}\s*className="bg-white\/95 dark:bg-zinc-950\/95 shrink-0"/g,
  `<ComponentPreview>
              <div className="w-full py-4">
                <div className="w-full rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-sm relative min-h-[480px] flex flex-col select-none">
                  <Navbar
                  position="static"
                  isBordered
                  mobileMenuVariant="top"
                  isMenuOpen={topDrawerOpen}
                  onMenuOpenChange={setTopDrawerOpen}
                  className="bg-white/95 dark:bg-zinc-950/95 shrink-0 rounded-t-2xl"
                  isContained`
);

content = content.replace(
  /<ComponentPreview iframeMode="none">\s*<IframePreview minHeight=\{490\}>\s*<div className="relative w-full h-full flex flex-col justify-between bg-white dark:bg-zinc-950 select-none">\s*<Navbar\s*position="static"\s*isBordered\s*mobileMenuVariant="left"\s*isMenuOpen=\{leftDrawerOpen\}\s*onMenuOpenChange=\{setLeftDrawerOpen\}\s*className="bg-white\/95 dark:bg-zinc-950\/95 shrink-0"/g,
  `<ComponentPreview>
              <div className="w-full py-4">
                <div className="w-full rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-sm relative min-h-[490px] flex flex-col select-none">
                  <Navbar
                    position="static"
                    isBordered
                    mobileMenuVariant="left"
                  isMenuOpen={leftDrawerOpen}
                  onMenuOpenChange={setLeftDrawerOpen}
                  className="bg-white/95 dark:bg-zinc-950/95 shrink-0 rounded-t-2xl"
                  isContained`
);

content = content.replace(
  /<ComponentPreview iframeMode="none">\s*<IframePreview minHeight=\{490\}>\s*<div className="relative w-full h-full flex flex-col justify-between bg-white dark:bg-zinc-950 select-none">\s*<Navbar\s*position="static"\s*isBordered\s*mobileMenuVariant="right"\s*isMenuOpen=\{rightDrawerOpen\}\s*onMenuOpenChange=\{setRightDrawerOpen\}\s*className="bg-white\/95 dark:bg-zinc-950\/95 shrink-0"/g,
  `<ComponentPreview>
              <div className="w-full py-4">
                <div className="w-full rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-sm relative min-h-[490px] flex flex-col select-none">
                  <Navbar
                    position="static"
                    isBordered
                    mobileMenuVariant="right"
                  isMenuOpen={rightDrawerOpen}
                  onMenuOpenChange={setRightDrawerOpen}
                  className="bg-white/95 dark:bg-zinc-950/95 shrink-0 rounded-t-2xl"
                  isContained`
);

content = content.replace(
  /<ComponentPreview iframeMode="none">\s*<IframePreview minHeight=\{490\}>\s*<div className="relative w-full h-full flex flex-col justify-between bg-white dark:bg-zinc-950 select-none">\s*<Navbar\s*position="static"\s*isBordered\s*mobileMenuVariant="fullscreen"\s*isMenuOpen=\{fullscreenDrawerOpen\}\s*onMenuOpenChange=\{setFullscreenDrawerOpen\}\s*className="bg-white\/95 dark:bg-zinc-950\/95 shrink-0"/g,
  `<ComponentPreview>
              <div className="w-full py-4">
                <div className="w-full rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-sm relative min-h-[490px] flex flex-col select-none">
                  <Navbar
                    position="static"
                    isBordered
                    mobileMenuVariant="fullscreen"
                  isMenuOpen={fullscreenDrawerOpen}
                  onMenuOpenChange={setFullscreenDrawerOpen}
                  className="bg-white/95 dark:bg-zinc-950/95 shrink-0 rounded-t-2xl"
                  isContained`
);

// End tags
content = content.replace(
  /<\/div>\s*<\/div>\s*<\/IframePreview>\s*<\/ComponentPreview>/g,
  `</div>\n              </div>\n            </div>\n            </ComponentPreview>`
);

fs.writeFileSync('apps/docs/src/pages/NavbarDoc.tsx', content);
