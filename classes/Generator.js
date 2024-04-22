"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = require("crypto");
class Generator {
    generateKey() {
        return (0, crypto_1.randomBytes)(32).toString('hex');
    }
    generateHmac(key, data) {
        const hmac = (0, crypto_1.createHmac)('sha256', key);
        hmac.update(data);
        return hmac.digest('hex');
    }
}
exports.default = Generator;
