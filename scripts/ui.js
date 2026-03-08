/**
 * UI Module - MHQ Analysis PWA
 * Handles DOM manipulation, view rendering, and SVG visualization.
 */

export const UI = {
    elements: {
        main: document.getElementById('main-content'),
        navBtns: document.querySelectorAll('.nav-btn')
    },

    /**
     * Renders the Home View.
     */
    renderHome(history = []) {
        let historyHTML = history.length > 0
            ? history.slice(-3).reverse().map(h => `
                <div class="history-item glass-bg">
                    <span>${new Date(h.timestamp).toLocaleDateString()}</span>
                    <span class="badge">${h.scores.category}</span>
                    <strong>${h.scores.overall}</strong>
                </div>
            `).join('')
            : '<p>No past assessments found.</p>';

        this.elements.main.innerHTML = `
            <section id="home-view" class="view">
                <div class="hero">
                    <h2>Your Mental Health<br><span>Quotient</span></h2>
                    <p>Standardized assessment based on 6 core dimensions of wellbeing.</p>
                </div>
                
                <div class="action-card glass-bg">
                    <h3>New Assessment</h3>
                    <p>Take a 15-minute survey to evaluate your current mental state across 47 items.</p>
                    <button id="start-assessment" class="primary-btn">Start Now</button>
                </div>

                <div class="history-preview">
                    <div class="header-row">
                        <h3>Recent Activity</h3>
                        ${history.length > 0 ? '<button id="clear-data-btn" class="text-btn">Clear All</button>' : ''}
                    </div>
                    <div class="history-list">${historyHTML}</div>
                </div>
            </section>
        `;
        this._updateNav('btn-home');
    },

    /**
     * Renders a single assessment question.
     */
    renderQuestion(question, progress) {
        this.elements.main.innerHTML = `
            <section id="assessment-view" class="view">
                <div class="progress-container">
                    <div class="progress-bar" style="width: ${progress}%"></div>
                </div>
                
                <div class="question-card glass-bg">
                    <span class="dimension-tag">${question.dimension}</span>
                    <h2 class="question-text">${question.text}</h2>
                    
                    <div class="rating-scale">
                        <span>${question.type === 'PROBLEM' ? 'Not at all' : 'At my worst'}</span>
                        <div class="radios">
                            ${[1, 2, 3, 4, 5, 6, 7, 8, 9].map(v => `
                                <input type="radio" name="q-${question.id}" value="${v}" id="r-${v}">
                                <label for="r-${v}">${v}</label>
                            `).join('')}
                        </div>
                        <span>${question.type === 'PROBLEM' ? 'Extremely' : 'At my best'}</span>
                    </div>

                    <div class="controls">
                        <button id="next-question" class="primary-btn" disabled>Next Question</button>
                    </div>
                </div>
            </section>
        `;
        this._updateNav('btn-assess');
    },

    /**
     * Renders the Assessment Results with a Radar Chart.
     */
    renderResults(scores) {
        this.elements.main.innerHTML = `
            <section id="results-view" class="view">
                <div class="result-header">
                    <h2>Assessment Complete</h2>
                    <div class="overall-score">${scores.overall}</div>
                    <span class="category-badge">${scores.category}</span>
                </div>

                <div class="viz-container glass-bg">
                    <h3>Wellness Matrix</h3>
                    <div id="radar-chart">${this._generateRadarSVG(scores.dimensions)}</div>
                </div>

                <div class="dimension-grid">
                    ${Object.entries(scores.dimensions).map(([dim, val]) => `
                        <div class="dim-card glass-bg">
                            <h4>${dim}</h4>
                            <div class="dim-score ${val < 0 ? 'neg' : 'pos'}">${val}</div>
                        </div>
                    `).join('')}
                </div>

                <div class="controls central">
                    <button id="finish-assessment" class="primary-btn">Back to Home</button>
                </div>
            </section>
        `;
    },

    /**
     * Generates an SVG Radar Chart.
     */
    _generateRadarSVG(dimensions) {
        const size = 300;
        const center = size / 2;
        const radius = (size / 2) - 40;
        const keys = Object.keys(dimensions);
        const angleStep = (Math.PI * 2) / keys.length;

        // Scale: -50 to 100 -> 0 to 1
        const getPoint = (val, i) => {
            const normalized = Math.max(0, (val + 50) / 150);
            const r = normalized * radius;
            const angle = i * angleStep - Math.PI / 2;
            return {
                x: center + r * Math.cos(angle),
                y: center + r * Math.sin(angle)
            };
        };

        const points = keys.map((k, i) => getPoint(dimensions[k], i));
        const polyPoints = points.map(p => `${p.x},${p.y}`).join(' ');

        // Background circles
        const circles = [0.33, 0.66, 1].map(scale => `
            <circle cx="${center}" cy="${center}" r="${radius * scale}" fill="none" stroke="rgba(255,255,255,0.05)" stroke-width="1" />
        `).join('');

        // Axis lines
        const axes = keys.map((_, i) => {
            const p = getPoint(100, i);
            return `<line x1="${center}" y1="${center}" x2="${p.x}" y2="${p.y}" stroke="rgba(255,255,255,0.05)" stroke-width="1" />`;
        }).join('');

        return `
            <svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
                ${circles}
                ${axes}
                <polygon points="${polyPoints}" fill="rgba(59, 130, 246, 0.3)" stroke="var(--primary)" stroke-width="2" />
                ${points.map((p, i) => `<circle cx="${p.x}" cy="${p.y}" r="3" fill="var(--primary)" />`).join('')}
            </svg>
        `;
    },

    _updateNav(activeId) {
        this.elements.navBtns.forEach(btn => {
            btn.classList.toggle('active', btn.id === activeId);
        });
    }
};
