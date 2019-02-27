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
export class Audio {
    constructor() {
        //let audio = document.createElement('audio');
        //audio.setAttribute('autoplay', true);
        //IE 下的wav要bgsound播放
        let audio = document.createElement('bgsound');
        audio.setAttribute('loop', 'false');
        audio.setAttribute('audostart', 'true');
        audio.setAttribute('style', 'display:none;');
        audio.id = 'audioas3_' + new Date().getTime();
        let body = document.querySelector('body');
        body.appendChild(audio);
        this._audio = document.getElementById(audio.id);
    }
    play(blob) {
        this._audio.src = window.URL.createObjectURL(blob);
    }
}