# Forensic Audit & Deception Detection Toolkit (FADDT)

A monolithic React-based forensic tool for documenting hardware lifecycle mismatches and algorithmic deception patterns.

## Overview

The Forensic Audit & Deception Detection Toolkit (FADDT) is designed to help consumers and forensic auditors record, analyze, and report structural failures across two primary domains:

- **Hardware Lifecycle Mismatch**: Track supply chain errors where legacy hardware is substituted for high-performance intent.
- **Algorithmic Deception**: Audit LLM responses for "Facade of Competence," "Stochastic Parroting," and "Safety Hedging" patterns.

## Core Features

- **Structural Failure Logging**: Capture high-fidelity timelines for persistent service gaps (e.g., 8-hour failure loops).
- **ACL Statutory Mapping**: Link discrepancies directly to Australian Consumer Law sections 54, 56, and 18.
- **Deception Scanner**: UI-driven audit fields to document deceptive patterns and intentionality.
- **Report Export**: Generate statutory-ready reports for regulators and internal review.

## Technical Architecture

- **React 18 (JSX)** with a state-driven audit matrix
- **Vite** for build and development
- **CSS-based styling** optimized for clarity and evidentiary export

## Evidentiary Use Case

This toolkit supports evidence chains for submissions to regulatory bodies such as SA Consumer and Business Services (CBS) and the ACCC, with a specific evidentiary target of Adelaide 2026.

## Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Usage

1. Launch the application using `npm run dev`.
2. Use the **Forensic Unit** tab to input transaction history, failure timelines, ACL mapping, and deception scanner details.
3. Review entries in the **Structural Failure Log** to maintain a continuous audit trail.
4. Export findings from the **Statutory Report** tab for regulatory reporting.

## Project Structure

```
forensic-deception-detector/
├── src/
│   ├── components/       # Reusable UI components
│   ├── utils/           # Utility functions and helpers
│   ├── forensic_audit_app.jsx  # Main application component
│   └── index.jsx        # Application entry point
├── public/              # Static assets
├── index.html          # HTML template
├── package.json        # Project configuration
└── vite.config.js      # Vite configuration
```

## Contributing

Contributions are welcome! Please follow these guidelines:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run linting: `npm run lint`
5. Submit a pull request

## License

MIT License - see [LICENSE](LICENSE) file for details.

## Author

Justin / Forensic Unit

## Keywords

- Forensics
- Consumer Protection
- ACL (Australian Consumer Law)
- AI Audit
- Deception Detection
