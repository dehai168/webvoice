export class Log {
    constructor() {
        if (window.console) {
            this._c = window.console;
        }
    }

    static console(message) {

    }
}