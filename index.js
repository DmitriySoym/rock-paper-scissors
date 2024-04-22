"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Generator = require("./classes/Generator");
const Rules = require("./classes/Rules");
const Table = require("./classes/Table");
const Game = require("./classes/Game");
const utils = require("./utils");
const args = process.argv.slice(2);
function main(args) {
    if ((0, utils.validateArguments)(args)) {
        const moves = args;
        const generator = new Generator.default();
        const rules = new Rules.default(moves);
        const table = new Table.default(moves, rules);
        const game = new Game.default(moves, generator, rules, table);
        game.playGame();
    }
}
main(args);
