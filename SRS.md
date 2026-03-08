# Software Requirement Specification (SRS) - MHQ Analysis PWA

## 1. Introduction

### 1.1 Purpose
The purpose of this document is to define the requirements for the **MHQ Analysis PWA**, a lightweight, Progressive Web Application designed to assess and analyze the Mental Health Quotient (MHQ) of users.

### 1.2 Scope
This application is a **frontend-only, "no-build" PWA**. It serves as a self-contained tool for mental wellbeing assessment, calculating scores across multiple dimensions and providing visual feedback. It operates entirely on the client-side, ensuring maximum privacy and offline availability.

### 1.3 Definitions and Acronyms
*   **MHQ**: Mental Health Quotient.
*   **PWA**: Progressive Web App.
*   **No-Build**: A development approach that avoids build tools like Webpack, Vite, or Babel, utilizing native browser features (HTML, CSS, JS ESM) directly.

---

## 2. Technical Architecture (The "No-Build" Constraint)

### 2.1 Core Technologies
*   **HTML5**: Semantic structure.
*   **CSS3**: Modern layouts using Grid and Flexbox, custom properties for theming.
*   **JavaScript (ESM)**: Native ECMAScript Modules for logic without bundling.
*   **Web APIs**: 
    - `Service Workers` for offline capabilities.
    - `Web App Manifest` for installability.
    - `LocalStorage` or `IndexedDB` for persistent local data.
    - `Canvas API` or `SVG` for data visualization.

### 2.2 Deployment
*   The application consists of static files only.
*   Can be served by any static web server (GitHub Pages, Vercel, Nginx).

---

## 3. MHQ Assessment Framework

### 3.1 Dimensions of Mental Wellbeing
The assessment evaluates 47 items across 6 core dimensions:
1.  **Mood and Outlook**: Emotional regulation and optimism.
2.  **Social Self**: Relationship forming and social perception.
3.  **Drive and Motivation**: Persistence and task initiation.
4.  **Cognition**: Complex comprehension and long-term perspective.
5.  **Adaptability & Resilience**: Coping mechanisms and behavioral adjustment.
6.  **Mind-Body Connection**: Balance between physical and mental states.

### 3.2 Scoring Methodology
*   **Rescaling**: 9-point ratings are transformed into a weighted positive/negative scale.
*   **Non-linear Weighting**: Negative responses are weighted more heavily to identify "at-risk" states.
*   **Normalization**: Scores are mapped to a standard range (e.g., -100 to 200).

---

## 4. Functional Requirements

### 4.1 Assessment Module
*   **FR-1.1**: User should be able to answer 47 standardized questions.
*   **FR-1.2**: Progress should be saved locally if the user exits mid-assessment.
*   **FR-1.3**: Support for multiple assessment entries over time.

### 4.2 Scoring & Analytics
*   **FR-2.1**: Real-time calculation of the aggregate MHQ score.
*   **FR-2.2**: Breakdown of scores for each of the 6 dimensions.
*   **FR-2.3**: Visual representation of scores (e.g., Spider/Radar chart or Bar graphs).

### 4.3 PWA Capabilities
*   **FR-3.1**: The app must be installable on mobile and desktop devices.
*   **FR-3.2**: The app must work offline after the first load.
*   **FR-3.3**: Prompt the user to update when a new version of the service worker is available.

---

## 5. Non-Functional Requirements

### 5.1 Privacy and Security
*   **NFR-1.1**: **Zero Server Storage**. No data shall be sent to a backend. All calculations and storage must happen in the browser.
*   **NFR-1.2**: Explicit "Clear Data" option for users to wipe local storage.

### 5.2 Performance
*   **NFR-2.1**: Initial load time < 2 seconds on 3G.
*   **NFR-2.2**: Immediate interface response (no layout shifts during assessment).

### 5.3 User Experience (UX)
*   **NFR-3.1**: Responsive design supporting mobile, tablet, and desktop.
*   **NFR-3.2**: Accessible UI (WCAG 2.1 AA compliance).
*   **NFR-3.3**: Dark mode support via CSS Media Queries.

---

## 6. Design & UI Guidelines
*   **Aesthetics**: Glassmorphism/Modern clean aesthetic with smooth transitions.
*   **Color Palette**: Calming, professional tones (e.g., Deep Blues, Teals, or Soft Grays).
*   **Interactivity**: Hover states and micro-animations for feedback during the assessment.
