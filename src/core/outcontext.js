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
import { Context } from "./context";


export class OutAudioContext extends Context {
    constructor(config) {
        super(config);
    }
    start() {
            let gainNode = this._context.createGain();
            this._audioBufferSourceNode = this._context.createBufferSource();
            this._audioBufferSourceNode.connect(gainNode);
            gainNode.connect(this._context.destination);
            this._audioBufferSourceNode.start();
        }
        /**
         * 放入已经压缩过的音频文件数据(audio.wav/audio.mp3)
         * @param {ArrayBuffer} audioData 音频数据
         */
    pushAudioData(audioData) {

            this._context.decodeAudioData(audioData)
                .then(audioBuffer => {
                    this._audioBufferSourceNode.buffer = audioBuffer;
                })
                .catch(e => {
                    throw e;
                });
        }
        /**
         * 放入已经压缩过的原始音频数据流
         * @param {Array} arrayBuffer 数据
         */
    pushDataArray(arrayBuffer) {
        let audioBuffer = this._context.createBuffer(this._config.numberChannels, this._context.sampleRate * 5, this._context.sampleRate);
        for (let index = 0; index < this._config.numberChannels.length; index++) {
            let tempBuffer = audioBuffer.getChannelData(index); //TODO
            for (let index2 = 0; index2 < array.length; index2++) {
                tempBuffer[index2] = array[index2];
            }
        }
        this._audioBufferSourceNode.buffer = audioBuffer;
    }
}