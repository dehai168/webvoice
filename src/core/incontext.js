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
import { Context } from "./context";

export class InContext extends Context {
    /**
     * 
     * @param {object} config 
     * @param {stream} mediaStream 
     */
    constructor(config, mediaStream) {

        super(config);

        this._size = 0;
        this._buffer = [];

        this._scriptProcessorNode = this._context.createScriptProcessor(this._config.bufferSize, this._config.numberInputChannels, this._config.numberOutputChannels);
        this._mediaStreamAudioSourceNode = this._context.createMediaStreamSource(mediaStream);

        let that = this;
        this._scriptProcessorNode.onaudioprocess = function(audioProcessEvent) {
            let inputBuffer = audioProcessEvent.inputBuffer;
            //TODO 多个通道塞数据可能有问题
            for (let channel = 0; channel < inputBuffer.numberOfChannels; channel++) {
                let inputData = inputBuffer.getChannelData(channel);

                that._buffer.push(new Float32Array(inputData));
                that._size += inputData.length;
            }
        };
    }

    clear() {
        this._buffer.length = 0;
        this._size = 0;
    }

    start() {
        this._mediaStreamAudioSourceNode.connect(this._scriptProcessorNode);
        this._scriptProcessorNode.connect(this._context.destination);
    }
    get() {
        let inputSampleRate = this._context.sampleRate; //输入采样率
        let outSampleRate = this._config.outputSampleRate; //输出采样率
        //合并
        let data = new Float32Array(this._size);
        let offset = 0;
        for (let index = 0; index < this._buffer.length; index++) {
            data.set(this._buffer[index], offset);
            offset += this._buffer[index].length;
        }
        //压缩
        let compression = parseInt(inputSampleRate / outSampleRate);
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
    stop() {
        this._mediaStreamAudioSourceNode.disconnect();
        this._scriptProcessorNode.disconnect();
    }
}