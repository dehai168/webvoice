/*
 * Copyright (C) 2017 wangdehai. All Rights Reserved.
 *
 * @author level <dehai168@gmail.com>
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
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
            console.log(e);
        }
    }
    isSupport() {
        return !(this._context === null);
    }
}