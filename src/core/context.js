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

export class Context {
    constructor(config) {
        try {
            window.AudioContext = window.AudioContext || window.webkitAudioContext || window.mozAudioContext || window.msAudioContext;
            this._context = new AudioContext();
        } catch (e) {
            throw e;
        }
        this._size = 0;
        this._buffer = [];
        this._inputSampleRate = this._context.sampleRate; //输入采样率
        this._inputSampleBits = config.inputSampleBits; //输入采样位数
        this._outSampleRate = config.outSampleRate; //输出采样率
        this._outSampleBits = config.outSampleBits; //输出采样位数
    }

    push(data) {
        this._buffer.push(new Float32Array(data));
        this._size += this._buffer.length;
    }

    clear() {
        this._buffer.length = 0;
        this._size = 0;
    }

    compress() {
        //合并
        let data = new Float32Array(this._size);
        let offset = 0;
        for (let index = 0; index < this._buffer.length; index++) {
            data.set(this._buffer[index], offset);
            offset += this._buffer[index].length;
        }
        //压缩
        let compression = parseInt(this._inputSampleRate / this._outSampleRate);
        let length = data.length / compression;
        let result = new Float32Array(length);
        let index = 0,
            j = 0;
        while (index < length) {
            result[index] = data[j];
            j += compression;
            index++;
        }
        return result;
    }
}