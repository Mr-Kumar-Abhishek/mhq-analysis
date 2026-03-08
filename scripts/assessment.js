/**
 * Assessment Module - MHQ Analysis PWA
 * Contains the question bank and manages the assessment state.
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

    // Representative question set (mapped to 6 dimensions)
    // Ratings are 1 (Not at all) to 9 (Extremely)
    QUESTIONS: [
        { id: 1, text: "How often do you feel optimistic about your future?", dimension: 'MOOD' },
        { id: 2, text: "How well can you control your emotions in stressful situations?", dimension: 'MOOD' },
        { id: 3, text: "Do you feel a sense of worth and value in yourself?", dimension: 'SOCIAL' },
        { id: 4, text: "How comfortable do you feel in social interactions?", dimension: 'SOCIAL' },
        { id: 5, text: "How much energy do you have to pursue your goals?", dimension: 'DRIVE' },
        { id: 6, text: "How easily can you initiate new tasks or projects?", dimension: 'DRIVE' },
        { id: 7, text: "How well can you concentrate on complex tasks?", dimension: 'COGNITION' },
        { id: 8, text: "How clearly can you think when faced with problems?", dimension: 'COGNITION' },
        { id: 9, text: "How well do you adapt to unexpected changes in your life?", dimension: 'ADAPTABILITY' },
        { id: 10, text: "How quickly do you bounce back after a setback?", dimension: 'ADAPTABILITY' },
        { id: 11, text: "How would you rate your sleep quality and its impact on your mood?", dimension: 'MIND_BODY' },
        { id: 12, text: "How physically energetic do you feel on a daily basis?", dimension: 'MIND_BODY' },
        // ... In a full implementation, we would include all 47 items.
    ],

    state: {
        currentStep: 0,
        responses: {} // questionId: value
    },

    /**
     * Resets the assessment state.
     */
    startNew() {
        this.state.currentStep = 0;
        this.state.responses = {};
    },

    /**
     * Records a response for the current question.
     * @param {number} questionId 
     * @param {number} value (1-9)
     */
    recordResponse(questionId, value) {
        this.state.responses[questionId] = value;
    },

    /**
     * Moves to the next question.
     * @returns {Object|null} The next question or null if finished.
     */
    next() {
        if (this.state.currentStep < this.QUESTIONS.length - 1) {
            this.state.currentStep++;
            return this.QUESTIONS[this.state.currentStep];
        }
        return null;
    },

    /**
     * Gets the current question.
     */
    getCurrentQuestion() {
        return this.QUESTIONS[this.state.currentStep];
    },

    /**
     * Checks if the assessment is complete.
     */
    isComplete() {
        return Object.keys(this.state.responses).length === this.QUESTIONS.length;
    }
};
