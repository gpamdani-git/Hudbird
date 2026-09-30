# Graph Report - BlankUI- (2026-09-26)

## Corpus Check

- Large corpus: 441 files · ~2,673,669 words. Semantic extraction will be expensive (many Claude tokens). Consider running on a subfolder.

## Summary

- 1979 nodes · 5320 edges · 126 communities (110 shown, 16 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)

- Community 0
- Community 1
- Community 2
- Community 3
- Community 4
- Community 5
- Community 6
- Community 7
- Community 8
- Community 9
- Community 10
- Community 11
- Community 12
- Community 13
- Community 14
- Community 15
- Community 16
- Community 17
- Community 18
- Community 19
- Community 20
- Community 21
- Community 22
- Community 23
- Community 24
- Community 25
- Community 26
- Community 27
- Community 28
- Community 29
- Community 30
- Community 31
- Community 32
- Community 33
- Community 34
- Community 35
- Community 36
- Community 37
- Community 38
- Community 39
- Community 40
- Community 41
- Community 42
- Community 43
- Community 44
- Community 45
- Community 46
- Community 47
- Community 48
- Community 49
- Community 50
- Community 51
- Community 52
- Community 53
- Community 54
- Community 55
- Community 56
- Community 57
- Community 58
- Community 59
- Community 60
- Community 61
- Community 62
- Community 63
- Community 64
- Community 65
- Community 66
- Community 67
- Community 68
- Community 69
- Community 70
- Community 71
- Community 72
- Community 73
- Community 74
- Community 75
- Community 76
- Community 77
- Community 78
- Community 79
- Community 80
- Community 81
- Community 82
- Community 83
- Community 84
- Community 85
- Community 86
- Community 87
- Community 88
- Community 89
- Community 90
- Community 91
- Community 92
- Community 93
- Community 94
- Community 95
- Community 96
- Community 97
- Community 98
- Community 99
- Community 100
- Community 101
- Community 102
- Community 103
- Community 104
- Community 105
- Community 106
- Community 107
- Community 108
- Community 109
- Community 110
- Community 111
- Community 112
- Community 113
- Community 114
- Community 115
- Community 116
- Community 117
- Community 118
- Community 119
- Community 121
- Community 122

## God Nodes (most connected - your core abstractions)

1. `cn()` - 122 edges
2. `cn()` - 99 edges
3. `PageToolbar()` - 54 edges
4. `InstallationTabs()` - 47 edges
5. `ApiTable()` - 43 edges
6. `ApiPropRow` - 42 edges
7. `CodeBlock()` - 42 edges
8. `Button` - 42 edges
9. `ComponentPreview()` - 39 edges
10. `Badge` - 22 edges

## Surprising Connections (you probably didn't know these)

- `Globe()` --calls--> `cn()` [EXTRACTED]
  packages/marketing/src/components/Globe/Globe.tsx → packages/marketing/src/utils/cn.ts
- `TemplateMarquee()` --calls--> `useHtmlTheme()` [EXTRACTED]
  apps/docs/src/app/landingpage/components/TemplateMarquee.tsx → apps/docs/src/app/landingpage/components/shared.tsx
- `PageToolbar()` --calls--> `getPrevNext()` [EXTRACTED]
  apps/docs/src/components/PageToolbar.tsx → apps/docs/src/navData.ts
- `AiStartupTemplate()` --calls--> `useTemplateTheme()` [EXTRACTED]
  apps/docs/src/components/templates/AiStartupTemplate.tsx → apps/docs/src/components/templates/TemplateThemeToggle.tsx
- `Accordion` --calls--> `cn()` [EXTRACTED]
  packages/core/src/components/Accordion/Accordion.tsx → packages/core/src/utils/cn.ts

## Import Cycles

- None detected.

## Communities (126 total, 16 thin omitted)

### Community 0 - "Community 0"

Cohesion: 0.05
Nodes (194): FolderIcon(), IdeCaret(), IdeSuggestPopup(), logos, MEGA_LINK_GROUPS, MockBar(), MockToggle(), NavItem() (+186 more)

### Community 1 - "Community 1"

Cohesion: 0.06
Nodes (34): AccordionDoc, AlertDoc, AvatarDoc, BadgeDoc, ButtonDoc, FeatureSectionDoc, PricingDoc, TemplatesDoc (+26 more)

