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
import { Media } from './core/media';
import { Player } from "./core/player";

let audiojs = {};
let media = new Media();

audiojs.isSupported = media.isSupported();
audiojs.createPlayer = function(config) {
    return new Player(config);
};

Object.defineProperty(audiojs, 'version', {
    enumerable: true,
    get: function() {
        return '0.0.2';
    }
});

export { audiojs };