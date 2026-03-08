/**
 * Assessment Module - MHQ Analysis PWA
 * Contains the full 47-item question bank and manages the assessment state.
 */

export const Assessment = {
    // 6 Dimensions of MHQ
    DIMENSIONS: {
        MOOD: 'Mood & Outlook',
        SOCIAL: 'Social Self',
        DRIVE: 'Drive & Motivation',
        COGNITION: 'Cognition',
        ADAPTABILITY: 'Adaptability & Resilience',
        MIND_BODY: 'Mind-Body Connection'
    },

    // 47 Questions (26 Spectrum, 21 Problem)
    QUESTIONS: [
        // --- Spectrum Questions (1-9 Scale) ---
        { id: 1, text: "Optimism & Hope for the future", dimension: 'MOOD' },
        { id: 2, text: "Emotional Regulation capability", dimension: 'MOOD' },
        { id: 3, text: "Stability & Calmness under pressure", dimension: 'MOOD' },
        { id: 4, text: "Self-worth & Confidence", dimension: 'SOCIAL' },
        { id: 5, text: "Empathy & Connection with others", dimension: 'SOCIAL' },
        { id: 6, text: "Social Engagement comfort", dimension: 'SOCIAL' },
        { id: 7, text: "Trust & Openness in relationships", dimension: 'SOCIAL' },
        { id: 8, text: "Motivation to Socialize", dimension: 'SOCIAL' },
        { id: 9, text: "Drive & Motivation for daily tasks", dimension: 'DRIVE' },
        { id: 10, text: "Initiative & Sense of Purpose", dimension: 'DRIVE' },
        { id: 11, text: "Self-awareness of own mental state", dimension: 'COGNITION' },
        { id: 12, text: "Attention & Focus during work", dimension: 'COGNITION' },
        { id: 13, text: "Memory & Recall efficiency", dimension: 'COGNITION' },
        { id: 14, text: "Learning & Comprehension of new info", dimension: 'COGNITION' },
        { id: 15, text: "Decision Making clarity", dimension: 'COGNITION' },
        { id: 16, text: "Planning & Organization ability", dimension: 'COGNITION' },
        { id: 17, text: "Creativity & Problem Solving", dimension: 'COGNITION' },
        { id: 18, text: "Adaptability to Change", dimension: 'ADAPTABILITY' },
        { id: 19, text: "Reaction to Stress", dimension: 'ADAPTABILITY' },
        { id: 20, text: "Physical Energy levels", dimension: 'MIND_BODY' },
        { id: 21, text: "Sleep Quality and regularity", dimension: 'MIND_BODY' },
        { id: 22, text: "Appetite & Eating Habits", dimension: 'MIND_BODY' },
        { id: 23, text: "Sensory Sensitivity to environment", dimension: 'MIND_BODY' },
        { id: 24, text: "Physical Pain presence and impact", dimension: 'MIND_BODY' },
        { id: 25, text: "Impulse Control in daily life", dimension: 'ADAPTABILITY' },
        { id: 26, text: "Speech & Communication clarity", dimension: 'COGNITION' },

        // --- Problem Symptoms (Evaluated as detractions) ---
        { id: 27, text: "Feelings of Sadness & Depression", dimension: 'MOOD', type: 'PROBLEM' },
        { id: 28, text: "Fear & Anxiety levels", dimension: 'MOOD', type: 'PROBLEM' },
        { id: 29, text: "Irritability & Anger", dimension: 'MOOD', type: 'PROBLEM' },
        { id: 30, text: "Excessive Guilt & Shame", dimension: 'SOCIAL', type: 'PROBLEM' },
        { id: 31, text: "Avoidance & Withdrawal from social life", dimension: 'SOCIAL', type: 'PROBLEM' },
        { id: 32, text: "Paranoia & Suspiciousness", dimension: 'SOCIAL', type: 'PROBLEM' },
        { id: 33, text: "Loss of Pleasure & Interest", dimension: 'DRIVE', type: 'PROBLEM' },
        { id: 34, text: "Restlessness & Hyperactivity", dimension: 'DRIVE', type: 'PROBLEM' },
        { id: 35, text: "Difficulty with Self-care", dimension: 'DRIVE', type: 'PROBLEM' },
        { id: 36, text: "Unwanted or Obsessive Thoughts", dimension: 'COGNITION', type: 'PROBLEM' },
        { id: 37, text: "Hallucinations & Delusions", dimension: 'COGNITION', type: 'PROBLEM' },
        { id: 38, text: "Dissociation & Detachment", dimension: 'COGNITION', type: 'PROBLEM' },
        { id: 39, text: "Feeling of Unreality (Derealization)", dimension: 'COGNITION', type: 'PROBLEM' },
        { id: 40, text: "Perfectionism & Rigidity", dimension: 'ADAPTABILITY', type: 'PROBLEM' },
        { id: 41, text: "Risk-taking & Recklessness", dimension: 'ADAPTABILITY', type: 'PROBLEM' },
        { id: 42, text: "Compulsive Behaviors", dimension: 'ADAPTABILITY', type: 'PROBLEM' },
        { id: 43, text: "Self-Harm or Suicidal Thoughts", dimension: 'MOOD', type: 'PROBLEM' },
        { id: 44, text: "Aggression towards Others", dimension: 'SOCIAL', type: 'PROBLEM' },
        { id: 45, text: "Numbness & Lack of Emotion", dimension: 'MIND_BODY', type: 'PROBLEM' },
        { id: 46, text: "Body Image Issues", dimension: 'MIND_BODY', type: 'PROBLEM' },
        { id: 47, text: "Susceptibility to Infection/Illness", dimension: 'MIND_BODY', type: 'PROBLEM' }
    ],

    state: {
        currentStep: 0,
        responses: {} // questionId: value
    },

    /**
     * Resets/Initializes assessment.
     */
    startNew(initialState = null) {
        if (initialState) {
            this.state = initialState;
        } else {
            this.state.currentStep = 0;
            this.state.responses = {};
        }
    },

    /**
     * Records response and triggers mid-assessment save callback.
     */
    recordResponse(questionId, value, onUpdate) {
        this.state.responses[questionId] = value;
        if (onUpdate) onUpdate(this.state);
    },

    next() {
        if (this.state.currentStep < this.QUESTIONS.length - 1) {
            this.state.currentStep++;
            return this.QUESTIONS[this.state.currentStep];
        }
        return null;
    },

    getCurrentQuestion() {
        return this.QUESTIONS[this.state.currentStep];
    }
};
