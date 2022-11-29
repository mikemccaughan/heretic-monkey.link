/**
 * Provides methods and properties for controlling a calculator interface
 * implemented in HTML.
 */
class Calculatifier {
  /**
   * Creates an instance of the Calculatifier class.
   * @param {HTMLFormElement} form The Form element of the calculator.
   */
  constructor(form) {
    this.element = form;

    this.historyElement = form.querySelector(".history");

    this.inputElement = form.querySelector("input");
    this.decimalButton = form.querySelector("#decimal");
    this.numberButtons = form.querySelectorAll("button.number");
    this.operatorButtons = form.querySelectorAll("button.op");
    this.memOperatorButtons = form.querySelectorAll("button.mem-op");
    this.mathButtons = form.querySelectorAll("button.math");

    this.inputElement.addEventListener("input", this.inputChanged.bind(this));
    this.decimalButton.addEventListener(
      "click",
      this.decimalClicked.bind(this)
    );
    this.numberButtons.forEach((el) =>
      el.addEventListener("click", this.numberClicked.bind(this))
    );
    this.operatorButtons.forEach((el) =>
      el.addEventListener("click", this.operatorClicked.bind(this))
    );
    this.memOperatorButtons.forEach((el) =>
      el.addEventListener("click", this.memOperatorClicked.bind(this))
    );
    this.mathButtons.forEach((el) =>
      el.addEventListener("click", this.operatorClicked.bind(this))
    );

    this.operatorMap = {
      "%": this.percent.bind(this),
      "/": this.divide.bind(this),
      "×": this.multiply.bind(this),
      "−": this.subtract.bind(this),
      "+": this.add.bind(this),
      "=": this.equals.bind(this),
      "±": this.negate.bind(this),
      "√": this.root.bind(this),
      "𝑥²": this.square.bind(this),
      "⅟𝑥": this.invert.bind(this),
    };

    const memoryHandler = {
      getPrototypeOf(target) {
        // eslint-disable-next-line no-undef
        console.log("getPrototypeOf trap");
        return Object.getPrototypeOf(target);
      },
      setPrototypeOf(target, proto) {
        // eslint-disable-next-line no-undef
        console.log("setPrototypeOf trap");
        return Object.setPrototypeOf(target, proto);
      },
      isExtensible(target) {
        // eslint-disable-next-line no-undef
        console.log("isExtensible trap");
        return Reflect.isExtensible(target);
      },
      preventExtensions(target) {
        // eslint-disable-next-line no-undef
        console.log("preventExtensions trap");
        return Object.preventExtensions(target);
      },
      getOwnPropertyDescriptor(target, prop) {
        // eslint-disable-next-line no-undef
        console.log("getOwnPropertyDescriptor trap");
        return Object.getOwnPropertyDescriptor(target, prop);
      },
      defineProperty(target, key, descriptor) {
        // eslint-disable-next-line no-undef
        console.log("defineProperty trap");
        return Object.defineProperty(target, key, descriptor);
      },
      has(target, key) {
        // eslint-disable-next-line no-undef
        console.log("has trap");
        return key in target;
      },
      get(target, prop, receiver) {
        // eslint-disable-next-line no-undef
        console.log("get trap");
        return Reflect.get(target, prop, receiver);
      },
      set(obj, prop, value) {
        // eslint-disable-next-line no-undef
        console.log("set trap");
        return Reflect.set(obj, prop, value);
      },
      deleteProperty(target, prop) {
        // eslint-disable-next-line no-undef
        console.log("deleteProperty trap");
        return delete target[prop];
      },
    };
    this.memoryBacker = [];
    // eslint-disable-next-line no-undef
    this.memory = new Proxy(this.memoryBacker, memoryHandler);
    this.valueIsTotal = false;
  }
  /**
   * Updates the value of the calculator.
   * @param {string|number} newValue The new formatted value of the calculator
   */
  updateValue(newValue) {
    newValue = String(newValue);
    newValue =
      newValue.length > 1 &&
      newValue.indexOf("0") === 0 &&
      newValue.indexOf(".") !== 1
        ? newValue.slice(1)
        : newValue;
    this.inputElement.type = newValue.slice(-1) === "." ? "text" : "number";
    if (newValue.indexOf(".") > 0 && newValue.length > 2) {
      this.inputElement.step = `0.${"0".repeat(
        newValue.length - newValue.indexOf(".") - 2
      )}1`;
    }
    this.inputElement.value = newValue.length ? newValue : "0";
    this.valueIsTotal = false;
  }
  /**
   * Called when the input is changed by the user.
   * @param {object} e The "input" or "change" event which triggered the call
   * @param {HTMLInputElement} e.target The element whose value changed.
   */
  inputChanged(e) {
    this.updateValue(e.target.value);
  }
  /**
   * Called when the decimal button is clicked.
   */
  decimalClicked() {
    this.updateValue(this.inputElement.value + ".");
  }
  /**
   * Called when a number is clicked
   * @param {object} e The "click" event which triggered the function
   * @param {HTMLButtonElement} e.target The buttonm element clicked
   */
  numberClicked(e) {
    if (this.valueIsTotal) this.inputElement.value = "";
    this.updateValue(this.inputElement.value + e.target.textContent);
  }
  /**
   * Calculates valu percent of prev and returns the result.
   * @param {number} prev The previous value
   * @param {number} valu The percent value
   * @returns {number} The valu percent of prev.
   */
  percent(prev, valu) {
    return prev * (valu / 100);
  }
  /**
   * Divides prev by valu and returns the result.
   * @param {number} prev The dividend
   * @param {number} valu The divisor
   * @returns {number} The quotient
   */
  divide(prev, valu) {
    return prev / valu;
  }
  /**
   * Multiplies prev by valu and returns the result.
   * @param {number} prev The multiplicand
   * @param {number} valu The multiplier
   * @returns {number} The product
   */
  multiply(prev, valu) {
    return prev * valu;
  }
  /**
   * Subtracts valu from prev and returns the result.
   * @param {number} prev The minuend
   * @param {number} valu The subtrahend
   * @returns {number} The difference
   */
  subtract(prev, valu) {
    return prev - valu;
  }
  /**
   * Adds prev and valu and returns the result.
   * @param {number} prev The first addend
   * @param {number} valu The second added
   * @returns {number} The sum
   */
  add(prev, valu) {
    return prev + valu;
  }
  /**
   * Provides a means to normalize the functions of the calculator to take two
   * arguments; the previous value, and the value needed for the function. In this
   * case, we only need the latter.
   * @param {number} prev The previous value
   * @param {number} valu The new value
   * @returns {number} The new value
   */
  equals(prev, valu) {
    return valu;
  }
  /**
   * Returns the new value multiplied by negative one.
   * @param {number} prev The previous value
   * @param {number} valu The new value
   * @returns {number} The new value, as a negative value.
   */
  negate(prev, valu) {
    return -valu;
  }
  /**
   * Gets the nth root of prev, where n is valu, and returns the result.
   * @param {number} prev The radicand value
   * @param {number} valu The index value
   * @returns {number} The "valu-th" root of prev
   */
  root(prev, valu) {
    return valu % 2 === 1 && prev < 0 ? -(Math.abs(prev) ** (1/valu)) : prev ** (1/valu);
  }
  /**
   * Squares the valu and returns the result.
   * @param {number} prev The previous value
   * @param {number} valu The value to square
   * @returns {number} The value of valu multiplied by itself
   */
  square(prev, valu) {
    return valu * valu;
  }
  /**
   * Divides 1 by valu and returns the result (if valu is zero, it will return Infinity).
   * @param {number} prev The previous value
   * @param {number} valu The value to invert
   * @returns {number} The value of dividing one by valu
   */
  invert(prev, valu) {
    return 1 / valu;
  }
  /**
   * Runs through the stack built up in memory, applying the operations
   * defined therein on the values appropriately.
   */
  runStack() {
    const mathOps = Array.from(this.mathButtons).map((el) => el.textContent);
    let nextOp = undefined;
    let prevCur = [0, 0];
    let gotEquals = false;
    this.inputElement.value = this.memory.reduce((acc, cur, idx, arr) => {
      const hasNextMathOp = idx < arr.length - 1 && typeof arr[idx + 1] === "string" && mathOps.includes(arr[idx + 1]);
      const mathOp = this.operatorMap[arr[idx + 1]];
      if (typeof cur === "string") {
        nextOp = this.operatorMap[cur];
        gotEquals = cur === "=";
      } else if (nextOp && hasNextMathOp) {
        prevCur = [acc, cur];
        cur = mathOp.apply(null, prevCur);
        prevCur = [acc, cur];
        acc = nextOp.apply(null, prevCur);
      } else if (nextOp) {
        prevCur = [acc, cur];
        acc = nextOp.apply(null, prevCur);
      } else {
        acc = cur;
      }
      return acc;
    }, 0);
    if (gotEquals) {
      this.memory.length = 0;
    }
  }
  /**
   * Runs when one of the operator buttons is clicked
   * @param {object} e The "click" event that triggered this function
   * @param {HTMLButtonElement} e.target The button clicked
   */
  operatorClicked(e) {
    this.memory.push(parseFloat(this.inputElement.value));
    this.memory.push(e.target.textContent);
    this.valueIsTotal = true;
    if (this.memory.length > 2) {
      // perform operations in memory
      this.runStack();
    }

    this.historyElement.textContent = this.memory.join(" ");
  }
  /**
   * Runs when one of the memory operators is clicked
   * @param {object} e The "click" event that triggered this function
   * @param {HTMLButtonElement} e.target The button clicked
   */
  memOperatorClicked(e) {
    switch (e.target.id) {
      case "c":
        this.memory.length = 0;
        break;
      case "ce":
        this.updateValue(0);
        break;
      case "backspace":
        this.updateValue(
          this.inputElement.value.slice(0, this.inputElement.value.length - 1)
        );
        break;
    }
  }
}

/**
 * Creates a calculator using the Calculatifier class.
 */
(function (w) {
  let init = () => {
    const calc = new Calculatifier(w.document.querySelector("form"));
    const menuToggle = w.document.querySelectorAll("a.toggle");
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    menuToggle.forEach(
      /**
       * Function that is called for each of the elements matched by the ".toggle" selector
       * @param {HTMLAnchorElement} el One of the elements
       * @returns {void} Nothing.
       */
      (el) =>
        el.addEventListener(
          "click",
          /**
           * Handles click events for the anchors that toggle the hamburger menu
           */
          function () {
            if (this.hash === "#toggle-menu") {
              this.nextElementSibling.removeAttribute("inert");
            } else {
              this.closest("ul").setAttribute("inert", "");
            }
          }
        )
    );
  };
  w.onload = init;
  // eslint-disable-next-line no-undef
})(window);
