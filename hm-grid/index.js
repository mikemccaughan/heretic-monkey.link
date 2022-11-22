export const sample = [
    {
        id: 1,
        textMax100: "Row One has two hundred fifty characters of data in one line to demonstrate hm-grid's ability to truncate content when desired. The property is filled with some relatively innoccuous but normal data that would not be unusual to see in an application.",
        decimalTwo: 1010.1,
        dateTime: new Date(2019, 5, 3, 21, 0, 0, 0),
        booleanData: true,
        booleanRadio: false
    },
    {
        id: 2,
        textMax100: "Row Two has eighty five characters of data to show hm-grid's ability to not truncate.",
        decimalTwo: 1010.13523,
        dateTime: new Date(2019, 5, 3, 21, 33, 12, 76),
        booleanData: false,
        booleanRadio: true
    },
    {
        id: 3,
        textMax100: "Row Three has not many characters at all",
        decimalTwo: 0,
        dateTime: new Date(2019, 5, 3, 21, 33, 12, 76),
        booleanData: true,
        booleanRadio: false
    }
];

export class HmGrid {
    /**
     * 
     * @param {object} options (optional) An object with the options
     * for the component
     * @param {string} options.selector The selector to be used for identifying
     * the component. Defaults to ".hm-grid-container".
     * @param {object[]|undefined} data An array of objects representing the data to be
     * displayed in the grid.
     */
    constructor(options, data) {
        if (options && !data && Array.isArray(options)) {
            this.options = undefined;
            this.data = options;
        } else {
            this.options = options;
            this.data = data;
        }

        const selector = (this.options && this.options.selector) || ".hm-grid-container";
        // eslint-disable-next-line no-undef
        this.element = document.querySelector(selector);
        this.loadData();
    }
    /**
     * Gets information about the data in a given column
     * @param {HTMLElement} col The element representing the column
     * @param {object} sampleObject An object that provides a sample of the data
     * @returns {object} Information about the path to the data
     */
    getPathInfo(col, sampleObject) {
        const path = col.getAttribute('data-column');
        const paths = path.split('.');
        let node = sampleObject;
        const hasPath = paths.reduce((agg, cur) => {
            const hasProp = cur in node;
            hasProp && (node = node[cur]);
            return agg && hasProp; 
        }, true);
        const getData = (obj) => paths.reduce((agg, cur) => agg[cur], obj);
        if (!hasPath) {
            throw new Error(`Could not find the property "${path}" in data`);
        }
        let pathInfo = {
            path: path,
            getter: getData
        };
        const classes = col.className.split(' ');
        const props = classes.reduce((agg, cur) => {
            if (cur.startsWith('hm-mode')) {
                agg['mode'] = cur.replace('hm-mode-', '');
            }
            if (cur.startsWith('hm-type')) {
                agg['type'] = cur.replace('hm-type-', '');
            }
            if ('type' in agg && cur.startsWith(`hm-${agg.type}`)) {
                agg['extras'] = [...(agg['extras'] || []), cur.replace(`hm-${agg.type}-`, '')];
            }
            return agg;
        }, {});
        return Object.assign({}, pathInfo, props);
    }
    getExtraClasses(pathInfo) {
        if (!pathInfo.extras) {
            return [];
        }
        const classes = pathInfo.extras.reduce((agg, cur) => {
            switch(cur) {
                case 'w100': 
                    agg = [...agg, 'hm-has-max-width'];
                    break;
            }
            return agg;
        }, []);
        return classes;
    }
    getStyles(pathInfo) {
        if (!pathInfo.extras) {
            return {};
        }
        let maxWidth = this.element.clientWidth / cols.length;
        const styles = pathInfo.extras.reduce((agg, cur) => {
            switch(cur) {
                case 'w100': 
                    Object.assign(agg, {
                        'max-width': '20ch'
                    });
                    break;
            }
            return agg;
        }, {});
        return styles;
    }
    getStylesAsStyleString(styles) {
        return Object.entries(styles).reduce((agg, [key, value]) => [...agg, `${key}: ${value}`], []).join(';');
    }
    getDisplay(dataRow, pathInfo) {
        switch (pathInfo.type) {
            case 'text': return pathInfo.getter(dataRow);
            case 'number':
                if (pathInfo.extras.includes('local')) {
                    const dCount = pathInfo.extras.find(extra => /d\d+/.test(extra));
                    let intl;
                    if (dCount) {
                        const decimals = +dCount.replace('d', '');
                        intl = new Intl.NumberFormat('default', {
                            minimumFractionDigits: decimals,
                            maximumFractionDigits: decimals
                        });
                    } else {
                        intl = new Intl.NumberFormat();
                    }
                    return intl.format(pathInfo.getter(dataRow));
                } else {
                    return pathInfo.getter(dataRow);
                }
            case 'date':
                    if (pathInfo.extras.includes('local')) {
                        const format = pathInfo.extras.find(e => e !== 'local');
                        if (format) {
                            switch (format) {
                                case 'short':
                                    return pathInfo.getter(dataRow).toLocaleString();
                            }
                        }
                        return pathInfo.getter(dataRow).toLocaleString();
                    } else {
                        return pathInfo.getter(dataRow).toString();
                    }
            }
    }
    getEdit(dataRow, pathInfo) {

    }
    getRow(dataRow) {
        let row = Array.from(this.columns.entries()).reduce((agg, [col, pathInfo]) => 
            [
                ...agg, 
                '<td class="', 
                [...this.getExtraClasses(pathInfo), `hm-type-${pathInfo.type}`].join(' '), 
                '" style="', this.getStylesAsStyleString(this.getStyles(pathInfo)) , '">', 
                pathInfo.mode === 'display' ? 
                    this.getDisplay(dataRow, pathInfo) : 
                    this.getEdit(dataRow, pathInfo), 
                '</td>'
            ], 
            ['<tr>']);
        row.push('</tr>');
        return row.join('');
    }
    loadData() {
        const firstElement = this.data[0];
        if (!firstElement) {
            return;
        }
        
        const cols = this.element.querySelectorAll('col');
        this.columns = Array.from(cols).reduce((agg, col) => {
            const pathInfo = this.getPathInfo(col, firstElement);
            agg.set(col, pathInfo);
            return agg;
        }, new Map())

        const headers = Array.from(this.element.querySelectorAll('th'));
        let maxWidth = this.element.clientWidth / cols.length;
        Array.from(this.columns.entries()).forEach(([col, pathInfo], index) => {
            headers[index].className = col.className;
            const styles = this.getStyles(pathInfo);
            styles['max-width'] = styles['max-width'] || `${maxWidth}px`;
            headers[index].setAttribute('style', this.getStylesAsStyleString(styles));
            headers[index].setAttribute('title', headers[index].textContent);
        });

        const tbody = this.data.reduce((agg, cur) => [...agg, this.getRow(cur)], []);

        this.element.querySelector('tbody').innerHTML = tbody.join('');
    }
}

new HmGrid(sample);
