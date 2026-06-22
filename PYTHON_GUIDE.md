# Python Full-Stack Integration Guide
## React Frontend + Python Flask, SQLite, Pandas & NLP Pipeline

This project is fully designed to support **both** a Node.js web-preview (for interactive visual sandboxing) and a **native Python Flask + SQLite SQL + Pandas + NLP** production setup.

---

### 🚀 Architecture Components

1. **Frontend**: Vite + React 19 + Tailwind CSS + Lucide Icons + Motion Layout.
2. **Backend**: Python 3 (Flask), representing a secure API proxy layer on port `5000`.
3. **Database (SQL)**: SQLite relational engine (`resume_app.db`) built dynamically from `/schema.sql`. Stores complete user history, authentication credentials, uploaded candidate resumes, saved job applications, and chats.
4. **Data Analytics (Pandas)**: Performs fast statistical aggregations, average scoring, and identifies top-5 trending skills across all candidates via Pandas Series and DataFrames.
5. **NLP Matcher**: Extracts resume information and scores it using standard keyword parsing or true Google Gemini Generative AI models.

---

### 📦 Python Backend Directory Files Created
* `/app.py`: Core Flask application with full DB routes, NLP matchers, and Pandas analytics.
* `/requirements.txt`: Python package dependency list.
* `/schema.sql`: Full SQL layout definitions for users, resumes, history, and matches.

---

### 🚦 Instructions to Run Python Backend Locally

To transition the full-stack system completely to python backend services:

#### 1. Setup Python Virtual Environment and Install Dependencies
```bash
# Create a virtual environment
python3 -m venv venv

# Activate virtual environment
# On macOS/Linux:
source venv/bin/activate
# On Windows:
venv\Scripts\activate

# Install required Python packages
pip install -r requirements.txt
```

#### 2. Configure Environment Variables
Create a file named `.env` in the python server root and add your custom keys:
```env
# Optional secret key for Gemini 3.5 AI Model
GEMINI_API_KEY=your_actual_key_here
```

#### 3. Start Python Flask Web Server
```bash
# Run the application
python3 app.py
```
This automatically initializes the relational database schemas listed in `schema.sql` and populates the SQLite file with standard seed data, starting the service on:
👉 **`http://localhost:5000`**

---

### 🔗 Connecting React Frontend to Python Backend

To route the interactive React components to call the Flask endpoints directly:

1. In `/vite.config.ts`, update the proxy target path under dev server from port `3000` (Node) to point directly to Flask standard port `5000`:
```ts
// Update vite.config.ts Proxy targets:
server: {
  proxy: {
    '/api': {
      target: 'http://localhost:5000',
      changeOrigin: true,
      secure: false
    }
  }
}
```

2. Boot the frontend:
```bash
npm install
npm run dev
```

Now, every single premium visual selector in the interactive browser panel (Registering profiles, uploading files, analyzing ATS parameters, comparing candidates, generating roadmaps, generating cover letters, doing mock audio interviews) will be processed through your customized Python / Pandas + SQL database server!
