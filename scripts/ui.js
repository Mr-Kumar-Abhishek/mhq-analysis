/**
 * UI Module - MHQ Analysis PWA
 * Handles DOM manipulation and view rendering.
 */

export const UI = {
    elements: {
        main: document.getElementById('main-content'),
        navBtns: document.querySelectorAll('.nav-btn')
    },

    /**
     * Renders the Home View.
     * @param {Array} history - List of past assessments.
     */
    renderHome(history = []) {
        let historyHTML = history.length > 0
            ? history.slice(-3).reverse().map(h => `
                <div class="history-item">
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
                    <p>Take a 10-minute survey to evaluate your current mental state.</p>
                    <button id="start-assessment" class="primary-btn">Start Now</button>
                </div>

                <div class="history-preview">
                    <h3>Recent Activity</h3>
                    <div class="history-list">${historyHTML}</div>
                </div>
            </section>
        `;
        this._updateNav('btn-home');
    },

    /**
     * Renders a single assessment question.
     * @param {Object} question - { id, text, dimension }
     * @param {number} progress - Percentage (0-100)
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
                        <span>Not at all</span>
                        <div class="radios">
                            ${[1, 2, 3, 4, 5, 6, 7, 8, 9].map(v => `
                                <input type="radio" name="q-${question.id}" value="${v}" id="r-${v}">
                                <label for="r-${v}">${v}</label>
                            `).join('')}
                        </div>
                        <span>Extremely</span>
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
     * Renders the Assessment Results.
     * @param {Object} scores - { overall, dimensions, category }
     */
    renderResults(scores) {
        this.elements.main.innerHTML = `
            <section id="results-view" class="view">
                <div class="result-header">
                    <h2>Assessment Complete</h2>
                    <p>Your MHQ Score is:</p>
                    <div class="overall-score">${scores.overall}</div>
                    <span class="category-badge">${scores.category}</span>
                </div>

                <div class="dimension-grid">
                    ${Object.entries(scores.dimensions).map(([dim, val]) => `
                        <div class="dim-card glass-bg">
                            <h4>${dim}</h4>
                            <div class="dim-score">${val}</div>
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
     * Updates the active navigation button.
     */
    _updateNav(activeId) {
        this.elements.navBtns.forEach(btn => {
            btn.classList.toggle('active', btn.id === activeId);
        });
    }
};
