<template>
  <dialog :id="id" :class="klasses">
    <header class="dialog-header">
      <slot name="header"></slot>
      <button type="button" v-if="hasClose" class="close" @click="close()">
        ✖
      </button>
    </header>
    <main class="dialog-content">
      <slot></slot>
    </main>
    <footer class="dialog-footer">
      <slot name="footer"></slot>
    </footer>
  </dialog>
</template>
<style scoped>
* {
  box-sizing: border-box;
}
.dialog {
  display: flex;
  flex-flow: column nowrap;
  padding: 0;
  display: none;
}
.dialog.show {
  display: initial;
}
.dialog-header,
.dialog-footer {
  border: 1px none silver;
  padding: 0.75em 1em;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}
.dialog-header {
  border-bottom-style: solid;
}
.dialog-header .close {
  background: transparent;
  border-style: none;
  border-radius: 0;
  justify-self: flex-end;
}
.dialog-content {
  flex-grow: 1;
  padding: 1em;
}
.dialog-footer {
  border-top-style: solid;
  justify-content: flex-end;
}
</style>
<script>
export default {
  props: {
    id: String,
    classes: String,
    hasClose: Boolean,
    shouldBeOpened: Boolean,
    shouldBeClosed: Boolean,
  },
  watch: {
    shouldBeOpened(newValue) {
      if (newValue) {
        this.open();
      }
    },
    shouldBeClosed(newValue) {
      if (newValue) {
        this.close();
      }
    },
  },
  data() {
    return {
      isOpen: false,
    };
  },
  computed: {
    klasses() {
      let arr =
        this.$props.classes?.split(" ")?.filter((s) => s && s.length) ?? [];
      arr = [...arr, "dialog"];
      if (this.isOpen) {
        arr.push("show");
      }
      return arr.join(" ");
    },
    dialog() {
      return document.querySelector(`#${this.id}`);
    },
  },
  mounted() {
    this.dialog.open = true;
    if (this.isOpen && !this.dialog.open) {
      this.open();
    }
    if (!this.isOpen && this.dialog.open) {
      this.close();
    }
  },
  methods: {
    close() {
      this.isOpen = false;
      this.dialog.close();
      this.$emit(`dialog-closed`, this.dialog);
    },
    open() {
      this.isOpen = true;
      this.dialog.showModal();
      this.$emit(`dialog-open`, this.dialog);
    },
  },
};
</script>