import RelativeDateParser from './RelativeDateParser.mjs';
import TokenList from './TokenList.mjs';
import DateHelper from './DateHelper.mjs';
import BasicUtilities from './BasicUtilities.mjs';
class DateCache {
  static allDatesInYear = {};
  static allDatesInMonth = {};
}
/**
 * Provides a customizable interface for picking dates and/or times.
 * Usage example:
 * 
 * The following attributes are recognized:
 * |+-----|+------------|+---------|+--------|
 * | Name | Does what   | Required | Default |
 * |+-----|+------------|+---------|---------|
 * | inputClassName or input-class-name | sets one or more (space separated) classes to apply to the input field | false | date-time |
 * | inputId or input-id | sets the id of the input field (must be a valid identifier unique to document) | false | date-time-<value of Date.now()> |
 * | labelClassName or label-class-name | sets one or more (space separated) classes to apply to the field label | false | |
 * | labelId or label-id | sets the id of the field label (must be a valid identifier unique to document) | false | date-time-label-<value of Date.now()> |
 * | panelElementName or panel-element-name or panelTag or panel-tag | sets the name of the tag to use for the panel element | false | menu |
 * | panelElementClassName or panelClassName or panel-class-name | sets one or more (space separated) classes to apply to the panel | false | date-time-picker |
 * | N/A | The id of the panel is always automatically set | N/A | date-time-panel-<value of Date.now()> |
 * | useUTC or useUtc or use-utc | true to use UTC methods for all date and time manipulation | false | false |
 * | defaultDate or default-date or default | A date and optionally time in ISO 8601 format (yyyy-MM-dd or yyyy-MM-ddTHH:mm:ss.fffZZZ) | false | |
 * | format | The format (or formats [quoted, comma separated]) in which to validate dates. If multiple provided, the first one will be used to format the parsed value | false | The default short date format for the language in lang, or the document's or browser's current language |
 * | ttDateFormat or tt-date-format | The format in which to write dates shown in tooltips displayed when hovering over a date in the calendar view | false | The default long date format for the language in lang, or the document's or browser's language |
 * | ttTabsButtonFormat or tt-tabs-button-format | The format in which to write the date shown in tooltips displayed when hovering over, if tabs are used, the month/year button | false | The long month and year format for the language in lang, or the document's or browser's language |
 * | ttPrevButtonFormat or tt-prev-button-format | The format in which the previous month will be read by screen readers when reading the previous month navigation button | false | The long month and year format for the language in lang, or the document's or browser's language |
 * | ttNextButtonFormat or tt-next-button-format | The format in which the next month will be read by screen readers when reading the next month navigation button | false | The long month and year format for the language in lang, or the document's or browser's language |
 * | tabsButtonFormat or tabs-button-format | The format in which to write the date shown on, if tabs are used, the month/year button | false | The long month and year format for the language in lang, or the document's or browser's language |
 * | prevText or prev-text or prev | The text to show on the previous month button | false | "Prev" (note that if specified, the left-facing arrow will remain) |
 * | prevHtml or prev-html | The html to show on the previous month button (ignored if prevText is specified) | false | (note that if specified, the left-facing arrow will not be shown) |
 * | nextText or next-text or next | The text to show on the next month button | false | "Next" (note that if specified, the right-facing arrow will remain) |
 * | nextHtml or next-html | The html to show on the next month button (ignored if nextText is specified) | false | (note that if specified, the right-facing arrow will not be shown) |
 * | showManualEntry or show-manual-entry or show-manual | true to show the manual entry field in the panel; otherwise, false | false | true |
 * | allowManualEntry or allow-manual-entry or allow-manual | true to show the manual entry field in the panel, and allow manual entry in that field; otherwise, false | false | false (note that if showManualEntry is true, and this is false, the field is present and read-only) |
 * | closePanelOnDateSelect or close-panel-on-date-select or close-on-select | true to close the panel and finalize the date upon clicking of a date on the calendar; otherwise, false | false | false (note that if the close-on-select form is used, both this and closePanelOnTimeSelect will be set to the same value)  |
 * | closePanelOnTimeSelect or close-panel-on-time-select or close-on-select | true to close the panel and finalize the time upon selection of the final time portion; otherwise, false | false | false (note that if the close-on-select form is used, both this and closePanelOnDateSelect will be set to the same value) |
 * | lang | The BCP47 language identifier to use for date and time information | false | In order of selection: The lang attribute of the html element; The first value of navigator.languages; 'en-US' |
 * | timeZone or time-zone or tz | The IANA time zone name to use for date and time calculations (if useUTC is true, this value is ignored and set to UTC) | false | The first time zone in America that matches the offset given by the browser |
 * | minDate or min-date or min | A date and optionally time in ISO 8601 format (yyyy-MM-dd or yyyy-MM-ddTHH:mm:ss.fffZZZ); or a relative time like +23h or -7d or yesterday; or the name of a function in the global scope that returns a Date object representing the minimum value | false | |
 * | maxDate or max-date or max | A date and optionally time in ISO 8601 format (yyyy-MM-dd or yyyy-MM-ddTHH:mm:ss.fffZZZ); or a relative time like +23h or -7d or yesterday; or the name of a function in the global scope that returns a Date object representing the minimum value | false | |
 * | disableDate or disable-date or disable | The name of a function on the global scope that will return a Boolean if given a Date | false | |
 * | useYearAndMonthTabs or use-year-and-month-tabs or use-tabs | true to show tabs with buttons for each year and month available; otherwise, false | false | false (either this or useYearAndMonthSelects should be true) |
 * | useYearAndMonthSelects or use-year-and-month-selects or use-selects | true to show selects for the motnh and year; otherwise, false | false | true (either this or useYearAndMonthTabs should be true) |
 * | showAllMonths or show-all-months or show-all | true to show all available months, whether some are disabled due to min/max or not; otherwise, false | false | true (note that if show-all is used, both this and showAllMonths are set to the same value) |
 * | showAllYears or show-all-years or show-all | true to show all available years, whether some are disabled due to min/max or not; otherwise, false | false | true (note that if show-all is used, both this and showAllMonths are set to the same value) |
 * | showOn or show-on | Determines when the panel is shown. Can be one of "focus", "button", or "focus button". | false | "button" |
 * | buttonHtml or buttonHTML or button-html | The HTML to render in the button which shows the panel | false | (if specified, overrides buttonIcon) |
 * | buttonIcon or button-icon | The icon to show in the button which shows the panel | false | (uses icon class specified by buttonIconClassName) |
 * | buttonIconClassName or button-icon-class | The class to apply to the element which will wrap the text specified in buttonIcon | material-icons |
 * | title | The label text for the input field. Also used as a title for the entire element | true | |
 * | weekStartsOn or week-starts-on or week-start | The index of the day of the week the week starts on (0 = Sunday, 6 = Saturday) | false | 0 (Sunday) |
 * |------|-------------|----------|---------|
 * 
 * The following events are raised:
 * |+-----|+------------|+------------|
 * | Name | Raised when | Preventable |
 * |+-----|+------------|+------------|
 * | 'hm-dtp-open' | Just before the entry panel is opened | Yes |
 * | 'hm-dtp-close' | Just before the entry panel is closed | Yes |
 * | 'hm-dtp-date-select' | Just before a date selection is finalized | Yes (prevents button's default) |
 * | 'hm-dtp-prev-month' | Just before navigation to the previous month is finalized | Yes (prevents button's default) |
 * | 'hm-dtp-next-month' | Just before navigation to the next month is finalized | Yes (prevents button's default) |
 * | 'hm-dtp-month-select' | Just before navigation to the selected month is finalized | Yes (prevents select's or button's default) |
 * | 'hm-dtp-year-select' | Just before navigation to the selected year is finalized | Yes (prevents select's or button's default) |
 * | 'hm-dtp-cancel' | Just before closing the panel without submitting the date occurs | Yes (prevents button's default) |
 * | 'hm-dtp-submit' | Just before closing the panel, submitting the date occurs | Yes (prevents button's default) |
 * |------|-------------|-------------|
 * 
 * The following CSS custom properties (variables) are defined:
 * |+-----|+---------|+--------|+------|
 * | Name | Used for | Default | Notes |
 * |+-----|+---------|+--------|+------|
 * | --hm-date-time-picker-host-display | The display property for the host element | flex | |
 * | --hm-date-time-picker-host-position | The position property for the host element | relative | Should remain relative |
 * | --hm-date-time-picker-host-max-width | The max-width property for the host element | max-content | |
 * | --hm-date-time-picker-label-display | The display property for the label element | inline | |
 * | --hm-date-time-picker-label-font-family | The font-family property for the label element | inherit | |
 * | --hm-date-time-picker-label-font-size | The font-size property for the label element | 1rem | |
 * | --hm-date-time-picker-label-after-content | The content property for the label::after pseudo-element | '' | Could be e.g., '*' if required |
 * | --hm-date-time-picker-label-after-display | The display property for the label::after pseudo-element | none | Could be e.g., inline |
 * | --hm-date-time-picker-label-after-font-family | The font-family property for the label::after pseudo-element | inherit |  |
 * | --hm-date-time-picker-label-after-font-size | The font-size property for the label::after pseudo-element | inherit |  |
 * | --hm-date-time-picker-label-after-color | The color property for the label::after pseudo-element | inherit | Could be e.g., red |
 * | --hm-date-time-picker-input-background | The background property for the input element |  | |
 * | --hm-date-time-picker-input-color | The color property for the input element |  | |
 * | --hm-date-time-picker-input-display | The display property for the input element |  | |
 * | --hm-date-time-picker-input-font-family | The font-family property for the input element |  | |
 * | --hm-date-time-picker-input-font-size | The font-size property for the input element |  | |
 * | --hm-date-time-picker-input-padding | The padding property for the input element |  | |
 * | --hm-date-time-picker-display | The display property for the panel element (the "drop-down" element) when displayed | flex | |
 * | --hm-date-time-picker-bg-color | The background-color property for the panel element (the "drop-down" element) when displayed | white | |
 * | --hm-date-time-picker-flex-flow | The flex-flow property for the panel element (the "drop-down" element) when displayed | column nowrap | |
 * | --hm-date-time-picker-position | The position property for the panel element (the "drop-down" element) when displayed | absolute | A lot of the code depends on this, so change at your own risk... |
 * | --hm-date-time-picker-top | The top property for the panel element (the "drop-down" element) when displayed | 0.5rem | May need to change based on font-family and font-size, and whether you want the thing to drop up or down |
 * | --hm-date-time-picker-right | The right property for the panel element (the "drop-down" element) when displayed | 0 | May need to change based on whether you want the thing to drop left or right |
 * | --hm-date-time-picker-bottom | The bottom property for the panel element (the "drop-down" element) when displayed | auto | May need to change based on font-family and font-size, and whether you want the thing to drop up or down |
 * | --hm-date-time-picker-left | The left property for the panel element (the "drop-down" element) when displayed | auto | May need to change based on whether you want the thing to drop left or right |
 * | --hm-date-time-picker-width | The width property for the panel element (the "drop-down" element) when displayed | 18rem | May need to change based on font-family and font-size |
 * | --hm-date-time-picker-z-index | The z-index property for the panel element (the "drop-down" element) when displayed | 2 | May need to change based on other positioned items you have |
 * | --hm-date-time-picker-border | The border property for the panel element (the "drop-down" element) when displayed | 1px solid #e0e0e0 |  |
 * | --hm-date-time-picker-box-shadow | The box-shadow property for the panel element (the "drop-down" element) when displayed | 0 0 4px 1px #ececec |  |
 * | --hm-date-time-picker-padding | The padding property for the panel element (the "drop-down" element) when displayed | 0.5rem 1rem |  |
 * | --hm-date-time-picker-entry-button-height | The height property for the buttons displayed as days, months, or years | 34px |  |
 * | --hm-date-time-picker-entry-button-font-size | The font-size property for the buttons displayed as days, months, or years | 13.3333px |  |
 * | --hm-date-time-picker-entry-button-border-width | The border-width property for the buttons displayed as days, months, or years | 1px |  |
 * | --hm-date-time-picker-entry-button-padding | The padding property for the buttons displayed as days, months, or years | 1px 6px |  |
 * | --hm-date-time-picker-entry-select-border-width | The border-width property for the select element displaying months, or years | 1px |  |
 * | --hm-date-time-picker-transition | The transition property for the transition between calendar -> year -> month views | all ease-in 150ms | The property portion of the transition shorthand should remain ('all'), unless changed to 'none' |
 * | --hm-date-time-picker-tab-entry-display | The display property for the tabs displaying months, or years for entry | grid | Defaults to using CSS Grid. The entries below depend on that selection and will not apply if changed  |
 * | --hm-date-time-picker-tab-entry-grid-columns | The grid-template-columns property the tabs displaying months, or years for entry | repeat(4, fr) | Defaults to four buttons across |
 * | --hm-date-time-picker-tab-entry-grid-rows | The grid-template-rows property the tabs displaying months, or years for entry | repeat(6, fr) | Defaults to six buttons down |
 * | --hm-date-time-picker-tab-entry-place-items | The place-items property the tabs displaying months, or years for entry | stretch center | Defaults to stretching the buttons to fit 4 across and 6 down |
 * | --hm-date-time-picker-calendar-header-label-display | The display property for labels within the calendar header | inline-block | Note that labels by default are positioned -100000px left (see below) and thus not visible, but still readable by assistive technologies |
 * | --hm-date-time-picker-calendar-header-label-position | The position property for labels within the calendar header | absolute | |
 * | --hm-date-time-picker-calendar-header-label-left | The left property for labels within the calendar header | -10000px | |
 * | --hm-date-time-picker-month-select-entry-flex | The flex property for the select element used for selecting a month | 1 1 39% | |
 * | --hm-date-time-picker-year-select-entry-flex | The flex property for the select element used for selecting a year | 1 1 39% | |
 * | --hm-date-time-picker-tab-entry-month-year-flex | The flex property for the button element used for opening the tab for year selection | 1 1 69% | |
 * | --hm-date-time-picker-month-nav-background | The background property for the button elements used for navigating months | transparent | |
 * | --hm-date-time-picker-month-nav-border | The border property for the button elements used for navigating months | 1px solid transparent | |
 * | --hm-date-time-picker-month-nav-border-radius | The border-radius property for the button elements used for navigating months | 0 | |
 * | --hm-date-time-picker-month-nav-color | The color property for the button elements used for navigating months | inherit | |
 * | --hm-date-time-picker-month-nav-min-height | The min-height property for the button elements used for navigating months | 24px | |
 * | --hm-date-time-picker-month-nav-min-width | The min-width property for the button elements used for navigating months | 24px | |
 * | --hm-date-time-picker-month-nav-position | The position property for the button elements used for navigating months | relative | |
 * | --hm-date-time-picker-month-nav-padding | The padding property for the button elements used for navigating months | 0 | |
 * | --hm-date-time-picker-month-nav-text-indent | The text-indent property for the button elements used for navigating months | -10000px | Text placed in the button itself is off screen, but available for accessibility technology. |
 * | --hm-date-time-picker-month-nav-before-color | The color property for the ::before pseudo-elements used for navigating months | black | The ::before pseudo-elements are used for the icons |
 * | --hm-date-time-picker-month-nav-before-font-size | The font-size property for the ::before pseudo-elements used for navigating months | 1rem | The ::before pseudo-elements are used for the icons |
 * | --hm-date-time-picker-month-nav-before-height | The height property for the ::before pseudo-elements used for navigating months | 24px | The ::before pseudo-elements are used for the icons |
 * | --hm-date-time-picker-month-nav-before-left | The left property for the ::before pseudo-elements used for navigating months | 0 | The ::before pseudo-elements are used for the icons |
 * | --hm-date-time-picker-month-nav-before-position | The position property for the ::before pseudo-elements used for navigating months | absolute | The ::before pseudo-elements are used for the icons |
 * | --hm-date-time-picker-month-nav-before-text-indent | The text-indent property for the ::before pseudo-elements used for navigating months | 0 | The ::before pseudo-elements are used for the icons |
 * | --hm-date-time-picker-month-nav-before-top | The top property for the ::before pseudo-elements used for navigating months | 0 | The ::before pseudo-elements are used for the icons |
 * | --hm-date-time-picker-month-nav-before-width | The width property for the ::before pseudo-elements used for navigating months | 24px | The ::before pseudo-elements are used for the icons |
 * | --hm-date-time-picker-month-prev-before-content | The content property for the ::before pseudo-element used for navigating to the previous month | '⮜' | The ::before pseudo-elements are used for the icons |
 * | --hm-date-time-picker-month-next-before-content | The content property for the ::before pseudo-element used for navigating to the next month | '⮞' | The ::before pseudo-elements are used for the icons |
 * | --hm-date-time-picker-calendar-entry-body-display | The display property for the body of the calendar entry tab | grid | Defaults to using CSS Grid with 7 columns. Other properties depend on this value |
 * | --hm-date-time-picker-calendar-entry-body-grid-columns | The grid-template-columns property for the body of the calendar entry tab | repeat(7, 1fr) |  |
 * | --hm-date-time-picker-calendar-entry-body-grid-place-items | The place-items property for the body of the calendar entry tab | stretch center |  |
 * | --hm-date-time-picker-calendar-entry-body-margin | The margin property for the body of the calendar entry tab | 1rem 0 |  |
 * | --hm-date-time-picker-entry-button-background | The background shorthand property for the buttons used to select a day, month, or year | white | |
 * | --hm-date-time-picker-entry-button-border | The border shorthand property for the buttons used to select a day, month, or year | 1px solid #e0e0e0 | |
 * | --hm-date-time-picker-entry-button-border-radius | The border-radius shorthand property for the buttons used to select a day, month, or year | 0 | |
 * | --hm-date-time-picker-entry-button-width | The width property for the buttons used to select a day, month, or year | 100% | |
 * | --hm-date-time-picker-entry-button-hover-background-color | The background-color property for when the buttons used to select a day, month, or year are hovered | #e0e0e0 | |
 * | --hm-date-time-picker-entry-button-hover-cursor | The cursor property for when the buttons used to select a day, month, or year are hovered | pointer | |
 * | --hm-date-time-picker-entry-button-disabled-background-color | The background-color property for when the buttons used to select a day, month, or year are disabled | #e0e0e0 | |
 * | --hm-date-time-picker-entry-button-disabled-cursor | The cursor property for when the buttons used to select a day, month, or year are disabled | not-allowed | |
 * | --hm-date-time-picker-entry-button-other-background-color | The background-color property for when the buttons used to select a day, month, or year are from another month | rgba(0, 0, 0, 0.025) | |
 * | --hm-date-time-picker-entry-button-other-color | The color property for when the buttons used to select a day, month, or year are from another month | #595959 | |
 * | --hm-date-time-picker-entry-button-other-font-style | The font-style property for when the buttons used to select a day, month, or year are from another month | italic | |
 * | --hm-date-time-picker-entry-button-other-disabled-background-color | The background-color property for when the buttons used to select a day, month, or year are from another month and disabled | rgba(0, 0, 0, 0.025) | |
 * | --hm-date-time-picker-entry-button-other-disabled-cursor | The cursor property for when the buttons used to select a day, month, or year are from another month and disabled | not-allowed | |
 * | --hm-date-time-picker-entry-button-today-background-color | The background-color property for when the button used to select a day, month, or year is not from another month and is today | lemonchiffon | |
 * | --hm-date-time-picker-entry-button-today-color | The color property for when the button used to select a day, month, or year is not from another month and is today  | #000000 | |
 * | --hm-date-time-picker-entry-button-today-disabled-background-color | The background-color property for when the button used to select a day, month, or year is not from another month and is today and is disabled | white | |
 * | --hm-date-time-picker-entry-button-today-disabled-color | The color property for when the button used to select a day, month, or year is not from another month and is today and is disabled | #000000 | |
 * | --hm-date-time-picker-entry-button-selected-background-color | The background-color property for when the button used to select a day, month, or year is not from another month and is selected | lightblue | |
 * | --hm-date-time-picker-entry-button-selected-color | The color property for when the button used to select a day, month, or year is not from another month and is selected | #000000 | |
 * | --hm-date-time-picker-entry-button-selected-disabled-background-color | The background-color property for when the button used to select a day, month, or year is not from another month and is selected and disabled | lightpink | |
 * | --hm-date-time-picker-entry-button-selected-disabled-color | The color property for when the button used to select a day, month, or year is not from another month and is selected and disabled | #000000 | |
 * | --hm-date-time-picker-entry-input-min-height | The min-height property for the input element used for raw entry of values | 32px | |
 * | --hm-date-time-picker-footer-button-min-height | The min-height property for the buttons in the footer | 34px | |
 * | --hm-date-time-picker-footer-button-border | The border property for the buttons in the footer | 1px solid | Note that by default no color is provided so any existing colors for the borders remain |
 * | --hm-date-time-picker-footer-text-align | The text-align property for the footer | right | |
 * | --hm-date-time-picker-footer-button-cancel-background | The background shorthand property for the cancel button in the footer | transparent | |
 * | --hm-date-time-picker-footer-button-submit-background | The background shorthand property for the submit button in the footer | orange | |
 * | --hm-date-time-picker-footer-button-submit-color | The color property for the submit button in the footer | black | |
 */
