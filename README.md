# TypeScript Project

A starter TypeScript project with strict type-checking enabled.

## Project Structure

```
typescript-project/
├── src/              # TypeScript source files
│   └── index.ts      # Entry point
├── dist/             # Compiled JavaScript output (generated)
├── package.json      # Project metadata and dependencies
├── tsconfig.json     # TypeScript compiler configuration
├── .gitignore        # Git ignore rules
└── README.md         # This file
```

## Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- npm (comes with Node.js)

> ⚠️ Node.js was not detected on your system. Install it first via:
> - macOS (Homebrew): `brew install node`
> - Or download from <https://nodejs.org/>

## Setup

Install the dependencies:

```bash
npm install
```

## Available Scripts

| Script           | Description                                          |
| ---------------- | ---------------------------------------------------- |
| `npm run build`  | Compile TypeScript to JavaScript in `dist/`          |
| `npm start`      | Run the compiled JavaScript from `dist/index.js`     |
| `npm run dev`    | Run TypeScript directly using `ts-node` (no build)   |
| `npm run watch`  | Watch mode — recompile on file changes               |
| `npm run clean`  | Remove the `dist/` build directory                   |

## Quick Start

```bash
# Install dependencies
npm install

# Run in development mode
npm run dev

# Or build and run
npm run build
npm start
```

## License

MIT