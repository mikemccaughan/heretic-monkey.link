<template>
  <button type="button" :class="classes" v-on="buttonListeners">
    <span class="overlay">&nbsp;</span>
  </button>
</template>
<script>
export default {
  props: {
    cell: String,
    size: Number,
    iconSize: Number,
  },
  data() {
    const cell = JSON.parse(this.$props.cell);
    return {
      index: cell.index,
      value: cell.value,
      x: cell.x,
      y: cell.y,
      nearby: cell.nearby,
      hidden: cell.hidden,
      flag: cell.flag,
      hadOverlay: cell.hadOverlay,
      doubleClickTimeout: null,
    };
  },
  computed: {
    mine() {
      return this.value < 0;
    },
    hasNearby() {
      return !this.hidden && !this.flag && !this.mine;
    },
    showMine() {
      return !this.hidden && !this.flag && this.mine;
    },
    classes() {
      return [
        "cell",
        this.hidden ? "hidden" : "",
        this.flag ? "flag" : "",
        this.hasNearby ? "nearby" : "",
        this.hasNearby ? `nearby-${this.nearby}` : "",
        this.showMine ? "mine" : "",
      ]
        .filter((c) => c.length)
        .join(" ");
    },
    buttonListeners() {
      const vm = this;
      return Object.assign({}, this.$listeners, {
        click: function (e) {
          return vm.click(e);
        },
        dblclick: function (e) {
          return vm.doubleClick(e);
        },
        contextmenu: function (e) {
          return vm.rightClick(e);
        },
      });
    },
  },
  watch: {
    cell(newValue, oldValue) {
      if (newValue !== oldValue) {
        const cell = JSON.parse(newValue);
        Object.entries(cell).forEach(([key, val]) => (this[key] = val));
      }
    },
    hidden(newValue, oldValue) {
      if (newValue !== oldValue) {
        this.$emit("hidden-changed", this.$data);
      }
    },
    flag(newValue, oldValue) {
      if (newValue !== oldValue) {
        this.$emit("flag-changed", this.$data);
      }
    },
  },
  methods: {
    click: function (e) {
      e.preventDefault();
      if (!this.doubleClickTimeout) {
        const that = this;
        this.doubleClickTimeout = setTimeout(() => {
          that.$emit("cell-reveal", that.$data);
          that.doubleClickTimeout = null;
        }, 500);
      }
    },
    doubleClick: function (e) {
      clearTimeout(this.doubleClickTimeout);
      this.doubleClickTimeout = null;
      e.preventDefault();
      this.$emit("cell-reveal-nearby", this.$data);
    },
    rightClick: function (e) {
      e.preventDefault();
      this.$emit("cell-flag", this.$data);
    },
  },
};
</script>
<style scoped>
.cell {
  background-color: #fff;
  border: 1px solid black;
  border-radius: 5px;
  flex: 0 0 auto;
  font-size: var(--size-mine);
  line-height: var(--size-mine);
  height: var(--size-mine);
  width: var(--size-mine);
  cursor: pointer;
  margin: 1px;
  padding: 0;
  outline: none;
}

.cell:active {
  outline: none;
}

.cell .overlay {
  opacity: 0;
  transition: opacity 250ms ease-in;
}

.cell.hidden .overlay {
  display: inline-block;
  height: calc(var(--size-mine) - 2px);
  max-height: calc(var(--size-mine) - 2px);
  width: calc(var(--size-mine) - 2px);
  background-color: lightblue;
  opacity: 1;
  overflow: hidden;
}

.cell.nearby {
  text-align: center;
  font-size: var(--size-icon);
}
.cell.nearby::before {
  display: block;
}
.cell.nearby-1 {
  color: lightblue;
  text-shadow: darkblue -2px 2px;
}
.cell.nearby-1::before {
  content: "1";
}
.cell.nearby-2 {
  color: green;
  text-shadow: darkgreen -2px 2px;
}
.cell.nearby-2::before {
  content: "2";
}
.cell.nearby-3 {
  color: red;
  text-shadow: darkred -2px 2px;
}
.cell.nearby-3::before {
  content: "3";
}
.cell.nearby-4 {
  color: darkblue;
  text-shadow: black -2px 2px;
}
.cell.nearby-4::before {
  content: "4";
}
.cell.nearby-5 {
  color: darkred;
  text-shadow: black -2px 2px;
}
.cell.nearby-5::before {
  content: "5";
}
.cell.nearby-6 {
  color: darkgreen;
  text-shadow: black -2px 2px;
}
.cell.nearby-6::before {
  content: "6";
}
.cell.nearby-7 {
  color: darkmagenta;
  text-shadow: black -2px 2px;
}
.cell.nearby-7::before {
  content: "7";
}
.cell.nearby-8 {
  color: darkorange;
  text-shadow: black -2px 2px;
}
.cell.nearby-8::before {
  content: "8";
}
.cell.blank {
  background-color: white;
}

.cell.mine {
  font-size: calc(var(--size-icon) / 1.5);
}
.cell.mine .overlay::before {
  content: "💣";
  display: block;
  height: 100%;
  width: 100%;
}
.cell.flag .overlay {
  background-color: goldenrod;
  font-size: calc(var(--size-icon) / 2);
}
.cell.flag .overlay::before {
  content: "🚩";
  display: block;
  height: 100%;
  width: 100%;
}
</style>