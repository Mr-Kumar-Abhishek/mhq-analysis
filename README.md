# MHQ Analysis - Mental Health Quotient PWA

**MHQ Analysis** is a private, offline-first Progressive Web Application (PWA) designed to assess and analyze an individual's Mental Health Quotient (MHQ). 

Built using a "no-build" architecture with native web technologies (HTML, CSS, and JS ESM), it ensures that all assessment data remains entirely on the user's device, providing maximum privacy and high performance.

## 🚀 Key Features

- **Private & Secure**: 100% client-side. No data is ever sent to a server.
- **Offline-First**: Works without an internet connection once installed via Service Worker.
- **Scientific Framework**: Based on the 6 core dimensions of mental wellbeing (Mood, Social Self, Drive, Cognition, Adaptability, Mind-Body Connection).
- **Non-Linear Scoring**: Implements sophisticated scoring to accurately identify clinical risk and wellbeing states.
- **Premium Design**: Modern, glassmorphic UI for a professional and calming experience.

## 🛠️ Technical Stack

- **Frontend**: Vanilla HTML5, CSS3 (Modern Grid/Flexbox), JavaScript (ES Modules).
- **PWA**: Web App Manifest, Service Workers, LocalStorage.
- **Architecture**: No-build system (No npm, Vite, or Webpack required).

## 📂 Project Structure

```text
.
├── scripts/
│   ├── app.js            # Main application controller
│   ├── assessment.js     # Question bank and state management
│   ├── scoring.js        # MHQ scoring algorithm
│   ├── storage.js        # Local persistence layer
│   └── ui.js             # View rendering and SVG charts
├── styles/
│   └── index.css         # Glassmorphic design system
├── icons/
│   ├── icon-192.png      # PWA icon (192x192)
│   └── icon-512.png      # PWA icon (512x512)
├── index.html            # Main entry point
├── manifest.json         # PWA manifest
├── sw.js                 # Service worker for offline use
├── SRS.md                # Software Requirement Specification
├── SDD.md                # Software Design Document
├── RUBRICS.md            # Scoring categories & definitions
├── BENCHMARKS.md         # Global population benchmarks
├── LICENSE               # GNU GPL v3.0 License
└── README.md             # Project documentation (this file)
```

## 📄 License

This project is licensed under the **GNU General Public License v3.0 (GPL-3.0)**. See the [LICENSE](LICENSE) file for the full text.

---
*Created as part of the MHQ Analysis project.*
