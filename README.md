<div align="center">

# 🇱🇰 NIC Info

### High-Performance, Privacy-First Sri Lankan National Identity Card Decoder

[![Live Demo](https://img.shields.io/badge/Live%20Demo-nicinfo.vercel.app-C9A15C?style=for-the-badge&logo=vercel&logoColor=white)](https://nicinfo.vercel.app/)
[![License](https://img.shields.io/badge/License-MIT-4F8B82?style=for-the-badge)](LICENSE)
[![Zero Knowledge](https://img.shields.io/badge/Privacy-100%25%20Client--Side-11171C?style=for-the-badge&logo=shield&logoColor=C9A15C)](https://nicinfo.vercel.app/privacy.html)
[![PWA Ready](https://img.shields.io/badge/PWA-Installable-blue?style=for-the-badge&logo=pwa&logoColor=white)](https://nicinfo.vercel.app/)
[![Year](https://img.shields.io/badge/Release-2026%20Edition-teal?style=for-the-badge)](https://nicinfo.vercel.app/)

<p align="center">
  <b>Instant demographic extraction, precise age breakdown, and dual-format conversion for Sri Lankan National Identity Cards.</b>
  <br />
  Built with pure modern web standards, zero third-party dependencies, and an air-gapped zero-knowledge client architecture.
</p>

[**Explore Web App**](https://nicinfo.vercel.app/) • [**Format Guidelines**](https://nicinfo.vercel.app/guidelines.html) • [**Privacy Notice**](https://nicinfo.vercel.app/privacy.html) • [**Operating Policy**](https://nicinfo.vercel.app/policy.html) • [**LLMs Specification**](https://nicinfo.vercel.app/llms.txt)

---

</div>

## 📖 Executive Summary

**NIC Info** is a client-side utility engineered to decode, parse, and validate Sri Lankan National Identity Card (NIC) numbers in real time. Designed with a bespoke **"Registry Office"** visual aesthetic, it provides instantaneous conversion of legacy (9-character) and modern (12-digit) identity card numbers into structured demographic profiles—extracting birth dates, exact age hierarchies, gender classifications, and administrative voter designations.

### 🌟 Why NIC Info?

- **🔒 Zero-Knowledge Privacy**: 100% of data processing occurs exclusively within the local browser runtime. No identity identifiers are ever transmitted across a network, logged, or cached externally.
- **⚡ Sub-Millisecond Latency**: Reactive UI updates as you type with zero server round-trips.
- **🎨 Editorial UI System**: Crafted using dynamic design tokens, antique serif and monospace typography, fluid CSS micro-animations, and system-adaptive light/dark theming.
- **📱 Progressive Web App (PWA)**: Installable across desktop and mobile environments with offline-ready capabilities.
- **♿ Inclusive & Accessible**: Fully compliant with modern semantic HTML5, WCAG AA accessibility standards, and ARIA 1.2 landmark architectures.

---

## 🛠️ High-Level System Architecture

NIC Info enforces strict client-side data isolation. Identity strings input by the user remain sandboxed in the local browser process memory without making external API calls.

```mermaid
flowchart TD
    A[User Input: NIC String] --> B[Client-Side Sanitization & Normalization]
    B --> C{Format & Length Validator}
    
    C -->|9-Character Legacy| D[Legacy Format Processor]
    C -->|12-Digit Modern| E[Modern Format Processor]
    C -->|Invalid String| F[Error Boundary & Visual Feedback]
    
    D --> G[Client Runtime Parser]
    E --> G
    
    G --> H[Demographic Synthesis Engine]
    H --> I[Date of Birth Extraction]
    H --> J[Precise Age Chronology]
    H --> K[Gender & Voter Status Resolution]
    
    I --> L[Dynamic Card Presentation Layer]
    J --> L
    K --> L
    
    subgraph Browser Sandbox [Air-Gapped Client Process]
        B
        C
        D
        E
        F
        G
        H
        I
        J
        K
        L
    end
    
    subgraph Network Isolation [Zero Outbound Payload]
        M[(No Remote Server)]
        N[(No Identity Databases)]
    end
    
    Browser Sandbox -.x|Zero Data Egress| Network Isolation
```

---

## ✨ Key Features & Capabilities

### 1. Dual-Format Support & Normalization
- **Legacy 9-Character Standard**: Decodes traditional identity cards issued between 1972 and 2015 (`YYDDDNNNNC`), including voter (`V`) and non-voter (`X`) suffix identifiers.
- **Modern 12-Digit Standard**: Decodes contemporary Smart NICs issued from 2016 onward (`YYYYDDDNNNNN`).

### 2. Demographic Breakdown
- **Date of Birth**: Extracted and mapped directly to full calendar representations (Day, Month, Year).
- **Precise Age Metrics**: Dynamic real-time calculation showing completed years alongside precise month and day intervals.
- **Gender Identification**: High-accuracy parsing derived from embedded sequence ranges.
- **Voter Eligibility**: Instant recognition of electoral registry flags on legacy format entries.

### 3. Modern User Experience & Design
- **Adaptive Dark / Light Theming**: Seamless switching with persistent theme memory and automatic OS color-scheme synchronization.
- **Interactive Quick-Sharing**: Native Web Share API integration alongside 1-click sharing options for WhatsApp, X (formerly Twitter), Facebook, and clipboard copying.
- **Keyboard-First Navigation**: Optimized tab indexing, `Esc` handling for overlays, and auto-focus transitions.
- **Micro-Interaction Animations**: Staggered fact reveals and dynamic card flippers for engaging visual feedback.

---

## 📊 Format Specifications Overview

| Specification Feature | Legacy Format (Pre-2016) | Modern Smart NIC (2016+) |
| :--- | :--- | :--- |
| **Character Length** | 10 Characters (9 Digits + Letter) | 12 Numeric Digits |
| **Birth Year Encoding** | 2-Digit Prefix (`YY`) | 4-Digit Century Prefix (`YYYY`) |
| **Ordinal Day Sequence** | 3-Digit Day Range (`001` - `866`) | 3-Digit Day Range (`001` - `866`) |
| **Serial Sequence** | 4-Digit Registry Index | 5-Digit Registry Index |
| **Validation / Check Character** | Alphabetic Voter Flag (`V` / `X`) | Numeric Checksum |
| **Active Issuance Period** | 1972 – 2015 | 2016 – Present |

---

## 🔒 Security, Compliance & Privacy Blueprint

NIC Info is built from the ground up to respect user sovereignty and personal data protection principles (including Sri Lanka's Personal Data Protection Act No. 9 of 2022 and GDPR concepts):

> [!IMPORTANT]
> **Zero Data Retention Guarantee**
> - **Zero Server Storage**: Inputted NIC numbers never leave the user's browser.
> - **Zero Tracking Cookies**: Identity parameters are never committed to cookies or shared session stores.
> - **Zero Analytics on PII**: Analytics tooling (if active) is strictly configured to ignore user input fields and personal data.

### Enterprise Security Headers (via Vercel Edge)
- **`X-Frame-Options: DENY`**: Prevents clickjacking and unauthorized embedding in foreign frames.
- **`X-Content-Type-Options: nosniff`**: Enforces strict MIME type adherence.
- **`Referrer-Policy: strict-origin-when-cross-origin`**: Protects browsing metadata.
- **`Permissions-Policy`**: Disables unused browser hardware interfaces (camera, microphone, geolocation).

---

## 💻 Technology Stack

NIC Info utilizes a lightweight, modern web architecture optimized for high Lighthouse scores, minimal carbon footprint, and instant Core Web Vitals (LCP, INP, CLS):

- **Markup & Semantics**: HTML5 with Schema.org JSON-LD microdata (`WebApplication`, `FAQPage`, `HowTo`).
- **Styling Architecture**: Vanilla CSS3 utilizing Custom Properties, CSS Grid, Flexbox, and fluid typography.
- **Typography**: Google Fonts CDN (`Fraunces`, `IBM Plex Sans`, `IBM Plex Mono`).
- **Runtime Logic**: Pure Vanilla ECMAScript (ES6+) with zero external JavaScript runtimes or bundles.
- **Edge Deployment**: Vercel Edge Network with immutable asset caching and HTTP/3 delivery.
- **PWA Specifications**: Web App Manifest (`manifest.json`) supporting maskable icons and standalone windowing.

---

## 📂 Repository Structure

```
.
├── .well-known/            # Protocol verification & metadata endpoints
├── 404.html                # Custom branded error page
├── guidelines.html         # Official NIC specifications & conversion standards
├── index.html              # Main single-page application & decoding engine
├── llms.txt                # Curated knowledge base for LLMs and AI agents
├── manifest.json           # Progressive Web App (PWA) configuration
├── policy.html             # Terms of service and acceptable use policy
├── privacy.html            # Data protection & zero-retention privacy policy
├── robots.txt              # Search engine crawl directives
├── sitemap.xml             # Canonical sitemap for search indexing
├── styles.css              # Unified design system & responsive theme tokens
├── vercel.json             # Edge headers, caching rules & routing configuration
└── README.md               # Project documentation
```

---

## 🚀 Getting Started & Local Development

Because NIC Info is engineered with pure web standards, there are **no heavy compilation steps or package installations** required.

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Git (optional, for cloning)

### Quick Launch

1. **Clone the repository**:
   ```bash
   git clone https://github.com/pubudutharanga/NIC-Info.git
   cd NIC-Info
   ```

2. **Serve locally using any static HTTP server**:

   *Using Node.js (`npx`)*:
   ```bash
   npx serve .
   ```

   *Using Python 3*:
   ```bash
   python -m http.server 8000
   ```

   *Using VS Code*:
   Install the **Live Server** extension and click **"Go Live"** from the status bar.

3. **Open in Browser**:
   Navigate to `http://localhost:8000` (or the port provided by your server).

---

## 🌐 Deployment

Deploy your own instance of NIC Info to any modern edge hosting platform in seconds:

### Deploy to Vercel
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fpubudutharanga%2FNIC-Info)

The repository includes a ready-to-use [`vercel.json`](file:///d:/nic-info/vercel.json) configured with enterprise security headers and asset caching headers.

### Deploy to Cloudflare Pages / Netlify / GitHub Pages
Simply connect your repository and set the publish directory to root (`/`). No build command is needed (`Build command: None`).

---

## 🗺️ Product Roadmap

- [x] Full support for 9-digit (Legacy) and 12-digit (Smart) NIC formats.
- [x] Sub-millisecond client-side parsing & instant error boundaries.
- [x] Adaptive Dark/Light registry theme with custom typography.
- [x] Progressive Web App (PWA) installation and mobile shortcuts.
- [x] Schema.org rich search indexing & structured microdata.
- [ ] Multi-lingual localization (English, Sinhala, Tamil).
- [ ] Offline Web Worker / Service Worker caching enhancements.
- [ ] Privacy-safe CSV batch verification mode for educational & HR workflows.
- [ ] Exportable demographic summary cards (PNG/PDF format).

---

## 🤝 Contributing

Contributions to NIC Info are welcome! Whether you are optimizing CSS performance, improving accessibility, or refining documentation:

1. **Fork the Repository**
2. **Create a Feature Branch** (`git checkout -b feature/enhancement-name`)
3. **Commit your Changes** (`git commit -m "feat: add localized strings"`)
4. **Push to the Branch** (`git push origin feature/enhancement-name`)
5. **Open a Pull Request**

Please ensure that any code contributions adhere to the project's zero-dependency philosophy and maintain strict client-side privacy standards.

---

## ⚖️ Legal Disclaimer

> [!NOTE]
> **Informational & Educational Use Only**
> 
> NIC Info is an independent utility created for educational and informational purposes. It is **not affiliated with, endorsed by, or officially associated with** the Department for Registration of Persons (DRP) of Sri Lanka or any governmental institution.
> 
> For official citizen identification records, legal replacement cards, and administrative verifications, please refer to the official [Department for Registration of Persons (DRP)](https://www.drp.gov.lk).

---

## 👨‍💻 Author & Maintainer

**Pubudu Tharanga**  
*Software Developer & Web Architect*

- 🌐 Portfolio: [pubudu-tharanga.vercel.app](https://pubudu-tharanga.vercel.app)
- 🐙 GitHub: [@pubudutharanga](https://github.com/pubudutharanga)
- 🔗 Project Link: [nicinfo.vercel.app](https://nicinfo.vercel.app)

---

<div align="center">
  <sub>Crafted with precision • Built for privacy • © 2026 NIC Info</sub>
</div>
