class Calculatifier {
    constructor(form) {
        this.element = form;

        this.historyElement = form.querySelector('.history');

        this.inputElement = form.querySelector('input');
        this.decimalButton = form.querySelector('#decimal');
        this.numberButtons = form.querySelectorAll('button.number');
        this.operatorButtons = form.querySelectorAll('button.op');
        this.memOperatorButtons = form.querySelectorAll('button.mem-op');

        this.inputElement.addEventListener('input', this.inputChanged.bind(this));
        this.decimalButton.addEventListener('click', this.decimalClicked.bind(this));
        Array.from(this.numberButtons).forEach(el => el.addEventListener('click', this.numberClicked.bind(this)));
        Array.from(this.operatorButtons).forEach(el => el.addEventListener('click', this.operatorClicked.bind(this)));
        Array.from(this.memOperatorButtons).forEach(el => el.addEventListener('click', this.memOperatorClicked.bind(this)));

        this.operatorMap = {
            "%": this.percent.bind(this),
            "/": this.divide.bind(this),
            "×": this.multiply.bind(this),
            "−": this.subtract.bind(this),
            "+": this.add.bind(this),
            "=": this.equals.bind(this),
            "±": this.negate.bind(this)
        };

        const memoryHandler = {
            getPrototypeOf(target) {
                console.log('getPrototypeOf trap');
                return Object.getPrototypeOf(target);
            },
            setPrototypeOf(target, proto) {
                console.log('setPrototypeOf trap');
                return Object.setPrototypeOf(target, proto);
            },
            isExtensible(target) {
                console.log('isExtensible trap');
                return Reflect.isExtensible(target);
            },
            preventExtensions(target) {
                console.log('preventExtensions trap');
                return Object.preventExtensions(target);
            },
            getOwnPropertyDescriptor(target, prop) {
                console.log('getOwnPropertyDescriptor trap');
                return Object.getOwnPropertyDescriptor(target, prop);
            },
            defineProperty(target, key, descriptor) {
                console.log('defineProperty trap');
                return Oboject.defineProperty(target, key, descriptor);
            },
            has(target, key) {
                console.log('has trap');
                return key in target;
            },
            get(target, prop, receiver) {
                console.log('get trap');
                return Reflect.get(...arguments);
            },
            set(obj, prop, value) {
                console.log('set trap');
                return Reflect.set(...arguments);
            },
            deleteProperty(target, prop) {
                console.log('deleteProperty trap');
                return delete target[prop];
            }
        };
        this.memoryBacker = [];
        this.memory = new Proxy(this.memoryBacker, memoryHandler);
        this.valueIsTotal = false;
    }
    updateValue(newValue) {
        newValue = newValue.length > 1 && newValue.indexOf('0') === 0 && newValue.indexOf('.') !== 1 ? newValue.slice(1) : newValue;
        this.inputElement.type = newValue.slice(-1) === '.' ? 'text' : 'number';
        if (newValue.indexOf('.') > 0 && newValue.length > 2) {
            this.inputElement.step = `0.${'0'.repeat(newValue.length - newValue.indexOf('.') - 2)}1`;
        }
        this.inputElement.value = newValue.length ? newValue : '0';
        this.valueIsTotal = false;
    }
    inputChanged(e) {
        this.updateValue(e.target.value);
    }
    decimalClicked() {
        this.updateValue(this.inputElement.value + '.');
    }
    numberClicked(e) {
        if (this.valueIsTotal) this.inputElement.value = '';
        this.updateValue(this.inputElement.value + e.target.textContent);
    }
    percent(prev, valu) { return prev * (valu / 100); };
    divide(prev, valu) { return prev / valu; };
    multiply(prev, valu) { return prev * valu; };
    subtract(prev, valu) { return prev - valu; };
    add(prev, valu) { return prev + valu; };
    equals(prev, valu) { return valu; };
    negate(prev, valu) { return -valu; };
    runStack() {
        let nextOp = undefined;
        let prevCur = [0, 0];
        let gotEquals = false;
        this.inputElement.value = this.memory.reduce((acc, cur) => {
            if (typeof cur === 'string') {
                nextOp = this.operatorMap[cur];
                gotEquals = cur === '=';
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
    operatorClicked(e) {
        this.memory.push(parseFloat(this.inputElement.value));
        this.memory.push(e.target.textContent);
        this.valueIsTotal = true;
        if (this.memory.length > 2) {
            // perform operations in memory
            this.runStack();
        }

        this.historyElement.textContent = this.memory.join(' ');
    }
    memOperatorClicked(e) {
        switch (e.target.id) {
            case "c":
                this.memory.length = 0;
                break;
            case "ce":
                this.updateValue(0);
                break;
            case "backspace":
                this.updateValue(this.inputElement.value.slice(0, this.inputElement.value.length - 1));
                break;
        }
    }
}


(function (w, m) {
    function Calculator(mem) {
        this.memory = mem;
        this.previousValue = null;
        this.pendingValue = [];
        this.value = 0;
        this.operatorMap = {
            "%": this.percent.bind(this),
            "/": this.divide.bind(this),
            "*": this.multiply.bind(this),
            "-": this.subtract.bind(this),
            "+": this.add.bind(this),
            "=": this.equals.bind(this),
            "±": this.negate.bind(this)
        };
    }
    Calculator.prototype.onNumber = function (n) {
        console.log(`number: ${n}`);
        if (Number.isNaN(n)) {
            console.error(`${n} is not a number`);
            return false;
        }
        this.pendingValue.push(n);
        return true;
    };
    Calculator.prototype.onOperator = function (o) {
        const hasPrevious = typeof this.value !== 'undefined' && this.value !== null;
        this.previousValue = this.value;
        this.value = parseFloat(this.pendingValue.join(''));
        this.pendingValue = [];
        this.memory.push(this.value);
        this.memory.push(o);
        console.log(`memory: ${this.memory.join(" ")}`);
        return hasPrevious ? this.operatorMap[o]() : true;
    };
    Calculator.prototype.onMemoryOperator = function (o) {
        if (o === 'c' || o === 'ce') {
            this.value = this.previousValue;
            this.previousValue = null;
            this.pendingValue = [];
            this.setValue(this.value);
        }
        return this.memory.onOperator(o);
    };
    Calculator.prototype.operate = function (operation) {
        if (this.previousValue === null) {
            this.previousValue = this.value;
            return false;
        }
        let val = operation(this.previousValue, this.value);
        this.previousValue = this.value;
        this.value = val;
        return this.setValue(this.value);
    };
    Calculator.prototype.percent = function () {
        let op = (prev, valu) => prev * (valu / 100);
        return this.operate(op);
    };
    Calculator.prototype.divide = function () {
        let op = (prev, valu) => prev / valu;
        return this.operate(op);
    };
    Calculator.prototype.multiply = function () {
        let op = (prev, valu) => prev * valu;
        return this.operate(op);
    };
    Calculator.prototype.subtract = function () {
        let op = (prev, valu) => prev - valu;
        return this.operate(op);
    };
    Calculator.prototype.add = function () {
        let op = (prev, valu) => prev + valu;
        return this.operate(op);
    };
    Calculator.prototype.equals = function () {
        let op = (prev, valu) => valu;
        return this.operate(op);
    };
    Calculator.prototype.negate = function () {
        let op = (prev, valu) => -valu;
        return this.operate(op);
    };

    function Memory() {
        this.stack = [];
        this.operatorMap = {
            'c': this.clear.bind(this),
            'ce': this.clear.bind(this),
            'backspace': this.backspace.bind(this)
        };
    }
    Memory.prototype.push = function (what) {
        return this.stack.push(what);
    };
    Memory.prototype.join = function (delim) {
        return this.stack.join(delim);
    };
    Memory.prototype.clear = function () {
        this.stack.length = 0;
        return true;
    };
    Memory.prototype.backspace = function () {
        return this.stack.splice(this.stack.length - 1, 1);
    };
    Memory.prototype.onOperator = function (o) {
        const op = this.operatorMap[o];
        return op.call(this);
    };
    //let mem = new Memory();
    //let cal = new Calculator(mem);
    let init = () => {
        const calc = new Calculatifier(document.querySelector('form'));
        /*
        if (!Element.prototype.matches && Element.prototype.msMatchesSelector) {
            Element.prototype.matches = Element.prototype.msMatchesSelector;
        }
        let onEquals = (e) => {
            cal.equals();
            return false;
        };
        let onButtonPress = (e) => {
            console.log(e.target.className, e.target.id, e.target.textContent);
            if (e.target.classList.contains('equals')) {
                return onEquals(e);
            }
            if (e.target.classList.contains('op')) {
                return cal.onOperator(e.target.textContent);
            }
            if (e.target.classList.contains('number')) {
                document.querySelector("input").value = (document.querySelector("input").value + e.target.textContent).replace(/^0+(.+)$/, '$1');
                return cal.onNumber(parseFloat(e.target.textContent, 10));
            }
            if (e.target.classList.contains('decimal')) {
                document.querySelector("input").value = (document.querySelector("input").value + e.target.textContent);
                return true;
            }
            if (e.target.classList.contains('mem-op')) {
                return mem.onOperator(e.target.id);
            }
        };
        let numbers = [];
        for (let i = 0; i < 10; i++) {
            numbers.push(i.toString());
        }
        let operators = ["%", "/", "*", "-", "+"];
        Calculator.prototype.setValue = function (value) {
            document.querySelector("input").value = value.toLocaleString();
            return true;
        };
        w.addEventListener('keyup', (e) => {
            if (e.key === " ") {
                // user is using the keyboard to Enter or Spacebar
                if (e.target.matches("button")) {
                    return onButtonPress(e);
                }
            }
            if (e.key === "Enter") {
                // same as clicking equals
                return onEquals(e);
            }
            if (numbers.includes(e.key)) {
                return cal.onNumber(parseInt(e.key));
            }
            if (operators.includes(e.key)) {
                return cal.onOperator(e.key);
            }
            return true;
        });
        w.addEventListener('click', (e) => {
            if (e.target.matches('button')) {
                return onButtonPress(e);
            }
            return false;
        });*/
    };
    w.onload = init;
}(window, Math));
