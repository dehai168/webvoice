/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_browser__ = __webpack_require__(1);


class Audio {

    constructor(config) {
        let b = new __WEBPACK_IMPORTED_MODULE_0__utils_browser__["default"].Browser();
        this._config = config;
        this._browser = b.name
    }

    static Event() {

    }
}
/* harmony export (immutable) */ __webpack_exports__["Audio"] = Audio;


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/*
 * Copyright (C) 2017 Streamax. All Rights Reserved.
 *
 * @author wang dehai <dehai168@gmail.com>
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
class Browser {
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
/* unused harmony export Browser */


/***/ })
/******/ ]);