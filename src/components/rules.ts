// rules
// any live cell with fewer than two live neighbours dies, as if caused by under population
// Any live cell with two or three live neighbours ilves on to the next generation.
// Any live cell with more than three live neighbours dis, as if by overcrowding
// Any dead cell exactly three live neighbours becomes a live cell, as if by reproduction
import {COLMAX, ROWMAX} from "../app";

export class GameOfLife {
    currentGrid: boolean[][];
    nextGrid: boolean[][];
    rowSize = ROWMAX;
    colSize = COLMAX;

    constructor(grid: boolean[][]) {
        this.currentGrid = grid;
        this.nextGrid = grid
        console.log('constructor run')
    }

    neighborCount(row: number, col: number) {
        const leftCol = (col === 0) ? this.colSize - 1 : col - 1;
        const rightCol = (col === this.colSize - 1) ? 0 : col + 1;
        const topRow = (row === 0) ? this.rowSize - 1 : row - 1;
        const bottomRow = (row === this.rowSize - 1) ? 0 : row + 1;
        const OneOrZero = (r: number, c: number) => {
            return this.currentGrid[r][c] ? 1 : 0
        }

        const count = OneOrZero(topRow, rightCol) +
            OneOrZero(row, rightCol) +
            OneOrZero(bottomRow, rightCol) +
            OneOrZero(topRow, col) +
            OneOrZero(bottomRow, col) +
            OneOrZero(topRow, leftCol) +
            OneOrZero(row, leftCol) +
            OneOrZero(bottomRow, leftCol);
        return count;


    }

    applyRules(row: number, col: number) {
        const neighbor = this.neighborCount(row, col)
        if (this.currentGrid[row][col]) {
            //currently live
            if (neighbor > 1 && neighbor < 4) {
                return true
            } else {
                return false
            }

        } else {
            // currently dead
            if (neighbor === 3) {
                return true
            } else {
                return false
            }

        }
    }


    computeNextGrid(grid: boolean[][]) {
        this.currentGrid = grid;

        for (let x = 0; x < this.rowSize; x++) {
            for (let y = 0; y < this.colSize; y++) {
                this.nextGrid[x][y] = this.applyRules(x, y)
            }
        }
        return this.nextGrid
    }

}
