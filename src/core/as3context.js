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
export class As3Context {
    constructor(config) {
        this.as3ele = null;
        let flashvars = {
            outSampleRate: config.outputSampleRate,
            numberChannels: config.numberChannels
        };
        let params = {
            menu: 'false',
            scale: 'noScale',
            allowFullscreen: 'true',
            allowScriptAccess: 'always',
            bgcolor: '',
            wmode: 'direct'
        };
        let attributes = {
            id: 'audioas3'
        };
        let swfpath = config.swfPath ? config.swfPath : './audio.swf';
        let domid = config.domid;

        if (!domid) {
            throw new Error('audio.swf need a dom element');
            return;
        }
        if (swfobject) {
            let ele = document.getElementById(domid);
            let that = this;
            swfobject.embedSWF(
                swfpath, domid, ele.clientWidth, ele.clientHeight, '25.0.0', './expressInstall.swf', flashvars, params, attributes,
                function() {
                    that.as3ele = document.getElementById(attributes.id);
                }
            );

        } else {
            throw new Error('the swfobject is need');
            return;
        }

    }

    ready() {
        this.as3ele.ready();
    }

    start() {
        this.as3ele.start();
    }

    stop() {
        this.as3ele.stop();
    }

    clear() {
        this.as3ele.clear();
    }

    get() {
        return this.as3ele.getbuffer();
    }
}