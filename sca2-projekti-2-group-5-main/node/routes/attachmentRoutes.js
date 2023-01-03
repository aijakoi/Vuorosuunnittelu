var express = require('express');
var app = express();
var router = express.Router();

let ctrl = require('../controllers/attachmentController');

router.route('/api/tyovuorot').
    get(ctrl.fetchWorkShift)

router.route('/api/tyovuoronTehtavat2/:id').
    get(ctrl.fetchTask)

router.route('/api/vapaatTyontekijat/:id').
    get(ctrl.fetchAvailableWorkers)

router.route('/api/vuoronTyontekijat/:id').
    get(ctrl.fetchShiftWorkers)

router.route('/api/viimeisinVuoro').
    get(ctrl.fetchLastShift)

router.route('/api/lisaaKiinnitys').
    post(ctrl.addKiinnitys)

router.route('/api/poistaKiinnitys/:tyontekijaId/:tyovuoroId').
    delete(ctrl.deleteKiinnitys)


// Julkaistaan ao. funktiot tämän js-filun ulkopuolelle
module.exports = router;