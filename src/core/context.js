export class Context {
    /**
     * 
     * @param {object} config 
     */
    constructor(config) {
        this._context = null;
        this._config = config;
        try {
            window.AudioContext = window.AudioContext || window.webkitAudioContext || window.mozAudioContext || window.msAudioContext;
            this._context = new AudioContext();
        } catch (e) {
            throw e;
        }
    }
}