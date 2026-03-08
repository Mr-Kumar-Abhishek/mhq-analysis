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
        { id: 1, text: "How optimistic and hopeful do you feel about your future?", dimension: 'MOOD' },
        { id: 2, text: "How well can you regulate and manage your emotions?", dimension: 'MOOD' },
        { id: 3, text: "How stable and calm do you remain under pressure or stress?", dimension: 'MOOD' },
        { id: 4, text: "How much self-worth and confidence do you generally feel?", dimension: 'SOCIAL' },
        { id: 5, text: "How easily can you feel empathy and a sense of connection with others?", dimension: 'SOCIAL' },
        { id: 6, text: "How comfortable and engaged do you feel in social situations?", dimension: 'SOCIAL' },
        { id: 7, text: "How much trust and openness do you have in your personal relationships?", dimension: 'SOCIAL' },
        { id: 8, text: "How motivated do you feel to socialize and interact with others?", dimension: 'SOCIAL' },
        { id: 9, text: "How much drive and motivation do you have to complete your daily tasks?", dimension: 'DRIVE' },
        { id: 10, text: "How strong is your sense of initiative and purpose in life?", dimension: 'DRIVE' },
        { id: 11, text: "How aware are you of your own internal mental and emotional state?", dimension: 'COGNITION' },
        { id: 12, text: "How well can you maintain attention and focus during your work or activities?", dimension: 'COGNITION' },
        { id: 13, text: "How efficient is your memory and ability to recall information?", dimension: 'COGNITION' },
        { id: 14, text: "How easily can you learn and comprehend new information?", dimension: 'COGNITION' },
        { id: 15, text: "How much clarity do you have when making important decisions?", dimension: 'COGNITION' },
        { id: 16, text: "How effective are you at planning and organizing your life or tasks?", dimension: 'COGNITION' },
        { id: 17, text: "How often do you feel creative and able to solve complex problems?", dimension: 'COGNITION' },
        { id: 18, text: "How well do you adapt to unexpected changes in your life?", dimension: 'ADAPTABILITY' },
        { id: 19, text: "How healthy is your typical reaction to stressful events?", dimension: 'ADAPTABILITY' },
        { id: 20, text: "How would you rate your overall physical energy levels?", dimension: 'MIND_BODY' },
        { id: 21, text: "How would you rate the quality and regularity of your sleep?", dimension: 'MIND_BODY' },
        { id: 22, text: "How healthy and consistent are your appetite and eating habits?", dimension: 'MIND_BODY' },
        { id: 23, text: "How sensitive are you to sensory stimuli (noise, light, touch) in your environment?", dimension: 'MIND_BODY' },
        { id: 24, text: "How much physical pain do you experience, and how much does it affect you?", dimension: 'MIND_BODY' },
        { id: 25, text: "How well can you control your impulses in your daily life?", dimension: 'ADAPTABILITY' },
        { id: 26, text: "How clear and effective is your speech and communication with others?", dimension: 'COGNITION' },

        // --- Problem Symptoms (Evaluated as detractions) ---
        { id: 27, text: "To what extent have you been experiencing feelings of sadness or depression?", dimension: 'MOOD', type: 'PROBLEM' },
        { id: 28, text: "How much fear or anxiety have you been feeling lately?", dimension: 'MOOD', type: 'PROBLEM' },
        { id: 29, text: "How often do you experience irritability or anger?", dimension: 'MOOD', type: 'PROBLEM' },
        { id: 30, text: "How frequently do you feel excessive guilt or shame?", dimension: 'SOCIAL', type: 'PROBLEM' },
        { id: 31, text: "How much have you been avoiding or withdrawing from social life?", dimension: 'SOCIAL', type: 'PROBLEM' },
        { id: 32, text: "To what degree have you experienced paranoia or suspiciousness toward others?", dimension: 'SOCIAL', type: 'PROBLEM' },
        { id: 33, text: "Have you experienced a loss of pleasure or interest in activities you usually enjoy?", dimension: 'DRIVE', type: 'PROBLEM' },
        { id: 34, text: "How much restlessness or hyperactivity have you been feeling?", dimension: 'DRIVE', type: 'PROBLEM' },
        { id: 35, text: "How much difficulty have you had with basic self-care (e.g., hygiene, grooming)?", dimension: 'DRIVE', type: 'PROBLEM' },
        { id: 36, text: "How often do you experience unwanted, intrusive, or obsessive thoughts?", dimension: 'COGNITION', type: 'PROBLEM' },
        { id: 37, text: "Have you experienced any hallucinations or delusions (seeing things or holding strange beliefs)?", dimension: 'COGNITION', type: 'PROBLEM' },
        { id: 38, text: "How often do you feel a sense of dissociation or detachment from yourself?", dimension: 'COGNITION', type: 'PROBLEM' },
        { id: 39, text: "How often do you experience a feeling of unreality (derealization)?", dimension: 'COGNITION', type: 'PROBLEM' },
        { id: 40, text: "To what extent do you struggle with perfectionism or mental rigidity?", dimension: 'ADAPTABILITY', type: 'PROBLEM' },
        { id: 41, text: "How often do you engage in impulsive risk-taking or recklessness?", dimension: 'ADAPTABILITY', type: 'PROBLEM' },
        { id: 42, text: "How frequently do you engage in compulsive or repetitive behaviors?", dimension: 'ADAPTABILITY', type: 'PROBLEM' },
        { id: 43, text: "Have you had any thoughts of self-harm or suicide?", dimension: 'MOOD', type: 'PROBLEM' },
        { id: 44, text: "How often do you feel or act with aggression toward others?", dimension: 'SOCIAL', type: 'PROBLEM' },
        { id: 45, text: "How much physical or emotional numbness have you been experiencing?", dimension: 'MIND_BODY', type: 'PROBLEM' },
        { id: 46, text: "How much do you struggle with body image issues or dissatisfaction?", dimension: 'MIND_BODY', type: 'PROBLEM' },
        { id: 47, text: "How susceptible do you feel you are to physical infections or illness?", dimension: 'MIND_BODY', type: 'PROBLEM' }
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