### Community 2 - "Community 2"

Cohesion: 0.04
Nodes (48): dependencies, clsx, culori, framer-motion, hls.js, @hudbird/marketing, @hudbird/ui, lucide-react (+40 more)

### Community 3 - "Community 3"

Cohesion: 0.06
Nodes (29): AreaChart, AreaChartProps, defaultColors, BarChart, BarChartProps, defaultColors, ChartTooltip, ChartTooltipProps (+21 more)

### Community 4 - "Community 4"

Cohesion: 0.06
Nodes (31): ComposedChartDoc, InstallationDoc, LineChartDoc, PieChartDoc, RadarChartDoc, RadialChartDoc, CodeBlock(), CodeBlockProps (+23 more)

### Community 5 - "Community 5"

Cohesion: 0.10
Nodes (32): ActionMenu(), BaseColorPicker(), FontPicker(), PrimaryColorPicker(), RadiusPicker(), ThemeEditor(), ExportFormat, generateScaleVars() (+24 more)

### Community 6 - "Community 6"

Cohesion: 0.05
Nodes (42): accordionTocItems, alertTocItems, areaChartTocItems, authTocItems, avatarTocItems, badgeTocItems, barChartTocItems, buttonTocItems (+34 more)

### Community 7 - "Community 7"

Cohesion: 0.05
Nodes (39): dependencies, class-variance-authority, clsx, framer-motion, @hudbird/theme, lucide-react, recharts, tailwind-merge (+31 more)

### Community 8 - "Community 8"

Cohesion: 0.05
Nodes (37): class-variance-authority, clsx, framer-motion, lucide-react, picocolors, prompts, react, react-dom (+29 more)

### Community 9 - "Community 9"

Cohesion: 0.08
Nodes (25): GettingStartedDoc, SupportDoc, TableDoc, TextDoc, CliCommandTabs(), CliCommandTabsProps, gettingStartedTocItems, supportTocItems (+17 more)

### Community 10 - "Community 10"

Cohesion: 0.08
Nodes (30): Fieldset, FieldsetContent, FieldsetContentProps, FieldsetContext, FieldsetContextValue, FieldsetErrorText, FieldsetErrorTextProps, FieldsetHeader (+22 more)

### Community 11 - "Community 11"

Cohesion: 0.10
Nodes (28): SidebarBorderedDemo, SidebarFlatDemo, Sidebar, SidebarContent, SidebarContentProps, SidebarContext, SidebarContextValue, SidebarFooter (+20 more)

### Community 12 - "Community 12"

Cohesion: 0.09
Nodes (26): DropdownDoc, Header(), HeaderProps, Theme, dropdownTocItems, Dropdown, DropdownContext, DropdownContextValue (+18 more)

### Community 13 - "Community 13"

Cohesion: 0.08
Nodes (20): ChartTooltipDoc, CheckboxDoc, RadioGroupDoc, SwitchDoc, TextareaDoc, ApiPropRow, ApiTable(), ApiTableProps (+12 more)

### Community 14 - "Community 14"

Cohesion: 0.10
Nodes (4): glob, os, re, sys

### Community 15 - "Community 15"

Cohesion: 0.10
Nodes (21): DialogDoc, ThemesDoc, dialogTocItems, Dialog(), DialogFooter, packages_core_src_index_accordionitem, packages_core_src_index_alert, packages_core_src_index_dialog (+13 more)

### Community 16 - "Community 16"

Cohesion: 0.09
Nodes (19): BarChartDoc, TabsDoc, apiRows, barChartTocItems, dataDay, dataMonth, dataWeek, dataYear (+11 more)

### Community 17 - "Community 17"

Cohesion: 0.10
Nodes (19): packages_core_dist_index_d_dropdown, packages_core_dist_index_d_dropdownitem, packages_core_dist_index_d_dropdownmenu, packages_core_dist_index_d_dropdowntrigger, HeroBackgroundProps, HeroBadgeProps, HeroBodyProps, heroBodyVariants (+11 more)

### Community 18 - "Community 18"

Cohesion: 0.09
Nodes (21): compilerOptions, allowSyntheticDefaultImports, baseUrl, declaration, declarationMap, esModuleInterop, forceConsistentCasingInFileNames, ignoreDeprecations (+13 more)

### Community 19 - "Community 19"

