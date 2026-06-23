<div align="center">

<img width="80" height="80" alt="Logo" src="https://ai.google.dev/static/site-assets/images/docs/favicon_144.png" />

# 🤖 AI-Based Resume Screening & Job Recommendation System

**Analyze resumes, calculate ATS scores, discover jobs, and accelerate careers — powered by Google Gemini AI.**

[![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org)
[![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=flat-square&logo=vite)](https://vitejs.dev)
[![Google Gemini](https://img.shields.io/badge/Google-Gemini_AI-4285F4?style=flat-square&logo=google)](https://ai.google.dev)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)

</div>

---

## ✨ Features

| Feature | Description |
|---|---|
| 📄 **ATS Score Analysis** | Deep resume scoring with structure, formatting, keyword density & grammar checks |
| 🏆 **Candidate Ranking** | Upload multiple resumes and rank candidates side-by-side with medal badges |
| 💼 **AI Job Matching** | Discover real-time job listings matched to your skills and experience |
| 🧠 **AI Career Coach** | Chat with an AI advisor for personalized career guidance |
| 🎙️ **Mock Interview** | Practice with AI-generated interview questions and instant feedback |
| 🛠️ **Resume Builder** | Build ATS-optimized resumes from scratch with AI assistance |
| 🗺️ **Skill Roadmap** | Get a personalized learning roadmap to fill skill gaps |
| 🪐 **3D Interactive UI** | Stunning animated orb, floating particles, and glassmorphism design |

---

## 🖥️ Screenshots

> Live at **http://localhost:3000** after setup

- **Home Page** — 3D animated orb, floating particle background, hero stats
- **Dashboard** — Upload & analyze resumes, view your resume library
- **Rankings** — Medal-based leaderboard with ATS score progress bars
- **Job Search** — Filter jobs by role, location, salary, and type

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** v18 or higher
- A **Google Gemini API key** — get one free at [ai.google.dev](https://ai.google.dev)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/Mohammed-razin-cr/ai-based-resume-screening-and-job-recommendation-system.git
cd ai-based-resume-screening-and-job-recommendation-system

# 2. Install dependencies
npm install

# 3. Set your Gemini API key
# Create a .env.local file and add:
echo "GEMINI_API_KEY=your_api_key_here" > .env.local

# 4. Start the development server
npm run dev
```

Open **http://localhost:3000** in your browser.

---

## 🏗️ Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | React 18 + TypeScript |
| **Styling** | Tailwind CSS v4 + Custom CSS (Glassmorphism) |
| **Build Tool** | Vite |
| **AI Engine** | Google Gemini 2.5 Flash |
| **Backend** | Node.js + Express (server.ts) |
| **Animations** | Pure CSS keyframes + SVG 3D orb |
| **Icons** | Lucide React |

---

## 📁 Project Structure

```
├── src/
│   ├── App.tsx          # Main application (all pages & components)
│   ├── index.css        # Global styles, animations, design system
│   └── main.tsx         # React entry point
├── server.ts            # Express backend + Gemini AI integration
├── public/
│   └── plum_bg.png      # Background image
├── .env.local           # Your API key (not committed)
└── package.json
```

---

## 🔑 Environment Variables

| Variable | Description | Required |
|---|---|---|
| `GEMINI_API_KEY` | Your Google Gemini API key | ✅ Yes |

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

---

## 📄 License

This project is licensed under the **MIT License**.

---

<div align="center">

Made with ❤️ using **Google Gemini AI**

⭐ Star this repo if you found it helpful!

</div>
