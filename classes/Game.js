"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};

const readline_1 = require("readline");
class Game {
    constructor(moves, generator, rules, table) {
        this.results = ['Draw!', 'You Win!', 'You Lose!'];
        this.moves = moves;
        this.generator = generator;
        this.rules = rules;
        this.table = table;
    }
    getRandomMove() {
        return ~~(Math.random() * this.moves.length);
    }
    generateComputerMove() {
        this.key = this.generator.generateKey();
        this.computerMove = this.moves[this.getRandomMove()];
        this.hmac = this.generator.generateHmac(this.key, this.computerMove);
    }
    getUserInput() {
        return __awaiter(this, void 0, void 0, function* () {
            const rl = (0, readline_1.createInterface)({
                input: process.stdin,
                output: process.stdout
            });
            return new Promise((resolve) => {
                rl.question('Enter your move: ', (input) => {
                    rl.close();
                    resolve(input);
                });
            });
        });
    }
    play(userMoveIndex) {
        this.userMove = this.moves[userMoveIndex - 1];
        const winner = this.rules.determineWinner(this.userMove, this.computerMove);
        this.result = this.results[winner];
    }
    playGame() {
        return __awaiter(this, void 0, void 0, function* () {
            this.generateComputerMove();
            while (true) {
                this.displayMenu();
                const userInput = yield this.getUserInput();
                if (userInput === '?') {
                    this.displayHelp();
                    continue;
                }
                const userMoveIndex = parseInt(userInput);
                if (userMoveIndex === 0) {
                    console.log('Exiting the game.');
                    return;
                }
                if (!this.rules.isValidMove(userMoveIndex)) {
                    console.log('Invalid move!');
                    continue;
                }
                this.play(userMoveIndex);
                this.displayResult();
                break;
            }
            yield this.playGame();
        });
    }
    displayMenu() {
        console.log(`HMAC: ${this.hmac}`);
        console.log('Available moves:');
        this.moves.forEach((move, index) => {
            console.log(`${index + 1} - ${move}`);
        });
        console.log('0 - exit');
        console.log('? - help');
    }
    displayResult() {
        console.log(`Your move: ${this.userMove}`);
        console.log(`Computer move: ${this.computerMove}`);
        console.log(this.result);
        console.log(`HMAC key: ${this.key}`);
        console.log();
    }
    displayHelp() {
        this.table.printTable();
    }
}
exports.default = Game;