Cohesion: 0.10
Nodes (18): NavbarDoc, IframePreview(), IframePreviewProps, navbarTocItems, NavbarDropdownMenu, NavbarLogoPosition, NavbarMaxWidth, NavbarMegaMenu (+10 more)

### Community 20 - "Community 20"

Cohesion: 0.10
Nodes (20): compilerOptions, allowJs, esModuleInterop, ignoreDeprecations, isolatedModules, jsx, lib, module (+12 more)

### Community 21 - "Community 21"

Cohesion: 0.10
Nodes (21): devDependencies, autoprefixer, @changesets/cli, esbuild, eslint, eslint-config-prettier, @eslint/js, husky (+13 more)

### Community 22 - "Community 22"

Cohesion: 0.10
Nodes (20): exports, class-variance-authority, clsx, framer-motion, @hudbird/theme, @hudbird/ui, lucide-react, react (+12 more)

### Community 23 - "Community 23"

Cohesion: 0.10
Nodes (16): BentoGridDoc, LogoCloudDoc, logoCloudTocItems, logos, packages_marketing_src_index_bentocardbackground, packages_marketing_src_index_bentocardbody, packages_marketing_src_index_bentocardfooter, packages_marketing_src_index_bentocardheader (+8 more)

### Community 24 - "Community 24"

Cohesion: 0.10
Nodes (18): TestimonialsDoc, TestimonialGlass(), Testimonials(), TestimonialsFlat(), TestimonialsMarquee(), TestimonialsSideBySide(), packages_marketing_src_index_default_testimonials, packages_marketing_src_index_testimonialglass (+10 more)

### Community 25 - "Community 25"

Cohesion: 0.10
Nodes (18): containerMaxWidths, lineSpringTransition, menuItemVariants, NavbarBrandProps, NavbarContentJustify, NavbarContentProps, NavbarContext, NavbarContextValue (+10 more)

### Community 26 - "Community 26"

Cohesion: 0.13
Nodes (18): Tab, tabColorStyles, TabList, TabListProps, tabListVariants, TabPanel, TabPanelProps, TabProps (+10 more)

### Community 27 - "Community 27"

Cohesion: 0.10
Nodes (19): compilerOptions, allowSyntheticDefaultImports, baseUrl, declaration, declarationMap, esModuleInterop, forceConsistentCasingInFileNames, ignoreDeprecations (+11 more)

### Community 28 - "Community 28"

Cohesion: 0.11
Nodes (13): BadgeColor, BadgePlacement, BadgeProps, BadgeSize, BadgeVariant, badgeVariants, placementStyles, Skeleton (+5 more)

### Community 29 - "Community 29"

Cohesion: 0.13
Nodes (14): CardDoc, SkeletonDoc, cardTocItems, skeletonTocItems, CardBody, CardHeader, packages_core_src_index_cardbody, packages_core_src_index_cardfooter (+6 more)

### Community 30 - "Community 30"

Cohesion: 0.11
Nodes (14): DividerDoc, FieldsetDoc, dividerTocItems, fieldsetTocItems, packages_core_src_index_divider, packages_core_src_index_fieldset, packages_core_src_index_fieldsetcontent, packages_core_src_index_fieldseterrortext (+6 more)

### Community 31 - "Community 31"

Cohesion: 0.13
Nodes (12): SidebarDoc, StackedLayoutDemo, StackedLayoutDoc, ComponentPreview(), ComponentPreviewProps, ViewportMode, StackedLayoutDemo(), sidebarApiProps (+4 more)

### Community 32 - "Community 32"

Cohesion: 0.11
Nodes (18): dependencies, class-variance-authority, clsx, dotenv, express, framer-motion, @google/genai, lucide-react (+10 more)

### Community 33 - "Community 33"

Cohesion: 0.13
Nodes (17): ./${finalPresetName}, args, CLI_DIR, collectedNpmDeps, cwd, __dirname, __filename, installComponent() (+9 more)

### Community 34 - "Community 34"

Cohesion: 0.27
Nodes (9): packages_core_dist_index_d_avatar, packages_core_dist_index_d_card, TestimonialGlassProps, DEFAULT_TESTIMONIALS, Testimonial, TestimonialCard(), TestimonialsProps, TestimonialsGlobeProps (+1 more)

