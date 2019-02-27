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
import { Media } from "./media";
import { InContext } from "./incontext";
import { OutAudioContext } from "./outcontext";
import { defaultConfig } from "../config";
import { Encoder } from "../io/encoder";
import { WS } from "../net/ws";
import { BlobData } from "../io/blob";
import { As3Context } from "./as3context";
import { Audio } from "./audio";
import { PollFill } from "../utils/pollfill";

export class Player {
    constructor(config) {
        this._config = {};
        PollFill.deepAssign(this._config, defaultConfig, config ? config : defaultConfig);
        let that = this;
        let outcontext = new OutAudioContext(that._config);
        let audio = new Audio();
        this._incontext = null;
        this._as3context = null;

        if (!outcontext.isSupport()) {
            this._as3context = new As3Context(that._config);
        }
        this._ws = new WS(this._config.url);
        this._ws.on('received', function(dataBuffer) {
            if (outcontext.isSupport()) {
                outcontext.start();
                outcontext.pushAudioData(dataBuffer);
            } else {
                let wavblob = BlobData.wav(dataBuffer);
                audio.play(wavblob);
            }
        });
    }
    ready() {
        let that = this;
        let media = new Media();
        if (window.Promise) {
            media.promiseStream()
                .then(medisStream => {
                    that._incontext = new InContext(that._config, medisStream);
                }).catch(e => {
                    that._as3context.ready();
                });
        } else {
            that._as3context.ready();
        }
    }

    speak() {
        if (this._incontext) {
            this._incontext.start();
        } else if (this._as3context) {
            this._as3context.start();
        }
    }
    send() {
        if (this._incontext) {
            let dataBuffer = this._incontext.get();
            let wavDataBuffer = Encoder.wav(dataBuffer, this._config.outputSampleRate, this._config.outputSampleBits, this._config.numberChannels);
            this._ws.send(wavDataBuffer);
            this._incontext.stop();
            this._incontext.clear();
        } else if (this._as3context) {
            let dataBuffer = this._as3context.get();
            let wavDataBuffer = Encoder.wav(dataBuffer, this._config.outputSampleRate, this._config.outputSampleBits, this._config.numberChannels);
            this._ws.send(wavDataBuffer.buffer);
            this._as3context.stop();
            this._as3context.clear();
        }
    }
    getbuffer(cb) {
        if (this._incontext && typeof cb === "function") {
            let dataBuffer = this._incontext.get();
            this._incontext.stop();
            this._incontext.clear();
            cb(dataBuffer);
        } else if (this._as3context) {
            let dataBuffer = this._as3context.get();
            this._as3context.stop();
            this._as3context.clear();
            cb(dataBuffer);
        }
    }
    exportwav(cb) {
        if (this._incontext && typeof cb === "function") {
            let dataBuffer = this._incontext.get();
            let wavDataBuffer = Encoder.wav(dataBuffer, this._config.outputSampleRate, this._config.outputSampleBits, this._config.numberChannels);
            let wavblob = BlobData.wav(wavDataBuffer);
            this._incontext.stop();
            this._incontext.clear();
            cb(wavblob);
        } else if (this._as3context) {
            let dataBuffer = this._as3context.get();
            let wavDataBuffer = Encoder.wav(dataBuffer, this._config.outputSampleRate, this._config.outputSampleBits, this._config.numberChannels);
            let wavblob = BlobData.wav(wavDataBuffer.buffer);
            this._as3context.stop();
            this._as3context.clear();
            cb(wavblob);
        }
    }
    forcedownload(filename) {
        this.exportwav(function(blob) {
            let url = (window.URL || window.webkitURL).createObjectURL(blob);
            let link = window.document.createElement('a');
            link.href = url;
            link.download = filename || new Date().toISOString() + '.wav';
            let click = document.createEvent("Event");
            click.initEvent("click", true, true);
            link.dispatchEvent(click);
        });
    }
}