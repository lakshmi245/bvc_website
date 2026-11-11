(() => {
    'use strict';

    /* ==========================================================
       DATA  -  edit this section to change content
       ========================================================== */

    const ROLL_COUNT = 71;

    const YEARS = [
        { n: 1, label: 'First Year',  sub: 'Starting the engineering journey', icon: '🌱', hue: 320 },
        { n: 2, label: 'Second Year', sub: 'Building core foundations', icon: '📘', hue: 30 },
        { n: 3, label: 'Third Year',  sub: 'Specialising and exploring', icon: '🧭', hue: 215 },
        { n: 4, label: 'Fourth Year', sub: 'Projects and placements',    icon: '🚀', hue: 160 }
    ];

    const DEPARTMENTS = [
        { id: 'civil',  name: 'Civil Engineering',                                  short: 'Civil',  icon: '🏗️', hue: 30,  branches: ['Civil'] },
        { id: 'eee',    name: 'Electrical and Electronics Engineering (EEE)',       short: 'EEE',    icon: '⚡',  hue: 50,  branches: ['EEE'] },
        { id: 'ece',    name: 'Electronics and Communication Engineering (ECE)',    short: 'ECE',    icon: '📡', hue: 175, branches: ['ECE'] },
        { id: 'cse',    name: 'Computer Science and Engineering (CSE)',             short: 'CSE',    icon: '💻', hue: 215, branches: ['CSE'] },
        { id: 'allied', name: 'Allied Department',                                  short: 'Allied', icon: '🎓', hue: 275, branches: ['CAD', 'AML', 'CSM'] }
    ];

    /* Resume download button on the profile (data lives in resume.js). */
    const RESUME = window.BVC_RESUME || null;

    /* Key format:  department | branch | year | roll number
       Content below comes from Lakshmi's resume. */
    const PROFILES = {
        'allied|CAD|3|28': {
            name: 'Lakshmi KOTHA',
            initials: 'LK',
            cgpa: 8.53,
            github: 'https://github.com/lakshmi245',
            location: 'Amalapuram, Andhra Pradesh',
            roles: ['B.Tech Student · AI & Data Science', 'Data Analysis with Python', 'Full Stack Web Developer in the making'],
            intro: [
                'Hello everyone! My name is <strong>Lakshmi KOTHA</strong>. I am a B.Tech Computer Science and Engineering (AI &amp; Data Science) student at <strong>Bonam Venkata Chalamayya Engineering College, Odalarevu</strong>, in my third year with a current CGPA of 8.53. My roll number is 28.',
                'I have a strong foundation in Python, Java, SQL and data analysis, and I like building projects across the full software development life cycle. My work so far includes an EV adoption analytics dashboard, a student productivity app and a payroll management system.',
                'I completed a Full Stack Web Development internship with Future Interns (Jul–Aug 2026) and I am currently learning Java full stack development. I am looking for a technology internship where I can apply logical and analytical thinking, communicate technical ideas clearly and contribute to a professional team.',
                'I speak Telugu and English, and I am based in Amalapuram, Andhra Pradesh.'
            ],
            skills: [
                { group: 'Programming', items: ['Python', 'Java (learning)', 'SQL (basic)'] },
                { group: 'Web', items: ['HTML5', 'CSS3', 'JavaScript'] },
                { group: 'Data analysis', items: ['Data Analysis', 'Data Handling', 'Data Visualization', 'Forecasting'] },
                { group: 'Software engineering', items: ['SDLC', 'Problem Solving', 'Debugging', 'Git / GitHub'] },
                { group: 'Concepts', items: ['AI & Data Science (basic)', 'Sensor-based data collection'] },
                { group: 'Soft skills', items: ['Logical & analytical thinking', 'Written & spoken English', 'Technical communication', 'Teamwork'] },
                { group: 'Tools', items: ['MS Office (basic)'] }
            ],
            projects: [
                {
                    title: 'EV Adoption Analysis – Global Intelligence Dashboard',
                    tech: 'Python · Data Analysis · Web Visualization',
                    points: [
                        'Analyzed 70 records across 10 countries (2018–2024) to track EV sales, market share and CO₂ savings.',
                        'Built an interactive dashboard visualizing 15M EV sales, 37.3% market share and 87.4M tonnes of CO₂ saved.',
                        'Implemented forecasting to project EV adoption trends up to 2030.'
                    ]
                },
                {
                    title: 'StudySync – Student Productivity App',
                    tech: 'HTML · CSS · JavaScript · LocalStorage',
                    points: [
                        'Developed a frontend study app with a dashboard, timetable, tasks and Pomodoro/focus timers.',
                        'Built gamification (coins, XP, levels, streaks) with LocalStorage data persistence.',
                        'Designed animated progress bars and a distraction-free focus mode.'
                    ]
                },
                {
                    title: 'Employee Payroll Management System',
                    tech: 'Payroll automation',
                    points: [
                        'Developed a payroll system to automate salary calculation, deductions (PF, ESI, TDS) and payslips.',
                        'Managed employee data (attendance, leave, salary) with accurate net pay calculation.',
                        'Generated monthly payroll reports ensuring statutory compliance.'
                    ]
                }
            ],
            experience: [
                { title: 'Full Stack Web Development Intern', place: 'Future Interns', when: 'Jul–Aug 2026', text: 'Practical exposure to full-stack web technologies and the software development life cycle.' },
                { title: 'Java Full Stack Course', place: 'Frontlines Edu Media', when: '6 months, ongoing', text: 'Learning Java and full-stack development concepts through a structured course.' },
                { title: 'Data Analysis Using Python', place: 'APSSDC', when: 'Jul 2026', text: 'Practical training in data handling and analysis using Python.' },
                { title: 'Python with AI', place: 'Training', when: '', text: 'Python programming with Artificial Intelligence concepts.' }
            ],
            certifications: [
                'GenAI Powered Data Analytics – Deloitte (Aug 2026)',
                'Data Analytics Job Simulation – Deloitte (Aug 2026)',
                'Data Visualisation: Effective Insights – Forage (Sep 2026)'
            ],
            education: [
                { title: 'B.Tech, Computer Science and Engineering (AI & Data Science)', place: 'BVC Engineering College, Odalarevu (JNTU Kakinada)', when: '2024 – 2028', text: 'Current CGPA 8.53' },
                { title: 'Intermediate', place: 'Sri Chaitanya Junior College', when: '2022 – 2024', text: 'Percentage 87.8%' },
                { title: '10th Standard', place: 'Mother Teresa Primary & High School', when: '2022', text: 'Marks 534' }
            ]
        }
    };

    /* ==========================================================
       HELPERS
       ========================================================== */

    const $ = (sel, root = document) => root.querySelector(sel);
    const lightQuery = window.matchMedia('(prefers-color-scheme: light)');
    const effectiveTheme = () => document.documentElement.dataset.theme || (lightQuery.matches ? 'light' : 'dark');
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const esc = (s) => String(s).replace(/[&<>"']/g, (c) => (
        { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]
    ));

    const deptById = (id) => DEPARTMENTS.find((d) => d.id === id) || null;
    const profileKey = (d, b, y, n) => `${d}|${b}|${y}|${n}`;
    const hasProfile = (d, b, y, n) => Boolean(PROFILES[profileKey(d, b, y, n)]);

    const stage = $('#stage');
    const stepper = $('#stepper');

    let currentPath = [];
    let typingTimer = null;
    const rollState = { q: '', filter: 'all' };

    /* ==========================================================
       ROUTING  (hash based:  #dept-branch-year-roll, e.g. #allied-CAD-3-28)
       ========================================================== */

    function readPath() {
        let raw = '';
        try { raw = decodeURIComponent(location.hash.replace(/^#/, '')); } catch (err) { raw = ''; }
        const parts = raw ? raw.split('-') : [];
        const out = [];

        const dept = deptById(parts[0]);
        if (!dept) return out;
        out.push(dept.id);

        const branch = dept.branches.length === 1
            ? dept.branches[0]
            : dept.branches.find((b) => b === parts[1]);
        if (!branch) return out;
        out.push(branch);

        const year = Number(parts[2]);
        if (!YEARS.some((y) => y.n === year)) return out;
        out.push(year);

        const roll = Number(parts[3]);
        if (!Number.isInteger(roll) || roll < 1 || roll > ROLL_COUNT) return out;
        out.push(roll);

        return out;
    }

    function normalize(path) {
        if (path.length === 1) {
            const d = deptById(path[0]);
            if (d && d.branches.length === 1) return [];
        }
        return path;
    }

    function setPath(path) {
        const hash = '#' + (path.length ? path.join('-') : 'home');
        if (location.hash === hash) render();
        else location.hash = hash;
    }

    const goBack = () => setPath(normalize(currentPath.slice(0, -1)));

    /* ==========================================================
       VIEW BUILDERS
       ========================================================== */

    function head(title, sub, withBack = true) {
        return `
            <div class="view-head">
                ${withBack ? '<button type="button" class="btn ghost" data-action="back">← Back</button>' : ''}
                <h2 tabindex="-1">${title}</h2>
                <p>${sub}</p>
            </div>`;
    }

    function deptView() {
        const branchTotal = DEPARTMENTS.reduce((sum, d) => sum + d.branches.length, 0);
        const stats = [
            { v: DEPARTMENTS.length, l: 'Departments' },
            { v: branchTotal, l: 'Branches' },
            { v: YEARS.length, l: 'Academic years' },
            { v: ROLL_COUNT, l: 'Roll numbers per class' }
        ].map((s, i) => `
            <div class="stat" style="--i:${i}">
                <b data-count="${s.v}">0</b><span>${s.l}</span>
            </div>`).join('');

        const cards = DEPARTMENTS.map((d, i) => `
            <button type="button" class="card tilt" data-action="dept" data-id="${d.id}"
                    style="--hue:${d.hue};--i:${i}">
                <span class="icon" aria-hidden="true">${d.icon}</span>
                <span class="card-title">${esc(d.name)}</span>
                <span class="card-sub">${d.branches.length > 1 ? d.branches.length + ' branches inside' : 'Single branch'} &middot; tap to explore</span>
                <span class="arrow" aria-hidden="true">→</span>
            </button>`).join('');

        return `
            <section class="view" data-view="dept">
                <div class="view-head">
                    <h2 tabindex="-1"><span class="gradient-text">Welcome to Our College</span></h2>
                    <p>Select a department to explore its branches, academic years and student introductions.</p>
                </div>
                <div class="stats">${stats}</div>
                <div class="grid grid-dept">${cards}</div>
            </section>`;
    }

    function branchView(path) {
        const dept = deptById(path[0]);
        const cards = dept.branches.map((b, i) => `
            <button type="button" class="card tilt" data-action="branch" data-branch="${esc(b)}"
                    style="--hue:${(dept.hue + i * 55) % 360};--i:${i}">
                <span class="big-letter" aria-hidden="true">${esc(b)}</span>
                <span class="card-title">${esc(b)} Branch</span>
                <span class="card-sub">${esc(dept.short)} department</span>
                <span class="arrow" aria-hidden="true">→</span>
            </button>`).join('');

        return `
            <section class="view" data-view="branch">
                ${head(esc(dept.short) + ' Branches', 'Select your branch.')}
                <div class="grid grid-branch">${cards}</div>
            </section>`;
    }

    function yearView(path) {
        const cards = YEARS.map((y, i) => `
            <button type="button" class="card tilt" data-action="year" data-year="${y.n}"
                    style="--hue:${y.hue};--i:${i}">
                <span class="icon" aria-hidden="true">${y.icon}</span>
                <span class="card-title">${y.label}</span>
                <span class="card-sub">${y.sub}</span>
                <span class="arrow" aria-hidden="true">→</span>
            </button>`).join('');

        return `
            <section class="view" data-view="year">
                ${head(esc(path[1]) + ' &mdash; Select Academic Year', 'Choose your year of study.')}
                <div class="grid grid-year">${cards}</div>
            </section>`;
    }

    function rollView(path) {
        return `
            <section class="view" data-view="roll">
                ${head('Student Roll Numbers', `${esc(path[1])} &middot; Year ${path[2]} &mdash; select a roll number. Glowing ones have a published introduction.`)}
                <div class="toolbar">
                    <label class="search">
                        <span class="sr-only">Search roll number</span>
                        <input id="rollSearch" type="search" inputmode="numeric" autocomplete="off"
                               placeholder="Search or jump to a roll number…">
                    </label>
                    <div class="chips" role="group" aria-label="Filter roll numbers">
                        <button type="button" class="chip is-on" data-action="filter" data-filter="all" aria-pressed="true">All</button>
                        <button type="button" class="chip" data-action="filter" data-filter="available" aria-pressed="false">Has profile ★</button>
                    </div>
                </div>
                <p class="count" id="rollCount"></p>
                <div class="grid grid-roll" id="rollGrid"></div>
            </section>`;
    }

    function renderRolls() {
        const grid = $('#rollGrid');
        if (!grid) return;
        const [d, b, y] = currentPath;
        const items = [];

        for (let n = 1; n <= ROLL_COUNT; n++) {
            const has = hasProfile(d, b, y, n);
            if (rollState.filter === 'available' && !has) continue;
            if (rollState.q && !String(n).includes(rollState.q)) continue;
            items.push(`
                <button type="button" class="roll${has ? ' has-profile' : ''}" data-action="roll" data-n="${n}"
                        style="--i:${Math.min(n, 40)}"
                        aria-label="Roll number ${n}${has ? ', introduction available' : ''}">
                    <span class="n">${n}</span><small>Roll No.</small>${has ? '<em aria-hidden="true">★</em>' : ''}
                </button>`);
        }

        grid.innerHTML = items.length
            ? items.join('')
            : '<p class="empty">No roll numbers match your search. Try another number.</p>';
        $('#rollCount').textContent = `Showing ${items.length} of ${ROLL_COUNT} roll numbers`;
    }

    function profileView(path) {
        const key = profileKey(...path);
        const p = PROFILES[key];
        const dept = deptById(path[0]);

        if (!p) {
            return `
                <section class="view" data-view="profile-empty">
                    ${head('No introduction yet', `Roll number ${path[3]} does not have a published introduction.`)}
                    <div class="actions"><button type="button" class="btn" data-action="back">Back to roll numbers</button></div>
                </section>`;
        }

        const stats = [
            { v: p.cgpa, l: 'Current CGPA', dec: 2 },
            { v: p.projects.length, l: 'Projects built', dec: 0 },
            { v: p.certifications.length, l: 'Certifications', dec: 0 },
            { v: path[3], l: 'Roll number', dec: 0 }
        ].map((s, i) => `
            <div class="stat" style="--i:${i}"><b data-count="${s.v}" data-dec="${s.dec}">0</b><span>${s.l}</span></div>`).join('');

        const tabs = [
            ['about', 'About'], ['skills', 'Skills'], ['projects', 'Projects'],
            ['experience', 'Experience'], ['education', 'Education']
        ];

        const tabButtons = tabs.map(([id, label], i) => `
            <button type="button" class="tab" role="tab" id="tab-${id}" data-action="tab" data-tab="${id}"
                    aria-controls="panel-${id}" aria-selected="${i === 0}" tabindex="${i === 0 ? 0 : -1}">${label}</button>`).join('');

        const timeline = (items) => `<ul class="timeline">${items.map((x) => `
            <li><b>${esc(x.title)}</b>
                <span>${esc(x.place)}${x.when ? ' · ' + esc(x.when) : ''}</span>
                ${x.text ? `<span>${esc(x.text)}</span>` : ''}</li>`).join('')}</ul>`;

        const about = p.intro.map((t) => `<p>${t}</p>`).join('') + `
            <p><a class="link" href="${esc(p.github)}" target="_blank" rel="noopener">github.com/lakshmi245 ↗</a></p>`;

        const skills = p.skills.map((g) => `
            <div class="skill-group">
                <h4>${esc(g.group)}</h4>
                <div class="tag-cloud">${g.items.map((i) => `<span class="pill">${esc(i)}</span>`).join('')}</div>
            </div>`).join('');

        const projects = p.projects.map((x) => `
            <div class="project">
                <h4>${esc(x.title)}</h4>
                <p class="tech">${esc(x.tech)}</p>
                <ul>${x.points.map((t) => `<li>${esc(t)}</li>`).join('')}</ul>
            </div>`).join('');

        const certs = `<ul class="plain-list">${p.certifications.map((c) => `<li>${esc(c)}</li>`).join('')}</ul>`;

        return `
            <section class="view" data-view="profile">
                <div class="view-head">
                    <button type="button" class="btn ghost" data-action="back">← Back to roll numbers</button>
                </div>

                <article class="hero">
                    <div class="avatar" aria-hidden="true"><span>${esc(p.initials)}</span></div>
                    <div class="hero-text">
                        <p class="eyebrow">Student Self-Introduction</p>
                        <h2 tabindex="-1">${esc(p.name)}</h2>
                        <p class="roles"><span id="typed"></span><i class="caret" aria-hidden="true"></i></p>
                        <ul class="meta">
                            <li>Year ${path[2]}</li>
                            <li>${esc(path[1])}</li>
                            <li>Roll No. ${path[3]}</li>
                            <li>${esc(dept.short)} Department</li>
                            <li>${esc(p.location)}</li>
                        </ul>
                    </div>
                </article>

                <div class="stats">${stats}</div>

                <div class="tabs" role="tablist" aria-label="Profile sections">${tabButtons}</div>

                <div class="panel is-active" id="panel-about" role="tabpanel" aria-labelledby="tab-about">
                    <h3>Hello Everyone!</h3>${about}
                </div>
                <div class="panel" id="panel-skills" role="tabpanel" aria-labelledby="tab-skills">
                    <h3>Skills</h3>${skills}
                </div>
                <div class="panel" id="panel-projects" role="tabpanel" aria-labelledby="tab-projects">
                    <h3>Projects</h3>${projects}
                </div>
                <div class="panel" id="panel-experience" role="tabpanel" aria-labelledby="tab-experience">
                    <h3>Internship &amp; Training</h3>${timeline(p.experience)}
                    <h3 class="sub-title">Certifications</h3>${certs}
                </div>
                <div class="panel" id="panel-education" role="tabpanel" aria-labelledby="tab-education">
                    <h3>Education</h3>${timeline(p.education)}
                </div>

                <p class="profile-end">Thank you for visiting my profile! 🎉</p>

                <div class="actions">
                    ${RESUME ? '<button type="button" class="btn" data-action="resume">⬇ Download resume (PDF)</button>' : ''}
                    <button type="button" class="btn ghost" data-action="copy">🔗 Copy link</button>
                    <button type="button" class="btn ghost" data-action="celebrate">🎊 Celebrate</button>
                </div>
            </section>`;
    }

    /* ==========================================================
       STEPPER
       ========================================================== */

    function renderStepper(path) {
        const labels = ['Department', 'Branch', 'Year', 'Roll No.', 'Profile'];
        const dept = path[0] ? deptById(path[0]) : null;
        const skipBranch = Boolean(dept && dept.branches.length === 1);
        const values = [
            dept ? dept.short : '',
            path[1] || '',
            path[2] ? `Year ${path[2]}` : '',
            path[3] ? `#${path[3]}` : '',
            ''
        ];

        stepper.innerHTML = labels.map((label, i) => {
            let cls = i < path.length ? 'done' : (i === path.length ? 'current' : 'todo');
            if (i === 1 && skipBranch && path.length > 1) cls = 'skipped';
            const symbol = cls === 'done' ? '✓' : (cls === 'skipped' ? '–' : i + 1);
            const clickable = cls === 'done';
            return `
                <li class="step ${cls}">
                    <button type="button" ${clickable ? `data-step="${i}"` : 'disabled'} ${cls === 'current' ? 'aria-current="step"' : ''}>
                        <span class="dot">${symbol}</span>
                        <span class="label"><b>${label}</b>${values[i] ? `<small>${esc(values[i])}</small>` : ''}</span>
                    </button>
                </li>`;
        }).join('');
    }

    /* ==========================================================
       RENDER
       ========================================================== */

    function render() {
        clearTimeout(typingTimer);
        currentPath = readPath();
        const path = currentPath;

        renderStepper(path);

        switch (path.length) {
            case 0: stage.innerHTML = deptView(); break;
            case 1: stage.innerHTML = branchView(path); break;
            case 2: stage.innerHTML = yearView(path); break;
            case 3:
                rollState.q = '';
                rollState.filter = 'all';
                stage.innerHTML = rollView(path);
                renderRolls();
                break;
            default: stage.innerHTML = profileView(path);
        }

        animateCounters(stage);

        if (path.length === 4 && PROFILES[profileKey(...path)]) {
            startTyping($('#typed'), PROFILES[profileKey(...path)].roles);
            confetti();
        }

        const heading = $('h2', stage);
        if (heading) heading.focus({ preventScroll: true });
        window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
    }

    /* ==========================================================
       EFFECTS
       ========================================================== */

    function animateCounters(root) {
        root.querySelectorAll('[data-count]').forEach((el) => {
            const target = Number(el.dataset.count);
            if (reduceMotion) { el.textContent = target.toFixed(Number(el.dataset.dec || 0)); return; }
            const start = performance.now();
            const duration = 1100;
            (function step(now) {
                const p = Math.min((now - start) / duration, 1);
                el.textContent = (target * (1 - Math.pow(1 - p, 3))).toFixed(Number(el.dataset.dec || 0));
                if (p < 1) requestAnimationFrame(step);
            })(start);
        });
    }

    function startTyping(el, words) {
        if (!el) return;
        if (reduceMotion) { el.textContent = words.join(' · '); return; }
        let w = 0;
        let i = 0;
        let deleting = false;
        (function tick() {
            const word = words[w];
            el.textContent = word.slice(0, i);
            if (!deleting && i < word.length) {
                i++;
                typingTimer = setTimeout(tick, 70);
            } else if (!deleting) {
                deleting = true;
                typingTimer = setTimeout(tick, 1300);
            } else if (i > 0) {
                i--;
                typingTimer = setTimeout(tick, 35);
            } else {
                deleting = false;
                w = (w + 1) % words.length;
                typingTimer = setTimeout(tick, 250);
            }
        })();
    }

    let toastTimer = null;
    function toast(message) {
        const t = $('#toast');
        t.textContent = message;
        t.classList.add('show');
        clearTimeout(toastTimer);
        toastTimer = setTimeout(() => t.classList.remove('show'), 2600);
    }

    let confettiFrame = 0;
    function confetti() {
        if (reduceMotion) return;
        const canvas = $('#fx');
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        cancelAnimationFrame(confettiFrame);

        const colors = ['#a78bfa', '#f472b6', '#22d3ee', '#fbbf24', '#34d399'];
        const pieces = Array.from({ length: 150 }, () => ({
            x: canvas.width / 2 + (Math.random() - 0.5) * 240,
            y: canvas.height * 0.35,
            vx: (Math.random() - 0.5) * 15,
            vy: -Math.random() * 14 - 4,
            g: 0.3 + Math.random() * 0.2,
            s: 5 + Math.random() * 7,
            r: Math.random() * 6.28,
            vr: (Math.random() - 0.5) * 0.4,
            c: colors[Math.floor(Math.random() * colors.length)]
        }));

        (function tick() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            let alive = 0;
            pieces.forEach((p) => {
                p.vy += p.g;
                p.vx *= 0.99;
                p.x += p.vx;
                p.y += p.vy;
                p.r += p.vr;
                if (p.y < canvas.height + 20) {
                    alive++;
                    ctx.save();
                    ctx.translate(p.x, p.y);
                    ctx.rotate(p.r);
                    ctx.fillStyle = p.c;
                    ctx.fillRect(-p.s / 2, -p.s / 2, p.s, p.s * 0.6);
                    ctx.restore();
                }
            });
            if (alive) confettiFrame = requestAnimationFrame(tick);
            else ctx.clearRect(0, 0, canvas.width, canvas.height);
        })();
    }

    function initBackground() {
        const canvas = $('#bg');
        const ctx = canvas.getContext('2d');
        const mouse = { x: -9999, y: -9999 };
        let w = 0;
        let h = 0;
        let particles = [];
        let frame = 0;

        const rgb = () => (effectiveTheme() === 'light' ? '109,40,217' : '167,139,250');

        function resize() {
            const dpr = Math.min(window.devicePixelRatio || 1, 2);
            w = window.innerWidth;
            h = window.innerHeight;
            canvas.width = w * dpr;
            canvas.height = h * dpr;
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            const count = Math.max(30, Math.min(90, Math.floor((w * h) / 16000)));
            particles = Array.from({ length: count }, () => ({
                x: Math.random() * w,
                y: Math.random() * h,
                vx: (Math.random() - 0.5) * 0.45,
                vy: (Math.random() - 0.5) * 0.45,
                r: 1 + Math.random() * 1.8
            }));
            if (reduceMotion) draw();
        }

        function draw() {
            ctx.clearRect(0, 0, w, h);
            const color = rgb();

            particles.forEach((p, i) => {
                if (!reduceMotion) {
                    p.x += p.vx;
                    p.y += p.vy;
                    if (p.x < 0 || p.x > w) p.vx *= -1;
                    if (p.y < 0 || p.y > h) p.vy *= -1;
                }

                const mdx = mouse.x - p.x;
                const mdy = mouse.y - p.y;
                const md = Math.hypot(mdx, mdy);
                if (md < 150) {
                    ctx.strokeStyle = `rgba(${color},${(1 - md / 150) * 0.55})`;
                    ctx.beginPath();
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(mouse.x, mouse.y);
                    ctx.stroke();
                    if (!reduceMotion) {
                        p.x += mdx * 0.002;
                        p.y += mdy * 0.002;
                    }
                }

                ctx.fillStyle = `rgba(${color},0.7)`;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                ctx.fill();

                for (let j = i + 1; j < particles.length; j++) {
                    const q = particles[j];
                    const d = Math.hypot(p.x - q.x, p.y - q.y);
                    if (d < 120) {
                        ctx.strokeStyle = `rgba(${color},${(1 - d / 120) * 0.25})`;
                        ctx.beginPath();
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(q.x, q.y);
                        ctx.stroke();
                    }
                }
            });
        }

        function loop() {
            draw();
            frame = requestAnimationFrame(loop);
        }

        window.addEventListener('resize', resize);
        window.addEventListener('pointermove', (e) => { mouse.x = e.clientX; mouse.y = e.clientY; });
        window.addEventListener('pointerleave', () => { mouse.x = mouse.y = -9999; });
        document.addEventListener('visibilitychange', () => {
            if (reduceMotion) return;
            if (document.hidden) cancelAnimationFrame(frame);
            else loop();
        });

        resize();
        if (!reduceMotion) loop();

        /* redraw on theme change when animation is off */
        return () => { if (reduceMotion) draw(); };
    }

    /* ==========================================================
       THEME
       ========================================================== */

    let redrawBackground = () => {};

    function syncThemeButton() {
        const dark = effectiveTheme() === 'dark';
        const btn = $('#themeToggle');
        btn.textContent = dark ? '☀️' : '🌙';
        btn.setAttribute('aria-label', dark ? 'Switch to light theme' : 'Switch to dark theme');
        redrawBackground();
    }

    function applyTheme(theme) {
        document.documentElement.dataset.theme = theme;
        syncThemeButton();
    }

    /* ==========================================================
       EVENTS
       ========================================================== */

    function switchTab(id) {
        stage.querySelectorAll('.tab').forEach((t) => {
            const on = t.dataset.tab === id;
            t.setAttribute('aria-selected', String(on));
            t.tabIndex = on ? 0 : -1;
        });
        stage.querySelectorAll('.panel').forEach((p) => {
            p.classList.toggle('is-active', p.id === 'panel-' + id);
        });
    }

    function openRoll(n, button) {
        const [d, b, y] = currentPath;
        if (hasProfile(d, b, y, n)) {
            setPath([d, b, y, n]);
            return;
        }
        toast(`No introduction published for Roll No. ${n} yet.`);
        if (button) {
            button.classList.remove('shake');
            void button.offsetWidth;
            button.classList.add('shake');
            button.addEventListener('animationend', () => button.classList.remove('shake'), { once: true });
        }
    }

    async function downloadResume() {
        if (!RESUME) return;
        const bin = atob(RESUME.base64);
        const bytes = new Uint8Array(bin.length);
        for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
        const blob = new Blob([bytes], { type: RESUME.mime || 'application/octet-stream' });

        /* Published page: the viewer's download capability (asks the viewer to confirm). */
        try {
            const dl = window.claude && window.claude.use ? await window.claude.use('downloads') : null;
            if (dl) {
                await dl.save({ filename: RESUME.filename, data: blob });
                toast('Resume saved ✔');
                return;
            }
        } catch (err) {
            if (err && err.code === 'declined') { toast('Download cancelled.'); return; }
        }

        /* Local file: normal browser download. */
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = RESUME.filename;
        document.body.appendChild(a);
        a.click();
        a.remove();
        setTimeout(() => URL.revokeObjectURL(url), 2000);
        toast('Resume download started ✔');
    }

    async function copyLink() {
        try {
            await navigator.clipboard.writeText(location.href);
            toast('Link copied to clipboard ✔');
        } catch (err) {
            toast('Could not copy automatically — copy the address bar link.');
        }
    }

    stage.addEventListener('click', (e) => {
        const el = e.target.closest('[data-action]');
        if (!el) return;

        switch (el.dataset.action) {
            case 'dept': {
                const d = deptById(el.dataset.id);
                setPath(d.branches.length === 1 ? [d.id, d.branches[0]] : [d.id]);
                break;
            }
            case 'branch': setPath([currentPath[0], el.dataset.branch]); break;
            case 'year': setPath([currentPath[0], currentPath[1], Number(el.dataset.year)]); break;
            case 'roll': openRoll(Number(el.dataset.n), el); break;
            case 'back': goBack(); break;
            case 'tab': switchTab(el.dataset.tab); break;
            case 'filter':
                rollState.filter = el.dataset.filter;
                stage.querySelectorAll('.chip').forEach((c) => {
                    const on = c === el;
                    c.classList.toggle('is-on', on);
                    c.setAttribute('aria-pressed', String(on));
                });
                renderRolls();
                break;
            case 'copy': copyLink(); break;
            case 'resume': downloadResume(); break;
            case 'celebrate': confetti(); break;
            case 'interest':
                el.classList.remove('pop');
                void el.offsetWidth;
                el.classList.add('pop');
                break;
            default: break;
        }
    });

    stage.addEventListener('input', (e) => {
        if (e.target.id !== 'rollSearch') return;
        rollState.q = e.target.value.trim();
        renderRolls();
    });

    stage.addEventListener('keydown', (e) => {
        if (e.target.id === 'rollSearch' && e.key === 'Enter') {
            const n = Number(e.target.value.trim());
            if (Number.isInteger(n) && n >= 1 && n <= ROLL_COUNT) openRoll(n);
            else toast(`Enter a roll number between 1 and ${ROLL_COUNT}.`);
        }

        if (e.target.classList.contains('tab') && (e.key === 'ArrowRight' || e.key === 'ArrowLeft')) {
            const tabs = [...stage.querySelectorAll('.tab')];
            const i = tabs.indexOf(e.target);
            const next = tabs[(i + (e.key === 'ArrowRight' ? 1 : -1) + tabs.length) % tabs.length];
            switchTab(next.dataset.tab);
            next.focus();
        }
    });

    stepper.addEventListener('click', (e) => {
        const b = e.target.closest('[data-step]');
        if (!b) return;
        setPath(normalize(currentPath.slice(0, Number(b.dataset.step))));
    });

    document.addEventListener('keydown', (e) => {
        const typing = /^(INPUT|TEXTAREA)$/.test(document.activeElement.tagName);
        if (e.key === 'Escape' && currentPath.length > 0) {
            if (typing) document.activeElement.blur();
            else goBack();
        } else if (e.key === '/' && !typing) {
            const search = $('#rollSearch');
            if (search) {
                e.preventDefault();
                search.focus();
            }
        }
    });

    /* 3D tilt on cards */
    stage.addEventListener('pointermove', (e) => {
        if (e.pointerType === 'touch' || reduceMotion) return;
        const card = e.target.closest('.tilt');
        if (!card) return;
        const r = card.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width;
        const py = (e.clientY - r.top) / r.height;
        card.style.setProperty('--ry', ((px - 0.5) * 12).toFixed(2) + 'deg');
        card.style.setProperty('--rx', ((0.5 - py) * 12).toFixed(2) + 'deg');
        card.style.setProperty('--mx', (px * 100).toFixed(1) + '%');
        card.style.setProperty('--my', (py * 100).toFixed(1) + '%');
    });

    stage.addEventListener('pointerout', (e) => {
        const card = e.target.closest('.tilt');
        if (card && !card.contains(e.relatedTarget)) {
            card.style.setProperty('--rx', '0deg');
            card.style.setProperty('--ry', '0deg');
        }
    });

    /* Ripple effect */
    document.addEventListener('pointerdown', (e) => {
        const el = e.target.closest('.card, .btn, .roll, .chip, .tab');
        if (!el || reduceMotion) return;
        const r = el.getBoundingClientRect();
        const size = Math.max(r.width, r.height);
        const ripple = document.createElement('span');
        ripple.className = 'ripple';
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = (e.clientX - r.left - size / 2) + 'px';
        ripple.style.top = (e.clientY - r.top - size / 2) + 'px';
        el.appendChild(ripple);
        ripple.addEventListener('animationend', () => ripple.remove());
    });

    /* Scroll progress bar */
    window.addEventListener('scroll', () => {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        const ratio = max > 0 ? window.scrollY / max : 0;
        $('#scrollBar').style.transform = `scaleX(${ratio})`;
    }, { passive: true });

    $('#themeToggle').addEventListener('click', () => {
        const next = effectiveTheme() === 'dark' ? 'light' : 'dark';
        applyTheme(next);
        try { localStorage.setItem('bvc-theme', next); } catch (err) { /* storage unavailable */ }
    });

    window.addEventListener('hashchange', render);

    /* ==========================================================
       START
       ========================================================== */

    redrawBackground = initBackground();

    let savedTheme = null;
    try { savedTheme = localStorage.getItem('bvc-theme'); } catch (err) { /* storage unavailable */ }
    if (savedTheme === 'light' || savedTheme === 'dark') applyTheme(savedTheme);
    else syncThemeButton();
    lightQuery.addEventListener('change', syncThemeButton);

    render();
})();
