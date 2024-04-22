"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateArguments = void 0;
function validateArguments(args) {
    const { length } = args;
    const isError = length < 3 || length % 2 === 0 || new Set(args).size !== length;
    if (isError) {
        console.error("Invalid number of arguments! Set odd number of moves.");
        console.log('Example: node index.js rock paper scissors');
    }
    return !isError;
}
exports.validateArguments = validateArguments;
