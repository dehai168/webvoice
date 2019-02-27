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

export class XHR {
    constructor(url) {
        this._url = url;
        this._receivedEvent = null;
        this._errorEvent = null;
        let that = this;
        window.setInterval(function() {
            let xhr = new XMLHttpRequest();
            xhr.responseType = "arraybuffer"; //blob,arraybuffer
            xhr.open("get", url, true);
            xhr.onload = function(e) {
                if (xhr.readyState === 4 && xhr.response && that._receivedEvent) {
                    that._receivedEvent(xhr.response);
                }
            };
            xhr.onerror = function(e) {
                if (that._errorEvent) {
                    that._errorEvent(e);
                }
            };
            xhr.send();
        }, 2000);
    }

    send(blobData) {
        let xhr = new XMLHttpRequest();
        xhr.responseType = "json"; //arraybuffer
        xhr.open('post', this._url, true);
        xhr.onload = function(e) {
            if (xhr.readyState === 4 && xhr.response && that._receivedEvent) {
                that._receivedEvent(xhr.response);
            }
        };
        xhr.onerror = function(e) {
            if (that._errorEvent) {
                that._errorEvent(e);
            }
        };
        xhr.send(blobData);
        return true;
    }

    close() {
        return true;
    }

    on(eventName, fn) {
        switch (eventName) {
            case 'received':
                typeof fn === 'function' ? this._receivedEvent = fn : this._receivedEvent = null;
            case 'error':
                typeof fn === 'function' ? this._errorEvent = fn : this._errorEvent = null;
            default:
                break;
        }
    }
}