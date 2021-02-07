const express = require('express');
const app = express();
const port = 1234;
app.use('/', express.static('./', {
    setHeaders: (res, path, stat) => {
        if (path.includes('.mjs')) {
            res.set('Content-Type', 'text/javascript');
        }
    }
}));
app.listen(port, () => {
    console.log(`http://localhost:${port}/`);
});