### Community 35 - "Community 35"

Cohesion: 0.12
Nodes (16): bin, hudbird-ui, dependencies, picocolors, prompts, description, files, picocolors (+8 more)

### Community 36 - "Community 36"

Cohesion: 0.12
Nodes (15): DialogContent, DialogContentProps, DialogContext, DialogContextValue, DialogDescription, DialogDescriptionProps, DialogFooterProps, DialogHeader (+7 more)

### Community 37 - "Community 37"

Cohesion: 0.15
Nodes (12): ChangelogDoc, ComboBoxDoc, PageToolbar(), PageToolbarProps, ChangelogDoc(), renderChangelogContent(), comboBoxTocItems, countries (+4 more)

### Community 38 - "Community 38"

Cohesion: 0.15
Nodes (15): build(), CLI_DIR, CORE_COMPONENTS, CORE_DEPS, CORE_UTILS, __dirname, extractNpmDependencies(), __filename (+7 more)

### Community 39 - "Community 39"

Cohesion: 0.19
Nodes (10): packages_core_dist_index_d, packages_core_dist_index_d_button, packages_core_dist_index_d_input, CtaCenteredProps, CtaGlassProps, CtaSplitProps, containerVariants, FooterLinkGroup (+2 more)

### Community 40 - "Community 40"

Cohesion: 0.12
Nodes (11): content, fs, match, ref_fs, fs, filesToFix, fs, path (+3 more)

### Community 41 - "Community 41"

Cohesion: 0.12
Nodes (15): compilerOptions, baseUrl, esModuleInterop, forceConsistentCasingInFileNames, ignoreDeprecations, jsx, module, moduleResolution (+7 more)

### Community 42 - "Community 42"

Cohesion: 0.16
Nodes (11): content, newContent, TOC_FILE, PAGES_DIR, processFile(), scanDir(), coreFiles, MARKETING_DIR (+3 more)

### Community 43 - "Community 43"

Cohesion: 0.26
Nodes (9): packages_core_dist_index_d_accordion, packages_core_dist_index_d_accordionitem, DEFAULT_FAQS, FaqItem, FaqProps, FaqCategorizedProps, FaqCategory, FaqGlassProps (+1 more)

### Community 44 - "Community 44"

Cohesion: 0.13
Nodes (12): packages_core_dist_index_d_cardbody, packages_core_dist_index_d_cardfooter, packages_core_dist_index_d_cardheader, BentoCardBackground, BentoCardBackgroundProps, BentoCardContentProps, BentoCardProps, BentoGridProps (+4 more)

### Community 45 - "Community 45"

Cohesion: 0.14
Nodes (13): DescriptionList, DescriptionListContext, DescriptionListContextValue, DescriptionListItem, DescriptionListItemProps, DescriptionListLabel, DescriptionListLabelProps, DescriptionListOrientation (+5 more)

### Community 46 - "Community 46"

Cohesion: 0.14
Nodes (12): AreaChartDoc, areaChartTocItems, chartData, dataDay, dataMonth, dataWeek, dataYear, kpiData1 (+4 more)

### Community 47 - "Community 47"

Cohesion: 0.14
Nodes (8): apps_docs_src_assets_dastudio_logo_black_logo, apps_docs_src_assets_dastudio_logo_white_logo, DigitalAgencyTemplate(), ProStyleVisualEditor(), PricingGlass, PricingGlassProps, PricingGlassTier, ref_framer_motion

### Community 48 - "Community 48"

Cohesion: 0.24
Nodes (11): Radio, radioCircleVariants, RadioColor, radioDotVariants, RadioGroupContext, RadioGroupContextValue, RadioProps, RadioSize (+3 more)

### Community 49 - "Community 49"

Cohesion: 0.14
Nodes (14): dependencies, class-variance-authority, clsx, cobe, framer-motion, @hudbird/theme, @hudbird/ui, lucide-react (+6 more)

### Community 50 - "Community 50"

Cohesion: 0.15
Nodes (11): FaqDoc, FaqCategorized(), FaqGlass(), FaqWithIllustration(), packages_marketing_src_index_faqcategorized, packages_marketing_src_index_faqglass, packages_marketing_src_index_faqwithillustration, ref_packages_marketing_src_components_faq_faq_tsx_raw (+3 more)

### Community 51 - "Community 51"

