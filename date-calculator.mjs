import { Temporal } from "/node_modules/@js-temporal/polyfill/dist/index.esm.js";

export default class DateCalculator {
    hasNativeTemporal() {
        return "Temporal" in globalThis && typeof Temporal.PlainDateTime === "function";
    }
    /** @type {HTMLElement | null} */
    nativeTemporalInfo = document.querySelector("#native-info");
    /** @type {HTMLElement | null} */
    polyfillInfo = document.querySelector("#polyfill-info");
    /** @type {HTMLInputElement | null} */
    start = document.querySelector("#start");
    /** @type {HTMLSelectElement | null} */
    unit = document.querySelector("#unit");
    /** @type {HTMLInputElement | null} */
    dateOnlyEl = document.querySelector("#dateonly");
    async importPolyfill() {
        import("/node_modules/@js-temporal/polyfill/dist/index.esm.js").then(
            (module) => {
                const gt = globalThis ?? window;
                const { Temporal, Intl, toTemporalInstant } = module;
                if (typeof gt.Temporal === "undefined") {
                    Object.defineProperty(gt, "Temporal", {
                        value: Temporal,
                        writable: false,
                        configurable: false,
                    });
                }
                if (typeof gt.Intl === "undefined") {
                    Object.defineProperty(gt, "Intl", {
                        value: Intl,
                        writable: false,
                        configurable: false,
                    });
                }
                if (typeof Date.prototype.toTemporalInstant === "undefined" &&
                    typeof gt.toTemporalInstant === "undefined") {
                    Object.defineProperty(gt, "toTemporalInstant", {
                        value: toTemporalInstant,
                        writable: false,
                        configurable: false,
                    });
                    Object.defineProperty(Date.prototype, "toTemporalInstant", {
                        value: toTemporalInstant,
                        writable: false,
                        configurable: false,
                    });
                }
                if (this.nativeTemporalInfo === null || this.polyfillInfo === null) {
                    console.warn(
                        "Native Temporal or polyfill info elements are not available."
                    );
                    return;
                }
                this.polyfillInfo.hidden = false;
                this.nativeTemporalInfo.hidden = this.hasNativeTemporal() &&
                    !this.polyfillInfo.hidden;
            });
    }
    setDefaultDate() {
        if (this.nativeTemporalInfo === null || this.polyfillInfo === null) {
            console.warn(
                "Native Temporal or polyfill info elements are not available."
            );
            return;
        }
        this.polyfillInfo.hidden = true;
        if (!this.hasNativeTemporal()) {
            console.warn(
                "Temporal is not available. Please ensure the polyfill is loaded."
            );
            const tempTimeout = setTimeout(() => {
                this.importPolyfill().then(() => {
                    clearTimeout(tempTimeout);
                    this.setDefaultDate();
                })
            }, 100);
            return;
        } else {
            this.nativeTemporalInfo.hidden = this.hasNativeTemporal() &&
                !this.polyfillInfo.hidden;
        }
        if (this.start === null) {
            console.warn("Start input element is not available.");
            return;
        }
        if (this.dateOnlyEl === null) {
            console.warn("Date only checkbox element is not available.");
            return;
        }
        const temporal = this.dateOnlyEl.checked
            ? Temporal.Now.plainDateISO()
            : Temporal.Now.plainDateTimeISO();
        this.start.value = temporal
            .toString()
            .substring(0, 16);
    }
    /**
     * Toggles the date input type between "date" and "datetime-local" based on
     * the checkbox state.
     * @param {Event} e The change event from the checkbox.
     */
    toggleDateOnly(e) {
        if (this.start === null || this.unit === null || this.dateOnlyEl === null) {
            console.warn("Start input or unit select element or Date only checkbox is not available.");
            return;
        }
        const { checked: checked } = this.dateOnlyEl;
        if (checked == null) {
            console.warn("Date only checkbox element is not available.");
            return;
        }
        this.start.type = checked
            ? "date"
            : "datetime-local";
        this.setDefaultDate();
        // Hide options in the unit select element based on the checkbox state
        Array.from(this.unit.options).forEach(
            (option) =>
            (option.hidden = checked &&
                option.getAttribute("data-type") === "datetime")
        );
        if (
            this.unit.options[
                this.unit.selectedIndex
            ].hidden
        ) {
            // If the currently selected option is hidden, select the first visible option
            Array.from(this.unit.options).filter(
                (option) => !option.hidden
            )[0].selected = true;
        }
    }

