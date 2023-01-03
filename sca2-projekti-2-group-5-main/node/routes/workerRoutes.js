var express = require('express');
var app = express();
var router = express.Router();

let ctrl = require('../controllers/workerController');

router.route('/api/tyontekijat').
    get(ctrl.fetchEmployees)

router.route('/api/tyontekija/:id').
    get(ctrl.fetchEmployee).
    delete(ctrl.deleteEmployee)
    
router.route('/api/tyontekija').
    post(ctrl.insertEmployee).
    put(ctrl.updateEmployee)

// Julkaistaan ao. funktiot tämän js-filun ulkopuolelle
module.exports = router;