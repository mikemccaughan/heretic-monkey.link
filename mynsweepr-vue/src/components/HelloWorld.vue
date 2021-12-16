<template>
  <main class="minesweeper">
    <Processing v-bind:isProcessing="isProcessing"/>
    <Difficulty
      v-bind:difficulty="difficulty"
      v-bind:size="size"
      v-on:difficulty-changed="onDifficultyChanged"
    />
    <Scoreboard
      v-bind:total-mines="totalMines"
      v-bind:remaining="remaining"
      v-bind:time="time"
      v-bind:shouldBeStarted="timerShouldBeRunning"
    />
    <Board
      v-bind:dimensions="JSON.stringify(size)"
      v-bind:density="density"
      v-bind:board="board"
      v-on:board-built="onBoardBuilt"
      v-on:cell-reveal="onCellReveal"
      v-on:cell-reveal-nearby="onCellRevealNearby"
      v-on:cell-flag="onCellFlag"
    >
    </Board>
  </main>
</template>

<script>
import Difficulty from "./Difficulty.vue";
import Scoreboard from "./Scoreboard.vue";
import Board from "./Board.vue";
import Processing from "./Processing.vue";
export default {
  name: "Mynsweepr",
  components: {
    Difficulty,
    Scoreboard,
    Board,
    Processing,
  },
  props: {
    msg: String,
  },
  data() {
    return {
      difficulty: 9,
      size: {
        width: 9,
        height: 9,
      },
      density: 1 / 6,
      totalMines: Math.floor(81 / 6),
      remaining: Math.floor(81 / 6),
      time: "00:00:00",
      timerShouldBeRunning: false,
      cells: [],
      board: "{}",
      isProcessing: false,
    };
  },
  methods: {
    onDifficultyChanged(data) {
      console.log(`difficulty changed to ${JSON.stringify(data)}`);
      this.isProcessing = true;
      this.difficulty = +data.difficulty;
      this.size = data.size;
      this.remaining = Math.floor(
        data.size.height * data.size.width * this.density
      );
      this.board = JSON.stringify({
        cells: this.cells.sort((a, b) => a.index - b.index),
        size: this.size,
        density: this.density,
      });
      this.totalMines = Math.floor(
        data.size.width * data.size.height * this.density
      );
      const docEl = document.documentElement;
      docEl.style.setProperty("--size-mine", `${data.mineSize}px`);
      docEl.style.setProperty("--size-icon", `${data.mineSize - 12}px`);
      docEl.style.setProperty("--column-count", `${data.size.width}`);
      docEl.style.setProperty("--row-count", `${data.size.height}`);
      const mineEl = document.querySelector(".minesweeper");
      mineEl.style.width = `${(data.mineSize + 2) * data.size.width}px`;
      mineEl.style.height = `${(data.mineSize + 2) * data.size.height}px`;
      this.timerShouldBeRunning = false;
      this.isProcessing = false;
    },
    onBoardBuilding() {
      this.isProcessing = true;
    },
    onBoardBuilt(board) {
      console.log(`board built: ${this.board}`);
      this.cells = board.cells.sort((a, b) => a.index - b.index);
      this.remaining = board.remaining;
      this.board = JSON.stringify(board);
      this.isProcessing = false;
    },
    lose({ board }) {
      board = this.showAllCells({ board });
      this.cells = board.cells.sort((a, b) => a.index - b.index);
      this.remaining = board.remaining;
      this.timerShouldBeRunning = false;
      console.error("lost");
      return board;
    },
    win({ board }) {
      console.log("won");
      this.cells = board.cells.sort((a, b) => a.index - b.index);
      this.remaining = 0;
      this.timerShouldBeRunning = false;
      return board;
    },
    showAllCells({ board }) {
      board.cells = board.cells.map((cell) => ({ ...cell, hidden: false }));
      return board;
    },
    clearAround({ cell, board }, showMines = false) {
      cell.hidden = false;
      board.cells.splice(cell.index, 1, cell);
      const alteredCells = [];
      const minX = cell.x === 0 ? 0 : cell.x - 1;
      const maxX = cell.x === this.size.width - 1 ? cell.x : cell.x + 1;
      const minY = cell.y === 0 ? 0 : cell.y - 1;
      const maxY = cell.y === this.size.height - 1 ? cell.y : cell.y + 1;
      for (let x = minX; x < maxX + 1; x++) {
        for (let y = minY; y < maxY + 1; y++) {
          const nextCell = board.cells.find((c) => c.x === x && c.y === y);
          console.log(`minesweeper: clearAround: examining cell at index ${nextCell.index}:\n* is it not the cell we started on? ${nextCell.index !== cell.index}\n* is it hidden? ${nextCell.hidden}\n* is it not a mine? ${!nextCell.mine}\n* are we not showing mines? ${!showMines}\n* is it not flagged? ${!nextCell.flag}`);
          if (
            nextCell.index !== cell.index &&
            nextCell.hidden &&
            (!nextCell.mine || showMines) &&
            (!nextCell.flag || showMines)
          ) {
            console.log(`minesweeper: clearAround: showing cell at index ${nextCell.index}`);
            board = this.showCell({ cell: nextCell, board });
            alteredCells.push(board.cells.find(c => c.index === nextCell.index));
          }
        }
      }
      board.cells = board.cells.sort((a, b) => a.index - b.index);
      this.cells = board.cells;
      console.log(`altered cells: ${JSON.stringify(this.cells.filter(c => alteredCells.some(a => a.index === c.index)))}`);
      return board;
    },
    updateBoard(board) {
      if (
        !Reflect.has(board, "remaining") &&
        Reflect.defineProperty(board, "remaining", {
          get() {
            console.log(`getting remaining, which is the count of mines: ${this.cells.filter(cell => cell.mine && cell.hidden).length} minus the number of flagged cells: ${this.cells.filter(cell => cell.flag).length}`);
            return this.cells.filter(cell => cell.mine && cell.hidden).length - this.cells.filter(cell => cell.flag).length;
          },
        })
      ) {
        return board;
      }

      return board;
    },
    updateCell(cell) {
      if (
        !Reflect.has(cell, "mine") &&
        Reflect.defineProperty(cell, "mine", {
          get() {
            return this.value < 0;
          },
        })
      ) {
        return cell;
      }

      return cell;
    },
    showCell({ cell, board }) {
      if (cell) {
        const hadFlag = cell.flag;
        cell.hidden = hadFlag || false;
        board.cells.splice(cell.index, 1, cell);
        if (cell.flag) {
          cell.flag = false;
          board.cells.splice(cell.index, 1, cell);
        }
        if (cell.nearby === 0) {
          board = this.clearAround({ cell, board });
        }
        if (cell.mine && !hadFlag) {
          board = this.lose({ board });
          return board;
        }
        if (board.remaining === 0) {
          board = this.win({ board });
          return board;
        }
      }
      return board;
    },
    boardReviver(key, value) {
      if (key === "cells") {
        value = value.map((cell) => this.updateCell(cell));
      }
      return value;
    },
    boardReplacer(key, value) {
      if (key === "doubleClickTimeout") {
        return undefined;
      }
      return value;
    },
    onCellReveal(data) {
      console.log(`mynsweepr: cell-reveal`, JSON.stringify(data));
      this.isProcessing = true;
      const cell = this.updateCell(JSON.parse(JSON.stringify(data.cell, this.boardReplacer)));
      const reviver = this.boardReviver.bind(this);
      let board = this.updateBoard(
        JSON.parse(JSON.stringify(data.board, this.boardReplacer), reviver)
      );
      board = this.showCell({ cell, board });
      this.remaining = board.remaining;
      this.board = JSON.stringify(board, this.boardReplacer);
      this.timerShouldBeRunning = true;
      this.isProcessing = false;
    },
    onCellRevealNearby(data) {
      console.log(`mynsweepr: cell-reveal-nearby`, JSON.stringify(data));
      this.isProcessing = true;
      const cell = this.updateCell(JSON.parse(JSON.stringify(data.cell, this.boardReplacer)));
      const reviver = this.boardReviver.bind(this);
      let board = this.updateBoard(
        JSON.parse(JSON.stringify(data.board, this.boardReplacer), reviver)
      );
      board = this.clearAround({ cell, board });
      this.remaining = board.remaining;
      this.board = JSON.stringify(board, this.boardReplacer);
      this.timerShouldBeRunning = true;
      this.isProcessing = false;
    },
    onCellFlag(data) {
      console.log(`mynsweepr: cell-flag`, JSON.stringify(data));
      this.isProcessing = true;
      const cell = this.updateCell(JSON.parse(JSON.stringify(data.cell, this.boardReplacer)));
      const reviver = this.boardReviver.bind(this);
      let board = this.updateBoard(
        JSON.parse(JSON.stringify(data.board, this.boardReplacer), reviver)
      );
      if (cell && !cell.hidden) {
        console.warn(`attempt made to flag unhidden cell at index ${cell.index}`);
      }
      if (cell && cell.hidden) {
        cell.flag = !cell.flag;
        board.cells.splice(cell.index, 1, cell);
        this.remaining = cell.flag ? this.remaining - 1 : this.remaining + 1;
      }
      this.board = JSON.stringify(board, this.boardReplacer);
      this.timerShouldBeRunning = true;
      this.isProcessing = false;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
:root {
  --size-mine: 40px;
  --size-icon: calc(var(--size-mine) - 12px);
}
.minesweeper {
  margin: 0 auto;
}
* {
  box-sizing: border-box;
}

html {
  height: 100vh;
  max-height: 100vh;
}

body {
  font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
    "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
}
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