    /**
     * Calculates the resulting date based on the user input.
     * @param {Event} e The change event from the input elements.
     * @returns {void}
     */
    calculateDate(e) {
        /** @type {HTMLInputElement[]} */
        const requiredInputs = Array.from(document.querySelectorAll("[required]"));
        if (
            !requiredInputs.every(
                /** 
                 * @param {HTMLInputElement} input 
                 * @param {number} _ 
                 * @param {HTMLInputElement[]} _a 
                 */ 
                (input, _, _a) => input.checkValidity()
            )
        ) {
            return;
        }
        if (this.dateOnlyEl === null || this.start === null) {
            console.warn("Date only checkbox or start input element is not available.");
            return;
        }
        const isDateOnly = this.dateOnlyEl.checked;
        let originalTemporal;
        if (isDateOnly) {
            originalTemporal = Temporal.PlainDate.from(
                this.start.value,
                () => this.start?.checkValidity() ?? false
            );
        } else {
            originalTemporal = Temporal.PlainDateTime.from(
                this.start.value
            );
        }
        if (!isDateOnly) {
            originalTemporal = Temporal.PlainDateTime.from(
                this.start.value
            );
        }
        if (this.unit === null) {
            console.warn("Unit select element is not available.");
            return;
        }
        const unit = this.unit.value;
        if (!Object.keys(this.symbolToFunction).includes(unit)) {
            console.warn("Unit is not supported.");
            return;
        }
        /** @type {Record<string, Function>} */
        const unitSymbol = this.symbolToFunction[unit];
        if (typeof unitSymbol !== "object" || unitSymbol === null) {
            console.warn("Unit symbol is not supported.");
            return;
        }
        /** @type {HTMLSelectElement|null} */
        const operationEl = document.querySelector("#calc");
        if (operationEl === null) {
            console.warn("Operation select element is not available.");
            return;
        }
        if (operationEl.value === "") {
            console.warn("Operation select element is not available.");
            return;
        }
        const operation = operationEl.value;
        if (!Object.keys(unitSymbol).includes(operation)) {
            console.warn("Operation is not supported for the selected unit.");
            return;
        }
        /** @type {HTMLInputElement|null} */
        const countEl = document.querySelector("#count");
        if (countEl === null) {
            console.warn("Count input element is not available.");
            return;
        }
        if (countEl.valueAsNumber <= 0) {
            console.warn("Count input value must be a positive number.");
            return;
        }
        const number = countEl.valueAsNumber;
        const fn = unitSymbol[operation];
        console.log(
            `Calculating ${operation} ${number} ${unit} from ${originalTemporal.toString()}`
        );
        const result = fn(originalTemporal, number);
        const formatter = new Intl.DateTimeFormat([], {
            dateStyle: isDateOnly ? "medium" : "long",
            timeStyle: isDateOnly ? undefined : "short",
        });
        /** @type {HTMLSpanElement|null} */
        const resultIconHtml = document.querySelector("#result-icon");
        /** @type {HTMLDivElement|null} */
        const resultElement = document.querySelector("#result");
        if (resultIconHtml === null || resultElement === null) {
            console.warn("Result icon or result element is not available.");
            return;
        }
        resultElement.removeChild(resultIconHtml);
        resultElement.innerHTML = `${formatter.format(result)}&nbsp;`;
        resultElement.appendChild(resultIconHtml);
        resultIconHtml.title = `Formatted according to the current culture's ${isDateOnly ? "\"medium\"" : "\"long\""} date style${isDateOnly ? "" : " and \"short\" time style"}`;

    }

