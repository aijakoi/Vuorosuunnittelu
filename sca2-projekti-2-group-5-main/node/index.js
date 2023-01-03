var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.json());

var port = 3000;
var hostname = "127.0.0.1";

var cors = function (req, res, next)
{
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}

app.use(cors);

// importataan reitit
const orderRoutes = require('./routes/orderRoutes');
app.use(orderRoutes);

const workShiftRoutes = require('./routes/workShiftRoutes');
app.use(workShiftRoutes);

const attachmentRoutes = require('./routes/attachmentRoutes');
app.use(attachmentRoutes);

const workerRoutes = require('./routes/workerRoutes');
app.use(workerRoutes);


app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
