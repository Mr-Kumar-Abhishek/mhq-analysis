/**
 * Storage Module - MHQ Analysis PWA
 * Handles local persistence of assessment results, user settings, and temporary state.
 */

const STORAGE_KEY = 'mhq_analysis_data';
const TEMP_KEY = 'mhq_temp_assessment';

export const Storage = {
    /**
     * Retrieves all saved data.
     */
    getData() {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) {
            return {
                assessments: [],
                settings: { theme: 'dark', language: 'en' }
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
     */
    saveAssessment(result) {
        const data = this.getData();
        data.assessments.push({
            id: crypto.randomUUID(),
            timestamp: new Date().toISOString(),
            ...result
        });
        this._save(data);
        this.clearTemp(); // Clear temp once saved
    },

    /**
     * Gets all historical assessments.
     */
    getAssessments() {
        return this.getData().assessments || [];
    },

    /**
     * Temporary state for mid-assessment recovery.
     */
    saveTemp(state) {
        localStorage.setItem(TEMP_KEY, JSON.stringify(state));
    },

    getTemp() {
        const raw = localStorage.getItem(TEMP_KEY);
        return raw ? JSON.parse(raw) : null;
    },

    clearTemp() {
        localStorage.removeItem(TEMP_KEY);
    },

    /**
     * Clears all local data (NFR-1.2).
     */
    clearAll() {
        localStorage.removeItem(STORAGE_KEY);
        localStorage.removeItem(TEMP_KEY);
    },

    _save(data) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    }
};