    constructor() {
        if (this.nativeTemporalInfo !== null || this.polyfillInfo !== null) {
            // Object cannot be null, since we just compared it to null...
            this.nativeTemporalInfo.hidden = this.hasNativeTemporal() &&
                !this.polyfillInfo.hidden;
            if (!this.hasNativeTemporal()) {
                this.importPolyfill();
            }
            if (!this.hasNativeTemporal()) {
                this.importPolyfill();
            }
            document.addEventListener("readystatechange", (e) => {
                if (e?.target != null && typeof e.target.readyState === "string" && e.target.readyState === "complete") {
                    this.setDefaultDate();
                }
            });

            this.dateOnlyEl?.addEventListener(
                "change",
                this.toggleDateOnly.bind(this),
                false
            );
            document.querySelector("#go")?.addEventListener(
                "click",
                (e) => this.calculateDate(e),
                false
            );
        }

        /**
         * @type {Record<string, Record<string, Function>>}  A map of unit and operation symbols to their
         * corresponding functions.
         * @property {Record<string, Function>} m - Functions for minutes.
         * @property {Record<string, Function>} h - Functions for hours.
         * @property {Record<string, Function>} d - Functions for days.
         * @property {Record<string, Function>} w - Functions for weeks.
         * @property {Record<string, Function>} M - Functions for months.
         * @property {Record<string, Function>} Q - Functions for quarters.
         * @property {Record<string, Function>} y - Functions for years.
         * @property {(Temporal.PlainDateTime | Temporal.PlainDate, number) => Temporal.PlainDateTime | Temporal.PlainDate} m+ - Function to add minutes.
         * @property {(Temporal.PlainDateTime | Temporal.PlainDate, number) => Temporal.PlainDateTime | Temporal.PlainDate} m- - Function to subtract minutes.
         * @property {(Temporal.PlainDateTime | Temporal.PlainDate, number) => Temporal.PlainDateTime | Temporal.PlainDate} h+ - Function to add hours.
         * @property {(Temporal.PlainDateTime | Temporal.PlainDate, number) => Temporal.PlainDateTime | Temporal.PlainDate} h- - Function to subtract hours.
         * @property {(Temporal.PlainDateTime | Temporal.PlainDate, number) => Temporal.PlainDateTime | Temporal.PlainDate} d+ - Function to add days.
         * @property {(Temporal.PlainDateTime | Temporal.PlainDate, number) => Temporal.PlainDateTime | Temporal.PlainDate} d- - Function to subtract days.
         * @property {(Temporal.PlainDateTime | Temporal.PlainDate, number) => Temporal.PlainDateTime | Temporal.PlainDate} w+ - Function to add weeks.
         * @property {(Temporal.PlainDateTime | Temporal.PlainDate, number) => Temporal.PlainDateTime | Temporal.PlainDate} w- - Function to subtract weeks.
         * @property {(Temporal.PlainDateTime | Temporal.PlainDate, number) => Temporal.PlainDateTime | Temporal.PlainDate} M+ - Function to add months.
         * @property {(Temporal.PlainDateTime | Temporal.PlainDate, number) => Temporal.PlainDateTime | Temporal.PlainDate} M- - Function to subtract months.
         * @property {(Temporal.PlainDateTime | Temporal.PlainDate, number) => Temporal.PlainDateTime | Temporal.PlainDate} Q+ - Function to add quarters.
         * @property {(Temporal.PlainDateTime | Temporal.PlainDate, number) => Temporal.PlainDateTime | Temporal.PlainDate} Q- - Function to subtract quarters.
         * @property {(Temporal.PlainDateTime | Temporal.PlainDate, number) => Temporal.PlainDateTime | Temporal.PlainDate} y+ - Function to add years.
         * @property {(Temporal.PlainDateTime | Temporal.PlainDate, number) => Temporal.PlainDateTime | Temporal.PlainDate} y- - Function to subtract years.
         */
        this.symbolToFunction = {
            m: {
                "+": /** 
          @param {Temporal.PlainDateTime | Temporal.PlainDate} dt The date or datetime to modify 
          @param {number} c The count of minutes to add 
          @returns {Temporal.PlainDateTime | Temporal.PlainDate} The modified date or datetime  
          */(dt, c) => dt.add({ minutes: c }),
                "-": /** 
          @param {Temporal.PlainDateTime | Temporal.PlainDate} dt The date or datetime to modify 
          @param {number} c The count of minutes to subtract
          @returns {Temporal.PlainDateTime | Temporal.PlainDate} The modified date or datetime  
          */(dt, c) => dt.subtract({ minutes: c }),
            },
            h: {
                "+": /** 
          @param {Temporal.PlainDateTime | Temporal.PlainDate} dt The date or datetime to modify 
          @param {number} c The count of hours to add 
          @returns {Temporal.PlainDateTime | Temporal.PlainDate} The modified date or datetime  
          */(dt, c) => dt.add({ hours: c }),
                "-": /** 
          @param {Temporal.PlainDateTime | Temporal.PlainDate} dt The date or datetime to modify 
          @param {number} c The count of hours to subtract
          @returns {Temporal.PlainDateTime | Temporal.PlainDate} The modified date or datetime  
          */(dt, c) => dt.subtract({ hours: c }),
            },
            d: {
                "+": /** 
          @param {Temporal.PlainDateTime | Temporal.PlainDate} dt The date or datetime to modify 
          @param {number} c The count of days to add
          @returns {Temporal.PlainDateTime | Temporal.PlainDate} The modified date or datetime  
          */(dt, c) => dt.add({ days: c }),
                "-": /** 
          @param {Temporal.PlainDateTime | Temporal.PlainDate} dt The date or datetime to modify 
          @param {number} c The count of days to subtract
          @returns {Temporal.PlainDateTime | Temporal.PlainDate} The modified date or datetime  
          */(dt, c) => dt.subtract({ days: c }),
            },
            w: {
                "+": /** 
          @param {Temporal.PlainDateTime | Temporal.PlainDate} dt The date or datetime to modify 
          @param {number} c The count of weeks to add
          @returns {Temporal.PlainDateTime | Temporal.PlainDate} The modified date or datetime  
          */(dt, c) => dt.add({ days: c * 7 }),
                "-": /** 
          @param {Temporal.PlainDateTime | Temporal.PlainDate} dt The date or datetime to modify 
          @param {number} c The count of weeks to subtract
          @returns {Temporal.PlainDateTime | Temporal.PlainDate} The modified date or datetime  
          */(dt, c) => dt.subtract({ days: c * 7 }),
            },
            M: {
                "+": /** 
          @param {Temporal.PlainDateTime | Temporal.PlainDate} dt The date or datetime to modify 
          @param {number} c The count of months to add
          @returns {Temporal.PlainDateTime | Temporal.PlainDate} The modified date or datetime  
          */(dt, c) => dt.add({ months: c }),
                "-": /** 
          @param {Temporal.PlainDateTime | Temporal.PlainDate} dt The date or datetime to modify 
          @param {number} c The count of months to subtract
          @returns {Temporal.PlainDateTime | Temporal.PlainDate} The modified date or datetime  
          */(dt, c) => dt.subtract({ months: c }),
            },
            Q: {
                "+": /** 
          @param {Temporal.PlainDateTime | Temporal.PlainDate} dt The date or datetime to modify 
          @param {number} c The count of quarters to add
          @returns {Temporal.PlainDateTime | Temporal.PlainDate} The modified date or datetime  
          */(dt, c) => dt.add({ months: c * 3 }),
                "-": /** 
          @param {Temporal.PlainDateTime | Temporal.PlainDate} dt The date or datetime to modify 
          @param {number} c The count of quarters to subtract
          @returns {Temporal.PlainDateTime | Temporal.PlainDate} The modified date or datetime  
          */ (dt, c) => dt.subtract({ months: c * 3 }),
            },
            y: {
                "+": /** 
          @param {Temporal.PlainDateTime | Temporal.PlainDate} dt The date or datetime to modify 
          @param {number} c The count of years to add
          @returns {Temporal.PlainDateTime | Temporal.PlainDate} The modified date or datetime  
          */(dt, c) => dt.add({ years: c }),
                "-": /** 
          @param {Temporal.PlainDateTime | Temporal.PlainDate} dt The date or datetime to modify 
          @param {number} c The count of years to subtract
          @returns {Temporal.PlainDateTime | Temporal.PlainDate} The modified date or datetime  
          */(dt, c) => dt.subtract({ years: c }),
            },
        };
    }
}