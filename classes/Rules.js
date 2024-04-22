"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const enums_1 = require("../enums");
class Rules {
    constructor(moves) {
        this.moves = moves;
    }
    isValidMove(move) {
        const moveIndex = parseInt(move.toString());
        return this.isNumeric(moveIndex) && this.isWithinRange(moveIndex);
    }
    isNumeric(value) {
        return !isNaN(value);
    }
    isWithinRange(value) {
        return value >= 1 && value <= this.moves.length;
    }
    determineWinner(userMove, computerMove) {
        const userIndex = this.moves.indexOf(userMove);
        const computerIndex = this.moves.indexOf(computerMove);
        const length = this.moves.length;
        switch (computerIndex) {
            case userIndex:
                return enums_1.Results.Draw;
            case (userIndex + 1) % length:
            case (userIndex + ~~(length / 2)) % length:
                return enums_1.Results.Lose;
            default:
                return enums_1.Results.Win;
        }
    }
}
exports.default = Rules;
