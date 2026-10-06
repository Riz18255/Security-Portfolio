# Cybersecurity Portfolio — Riaz Ahmed Ansari

Personal cybersecurity portfolio covering my projects, practical labs, internships, certifications, and academic work across offensive security, detection engineering, network security, DevSecOps, cloud security, and ICS/OT security.

**Live Portfolio:** https://rizahmedportfolio.vercel.app

I completed my BS Cybersecurity at Air University, Islamabad. This repository contains the source code for the portfolio and the case studies used throughout the site.

---

## Focus Areas

- **Red Teaming & Offensive Security:** Active Directory adversary emulation, credential access, privilege escalation, and controlled web assessments.
- **Blue Teaming & Detection:** Telemetry analysis, SIEM correlation searches (Splunk), network intrusion signatures (Suricata, Zeek), and endpoint logging (Sysmon).
- **Network Security:** Packet analysis, traffic investigation (Wireshark), network segmentation, ACLs, routing, and access controls.
- **DevSecOps:** CI/CD pipeline security, container scanning (Trivy, SonarQube), and container orchestration (Docker, Kubernetes).
- **Cloud Security:** Multi-cloud enumeration and identity-permission security across AWS, Azure, and GCP.
- **ICS / OT Security:** Multi-zone network telemetry, Modbus communication, command auditing, and baseline anomaly detection.

---

## Featured Work & Highlights

### Key Projects
- **SIEMTRIX (Final Year Project):** An industrial control system (ICS/OT) security and monitoring platform designed across IT, DMZ, OT, and sensor zones. Integrated Splunk telemetry, Suricata/Zeek inspection, Modbus TCP command tracking, and Isolation Forest anomaly detection for baseline traffic monitoring.
- **Real-Time ML DDoS Detection:** A live network traffic pipeline capturing packets, extracting flow features, and detecting SYN flood and HTTP flood patterns using machine learning models (XGBoost, Isolation Forest).
- **Active Directory Attack & Detection Lab:** An isolated enterprise lab pairing adversary emulation (BloodHound, credential access, lateral movement) with host telemetry (Sysmon, Windows Event Logs) and Splunk detection engineering mapped to MITRE ATT&CK.

### Internships
- **DevSecOps Intern — Sysreforms International (Aug – Sep 2024):** Deployed and configured Kubernetes and MySQL clusters, integrated automated vulnerability scanning (Trivy, SonarQube) into CI/CD pipelines, and helped remediate 15+ findings.
- **Network Security Intern — HTR Technologies (Jun – Jul 2024):** Conducted traffic analysis, reconnaissance, and controlled assessments with Nmap, Wireshark, and Metasploit. Investigated three unauthorized access attempts and worked on segmented VLAN/ACL environments.

### Certifications
- **CRTA (Certified Red Team Analyst)** — CyberWarFare Labs
- **MCRTA (Multi-Cloud Red Team Analyst)** — CyberWarFare Labs (covering AWS, Azure, and GCP environments)

---

## Site Features

- **Interactive 3D Security Sculpture:** Built with Three.js and WebGL, featuring a 2D canvas software fallback. Respects OS reduced-motion preferences (`prefers-reduced-motion`) and pauses when off-screen.
- **Case Studies:** Nine detailed project and coursework write-ups covering the problem, my contribution, technical stack, results, and lessons learned.
- **Security Arsenal:** Searchable collection of tools, platforms, and languages I have used across offensive security, detection, DevSecOps, cloud, forensics, and development.
- **Quick Search (Ctrl+K):** Command-palette style modal for searching across projects, tools, and site sections.
- **Academic Foundation:** Full coursework outline from my BS Cybersecurity degree at Air University.
- **Tactile Sound Switch:** Optional ambient background audio with an accessible on/off toggle (disabled by default).
- **Direct Resume Access:** Quick download and in-browser view for my one-page CV.

---

## Tech Stack

- **Framework:** Next.js (App Router)
- **UI & Components:** React 19, Radix UI primitives, Lucide React icons
- **Styling:** Tailwind CSS
- **Graphics:** Three.js (WebGL2) with 2D Canvas fallback
- **Package Manager:** pnpm 11
- **Language:** TypeScript

---

## Local Development

### Prerequisites

- Node.js 22.13.0 or higher
- pnpm 11

### Setup

Clone the repository:

```bash
git clone https://github.com/Riz18255/Security-Portfolio.git
cd Security-Portfolio
```

Install dependencies:

```bash
pnpm install --frozen-lockfile
```

Start the development server:

```bash
pnpm dev
```

Open `http://localhost:3000` in your browser.

Run checks and build:

```bash
pnpm typecheck
pnpm build
pnpm start
```

---

## Project Structure

```text
├── app/
│   ├── globals.css          # Theme tokens, layout rules, and animation styles
│   ├── layout.tsx           # Root layout, metadata, and fonts
│   ├── page.tsx             # Main portfolio page and sections
│   └── work/
│       └── [slug]/page.tsx  # Dynamic case study route template
├── components/
│   ├── arsenal.tsx          # Tool filtering, search, and detail dialog
│   ├── canvas-scene.ts      # 2D canvas fallback renderer for the 3D sculpture
│   ├── portfolio-controls.tsx# Ambient sound toggle switch
│   ├── portfolio-header.tsx # Sticky navigation, brand mark, and search palette
│   ├── project-visual.tsx   # Workflow diagram component for projects
│   ├── security-scene.tsx   # Three.js 3D sculpture component
│   └── ui/                  # Reusable UI primitives (dialog, tabs, accordion, etc.)
├── docs/                    # Asset provenance, license records, and QA notes
├── lib/
│   ├── arsenal-data.ts      # Tool database and categorizations
│   ├── asset-map.ts         # Mappings between tools and their logo assets
│   ├── portfolio-data.ts    # Projects, case studies, experience, and contact data
│   └── utils.ts             # Styling utility helpers (clsx, tailwind-merge)
├── public/
│   ├── RiazAhmedAnsari_CV.pdf # Current one-page CV
│   ├── audio/               # Background sound assets (MP3 and WAV fallback)
│   ├── fonts/               # Self-hosted Space Grotesk and JetBrains Mono fonts
│   └── logos/               # Authentic publisher logos for tools and platforms
├── package.json
├── tsconfig.json
└── vercel.json              # Vercel framework and build script definitions
```

---

## Deployment on Vercel

The project is configured for deployment on [Vercel](https://vercel.com):

1. Push this repository to GitHub (public or private).
2. In Vercel, select **Add New... → Project** and import the repository.
3. Vercel automatically detects Next.js and uses the settings from `vercel.json`:
   - **Framework Preset:** Next.js
   - **Install Command:** `pnpm install --frozen-lockfile`
   - **Build Command:** `pnpm build`
   - **Node.js Version:** `22.x` (ensure 22.x is selected under Project Settings → General)
   - **Environment Variables:** None required
4. Click **Deploy**.

*(Optional)* If you want to keep the deployment private while testing, enable **Vercel Authentication** under **Project Settings → Deployment Protection**.

---

## Continuous Updates

This portfolio is an active record of my practical work in cybersecurity. I will continue updating this repository as I build new detection labs, complete further offensive and cloud security projects, and earn additional certifications.
