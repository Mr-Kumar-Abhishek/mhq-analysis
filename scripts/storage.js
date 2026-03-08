/**
 * Storage Module - MHQ Analysis PWA
 * Handles local persistence of assessment results and user settings.
 */

const STORAGE_KEY = 'mhq_analysis_data';

export const Storage = {
    /**
     * Retrieves all saved data.
     * @returns {Object} The complete storage object.
     */
    getData() {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) {
            return {
                assessments: [],
                settings: {
                    theme: 'dark',
                    language: 'en'
                }
            };
        }
        try {
            return JSON.parse(raw);
        } catch (e) {
            console.error('Failed to parse storage data', e);
            return { assessments: [], settings: {} };
        }
    },

    /**
     * Saves an assessment result.
     * @param {Object} result - { timestamp, rawResponses, scores }
     */
    saveAssessment(result) {
        const data = this.getData();
        data.assessments.push({
            id: crypto.randomUUID(),
            timestamp: new Date().toISOString(),
            ...result
        });
        this._save(data);
    },

    /**
     * Gets all historical assessments.
     * @returns {Array} List of assessment objects.
     */
    getAssessments() {
        return this.getData().assessments || [];
    },

    /**
     * Clears all local data.
     */
    clearAll() {
        localStorage.removeItem(STORAGE_KEY);
    },

    /**
     * Internal save helper.
     */
    _save(data) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    }
};
