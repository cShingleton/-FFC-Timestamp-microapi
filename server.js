const express = require('express');
const jsonParser = require('body-parser').json;
const routes = require('./routes');

const app = express();

app.use(jsonParser());

app.use('/', routes);

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Server running on port ${port}`));