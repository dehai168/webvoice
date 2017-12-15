/*
 * Copyright (C) 2017 Streamax. All Rights Reserved.
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
import { Media } from "./media";
import { InContext } from "./incontext";
import { OutAudioContext } from "./outcontext";
import { defaultConfig } from "../config";
import { BlobData } from "../io/blob";
import { Encoder } from "../io/encoder";
import { WS } from "../net/ws";

export class Player {
    constructor(config) {
        let that = this;
        //this._audioEle = audioEle;
        this._config = {};
        Object.assign(this._config, config ? config : defaultConfig);
        this._media = new Media();
        this._incontext = null;
        this._outcontext = new OutAudioContext();
        this._ws = new WS(this._config.url);
        this._ws.on('received', function(dataBuffer) {
            that._outcontext.push(dataBuffer);
        });
        this._media.promiseStream()
            .then(medisStream => {
                that._incontext = new InContext(that._config, medisStream);
            }).catch(e => {
                throw e;
            });
    }

    speak() {
        this._incontext.init();
    }

    send() {
        let dataBuffer = this._incontext.push();
        let wavDataBuffer = Encoder.wav(dataBuffer, this._config.outputSampleRate, this._config.outputSampleBits);
        let wavBlob = BlobData.wav(wavDataBuffer);
        this._ws.send(wavBlob);
    }
}