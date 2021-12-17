<template>
  <div class="scoreboard">
    <span class="scoreboard-unit">
      <span class="icon clock">⏱</span>
      <span class="timer" v-text="time"></span>
    </span>
    <span class="scoreboard-unit">
      <span class="icon mine">💣</span>
      <span class="count" v-text="remainingMines"></span>
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
    shouldBeStarted: {
      type: Boolean,
      default: false,
    },
    remaining: {
      type: Number,
      default: 13,
    },
  },
  watch: {
    totalMines(newValue, oldValue) {
      console.log(`totalMines changed from ${oldValue} to ${newValue}`);
      if (newValue !== oldValue) {
        this.updateRemaining(newValue);
      }
    },
    shouldBeStarted(newValue, oldValue) {
      console.log(`shouldBeStarted changed from ${oldValue} to ${newValue}`);
      if (newValue !== oldValue) {
        if (newValue) {
          this.startTimer();
        } else {
          this.stopTimer();
        }
      }
    },
    remaining(newValue, oldValue) {
      console.log(`remaining changed from ${oldValue} to ${newValue}`);
      if (newValue !== oldValue) {
        this.updateRemaining(newValue);
      }
    },
  },
  data() {
    return {
      timer: 0,
      timeStart: null,
      time: "00:00:00",
      remainingMines: this.$props.remaining,
      initialLoad: true,
    };
  },
  methods: {
    startTimer() {
      if (this.timer) {
        return;
      }
      this.time = "00:00:00";
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
    stopTimer() {
      if (!this.timer) {
        return;
      }
      clearInterval(this.timer);
      this.timeStart = null;
      this.timer = null;
    },
    updateRemaining(value) {
      if (this.remainingMines !== value) {
        this.remainingMines = value;
        this.$emit("remaining-changed", this.remainingMines);
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