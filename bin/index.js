#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';
import pc from 'picocolors';
import prompts from 'prompts';

const cwd = process.cwd();

async function run() {
  console.log(pc.cyan(pc.bold('🦅 Welcome to Hudbird UI CLI! made with ♥ in Bali')));

  const possibleConfigs = [
    'tailwind.config.js',
    'tailwind.config.ts',
    'tailwind.config.cjs',
    'tailwind.config.mjs'
  ];

  let targetConfig = null;
  for (const config of possibleConfigs) {
    if (fs.existsSync(path.join(cwd, config))) {
      targetConfig = config;
      break;
    }
  }

  // Read config to see if it's ESM
  let configContent = '';
  let isESM = false;
  if (targetConfig) {
    configContent = fs.readFileSync(path.join(cwd, targetConfig), 'utf-8');
    isESM = targetConfig.endsWith('.ts') || targetConfig.endsWith('.mjs') || configContent.includes('export default');
  } else {
    // If no config found, fallback to checking package.json type
    const pkgPath = path.join(cwd, 'package.json');
    if (fs.existsSync(pkgPath)) {
      const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'));
      if (pkg.type === 'module') isESM = true;
    }
  }

  const isTS = targetConfig && targetConfig.endsWith('.ts');
  const finalPresetName = isTS ? 'hudbirdPreset.ts' : 'hudbirdPreset.js';

  const presetContentCJS = `/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      colors: {
        hudbird: {
          primary: '#0ea5e9',
          secondary: '#8b5cf6',
          accent: '#f43f5e',
          background: '#f8fafc',
          foreground: '#0f172a',
          muted: '#cbd5e1'
        }
      }
    }
  }
};
`;

  const presetContentESM = `import type { Config } from 'tailwindcss';

export default {
  theme: {
    extend: {
      colors: {
        hudbird: {
          primary: '#0ea5e9',
          secondary: '#8b5cf6',
          accent: '#f43f5e',
          background: '#f8fafc',
          foreground: '#0f172a',
          muted: '#cbd5e1'
        }
      }
    }
  }
} satisfies Config;
`;

  const presetContentESMJS = `/** @type {import('tailwindcss').Config} */
export default {
  theme: {
    extend: {
      colors: {
        hudbird: {
          primary: '#0ea5e9',
          secondary: '#8b5cf6',
          accent: '#f43f5e',
          background: '#f8fafc',
          foreground: '#0f172a',
          muted: '#cbd5e1'
        }
      }
    }
  }
};
`;

  const finalContent = isTS ? presetContentESM : (isESM ? presetContentESMJS : presetContentCJS);
  const presetPath = path.join(cwd, finalPresetName);

  // 1. Create preset file
  if (!fs.existsSync(presetPath)) {
    fs.writeFileSync(presetPath, finalContent, 'utf-8');
    console.log(pc.green(`✔ Created ${finalPresetName}`));
  } else {
    console.log(pc.yellow(`⚠ ${finalPresetName} already exists, skipping creation.`));
  }

  if (!targetConfig) {
    console.log(pc.red('✖ No tailwind.config.(js|ts|cjs|mjs) found in the current directory.'));
    console.log(pc.cyan(`Please manually add the preset to your config:`));
    console.log(pc.white(`  presets: [require('./${finalPresetName}')]`));
    return;
  }

  console.log(pc.blue(`ℹ Found ${targetConfig}`));
  const configFilePath = path.join(cwd, targetConfig);

  // Check if preset is already added
  if (configContent.includes('hudbirdPreset')) {
    console.log(pc.yellow(`⚠ ${targetConfig} already contains hudbirdPreset, skipping.`));
    return;
  }

  // Ask user for confirmation
  const response = await prompts({
    type: 'confirm',
    name: 'value',
    message: `Do you want to inject the preset into ${targetConfig}?`,
    initial: true
  });

  if (!response.value) {
    console.log(pc.yellow('⚠ Operation cancelled by user.'));
    return;
  }

  // 3. Inject preset
  let modified = false;

  if (isESM) {
    // ESM or TS format
    const importPath = isTS ? `./hudbirdPreset` : `./${finalPresetName}`;
    const importStatement = `import hudbirdPreset from '${importPath}';\n`;
    configContent = importStatement + configContent;

    // Inject into config object
    if (configContent.includes('presets: [')) {
      configContent = configContent.replace(/presets:\s*\[/, 'presets: [\n    hudbirdPreset,');
      modified = true;
    } else {
      configContent = configContent.replace(/export default (?:defineConfig\()?\{/, match => `${match}\n  presets: [hudbirdPreset],`);
      modified = true;
    }
  } else {
    // CJS format
    const requireStatement = `require('./${finalPresetName}')`;

    if (configContent.includes('presets: [')) {
      configContent = configContent.replace(/presets:\s*\[/, `presets: [\n    ${requireStatement},`);
      modified = true;
    } else {
      configContent = configContent.replace(/module\.exports\s*=\s*\{/, match => `${match}\n  presets: [${requireStatement}],`);
      modified = true;
    }
  }

  if (modified) {
    fs.writeFileSync(configFilePath, configContent, 'utf-8');
    console.log(pc.green(`✔ Successfully updated ${targetConfig}`));
  } else {
    console.log(pc.red(`✖ Failed to inject preset automatically.`));
    console.log(pc.cyan(`Please manually add it to your config:`));
    console.log(pc.white(`  presets: [${isESM ? 'hudbirdPreset' : `require('./${finalPresetName}')`}]`));
  }

  console.log(pc.green(pc.bold('✨ All done! Hudbird UI is ready to use.')));
}

run().catch(err => {
  console.error(pc.red('✖ An error occurred:'), err);
  process.exit(1);
});
