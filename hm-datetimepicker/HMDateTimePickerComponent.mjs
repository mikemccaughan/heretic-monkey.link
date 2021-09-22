import RelativeDateParser from './RelativeDateParser.mjs';
import TokenList from './TokenList.mjs';
import DateHelper from './DateHelper.mjs';
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
    const weekdayLongFormatterOptions = { weekday: 'long' };
    this.weekdayLongFormatter = new Intl.DateTimeFormat(
      undefined,
      weekdayLongFormatterOptions
    );
    const weekdayShortFormatterOptions = { weekday: 'short' };
    this.weekdayShortFormatter = new Intl.DateTimeFormat(
      undefined,
      weekdayShortFormatterOptions
    );
    const weekdayNarrowFormatterOptions = { weekday: 'narrow' };
    this.weekdayNarrowFormatter = new Intl.DateTimeFormat(
      undefined,
      weekdayNarrowFormatterOptions
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
      weekStartsOn: this.parseWeekday(
        element.getAttribute('week-starts-on') ??
          element.getAttribute('weekStartsOn')
      ),
    };
  }
  get dateButtons() {
    return this.panelElement.querySelectorAll(
      'button.calendar-entry-body-date'
    );
  }
  parseWeekday(value) {
    if (value == null) {
      return value;
    }
    if (isNaN(parseInt(value))) {
      switch (value[0].toUpperCase() + value.slice(1).toLowerCase()) {
        case 'Monday':
        case 'Mon':
        case 'M':
          return 1;
        case 'Tuesday':
        case 'Tue':
          return 2;
        case 'Wednesday':
        case 'Wed':
        case 'W':
          return 3;
        case 'Thursday':
        case 'Thu':
          return 4;
        case 'Friday':
        case 'Fri':
        case 'F':
          return 5;
        case 'Saturday':
        case 'Sat':
          return 6;
        case 'Sunday':
        case 'Sun':
        default:
          return 0;
      }
    } else {
      return parseInt(value, 10);
    }
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
    if (this.useYearAndMonthTabs) {
      const myFormatted = this.monthYearFormatter.format(val);
      this.monthYearSelector.querySelector(
        '.selected'
      ).textContent = myFormatted;
    }
  }
  setSelectedValue() {
    const val = this.value;
    const formatted = this.dateHelper.formatDate(val);
    this.inputElement.value = formatted;
  }
  parseInputValue() {
    const val = this.inputElement.value;
    this.value = this.parseDate(val);
    this.setSelectedValue();
  }
  populateMonths() {
    console.time('populateMonths');
    const dateDate = this.getDate(this.value);
    const monthDate = this.getDate(this.value);
    const monthCurrent = monthDate.getMonth();
    if (this.useYearAndMonthSelects) {
      console.time('populateMonths-part1');
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
    }
    if (this.useYearAndMonthTabs) {
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
    }
    console.timeEnd('populateMonths');
  }
  populateYears() {
    console.time('populateYears');
    const dateDate = this.getDate(this.value);
    const yearDate = this.getDate(this.value);
    const yearSelected = yearDate.getFullYear();
    const yearCurrent = this.getNow().getFullYear();
    // Faster method for emptying select of its options
    if (this.useYearAndMonthSelects) {
      console.time('populateYears-part1');
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
    }
    if (this.useYearAndMonthTabs) {
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
    }
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
  keyDown(e) {
    console.log('keyDown', e.target, e.key);
    if (
      e.target.closest('input') == this.inputElement &&
      e.key === 'ArrowDown'
    ) {
      this.gotFocus(e);
    }
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
    this.parseInputValue();
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
      weekStartsOn,
    } = this.createDataset(this);

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
      } else {
        this.buttonElement.textContent = '📅';
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
    panelElementName = panelElementName ?? 'menu';
    this.panelElement = document.createElement(panelElementName);
    this.panelElement.id = `date-time-panel-${this.instanceId}`;
    this.shadowRoot.host.setAttribute('aria-controls', this.panelElement.id);
    this.panelElement.setAttribute('aria-live', 'polite');
    this.panelElement.setAttribute('aria-expanded', 'false');
    this.panelElement.className = panelElementClassName;
    this.panelElement.classList.add('date-time-picker');
    const dateEntryWrapper = document.createElement('div');
    dateEntryWrapper.classList.add('date-picker', 'calendar-entry');
    dateEntryWrapper.setAttribute('role', 'tablist');
    this.panelElement.appendChild(dateEntryWrapper);
    const calendarEntry = document.createElement('div');
    calendarEntry.classList.add('calendar-entry');
    calendarEntry.setAttribute('role', 'tab');
    const calendarEntryHeader = document.createElement('div');
    calendarEntryHeader.classList.add('calendar-entry-header');
    if (this.useYearAndMonthSelects) {
      const monthLabel = document.createElement('label');
      monthLabel.htmlFor = `date-time-picker-month-${this.instanceId}`;
      monthLabel.textContent = 'Month:';
      calendarEntryHeader.appendChild(monthLabel);
      const monthSelect = document.createElement('select');
      monthSelect.id = `date-time-picker-month-${this.instanceId}`;
      monthSelect.classList.add('month-utc');
      calendarEntryHeader.appendChild(monthSelect);
      const yearLabel = document.createElement('label');
      yearLabel.htmlFor = `date-time-picker-year-${this.instanceId}`;
      yearLabel.textContent = 'Year:';
      calendarEntryHeader.appendChild(yearLabel);
      const yearSelect = document.createElement('select');
      yearSelect.id = `date-time-picker-year-${this.instanceId}`;
      yearSelect.classList.add('year-utc');
      calendarEntryHeader.appendChild(yearSelect);
    }
    if (this.useYearAndMonthTabs) {
      const monthYearSelector = document.createElement('button');
      monthYearSelector.type = 'button';
      monthYearSelector.classList.add('month-year-selector');
      const selectedMonthYear = document.createElement('span');
      selectedMonthYear.classList.add('selected');
      monthYearSelector.appendChild(selectedMonthYear);
      monthYearSelector.appendChild(document.createTextNode(' ▼'));
      calendarEntryHeader.appendChild(monthYearSelector);
    }
    const monthPrev = document.createElement('button');
    monthPrev.id = `date-time-picker-prev-${this.instanceId}`;
    monthPrev.className = 'month-prev-utc';
    monthPrev.type = 'button';
    monthPrev.textContent = 'Prev';
    calendarEntryHeader.appendChild(monthPrev);
    const monthNext = document.createElement('button');
    monthNext.id = `date-time-picker-next-${this.instanceId}`;
    monthNext.className = 'month-next-utc';
    monthNext.type = 'button';
    monthNext.textContent = 'Next';
    calendarEntryHeader.appendChild(monthNext);
    calendarEntry.appendChild(calendarEntryHeader);
    const calendarEntryBody = document.createElement('div');
    calendarEntryBody.classList.add('calendar-entry-body');
    const weekdayDates = [
      new Date(Date.UTC(2021, 0, 24)),
      new Date(Date.UTC(2021, 0, 25)),
      new Date(Date.UTC(2021, 0, 26)),
      new Date(Date.UTC(2021, 0, 27)),
      new Date(Date.UTC(2021, 0, 28)),
      new Date(Date.UTC(2021, 0, 29)),
      new Date(Date.UTC(2021, 0, 30)),
    ];
    for (let d = weekStartsOn; d < weekStartsOn + 7; d++) {
      let w = d % 6;
      const dayHeader = document.createElement('span');
      dayHeader.classList.add('calendar-entry-body-header-weekday');
      dayHeader.setAttribute(
        'aria-label',
        this.weekdayLongFormatter.format(weekdayDates[w])
      );
      dayHeader.textContent = this.weekdayShortFormatter.format(
        weekdayDates[w]
      );
      calendarEntryBody.appendChild(dayHeader);
    }
    calendarEntry.appendChild(calendarEntryBody);
    dateEntryWrapper.appendChild(calendarEntry);
    const yearEntry = document.createElement('div');
    yearEntry.className = 'year-entry';
    yearEntry.setAttribute('role', 'tab');
    yearEntry.setAttribute('aria-expanded', false);
    dateEntryWrapper.appendChild(yearEntry);
    const monthEntry = document.createElement('div');
    monthEntry.className = 'month-entry';
    monthEntry.setAttribute('role', 'tab');
    monthEntry.setAttribute('aria-expanded', false);
    dateEntryWrapper.appendChild(monthEntry);
    const manualEntry = document.createElement('div');
    manualEntry.className = 'manual-entry';
    const dateLabel = document.createElement('label');
    const dateId = `date-time-picker-date-input-${this.instanceId}`;
    dateLabel.htmlFor = dateId;
    dateLabel.textContent = 'Date:';
    manualEntry.appendChild(dateLabel);
    const dateEntry = document.createElement('input');
    dateEntry.id = dateId;
    dateEntry.className = 'date-utc';
    dateEntry.type = 'text';
    dateEntry.readOnly = true;
    manualEntry.appendChild(dateEntry);
    dateEntryWrapper.appendChild(manualEntry);
    const timePicker = document.createElement('div');
    timePicker.className = 'time-picker time-entry';
    this.panelElement.appendChild(timePicker);
    const pickerFooter = document.createElement('div');
    pickerFooter.className = 'picker-footer';
    const cancelButton = document.createElement('button');
    cancelButton.type = 'button';
    cancelButton.className = 'picker-footer-cancel';
    cancelButton.textContent = 'Cancel';
    pickerFooter.appendChild(cancelButton);
    const submitButton = document.createElement('button');
    submitButton.type = 'button';
    submitButton.className = 'picker-footer-submit';
    submitButton.textContent = 'OK';
    pickerFooter.appendChild(submitButton);
    this.panelElement.appendChild(pickerFooter);
    this.shadowRoot.appendChild(this.panelElement);

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

    this.dateHelper = new DateHelper(undefined, this.formats, undefined);

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
    } else if (
      typeof maxDate === 'string' &&
      RelativeDateParser.canParse(maxDate)
    ) {
      maxDate = RelativeDateParser.parse(maxDate, this.useUTC);
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
      .closest(panelElementName)
      .querySelector('button.picker-footer-submit');
    this.cancelButton = this.panelElement
      .closest(panelElementName)
      .querySelector('button.picker-footer-cancel');
    this.yearEntry = this.panelElement.querySelector('.year-entry');
    this.monthEntry = this.panelElement.querySelector('.month-entry');
    this.panelElement.classList.remove('show');
    this.defaultDate = this.parseDate(defaultDate);
    this.value = this.parseDate(this.inputElement.value, this.defaultDate);

    this.repopulate();
    const me = this;
    me.elements = me.elements ?? new Set();
    me.elements.add(document.documentElement);
    this.mergeBoundHandlers(
      document.documentElement,
      'click',
      this.somethingElseGotFocus.bind(this)
    );
    if (this.showOn.contains('focus')) {
      me.elements.add(this.inputElement);
      this.mergeBoundHandlers(
        this.inputElement,
        'focusin',
        this.gotFocus.bind(this)
      );
    }
    if (this.showOn.contains('button')) {
      me.elements.add(this.buttonElement);
      this.mergeBoundHandlers(
        this.buttonElement,
        'click',
        this.gotFocus.bind(this)
      );
    }
    me.elements.add(this.inputElement);
    this.mergeBoundHandlers(
      this.inputElement,
      'focusout',
      this.lostFocus.bind(this)
    );
    me.elements.add(this.panelElement);
    this.mergeBoundHandlers(
      this.panelElement,
      'click',
      this.panelClicked.bind(this)
    );
    me.elements.add(this.prevMonth);
    this.mergeBoundHandlers(
      this.prevMonth,
      'click',
      this.prevClicked.bind(this)
    );
    me.elements.add(this.nextMonth);
    this.mergeBoundHandlers(
      this.nextMonth,
      'click',
      this.nextClicked.bind(this)
    );
    if (this.useYearAndMonthSelects) {
      me.elements.add(this.monthSelect);
      this.mergeBoundHandlers(
        this.monthSelect,
        'change',
        this.monthSelected.bind(this)
      );
      me.elements.add(this.yearSelect);
      this.mergeBoundHandlers(
        this.yearSelect,
        'change',
        this.yearSelected.bind(this)
      );
    }
    if (this.useYearAndMonthTabs) {
      me.elements.add(this.monthYearSelector);
      this.mergeBoundHandlers(
        this.monthYearSelector,
        'click',
        this.monthYearClicked.bind(this)
      );
    }
    me.elements.add(this.cancelButton);
    this.mergeBoundHandlers(
      this.cancelButton,
      'click',
      this.cancelClicked.bind(this)
    );
    me.elements.add(this.okayButton);
    this.mergeBoundHandlers(
      this.okayButton,
      'click',
      this.submitClicked.bind(this)
    );

    console.timeEnd('init');
  }
  getBoundEventHandlersAsFunction(element, eventName) {
    const allHandlers = this.boundEventHandlers.get(element) ?? {};
    const eventHandlers = allHandlers[eventName] ?? [];
    const wrappedHandlers = function (e) {
      for (let handler of eventHandlers) {
        handler(e);
      }
    };
    return wrappedHandlers;
  }
  getMergedBoundEventHandlers(element, eventName) {
    const handlers = this.boundEventHandlers.get(element) ?? {};
    const mergedBoundHandler = handlers['get' + eventName]();
    return mergedBoundHandler;
  }
  mergeBoundHandlers(element, eventName, newBoundHandler) {
    const existingBoundHandlers =
      this.boundEventHandlers.get(element)?.[eventName] ?? [];
    existingBoundHandlers.push(newBoundHandler);
    this.boundEventHandlers.set(element, {
      [eventName]: existingBoundHandlers,
      ['get' + eventName]: this.getBoundEventHandlersAsFunction(
        element,
        eventName
      ),
    });
    element.addEventListener(
      eventName,
      this.getMergedBoundEventHandlers(element, eventName)
    );
  }
  removeBoundHandlers() {
    for (let element of this.elements.filter((el) =>
      this.boundEventHandlers.has(el)
    )) {
      var handlers = this.boundEventHandlers.get(element);
      for (let eventName in handlers) {
        element.removeEventListener(
          eventName,
          this.getMergedBoundEventHandlers(element, eventName)
        );
      }
    }
    for (let i = this.elements.length - 1; i < 0; i--) {
      this.elements.splice(i, 1);
    }
  }
  destroy() {
    console.time('destroy');
    this.removeBoundHandlers();
    console.timeEnd('destroy');
  }
}
customElements.define('hm-date-time-picker', HMDateTimePicker);
