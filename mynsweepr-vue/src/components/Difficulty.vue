<template>
  <fieldset class="fieldset">
    <legend class="legend">Select a Difficulty</legend>
    <div class="form-group radio">
      <input
        type="radio"
        id="easy"
        name="difficulty"
        value="9"
        v-model="difficulty"
        @change="setDifficulty"
      />
      <label for="easy">Easy (9x9)</label>
    </div>
    <div class="form-group radio">
      <input
        type="radio"
        id="medium"
        name="difficulty"
        value="16"
        v-model="difficulty"
        @change="setDifficulty"
      />
      <label for="medium">Medium (16x16)</label>
    </div>
    <div class="form-group radio">
      <input
        type="radio"
        id="hard"
        name="difficulty"
        value="30"
        v-model="difficulty"
        @change="setDifficulty"
      />
      <label for="hard">Hard (30x16)</label>
    </div>
    <div class="form-group radio">
      <input
        type="radio"
        id="custom"
        name="difficulty"
        value="-1"
        v-model="difficulty"
        @change="setDifficulty"
      />
      <label for="custom"
        >Custom (<input
          type="number"
          id="difficulty-width"
          class="custom-unit"
          step="1"
          value="30"
          size="3"
          :disabled="customDisabled"
          v-model="size.width"
          @change="widthOrHeightChanged"
        />x<input
          type="number"
          id="difficulty-height"
          class="custom-unit"
          step="1"
          value="16"
          size="3"
          :disabled="customDisabled"
          v-model="size.height"
          @change="widthOrHeightChanged"
        />)</label
      >
    </div>
  </fieldset>
</template>
<script>
export default {
  name: "Difficulty",
  props: {},
  data() {
    return {
      difficulty: 9,
      size: {
        width: 9,
        height: 9,
      },
      customDisabled: true,
      mineSize: 40,
    };
  },
  mounted() {
    this.setDifficulty();
  },
  methods: {
    setDifficulty() {
      this.difficulty = +this.difficulty;
      console.log(`setting difficulty to ${this.difficulty}`);
      switch (this.difficulty) {
        case 9:
          this.size.width = 9;
          this.size.height = 9;
          break;
        case 16:
          this.size.width = 16;
          this.size.height = 16;
          break;
        case 30:
          this.size.width = 30;
          this.size.height = 16;
          break;
        case -1:
          this.customDisabled = false;
          break;
        default:
          break;
      }
      this.mineSize = Math.max(
        Math.min(
          (window.innerHeight - 160) / this.size.height,
          (window.innerWidth - 160) / this.size.width
        ),
        18
      );
      this.$nextTick(() => {
        this.$emit("difficulty-changed", this.$data);
      });
    },
    widthOrHeightChanged() {
      this.$nextTick(() => {
        this.$emit("difficulty-changed", this.$data);
      });
    },
  },
};
</script>
<style scoped>
.fieldset {
  border: 1px solid black;
  display: flex;
  flex-flow: row wrap;
  align-items: baseline;
  justify-content: center;
  position: relative;
  padding: 0.5rem 1rem;
  margin-top: 1rem;
}

.legend {
  background-color: #fff;
  flex: none;
  font-size: smaller;
  font-weight: 700;
  position: absolute;
  top: -0.5rem;
  left: 1rem;
  padding: 0 4px;
}

.radio {
  flex: 0 0 auto;
  padding: 0 1rem;
}

.custom-unit {
  width: 3rem;
}
</style>