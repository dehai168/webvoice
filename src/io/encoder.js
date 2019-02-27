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
export class Encoder {
    constructor() {

    }

    static wav(bytes, sampleRate, sampleBits, outChannelsNumber) {
        let dataLength = bytes.length * (sampleBits / 8);
        let buffer = new ArrayBuffer(44 + dataLength);
        let data = new DataView(buffer);

        let channelCount = outChannelsNumber;
        let offset = 0;

        let writeString = function(str) {
            for (let i = 0; i < str.length; i++) {
                data.setUint8(offset + i, str.charCodeAt(i));
            }
        };
        // https://baike.baidu.com/item/WAV
        //资源交换文件标志（RIFF）
        writeString('RIFF');
        offset += 4;
        //从下个地址开始到文件尾的总字节数
        data.setUint32(offset, 36 + dataLength, true);
        offset += 4;
        //WAV文件标志（WAVE）
        writeString('WAVE');
        offset += 4;
        //波形格式标志（fmt ），最后一位空格
        writeString('fmt ');
        offset += 4;
        //过滤字节（一般为00000010H），若为00000012H则说明数据头携带附加信息（见“附加信息”）
        data.setUint32(offset, 16, true);
        offset += 4;
        //格式种类（值为1时，表示数据为线性PCM编码）
        data.setUint16(offset, 1, true);
        offset += 2;
        //通道数，单声道为1，双声道为2
        data.setUint16(offset, channelCount, true);
        offset += 2;
        //采样频率
        data.setUint32(offset, sampleRate, true);
        offset += 4;
        //波形数据传输速率（每秒平均字节数）
        data.setUint32(offset, channelCount * sampleRate * (sampleBits / 8), true);
        offset += 4;
        //DATA数据块长度，字节  快数据调整数 采样一次占用字节数 通道数×每样本的数据位数/8
        data.setUint16(offset, channelCount * (sampleBits / 8), true);
        offset += 2;
        //PCM位宽
        data.setUint16(offset, sampleBits, true);
        offset += 2;
        //--------//
        //附加信息（可选，由上方过滤字节确定）
        //“fact”,该部分是可选部分，一般当WAV文件是由某些软件转换而来时，包含该部分。
        //若包含该部分：（1）该部分的前4字节为数据头，一般为4个字母。
        //（2）随后4个字节表示长度，即除去头（4字节）和长度（4字节）之后，数据本身的长度。
        //（3）最后的字节为数据本身。例如：“66 61 73 74 04 00 00 00F8 2F 14 00” 。
        //“66 61 73 74”是fact字段的数据头，“04 00 00 00”是数据本身的长度，“F8 2F 14 00”是数据本身。
        //（注意是little-endian字节顺序）
        //-------//
        //数据标志符（data）
        writeString('data');
        offset += 4;
        //DATA总数据长度字节
        data.setUint32(offset, dataLength, true);
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