export class Utils {
  static selectors: string[];
  static isClassDefined(className: string): boolean {
    if (!Utils.selectors) {
      Utils.selectors = Array.from(document.styleSheets) // Get all of the style sheets
        .reduce((agg: CSSRule[], cur: StyleSheet) => [...agg, ...Array.from((cur as CSSStyleSheet).cssRules)], []) // reduce to the rules
        .filter(rule => rule.type === rule.STYLE_RULE) // further filter to the style rules (as opposed to media rules, etc.)
        .map(rule => (rule as CSSStyleRule).selectorText); // then just get the selectors
    }
    return Utils.selectors.includes(`.${className}`) || // then return true if the class selector on its own is there, or
      Utils.selectors.some(selector => selector.includes(`.${className}`)); // it's used in combination with another
  }
  static defineClass(className: string, cssText: string): void {
    const style = document.createElement('style');
    style.textContent = `.${className} { ${cssText} }`;
    document.head.appendChild(style);
    Utils.selectors.push(`.${className}`);
  }
  static redefineClass(className: string, cssText: string): void {
    if (Utils.isClassDefined(className)) {
      const styleSheet = Array.from(document.styleSheets)
        .filter((ss: StyleSheet) => !!(ss as CSSStyleSheet).cssRules)
        .find((ss: CSSStyleSheet) => Array.from(ss.cssRules)
          .filter(rule => rule.constructor.name === 'CSSStyleRule')
          .find(rule => (rule as CSSStyleRule).selectorText === `.${className}`) != null);
      const ssNode = styleSheet.ownerNode;
      ssNode.parentNode.removeChild(ssNode);
    }
    const style = document.createElement('style');
    style.textContent = `.${className} { ${cssText} }`;
    document.head.appendChild(style);
    Utils.selectors.push(`.${className}`);
  }
}
