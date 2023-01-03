
const { Console } = require('console');
const { getStudentType } = require('../db/orderSQL');
const sql = require('../db/orderSQL');

module.exports = {

    fetchWorker: async (req, res) => {
        console.log("fetchCustomer started");

        try {

            let data = await sql.getWorkers();
            //res.json({ status: "OK", result: data });
            res.json( data );

        }
        catch (err) {
            console.log("Error in server")
            res.statusCode = 400;
            res.json({ status: "NOT OK", msg: err });
        }
    },
    fetchShift: async (req, res) => {
        console.log("fetchShifts started");

        try {
            let alkaa = req.query.alkaa;
            let loppuu = req.query.loppuu;
            let id = req.query.id

            let data = await sql.getShifts(alkaa, loppuu,id);
            //res.json({ status: "OK", result: data });
            res.json( data );

        }
        catch (err) {
            console.log("Error in server")
            res.statusCode = 400;
            res.json({ status: "NOT OK", msg: err });
        }
    },
}