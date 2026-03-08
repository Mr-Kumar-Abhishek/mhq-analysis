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
        this.checkResume();
        this.initPWAUpdate();
    },

    bindEvents() {
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
            } else if (id === 'clear-data-btn') {
                this.handleClearData();
            }
        });

        document.addEventListener('change', (e) => {
            if (e.target.name && e.target.name.startsWith('q-')) {
                const btn = document.getElementById('next-question');
                if (btn) btn.disabled = false;
            }
        });
    },

    checkResume() {
        const temp = Storage.getTemp();
        if (temp) {
            if (confirm('You have an unfinished assessment. Would you like to resume?')) {
                Assessment.startNew(temp);
                this.renderCurrentQuestion();
                return;
            } else {
                Storage.clearTemp();
            }
        }
        this.renderInitialView();
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
        const progress = ((Assessment.state.currentStep) / Assessment.QUESTIONS.length) * 100;
        UI.renderQuestion(question, progress);
    },

    handleNextQuestion() {
        const question = Assessment.getCurrentQuestion();
        const selectedRadio = document.querySelector(`input[name="q-${question.id}"]:checked`);

        if (selectedRadio) {
            Assessment.recordResponse(question.id, selectedRadio.value, (state) => {
                Storage.saveTemp(state); // Save progress (FR-1.2)
            });

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

    handleClearData() {
        if (confirm('Are you sure you want to clear all assessment history? This cannot be undone.')) {
            Storage.clearAll();
            this.renderInitialView();
        }
    },

    renderHistory() {
        const history = Storage.getAssessments();
        UI.elements.main.innerHTML = `
            <section class="view">
                <div class="header-row">
                    <h2>Assessment History</h2>
                    ${history.length > 0 ? '<button id="clear-data-btn" class="text-btn">Clear All</button>' : ''}
                </div>
                <div class="history-list full">
                    ${history.reverse().map(h => `
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
                    ${history.length === 0 ? '<p>No assessments recorded yet.</p>' : ''}
                </div>
            </section>
        `;
        UI._updateNav('btn-history');
    },

    initPWAUpdate() {
        // Simple update detection (FR-3.3)
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.ready.then(registration => {
                registration.addEventListener('updatefound', () => {
                    const newWorker = registration.installing;
                    newWorker.addEventListener('statechange', () => {
                        if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                            if (confirm('New version available! Reload to update?')) {
                                window.location.reload();
                            }
                        }
                    });
                });
            });
        }
    }
};

// Start the App
App.init();
