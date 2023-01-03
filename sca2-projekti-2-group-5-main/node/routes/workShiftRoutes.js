var express = require('express');
var app = express();
var router = express.Router();

let ctrl = require('../controllers/workShiftController');

router.route('/api/tyovuoro').
    get(ctrl.fetchWorkShift)

router.route('/api/tyovuoronTehtavat/:id').
    get(ctrl.fetchTask)

router.route('/api/nimike').
    get(ctrl.fetchTitle)

router.route('/api/tyovuoroRaportti').
    get(ctrl.fetchShiftReport)

router.route('/api/lisaaTyovuoro').
    post(ctrl.addWorkShift)

router.route('/api/lisaaTehtava').
    post(ctrl.addTask)

router.route('/api/poistaTyovuoro/:id').
    delete(ctrl.deleteWorkShift)

router.route('/api/poistaTehtava/:id').
    delete(ctrl.deleteTask)

// Julkaistaan ao. funktiot tämän js-filun ulkopuolelle
module.exports = router;