Cohesion: 0.24
Nodes (10): Accordion, AccordionProps, accordionVariants, AccordionContext, AccordionContextValue, AccordionItem, AccordionItemProps, accordionItemVariants (+2 more)

### Community 52 - "Community 52"

Cohesion: 0.18
Nodes (11): Select, SelectContext, SelectContextValue, SelectItem, SelectItemProps, SelectProps, SelectRadius, SelectSize (+3 more)

### Community 53 - "Community 53"

Cohesion: 0.20
Nodes (11): applyTheme(), args, ASSETS_DIR, capture(), __dirname, __filename, ONLY, TEMPLATES (+3 more)

### Community 54 - "Community 54"

Cohesion: 0.18
Nodes (8): CtaDoc, TableOfContents(), TableOfContentsProps, TocItem, CtaGlass, packages_marketing_src_index_ctaglass, ref_packages_marketing_src_components_cta_ctacentered_tsx_raw, ref_packages_marketing_src_components_cta_ctaglass_tsx_raw

### Community 55 - "Community 55"

Cohesion: 0.18
Nodes (9): HeroDoc, HeroThreeBackground, heroTocItems, packages_marketing_src_index_herocontent, packages_marketing_src_index_heroglass, packages_marketing_src_index_heromedia, ref_agents_skills_marketing_hero_skill_md_raw, ref_packages_marketing_src_components_hero_hero_tsx_raw (+1 more)

### Community 56 - "Community 56"

Cohesion: 0.25
Nodes (8): GlobalSearch(), GlobalSearchProps, getIconForName(), Sidebar(), SidebarProps, apps_docs_src_data_changelog, searchIndex, SearchItem

### Community 57 - "Community 57"

Cohesion: 0.18
Nodes (11): scripts, build, build:packages, bump, dev, format:check, format:fix, lint (+3 more)

### Community 58 - "Community 58"

Cohesion: 0.22
Nodes (9): Pagination, PaginationColor, PaginationItemValue, paginationItemVariants, PaginationProps, PaginationRadius, PaginationSize, PaginationVariant (+1 more)

### Community 59 - "Community 59"

Cohesion: 0.18
Nodes (10): dependsOn, outputs, cache, persistent, dependsOn, pipeline, build, dev (+2 more)

### Community 60 - "Community 60"

Cohesion: 0.20
Nodes (8): FooterDoc, MEGA_LINK_GROUPS, SIMPLE_LINKS, SOCIALS, packages_marketing_src_index_footerglass, packages_marketing_src_index_footersimple, ref_packages_marketing_src_components_footer_footerglass_tsx_raw, ref_packages_marketing_src_components_footer_footersimple_tsx_raw

### Community 61 - "Community 61"

Cohesion: 0.20
Nodes (8): HeadingDoc, headingTocItems, packages_core_src_index_heading, packages_core_src_index_headingcolor, packages_core_src_index_headinglevel, packages_core_src_index_headingsize, packages_core_src_index_headingtracking, ref_packages_core_src_components_heading_heading_tsx_raw

### Community 62 - "Community 62"

Cohesion: 0.20
Nodes (8): PaginationDoc, paginationTocItems, packages_core_src_index_infinitescroll, packages_core_src_index_paginationcolor, packages_core_src_index_paginationradius, packages_core_src_index_paginationsize, packages_core_src_index_paginationvariant, ref_packages_core_src_components_pagination_pagination_tsx_raw

### Community 64 - "Community 64"

Cohesion: 0.27
Nodes (7): ref_path, @tailwindcss/vite, ref_vite, ref_vitejs_plugin_react, filesToFix, fs, path

### Community 65 - "Community 65"

Cohesion: 0.20
Nodes (9): access, baseBranch, changelog, commit, fixed, ignore, linked, $schema (+1 more)

### Community 66 - "Community 66"

Cohesion: 0.20
Nodes (8): CardBodyProps, CardFooter, CardFooterProps, CardHeaderProps, CardProps, CardRadius, CardVariant, cardVariants

### Community 67 - "Community 67"

Cohesion: 0.22
Nodes (8): arrowColorStyles, Tooltip(), TooltipColor, TooltipPlacement, TooltipProps, TooltipRadius, TooltipSize, tooltipVariants

### Community 68 - "Community 68"

