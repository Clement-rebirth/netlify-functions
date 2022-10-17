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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const axios_1 = __importDefault(require("axios"));
const handler = (event) => __awaiter(void 0, void 0, void 0, function* () {
    if (!event.queryStringParameters)
        throw new Error('Missing query parameters');
    const { lat, long, lang } = event.queryStringParameters;
    const API_KEY = process.env.API_KEY;
    // forecast for 5 days with 3 hours step
    const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&appid=${API_KEY}&lang=${lang}`;
    try {
        const { data } = yield axios_1.default.get(url);
        return {
            statusCode: 200,
            body: JSON.stringify(data),
        };
    }
    catch (error) {
        // check if the error was thrown from axios
        if (axios_1.default.isAxiosError(error)) {
            const { status, message, code } = error;
            if (!status) {
                throw new Error('No status returned');
            }
            return {
                statusCode: status,
                body: JSON.stringify({ status, message, code }),
            };
        }
        const status = 500;
        const message = 'Not axios error';
        return {
            statusCode: status,
            body: JSON.stringify({ status, message }),
        };
    }
});
exports.handler = handler;
