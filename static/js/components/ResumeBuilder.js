const { useState, useEffect, useRef } = window.React;

const INITIAL_RESUME = {
  personal: {
    name: "Alex Rivera",
    title: "Senior Full-Stack Engineer",
    email: "alex.rivera@example.com",
    phone: "+1 (555) 019-2834",
    location: "San Francisco, CA",
    website: "https://alexrivera.dev",
    linkedin: "linkedin.com/in/alexrivera"
  },
  summary: "Innovative Senior Full-Stack Engineer with 6+ years of experience building secure, scalable web applications and AI-driven platforms. Adept at leading cross-functional teams, engineering high-speed pipelines, and aligning clean code structures with high business value.",
  work: [
    {
      company: "TechNova Solutions",
      role: "Senior Software Architect",
      period: "2022 - Present",
      description: "Led a team of 5 engineers to design a premium React-based dashboard, boosting performance and site loading speeds by 45%.\nImplemented serverless API pipelines to handle 10M+ daily events using Node.js and Google Cloud Engine.\nRefined team git workflow structures and instituted rigorous automated linting, reducing live release bugs by 30%."
    },
    {
      company: "Enterprise AI Systems",
      role: "Full-Stack Developer",
      period: "2020 - 2022",
      description: "Built AI semantic search integrations using LLMs and vector search engines, improving accuracy by 35%.\nDeveloped real-time analytics graphics in React, utilizing responsive Tailwind CSS grids.\nOptimized database read loads by 50% by establishing comprehensive Redis caching layers."
    }
  ],
  education: [
    {
      school: "University of California, Berkeley",
      degree: "B.S. in Computer Science",
      period: "2016 - 2020",
      details: "Graduated with Honors. Specialization in Web Technologies and Distributed Database Systems."
    }
  ],
  skills: "React, Node.js, Express, JavaScript, TypeScript, SQLite, PostgreSQL, Python, Flask, Docker, Google GenAI, Tailwind CSS, REST APIs",
  projects: [
    {
      name: "ATS InSight Platform",
      link: "github.com/alexrivera/ats-insight",
      description: "A high-performance resume analysis application utilizing Gemini NLP engines to parse work experiences."
    }
  ]
};

