<template>
  <button
    type="button"
    class="cell hidden"
    v-on:click="click"
    v-on:dblclick="doubleClick"
    v-on:contextmenu="rightClick"
  >
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
      get mine() {
        return this.value < 0;
      },
      hidden: cell.hidden,
      flag: cell.flag,
      hadOverlay: cell.hadOverlay,
    };
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
        console.log('cell: click', e);
      e.preventDefault();
      this.$emit("cell-reveal", this.$data);
    },
    doubleClick: function (e) {
        console.log('cell: doubleClick', e);
      e.preventDefault();
      this.$emit("cell-reveal-nearby", this.$data);
    },
    rightClick: function (e) {
        console.log('cell: rightClick', e);
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

.cell.nearby-1 {
  color: lightblue;
  text-shadow: darkblue -2px 2px;
}

.cell.nearby-2 {
  color: green;
  text-shadow: darkgreen -2px 2px;
}

.cell.nearby-3 {
  color: red;
  text-shadow: darkred -2px 2px;
}

.cell.nearby-4 {
  color: darkblue;
  text-shadow: black -2px 2px;
}

.cell.nearby-5 {
  color: darkred;
  text-shadow: black -2px 2px;
}

.cell.nearby-6 {
  color: darkgreen;
  text-shadow: black -2px 2px;
}

.cell.nearby-7 {
  color: darkmagenta;
  text-shadow: black -2px 2px;
}

.cell.nearby-8 {
  color: darkorange;
  text-shadow: black -2px 2px;
}

.cell.blank {
  background-color: white;
}

.cell.mine {
  font-size: var(--size-icon);
}

.cell.flag .overlay {
  background-color: goldenrod;
  font-size: calc(var(--size-icon) / 2);
}
</style>