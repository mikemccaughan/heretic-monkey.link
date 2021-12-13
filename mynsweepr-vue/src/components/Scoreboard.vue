<template>
  <div class="scoreboard">
    <span class="scoreboard-unit">
      <span class="icon clock">⏱</span>
      <span class="timer" v-text="time"></span>
    </span>
    <span class="scoreboard-unit">
      <span class="icon mine">💣</span>
      <span class="count" v-text="remaining"></span>
    </span>
  </div>
</template>
<script>
const timeFormat = new Intl.DateTimeFormat([], {
  hour: "2-digit",
  hour12: false,
  hourCycle: "h23",
  minute: "2-digit",
  second: "2-digit",
  timeZone: "UTC",
});
export default {
  name: "Scoreboard",
  props: {
    totalMines: {
      type: Number,
      default: 0,
    },
  },
  watch: {
    totalMines(newValue, oldValue) {
      console.log(`totalMines changed from ${oldValue} to ${newValue}`);
      if (newValue !== oldValue) {
        this.start();
        this.updateRemaining(newValue);
      }
    },
  },
  data() {
    return {
      timer: 0,
      timeStart: null,
      time: "00:00:00",
      remaining: 0,
      initialLoad: true,
    };
  },
  methods: {
    start() {
      if (this.initialLoad) {
        console.log("initial load: not setting timer");
        this.initialLoad = false;
        return;
      }
      if (this.timer) {
        clearInterval(this.timer);
        this.timeStart = null;
      }
      this.timer = setInterval(() => {
        this.timeStart = this.timeStart ?? Date.now();
        const elapsed = Date.now() - this.timeStart;
        const elapsedDate = new Date(elapsed);
        this.time = timeFormat
          .formatToParts(elapsedDate)
          .filter((p) => !["dayPeriod", "literal"].includes(p.type))
          .sort((a, b) => a.type.localeCompare(b.type))
          .map((p) => p.value)
          .join(":")
          .replace(/^24/, "00");
        this.$emit("time-changed", this.time);
      }, 1000);
    },
    updateRemaining(value) {
      if (this.remaining !== value) {
        this.remaining = value;
        this.$emit("remaining-changed", this.remaining);
      }
    },
  },
};
</script>
<style scoped>
.scoreboard {
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    margin: 1rem auto;
}

.scoreboard-unit {
    margin: 0 0.5rem;
}
</style>