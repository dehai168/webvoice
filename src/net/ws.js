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

export class WS {
    constructor(url) {
        this._isConnected = false;
        this._websocket = new WebSocket(url);
        this._websocket.binaryType = "arraybuffer"; //blob,arraybuffer
        this._receivedEvent = null;
        this._errorEvent = null;
        let that = this;
        this._websocket.onopen = function(e) {
            that._isConnected = true;
        };
        this._websocket.onmessage = function(e) {
            if (that._receivedEvent) {
                that._receivedEvent(e.data);
            }
        };
        this._websocket.onerror = function(e) {
            if (that._errorEvent) {
                that._errorEvent(e);
            }
        }
    }

    send(blobData) {
        if (this._isConnected) {
            this._websocket.send(blobData);
            return true;
        }
        return false;
    }

    close() {
        if (this._websocket.bufferedAmount === 0) {
            this._websocket.close();
            return true;
        }
        return false;
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