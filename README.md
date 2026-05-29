# Personal Portfolio

A content-driven portfolio built with the idea that content should be the source of truth, not the UI.

Instead of manually updating pages, portfolio data is stored in structured files and rendered dynamically by the frontend. The long-term goal is to evolve this into a public digital garden and developer knowledge system powered by a personal vault of notes, projects, and tasks.

---

## Current Goals

### 1. Content-Driven Portfolio

Portfolio content is stored in JSON files rather than hardcoded React components.

Examples:

- Personal information
- Skills
- Projects
- Experience
- Links
- Future blog entries

The frontend consumes these files and renders the portfolio automatically.

---

### 2. Automatic Vercel Redeployment

A file watcher monitors content changes.

Workflow:

```text
Edit JSON
↓
Save File
↓
Watcher Detects Change
↓
Auto Commit
↓
Auto Push
↓
Vercel Redeploys
↓
Portfolio Updates
```

Planned technologies:

- Node.js
- Chokidar
- Simple Git
- GitHub
- Vercel

---

### 3. Automated CI/CD Through Content Updates

Content changes should be enough to update the live site.

No manual deployment process.

Target workflow:

```text
Content Change
↓
Watcher
↓
Git Commit
↓
Git Push
↓
GitHub
↓
Vercel Build
↓
Production Deployment
```

---

### 4. Dockerized Runtime Architecture

A separate implementation will explore running the portfolio through a Dockerized environment.

Goals:

- Learn containerization
- Learn runtime-based deployments
- Compare static deployment vs always-running deployment models
- Experiment with self-hosted architectures

Planned stack:

- Docker
- Docker Compose
- Next.js
- Chokidar
- Node.js

---

## Planned Features

### Portfolio

- Responsive UI
- Project showcase
- Skill visualization
- Experience timeline
- Resume section
- Contact page

### Content System

- JSON-based content management
- Markdown support
- MDX support
- Content schema validation

### Developer Knowledge System

- Public notes
- Learning logs
- Architecture notes
- Technical writeups
- Progress tracking

### Task Board

- Public roadmap
- Current work items
- Future project ideas
- Development status tracking

---

## Long-Term Vision

Transform this portfolio into a public developer operating system.

```text
Personal Notes
↓
Structured Content
↓
Portfolio
↓
Task Board
↓
Digital Garden
↓
Public Knowledge Base
```

The ultimate goal is to maintain a single source of truth that powers:

- Portfolio
- Public notes
- Project documentation
- Progress tracking
- Learning journal
- Task board

from the same content repository.

---

## Status

### Completed

- Initial portfolio setup

### In Progress

- Portfolio UI development
- Content schema design
- Vercel deployment setup

### Planned

- Chokidar watcher
- Automated Git commits
- Automated Git pushes
- Automatic Vercel redeployment
- Dockerized deployment architecture
- Markdown/MDX support
- Public task board
- Digital garden integration
