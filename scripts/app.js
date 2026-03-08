import { Storage } from './storage.js';
import { Assessment } from './assessment.js';
import { Scoring } from './scoring.js';
import { UI } from './ui.js';

/**
 * Main Application Controller - MHQ Analysis PWA
 */
const App = {
    init() {
        console.log('MHQ Analysis PWA - Core Controller Active');
        this.bindEvents();
        this.renderInitialView();
    },

    bindEvents() {
        // Event Delegation for dynamic content
        document.addEventListener('click', (e) => {
            const id = e.target.id;

            if (id === 'btn-home' || id === 'finish-assessment') {
                this.renderInitialView();
            } else if (id === 'btn-assess' || id === 'start-assessment') {
                this.startAssessment();
            } else if (id === 'btn-history') {
                this.renderHistory();
            } else if (id === 'next-question') {
                this.handleNextQuestion();
            }
        });

        // Listen for radio changes to enable next button
        document.addEventListener('change', (e) => {
            if (e.target.name && e.target.name.startsWith('q-')) {
                const btn = document.getElementById('next-question');
                if (btn) btn.disabled = false;
            }
        });
    },

    renderInitialView() {
        const history = Storage.getAssessments();
        UI.renderHome(history);
    },

    startAssessment() {
        Assessment.startNew();
        this.renderCurrentQuestion();
    },

    renderCurrentQuestion() {
        const question = Assessment.getCurrentQuestion();
        const progress = (Assessment.state.currentStep / Assessment.QUESTIONS.length) * 100;
        UI.renderQuestion(question, progress);
    },

    handleNextQuestion() {
        const question = Assessment.getCurrentQuestion();
        const selectedRadio = document.querySelector(`input[name="q-${question.id}"]:checked`);

        if (selectedRadio) {
            Assessment.recordResponse(question.id, selectedRadio.value);

            const nextQ = Assessment.next();
            if (nextQ) {
                this.renderCurrentQuestion();
            } else {
                this.completeAssessment();
            }
        }
    },

    completeAssessment() {
        const scores = Scoring.calculate(Assessment.state.responses, Assessment.QUESTIONS);
        Storage.saveAssessment({ scores, rawResponses: Assessment.state.responses });
        UI.renderResults(scores);
    },

    renderHistory() {
        const history = Storage.getAssessments();
        // Simple history listing for now
        UI.elements.main.innerHTML = `
            <section class="view">
                <h2>Assessment History</h2>
                <div class="history-list full">
                    ${history.map(h => `
                        <div class="history-card glass-bg">
                            <div class="h-meta">
                                <strong>${new Date(h.timestamp).toLocaleString()}</strong>
                                <span class="badge">${h.scores.category}</span>
                            </div>
                            <div class="h-stats">
                                <div class="stat"><span>MHQ</span><strong>${h.scores.overall}</strong></div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </section>
        `;
        UI._updateNav('btn-history');
    }
};

// Start the App
App.init();
