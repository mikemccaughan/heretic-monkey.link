class TokenList {
  constructor(value) {
    if (value == null || value.length === 0) {
      this.list = [];
    } else if (value instanceof TokenList) {
      this.list = [...value.list];
    } else {
      this.list = value
        .trim()
        .split(' ')
        .map((token) => token.trim())
        .filter((token) => token.length);
    }
  }
  get length() {
    return this.list.length;
  }
  get value() {
    return this.list.join(' ');
  }
  item(index) {
    return index < 0 || index > this.list.length - 1
      ? undefined
      : this.list[index];
  }
  contains(token) {
    return this.list.includes(token);
  }
  add(...tokens) {
    this.list = [...this.list, ...tokens];
  }
  remove(...tokens) {
    this.list = this.list.filter((token) => tokens.includes(token));
  }
  replace(oldToken, newToken) {
    this.list.splice(this.list.indexOf(oldToken), 1, newToken);
  }
  supports(token) {
    return true;
  }
  toggle(token, force) {
    if (force === true) {
      // added, not removed
      this.list.push(token);
      return true;
    } else if (force === false) {
      // removed, not added
      if (this.list.includes(token)) {
        this.list.splice(this.list.indexOf(token), 1);
      }
      return false;
    } else {
      // toggle
      if (this.list.includes(token)) {
        this.list.splice(this.list.indexOf(token), 1);
        return false;
      } else {
        this.list.push(token);
        return true;
      }
    }
  }
  entries() {
    return this.list[Symbol.iterator];
  }
  forEach(callback, thisArg) {
    this.list.forEach(callback, thisArg);
  }
  keys() {
    return this.entries();
  }
  values() {
    return this.entries();
  }
}
class RelativeDateParser {
  static canParse(value) {
    return (
      value != null &&
      value.length &&
      (['yesterday', 'today', 'tomorrow'].includes(value.toLowerCase()) ||
        /^([+-]*)(\d+)([yqmwdhnsl]?$)/.test(value))
    );
  }
  static parse(value, useUTC) {
    var now = new Date();
    value = value.trim().toLowerCase();
    if (value === 'yesterday') {
      now.setDate(now.getDate() - 1);
      return new Date(now.valueOf());
    }
    if (value === 'today') {
      return new Date(now.valueOf());
    }
    if (value === 'tomorrow') {
      now.setDate(now.getDate() + 1);
      return new Date(now.valueOf());
    }
    // if it doesn't start with +, -, or a digit, return invalid date
    if (
      !value.startsWith('+') &&
      !value.startsWith('-') &&
      !/^\d/.test(value)
    ) {
      return new Date('Invalid Date');
    }
    // if it doesn't end with a unit identifier or a digit, return invalid date
    if (
      !['y', 'q', 'm', 'w', 'd', 'h', 'n', 's', 'l'].some((ending) =>
        value.endsWith(ending)
      ) &&
      !/\d$/.test(value)
    ) {
      return new Date('Invalid Date');
    }
    // Get the first character and the last character
    const avalue = [...value];
    const start = avalue.splice(0, 1)[0];
    const end = avalue.slice(-1)[0];
    let hasSign = true;
    let hasUnit = true;
    if (Number.isInteger(start)) {
      avalue.unshift(start);
      hasSign = false;
    }
    if (Number.isInteger(end)) {
      avalue.push(end);
      hasUnit = false;
    }

    if (!hasUnit) {
      return new Date('Invalid Date');
    }

    value = parseInt(avalue.join(''));
    if (hasSign && start === '-') {
      value = -value;
    }
    var getter = null;
    var setter = null;
    switch (end) {
      case 'y':
        getter = useUTC ? now.getUTCFullYear : now.getFullYear;
        setter = useUTC
          ? (old, value) => now.setUTCFullYear(old + value)
          : (old, value) => now.setFullYear(old + value);
        break;
      case 'q':
        getter = useUTC ? now.getUTCMonth : now.getMonth;
        setter = useUTC
          ? (old, value) => now.setUTCMonth(old + value * 3)
          : (old, value) => now.setMonth(old + value * 3);
        break;
      case 'm':
        getter = useUTC ? now.getUTCMonth : now.getMonth;
        setter = useUTC
          ? (old, value) => now.setUTCMonth(old + value)
          : (old, value) => now.setMonth(old + value);
        break;
      case 'w':
        getter = useUTC ? now.getUTCDate : now.getDate;
        setter = useUTC
          ? (old, value) => now.setUTCDate(old + value * 7)
          : (old, value) => now.setDate(old + value * 7);
        break;
      case 'h':
        getter = useUTC ? now.getUTCHours : now.getHours;
        setter = useUTC
          ? (old, value) => now.setUTCHours(old + value)
          : (old, value) => now.setHours(old + value);
        break;
      case 'n':
        getter = useUTC ? now.getUTCMinutes : now.getMinutes;
        setter = useUTC
          ? (old, value) => now.setUTCMinutes(old + value)
          : (old, value) => now.setMinutes(old + value);
        break;
      case 's':
        getter = useUTC ? now.getUTCSeconds : now.getSeconds;
        setter = useUTC
          ? (old, value) => now.setUTCSeconds(old + value)
          : (old, value) => now.setSeconds(old + value);
        break;
      case 'l':
        getter = useUTC ? now.getUTCMilliseconds : now.getMilliseconds;
        setter = useUTC
          ? (old, value) => now.setUTCMilliseconds(old + value)
          : (old, value) => now.setMilliseconds(old + value);
        break;
      case 'd':
      default:
        getter = useUTC ? now.getUTCDate : now.getDate;
        setter = useUTC
          ? (old, value) => now.setUTCDate(old + value)
          : (old, value) => now.setDate(old + value);
        break;
    }
    if (getter && setter) {
      const old = getter();
      setter(old, value);
    }
    return new Date(now.valueOf());
  }
}
class DateCache {
  static allDatesInYear = {};
  static allDatesInMonth = {};
}
class HMDateTimePicker extends HTMLElement {
  constructor() {
    super();
    this.instanceId = Date.now();
    console.time(`constructor for instance ${this.instanceId}`);

    this.attachShadow({ mode: 'open' });
    const cssLink = document.createElement('style');
    cssLink.setAttribute('type', 'text/css');
    cssLink.textContent = `.date-time-picker {
  display: none;
}
.date-time-picker.show {
  display: flex;
  background-color: white;
  flex-flow: column nowrap;
  position: absolute;
  left: 1rem;
  top: 2rem;
  width: 18rem;
  border: 1px solid #e0e0e0;
  padding: 0.5rem 1rem;
}
.date-time-picker.date-picker .time-picker {
  display: none;
}

.calendar-entry,
.manual-entry,
.entry-footer {
  margin: 1rem 0;
}

.date-picker.calendar-entry,
.date-picker.manual-entry {
  margin: 0;
}

.date-picker.calendar-entry .calendar-entry,
.date-picker.year-entry .year-entry,
.date-picker.month-entry .month-entry {
  height: 100%;
  margin: 1rem 0;
}
.date-picker.calendar-entry .calendar-entry button,
.date-picker.year-entry .year-entry button,
.date-picker.month-entry .month-entry button {
  height: 34px;
  font-size: 13.3333px;
  border-width: 1px;
  padding: 1px 6px;
}
.date-picker.calendar-entry .calendar-entry select {
  height: unset;
  font-size: unset;
  border-width: 1px;
  padding: unset;
}
.date-picker.calendar-entry .year-entry,
.date-picker.calendar-entry .month-entry,
.date-picker.year-entry .month-entry,
.date-picker.year-entry .calendar-entry,
.date-picker.month-entry .year-entry,
.date-picker.month-entry .calendar-entry {
  height: 0;
  margin: 0;
}
.date-picker.calendar-entry .year-entry button,
.date-picker.calendar-entry .month-entry button,
.date-picker.year-entry .month-entry button,
.date-picker.year-entry .calendar-entry button,
.date-picker.month-entry .year-entry button,
.date-picker.month-entry .calendar-entry button {
  height: 0;
  font-size: 0;
  border-width: 0;
  padding: 0;
}

.date-picker.year-entry .calendar-entry select,
.date-picker.month-entry .calendar-entry select {
  height: 0;
  font-size: 0;
  border-width: 0;
  padding: 0;
}

.date-picker:not(.date-time-picker) .calendar-entry button,
.date-picker:not(.date-time-picker) .year-entry button,
.date-picker:not(.date-time-picker) .month-entry button {
  transition: all ease-in 150ms;
}
.date-picker:not(.date-time-picker) .year-entry,
.date-picker:not(.date-time-picker) .month-entry {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(6, 1fr);
  place-items: stretch center;
  transition: all ease-in 150ms;
}

.calendar-entry-header {
  display: flex;
}

.calendar-entry-header label {
  display: inline-block;
  position: absolute;
  left: -10000px;
}

.month-utc {
  flex: 1 1 30%;
}

.year-utc {
  flex: 1 1 30%;
}

.month-year-selector {
  flex: 1 1 60%;
}

.date-time-picker.show.use-tabs .month-utc,
.date-time-picker.show.use-tabs .year-utc {
  display: none;
}
.date-time-picker.show.use-selects .month-year-selector {
  display: none;
}

.month-nav {
  text-indent: -10000px;
  min-width: 24px;
  border: 1px solid transparent;
  border-radius: 0;
  background: transparent;
  position: relative;
  min-height: 24px;
  padding: 0;
}

.month-nav::before {
  left: 0;
  position: absolute;
  font-size: 1rem;
  top: 0;
  width: 24px;
  height: 24px;
  color: black;
  text-indent: 0;
}

.month-prev-utc::before {
  content: '⮜';
}

.month-next-utc::before {
  content: '⮞';
}

.calendar-entry-body {
  display: grid;
  grid-template-columns: repeat(7, 1fr [day]);
  place-items: stretch center;
  margin: 1rem 0;
}
button.calendar-entry-body-date,
button.year-entry-year,
button.month-entry-month {
  width: 100%;
  height: 34px;
  border: 1px solid #e0e0e0;
  border-radius: 0;
  background: white;
}
button.calendar-entry-body-date:hover,
button.year-entry-year:hover,
button.month-entry-month:hover {
  background-color: #e0e0e0;
  cursor: pointer;
}
button.calendar-entry-body-date:disabled,
button.year-entry-year:disabled,
button.month-entry-month:disabled {
  background: white;
  cursor: not-allowed;
}
button.calendar-entry-body-date[data-date-other='true'],
button.year-entry-year[data-date-other='true'],
button.month-entry-month[data-date-other='true'] {
  background-color: rgba(0, 0, 0, 0.025);
  color: #595959;
  font-style: italic;
}
button.calendar-entry-body-date[data-date-other='true']:disabled,
button.year-entry-year[data-date-other='true']:disabled,
button.month-entry-month[data-date-other='true']:disabled {
  background-color: rgba(0, 0, 0, 0.025);
  cursor: not-allowed;
}
button.calendar-entry-body-date[data-is-today='true'][data-date-other='false'],
button.year-entry-year[data-is-today='true'][data-date-other='false'],
button.month-entry-month[data-is-today='true'][data-date-other='false'] {
  background-color: lemonchiffon;
  color: #000000;
}
button.calendar-entry-body-date[data-is-today='true'][data-date-other='false']:disabled,
button.year-entry-year[data-is-today='true'][data-date-other='false']:disabled,
button.month-entry-month[data-is-today='true'][data-date-other='false']:disabled {
  background-color: white;
  color: #000000;
}
button.calendar-entry-body-date[data-is-selected='true'],
button.year-entry-year[data-is-selected='true'],
button.month-entry-month[data-is-selected='true'] {
  background-color: lightblue;
  color: #000000;
}
button.calendar-entry-body-date[data-is-selected='true'][data-date-other='false']:disabled,
button.year-entry-year[data-is-selected='true'][data-date-other='false']:disabled,
button.month-entry-month[data-is-selected='true'][data-date-other='false']:disabled {
  background-color: lightpink;
  color: #000000;
}
.date-time-picker input {
  min-height: 32px;
}

button.picker-footer {
  min-height: 34px;
  border-style: solid;
  border-width: 1px;
}

div.picker-footer {
  text-align: right;
}

.picker-footer-cancel {
  background: transparent;
}

.picker-footer-submit {
  background: orange;
  color: black;
}`;
    this.shadowRoot.appendChild(cssLink);

    this.labelElement = document.createElement('label');
    this.shadowRoot.appendChild(this.labelElement);
    this.inputElement = document.createElement('input');
    this.inputElement.type = 'text';
    this.inputElement.classList.add('date-time');
    this.shadowRoot.appendChild(this.inputElement);

    const isoFormatterOptions = {};
    this.isoFormatter = new Intl.DateTimeFormat(undefined, isoFormatterOptions);
    Object.defineProperty(this.isoFormatter, 'format', {
      value: function (date) {
        return date.toISOString().slice(0, 10);
      },
    });
    const monthYearFormatterOptions = {
      month: 'long',
      year: 'numeric',
    };
    this.monthYearFormatter = new Intl.DateTimeFormat(
      undefined,
      monthYearFormatterOptions
    );
    const monthLongFormatterOptions = { month: 'long' };
    this.monthLongFormatter = new Intl.DateTimeFormat(
      undefined,
      monthLongFormatterOptions
    );
    const monthShortFormatterOptions = { month: 'short' };
    this.monthShortFormatter = new Intl.DateTimeFormat(
      undefined,
      monthShortFormatterOptions
    );
    const yearFormatterOptions = { year: 'numeric' };
    this.yearFormatter = new Intl.DateTimeFormat(
      undefined,
      yearFormatterOptions
    );
    console.timeEnd(`constructor for instance ${this.instanceId}`);
  }
  connectedCallback() {
    console.log('connectedCallback');
    if (this.isConnected) {
      this.init();
    }
  }
  disconnectedCallback() {
    this.destroy();
    console.log('disconnectedCallback');
  }
  adoptedCallback() {
    console.log('adoptedCallback');
  }
  attributeChangedCallback(name, oldValue, newValue) {
    console.log('attributeChangedCallback', name, oldValue, newValue);
  }
  static get observedAttributes() {
    return ['min-date', 'max-date', 'show-on'];
  }
  createDataset(element) {
    return {
      inputClassName:
        element.getAttribute('input-class-name') ??
        element.getAttribute('inputClassName') ??
        '',
      inputId:
        element.getAttribute('input-id') ?? element.getAttribute('inputId'),
      labelClassName:
        element.getAttribute('label-class-name') ??
        element.getAttribute('labelClassName') ??
        '',
      labelId:
        element.getAttribute('label-id') ?? element.getAttribute('labelId'),
      panelElementName:
        element.getAttribute('panel-element-name') ??
        element.getAttribute('panelElementName'),
      panelElementClassName:
        element.getAttribute('panel-class-name') ??
        element.getAttribute('panelClassName') ??
        element.getAttribute('panelElementClassName') ??
        '',
      useUTC:
        element.getAttribute('use-utc') ??
        element.getAttribute('useUtc') ??
        element.getAttribute('useUTC'),
      defaultDate:
        element.getAttribute('default-date') ??
        element.getAttribute('defaultDate'),
      format: element.getAttribute('format'),
      minDate:
        element.getAttribute('min-date') ?? element.getAttribute('minDate'),
      maxDate:
        element.getAttribute('max-date') ?? element.getAttribute('maxDate'),
      disableDate:
        element.getAttribute('disable-date') ??
        element.getAttribute('disableDate'),
      useYearAndMonthTabs:
        element.getAttribute('use-year-and-month-tabs') ??
        element.getAttribute('useYearAndMonthTabs'),
      useYearAndMonthSelects:
        element.getAttribute('use-year-and-month-selects') ??
        element.getAttribute('useYearAndMonthSelects'),
      showOn: new TokenList(
        element.getAttribute('show-on') ?? element.getAttribute('showOn')
      ),
      buttonHtml:
        element.getAttribute('button-html') ??
        element.getAttribute('buttonHtml') ??
        element.getAttribute('buttonHTML'),
      buttonIcon:
        element.getAttribute('button-icon') ??
        element.getAttribute('buttonIcon'),
      title: element.getAttribute('title'),
    };
  }
  get dateButtons() {
    return this.panelElement.querySelectorAll(
      'button.calendar-entry-body-date'
    );
  }
  getDate(value) {
    if (typeof value !== 'object' || Number.isNaN(value.valueOf())) {
      return value;
    }
    const returnValue =
      this.useUTC && !value.wasParsed
        ? new Date(
            value.getUTCFullYear(),
            value.getUTCMonth(),
            value.getUTCDate(),
            value.getUTCHours(),
            value.getUTCMinutes(),
            value.getUTCSeconds(),
            value.getUTCMilliseconds()
          )
        : new Date(value.valueOf());
    returnValue.wasParsed = true;
    return returnValue;
  }
  getNow() {
    const today = new Date();
    return this.getDate(today);
  }
  parseDate(value, defaultValue) {
    let returnValue = new Date('Invalid');
    if (typeof value === 'object' && value instanceof Date) {
      if (Number.isNaN(value.valueOf())) {
        returnValue = this.parseDate(defaultValue);
      } else {
        returnValue = this.getDate(value);
      }
    }
    if (typeof value === 'undefined') {
      returnValue = defaultValue ? this.parseDate(defaultValue) : this.getNow();
    }
    if (typeof value === 'number') {
      returnValue = new Date(value);
    }
    if (typeof value === 'string') {
      // TODO: Parse Date
      // assume it parses as local
      if (value.trim().length === 0) {
        returnValue = this.parseDate(defaultValue);
      } else {
        const parsed = new Date(value);
        returnValue = this.getDate(parsed);
      }
    }
    returnValue.wasParsed = true;
    return returnValue;
  }
  formatDate() {
    const val = this.value;
    const formatted = this.dateFormatter.format(val);
    this.pickerInputElement.value = formatted;
    const myFormatted = this.monthYearFormatter.format(val);
    this.monthYearSelector.querySelector('.selected').textContent = myFormatted;
  }
  setSelectedValue() {
    const val = this.value;
    const formatted = this.dateFormatter.format(val);
    this.inputElement.value = formatted;
  }
  populateMonths() {
    console.time('populateMonths');
    console.time('populateMonths-part1');
    const dateDate = this.getDate(this.value);
    const monthDate = this.getDate(this.value);
    const monthCurrent = monthDate.getMonth();
    this.monthSelect.innerHTML = '';
    // for (let i = this.monthSelect.length - 1; i >= 0; i--) {
    //   this.monthSelect.remove(i);
    // }
    for (let i = 0; i < 12; i++) {
      monthDate.setMonth(i);
      let monthOption = document.createElement('option');
      monthOption.value = i;
      monthOption.text = this.monthLongFormatter.format(monthDate);
      monthOption.selected = i === monthCurrent;
      this.monthSelect.add(monthOption);
    }
    console.timeEnd('populateMonths-part1');
    console.time('populateMonths-part2');
    for (let i = 0; i < 12; i++) {
      monthDate.setMonth(i);
      const buttonLabel = this.monthLongFormatter.format(monthDate);
      const buttonText = this.monthShortFormatter.format(monthDate);
      let monthButton = this.monthEntry.querySelector(
        `button[aria-label="${buttonLabel}"]`
      );
      if (monthButton == null) {
        monthButton = document.createElement('button');
        monthButton.setAttribute('type', 'button');
        monthButton.classList.add('month-entry-month');
        this.monthEntry.appendChild(monthButton);
      }
      monthButton.setAttribute('aria-label', buttonLabel);
      this.clearDataset(monthButton);
      monthButton.dataset.date = this.isoFormatter.format(monthDate);
      monthButton.dataset.isToday =
        monthDate.getFullYear() === this.getNow().getFullYear() &&
        monthDate.getMonth() === this.getNow().getMonth();
      monthButton.dataset.isSelected =
        monthDate.getFullYear() === dateDate.getFullYear() &&
        monthDate.getMonth() === dateDate.getMonth();
      monthButton.textContent = buttonText;
      const allDatesInMonth = this.calculateAllDatesInMonth(monthDate);
      monthButton.disabled = this.allDatesAreDisabled(allDatesInMonth);
    }
    console.timeEnd('populateMonths-part2');
    console.timeEnd('populateMonths');
  }
  populateYears() {
    console.time('populateYears');
    console.time('populateYears-part1');
    const dateDate = this.getDate(this.value);
    const yearDate = this.getDate(this.value);
    const yearSelected = yearDate.getFullYear();
    const yearCurrent = this.getNow().getFullYear();
    // Faster method for emptying select of its options
    this.yearSelect.innerHTML = '';
    for (let i = yearCurrent; i < yearCurrent + 12; i++) {
      yearDate.setFullYear(i);
      let yearOption = document.createElement('option');
      yearOption.value = i;
      yearOption.text = this.yearFormatter.format(yearDate);
      yearOption.selected = i === yearSelected;
      this.yearSelect.add(yearOption);
    }
    console.timeEnd('populateYears-part1');
    console.time('populateYears-part2');
    for (let i = yearCurrent; i < yearCurrent + 24; i++) {
      yearDate.setFullYear(i);
      const buttonLabel = this.yearFormatter.format(yearDate);
      let yearButton = this.yearEntry.querySelector(
        `button[aria-label="${buttonLabel}"]`
      );
      if (yearButton == null) {
        yearButton = document.createElement('button');
        yearButton.setAttribute('type', 'button');
        yearButton.classList.add('year-entry-year');
        this.yearEntry.appendChild(yearButton);
      }
      yearButton.setAttribute('aria-label', buttonLabel);
      this.clearDataset(yearButton);
      yearButton.dataset.date = this.isoFormatter.format(yearDate);
      yearButton.dataset.isToday =
        yearDate.getFullYear() === this.getNow().getFullYear();
      yearButton.dataset.isSelected =
        yearDate.getFullYear() === dateDate.getFullYear();
      yearButton.textContent = yearDate.getFullYear();
      const allDatesInYear = this.calculateAllDatesInYear(yearDate);
      yearButton.disabled = this.allDatesAreDisabled(allDatesInYear);
    }
    console.timeEnd('populateYears-part2');
    console.timeEnd('populateYears');
  }
  getFirstOfMonth(value) {
    return new Date(
      value.getFullYear(),
      value.getMonth(),
      1,
      value.getUTCHours(),
      value.getUTCMinutes(),
      value.getUTCSeconds(),
      value.getUTCMilliseconds()
    );
  }
  getLastOfMonth(value) {
    return new Date(
      value.getFullYear(),
      value.getMonth() + 1,
      0,
      value.getUTCHours(),
      value.getUTCMinutes(),
      value.getUTCSeconds(),
      value.getUTCMilliseconds()
    );
  }
  getFirstSunday(value) {
    const firstOfMonth = this.getFirstOfMonth(value);
    return new Date(
      firstOfMonth.getFullYear(),
      firstOfMonth.getMonth(),
      firstOfMonth.getDate() - firstOfMonth.getDay(),
      value.getUTCHours(),
      value.getUTCMinutes(),
      value.getUTCSeconds(),
      value.getUTCMilliseconds()
    );
  }
  getLastSaturday(value) {
    const lastOfMonth = this.getLastOfMonth(value);
    return new Date(
      lastOfMonth.getFullYear(),
      lastOfMonth.getMonth() + 1,
      6 + lastOfMonth.getDay(),
      value.getUTCHours(),
      value.getUTCMinutes(),
      value.getUTCSeconds(),
      value.getUTCMilliseconds()
    );
  }
  isSameDay(a, b) {
    return (
      a.getFullYear() === b.getFullYear() &&
      a.getMonth() === b.getMonth() &&
      a.getDate() === b.getDate()
    );
  }
  isBeforeDay(a, b) {
    return (
      a.getFullYear() < b.getFullYear() ||
      (a.getFullYear() === b.getFullYear() && a.getMonth() < b.getMonth()) ||
      (a.getFullYear() === b.getFullYear() &&
        a.getMonth() === b.getMonth() &&
        a.getDate() < b.getDate())
    );
  }
  isAfterDay(a, b) {
    return (
      a.getFullYear() > b.getFullYear() ||
      (a.getFullYear() === b.getFullYear() && a.getMonth() > b.getMonth()) ||
      (a.getFullYear() === b.getFullYear() &&
        a.getMonth() === b.getMonth() &&
        a.getDate() > b.getDate())
    );
  }
  dateIsDisabled(date) {
    return (
      this.disableDate(date) ||
      this.isBeforeDay(date, this.minDate) ||
      this.isSameDay(date, this.maxDate) ||
      this.isAfterDay(date, this.maxDate)
    );
  }
  clearDataset(el) {
    if (!el || !el.dataset) {
      throw new Error(
        `Argument must be an HTMLOrForeignElement that has a dataset property, got ${typeof el}`
      );
    }
    for (let key in el.dataset) {
      delete el.dataset[key];
    }
  }
  populateDates() {
    console.time('populateDates');
    const dateDate = new Date(this.value);
    const startDate = this.getFirstSunday(dateDate);
    const calendarElement = this.panelElement.querySelector(
      '.calendar-entry-body'
    );
    for (let i = 0; i < 42; i++) {
      if (!this.dateButtons || this.dateButtons.length <= i) {
        let newDateButton = document.createElement('button');
        newDateButton.setAttribute('type', 'button');
        newDateButton.setAttribute('aria-selected', false);
        newDateButton.classList.add('calendar-entry-body-date');
        calendarElement.appendChild(newDateButton);
        newDateButton = null;
      }
      const buttonDate = new Date(
        startDate.getFullYear(),
        startDate.getMonth(),
        startDate.getDate() + i,
        dateDate.getHours(),
        dateDate.getMinutes(),
        dateDate.getSeconds(),
        dateDate.getMilliseconds()
      );
      const button = this.dateButtons[i];
      button.setAttribute('aria-label', this.dateFormatter.format(buttonDate));
      this.clearDataset(button);
      button.dataset.date = this.isoFormatter.format(buttonDate);
      button.dataset.dateOther = buttonDate.getMonth() !== dateDate.getMonth();
      button.dataset.isToday = this.isSameDay(buttonDate, this.getNow());
      button.dataset.isSelected = this.isSameDay(buttonDate, dateDate);
      button.setAttribute('aria-selected', button.dataset.isSelected);
      button.textContent = buttonDate.getDate();
      button.disabled = this.dateIsDisabled(buttonDate);
    }
    console.timeEnd('populateDates');
  }
  calculateAllDatesInMonth(monthDate) {
    const keyParts = this.monthKeyFormatter.formatToParts(monthDate);
    const key =
      keyParts.find((p) => p.type === 'year').value +
      keyParts.find((p) => p.type === 'month').value;
    //console.time(`calculateAllDatesInMonth${key}`);
    if (DateCache.allDatesInMonth.hasOwnProperty(key)) {
      //console.timeEnd(`calculateAllDatesInMonth${key}`);
      return DateCache.allDatesInMonth[key];
    }
    const allDates = [];
    const first = this.getFirstOfMonth(monthDate);
    const last = this.getLastOfMonth(monthDate);
    const temp = new Date(first.valueOf());
    while (temp.valueOf() <= last.valueOf()) {
      allDates.push(new Date(temp.valueOf()));
      temp.setDate(temp.getDate() + 1);
    }
    DateCache.allDatesInMonth[key] = allDates;
    //console.timeEnd(`calculateAllDatesInMonth${key}`);
    return allDates;
  }
  calculateAllDatesInYear(yearDate) {
    const year = this.useUTC
      ? yearDate.getUTCFullYear()
      : yearDate.getFullYear();
    const key = year.toString();
    //console.time(`calculateAllDatesInYear${key}`);
    if (DateCache.allDatesInYear.hasOwnProperty(key)) {
      //console.timeEnd(`calculateAllDatesInYear${key}`);
      return DateCache.allDatesInYear[key];
    }
    const allDates = [];
    let temp = new Date(yearDate.valueOf());
    temp.setMonth(0);
    const first = this.getFirstOfMonth(temp);
    temp.setMonth(11);
    const last = this.getLastOfMonth(temp);
    temp = new Date(first.valueOf());
    while (this.isBeforeDay(temp, last) || this.isSameDay(temp, last)) {
      allDates.push(new Date(temp.valueOf()));
      temp.setDate(temp.getDate() + 1);
    }
    DateCache.allDatesInYear[key] = allDates;
    //console.timeEnd(`calculateAllDatesInYear${key}`);
    return allDates;
  }
  allDatesAreDisabled(dates) {
    //console.time(`allDatesAreDisabled (${dates.length} dates)`);
    const allDatesDisabled = dates.every((dt) => this.dateIsDisabled(dt));
    //console.timeEnd(`allDatesAreDisabled (${dates.length} dates)`);
    return allDatesDisabled;
  }
  repopulate() {
    console.time('repopulate');
    this.populateMonths();
    this.populateYears();
    this.populateDates();
    const lastMonth = new Date(this.value.valueOf());
    lastMonth.setMonth(lastMonth.getMonth() - 1);
    const lastMonthDates = this.calculateAllDatesInMonth(lastMonth);
    this.prevMonth.disabled = this.allDatesAreDisabled(lastMonthDates);
    const nextMonth = new Date(this.value.valueOf());
    nextMonth.setMonth(nextMonth.getMonth() + 1);
    const nextMonthDates = this.calculateAllDatesInMonth(nextMonth);
    this.nextMonth.disabled = this.allDatesAreDisabled(nextMonthDates);
    console.timeEnd('repopulate');
  }
  gotFocus(e) {
    console.log('gotFocus', e.target);
    this.value = this.parseDate(this.inputElement.value, this.defaultDate);
    this.repopulate();
    this.formatDate();
    this.panelElement.classList.toggle('show');
    this.shadowRoot.host.setAttribute(
      'aria-expanded',
      this.panelElement.classList.contains('show')
    );
    e.stopPropagation();
    e.cancelBubble = true;
  }
  lostFocus(e) {
    console.log('lostFocus', e.target);
    this.setSelectedValue();
  }
  somethingElseGotFocus(e) {
    console.log('somethingElseGotFocus', e.target);
    if (
      e &&
      e.target &&
      e.target !== this.inputElement &&
      !e.target.contains(this.inputElement) &&
      e.target !== this.panelElement &&
      !this.panelElement.contains(e.target) &&
      e.target !== this &&
      !this.contains(e.target)
    ) {
      this.panelElement.classList.remove('show');
      e.stopPropagation();
    }
  }
  dateSelected(e) {
    this.value = this.parseDate(e.target.dataset.date);
    e.target.setAttribute('aria-selected', true);
    this.formatDate();
    this.repopulate();
    if (e.target.matches('.year-entry-year')) {
      this.datePickerElement.classList.add('month-entry');
      this.datePickerElement.classList.remove('year-entry');
    }
    if (e.target.matches('.month-entry-month')) {
      this.datePickerElement.classList.add('calendar-entry');
      this.datePickerElement.classList.remove('month-entry');
    }
  }
  prevClicked(e) {
    // Make sure that keeping the same selected day (e.g., 31st),
    // keeps the desired selected month (e.g., Feb)
    // If not, subtract days until it is in the desired month
    let desiredMonth = this.value.getMonth() - 1;
    const prevDate = new Date(this.value.valueOf());
    if (desiredMonth === -1) {
      prevDate.setFullYear(prevDate.getFullYear() - 1);
      desiredMonth = 11;
    }
    prevDate.setMonth(desiredMonth);
    while (prevDate.getMonth() > desiredMonth) {
      prevDate.setDate(prevDate.getDate() - 1);
    }

    // Make sure that the same selected day in the new month is
    // not disabled. If so, add days until it is on an
    // enabled date.
    while (this.dateIsDisabled(prevDate)) {
      prevDate.setDate(prevDate.getDate() + 1);
    }

    this.value = prevDate;

    this.formatDate();
    this.repopulate();
  }
  nextClicked(e) {
    // Make sure that keeping the same selected day (e.g., 31st),
    // keeps the desired selected month (e.g., Feb)
    // If not, subtract days until it is in the desired month
    let desiredMonth = this.value.getMonth() + 1;
    const nextDate = new Date(this.value.valueOf());
    if (desiredMonth === 12) {
      nextDate.setFullYear(nextDate.getFullYear() + 1);
      desiredMonth = 0;
    }
    nextDate.setMonth(desiredMonth);
    while (nextDate.getMonth() > desiredMonth) {
      nextDate.setDate(nextDate.getDate() - 1);
    }

    // Make sure that the same selected day in the new month is
    // not disabled. If so, subtract days until it is on an
    // enabled date.
    while (this.dateIsDisabled(nextDate)) {
      nextDate.setDate(nextDate.getDate() - 1);
    }

    this.value = nextDate;
    this.formatDate();
    this.repopulate();
  }
  monthSelected(e) {
    this.value.setMonth(+e.target.value);
    this.formatDate();
    this.repopulate();
  }
  yearSelected(e) {
    this.value.setFullYear(+e.target.value);
    this.formatDate();
    this.repopulate();
  }
  monthYearClicked(e) {
    e.preventDefault();
    this.datePickerElement.classList.remove('calendar-entry');
    this.datePickerElement.classList.add('year-entry');
  }
  cancelClicked(e) {
    this.panelElement.classList.remove('show');
  }
  submitClicked(e) {
    this.setSelectedValue();
    this.panelElement.classList.remove('show');
  }
  panelClicked(e) {
    if (
      e.target.matches('.calendar-entry-body-date') ||
      e.target.matches('.year-entry-year') ||
      e.target.matches('.month-entry-month')
    ) {
      this.dateSelected(e);
    }
  }
  init() {
    console.time('init');
    this.boundEventHandlers = new WeakMap();
    let {
      inputClassName,
      inputId,
      labelClassName,
      labelId,
      panelElementName,
      panelElementClassName,
      useUTC,
      defaultDate,
      format,
      minDate,
      maxDate,
      disableDate,
      useYearAndMonthTabs,
      useYearAndMonthSelects,
      showOn,
      buttonHtml,
      buttonIcon,
      title,
    } = this.createDataset(this);

    this.showOn = new TokenList(showOn);
    if (showOn.contains('button')) {
      this.buttonElement = document.createElement('button');
      this.buttonElement.type = 'button';
      this.buttonElement.classList.add('date-time-toggle');
      if (buttonHtml != null && buttonHtml.length) {
        this.buttonElement.innerHTML = buttonHtml;
      } else if (buttonIcon != null && buttonIcon.length) {
        const iconElement = document.createElement('i');
        iconElement.classList.add('material-icons');
        iconElement.textContent = buttonIcon;
        this.buttonElement.appendChild(iconElement);
      }
      this.shadowRoot.appendChild(this.buttonElement);
    }
    this.inputElement.className = inputClassName;
    inputId = inputId ?? `date-time-${this.instanceId}`;
    this.inputElement.id = inputId;
    this.labelElement.className = labelClassName;
    this.labelElement.htmlFor = inputId;
    labelId = labelId ?? `date-time-label-${inputId}`;
    this.labelElement.id = labelId;
    this.labelElement.textContent = title;
    panelElementName = panelElementName ?? 'aside';
    this.panelElement = document.createElement(panelElementName);
    this.panelElement.id = `date-time-panel-${this.instanceId}`;
    this.panelElement.className = panelElementClassName;
    this.panelElement.classList.add('date-time-picker');
    this.panelElement.innerHTML = `
        <div class="date-picker calendar-entry">
          <div class="calendar-entry">
            <div class="calendar-entry-header">
              <label for="date-time-picker-month-${this.instanceId}">Month:</label>
              <select id="date-time-picker-month-${this.instanceId}" class="month-utc"></select>
              <label for="date-time-picker-year-${this.instanceId}">Year:</label>
              <select id="date-time-picker-year-${this.instanceId}" class="year-utc"></select>
              <button type="button" class="month-year-selector">
                <span class="selected">Oct 2020</span> ▼
              </button>
              <button
                id="date-time-picker-prev-${this.instanceId}"
                class="month-prev-utc"
                type="button"
              >
                Prev
              </button>
              <button
                id="date-time-picker-next-${this.instanceId}"
                class="month-next-utc"
                type="button"
              >
                Next
              </button>
            </div>
            <div class="calendar-entry-body">
              <span
                class="calendar-entry-body-header-weekday"
                aria-label="Sunday"
                >Sun</span
              >
              <span
                class="calendar-entry-body-header-weekday"
                aria-label="Monday"
                >Mon</span
              >
              <span
                class="calendar-entry-body-header-weekday"
                aria-label="Tuesday"
                >Tue</span
              >
              <span
                class="calendar-entry-body-header-weekday"
                aria-label="Wednesday"
                >Wed</span
              >
              <span
                class="calendar-entry-body-header-weekday"
                aria-label="Thursday"
                >Thu</span
              >
              <span
                class="calendar-entry-body-header-weekday"
                aria-label="Friday"
                >Fri</span
              >
              <span
                class="calendar-entry-body-header-weekday"
                aria-label="Saturday"
                >Sat</span
              >
            </div>
          </div>
          <div class="year-entry"></div>
          <div class="month-entry"></div>
          <div class="manual-entry">
            <label for="date-time-picker-date-input-${this.instanceId}">Date:</label>
            <input
              type="text"
              id="date-time-picker-date-input-${this.instanceId}"
              class="date-utc"
              readonly
            />
          </div>
        </div>
        <div class="time-picker"></div>
        <div class="picker-footer">
          <button type="button" class="picker-footer picker-footer-cancel">
            Cancel
          </button>
          <button type="button" class="picker-footer picker-footer-submit">
            OK
          </button>
        </div>`;
    this.shadowRoot.appendChild(this.panelElement);

    this.useUTC = ['true', 'yes', 'y'].includes(useUTC?.toLowerCase());
    this.useYearAndMonthTabs = useYearAndMonthTabs || !useYearAndMonthSelects;
    this.useYearAndMonthSelects =
      useYearAndMonthSelects || !useYearAndMonthTabs;
    if (this.useYearAndMonthSelects && this.useYearAndMonthTabs) {
      this.useYearAndMonthTabs = false;
    }
    if (!this.useYearAndMonthSelects && !this.useYearAndMonthTabs) {
      this.useYearAndMonthSelects = true;
    }

    let mmYYformat = { year: 'numeric', month: '2-digit' };
    if (this.useUTC) {
      mmYYformat.timeZone = 'UTC';
    }
    this.monthKeyFormatter = new Intl.DateTimeFormat('en-US', mmYYformat);

    const dateFormatterOptions = {
      dateStyle: 'long',
    };
    if (this.useUTC) {
      dateFormatterOptions.timeZone = 'UTC';
    }
    this.dateFormatter = new Intl.DateTimeFormat(
      undefined,
      dateFormatterOptions
    );
    const timeFormatterOptions = {
      timeStyle: 'long',
    };
    if (this.useUTC) {
      timeFormatterOptions.timeZone = 'UTC';
    }
    this.timeFormatter = new Intl.DateTimeFormat(
      undefined,
      timeFormatterOptions
    );
    if (Array.isArray(format)) {
      this.formats = Array.from(format);
    }
    if (typeof format === 'string') {
      this.formats = [format];
    }
    if (typeof window[minDate] === 'function') {
      minDate = window[minDate]();
    } else if (
      typeof minDate === 'string' &&
      RelativeDateParser.canParse(minDate)
    ) {
      minDate = RelativeDateParser.parse(minDate, this.useUTC);
    }
    if (typeof window[maxDate] === 'function') {
      maxDate = window[maxDate]();
    }
    this.minDate = this.parseDate(minDate, new Date(-8640000000000000));
    this.maxDate = this.parseDate(maxDate, new Date(8640000000000000));
    this.disableDate =
      typeof disableDate === 'function' ? disableDate : (date) => false;

    this.panelElement.classList.toggle('use-tabs', this.useYearAndMonthTabs);
    this.panelElement.classList.toggle(
      'use-selects',
      this.useYearAndMonthSelects
    );
    this.monthYearSelector = this.panelElement.querySelector(
      '.month-year-selector'
    );
    this.datePickerElement = this.panelElement.querySelector('.date-picker');
    this.pickerInputElement = this.panelElement.querySelector('.date-utc');
    this.monthSelect = this.panelElement.querySelector('.month-utc');
    this.yearSelect = this.panelElement.querySelector('.year-utc');
    this.prevMonth = this.panelElement.querySelector('.month-prev-utc');
    this.nextMonth = this.panelElement.querySelector('.month-next-utc');
    this.okayButton = this.panelElement
      .closest('aside')
      .querySelector('button.picker-footer-submit');
    this.cancelButton = this.panelElement
      .closest('aside')
      .querySelector('button.picker-footer-cancel');
    this.yearEntry = this.panelElement.querySelector('.year-entry');
    this.monthEntry = this.panelElement.querySelector('.month-entry');
    this.panelElement.classList.remove('show');
    this.defaultDate = this.parseDate(defaultDate);
    this.value = this.parseDate(this.inputElement.value, this.defaultDate);

    this.repopulate();
    handlers = Object.assign(
      { click: this.somethingElseGotFocus.bind(this) },
      this.boundEventHandlers.get(document.documentElement)
    );
    document.documentElement.addEventListener('click', handlers.click);
    if (this.showOn.contains('focus')) {
      handlers = Object.assign(
        { focusin: this.gotFocus.bind(this) },
        this.boundEventHandlers.get(this.inputElement)
      );
      this.inputElement.addEventListener('focusin', handlers.focusin);
    }
    if (this.showOn.contains('button')) {
      handlers = Object.assign(
        { click: this.gotFocus.bind(this) },
        this.boundEventHandlers.get(this.buttonElement)
      );
      this.buttonElement.addEventListener('click', this.gotFocus.bind(this));
    }
    handlers = Object.assign(
      { focusout: this.lostFocus.bind(this) },
      this.boundEventHandlers.get(this.inputElement)
    );
    this.inputElement.addEventListener('focusout', handlers.focusout);
    handlers = Object.assign(
      { click: this.panelClicked.bind(this) },
      this.boundEventHandlers.get(this.panelElement)
    );
    this.panelElement.addEventListener('click', handlers.click);
    this.prevMonth.addEventListener('click', this.prevClicked.bind(this));
    this.nextMonth.addEventListener('click', this.nextClicked.bind(this));
    this.monthSelect.addEventListener('change', this.monthSelected.bind(this));
    this.yearSelect.addEventListener('change', this.yearSelected.bind(this));
    this.monthYearSelector.addEventListener(
      'click',
      this.monthYearClicked.bind(this)
    );
    this.cancelButton.addEventListener('click', this.cancelClicked.bind(this));
    this.okayButton.addEventListener('click', this.submitClicked.bind(this));

    console.timeEnd('init');
  }
  destroy() {
    console.time('destroy');
    console.timeEnd('destroy');
  }
}
customElements.define('hm-date-time-picker', HMDateTimePicker);
