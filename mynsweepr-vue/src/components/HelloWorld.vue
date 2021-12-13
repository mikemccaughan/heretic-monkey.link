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
    />
    <Board
      v-bind:dimensions="JSON.stringify(size)"
      v-bind:density="density"
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
      cells: [],
    };
  },
  methods: {
    onDifficultyChanged(data) {
      console.log(`difficulty changed to ${JSON.stringify(data)}`);
      this.difficulty = +data.difficulty;
      this.size = data.size;
      this.remaining = +data.remaining;
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
    },
    onBoardBuilt(board) {
      console.log(`board built: ${JSON.stringify(board)}`);
      this.remaining = board.cells.filter((cell) => cell.mine).length;
    },
    onCellReveal(data) {
      console.log(`mynsweepr: cell-reveal`, data);
    },
    onCellRevealNearby(data) {
      console.log(`mynsweepr: cell-reveal-nearby`, data);
    },
    onCellFlag(data) {
      console.log(`mynsweepr: cell-flag`, data);
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
