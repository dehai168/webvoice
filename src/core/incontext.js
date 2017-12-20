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
        this._LBuffer = [];
        this._RBuffer = [];
        this._recording = false;
        //这个特性在2014年8月29日发布的Web Audio API规范中已经标记为不推荐，将很快会被Audio Workers代替.
        this._scriptProcessorNode = this._context.createScriptProcessor(this._config.bufferSize, this._config.numberChannels, this._config.numberChannels);
        this._mediaStreamAudioSourceNode = this._context.createMediaStreamSource(mediaStream);

        this._mediaStreamAudioSourceNode.connect(this._scriptProcessorNode);
        this._scriptProcessorNode.connect(this._context.destination);

        let that = this;
        this._scriptProcessorNode.onaudioprocess = function(audioProcessEvent) {
            if (!that._recording) return;
            let inputBuffer = audioProcessEvent.inputBuffer;
            //TODO 多个通道塞数据可能有问题
            for (let channel = 0; channel < inputBuffer.numberOfChannels; channel++) {
                let inputData = inputBuffer.getChannelData(channel);
                if (channel === 0) {
                    that._LBuffer.push(new Float32Array(inputData));
                } else if (channel === 1) {
                    that._RBuffer.push(new Float32Array(inputData));
                }
                that._size += inputData.length;
            }
        };
    }

    clear() {
        this._LBuffer.length = 0;
        this._RBuffer.length = 0;
        this._size = 0;
    }

    start() {
        this._recording = true;
    }
    get() {
        let inputSampleRate = this._context.sampleRate; //输入采样率
        let outSampleRate = this._config.outputSampleRate; //输出采样率
        //合并数组中的数组为1个连续数组
        let mergeBuffers = function(buffer, length) {
            let result = new Float32Array(length);
            let offset = 0;
            for (let i = 0; i < buffer.length; i++) {
                result.set(buffer[i], offset);
                offset += buffer[i].length;
            }
            return result;
        };
        //合并左右2个通道的数组对象为一个数组  LRLRLR 方式
        let interleave = function(inputL, inputR) {
            let length = inputL.length + inputR.length;
            let result = new Float32Array(length);

            let index = 0,
                inputIndex = 0;

            while (index < length) {
                result[index++] = inputL[inputIndex];
                result[index++] = inputR[inputIndex];
                inputIndex++;
            }
            return result;
        };
        //合并
        let data = null;
        if (this._config.numberChannels === 1) {
            data = mergeBuffers(this._LBuffer, this._size);
        } else if (this._config.numberChannels === 2) {
            let dataL = mergeBuffers(this._LBuffer, this._size / 2);
            let dataR = mergeBuffers(this._RBuffer, this._size / 2);
            data = interleave(dataL, dataR);
        }
        //压缩
        let compression = parseInt(inputSampleRate / outSampleRate);
        let length = data.length / compression;
        let result = new Float32Array(length);
        let index = 0,
            j = 0;
        if (this._config.numberChannels === 1) {
            while (index < length) {
                result[index] = data[j];
                j += compression;
                index++;
            }
            return result;
        } else if (this._config.numberChannels === 2) {
            while (index < length) {
                result[index] = data[j];
                j += compression;
                index++;
                //这个压缩最后有个破音,先用单通道的
                // result[index] = data[j];
                // result[++index] = data[++j];
                // j += compression * 2;
                // index++;
            }
            return result;
        }
    }
    stop() {
        this._recording = false;
    }
}