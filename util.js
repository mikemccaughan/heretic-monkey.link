export default class Util {
    static debounce(fn, ms) {
        var timer;
        return function (e) {
            clearTimeout(timer);
            timer = setTimeout((function (v) {
                return function () {
                    fn(v);
                };
            })(e), ms);
        }
    }
    static ensureMap() {
        if (!this.datamap) {
            this.datamap = new WeakMap();
        }
    }
    static getData(element, name) {
        this.ensureMap();
        let data = this.datamap.get(element);
        return data && data[name];
    }
    static setData(element, name, value) {
        this.ensureMap();
        this.datamap.set(element, {[name]:value});
    }
    static getAncestor(element, selector) {
        let parent = element.parentElement;
        if (parent == null) {
            return null;
        }
        if (parent.matches(selector)) {
            return parent;
        }
        if (parent == document.documentElement) {
            return null;
        }

        return this.getAncestor(parent, selector);
    }
}