export function ResumeBuilder() {
  const [resume, setResume] = useState(() => {
    const saved = localStorage.getItem('ats_edited_resume');
    return saved ? JSON.parse(saved) : INITIAL_RESUME;
  });
  const [activeTemplate, setActiveTemplate] = useState('modern'); // 'modern', 'executive', 'tech_mono', 'classic_serif'
  const [activeTab, setActiveTab] = useState('personal'); // 'personal', 'summary', 'work', 'education', 'skills', 'projects'
  const fileInputRef = useRef(null);

  // Auto-save changes to localStorage to prevent data loss
  useEffect(() => {
    localStorage.setItem('ats_edited_resume', JSON.stringify(resume));
  }, [resume]);

  // Re-trigger Lucide icon renders
  useEffect(() => {
    if (typeof lucide !== 'undefined') {
      lucide.createIcons();
    }
  }, [activeTab, activeTemplate]);

  const handlePersonalChange = (field, val) => {
    setResume(prev => ({
      ...prev,
      personal: {
        ...prev.personal,
        [field]: val
      }
    }));
  };

  const handleSummaryChange = (val) => {
    setResume(prev => ({ ...prev, summary: val }));
  };

  const handleSkillsChange = (val) => {
    setResume(prev => ({ ...prev, skills: val }));
  };

  // Work Experience Helpers
  const handleWorkChange = (index, field, val) => {
    setResume(prev => {
      const updated = [...prev.work];
      updated[index] = { ...updated[index], [field]: val };
      return { ...prev, work: updated };
    });
  };

  const addWork = () => {
    setResume(prev => ({
      ...prev,
      work: [...prev.work, { company: "", role: "", period: "", description: "" }]
    }));
  };

  const removeWork = (index) => {
    setResume(prev => ({
      ...prev,
      work: prev.work.filter((_, i) => i !== index)
    }));
  };

  const moveWork = (index, direction) => {
    if (direction === 'up' && index === 0) return;
    if (direction === 'down' && index === resume.work.length - 1) return;
    
    setResume(prev => {
      const updated = [...prev.work];
      const targetIndex = direction === 'up' ? index - 1 : index + 1;
      const temp = updated[index];
      updated[index] = updated[targetIndex];
      updated[targetIndex] = temp;
      return { ...prev, work: updated };
    });
  };

  // Education Helpers
  const handleEducationChange = (index, field, val) => {
    setResume(prev => {
      const updated = [...prev.education];
      updated[index] = { ...updated[index], [field]: val };
      return { ...prev, education: updated };
    });
  };

  const addEducation = () => {
    setResume(prev => ({
      ...prev,
      education: [...prev.education, { school: "", degree: "", period: "", details: "" }]
    }));
  };

  const removeEducation = (index) => {
    setResume(prev => ({
      ...prev,
      education: prev.education.filter((_, i) => i !== index)
    }));
  };

  // Projects Helpers
  const handleProjectChange = (index, field, val) => {
    setResume(prev => {
      const updated = [...prev.projects];
      updated[index] = { ...updated[index], [field]: val };
      return { ...prev, projects: updated };
    });
  };

  const addProject = () => {
    setResume(prev => ({
      ...prev,
      projects: [...prev.projects, { name: "", link: "", description: "" }]
    }));
  };

  const removeProject = (index) => {
    setResume(prev => ({
      ...prev,
      projects: prev.projects.filter((_, i) => i !== index)
    }));
  };

  // Core Actions
  const handleExportJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(resume, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `${resume.personal.name.replace(/\s+/g, '_')}_resume_template.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const triggerImportJSON = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleImportJSON = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target.result);
        if (parsed.personal && (typeof parsed.skills === 'string' || Array.isArray(parsed.skills))) {
          // normalize skills to comma separated string if array
          if (Array.isArray(parsed.skills)) {
            parsed.skills = parsed.skills.join(', ');
          }
          setResume(parsed);
          alert("Resume details parsed successfully!");
        } else {
          alert("Invalid resume JSON format. Could not import.");
        }
      } catch (err) {
        alert("Failed to parse file as valid JSON.");
      }
    };
    reader.readAsText(file);
  };

  const handleResetToSample = () => {
    if (confirm("Are you sure you want to overwrite all sections with the sample ATS template?")) {
      setResume(INITIAL_RESUME);
    }
  };

  const handleClearAll = () => {
    if (confirm("Clear all text fields inside this builder session?")) {
      setResume({
        personal: { name: "", title: "", email: "", phone: "", location: "", website: "", linkedin: "" },
        summary: "",
        work: [],
        education: [],
        skills: "",
        projects: []
      });
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleExportHTML = () => {
    const skillsArray = typeof resume.skills === 'string' 
      ? resume.skills.split(',').map(s => s.trim()).filter(Boolean)
      : [];
    
    let inlineCSS = `
      body { font-family: 'Inter', sans-serif; background-color: #ffffff; color: #1e293b; margin: 0; padding: 40px; line-height: 1.5; }
      h1 { margin: 0 0 5px 0; font-size: 28px; color: #0f172a; font-weight: 700; text-transform: uppercase; letter-spacing: -0.5px; }
      h2 { font-size: 14px; margin: 0 0 15px 0; font-weight: 500; font-family: sans-serif; letter-spacing: 1px; text-transform: uppercase; }
      .section-title { font-size: 15px; font-weight: 700; text-transform: uppercase; border-bottom: 1.5px solid #cbd5e1; padding-bottom: 4px; margin-top: 30px; margin-bottom: 12px; color: #010617; letter-spacing: 0.5px; }
      .meta { display: flex; flex-wrap: wrap; gap: 15px; font-size: 12px; color: #475569; margin-bottom: 25px; border-bottom: 1px dashed #e2e8f0; padding-bottom: 12px; }
      .meta a { color: #3b82f6; text-decoration: none; }
      .summary { font-size: 13.5px; color: #334155; margin-bottom: 20px; text-align: justify; }
      .item { margin-bottom: 18px; }
      .item-header { display: flex; justify-content: space-between; align-items: baseline; font-weight: 600; font-size: 13.5px; color: #0f172a; }
      .item-sub { display: flex; justify-content: space-between; font-size: 12px; color: #64748b; margin-top: 2px; margin-bottom: 6px; font-style: italic; }
      .item-desc { font-size: 12.5px; color: #334155; margin: 0; padding-left: 18px; }
      .skills-container { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 5px; }
      .skill-tag { background: #f1f5f9; color: #334155; padding: 3px 8px; border-radius: 4px; font-size: 11px; font-weight: 500; border: 1px solid #e2e8f0; }
    `;

    if (activeTemplate === 'tech_mono') {
      inlineCSS += `
        body { font-family: 'JetBrains Mono', Courier, monospace; font-size: 12px; padding: 25px; color: #000; }
        h1 { font-family: 'JetBrains Mono', monospace; font-size: 22px; text-transform: none; font-weight: bold; border-bottom: 2px solid #000; padding-bottom: 6px; }
        h2 { font-size: 13px; text-transform: none; color: #333; margin-top: 5px; font-weight: normal; }
        .section-title { font-size: 13px; font-weight: bold; text-transform: none; border-bottom: 1px solid #000; padding-bottom: 2px; margin-top: 20px; color: #000; }
        .meta { gap: 10px; border: none; padding-bottom: 8px; font-size: 11.5px; }
        .skill-tag { background: none; border: 1px solid #000; font-family: monospace; border-radius: 0; }
      `;
    } else if (activeTemplate === 'classic_serif') {
      inlineCSS += `
        body { font-family: 'Georgia', serif; font-size: 14px; padding: 45px; }
        h1 { font-family: 'Georgia', serif; font-size: 32px; text-transform: none; text-align: center; font-weight: normal; }
        h2 { text-align: center; font-family: 'Georgia', serif; font-style: italic; text-transform: none; font-size: 15px; color: #475569; }
        .section-title { text-align: center; border-bottom: 1px solid #94a3b8; font-family: 'Georgia', serif; font-weight: normal; font-style: italic; text-transform: none; font-size: 17px; margin-top: 25px; }
        .meta { justify-content: center; border: none; font-family: sans-serif; gap: 20px; }
      `;
    }

    const htmlContent = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>${resume.personal.name} - Resume</title>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;700&display=swap" rel="stylesheet">
  <style>${inlineCSS}</style>
</head>
<body>
  <h1>${resume.personal.name || 'Your Name'}</h1>
  <h2>${resume.personal.title || 'Your Target Industry Title'}</h2>
  
  <div class="meta">
    ${resume.personal.email ? `<span>✉ ${resume.personal.email}</span>` : ''}
    ${resume.personal.phone ? `<span>📞 ${resume.personal.phone}</span>` : ''}
    ${resume.personal.location ? `<span>📍 ${resume.personal.location}</span>` : ''}
    ${resume.personal.website ? `<span>🔗 <a href="${resume.personal.website}" target="_blank">${resume.personal.website}</a></span>` : ''}
    ${resume.personal.linkedin ? `<span>in/ <a href="https://${resume.personal.linkedin}" target="_blank">${resume.personal.linkedin}</a></span>` : ''}
  </div>

  ${resume.summary ? `
  <div class="section-title">Professional Summary</div>
  <div class="summary">${resume.summary}</div>
  ` : ''}

  ${resume.work.length > 0 ? `
  <div class="section-title">Work Experience</div>
  ${resume.work.map(w => `
    <div class="item">
      <div class="item-header">
        <span>${w.role || 'Role'}</span>
        <span>${w.period || 'Period'}</span>
      </div>
      <div class="item-sub">
        <span>${w.company || 'Company'}</span>
      </div>
      <ul class="item-desc">
        ${(w.description || '').split('\n').map(bullet => bullet.trim() ? `<li>${bullet.replace(/^[-\*\u2022]\s*/, '')}</li>` : '').join('')}
      </ul>
    </div>
  `).join('')}
  ` : ''}

  ${resume.education.length > 0 ? `
  <div class="section-title">Education</div>
  ${resume.education.map(ed => `
    <div class="item">
      <div class="item-header">
        <span>${ed.degree || 'Degree / Major'}</span>
        <span>${ed.period || 'Period'}</span>
      </div>
      <div class="item-sub">
        <span>${ed.school || 'School Name'}</span>
      </div>
      ${ed.details ? `<p style="font-size: 12px; color: #475569; margin: 4px 0 0 0;">${ed.details}</p>` : ''}
    </div>
  `).join('')}
  ` : ''}

  ${skillsArray.length > 0 ? `
  <div class="section-title">Expertise & Technical Skills</div>
  <div class="skills-container">
    ${skillsArray.map(s => `<span class="skill-tag">${s}</span>`).join('')}
  </div>
  ` : ''}

  ${resume.projects.length > 0 ? `
  <div class="section-title">Key Projects & Certifications</div>
  ${resume.projects.map(p => `
    <div class="item">
      <div class="item-header">
        <span>${p.name || 'Project Title'}</span>
        ${p.link ? `<span style="font-size: 12px; font-weight: normal;"><a href="https://${p.link}" target="_blank">${p.link}</a></span>` : ''}
      </div>
      <p style="font-size: 12.5px; color: #334155; margin: 4px 0 0 0;">${p.description || ''}</p>
    </div>
  `).join('')}
  ` : ''}
</body>
</html>`;

    const blob = new Blob([htmlContent], { type: "text/html;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", url);
    downloadAnchor.setAttribute("download", `${resume.personal.name.replace(/\s+/g, '_')}_resume.html`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const parsedSkills = typeof resume.skills === 'string' 
    ? resume.skills.split(',').map(s => s.trim()).filter(Boolean)
    : [];

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            <span className="p-1.5 bg-indigo-500/10 text-indigo-400 rounded-lg"><i data-lucide="layout-template" className="w-5 h-5"></i></span>
            Interactive ATS Resume Builder
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Choose robust ATS-friendly layouts, live-edit details, and download or print perfectly.
          </p>
        </div>
        
        <div className="flex flex-wrap items-center gap-2">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImportJSON}
            className="hidden"
            accept=".json"
          />
          <button
            onClick={triggerImportJSON}
            className="px-3 py-1.5 bg-slate-900 border border-slate-800 hover:bg-slate-800 rounded-xl text-xs font-semibold text-slate-300 flex items-center gap-1.5 transition"
            title="Import previously saved JSON"
          >
            <i data-lucide="file-input" className="w-3.5 h-3.5"></i> Import JSON
          </button>
          
          <button
            onClick={handleExportJSON}
            className="px-3 py-1.5 bg-slate-900 border border-slate-800 hover:bg-slate-800 rounded-xl text-xs font-semibold text-slate-300 flex items-center gap-1.5 transition"
            title="Download draft layout parameters"
          >
            <i data-lucide="file-output" className="w-3.5 h-3.5"></i> Save JSON
          </button>

          <button
            onClick={handleExportHTML}
            className="px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/20 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition"
            title="Download standalone HTML backup"
          >
            <i data-lucide="code" className="w-3.5 h-3.5"></i> HTML File
          </button>

          <button
            onClick={handlePrint}
            className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold shadow-md shadow-indigo-600/10 flex items-center gap-1.5 transition"
            title="Triggers page print layout. Select Save as PDF in destination."
          >
            <i data-lucide="printer" className="w-3.5 h-3.5"></i> Print & Save PDF
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT COLUMN: THE INTERACTIVE BUILDER FORM (5/12 widths) */}
        <div className="lg:col-span-5 bg-slate-900/40 border border-slate-800/80 rounded-2xl p-6 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <span className="text-xs font-bold text-slate-400 tracking-wider uppercase">Resume Editor</span>
            <div className="flex items-center gap-2">
              <button
                onClick={handleResetToSample}
                className="text-[10px] text-slate-400 hover:text-indigo-400 underline transition"
              >
                Reset Sample
              </button>
              <span className="text-slate-800">|</span>
              <button
                onClick={handleClearAll}
                className="text-[10px] text-red-400 hover:text-red-300 underline transition"
              >
                Clear All
              </button>
            </div>
          </div>

          {/* Collapsible/Tabbed Category Controller */}
          <div className="flex flex-wrap gap-1 bg-slate-950 p-1.5 rounded-xl border border-slate-800 grid grid-cols-3 gap-y-1">
            <button
              onClick={() => setActiveTab('personal')}
              className={`py-1.5 rounded-lg text-[10px] font-bold transition ${activeTab === 'personal' ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20' : 'text-slate-400 hover:text-slate-200'}`}
            >
              Contact
            </button>
            <button
              onClick={() => setActiveTab('summary')}
              className={`py-1.5 rounded-lg text-[10px] font-bold transition ${activeTab === 'summary' ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20' : 'text-slate-400 hover:text-slate-200'}`}
            >
              Profile
            </button>
            <button
              onClick={() => setActiveTab('skills')}
              className={`py-1.5 rounded-lg text-[10px] font-bold transition ${activeTab === 'skills' ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20' : 'text-slate-400 hover:text-slate-200'}`}
            >
              Skills
            </button>
            <button
              onClick={() => setActiveTab('work')}
              className={`py-1.5 rounded-lg text-[10px] font-bold transition ${activeTab === 'work' ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20' : 'text-slate-400 hover:text-slate-200'}`}
            >
              Experience ({resume.work.length})
            </button>
            <button
              onClick={() => setActiveTab('education')}
              className={`py-1.5 rounded-lg text-[10px] font-bold transition ${activeTab === 'education' ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20' : 'text-slate-400 hover:text-slate-200'}`}
            >
              Education ({resume.education.length})
            </button>
            <button
              onClick={() => setActiveTab('projects')}
              className={`py-1.5 rounded-lg text-[10px] font-bold transition ${activeTab === 'projects' ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20' : 'text-slate-400 hover:text-slate-200'}`}
            >
              Projects ({resume.projects.length})
            </button>
          </div>

          {/* Personal Info Pane */}
          {activeTab === 'personal' && (
            <div className="space-y-4 animate-fade-in">
              <div>
                <label className="block text-[10px] font-bold uppercase text-slate-400 mb-1.5">Full Legal Name</label>
                <input
                  type="text"
                  value={resume.personal.name}
                  onChange={(e) => handlePersonalChange('name', e.target.value)}
                  placeholder="e.g. Alex Rivera"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs focus:ring-1 focus:ring-indigo-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase text-slate-400 mb-1.5">Industry Title / Headline</label>
                <input
                  type="text"
                  value={resume.personal.title}
                  onChange={(e) => handlePersonalChange('title', e.target.value)}
                  placeholder="e.g. Senior Full-Stack Engineer"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs focus:ring-1 focus:ring-indigo-500 outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold uppercase text-slate-400 mb-1.5">Email Link</label>
                  <input
                    type="email"
                    value={resume.personal.email}
                    onChange={(e) => handlePersonalChange('email', e.target.value)}
                    placeholder="alex@tech.com"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs focus:ring-1 focus:ring-indigo-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase text-slate-400 mb-1.5">Phone Number</label>
                  <input
                    type="text"
                    value={resume.personal.phone}
                    onChange={(e) => handlePersonalChange('phone', e.target.value)}
                    placeholder="+1 (555) 019..."
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs focus:ring-1 focus:ring-indigo-500 outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold uppercase text-slate-400 mb-1.5">Region/Location</label>
                  <input
                    type="text"
                    value={resume.personal.location}
                    onChange={(e) => handlePersonalChange('location', e.target.value)}
                    placeholder="San Francisco, CA"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs focus:ring-1 focus:ring-indigo-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase text-slate-400 mb-1.5">Portfolio Link</label>
                  <input
                    type="text"
                    value={resume.personal.website}
                    onChange={(e) => handlePersonalChange('website', e.target.value)}
                    placeholder="https://alexrivera.dev"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs focus:ring-1 focus:ring-indigo-500 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase text-slate-400 mb-1.5">LinkedIn Profile Path</label>
                <input
                  type="text"
                  value={resume.personal.linkedin}
                  onChange={(e) => handlePersonalChange('linkedin', e.target.value)}
                  placeholder="linkedin.com/in/alexrivera"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs focus:ring-1 focus:ring-indigo-500 outline-none"
                />
              </div>
            </div>
          )}

          {/* Professional Summary Tab */}
          {activeTab === 'summary' && (
            <div className="space-y-4 animate-fade-in">
              <div>
                <label className="block text-[10px] font-bold uppercase text-slate-400 mb-1.5">Executive Statement</label>
                <textarea
                  value={resume.summary}
                  onChange={(e) => handleSummaryChange(e.target.value)}
                  placeholder="Write a highly competitive paragraphs incorporating high-scoring ATS keywords for your domain..."
                  rows="8"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs focus:ring-1 focus:ring-indigo-500 outline-none resize-none leading-relaxed"
                ></textarea>
                <span className="text-[9px] text-slate-500">Character Count: {resume.summary.length}. Aim for 200-400 characters.</span>
              </div>
            </div>
          )}

          {/* Skills Tab */}
          {activeTab === 'skills' && (
            <div className="space-y-4 animate-fade-in">
              <div>
                <label className="block text-[10px] font-bold uppercase text-slate-400 mb-1.5">Keywords & Hard Core Skills (Comma Separated)</label>
                <textarea
                  value={resume.skills}
                  onChange={(e) => handleSkillsChange(e.target.value)}
                  placeholder="React, TypeScript, Node.js, Express, PostgreSQL, AWS..."
                  rows="6"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs focus:ring-1 focus:ring-indigo-500 outline-none resize-none leading-relaxed"
                ></textarea>
                <p className="text-[10px] text-slate-500">
                  Separating these with commas automatically models bubble metrics inside the premium previews for top-tier visual flow.
                </p>
              </div>
            </div>
          )}

          {/* Work Experience Tab */}
          {activeTab === 'work' && (
            <div className="space-y-4 animate-fade-in max-h-[480px] overflow-y-auto pr-1">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase text-slate-500">Work Logs</span>
                <button
                  onClick={addWork}
                  className="px-2.5 py-1 bg-indigo-500/10 border border-indigo-500/20 hover:bg-indigo-500/20 text-indigo-400 rounded-lg text-[10px] font-bold flex items-center gap-1 transition"
                >
                  <i data-lucide="plus" className="w-3 h-3"></i> Add Employment
                </button>
              </div>

              {resume.work.length === 0 ? (
                <div className="text-center py-6 border border-dashed border-slate-800 rounded-xl">
                  <p className="text-[11px] text-slate-500">No work experiences added yet.</p>
                </div>
              ) : (
                resume.work.map((experience, i) => (
                  <div key={i} className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3 relative group">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-1">
                      <span className="text-xs font-bold text-slate-300">Position #{i + 1}</span>
                      <div className="flex items-center gap-1 opacity-80 group-hover:opacity-100 transition">
                        <button
                          onClick={() => moveWork(i, 'up')}
                          disabled={i === 0}
                          className="p-1 hover:text-indigo-400 disabled:opacity-30 disabled:pointer-events-none transition"
                          title="Move Up"
                        >
                          <i data-lucide="arrow-up" className="w-3.5 h-3.5"></i>
                        </button>
                        <button
                          onClick={() => moveWork(i, 'down')}
                          disabled={i === resume.work.length - 1}
                          className="p-1 hover:text-indigo-400 disabled:opacity-30 disabled:pointer-events-none transition"
                          title="Move Down"
                        >
                          <i data-lucide="arrow-down" className="w-3.5 h-3.5"></i>
                        </button>
                        <button
                          onClick={() => removeWork(i)}
                          className="p-1 text-red-500 hover:text-red-400 transition"
                          title="Delete employment log"
                        >
                          <i data-lucide="trash-2" className="w-3.5 h-3.5"></i>
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-[9px] uppercase font-bold text-slate-400 block mb-1">Company / Team</label>
                        <input
                          type="text"
                          value={experience.company}
                          onChange={(e) => handleWorkChange(i, 'company', e.target.value)}
                          className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs outline-none"
                          placeholder="e.g. Google"
                        />
                      </div>
                      <div>
                        <label className="text-[9px] uppercase font-bold text-slate-400 block mb-1">Target Role</label>
                        <input
                          type="text"
                          value={experience.role}
                          onChange={(e) => handleWorkChange(i, 'role', e.target.value)}
                          className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs outline-none"
                          placeholder="e.g. Staff Dev"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-[9px] uppercase font-bold text-slate-400 block mb-1">Employment Duration / Period</label>
                      <input
                        type="text"
                        value={experience.period}
                        onChange={(e) => handleWorkChange(i, 'period', e.target.value)}
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs outline-none"
                        placeholder="e.g. Oct 2021 - Present"
                      />
                    </div>

                    <div>
                      <label className="text-[9px] uppercase font-bold text-slate-400 block mb-1">Key Contributions (Bullets on newlines)</label>
                      <textarea
                        value={experience.description}
                        onChange={(e) => handleWorkChange(i, 'description', e.target.value)}
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs outline-none h-24 resize-none leading-relaxed"
                        placeholder="- Designed scale-to-zero server pipelines\n- Supercharged core loading time bounds..."
                      ></textarea>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* Education Pane */}
          {activeTab === 'education' && (
            <div className="space-y-4 animate-fade-in">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase text-slate-500">Degree & Institutes</span>
                <button
                  onClick={addEducation}
                  className="px-2.5 py-1 bg-indigo-500/10 border border-indigo-500/20 hover:bg-indigo-500/20 text-indigo-400 rounded-lg text-[10px] font-bold flex items-center gap-1 transition"
                >
                  <i data-lucide="plus" className="w-3 h-3"></i> Add School
                </button>
              </div>

              {resume.education.length === 0 ? (
                <div className="text-center py-6 border border-dashed border-slate-800 rounded-xl">
                  <p className="text-[11px] text-slate-500">No academic background added yet.</p>
                </div>
              ) : (
                resume.education.map((edu, i) => (
                  <div key={i} className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3 relative group">
                    <button
                      onClick={() => removeEducation(i)}
                      className="absolute top-4 right-4 text-slate-500 hover:text-red-400 transition"
                      title="Remove Education Section"
                    >
                      <i data-lucide="trash-2" className="w-4 h-4"></i>
                    </button>
                    
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-[9px] uppercase font-bold text-slate-400 block mb-1">Institution/College</label>
                        <input
                          type="text"
                          value={edu.school}
                          onChange={(e) => handleEducationChange(i, 'school', e.target.value)}
                          className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs outline-none"
                          placeholder="e.g. Stanford University"
                        />
                      </div>
                      <div>
                        <label className="text-[9px] uppercase font-bold text-slate-400 block mb-1">Degree Earned / Field</label>
                        <input
                          type="text"
                          value={edu.degree}
                          onChange={(e) => handleEducationChange(i, 'degree', e.target.value)}
                          className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs outline-none"
                          placeholder="e.g. Master in Informatics"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-[9px] uppercase font-bold text-slate-400 block mb-1">Attendance Period</label>
                        <input
                          type="text"
                          value={edu.period}
                          onChange={(e) => handleEducationChange(i, 'period', e.target.value)}
                          className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs outline-none"
                          placeholder="e.g. 2018 - 2022"
                        />
                      </div>
                      <div>
                        <label className="text-[9px] uppercase font-bold text-slate-400 block mb-1">Additional details (GPA / honors)</label>
                        <input
                          type="text"
                          value={edu.details}
                          onChange={(e) => handleEducationChange(i, 'details', e.target.value)}
                          className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs outline-none"
                          placeholder="e.g. Major GPA 3.9."
                        />
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* Projects and Certification Pane */}
          {activeTab === 'projects' && (
            <div className="space-y-4 animate-fade-in">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase text-slate-500">Key Projects</span>
                <button
                  onClick={addProject}
                  className="px-2.5 py-1 bg-indigo-500/10 border border-indigo-500/20 hover:bg-indigo-500/20 text-indigo-400 rounded-lg text-[10px] font-bold flex items-center gap-1 transition"
                >
                  <i data-lucide="plus" className="w-3 h-3"></i> Add Project
                </button>
              </div>

              {resume.projects.length === 0 ? (
                <div className="text-center py-6 border border-dashed border-slate-800 rounded-xl">
                  <p className="text-[11px] text-slate-500">No project listings configured yet.</p>
                </div>
              ) : (
                resume.projects.map((proj, i) => (
                  <div key={i} className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3 relative group">
                    <button
                      onClick={() => removeProject(i)}
                      className="absolute top-4 right-4 text-slate-500 hover:text-red-400 transition"
                      title="Remove Project Listing"
                    >
                      <i data-lucide="trash-2" className="w-4 h-4"></i>
                    </button>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-[9px] uppercase font-bold text-slate-400 block mb-1">Project Name</label>
                        <input
                          type="text"
                          value={proj.name}
                          onChange={(e) => handleProjectChange(i, 'name', e.target.value)}
                          className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs outline-none"
                          placeholder="e.g. Quantum Engine"
                        />
                      </div>
                      <div>
                        <label className="text-[9px] uppercase font-bold text-slate-400 block mb-1">Reference Link / Path</label>
                        <input
                          type="text"
                          value={proj.link}
                          onChange={(e) => handleProjectChange(i, 'link', e.target.value)}
                          className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs outline-none"
                          placeholder="e.g. github.com/username/project"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-[9px] uppercase font-bold text-slate-400 block mb-1">Brief Description</label>
                      <input
                        type="text"
                        value={proj.description}
                        onChange={(e) => handleProjectChange(i, 'description', e.target.value)}
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs outline-none"
                        placeholder="Built dynamic memory caching engines supporting rapid requests."
                      />
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>

        {/* RIGHT COLUMN: THE LIVE PREVIEW SWITCHER & VISUAL PREVIEWER (7/12 widths) */}
        <div className="lg:col-span-7 flex flex-col space-y-4">
          
          {/* Real-time Theme/Template Selector Rail */}
          <div className="flex flex-wrap items-center justify-between gap-4 bg-slate-900/40 border border-slate-800/80 rounded-2xl p-4">
            <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
              <i data-lucide="eye" className="w-4 h-4 text-indigo-400"></i> Active Template Style
            </span>
            <div className="flex flex-wrap gap-1.5">
              <button
                onClick={() => setActiveTemplate('modern')}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold tracking-wide transition ${
                  activeTemplate === 'modern' ? 'bg-indigo-600 text-white font-bold' : 'text-slate-400 hover:text-slate-200 bg-slate-950/40 border border-slate-800/50'
                }`}
              >
                Modern Minimalist
              </button>
              <button
                onClick={() => setActiveTemplate('executive')}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold tracking-wide transition ${
                  activeTemplate === 'executive' ? 'bg-indigo-600 text-white font-bold' : 'text-slate-400 hover:text-slate-200 bg-slate-950/40 border border-slate-800/50'
                }`}
              >
                Executive Pillar
              </button>
              <button
                onClick={() => setActiveTemplate('tech_mono')}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold tracking-wide transition ${
                  activeTemplate === 'tech_mono' ? 'bg-indigo-600 text-white font-bold' : 'text-slate-400 hover:text-slate-200 bg-slate-950/40 border border-slate-800/50'
                }`}
              >
                Tech / Dev Mono
              </button>
              <button
                onClick={() => setActiveTemplate('classic_serif')}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold tracking-wide transition ${
                  activeTemplate === 'classic_serif' ? 'bg-indigo-600 text-white font-bold' : 'text-slate-400 hover:text-slate-200 bg-slate-950/40 border border-slate-800/50'
                }`}
              >
                Classic Serif
              </button>
            </div>
          </div>

          {/* LIVE PREVIEW CONTAINER */}
          {/* We assign id="resume-print-area" so print media query styles can selectively print exactly this element */}
          <div className="bg-white text-slate-900 border border-slate-300 rounded-2xl shadow-2xl p-8 sm:p-12 w-full min-h-[850px] relative transition-all preserve-colors overflow-hidden" id="resume-print-area">
            
            {/* 1. MODERN MINIMALIST VISUAL BRANDING */}
            {activeTemplate === 'modern' && (
              <div className="space-y-6">
                <div className="border-b border-indigo-100 pb-4">
                  <h1 className="text-3xl font-extrabold text-slate-950 tracking-tight leading-none">
                    {resume.personal.name || "YOUR NAME"}
                  </h1>
                  <h2 className="text-sm font-semibold text-indigo-600 tracking-wider uppercase mt-1">
                    {resume.personal.title || "TARGET POSITION TITLE"}
                  </h2>
                  <div className="flex flex-wrap gap-4 mt-3 text-slate-500 text-xs font-medium tracking-normal">
                    {resume.personal.email && <span className="flex items-center gap-1">✉ {resume.personal.email}</span>}
                    {resume.personal.phone && <span className="flex items-center gap-1">📞 {resume.personal.phone}</span>}
                    {resume.personal.location && <span className="flex items-center gap-1">📍 {resume.personal.location}</span>}
                    {resume.personal.website && (
                      <span className="flex items-center gap-1 text-slate-700 font-semibold">
                        🔗 <a href={resume.personal.website} target="_blank" rel="noreferrer" className="hover:underline">{resume.personal.website.replace(/^https?:\/\//, '')}</a>
                      </span>
                    )}
                    {resume.personal.linkedin && (
                      <span className="flex items-center gap-1">
                        in/ <a href={`https://${resume.personal.linkedin}`} target="_blank" rel="noreferrer" className="hover:underline text-slate-700 font-semibold">{resume.personal.linkedin}</a>
                      </span>
                    )}
                  </div>
                </div>

                {resume.summary && (
                  <div className="space-y-2">
                    <h3 className="text-xs font-bold text-slate-900 uppercase tracking-widest border-l-2 border-indigo-500 pl-2">Professional Summary</h3>
                    <p className="text-xs text-slate-600 leading-relaxed text-justify">{resume.summary}</p>
                  </div>
                )}

                {resume.work.length > 0 && (
                  <div className="space-y-3">
                    <h3 className="text-xs font-bold text-slate-900 uppercase tracking-widest border-l-2 border-indigo-500 pl-2">Professional Experience</h3>
                    <div className="space-y-4">
                      {resume.work.map((w, index) => (
                        <div key={index} className="space-y-1">
                          <div className="flex justify-between items-baseline font-bold text-slate-950 text-xs transition">
                            <span>{w.role || "Job Position"}</span>
                            <span className="text-[10px] font-medium text-slate-400">{w.period || "Employment Duration"}</span>
                          </div>
                          <div className="text-[11px] font-semibold text-indigo-650 italic font-sans">
                            {w.company || "Company Organization"}
                          </div>
                          {w.description && (
                            <ul className="list-disc pl-4 space-y-1 mt-1 text-[11px] text-slate-600 leading-relaxed">
                              {w.description.split('\n').map((bullet, idx) => (
                                bullet.trim() && <li key={idx}>{bullet.replace(/^[-\*\u2022]\s*/, '')}</li>
                              ))}
                            </ul>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {resume.education.length > 0 && (
                  <div className="space-y-3">
                    <h3 className="text-xs font-bold text-slate-900 uppercase tracking-widest border-l-2 border-indigo-500 pl-2">Academic Credentials</h3>
                    <div className="space-y-3">
                      {resume.education.map((edu, index) => (
                        <div key={index} className="space-y-0.5">
                          <div className="flex justify-between items-baseline font-bold text-slate-950 text-xs">
                            <span>{edu.degree || "Degree Title"}</span>
                            <span className="text-[10px] font-medium text-slate-400">{edu.period || "Duration"}</span>
                          </div>
                          <div className="text-[11px] font-medium text-slate-500">
                            {edu.school || "University College Name"}
                          </div>
                          {edu.details && <p className="text-[11px] text-slate-500 italic">{edu.details}</p>}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {parsedSkills.length > 0 && (
                  <div className="space-y-2">
                    <h3 className="text-xs font-bold text-slate-900 uppercase tracking-widest border-l-2 border-indigo-500 pl-2">Expertise & Skills</h3>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {parsedSkills.map((tag, idx) => (
                        <span key={idx} className="bg-slate-50 text-slate-700 text-[10px] font-semibold border border-slate-200/80 px-2.5 py-1 rounded-md transition hover:bg-slate-100 select-none">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {resume.projects.length > 0 && (
                  <div className="space-y-3">
                    <h3 className="text-xs font-bold text-slate-900 uppercase tracking-widest border-l-2 border-indigo-500 pl-2">Key Projects</h3>
                    <div className="space-y-3">
                      {resume.projects.map((proj, idx) => (
                        <div key={idx} className="space-y-0.5">
                          <div className="flex justify-between items-baseline">
                            <span className="font-bold text-slate-900 text-xs">{proj.name || "Project Title"}</span>
                            {proj.link && (
                              <span className="text-[10px] text-indigo-600 font-medium">Link: <a href={`https://${proj.link}`} target="_blank" rel="noreferrer" className="hover:underline">{proj.link}</a></span>
                            )}
                          </div>
                          <p className="text-[11px] text-slate-600 leading-relaxed">{proj.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* 2. EXECUTIVE PILLAR DESIGN STYLE */}
            {activeTemplate === 'executive' && (
              <div className="space-y-6 select-none font-sans">
                <div className="text-center space-y-2 pb-5 border-b-2 border-slate-900">
                  <h1 className="text-4xl font-extrabold text-slate-950 tracking-wider uppercase leading-none font-sans">
                    {resume.personal.name || "YOUR NAME"}
                  </h1>
                  <h2 className="text-xs font-bold text-slate-500 tracking-widest uppercase">
                    {resume.personal.title || "TARGET EXECUTIVE TARGET"}
                  </h2>
                  <div className="flex flex-wrap justify-center gap-x-5 gap-y-1 text-slate-500 text-xs pt-1">
                    {resume.personal.email && <span>✉ {resume.personal.email}</span>}
                    {resume.personal.phone && <span>📞 {resume.personal.phone}</span>}
                    {resume.personal.location && <span>📍 {resume.personal.location}</span>}
                    {resume.personal.website && <span>🔗 <a href={resume.personal.website} className="underline text-slate-700 font-bold">{resume.personal.website.replace(/^https?:\/\//, '')}</a></span>}
                    {resume.personal.linkedin && <span>in/ <a href={`https://${resume.personal.linkedin}`} className="underline text-slate-700 font-bold">{resume.personal.linkedin}</a></span>}
                  </div>
                </div>

                {resume.summary && (
                  <div className="space-y-1">
                    <h3 className="text-xs font-extrabold text-slate-950 uppercase tracking-widest text-center">Executive Brief</h3>
                    <hr className="border-slate-200 mt-1 mb-2" />
                    <p className="text-xs text-slate-600 leading-relaxed text-center italic">{resume.summary}</p>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pt-2">
                  <div className="md:col-span-8 space-y-4 border-r border-slate-100 pr-5">
                    {resume.work.length > 0 && (
                      <div className="space-y-3">
                        <h3 className="text-xs font-extrabold text-slate-950 uppercase tracking-widest">Chronological Experience</h3>
                        <hr className="border-slate-900/60 pb-1" />
                        <div className="space-y-4">
                          {resume.work.map((w, index) => (
                            <div key={index} className="space-y-1">
                              <div className="flex justify-between font-bold text-slate-950 text-xs">
                                <span>{w.role}</span>
                                <span className="text-[10px] text-slate-400 font-semibold">{w.period}</span>
                              </div>
                              <div className="text-[10px] font-bold text-slate-600 uppercase tracking-wider">{w.company}</div>
                              {w.description && (
                                <ul className="list-disc pl-4 space-y-1 text-[11px] text-slate-600 leading-relaxed mt-1">
                                  {w.description.split('\n').map((bullet, idx) => (
                                    bullet.trim() && <li key={idx}>{bullet.replace(/^[-\*\u2022]\s*/, '')}</li>
                                  ))}
                                </ul>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="md:col-span-4 space-y-5">
                    {parsedSkills.length > 0 && (
                      <div className="space-y-2">
                        <h3 className="text-xs font-extrabold text-slate-950 uppercase tracking-widest">Expertise Matrix</h3>
                        <p className="text-[10px] text-slate-400 leading-none">Core capabilities: </p>
                        <hr className="border-slate-900/60" />
                        <div className="flex flex-wrap gap-1">
                          {parsedSkills.map((tag, idx) => (
                            <span key={idx} className="bg-slate-100 text-slate-800 text-[9px] font-bold tracking-tight px-2 py-0.5 border border-slate-200">
                              {tag.toUpperCase()}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {resume.education.length > 0 && (
                      <div className="space-y-2">
                        <h3 className="text-xs font-extrabold text-slate-950 uppercase tracking-widest">Education</h3>
                        <hr className="border-slate-900/60" />
                        <div className="space-y-3">
                          {resume.education.map((edu, idx) => (
                            <div key={idx} className="text-[11px] leading-relaxed">
                              <p className="font-bold text-slate-900">{edu.degree}</p>
                              <p className="text-slate-500 font-medium text-[10px]">{edu.school}</p>
                              <p className="text-slate-400 text-[9px]">{edu.period}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* 3. TECH / DEVELOPER MONO DESIGN STYLE */}
            {activeTemplate === 'tech_mono' && (
              <div className="space-y-5 font-mono">
                <div className="border-b-2 border-black pb-3">
                  <h1 className="text-2xl font-bold tracking-tight text-black leading-none uppercase font-mono">
                    {resume.personal.name || "YOUR_NAME.TS"}
                  </h1>
                  <h2 className="text-xs font-semibold text-slate-700 font-mono mt-1">
                    &gt;_ {resume.personal.title || "TARGET_DISCIPLINE_TITLE"}
                  </h2>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-1 gap-x-4 mt-3 text-slate-600 text-[10px] font-mono border-t border-dashed border-slate-300 pt-2">
                    {resume.personal.email && <span>[email] {resume.personal.email}</span>}
                    {resume.personal.phone && <span>[phone] {resume.personal.phone}</span>}
                    {resume.personal.location && <span>[locat] {resume.personal.location}</span>}
                    {resume.personal.website && <span>[webpy] <a href={resume.personal.website} className="underline text-black font-semibold">{resume.personal.website.replace(/^https?:\/\//, '')}</a></span>}
                    {resume.personal.linkedin && <span>[linkd] <a href={`https://${resume.personal.linkedin}`} className="underline text-black font-semibold">{resume.personal.linkedin}</a></span>}
                  </div>
                </div>

                {resume.summary && (
                  <div className="space-y-1">
                    <h3 className="text-xs font-bold text-black font-mono"># 01 // PROFESSIONAL_SUMMARY:</h3>
                    <p className="text-[11px] text-slate-600 leading-relaxed text-justify pl-4 border-l border-indigo-400">{resume.summary}</p>
                  </div>
                )}

                {resume.work.length > 0 && (
                  <div className="space-y-3">
                    <h3 className="text-xs font-bold text-black font-mono"># 02 // RELEVANT_CHRONICLES:</h3>
                    <div className="space-y-3 pl-2">
                      {resume.work.map((w, index) => (
                        <div key={index} className="space-y-1 border-l-2 border-slate-900 pl-3">
                          <div className="flex justify-between items-baseline font-bold text-slate-900 text-xs">
                            <span>{`[${w.company.toUpperCase()}] ${w.role}`}</span>
                            <span className="text-[9px] text-slate-400 font-semibold">{w.period}</span>
                          </div>
                          {w.description && (
                            <ul className="list-disc pl-4 space-y-0.5 text-[10.5px] text-slate-600 leading-relaxed font-mono">
                              {w.description.split('\n').map((bullet, idx) => (
                                bullet.trim() && <li key={idx}>{bullet.replace(/^[-\*\u2022]\s*/, '')}</li>
                              ))}
                            </ul>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {parsedSkills.length > 0 && (
                  <div className="space-y-2">
                    <h3 className="text-xs font-bold text-black font-mono"># 03 // TECH_STACK_MATRIX:</h3>
                    <div className="flex flex-wrap gap-1 pl-4">
                      {parsedSkills.map((tag, idx) => (
                        <span key={idx} className="bg-white text-slate-800 text-[10px] font-bold border border-black px-2 py-0.5 select-none font-mono">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {resume.education.length > 0 && (
                  <div className="space-y-2">
                    <h3 className="text-xs font-bold text-black font-mono"># 04 // ACADEMICS:</h3>
                    <div className="space-y-2 pl-4">
                      {resume.education.map((edu, idx) => (
                        <div key={idx} className="text-[11px] font-mono leading-relaxed">
                          <p className="font-bold text-black">&gt;&gt; {edu.degree}</p>
                          <p className="text-slate-500">{edu.school} | {edu.period}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* 4. CLASSIC SERIF (GEORGIA ACCENTED) */}
            {activeTemplate === 'classic_serif' && (
              <div className="space-y-6 font-serif" style={{ fontFamily: 'Georgia, serif' }}>
                <div className="text-center space-y-2 pb-4 border-b border-slate-300">
                  <h1 className="text-3xl font-normal text-slate-950 font-serif leading-none">
                    {resume.personal.name || "Your Full Name"}
                  </h1>
                  <h2 className="text-xs italic text-slate-500 font-serif tracking-wide">
                    {resume.personal.title || "Target Vibe Title"}
                  </h2>
                  <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-slate-500 text-xs font-serif" style={{ fontFamily: 'Georgia, serif' }}>
                    {resume.personal.email && <span>{resume.personal.email}</span>}
                    {resume.personal.phone && <span>{resume.personal.phone}</span>}
                    {resume.personal.location && <span>{resume.personal.location}</span>}
                    {resume.personal.website && <span><a href={resume.personal.website} className="underline text-slate-700">{resume.personal.website.replace(/^https?:\/\//, '')}</a></span>}
                    {resume.personal.linkedin && <span><a href={`https://${resume.personal.linkedin}`} className="underline text-slate-700">{resume.personal.linkedin}</a></span>}
                  </div>
                </div>

                {resume.summary && (
                  <div className="space-y-1 font-serif">
                    <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-widest text-center italic border-b border-slate-100 pb-1">Summary</h3>
                    <p className="text-xs text-slate-700 leading-relaxed text-justify italic px-4">{resume.summary}</p>
                  </div>
                )}

                {resume.work.length > 0 && (
                  <div className="space-y-3 font-serif">
                    <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-widest text-center italic border-b border-slate-100 pb-1">Professional Commitments</h3>
                    <div className="space-y-4 font-serif">
                      {resume.work.map((w, index) => (
                        <div key={index} className="space-y-1">
                          <div className="flex justify-between items-baseline font-bold text-slate-950 text-xs font-serif">
                            <span>{w.role}</span>
                            <span className="text-[10px] font-normal italic text-slate-500">{w.period}</span>
                          </div>
                          <div className="text-[11px] font-semibold text-slate-600 italic">
                            {w.company}
                          </div>
                          {w.description && (
                            <ul className="list-disc pl-4 space-y-1 mt-1 text-[11.5px] text-slate-600 leading-relaxed font-serif">
                              {w.description.split('\n').map((bullet, idx) => (
                                bullet.trim() && <li key={idx}>{bullet.replace(/^[-\*\u2022]\s*/, '')}</li>
                              ))}
                            </ul>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {resume.education.length > 0 && (
                  <div className="space-y-3 font-serif">
                    <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-widest text-center italic border-b border-slate-100 pb-1">Academic Preparation</h3>
                    <div className="space-y-3 font-serif">
                      {resume.education.map((edu, index) => (
                        <div key={index} className="space-y-0.5 font-serif">
                          <div className="flex justify-between items-baseline font-bold text-slate-950 text-xs font-serif">
                            <span>{edu.degree}</span>
                            <span className="text-[10px] font-normal italic text-slate-500">{edu.period}</span>
                          </div>
                          <div className="text-[11.5px] text-slate-500 font-serif">
                            {edu.school} {edu.details ? `— ${edu.details}` : ''}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {parsedSkills.length > 0 && (
                  <div className="space-y-2 font-serif">
                    <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-widest text-center italic border-b border-slate-100 pb-1">Acquired Expertise</h3>
                    <p className="text-xs text-stone-800 text-center leading-relaxed font-serif italic pt-1">
                      {resume.skills}
                    </p>
                  </div>
                )}
              </div>
            )}
            
            {/* Subtle interactive helper inside preview frame (will be blocked from printed layouts) */}
            <div className="absolute bottom-3 right-4 hidden-print text-[8px] font-mono text-slate-300 pointer-events-none select-none">
              Perfect-Ratio ATS Print Preview [Selected: {activeTemplate.replace('_', ' ').toUpperCase()}]
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
