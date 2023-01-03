var express = require('express');
var app = express();
var router = express.Router();

let ctrl = require('../controllers/orderController');

router.route('/api/workers').
    get(ctrl.fetchWorker)

router.route('/api/shifts').
    get(ctrl.fetchShift)

// Julkaistaan ao. funktiot tämän js-filun ulkopuolelle
module.exports = router;