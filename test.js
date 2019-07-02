"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
exports.__esModule = true;
var dotenv_1 = require("dotenv");
var path = require("path");
var cross_fetch_1 = require("cross-fetch");
var ENV_FILE = path.join(__dirname, '.env');
var loadFromEnv = dotenv_1.config({ path: ENV_FILE });
function getNavtechCodeUrl() {
    return __awaiter(this, void 0, void 0, function () {
        var params, url, res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    params = {
                        client_id: process.env.navtechClientId,
                        redirect_uri: process.env.navtechCallbackUrl,
                        response_type: 'code'
                    };
                    console.log(params);
                    url = new URL(process.env.navtechCallbackUrl + "OAuth/Authorize");
                    Object.keys(params).forEach(function (key) { return url.searchParams.append(key, params[key]); });
                    return [4 /*yield*/, cross_fetch_1["default"](url.href, { method: 'GET' })];
                case 1:
                    res = _a.sent();
                    return [2 /*return*/, res];
            }
        });
    });
}
exports.getNavtechCodeUrl = getNavtechCodeUrl;
function getNavtechToken(code) {
    return __awaiter(this, void 0, void 0, function () {
        var url, options, res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    url = new URL(process.env.navtechCallbackUrl + "api/token");
                    options = {
                        form: {
                            client_id: process.env.navtechClientId,
                            client_secret: process.env.navtechClientSecret,
                            code: code,
                            grant_type: 'authorization_code',
                            redirect_ui: process.env.navtechCallbackUrl
                        },
                        headers: { 'content-type': 'application/x-www-form-urlencoded' },
                        method: 'POST'
                    };
                    console.log(options);
                    return [4 /*yield*/, cross_fetch_1["default"](url.href, options)];
                case 1:
                    res = _a.sent();
                    console.log('res', res);
                    return [2 /*return*/, res];
            }
        });
    });
}
exports.getNavtechToken = getNavtechToken;
var test = function () { return __awaiter(_this, void 0, void 0, function () {
    var codeUrlString, code, tokenResponse;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, getNavtechCodeUrl()];
            case 1:
                codeUrlString = (_a.sent()).url;
                code = (new URL(codeUrlString).searchParams.get('code'));
                if (!code) return [3 /*break*/, 3];
                console.log('code', code);
                return [4 /*yield*/, getNavtechToken(code)];
            case 2:
                tokenResponse = _a.sent();
                console.log('token res', tokenResponse);
                _a.label = 3;
            case 3: return [2 /*return*/];
        }
    });
}); };
test();
