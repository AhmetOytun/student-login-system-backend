const dotenv = require('dotenv');
/* Load environment variables from .env file */
dotenv.config();
const express = require('express');
const bodyParser = require('body-parser');
const router = require('./routers/router');
const connectDB = require('./db');
const app = express();
const port = 3000;

app.use(bodyParser.json());

app.use(router);

connectDB();

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});