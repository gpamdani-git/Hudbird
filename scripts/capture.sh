#!/bin/bash

echo "Capturing AI Startup..."
npx --yes playwright screenshot --color-scheme dark --wait-for-timeout 2000 "http://localhost:5173/#/templates/ai-startup" "public/assets/templates/ai-startup.png"
npx --yes playwright screenshot --color-scheme light --wait-for-timeout 2000 "http://localhost:5173/#/templates/ai-startup" "public/assets/templates/ai-startup-light.png"
npx --yes playwright screenshot --full-page --color-scheme dark --wait-for-timeout 2000 "http://localhost:5173/#/templates/ai-startup" "public/assets/templates/ai-startup-full.png"

echo "Capturing SaaS Launchpad..."
npx --yes playwright screenshot --color-scheme dark --wait-for-timeout 2000 "http://localhost:5173/#/templates/saas-launchpad" "public/assets/templates/saas-launchpad.png"
npx --yes playwright screenshot --color-scheme light --wait-for-timeout 2000 "http://localhost:5173/#/templates/saas-launchpad" "public/assets/templates/saas-launchpad-light.png"
npx --yes playwright screenshot --full-page --color-scheme light --wait-for-timeout 2000 "http://localhost:5173/#/templates/saas-launchpad" "public/assets/templates/saas-launchpad-full.png"

echo "Capturing Modern App..."
npx --yes playwright screenshot --color-scheme dark --wait-for-timeout 2000 "http://localhost:5173/#/templates/modern-app" "public/assets/templates/modern-app.png"
npx --yes playwright screenshot --color-scheme light --wait-for-timeout 2000 "http://localhost:5173/#/templates/modern-app" "public/assets/templates/modern-app-light.png"
npx --yes playwright screenshot --full-page --color-scheme light --wait-for-timeout 2000 "http://localhost:5173/#/templates/modern-app" "public/assets/templates/modern-app-full.png"

echo "Capturing Digital Agency..."
npx --yes playwright screenshot --color-scheme dark --wait-for-timeout 2000 "http://localhost:5173/#/templates/enterprise" "public/assets/templates/digital-agency.png"
npx --yes playwright screenshot --color-scheme light --wait-for-timeout 2000 "http://localhost:5173/#/templates/enterprise" "public/assets/templates/digital-agency-light.png"
npx --yes playwright screenshot --full-page --color-scheme dark --wait-for-timeout 2000 "http://localhost:5173/#/templates/enterprise" "public/assets/templates/digital-agency-full.png"

echo "Done!"
