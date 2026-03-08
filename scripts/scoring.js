/**
 * Scoring Module - MHQ Analysis PWA
 * Implements the Sapien Labs MHQ Scoring System.
 */

export const Scoring = {
    /**
     * Map raw 1-9 rating to internal -4 to +4 scale.
     */
    MAP: {
        1: -4, 2: -3, 3: -2, 4: -1, 5: 0, 6: 1, 7: 2, 8: 3, 9: 4
    },

    /**
     * Calculates the MHQ scores based on responses.
     * @param {Object} responses - questionId: value (1-9)
     * @param {Array} questions - List of question objects
     */
    calculate(responses, questions) {
        let totalScore = 0;
        const dimensionScores = {
            'Mood & Outlook': 0,
            'Social Self': 0,
            'Drive & Motivation': 0,
            'Cognition': 0,
            'Adaptability & Resilience': 0,
            'Mind-Body Connection': 0
        };
        const dimensionCounts = {};

        // 1. Map and Weigh
        Object.keys(responses).forEach(qId => {
            const val = parseInt(responses[qId]);
            const question = questions.find(q => q.id == qId);
            const mappedVal = this.MAP[val] || 0;

            // Non-linear weighting: Penalize negative scores more heavily
            const weightedVal = (mappedVal < 0) ? mappedVal * 1.5 : mappedVal;

            totalScore += weightedVal;

            const dimName = this._getDimensionName(question.dimension);
            dimensionScores[dimName] += weightedVal;
            dimensionCounts[dimName] = (dimensionCounts[dimName] || 0) + 1;
        });

        // 2. Average and Normalize Dimensions (-50 to 100)
        Object.keys(dimensionScores).forEach(dim => {
            const count = dimensionCounts[dim] || 1;
            const avg = dimensionScores[dim] / count;
            // Normalize avg (-6 to 6 based on weighting) to -50 to 100
            dimensionScores[dim] = Math.round(((avg + 4) / 8) * 150 - 50);
        });

        // 3. Normalize Overall Score (-100 to 200)
        const overallCount = questions.length || 1;
        const overallAvg = totalScore / overallCount;
        const normalizedOverall = Math.round(((overallAvg + 4) / 8) * 300 - 100);

        return {
            overall: normalizedOverall,
            dimensions: dimensionScores,
            category: this._getCategory(normalizedOverall)
        };
    },

    /**
     * Maps dimension code to human name.
     */
    _getDimensionName(code) {
        const mapping = {
            'MOOD': 'Mood & Outlook',
            'SOCIAL': 'Social Self',
            'DRIVE': 'Drive & Motivation',
            'COGNITION': 'Cognition',
            'ADAPTABILITY': 'Adaptability & Resilience',
            'MIND_BODY': 'Mind-Body Connection'
        };
        return mapping[code] || 'General';
    },

    /**
     * Gets state category based on score.
     */
    _getCategory(score) {
        if (score <= 0) return 'Distressed / Struggling';
        if (score <= 50) return 'Enduring';
        if (score <= 100) return 'Managing';
        if (score <= 150) return 'Succeeding';
        return 'Thriving';
    }
};