class HMDateTimePicker extends HTMLElement {
  #format = undefined;
  #lang = undefined;
  #timeZone = undefined;
  constructor() {
    super();
    this.instanceId = Date.now();
    console.time(`constructor for instance ${this.instanceId}`);

    this.attachShadow({ mode: 'open' });
    const cssLink = document.createElement('style');
    cssLink.setAttribute('type', 'text/css');
    cssLink.textContent = `:host {
  display: var(--hm-date-time-picker-host-display, flex);
  position: var(--hm-date-time-picker-host-position, relative);
  max-width: var(--hm-date-time-picker-host-max-width, max-content);
}
:host > label {
  display: var(--hm-date-time-picker-label-display, inline);
  font-family: var(--hm-date-time-picker-label-font-family, inherit); 
  font-size: var(--hm-date-time-picker-label-font-size, 1rem); 
}
:host > label::after {
  content: var(--hm-date-time-picker-label-after-content, '');
  display: var(--hm-date-time-picker-label-after-display, none);
  font-family: var(--hm-date-time-picker-label-after-font-family, inherit); 
  font-size: var(--hm-date-time-picker-label-after-font-size, 1rem); 
  color: var(--hm-date-time-picker-label-after-color, inherit); 
}
input.date-time {
  background: var(--hm-date-time-picker-input-background, );
  color: var(--hm-date-time-picker-input-color, );
  display: var(--hm-date-time-picker-input-display, );
  font-family: var(--hm-date-time-picker-input-font-family, ); 
  font-size: var(--hm-date-time-picker-input-font-size, ); 
  padding: var(--hm-date-time-picker-input-padding, ); 
}
.date-time-picker {
  display: none;
}
.date-time-picker.show {
  display: var(--hm-date-time-picker-display, flex);
  background-color: var(--hm-date-time-picker-bg-color, white);
  flex-flow: var(--hm-date-time-picker-flex-flow, column nowrap);
  position: var(--hm-date-time-picker-position, absolute);
  top: var(--hm-date-time-picker-top, 0.5rem);
  right: var(--hm-date-time-picker-right, 0);
  bottom: var(--hm-date-time-picker-bottom, auto);
  left: var(--hm-date-time-picker-left, auto);
  width: var(--hm-date-time-picker-width, 18rem);
  z-index: var(--hm-date-time-picker-z-index, 2);
  border: var(--hm-date-time-picker-border, 1px solid #e0e0e0);
  box-shadow: var(--hm-date-time-picker-box-shadow, 0 0 4px 1px #ececec);
  padding: var(--hm-date-time-picker-padding, 0.5rem 1rem);
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
  height: var(--hm-date-time-picker-entry-button-height, 34px);
  font-size: var(--hm-date-time-picker-entry-button-font-size, 13.3333px);
  border-width: var(--hm-date-time-picker-entry-button-border-width, 1px);
  padding: var(--hm-date-time-picker-entry-button-padding, 1px 6px);
}
.date-picker.calendar-entry .calendar-entry select {
  height: unset;
  font-size: unset;
  border-width: var(--hm-date-time-picker-entry-select-border-width, 1px);
  padding: unset;
}
.use-tabs .date-picker.year-entry .year-entry {
  max-height: calc(var(--hm-date-time-picker-entry-button-height, 34px) * 6);
  overflow-y: auto;
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
  transition: var(--hm-date-time-picker-transition, all ease-in 150ms);
}
.date-picker:not(.date-time-picker) .year-entry,
.date-picker:not(.date-time-picker) .month-entry {
  display: var(--hm-date-time-picker-tab-entry-display, grid);
  grid-template-columns: var(--hm-date-time-picker-tab-entry-grid-columns, repeat(4, 1fr));
  grid-template-rows: var(--hm-date-time-picker-tab-entry-grid-rows, repeat(6, 1fr));
  place-items: var(--hm-date-time-picker-tab-entry-grid-place-items, stretch center);
  transition: var(--hm-date-time-picker-transition, all ease-in 150ms);
}

.calendar-entry-header {
  display: var(--hm-date-time-picker-calendar-header-display, flex);
}

.calendar-entry-header label {
  display: var(--hm-date-time-picker-calendar-header-label-display, inline-block);
  position: var(--hm-date-time-picker-calendar-header-label-position, absolute);
  left: var(--hm-date-time-picker-calendar-header-label-left, -10000px);
}

.month-utc {
  flex: var(--hm-date-time-picker-month-select-entry-flex, 1 1 30%);
}

.year-utc {
  flex: var(--hm-date-time-picker-year-select-entry-flex, 1 1 30%);
}

.month-year-selector {
  flex: var(--hm-date-time-picker-tab-entry-month-year-flex, 1 1 60%);
}

.date-time-picker.show.use-tabs .month-utc,
.date-time-picker.show.use-tabs .year-utc {
  display: none;
}
.date-time-picker.show.use-selects .month-year-selector {
  display: none;
}

.month-nav {
  background: var(--hm-date-time-picker-month-nav-background, transparent);
  border: var(--hm-date-time-picker-month-nav-border, 1px solid transparent);
  border-radius: var(--hm-date-time-picker-month-nav-border-radius, 0);
  color: var(--hm-date-time-picker-month-nav-color, inherit);
  min-height: var(--hm-date-time-picker-month-nav-min-height, 24px);
  min-width: var(--hm-date-time-picker-month-nav-min-width, 24px);
  position: var(--hm-date-time-picker-month-nav-position, relative);
  padding: var(--hm-date-time-picker-month-nav-padding, 0);
  text-indent: var(--hm-date-time-picker-month-nav-text-indent, -10000px);
}

.month-nav::before {
  color: var(--hm-date-time-picker-month-nav-before-color, black);
  font-size: var(--hm-date-time-picker-month-nav-before-font-size, 1rem);
  height: var(--hm-date-time-picker-month-nav-before-height, 24px);
  left: var(--hm-date-time-picker-month-nav-before-left, 0);
  position: var(--hm-date-time-picker-month-nav-before-position, absolute);
  text-indent: var(--hm-date-time-picker-month-nav-before-text-indent, 0);
  top: var(--hm-date-time-picker-month-nav-before-top, 0);
  width: var(--hm-date-time-picker-month-nav-before-width, 24px);
}

.month-prev-utc::before {
  content: var(--hm-date-time-picker-month-prev-before-content, '⮜');
}

.month-next-utc::before {
  content: var(--hm-date-time-picker-month-next-before-content, '⮞');
}

.calendar-entry-body {
  display: var(--hm-date-time-picker-calendar-entry-body-display, grid);
  grid-template-columns: var(--hm-date-time-picker-calendar-entry-body-grid-columns, repeat(7, 1fr));
  place-items: var(--hm-date-time-picker-calendar-entry-body-grid-place-items, stretch center);
  margin: var(--hm-date-time-picker-calendar-entry-body-margin, 1rem 0);
}
button.calendar-entry-body-date,
button.year-entry-year,
button.month-entry-month {
  width: var(--hm-date-time-picker-entry-button-width, 100%);
  height: var(--hm-date-time-picker-entry-button-height, 34px);
  border: var(--hm-date-time-picker-entry-button-border, 1px solid #e0e0e0);
  border-radius: var(--hm-date-time-picker-entry-button-border-radius, 0);
  background: var(--hm-date-time-picker-entry-button-background, white);
}
button.calendar-entry-body-date:hover,
button.year-entry-year:hover,
button.month-entry-month:hover {
  background-color: var(--hm-date-time-picker-entry-button-hover-background-color, #e0e0e0);
  cursor: var(--hm-date-time-picker-entry-button-hover-cursor, pointer);
}
button.calendar-entry-body-date:disabled,
button.year-entry-year:disabled,
button.month-entry-month:disabled {
  background-color: var(--hm-date-time-picker-entry-button-disabled-background-color, white);
  cursor: var(--hm-date-time-picker-entry-button-disabled-cursor, not-allowed);
}
button.calendar-entry-body-date[data-date-other='true'],
button.year-entry-year[data-date-other='true'],
button.month-entry-month[data-date-other='true'] {
  background-color: var(--hm-date-time-picker-entry-button-other-background-color, rgba(0, 0, 0, 0.025));
  color: var(--hm-date-time-picker-entry-button-other-color, #595959);
  font-style: var(--hm-date-time-picker-entry-button-other-font-style, italic);
}
button.calendar-entry-body-date[data-date-other='true']:disabled,
button.year-entry-year[data-date-other='true']:disabled,
button.month-entry-month[data-date-other='true']:disabled {
  background-color: var(--hm-date-time-picker-entry-button-other-disabled-background-color, rgba(0, 0, 0, 0.025));
  cursor: var(--hm-date-time-picker-entry-button-other-disabled-cursor, not-allowed);
}
button.calendar-entry-body-date[data-is-today='true'][data-date-other='false'],
button.year-entry-year[data-is-today='true'][data-date-other='false'],
button.month-entry-month[data-is-today='true'][data-date-other='false'] {
  background-color: var(--hm-date-time-picker-entry-button-today-background-color, lemonchiffon);
  color: var(--hm-date-time-picker-entry-button-today-color, #000000);
}
button.calendar-entry-body-date[data-is-today='true'][data-date-other='false']:disabled,
button.year-entry-year[data-is-today='true'][data-date-other='false']:disabled,
button.month-entry-month[data-is-today='true'][data-date-other='false']:disabled {
  background-color: var(--hm-date-time-picker-entry-button-today-disabled-background-color, white);
  color: var(--hm-date-time-picker-entry-button-today-disabled-color, #000000);
}
button.calendar-entry-body-date[data-is-selected='true'],
button.year-entry-year[data-is-selected='true'],
button.month-entry-month[data-is-selected='true'],
button.calendar-entry-body-date[data-is-today='true'][data-date-other='false'][data-is-selected='true'],
button.year-entry-year[data-is-today='true'][data-date-other='false'][data-is-selected='true'],
button.month-entry-month[data-is-today='true'][data-date-other='false'][data-is-selected='true'] {
  background-color: var(--hm-date-time-picker-entry-button-selected-background-color, lightblue);
  color: var(--hm-date-time-picker-entry-button-selected-color, #000000);
}
button.calendar-entry-body-date[data-is-selected='true'][data-date-other='false']:disabled,
button.year-entry-year[data-is-selected='true'][data-date-other='false']:disabled,
button.month-entry-month[data-is-selected='true'][data-date-other='false']:disabled {
  background-color: var(--hm-date-time-picker-entry-button-selected-disabled-background-color, lightpink);
  color: var(--hm-date-time-picker-entry-button-selected-disabled-color, #000000);
}
.date-time-picker input {
  min-height: var(--hm-date-time-picker-entry-input-min-height, 32px);
}

button.picker-footer {
  min-height: var(--hm-date-time-picker-footer-button-min-height, 34px);
  border: var(--hm-date-time-picker-footer-button-border, 1px solid);
}

div.picker-footer {
  text-align: var(--hm-date-time-picker-footer-text-align, right);
}

.picker-footer-cancel {
  background: var(--hm-date-time-picker-footer-button-cancel-background, transparent);
}

.picker-footer-submit {
  background: var(--hm-date-time-picker-footer-button-submit-background, orange);
  color: var(--hm-date-time-picker-footer-button-submit-color, black);
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
  /**
   * Gets or sets the format or formats for this picker.
   * @description Allows for multiple formats for validation, but the first format in the array 
   * will be used for formatting selected dates. Uses the format described by the document's or 
   * browser's default language if not provided.
   */
  get format() {
    return this.#format;
  }
  set format(value) {
    if (this.#format !== value && value && value.length) {
      const formatResult = DateHelper.parseFormats(value);
      if (formatResult.valid) {
        this.#format = formatResult.value;
      }
    }
  }
  /**
   * Gets or sets the language code(s) ("locale(s)") to be used by the formatter and parser for dates.
   * @description Allows for multiple languages for validation, but the first language in the array 
   * will be used for formatting selected dates. Uses the language described by the document's or 
   * browser's default language if not provided.
   */
  get lang() {
    return this.#lang;
  }
  set lang(value) {
    if (this.#lang !== value && value && value.length) {
      const langResult = DateHelper.parseLocales(value);
      if (langResult.valid) {
        this.#lang = langResult.value;
      }
    }
  }
  /**
   * Gets or sets the IANA time zone code to be used by the formatter and parser for dates.
   * @description Allows for only a single time zone to be used. Defaults to 'UTC'.
   */
  get timeZone() {
    return this.#timeZone;
  }
  set timeZone(value) {
    if (this.#timeZone !== value && typeof value === 'string' && value.length) {
      const timeZoneResult = DateHelper.parseTimeZone(value);
      if (timeZoneResult.valid) {
        this.#timeZone = timeZoneResult.value;
      }
    }
  }
  /**
   * Gets the language codes, formats, and time zone as an object (with language code presented as locale).
   */
  get dateHelperOptions() {
    return {
      locale: this.lang,
      format: this.format,
      timeZone: this.timeZone
    };
  }
  /**
   * Invoked when the HMDateTimePicker is first connected to the document's DOM.
   */
  connectedCallback() {
    if (this.isConnected) {
      this.init();
    }
  }
  /**
   * Invoked when the HMDateTimePicker is disconnected from the document's DOM.
   */
  disconnectedCallback() {
    this.destroy();
  }
  /**
   * Invoked when the HMDateTimePicker is moved to a new document.
   */
  adoptedCallback() {
    // Currently no-op
  }
  /**
   * Invoked when one of the HMDateTimePicker's attributes is added, removed, or changed.
   */
  attributeChangedCallback(name, oldValue, newValue) {
    console.log('attributeChangedCallback', name, oldValue, newValue);
    switch (name) {
      case 'min-date':
      case 'minDate':
        this.minDate = newValue;
        break;
      case 'max-date':
      case 'maxDate':
        this.maxDate = newValue;
        break;
      case 'show-on':
      case 'showOn':
        this.showOn = newValue;
        break;
    }
  }
  /**
   * Gets an array of attributes that should cause attributeChangedCallback to be called during the 
   * lifetime of the HMDateTimePicker.
   */
  static get observedAttributes() {
    return ['min-date', 'minDate', 'max-date', 'maxDate', 'show-on', 'showOn'];
  }
  /**
   * Gets a NodeList of the buttons used for selecting a specific date, whether they are disabled or not.
   */
  get dateButtons() {
    return this.panelElement.querySelectorAll(
      'button.calendar-entry-body-date'
    );
  }
  /**
   * Gets an object from the attributes of the element
   * @param {HTMLElement} element The element from which to create an object.
   * @returns {object} A hash of the attributes of the element.
   */
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
        element.getAttribute('panelElementName') ??
        element.getAttribute('panelTag') ??
        element.getAttribute('panel-tag'),
      panelElementClassName:
        element.getAttribute('panel-class') ??
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
        element.getAttribute('min') ?? element.getAttribute('min-date') ?? element.getAttribute('minDate'),
      maxDate:
        element.getAttribute('max') ?? element.getAttribute('max-date') ?? element.getAttribute('maxDate'),
      disableDate:
        element.getAttribute('disable') ??
        element.getAttribute('disable-date') ??
        element.getAttribute('disableDate'),
      useYearAndMonthTabs:
        element.getAttribute('use-tabs') ??
        element.getAttribute('use-year-and-month-tabs') ??
        element.getAttribute('useYearAndMonthTabs'),
      useYearAndMonthSelects:
        element.getAttribute('use-selects') ??
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
      buttonIconClassName:
        element.getAttribute('button-icon-class') ??
        element.getAttribute('buttonIconClassName'),
      title: element.getAttribute('title'),
      weekStartsOn: this.parseWeekday(
        element.getAttribute('week-start') ??
        element.getAttribute('week-starts-on') ??
        element.getAttribute('weekStartsOn')
      ),
      ttDateFormat: element.getAttribute('ttDateFormat') ?? element.getAttribute('tt-date-format'),
      ttTabsButtonFormat: element.getAttribute('ttTabsButtonFormat') ?? element.getAttribute('tt-tabs-button-format'),
      ttPrevButtonFormat: element.getAttribute('ttPrevButtonFormat') ?? element.getAttribute('tt-prev-button-format'),
      ttNextButtonFormat: element.getAttribute('ttNextButtonFormat') ?? element.getAttribute('tt-next-button-format'),
      tabsButtonFormat: element.getAttribute('tabsButtonFormat') ?? element.getAttribute('tabs-button-format'),
      prevText: element.getAttribute('prevText') ?? element.getAttribute('prev-text') ?? element.getAttribute('prev'),
      prevHtml: element.getAttribute('prevHtml') ?? element.getAttribute('prev-html'),
      nextText: element.getAttribute('nextText') ?? element.getAttribute('next-text') ?? element.getAttribute('next'),
      nextHtml: element.getAttribute('nextHtml') ?? element.getAttribute('next-html'),
      showManualEntry: element.getAttribute('showManualEntry') ?? element.getAttribute('show-manual-entry') ?? element.getAttribute('show-manual'),
      allowManualEntry: element.getAttribute('allowManualEntry') ?? element.getAttribute('allow-manual-entry') ?? element.getAttribute('allow-manual'),
      closePanelOnDateSelect: element.getAttribute('closePanelOnDateSelect') ?? element.getAttribute('close-panel-on-date-select') ?? element.getAttribute('close-on-select'),
      closePanelOnTimeSelect: element.getAttribute('closePanelOnTimeSelect') ?? element.getAttribute('close-panel-on-time-select') ?? element.getAttribute('close-on-select'),
      lang: element.getAttribute('lang'),
      timeZone: element.getAttribute('timeZone') ?? element.getAttribute('time-zone') ?? element.getAttribute('tz'),
      showAllMonths: element.getAttribute('showAllMonths') ?? element.getAttribute('show-all-months') ?? element.getAttribute('show-all'),
      showAllYears: element.getAttribute('showAllYears') ?? element.getAttribute('show-all-yYears') ?? element.getAttribute('show-all'),
    };
  }
  /**
   * Parses a weekday from a name or number.
   * @param {string|number|null} value value to parse as an English weekday name, or a number, or null
   * @returns if null, null; if string, 0 for Sunday through 6 for Saturday; if number, the number.
   */
  parseWeekday(value) {
    if (value == null) {
      return value;
    }
    if (isNaN(parseInt(value))) {
      switch (value[0].toUpperCase() + value.slice(1).toLowerCase()) {
        case 'Monday':
        case 'Mon':
        case 'Mo':
        case 'M':
          return 1;
        case 'Tuesday':
        case 'Tue':
        case 'Tu':
          return 2;
        case 'Wednesday':
        case 'Wed':
        case 'We':
        case 'W':
          return 3;
        case 'Thursday':
        case 'Thu':
        case 'Th':
          return 4;
        case 'Friday':
        case 'Fri':
        case 'Fr':
        case 'F':
          return 5;
        case 'Saturday':
        case 'Sat':
        case 'Sa':
          return 6;
        case 'Sunday':
        case 'Sun':
        case 'Su':
        default:
          return 0;
      }
    } else {
      return parseInt(value, 10);
    }
  }
  /**
   * Normalizes a Date (creates a UTC date from a local date, creates a local date from a UTC date)
   * @param {Date} value The Date from which to extract a normalized Date value
   * @returns {Date} The normalized Date
   */
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
  /**
   * Gets the current Date, using the presently set options.
   * @returns The current Date, according to the current options.
   */
  getNow() {
    return DateHelper.now(this.dateHelperOptions);
  }
  /**
   * Parses a value as a Date.
   * @param {Date|undefined|number|string} value The value to parse.
   * @param {Date|undefined|number|string} defaultValue The default value to use if value is unparseable.
   * @param {string|string[]} format Defaults to the value of the format property; the format(s) to use
   * when parsing the value.
   * @returns The Date, if value was parseable, or the defaultValue, if that was parseable, or an invalid 
   * Date if nothing worked (anything returned is marked as "parsed")
   */
  parseDate(value, defaultValue, format = this.format) {
    let returnValue = new Date('Invalid');
    if (typeof value === 'object' && value instanceof Date) {
      if (Number.isNaN(value.valueOf())) {
        returnValue = this.parseDate(defaultValue);
      } else {
        returnValue = this.getDate(value);
      }
    }
    if (typeof value === 'undefined') {
      returnValue = defaultValue ? this.parseDate(defaultValue) : DateHelper.now(this.dateHelperOptions);
    }
    if (typeof value === 'number') {
      returnValue = DateHelper.parseDate(value, this.dateHelperOptions);
    }
    if (typeof value === 'string') {
      format = Array.isArray(format) ? format : [format];
      while (format.some(f => Array.isArray(f))) {
        format = format.flat();
      }
      // TODO: Parse Date
      // assume it parses as local
      if (value.trim().length === 0) {
        returnValue = this.parseDate(defaultValue, undefined, format);
      } else {
        const parsed = DateHelper.parseDate(value, { ...this.dateHelperOptions, format });
        returnValue = this.getDate(parsed);
      }
    }
    returnValue.wasParsed = true;
    return returnValue;
  }
  /**
   * Formats the current value as a string and sets the internal input element's value 
   * to the formatted value.
   */
  formatDate() {
    const val = this.value;
    const formatted = DateHelper.formatDate(val, this.dateHelperOptions);
    this.pickerInputElement.value = formatted;
    if (this.useYearAndMonthTabs) {
      const myFormatted = this.monthYearFormatter.format(val);
      this.monthYearSelector.querySelector(
        '.selected'
      ).textContent = myFormatted;
    }
  }
  /**
   * Formats the current value as a string and sets the external input element's value 
   * to the formatted value.
   */
  setSelectedValue() {
    const val = this.value;
    const formatted = DateHelper.formatDate(val, this.dateHelperOptions);
    this.inputElement.value = formatted;
  }
  /**
   * Gets the value of the external input, parses it as a date, and sets the value of
   * the control to that value (effectively formatting what the user enters in the
   * format specified)
   */
  parseInputValue() {
    const val = this.inputElement.value;
    this.value = this.parseDate(val, this.defaultDate);
    this.setSelectedValue();
  }
  /**
   * Populates the select element with options representing the months of the year.
   * @param {Date} monthDate A Date, set to any day in the month to be populated.
   * @param {number} monthCurrent The currently displayed month, using 0-based indexing
   */
  populateMonthSelect(monthDate, monthCurrent) {
    console.time('populateMonthSelect');
    this.monthSelect.innerHTML = '';
    let minMonth = 0;
    let maxMonth = 11;
    for (let i = minMonth; i < maxMonth + 1; i++) {
      monthDate.setMonth(i);
      let monthOption = document.createElement('option');
      monthOption.value = i;
      monthOption.text = this.monthLongFormatter.format(monthDate);
      monthOption.selected = i === monthCurrent;
      const allDatesInMonth = this.calculateAllDatesInMonth(monthDate);
      monthOption.disabled = this.allDatesAreDisabled(allDatesInMonth);
      this.monthSelect.add(monthOption);
    }
    console.timeEnd('populateMonthSelect');
  }
  /**
   * Populates the tab with buttons representing the months of the year.
   * @param {Date} monthDate A Date, set to any date in the month to use
   * @param {Date} dateDate The Date to use as the selected month
   */
  populateMonthTab(monthDate, dateDate) {
    console.time('populateMonthTab');
    this.monthEntry.innerHTML = '';
    // Cache the original date selected (e.g., 31 for March 31st)
    const originalDay = monthDate.getDate();
    for (let i = 0; i < 12; i++) {
      monthDate = DateHelper.setClosestDayInMonth(monthDate, i, originalDay);
      const buttonLabel = this.monthYearFormatter.format(monthDate);
      const buttonText = this.monthShortFormatter.format(monthDate);
      const isoDate = this.isoFormatter.format(monthDate);
      let monthButton = this.monthEntry.querySelector(
        `button[data-date="${isoDate}"]`
      );
      if (monthButton == null) {
        monthButton = document.createElement('button');
        monthButton.setAttribute('type', 'button');
        monthButton.classList.add('month-entry-month');
        this.monthEntry.appendChild(monthButton);
      }
      monthButton.setAttribute('title', buttonLabel);
      this.clearDataset(monthButton);
      monthButton.dataset.date = isoDate;
      monthButton.dataset.isToday =
        monthDate.getFullYear() === DateHelper.now(this.dateHelperOptions).getFullYear() &&
        monthDate.getMonth() === DateHelper.now(this.dateHelperOptions).getMonth();
      monthButton.dataset.isSelected =
        monthDate.getFullYear() === dateDate.getFullYear() &&
        monthDate.getMonth() === dateDate.getMonth();
      monthButton.textContent = buttonText;
      const allDatesInMonth = this.calculateAllDatesInMonth(monthDate);
      monthButton.disabled = this.allDatesAreDisabled(allDatesInMonth);
    }
    console.timeEnd('populateMonthTab');
  }
  /**
   * Populates the months of the year, either the select element or the
   * tab, depending on what the control has been set to use.
   */
  populateMonths() {
    console.time('populateMonths');
    const dateDate = this.getDate(this.value);
    const monthDate = this.getDate(this.value);
    const monthCurrent = monthDate.getMonth();
    if (this.useYearAndMonthSelects) {
      this.populateMonthSelect(monthDate, monthCurrent);
    }
    if (this.useYearAndMonthTabs) {
      this.populateMonthTab(monthDate, dateDate);
    }
    console.timeEnd('populateMonths');
  }
  /**
   * Populates a select element with years around the current year.
   * @param {Date} yearDate A Date set to the year to display
   * @param {number} yearCurrent The current year
   * @param {number} yearSelected The selected year
   */
  populateYearSelect(yearDate, yearCurrent, yearSelected) {
    console.time('populateYearSelect');
    // Faster method for emptying select of its options
    this.yearSelect.innerHTML = '';
    const maxYear = Math.max(yearCurrent + 12, this.maxDate.getFullYear());
    const minYear = Math.min(yearCurrent, this.minDate.getFullYear());
    for (let i = minYear; i < maxYear + 1; i++) {
      yearDate.setFullYear(i);
      let yearOption = document.createElement('option');
      yearOption.value = i;
      yearOption.text = this.yearFormatter.format(yearDate);
      yearOption.selected = i === yearSelected;
      const allDatesInYear = this.calculateAllDatesInYear(yearDate);
      yearOption.disabled = this.allDatesAreDisabled(allDatesInYear);
      this.yearSelect.add(yearOption);
    }
    console.timeEnd('populateYearSelect');
  }
  /**
   * Populates the years as buttons shown when the user is selecting a year in a tab
   * @param {Date} yearDate A Date, set to the year on which to start
   * @param {number} yearCurrent The current Year
   * @param {Date} dateDate The selected Date
   */
  populateYearTab(yearDate, yearCurrent, dateDate) {
    console.time('populateYearTab');
    this.yearEntry.innerHTML = '';
    const minYear = Math.min(yearCurrent, this.minDate.getFullYear());
    const maxYear = Math.max(yearCurrent + 24, this.maxDate.getFullYear());
    for (let i = minYear; i < maxYear; i++) {
      yearDate.setFullYear(i);
      const buttonLabel = this.yearFormatter.format(yearDate);
      let yearButton = this.yearEntry.querySelector(
        `button[title="${buttonLabel}"]`
      );
      if (yearButton == null) {
        yearButton = document.createElement('button');
        yearButton.setAttribute('type', 'button');
        yearButton.classList.add('year-entry-year');
        this.yearEntry.appendChild(yearButton);
      }
      yearButton.setAttribute('title', buttonLabel);
      this.clearDataset(yearButton);
      yearButton.dataset.date = this.isoFormatter.format(yearDate);
      yearButton.dataset.isToday =
        yearDate.getFullYear() === DateHelper.now(this.dateHelperOptions).getFullYear();
      yearButton.dataset.isSelected =
        yearDate.getFullYear() === dateDate.getFullYear();
      yearButton.textContent = yearDate.getFullYear();
      const allDatesInYear = this.calculateAllDatesInYear(yearDate);
      yearButton.disabled = this.allDatesAreDisabled(allDatesInYear);
    }
    console.timeEnd('populateYearTab');
  }
  /**
   * Populates the years, either the select element or the
   * tab, depending on what the control has been set to use.
   */
  populateYears() {
    console.time('populateYears');
    const dateDate = this.getDate(this.value);
    const yearDate = this.getDate(this.value);
    const yearSelected = yearDate.getFullYear();
    const yearCurrent = DateHelper.now(this.dateHelperOptions).getFullYear();
    if (this.useYearAndMonthSelects) {
      this.populateYearSelect(yearDate, yearCurrent, yearSelected)
    }
    if (this.useYearAndMonthTabs) {
      this.populateYearTab(yearDate, yearCurrent, dateDate)
    }
    console.timeEnd('populateYears');
  }
  /**
   * Indicates if the specified date is disabled or not
   * @param {Date} date The Date to determine whether it is disabled
   * @returns true if the date is to be disabled; otherwise, false
   */
  dateIsDisabled(date) {
    return (
      this.disableDate(date) ||
      DateHelper.isBeforeDay(date, this.minDate) ||
      DateHelper.isSameDay(date, this.maxDate) ||
      DateHelper.isAfterDay(date, this.maxDate)
    );
  }
  /**
   * Clears the values of any data in the element.
   * @param {HTMLOrForeignElement} el The element whose dataset will be cleared.
   */
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
  /**
   * Populates the buttons for the days of the month in the calendar view.
   */
  populateDates() {
    console.time('populateDates');
    const dateDate = new Date(this.value);
    const startDate = DateHelper.getFirstSunday(dateDate);
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
      button.setAttribute('title', this.dateFormatter.format(buttonDate));
      this.clearDataset(button);
      button.dataset.date = this.isoFormatter.format(buttonDate);
      button.dataset.dateOther = buttonDate.getMonth() !== dateDate.getMonth();
      button.dataset.isToday = DateHelper.isSameDay(buttonDate, DateHelper.now(this.dateHelperOptions));
      button.dataset.isSelected = DateHelper.isSameDay(buttonDate, dateDate);
      button.setAttribute('aria-selected', button.dataset.isSelected);
      button.textContent = buttonDate.getDate();
      button.disabled = this.dateIsDisabled(buttonDate);
    }
    console.timeEnd('populateDates');
  }
  /**
   * Calculates all of the Dates in the month and year of the given monthDate
   * @param {Date} monthDate A Date in the month for which dates will be calculated
   * @returns An array of all Dates in the given month and year (may be cached)
   */
  calculateAllDatesInMonth(monthDate) {
    const keyParts = this.monthKeyFormatter.formatToParts(monthDate);
    const key =
      keyParts.find((p) => p.type === 'year').value +
      keyParts.find((p) => p.type === 'month').value;
    if (DateCache.allDatesInMonth.hasOwnProperty(key)) {
      return DateCache.allDatesInMonth[key];
    }
    const allDates = [];
    const first = DateHelper.getFirstDateOfMonth(monthDate);
    const last = DateHelper.getLastDateOfMonth(monthDate);
    const temp = new Date(first.valueOf());
    while (temp.valueOf() <= last.valueOf()) {
      allDates.push(new Date(temp.valueOf()));
      temp.setDate(temp.getDate() + 1);
    }
    DateCache.allDatesInMonth[key] = allDates;
    return allDates;
  }
  /**
   * Calculates all dates in a year, caches and returns the array
   * @param {Date} yearDate A Date in the year whose Dates will be calculated
   * @returns An array of all Dates in the given year (may be cached)
   */
  calculateAllDatesInYear(yearDate) {
    const year = this.useUTC
      ? yearDate.getUTCFullYear()
      : yearDate.getFullYear();
    const key = year.toString();
    if (DateCache.allDatesInYear.hasOwnProperty(key)) {
      return DateCache.allDatesInYear[key];
    }
    const allDates = [];
    let temp = new Date(yearDate.valueOf());
    temp.setMonth(0);
    const first = DateHelper.getFirstDateOfMonth(temp);
    temp.setMonth(11);
    const last = DateHelper.getLastDateOfMonth(temp);
    temp = new Date(first.valueOf());
    while (DateHelper.isBeforeDay(temp, last) || DateHelper.isSameDay(temp, last)) {
      allDates.push(new Date(temp.valueOf()));
      temp.setDate(temp.getDate() + 1);
    }
    DateCache.allDatesInYear[key] = allDates;
    return allDates;
  }
  /**
   * Indicates whether all dates in the array given are to be disabled or not.
   * @param {Date[]} dates The array of Dates to examine.
   * @returns true if all dates in the array are to be disabled; otherwise, false.
   */
  allDatesAreDisabled(dates) {
    //console.time(`allDatesAreDisabled (${dates.length} dates)`);
    const allDatesDisabled = dates.every((dt) => this.dateIsDisabled(dt));
    //console.timeEnd(`allDatesAreDisabled (${dates.length} dates)`);
    return allDatesDisabled;
  }
  /**
   * Repopulates the months, years, and dates of the control.
   */
  repopulate() {
    console.time('repopulate');
    this.populateMonths();
    this.populateYears();
    this.populateDates();
    let lastMonth = new Date(this.value.valueOf());
    lastMonth = DateHelper.setClosestDayInMonth(lastMonth, lastMonth.getMonth() - 1, lastMonth.getDate());
    const lastMonthDates = this.calculateAllDatesInMonth(lastMonth);
    this.prevMonth.disabled = this.allDatesAreDisabled(lastMonthDates);
    let nextMonth = new Date(this.value.valueOf());
    nextMonth = DateHelper.setClosestDayInMonth(nextMonth, nextMonth.getMonth() + 1, nextMonth.getDate());
    const nextMonthDates = this.calculateAllDatesInMonth(nextMonth);
    this.nextMonth.disabled = this.allDatesAreDisabled(nextMonthDates);
    console.timeEnd('repopulate');
  }
  /**
   * Dispatches an event of the given name and reports on whether consumers should
   * proceed or not.
   * @param {string} eventName The name of the event to dispatch
   * @param {Event} originalEvent The original event raised
   * @param {any} value The value to pass along to consumers of the event
   * @returns true if either the event's cancelable attribute value is false, 
   * or the event's preventDefault method was not triggered; otherwise, false
   */
  dispatchEventAndReport(eventName, originalEvent, value) {
    let proceed = true;
    const event = new CustomEvent(eventName, {
      detail: {
        originalEvent,
        value,
        dtpTarget: this
      }
    });
    proceed = this.dispatchEvent(event);
    return proceed;
  }
  /**
   * Opens the panel if the 'hm-dtp-open' event is not prevented from occurring.
   * @returns void
   */
  openPanel() {
    let proceed = this.dispatchEventAndReport('hm-dtp-open', undefined, this.value);
    if (!proceed) {
      return;
    }

    this.panelElement.classList.add('show');
    this.panelElement.setAttribute('aria-expanded', 'true');
    this.shadowRoot.host.setAttribute('aria-expanded', 'true');
  }
  /**
   * Closes the panel if the 'hm-dtp-close' event is not prevented.
   * @returns void
   */
  closePanel() {
    let proceed = this.dispatchEventAndReport('hm-dtp-close', undefined, this.value);
    if (!proceed) {
      return;
    }

    this.panelElement.classList.remove('show');
    this.panelElement.setAttribute('aria-expanded', 'false');
    this.shadowRoot.host.setAttribute('aria-expanded', 'false');
  }
  /**
   * Parses the current value of the external input and resets the control
   * to use the parsed value (or the default if not parseable)
   */
  parseCurrentText() {
    this.value = this.parseDate(this.inputElement.value, this.defaultDate);
    this.repopulate();
    this.formatDate();
  }
  /**
   * Raised when a key is moved down
   * @param {Event} e The keydown event that triggered this event
   */
  keyDown(e) {
    console.log('keyDown', e.target, e.key);
    if (
      e.target.closest('input') == this.inputElement &&
      e.key === 'ArrowDown'
    ) {
      this.parseCurrentText();
      this.openPanel();
    }
  }
  /**
   * Raised when the external input element in the control gets focus, 
   * or the button element is clicked (if the control has one)
   * @param {Event} e The focus event that triggered this event handler
   */
  gotFocus(e) {
    console.log('gotFocus', e.target);
    this.parseCurrentText();
    this.openPanel();
  }
  /**
   * Raised when the external input element in the control loses focus
   * @param {Event} e The focusout event that triggered this event handler
   */
  lostFocus(e) {
    console.log('lostFocus', e.target);
    this.parseInputValue();
  }
  /**
   * Raised when the HTML element receives the click event
   * @param {Event} e The focus event that triggered this event handler
   */
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
      this.closePanel();
      e.stopPropagation();
    }
  }
  /**
   * Raised when an entry button in the control is clicked (e.g., calendar date, year, month)
   * @param {Event} e The event which triggered this event handler
   * @returns void
   */
  dateSelected(e) {
    console.log('dateSelected', e.target);
    const newValue = this.parseDate(e.target.dataset.date, undefined, 'yyyy-MM-dd');
    let proceed = this.dispatchEventAndReport('hm-dtp-date-select', e, newValue);
    if (!proceed) {
      e.preventDefault();
      return;
    }

    this.value = newValue;
    e.target.setAttribute('aria-selected', true);
    e.target.dataset.isSelected = true;
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
    if (e.target.matches('.calendar-entry-body-date')) {
      Array.from(e.target.parentElement.querySelectorAll('button.calendar-entry-body-date'))
        .filter(button => button !== e.target)
        .forEach(button => {
          button.setAttribute('aria-selected', 'false');
          button.dataset.isSelected = false;
        });
    }
  }
  /**
   * Raised when the user clicks on the button to navigage to the previous month
   * @param {Event} e The Event information
   * @returns void
   */
  prevClicked(e) {
    console.log('prevClicked', e.target);
    // Make sure that keeping the same selected day (e.g., 31st),
    // keeps the desired selected month (e.g., Feb)
    // If not, subtract days until it is in the desired month
    let desiredMonth = this.value.getMonth() - 1;
    let prevDate = new Date(this.value.valueOf());
    prevDate = DateHelper.setClosestDayInMonth(prevDate, desiredMonth, this.value.getDate());

    // Make sure that the same selected day in the new month is
    // not disabled. If so, add days until it is on an
    // enabled date.
    while (this.dateIsDisabled(prevDate)) {
      prevDate.setDate(prevDate.getDate() + 1);
    }

    let proceed = this.dispatchEventAndReport('hm-dtp-prev-month', e, prevDate);
    if (!proceed) {
      e.preventDefault();
      return;
    }

    this.value = prevDate;
    this.formatDate();
    this.repopulate();
  }
  /**
   * Raised when the button is clicked to go to the next month
   * @param {Event} e Information about the event
   * @returns void
   */
  nextClicked(e) {
    console.log('nextClicked', e.target);
    // Make sure that keeping the same selected day (e.g., 31st),
    // keeps the desired selected month (e.g., Feb)
    // If not, subtract days until it is in the desired month
    let desiredMonth = this.value.getMonth() + 1;
    const nextDate = new Date(this.value.valueOf());
    nextDate = DateHelper.setClosestDayInMonth(nextDate, desiredMonth, this.value.getDate());

    // Make sure that the same selected day in the new month is
    // not disabled. If so, subtract days until it is on an
    // enabled date.
    while (this.dateIsDisabled(nextDate)) {
      nextDate.setDate(nextDate.getDate() - 1);
    }

    let proceed = this.dispatchEventAndReport('hm-dtp-next-month', e, nextDate);
    if (!proceed) {
      e.preventDefault();
      return;
    }

    this.value = nextDate;
    this.formatDate();
    this.repopulate();
  }
  /**
   * Raised when a month is selected from a month select element
   * @param {Event} e Information about the event
   * @returns void
   */
  monthSelected(e) {
    console.log('monthSelected', e.target);
    let newValue = DateHelper.setClosestDayInMonth(this.value, +e.target.value, this.value.getDate());
    let proceed = this.dispatchEventAndReport('hm-dtp-month-select', e, newValue);
    if (!proceed) {
      e.preventDefault();
      return;
    }

    this.value = newValue;
    this.formatDate();
    this.repopulate();
  }
  /**
   * Raise when a year is selected via the year select element
   * @param {Event} e Information about the event
   * @returns void
   */
  yearSelected(e) {
    console.log('yearSelected', e.target);
    let newValue = DateHelper.setClosestDayInYear(this.value, +e.target.value, this.value.getDate());
    let proceed = this.dispatchEventAndReport('hm-dtp-year-select', e, newValue);
    if (!proceed) {
      e.preventDefault();
      return;
    }

    this.value = newValue;
    this.formatDate();
    this.repopulate();
  }
  /**
   * Raised when the button showing the month and year above the calendar is clicked
   * @param {Event} e Information about the event
   */
  monthYearClicked(e) {
    console.log('monthYearClicked', e.target);
    e.preventDefault();
    this.datePickerElement.classList.remove('calendar-entry');
    this.datePickerElement.classList.add('year-entry');
  }
  /**
   * Raised when the cancel button in the footer is clicked (preventable via hm-dtp-cancel event)
   * @param {Event} e Information about the event
   * @returns void
   */
  cancelClicked(e) {
    console.log('cancelClicked', e.target);
    let proceed = this.dispatchEventAndReport('hm-dtp-cancel', e, this.value);
    if (!proceed) {
      e.preventDefault();
      return;
    }

    this.closePanel();
  }
  /**
   * Raised when the OK button is clicked in the footer (preventable via the hm-dtp-submit event)
   * @param {Event} e Information about the event
   * @returns void
   */
  submitClicked(e) {
    console.log('submitClicked', e.target);
    let proceed = this.dispatchEventAndReport('hm-dtp-submit', e, this.value);
    if (!proceed) {
      e.preventDefault();
      return;
    }

    this.setSelectedValue();
    this.closePanel();
  }
  /**
   * Raised when the panel is clicked. Used for delegation of the entry buttons.
   * @param {Event} e Information about the event
   */
  panelClicked(e) {
    console.log('panelClicked', e.target);
    if (
      e.target.matches('.calendar-entry-body-date') ||
      e.target.matches('.year-entry-year') ||
      e.target.matches('.month-entry-month')
    ) {
      this.dateSelected(e);
    }
  }
  /**
   * Gets a single function that will run all of the bound event handlers for a given
   * event for a given element.
   * @param {HTMLElement} element The element whose event handler will be retrieved
   * @param {string} eventName The name of the event whose handler will be retrieved
   * @returns {Function} The event handler, as a function
   */
  getBoundEventHandlersAsFunction(element, eventName) {
    return function () {
      const allHandlers = this.boundEventHandlers.get(element) ?? {};
      const eventHandlers = allHandlers[eventName] ?? [];
      const wrappedHandlers = function (e) {
        for (let handler of eventHandlers) {
          handler(e);
        }
      };
      return wrappedHandlers;
    }.bind(this);
  }
  /**
   * Gets the merged bound event handlers for the event named by event name on the element
   * @param {HTMLElement} element The element for which to retrieve bound handlers
   * @param {string} eventName The name of the event for which to retrieve bound handlers
   * @returns The handler which will be fired when the event named by eventName occurs on
   * element.
   */
  getMergedBoundEventHandlers(element, eventName) {
    const handlers = this.boundEventHandlers.get(element) ?? {};
    const mergedBoundHandler = handlers['get' + eventName]();
    return mergedBoundHandler;
  }
  /**
   * Merges the specified handler with other handlers for the event named by eventName on the
   * given element.
   * @param {HTMLElement} element The element for which to merge bound event handlers
   * @param {string} eventName The name of the event for which to merge bound event handlers
   * @param {Function} newBoundHandler The handler which will be merged with any existing
   * bound handlers to form a new handler.
   */
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
  /**
   * Removes any bound handlers for events registered for this control.
   */
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
  /**
   * Initializes the control.
   */
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
      ttDateFormat,
      ttTabsButtonFormat,
      ttPrevButtonFormat,
      ttNextButtonFormat,
      tabsButtonFormat,
      prevText,
      prevHtml,
      nextText,
      nextHtml,
      showManualEntry,
      allowManualEntry,
      closePanelOnDateSelect,
      closePanelOnTimeSelect,
      lang,
      timeZone,
      minDate,
      maxDate,
      disableDate,
      useYearAndMonthTabs,
      useYearAndMonthSelects,
      showAllMonths,
      showAllYears,
      showOn,
      buttonHtml,
      buttonIcon,
      title,
      weekStartsOn,
    } = this.createDataset(this);

    this.useUTC = BasicUtilities.parseBoolean(useUTC);
    this.useYearAndMonthTabs = useYearAndMonthTabs || !useYearAndMonthSelects;
    this.useYearAndMonthSelects =
      useYearAndMonthSelects || !useYearAndMonthTabs;
    if (this.useYearAndMonthSelects && this.useYearAndMonthTabs) {
      this.useYearAndMonthTabs = false;
    }
    if (!this.useYearAndMonthSelects && !this.useYearAndMonthTabs) {
      this.useYearAndMonthSelects = true;
    }

    const ttDateFormatResult = DateHelper.parseFormats(ttDateFormat);
    if (ttDateFormatResult.valid) {
      this.ttDateFormat = ttDateFormatResult.value;
    }

    const ttTabsButtonFormatResult = DateHelper.parseFormats(ttTabsButtonFormat);
    if (ttTabsButtonFormatResult.valid) {
      this.ttTabsButtonFormat = ttTabsButtonFormatResult.value;
    }

    const ttPrevButtonFormatResult = DateHelper.parseFormats(ttPrevButtonFormat);
    if (ttPrevButtonFormatResult.valid) {
      this.ttPrevButtonFormat = ttPrevButtonFormatResult.value;
    }

    const ttNextButtonFormatResult = DateHelper.parseFormats(ttNextButtonFormat);
    if (ttNextButtonFormatResult.valid) {
      this.ttNextButtonFormat = ttNextButtonFormatResult.value;
    }

    const tabsButtonFormatResult = DateHelper.parseFormats(tabsButtonFormat);
    if (tabsButtonFormatResult.valid) {
      this.tabsButtonFormat = tabsButtonFormatResult.value;
    }

    if (prevText && prevText.length) {
      this.prevText = prevText;
    }

    if (prevHtml && prevHtml.length) {
      let prevHtmlValid = true;
      try {
        new DOMParser().parseFromString(prevHtml, "text/html");
      } catch {
        prevHtmlValid = false;
      }
      if (prevHtmlValid) {
        this.prevHtml = prevHtml;
      }
    }

    if (nextText && nextText.length) {
      this.nextText = nextText;
    }

    if (nextHtml && nextHtml.length) {
      let nextHtmlValid = true;
      try {
        new DOMParser().parseFromString(nextHtml, "text/html");
      } catch {
        nextHtmlValid = false;
      }
      if (nextHtmlValid) {
        this.nextHtml = nextHtml;
      }
    }

    this.showManualEntry = BasicUtilities.parseBoolean(showManualEntry);
    this.allowManualEntry = BasicUtilities.parseBoolean(allowManualEntry);
    this.closePanelOnDateSelect = BasicUtilities.parseBoolean(closePanelOnDateSelect);
    this.closePanelOnTimeSelect = BasicUtilities.parseBoolean(closePanelOnTimeSelect);
    this.showAllMonths = BasicUtilities.parseBoolean(showAllMonths);
    this.showAllYears = BasicUtilities.parseBoolean(showAllYears);

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
    if (inputClassName && inputClassName.length) {
      this.inputElement.classList.add.apply(this.inputElement.classList, inputClassName.split(' '));
    }
    inputId = inputId ?? `date-time-${this.instanceId}`;
    this.inputElement.id = inputId;
    if (labelClassName && labelClassName.length) {
      this.labelElement.classList.add.apply(this.labelElement.classList, labelClassName.split(' '));
    }
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
    if (panelElementClassName && panelElementClassName.length) {
      this.panelElement.classList.add.apply(this.panelElement.classList, panelElementClassName.split(' '));
    }
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
    monthPrev.classList.add('month-prev-utc');
    monthPrev.type = 'button';
    monthPrev.textContent = 'Prev';
    calendarEntryHeader.appendChild(monthPrev);
    const monthNext = document.createElement('button');
    monthNext.id = `date-time-picker-next-${this.instanceId}`;
    monthNext.classList.add('month-next-utc');
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
        'title',
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
    yearEntry.classList.add('year-entry');
    yearEntry.setAttribute('role', 'tab');
    yearEntry.setAttribute('aria-expanded', false);
    dateEntryWrapper.appendChild(yearEntry);
    const monthEntry = document.createElement('div');
    monthEntry.classList.add('month-entry');
    monthEntry.setAttribute('role', 'tab');
    monthEntry.setAttribute('aria-expanded', false);
    dateEntryWrapper.appendChild(monthEntry);
    const manualEntry = document.createElement('div');
    manualEntry.classList.add('manual-entry');
    const dateLabel = document.createElement('label');
    const dateId = `date-time-picker-date-input-${this.instanceId}`;
    dateLabel.htmlFor = dateId;
    dateLabel.textContent = 'Date:';
    manualEntry.appendChild(dateLabel);
    const dateEntry = document.createElement('input');
    dateEntry.id = dateId;
    dateEntry.classList.add('date-utc');
    dateEntry.type = 'text';
    dateEntry.readOnly = true;
    manualEntry.appendChild(dateEntry);
    dateEntryWrapper.appendChild(manualEntry);
    const timePicker = document.createElement('div');
    timePicker.classList.add('time-picker', 'time-entry');
    this.panelElement.appendChild(timePicker);
    const pickerFooter = document.createElement('div');
    pickerFooter.classList.add('picker-footer');
    const cancelButton = document.createElement('button');
    cancelButton.type = 'button';
    cancelButton.classList.add('picker-footer-cancel');
    cancelButton.textContent = 'Cancel';
    pickerFooter.appendChild(cancelButton);
    const submitButton = document.createElement('button');
    submitButton.type = 'button';
    submitButton.classList.add('picker-footer-submit');
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
      this.format = Array.from(format);
    }
    if (typeof format === 'string') {
      this.format = [format];
    }

    if (lang && lang.length) {
      this.lang = Array.isArray(lang) ? lang : [lang];
    } else if (document.documentElement.lang.length) {
      this.lang = [document.documentElement.lang];
    } else if (navigator.languages && navigator.languages.length) {
      this.lang = navigator.languages.map(l => l.toLocaleLowerCase());
    } else {
      this.lang = ['en-US']; // defaults to en-US language
    }

    // Time zone should be singular
    const possibleTimeZones = DateHelper.getPossibleClientTimeZoneNames();
    if (timeZone && timeZone.length) {
      this.timeZone = Array.isArray(timeZone) ? timeZone[0] : timeZone;
    } else if (possibleTimeZones.length) {
      const possibleTimeZonesInAmerica = possibleTimeZones.filter(tz => tz.includes('America'));
      // Yes, this component is biased toward the Western Hemisphere and America. The workaround?
      // Set the time-zone or timeZone attribute on the component's HTML to a valid IANA time zone name
      // that's not in America :).
      this.timeZone = possibleTimeZonesInAmerica.length ? possibleTimeZonesInAmerica[0] : possibleTimeZones[0];
    }

    this.dateHelper = new DateHelper(this.lang, this.format, this.timeZone);

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
    this.closePanel();
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
        'focus',
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
  /**
   * Destroys the control, removing any event handlers and closing the panel if open.
   */
  destroy() {
    console.time('destroy');
    this.closePanel();
    this.removeBoundHandlers();
    console.timeEnd('destroy');
  }
}
// Registers the element as a Custom Element with the DOM
customElements.define('hm-date-time-picker', HMDateTimePicker);
