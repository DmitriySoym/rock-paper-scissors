"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CliTable = require('cli-table');
class Table {
    constructor(moves, rules) {
        this.results = ['Draw', 'Win', 'Lose'];
        this.moves = moves;
        this.rules = rules;
        this.table = this.generateTable();
    }
    generateTable() {
        const table = new CliTable();
        table.push(["v PC\\User >", ...this.moves]);
        this.moves.forEach((userMove) => {
            const row = this.generateRow(userMove);
            table.push(row);
        });
        return table;
    }
    generateRow(userMove) {
        const row = [userMove];
        const cells = this.moves.map((computerMove) => this.generateCell(userMove, computerMove));
        row.push(...cells);
        return row;
    }
    generateCell(userMove, computerMove) {
        const winner = this.rules.determineWinner(userMove, computerMove);
        return this.results[winner];
    }
    printTable() {
        console.log(this.table.toString());
    }
}
exports.default = Table;
