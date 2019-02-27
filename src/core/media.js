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
export class Media {
    constructor() {
        this._constraints = {
            audio: true,
            video: false
        };
        let that = this;
        let oldUserMedia = function(constraints) {
            let getUserMedia = (navigator.getUserMedia || navigator.webketGetUserMedia || navigator.mozGetUserMedia);

            if (!getUserMedia) {
                return Promise.reject(new Error('getUserMedia is not implemented in this browser'));
            }

            return new Promise(function(res, rej) {
                getUserMedia.call(navigator, constraints, res, rej);
            });
        };
        if (navigator.mediaDevices === undefined) {
            navigator.mediaDevices = {};
        }
        if (navigator.mediaDevices.getUserMedia === undefined) {
            navigator.mediaDevices.getUserMedia = oldUserMedia;
        }

    }
    promiseStream() {
        let pm = new Promise((res, rej) => {
            navigator.mediaDevices.getUserMedia(this._constraints)
                .then(stream => {
                    res(stream);
                })
                .catch(error => {
                    rej(error);
                });
        });
        return pm;
    }
}