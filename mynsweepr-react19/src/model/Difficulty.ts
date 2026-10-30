import { Utils } from "./Utils";

export class Difficulty {
  #width: number = 9;
  #height: number = 9;
  #divisor: number = 6;
  #value: string = "9";

  constructor(value: string = "9", divisor: number = 6) {
    this.value = value;
    this.#divisor = divisor ?? 6;
  }

  get width(): number {
    return this.#width;
  }
  set width(value: number) {
    this.#width = value;
  }

  get height(): number {
    return this.#height;
  }
  set height(value: number) {
    this.#height = value;
  }

  get value(): string {
    return this.#value;
  }
  set value(value: string) {
    this.#value = value;
    this.setSizeByValue(value);
  }

  get mines(): number {
    if (
      Utils.isGood(this.width, 0, 30) &&
      Utils.isGood(this.height, 0, 30) &&
      Utils.isGood(this.#divisor, 1, this.width * this.height)
    ) {
      return Math.ceil((this.width * this.height) / this.#divisor);
    } else {
      console.warn(`Attempt to get mines before width, height, and divisor were set`);
      return 0;
    }
  }

  setSizeByValue(value: string) {
    switch (value) {
      case "9":
        this.width = 9;
        this.height = 9;
        break;
      case "16":
        this.width = 16;
        this.height = 16;
        break;
      case "30":
        this.width = 30;
        this.height = 16;
        break;
      case "?":
        this.width = 0;
        this.height = 0;
        break;
    }
  }

  static Easy: Difficulty = new Difficulty("9");
  static Medium: Difficulty = new Difficulty("16");
  static Hard: Difficulty = new Difficulty("30");
  static Custom: Difficulty = new Difficulty("?");
  static All: Difficulty[] = [
    Difficulty.Easy,
    Difficulty.Medium,
    Difficulty.Hard,
    Difficulty.Custom,
  ];
}
