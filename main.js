"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
var _a, _b;
exports.__esModule = true;
var ethers_1 = require("ethers");
var dotenv = require("dotenv");
var abi_1 = require("./abi");
var axios_1 = require("axios");
dotenv.config();
var Network;
(function (Network) {
    Network[Network["Localhost"] = 0] = "Localhost";
    Network[Network["Goerli"] = 1] = "Goerli";
})(Network || (Network = {}));
var NETWORK_OPTION = Network.Goerli;
var NetworksRPCs = (_a = {},
    _a[Network.Localhost] = process.env.LOCAL_TESTNET_RPC,
    _a[Network.Goerli] = process.env.GOERLI_TESTNET_RPC,
    _a);
var SupportedToken = (_b = {},
    _b[Network.Localhost] = process.env.LOCAL_TOKEN_ADDRESS,
    _b[Network.Goerli] = process.env.GOERLI_TOKEN_ADDRESS,
    _b);
function addressDeposit(address, amount, txHash) {
    return __awaiter(this, void 0, void 0, function () {
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: 
                //api/user?address=0x...
                // change later on, the base url
                return [4 /*yield*/, axios_1["default"].put("http://localhost:3000/api/user?address=".concat(address, "&amount=").concat(amount, "&txHash=").concat(txHash), undefined, { headers: { key: process.env.DEPOSITS_KEY } }).then(function (res) { return __awaiter(_this, void 0, void 0, function () {
                        var state;
                        return __generator(this, function (_a) {
                            state = res.data.state;
                            if (state)
                                console.log("credited ".concat(address, " ").concat(amount, " USDC"));
                            return [2 /*return*/];
                        });
                    }); })["catch"](function (err) {
                        console.log("error accured while crediting", err);
                    })];
                case 1:
                    //api/user?address=0x...
                    // change later on, the base url
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function main() {
    var _this = this;
    // @ts-ignore
    console.log(NetworksRPCs[NETWORK_OPTION]);
    var provider = new ethers_1.ethers.providers.JsonRpcProvider(NetworksRPCs[NETWORK_OPTION]);
    var contract = new ethers_1.ethers.Contract(SupportedToken[NETWORK_OPTION], abi_1.abi, provider);
    contract.on("Transfer", function (from, to, value, event) { return __awaiter(_this, void 0, void 0, function () {
        var transferEvent;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    transferEvent = {
                        from: from,
                        to: to,
                        value: value,
                        eventData: event
                    };
                    if (!(Number(value) >= 1e6)) return [3 /*break*/, 2];
                    console.log("Deposit =>", value);
                    return [4 /*yield*/, addressDeposit(to, value, event.transactionHash)];
                case 1:
                    _a.sent();
                    _a.label = 2;
                case 2:
                    // transfer out deposits
                    console.log(JSON.stringify(transferEvent, null, 4));
                    return [2 /*return*/];
            }
        });
    }); });
}
main();
