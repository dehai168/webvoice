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
export class PollFill {
    constructor() {

    }

    static deepAssign(target) {
        var hasOwnProperty = Object.prototype.hasOwnProperty;
        var propIsEnumerable = Object.prototype.propertyIsEnumerable;
        var isObj = function(x) {
            var type = typeof x;
            return x !== null && (type === 'object' || type === 'function');
        }
        var toObject = function(val) {
            if (val === null || val === undefined) {
                throw new TypeError('Cannot convert undefined or null to object');
            }
            return Object(val);
        }
        var assignKey = function(to, from, key) {
            var val = from[key];
            if (val === undefined || val === null) {
                return;
            }
            if (hasOwnProperty.call(to, key)) {
                if (to[key] === undefined || to[key] === null) {
                    throw new TypeError('Cannot convert undefined or null to object (' + key + ')');
                }
            }
            if (!hasOwnProperty.call(to, key) || !isObj(val)) {
                to[key] = val;
            } else {
                to[key] = assign(Object(to[key]), from[key]);
            }
        }

        var assign = function(to, from) {
            if (to === from) {
                return to;
            }

            from = Object(from);

            for (var key in from) {
                if (hasOwnProperty.call(from, key)) {
                    assignKey(to, from, key);
                }
            }

            if (Object.getOwnPropertySymbols) {
                var symbols = Object.getOwnPropertySymbols(from);

                for (var i = 0; i < symbols.length; i++) {
                    if (propIsEnumerable.call(from, symbols[i])) {
                        assignKey(to, from, symbols[i]);
                    }
                }
            }

            return to;
        }

        target = toObject(target);

        for (var s = 1; s < arguments.length; s++) {
            assign(target, arguments[s]);
        }

        return target;
    }
}