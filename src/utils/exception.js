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

export class Exception {
    constructor(message) {
        this._message = message;
    }

    get name() {
        return 'Exception';
    }

    get message() {
        return this._message;
    }

    toString() {
        return this.name + ':' + this.message;
    }
}

export class MediaDeviceException extends Exception {
    constructor(message) {
        super(message);
    }

    get name() {
        return 'MediaDeviceException';
    }
}