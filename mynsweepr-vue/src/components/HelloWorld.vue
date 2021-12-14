<template>
  <main class="minesweeper">
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
export default {
  name: "Mynsweepr",
  components: {
    Difficulty,
    Scoreboard,
    Board,
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
      totalMines: 81 / 6,
      remaining: 81 / 6,
      time: "00:00:00",
      timerShouldBeRunning: false,
      cells: [],
      board: "{}",
    };
  },
  methods: {
    onDifficultyChanged(data) {
      console.log(`difficulty changed to ${JSON.stringify(data)}`);
      this.difficulty = +data.difficulty;
      this.size = data.size;
      this.remaining = +data.remaining;
      this.board = JSON.stringify({
        cells: this.cells,
        size: this.size,
        density: this.density,
        remaining: this.remaining,
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
    },
    onBoardBuilt(board) {
      console.log(`board built: ${this.board}`);
      this.cells = board.cells;
      this.remaining = board.cells.filter((cell) => cell.mine).length;
      this.board = JSON.stringify(board);
    },
    lose({ board }) {
      board = this.showAllCells({ board });
      this.timerShouldBeRunning = false;
      console.error("lost");
      return board;
    },
    win({ board }) {
      console.log("won");
      this.timerShouldBeRunning = false;
      return board;
    },
    showAllCells({ board }) {
      board.cells = board.cells.map((cell) => ({ ...cell, hidden: false }));
      return board;
    },
    clearAround({ cell, board }) {
      cell.hidden = false;
      board.cells.splice(cell.index, 1, cell);
      const minX = cell.x === 0 ? 0 : cell.x - 1;
      const maxX = cell.x === this.size.width - 1 ? cell.x : cell.x + 1;
      const minY = cell.y === 0 ? 0 : cell.y - 1;
      const maxY = cell.y === this.size.height - 1 ? cell.y : cell.y + 1;
      for (let x = minX; x < maxX + 1; x++) {
        for (let y = minY; y < maxY + 1; y++) {
          const nextCell = board.cells.find((c) => c.x === x && c.y === y);
          if (nextCell.index !== cell.index && nextCell.hidden) {
            this.showCell({ cell: nextCell, board });
          }
        }
      }
      return board;
    },
    showCell({ cell, board }) {
      if (cell) {
        cell.hidden = false;
        board.cells.splice(cell.index, 1, cell);
        if (cell.flag) {
          cell.flag = false;
          board.cells.splice(cell.index, 1, cell);
        }
        if (cell.nearby === 0) {
          board = this.clearAround({ cell, board });
        }
        if (cell.mine) {
          board = this.lose({ board });
          return board;
        }
        if (this.remaining === 0) {
          board = this.win({ board });
          return board;
        }
      }
      return board;
    },
    onCellReveal(data) {
      console.log(`mynsweepr: cell-reveal`, JSON.stringify(data));
      const cell = JSON.parse(JSON.stringify(data.cell));
      let board = JSON.parse(JSON.stringify(data.board));
      board = this.showCell({ cell, board });
      this.remaining = board.remaining;
      this.board = JSON.stringify(board);
      this.timerShouldBeRunning = true;
    },
    onCellRevealNearby(data) {
      console.log(`mynsweepr: cell-reveal-nearby`, JSON.stringify(data));
      const cell = JSON.parse(JSON.stringify(data.cell));
      let board = JSON.parse(JSON.stringify(data.board));
      board = this.clearAround({ cell, board });
      this.remaining = board.remaining;
      this.timerShouldBeRunning = true;
    },
    onCellFlag(data) {
      console.log(`mynsweepr: cell-flag`, JSON.stringify(data));
      const cell = JSON.parse(JSON.stringify(data.cell));
      let board = JSON.parse(JSON.stringify(data.board));
      if (cell && (cell.flag || cell.hidden)) {
        cell.flag = !cell.flag;
        board.cells.splice(cell.index, 1, cell);
        board.remaining -= 1;
        this.remaining -= 1;
      }
      this.board = JSON.stringify(board);
      this.timerShouldBeRunning = true;
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
