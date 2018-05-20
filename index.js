const express = require("express");
const app = express();
const port = 3030;
app.use(express.static("./"));
app.listen(port, () => {
    console.log(`Listening on port ${port}: http://localhost:${port}/`);
});