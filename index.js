const express = require("express");
const app = express();
const port = 3030;
app.use(express.static("./"));
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});
app.listen(port, () => {
    console.log(`Listening on port ${port}: http://localhost:${port}/`);
});