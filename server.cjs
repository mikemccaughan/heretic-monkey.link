// eslint-disable-next-line @typescript-eslint/no-var-requires, no-undef
const express = require('express');
const app = express();
const port = 4321;
app.use(express.static('./', {
    extensions: ['js','mjs'],
    setHeaders: function setHeaders(res, path) {
        // eslint-disable-next-line no-undef
        console.log(path);
        if (path.includes('.zip')) {
            const zipPath = path.substring(path.indexOf('.zip') + 4);
            setHeaders(res, zipPath);
        }
        if (path.includes('.mjs')) {
            res.set('Content-Type', 'text/javascript');
        }
        if (path.includes('.js')) {
            res.set('Content-Type', 'text/javascript');
        }
        if (path.includes('.htm')) {
            res.set('Content-Type', 'text/html');
        }
        if (path.includes('.css')) {
            res.set('Content-Type', 'text/css');
        }
        if (path.includes('.json')) {
            res.set('Content-Type', 'text/javascript');
        }
    },

}));
app.get('/temporal', (req, res) => {
    res.setHeader('Content-Type', 'text/javascript');
    res.sendFile(`${__dirname}/js-temporal/polyfill/dist/index.esm.js`);
});
app.get('/index.esm.js.map', (req, res) => {
    res.setHeader('Content-Type', 'text/javascript');
    res.sendFile(`${__dirname}/js-temporal/polyfill/dist/index.esm.js.map`);
});
app.listen(port, () => {

    // eslint-disable-next-line no-undef
    console.log(`http://localhost:${port}/`);
});