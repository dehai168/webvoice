export class Context {
    constructor() {
        this._context = null;
        try {
            window.AudioContext = window.AudioContext || window.webkitAudioContext || window.mozAudioContext || window.msAudioContext;
            this._context = new AudioContext();
            this._scriptProcessorNode = this._context.createScriptProcessor(); //config
            this._audioBufferSource = this._context.createBufferSource();
            this._mediaStreamAudioSourceNode = null;
        } catch (e) {
            throw e;
        }
    }
}