Cohesion: 0.20
Nodes (7): LogoCloudGrid, LogoCloudProps, LogoCloudTickerProps, logoCloudVariants, LogoCloudGlass, LogoCloudGlassProps, LogoGlassItem

### Community 69 - "Community 69"

Cohesion: 0.28
Nodes (6): App(), apps_docs_src_index, getTocForPath(), ref_react_dom, ref_react_router_dom, src_index

### Community 70 - "Community 70"

Cohesion: 0.22
Nodes (7): DescriptionListDoc, descriptionListTocItems, packages_core_src_index_descriptionlist, packages_core_src_index_descriptionlistitem, packages_core_src_index_descriptionlistlabel, packages_core_src_index_descriptionlistvalue, ref_packages_core_src_components_descriptionlist_descriptionlist_tsx_raw

### Community 71 - "Community 71"

Cohesion: 0.22
Nodes (7): InputDoc, inputTocItems, packages_core_src_index_inputlabelplacement, packages_core_src_index_inputradius, packages_core_src_index_inputsize, packages_core_src_index_inputvariant, ref_packages_core_src_components_input_input_tsx_raw

### Community 72 - "Community 72"

Cohesion: 0.28
Nodes (7): DocsFooter(), DocsFooterProps, flattenedNavItems, getPrevNext(), NavGroup, navigationData, NavItem

### Community 73 - "Community 73"

Cohesion: 0.28
Nodes (7): Avatar, AvatarColor, AvatarProps, AvatarRadius, AvatarSize, avatarVariants, getInitials()

### Community 74 - "Community 74"

Cohesion: 0.25
Nodes (7): Heading, HeadingColor, HeadingLevel, HeadingProps, HeadingSize, HeadingTracking, headingVariants

### Community 75 - "Community 75"

Cohesion: 0.31
Nodes (7): Switch, SwitchColor, switchLabelVariants, SwitchProps, SwitchSize, switchThumbVariants, switchTrackVariants

### Community 76 - "Community 76"

Cohesion: 0.22
Nodes (6): FooterGlass, FooterGlassProps, FooterLink, FooterSimple, FooterSimpleProps, SocialLink

### Community 77 - "Community 77"

Cohesion: 0.22
Nodes (8): dependencies, tailwindcss, tailwindcss, main, name, publishConfig, access, version

### Community 78 - "Community 78"

Cohesion: 0.22
Nodes (4): ref_utils_cn, DEFAULT_TESTIMONIALS, Testimonial, TestimonialsProps

### Community 79 - "Community 79"

Cohesion: 0.29
Nodes (5): AuthLayoutDemo, AuthLayoutDoc, InstallationTabs(), authTocItems, AuthLayoutDemo()

### Community 80 - "Community 80"

Cohesion: 0.25
Nodes (6): SelectDoc, selectTocItems, packages_core_src_index_selectradius, packages_core_src_index_selectsize, packages_core_src_index_selectvariant, ref_packages_core_src_components_select_select_tsx_raw

### Community 81 - "Community 81"

Cohesion: 0.29
Nodes (6): FrameworkType, IdeCodeBlock(), IdeCodeBlockProps, MarketingPreview(), MarketingPreviewProps, ViewportMode

### Community 82 - "Community 82"

Cohesion: 0.25
Nodes (6): ButtonColor, ButtonProps, ButtonRadius, ButtonSize, ButtonVariant, buttonVariants

### Community 83 - "Community 83"

Cohesion: 0.32
Nodes (6): Checkbox, CheckboxColor, checkboxControlVariants, CheckboxProps, CheckboxSize, labelTextVariants

### Community 84 - "Community 84"

Cohesion: 0.29
Nodes (6): ComboBox, comboBoxInputVariants, ComboBoxOption, ComboBoxProps, ComboBoxSize, ComboBoxVariant

### Community 85 - "Community 85"

Cohesion: 0.29
Nodes (6): Divider, DividerContentPosition, DividerOrientation, DividerProps, DividerVariant, dividerVariants

### Community 86 - "Community 86"

Cohesion: 0.25
Nodes (6): InputLabelPlacement, InputProps, InputRadius, InputSize, InputVariant, inputWrapperVariants

### Community 87 - "Community 87"

Cohesion: 0.29
Nodes (6): docsDir, files, fs, glob, path, ref_glob

### Community 88 - "Community 88"

