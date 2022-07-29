// @ts-nocheck
const pth = require('node:path');
const StreamZip = require('node-stream-zip');
const express = require('express');
const app = express();
const port = 4321;
app.use(express.static('./', {
    extensions: ['js','mjs'],
    setHeaders: function setHeaders(res, path) {
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
app.listen(port, () => {
    console.log(`http://localhost:${port}/`);
});