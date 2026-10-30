import { Utils } from "./Utils";

export class Timer {
  #elapsedMs: number = 0;
  #timerId: number = -1;
  #startMs: number = 0;
  #onTick: (elapsedMs: number) => void | undefined;

  constructor(elapsedMs: number = 0, onTick: (elapsedMs: number) => void) {
    this.#elapsedMs = elapsedMs;
    this.#onTick = onTick;
  }

  get elapsedMs(): number {
    return this.#elapsedMs;
  }
  set elapsedMs(value: number) {
    this.#elapsedMs = value;
  }

  get onTick(): (elapsedMs: number) => void | undefined {
    return this.#onTick;
  }
  set onTick(value: (elapsedMs: number) => void) {
    this.#onTick = value;
  }

  start() {
    this.#startMs = Date.now() + this.#elapsedMs;
    this.#elapsedMs = Date.now() - this.#startMs;
    this.#timerId = Utils.setTimeout(this.update, 100);
  }
  stop() {
    clearTimeout(this.#timerId);
    this.#timerId = -1;
    this.#elapsedMs = 0;
  }
  private update() {
    this.#elapsedMs = Date.now() - this.#startMs;
    if (Utils.isFunction(this.#onTick)) {
      this.#onTick(this.elapsedMs);
    }
  }
}
