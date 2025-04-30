// @ts-nocheck
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

    if (this.inputElement === null) {
      throw new Error("No input element found in the form.");
    }
    if (this.decimalButton === null) {
      throw new Error("No decimal button found in the form.");
    }

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

    /** @type {{
     *   [operator: string]: (prev: number, valu: number) => number
     *  }} */
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
      /** 
        @param {any} target The object that references the prototype 
        @returns {any} The prototype of the target object
      */
      getPrototypeOf(target) {
        // eslint-disable-next-line no-undef
        console.log("getPrototypeOf trap");
        return Object.getPrototypeOf(target);
      },
      /** 
        @param {any} target The object that references the prototype 
        @param {any} proto The value of the new prototype or null 
        @returns {any} The target object with the new prototype
       */
      setPrototypeOf(target, proto) {
        // eslint-disable-next-line no-undef
        console.log("setPrototypeOf trap");
        return Object.setPrototypeOf(target, proto);
      },
      /** 
        @param {any} target The object to test 
        @returns {boolean} True if the object is extensible, false otherwise
       */
      isExtensible(target) {
        // eslint-disable-next-line no-undef
        console.log("isExtensible trap");
        return Reflect.isExtensible(target);
      },
      /** 
        @param {any} target The object to make non-extensible 
        @returns {boolean} True if the object was made non-extensible, false otherwise
       */
      preventExtensions(target) {
        // eslint-disable-next-line no-undef
        console.log("preventExtensions trap");
        return Object.preventExtensions(target);
      },
      /** 
        @param {any} target The object that contains the property
        @param {string} prop The name of the property 
        @returns {PropertyDescriptor | undefined} The property descriptor of the property, or undefined if it does not exist
       */
      getOwnPropertyDescriptor(target, prop) {
        // eslint-disable-next-line no-undef
        console.log("getOwnPropertyDescriptor trap");
        return Object.getOwnPropertyDescriptor(target, prop);
      },
      /** 
        @param {any} target The object on which to add or modify a property.
        @param {string} key The name of the property,
        @param {PropertyDescriptor} descriptor The descriptor of the property.
        @returns {boolean} True if the property was added or modified, false otherwise
       */
      defineProperty(target, key, descriptor) {
        // eslint-disable-next-line no-undef
        console.log("defineProperty trap");
        return Object.defineProperty(target, key, descriptor);
      },
      /**
        @param {any} target The object to test
        @param {string} key The name of the property to test
        @returns {boolean} True if the property exists, false otherwise
      */
      has(target, key) {
        // eslint-disable-next-line no-undef
        console.log("has trap");
        return key in target;
      },
      /**
        @param {any} target The object to get the property from
        @param {string} prop The name of the property to get
        @param {unknown} receiver The proxy or object that is the receiver of the property access
        @returns {any} The value of the property
      */
      get(target, prop, receiver) {
        // eslint-disable-next-line no-undef
        console.log("get trap");
        return Reflect.get(target, prop, receiver);
      },
      /**
        @param {any} obj The object to set the property on
        @param {string} prop The name of the property to set
        @param {any} value The value to set the property to
        @param {unknown} receiver The proxy or object that is the receiver of the property access
        @returns {boolean} True if the property was set, false otherwise
      */
      set(obj, prop, value, receiver) {
        // eslint-disable-next-line no-undef
        console.log("set trap");
        return Reflect.set(obj, prop, value, receiver);
      },
      /**
        @param {any} target The object to delete the property from
        @param {string} prop The name of the property to delete
        @returns {boolean} True if the property was deleted, false otherwise
      */
      deleteProperty(target, prop) {
        // eslint-disable-next-line no-undef
        console.log("deleteProperty trap");
        return delete target[prop];
      },
    };
    /** @type {number[]} */
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
   * @param {Event} e The "input" or "change" event which triggered the call
   */
  inputChanged(e) {
    // @ts-ignore
    let newValue = e?.target?.value;
    if (newValue === undefined || newValue === null) {
      newValue = this.inputElement.value;
    }
    this.updateValue(newValue);
  }
  /**
   * Called when the decimal button is clicked.
   */
  decimalClicked() {
    this.updateValue(this.inputElement.value + ".");
  }
  /**
   * Called when a number is clicked
   * @param {Event} e The "click" event which triggered the function
   */
  numberClicked(e) {
    if (this.valueIsTotal) this.inputElement.value = "";
    this.updateValue(this.inputElement.value + e?.target?.textContent);
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
    return valu % 2 === 1 && prev < 0
      ? -(Math.abs(prev) ** (1 / valu))
      : prev ** (1 / valu);
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
    /** @type string[] */
    const mathOps = Array.from(this.mathButtons, (el) => el.textContent).filter(s => s != null && s.length > 0);
    /** @type ((prev: number, valu: number) => number) | undefined */
    let nextOp = undefined;
    /** @type [string | number, string | number] */
    let prevCur = [0, 0];
    /** @type boolean */
    let gotEquals = false;
    this.inputElement.value = this.memory.reduce(
      (
        /** @type {number} */ acc,
        /** @type {string|number} */ cur,
        /** @type {number} */ idx,
        /** @type {(string|number)[]} */ arr
      ) => {
        const hasNextMathOp =
          idx < arr.length - 1 &&
          typeof arr[idx + 1] === "string" &&
          mathOps.includes("" + arr[idx + 1]);
        /** @type (prev: number, valu: number) => number */
        const mathOp = this.operatorMap["" + arr[idx + 1]];
        if (typeof cur === "string") {
          nextOp = this.operatorMap[cur];
          gotEquals = cur === "=";
        } else if (nextOp && hasNextMathOp) {
          /** @type [number, number] */
          let pc = [+acc, +cur];
          cur = mathOp.apply(null, pc);
          pc = [+acc, +cur];
          acc = nextOp.apply(null, pc);
        } else if (nextOp) {
          /** @type [number, number] */
          let pc = [+acc, +cur];
          acc = nextOp.apply(null, pc);
        } else {
          acc = +cur;
        }
        return acc;
      },
      0
    );
    if (gotEquals) {
      this.memory.length = 0;
    }
  }
  /**
   * Runs when one of the operator buttons is clicked
   * @param {Event} e The "click" event that triggered this function
   */
  operatorClicked(e) {
    this.memory.push(parseFloat(this.inputElement.value));
    this.memory.push(e?.target?.textContent);
    this.valueIsTotal = true;
    if (this.memory.length > 2) {
      // perform operations in memory
      this.runStack();
    }

    if (this.historyElement === null) {
      throw new Error("No history element found in the form.");
    }
    this.historyElement.textContent = this.memory.join(" ");
  }
  /**
   * Runs when one of the memory operators is clicked
   * @param {Event} e The "click" event that triggered this function
   */
  memOperatorClicked(e) {
    switch (e?.target?.id) {
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
    if (w?.document?.querySelector("form") === null) {
      throw new Error("No form element found in the document.");
    }

    // @ts-ignore
    const calc = new Calculatifier(w.document.querySelector("form"));
    const menuToggle = w.document.querySelectorAll("a.toggle");
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    menuToggle.forEach(
      /**
       * Function that is called for each of the elements matched by the ".toggle" selector
       * @param {Element} el One of the elements
       * @returns {void} Nothing.
       */
      (el) =>
        el.addEventListener(
          "click",
          /**
           * Handles click events for the anchors that toggle the hamburger menu
           */
          function () {
            if (el.hash === "#toggle-menu") {
              el.nextElementSibling?.removeAttribute("inert");
            } else {
              el.closest("ul")?.setAttribute("inert", "");
            }
          }
        )
    );
  };
  w.onload = init;
  // eslint-disable-next-line no-undef
})(window);
