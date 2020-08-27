/*
const appInsights = require('applicationinsights');
appInsights
  .setup('InstrumentationKey=d7d2ae6a-6c2f-4fa0-ae80-600ac14d63d0')
  .start();
*/
const path = require('path');
const express = require('express');
const app = express();
app.use(express.static('./'));
app.get('/', (req, res) => {
  console.log('got request for /, sending /index.html');
  console.log(require('fs').statSync(path.join(__dirname, 'index.html')));
  res.sendFile(path.join(__dirname, 'index.html'));
});
app.listen(process.env.PORT || 3000, () => {
  console.log(`Listening on http://localhost:${process.env.PORT || 3000}/`);
});
