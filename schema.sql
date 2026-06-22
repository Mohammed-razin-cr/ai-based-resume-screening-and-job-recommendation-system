-- SQL Database Schema for AI Resume Intelligence Platform (SQLite / PostgreSQL Compatible)

-- 1. Users Table (Stores user history and authentication credentials)
CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    is_verified INTEGER DEFAULT 0,
    avatar TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Resumes Table (Stores uploaded resumes and ATS reports)
CREATE TABLE IF NOT EXISTS resumes (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL,
    file_name TEXT NOT NULL,
    file_type TEXT NOT NULL,
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    parsed_full_name TEXT,
    parsed_email TEXT,
    parsed_phone TEXT,
    skills TEXT, -- Comma-separated or JSON list of skills
    education TEXT, -- JSON string representation
    experience TEXT, -- JSON string representation
    certifications TEXT, -- Comma-separated or JSON list
    projects TEXT, -- JSON string representation
    links TEXT, -- JSON representation
    ats_score INTEGER NOT NULL,
    structure_score INTEGER NOT NULL,
    formatting_score INTEGER NOT NULL,
    keyword_density INTEGER NOT NULL,
    skills_match INTEGER NOT NULL,
    grammar_score INTEGER NOT NULL,
    readability_score INTEGER NOT NULL,
    grade_category TEXT NOT NULL,
    missing_skills TEXT, -- Comma-separated
    missing_keywords TEXT, -- Comma-separated
    improvement_roadmap TEXT, -- Newline-separated list
    suggested_rewrites TEXT, -- JSON representation
    FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- 3. Jobs Table (Stores simulated/active vacancies and candidate matches)
CREATE TABLE IF NOT EXISTS jobs (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    company TEXT NOT NULL,
    location TEXT NOT NULL,
    salary TEXT,
    job_type TEXT NOT NULL, -- Remote, Hybrid, Onsite
    required_skills TEXT, -- Comma-separated
    description TEXT
);

-- 4. User Job Matches (Saves history of jobs applied or recommended)
CREATE TABLE IF NOT EXISTS user_job_matches (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL,
    job_id TEXT NOT NULL,
    match_score INTEGER NOT NULL,
    status TEXT DEFAULT 'Recommended', -- Recommended, Saved, Applied
    applied_at TIMESTAMP,
    FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY(job_id) REFERENCES jobs(id) ON DELETE CASCADE
);

-- 5. Cover Letters Table (Saves generated cover letters history)
CREATE TABLE IF NOT EXISTS cover_letters (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL,
    title TEXT NOT NULL,
    target_role TEXT NOT NULL,
    company_name TEXT NOT NULL,
    content TEXT NOT NULL,
    generated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- 6. Interview Preps Table (Stores mock interview sessions and evaluation results)
CREATE TABLE IF NOT EXISTS interview_preps (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL,
    role_name TEXT NOT NULL,
    skills TEXT NOT NULL,
    questions_json TEXT NOT NULL, -- JSON detailed checklist
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- 7. Chat Coach History (Saves career helper conversations)
CREATE TABLE IF NOT EXISTS chat_history (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL,
    sender TEXT NOT NULL, -- user / coach
    message TEXT NOT NULL,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE
);
