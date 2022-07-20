const express = require('express');
const app = express();
const port = 4321;
app.use(express.static('./', {
    extensions: ['js','mjs'],
    setHeaders: function (res, path) {
        console.log(path);
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
    }
}));
app.listen(port, () => {
    console.log(`http://localhost:${port}/`);
});