Cohesion: 0.33
Nodes (5): Alert, AlertColor, AlertProps, AlertVariant, alertVariants

### Community 89 - "Community 89"

Cohesion: 0.29
Nodes (3): HudbirdContext, HudbirdContextValue, HudbirdProviderProps

### Community 90 - "Community 90"

Cohesion: 0.29
Nodes (5): ref_url, changelogPath, __dirname, __filename, outPath

### Community 91 - "Community 91"

Cohesion: 0.40
Nodes (5): examples, fs, path, processFile(), scanDir()

### Community 93 - "Community 93"

Cohesion: 0.33
Nodes (3): maath, @react-three/drei, @react-three/fiber

### Community 94 - "Community 94"

Cohesion: 0.33
Nodes (4): colors, filesToUpdate, fs, path

### Community 95 - "Community 95"

Cohesion: 0.33
Nodes (4): colors, filesToUpdate, fs, path

### Community 96 - "Community 96"

Cohesion: 0.40
Nodes (5): fs, pagesDir, path, processDirectory(), processFile()

### Community 97 - "Community 97"

Cohesion: 0.40
Nodes (5): fs, pagesDir, path, processDirectory(), processFile()

### Community 98 - "Community 98"

Cohesion: 0.40
Nodes (5): fs, pagesDir, path, processDirectory(), processFile()

### Community 100 - "Community 100"

Cohesion: 0.40
Nodes (3): FeatureGlass, FeatureGlassItem, FeatureGlassProps

### Community 101 - "Community 101"

Cohesion: 0.40
Nodes (3): ref_playwright, { chromium }, { chromium }

### Community 102 - "Community 102"

Cohesion: 0.40
Nodes (4): docsDir, fs, path, walkDir()

### Community 103 - "Community 103"

Cohesion: 0.40
Nodes (4): docsDir, fs, path, walkDir()

### Community 104 - "Community 104"

Cohesion: 0.40
Nodes (4): content, fs, heroEnd, heroStart

### Community 105 - "Community 105"

Cohesion: 0.40
Nodes (4): docsDir, fs, path, walkDir()

### Community 106 - "Community 106"

Cohesion: 0.40
Nodes (3): fs, path, templatesDir

### Community 107 - "Community 107"

Cohesion: 0.50
Nodes (3): eslint-config-prettier, @eslint/js, typescript-eslint

### Community 109 - "Community 109"

Cohesion: 0.50
Nodes (4): devDependencies, @types/react, @types/react-dom, @types/three

### Community 110 - "Community 110"

Cohesion: 0.50
Nodes (4): peerDependencies, react, react-dom, tailwindcss

### Community 111 - "Community 111"

Cohesion: 0.50
Nodes (4): scripts, build, dev, lint

### Community 112 - "Community 112"

Cohesion: 0.50
Nodes (3): Globe(), GlobeProps, cobe

### Community 114 - "Community 114"

Cohesion: 0.67
Nodes (3): lint-staged, *.{js,jsx,ts,tsx}, *.{json,css,md}

## Knowledge Gaps

- **775 isolated node(s):** `$schema`, `changelog`, `commit`, `fixed`, `linked` (+770 more)
  These have ≤1 connection - possible missing edges. (Counts symbols only; 1087 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **16 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions

_Questions this graph is uniquely positioned to answer:_

- **Why does `@tailwindcss/vite` connect `Community 64` to `Community 8`?**
  _High betweenness centrality (0.109) - this node is a cross-community bridge._
- **Why does `culori` connect `Community 5` to `Community 2`?**
  _High betweenness centrality (0.049) - this node is a cross-community bridge._
- **What connects `$schema`, `changelog`, `commit` to the rest of the system?**
  _775 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Community 0` be split into smaller, more focused modules?**
  _Cohesion score 0.05002315886984715 - nodes in this community are weakly interconnected._
- **Should `Community 1` be split into smaller, more focused modules?**
  _Cohesion score 0.06274509803921569 - nodes in this community are weakly interconnected._
- **Should `Community 2` be split into smaller, more focused modules?**
  _Cohesion score 0.04081632653061224 - nodes in this community are weakly interconnected._
- **Should `Community 3` be split into smaller, more focused modules?**
  _Cohesion score 0.06207482993197279 - nodes in this community are weakly interconnected._
