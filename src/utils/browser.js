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
export class Browser {
    constructor() {
        this._ua = window.navigator.userAgent.toLowerCase();
    }

    get platform() {
        return /(ipad)/.exec(this._ua) ||
            /(ipod)/.exec(this._ua) ||
            /(windows phone)/.exec(this._ua) ||
            /(iphone)/.exec(this._ua) ||
            /(kindle)/.exec(this._ua) ||
            /(android)/.exec(this._ua) ||
            /(windows)/.exec(this._ua) ||
            /(mac)/.exec(this._ua) ||
            /(linux)/.exec(this._ua) ||
            /(cros)/.exec(this._ua) || [];
    }

    get version() {

    }

    get name() {
        return /(edge)\/([\w.]+)/.exec(this._ua) ||
            /(opr)[\/]([\w.]+)/.exec(this._ua) ||
            /(chrome)[ \/]([\w.]+)/.exec(this._ua) ||
            /(iemobile)[\/]([\w.]+)/.exec(this._ua) ||
            /(version)(applewebkit)[ \/]([\w.]+).*(safari)[ \/]([\w.]+)/.exec(this._ua) ||
            /(webkit)[ \/]([\w.]+).*(version)[ \/]([\w.]+).*(safari)[ \/]([\w.]+)/.exec(this._ua) ||
            /(webkit)[ \/]([\w.]+)/.exec(this._ua) ||
            /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(this._ua) ||
            /(msie) ([\w.]+)/.exec(this._ua) ||
            this._ua.indexOf('trident') >= 0 && /(rv)(?::| )([\w.]+)/.exec(this._ua) ||
            this._ua.indexOf('compatible') < 0 && /(firefox)[ \/]([\w.]+)/.exec(this._ua) || [];
    }

    get majorVersion() {

    }
}