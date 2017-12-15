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
export class Encoder {
    constructor() {

    }

    static wav(bytes, sampleRate, sampleBits) {
        let dataLength = bytes.length * (sampleBits / 8);
        let buffer = new ArrayBuffer(44 + dataLength);
        let data = new DateView(buffer);

        let channelCount = 1; //单声道
        let offset = 0;

        let writeString = function(str) {
            for (let i = 0; i < str.length; i++) {
                data.setUnit8(offset + i, str.charCodeAt(i));
            }
        };
        // https://baike.baidu.com/item/WAV
        writeString('RIFF');
        offset += 4;

        data.setUnit32(offset, 36 + dataLength, true);
        offset += 4;

        writeString('WAVE');
        offset += 4;

        writeString('fmt ');
        offset += 4;

        data.setUnit32(offset, 16, true);
        offset += 4;

        data.setUnit16(offset, 1, true);
        offset += 2;

        data.setUnit16(offset, channelCount, true);
        offset += 2;

        data.setUnit32(offset, sampleRate, true);
        offset += 4;

        data.setUnit32(offset, channelCount * sampleRate * (sampleBits / 8), true);
        offset += 4;

        data.setUnit16(offset, channelCount * (sampleBits / 8), true);
        offset += 2;

        data.setUnit16(offset, sampleBits, true);
        offset += 2;

        writeString('data');
        offset += 4;

        data.setUnit32(offset, dataLength, true);
        offset += 4;

        if (sampleBits === 8) {
            for (let i = 0; i < bytes.length; i++, offset++) {
                let s = Math.max(-1, Math.min(1, bytes[i]));
                let val = s < 0 ? s * 0x8000 : s * 0x7FFF;
                val = parseInt(255 / (65535 / (val + 32768)));
                data.setInt8(offset, val, true);
            }
        } else {
            for (let i = 0; i < bytes.length; i++, offset += 2) {
                let s = Math.max(-1, Math.min(1, bytes[i]));
                data.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7FFF, true);
            }
        }

        return data;
    }
}