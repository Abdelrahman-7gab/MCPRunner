#!/usr/bin/env node

const fs = require("node:fs");
const { execSync } = require("node:child_process");
const os = require("node:os");
const crypto = require("node:crypto");

const args = process.argv.slice(2);

if (args.length < 2) {
  console.error("Usage: npx mcprunner VAR1=VALUE1 VAR2=VALUE2 -- COMMAND_TO_RUN");
  process.exit(1);
}

const separatorIndex = args.indexOf("--");
if (separatorIndex === -1) {
  console.error("Error: Missing '--' separator before the command.");
  process.exit(1);
}

const envVars = args.slice(0, separatorIndex);
const command = args.slice(separatorIndex + 1).join(" ");

if (!command) {
  console.error("Error: No command provided after '--'.");
  process.exit(1);
}

const hash = crypto.createHash("md5").update(envVars.join("") + command).digest("hex");

const scriptFilename = `run-script-${hash}${os.platform() === "win32" ? ".bat" : ".sh"}`;
const scriptPath = `${__dirname}/${scriptFilename}`;

const envExports = os.platform() === "win32"
  ? envVars.map((v) => `set ${v}`).join("\n") // Windows `set` command
  : envVars.map((v) => `export ${v}`).join("\n"); // Linux/macOS `export`

const scriptContent = os.platform() === "win32"
  ? `@echo off\n${envExports}\ncmd /c ${command}`
  : `#!/bin/bash\n${envExports}\nexec ${command}`;

// Check if the script already exists
if (!fs.existsSync(scriptPath)) {
  fs.writeFileSync(scriptPath, scriptContent, { mode: 0o755 });
  console.log(`New script created: ${scriptPath}`);
} else {
  console.log(`Reusing existing script: ${scriptPath}`);
}

try {
  execSync(os.platform() === "win32" ? `cmd /c ${scriptPath}` : `bash ${scriptPath}`, {
    stdio: "inherit",
  });
} catch (error) {
  console.error("Error executing script:", error.message);
  process.exit(1);
}
