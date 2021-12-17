<template>
  <div class="board">
    <Cell
      v-for="cell in cellsForWidth"
      :cell="JSON.stringify(cell)"
      :key="cell.index"
      @cell-reveal="onCellReveal"
      @cell-reveal-nearby="onCellRevealNearby"
      @cell-flag="onCellFlag"
    >
    </Cell>
  </div>
</template>
<script>
import Cell from "./Cell.vue";
export default {
  name: "Board",
  data() {
    return {
      cells: [],
      size: {
        width: 9,
        height: 9,
      },
      density: 1 / 6,
    };
  },
  props: {
    dimensions: {
      type: String,
      default: '{"width":9,"height":9}',
    },
    board: {
      type: String,
      default: "{}",
    },
    needsRebuild: {
      type: Boolean,
      default: false,
    }
  },
  watch: {
    dimensions(newValue, oldValue) {
      console.log(`Board: dimensions changed from "${oldValue}" to "${newValue}"`);
      if (newValue !== oldValue) {
        this.load();
      }
    },
    board(newValue, oldValue) {
      console.log(`Board: board changed from "${oldValue}" to "${newValue}"`);
      const currentBoard = JSON.stringify(this.$data);
      if (newValue != oldValue && newValue !== currentBoard) {
        const board = JSON.parse(newValue);
        this.cells = board.cells;
        this.size = board.size;
        this.density = board.density;
      }
    },
    needsRebuild(newValue, oldValue) {
      console.log(`Board: needsRebuild changed from "${oldValue}" to "${newValue}"`);
      if (newValue !== oldValue && newValue) {
        this.load();
      }
    },
  },
  computed: {
    cellsForWidth() {
      return this.cells;
    },
    remaining() {
      return this.cells.filter(cell => cell.mine && cell.hidden && !cell.flag).length - this.cells.filter(cell => cell.flag).length;
    },
  },
  components: { Cell },
  created() {
    this.load();
  },
  methods: {
    load() {
      this.$emit('board-building');
      this.size = JSON.parse(this.$props.dimensions);
      const mineCount = this.size.width * this.size.height * this.density;
      const isBetween = function (value, min, max) {
        return value >= min && value <= max;
      };
      const boardCells = [];
      for (let y = 0; y < this.size.height; y++) {
        boardCells[y] = [];
        for (let x = 0; x < this.size.width; x++) {
          boardCells[y][x] = 0;
        }
      }

      const value = -(mineCount * 2);
      for (let i = 0; i < mineCount; i++) {
        let x, y;
        while (true) {
          x = Math.floor(Math.random() * this.size.width);
          y = Math.floor(Math.random() * this.size.height);
          if (0 <= boardCells[y][x]) {
            break;
          }
        }
        for (let m = -1; m < 2; m++) {
          for (let n = -1; n < 2; n++) {
            if (n === 0 && m === 0) {
              boardCells[y][x] = value;
            } else if (
              isBetween(y + n, 0, this.size.height - 1) &&
              isBetween(x + m, 0, this.size.width - 1)
            ) {
              boardCells[y + n][x + m]++;
            }
          }
        }
      }
      this.cells.splice(0, this.cells.length);
      let index = 0;
      for (let y = 0; y < this.size.height; y++) {
        for (let x = 0; x < this.size.width; x++) {
          const i = index;
          this.cells[index++] = {
            value: boardCells[y][x],
            nearby: boardCells[y][x] >= 0 ? boardCells[y][x] : 0,
            x: x,
            y: y,
            index: i,
            hidden: true,
            flag: false,
            hadOverlay: false,
          };
        }
      }
      this.$emit(`board-built`, this.$data);
    },
    onCellReveal(cell) {
      console.log("board: onCellReveal", JSON.stringify(cell));
      this.$emit("cell-reveal", { board: this.$data, cell });
    },
    onCellRevealNearby(cell) {
      console.log("board: oonCellRevealNearby", JSON.stringify(cell));
      this.$emit("cell-reveal-nearby", { board: this.$data, cell });
    },
    onCellFlag(cell) {
      console.log("board: onCellFlag", JSON.stringify(cell));
      this.$emit("cell-flag", { board: this.$data, cell });
    },
  },
};
</script>
<style scoped>
.board {
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(var(--column-count), 1fr);
  grid-template-rows: repeat(var(--row-count), auto);
  justify-content: space-around;
  align-items: center;
  align-content: center;
  background-color: gray;
  position: relative;
}
</style>