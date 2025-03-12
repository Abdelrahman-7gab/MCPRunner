# MCPRunner

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

A lightweight CLI tool designed to simplify running scripts with environment variables, specifically optimized for Cursor AI development workflows.

## 🚀 Overview

MCPRunner streamlines the process of executing scripts with environment variables by combining these operations into a single command. It's particularly useful for Cursor AI development, where managing environment configurations and starting the MCP server can become repetitive.

## ✨ Features

- **Single Command Execution**: Run scripts and load environment variables in one step
- **Environment Variable Management**: Easily set environment variables directly from the command line
- **Cursor AI Integration**: Optimized for Cursor AI MCP server workflows
- **Cross-Platform**: Works on macOS, Linux, and Windows

## 📦 Installation

```bash
npm install -g mcprunner
```

Or use directly with npx (recommended):

```bash
npx mcprunner [options]
```

## 🔧 Usage

The basic syntax for MCPRunner is:

```bash
npx mcprunner ENV_VAR1=value1 ENV_VAR2=value2 -- command_to_run
```

Where:
- `ENV_VAR1=value1 ENV_VAR2=value2` are the environment variables you want to set
- `--` is the separator between environment variables and the command
- `command_to_run` is the command you want to execute with those environment variables

### Basic Usage

```bash
npx mcprunner PORT=3000 NODE_ENV=development -- npm start
```

### With Cursor AI MCP Server

```bash
npx mcprunner MCP_PORT=3333 MCP_HOST=localhost DEBUG=true -- npm run mcp:server
```

## 📋 Examples

### Starting a Development Server

```bash
# Set development environment variables and start the dev server
npx mcprunner NODE_ENV=development PORT=8080 API_URL=http://localhost:3000 -- npm run dev
```

### Running Cursor AI MCP Server

```bash
# Set Cursor AI specific variables and start the MCP server
npx mcprunner MCP_PORT=3333 MCP_LOG_LEVEL=debug MCP_TIMEOUT=30000 -- node src/mcp/server.js
```

### Chaining Multiple Commands

```bash
# Set environment variables and run multiple commands
npx mcprunner NODE_ENV=production -- npm run build && npm run start
```

## 🔍 How It Works

MCPRunner works by:

1. Parsing the environment variables and command from your input
2. Creating a temporary script file (`.sh` or `.bat` depending on your OS)
3. Writing the environment variables as export/set statements in the script
4. Executing the script with your command

This approach ensures that the environment variables are properly set for the command execution, regardless of your operating system.

## 🔍 Why MCPRunner for Cursor AI?

When working with Cursor AI, you often need to:

1. Set specific environment variables for the MCP server
2. Start the MCP server with different configurations
3. Maintain different environment settings for development/testing

MCPRunner simplifies this workflow into a single command, reducing the cognitive overhead and potential for configuration errors.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👤 Author

Abdelrahman Hegab 