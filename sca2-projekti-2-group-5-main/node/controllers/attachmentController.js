
const { Console } = require('console');
const { getStudentType } = require('../db/orderSQL');
const sql = require('../db/attachmentSQL');

module.exports = {

    fetchWorkShift: async (req, res) => {
        console.log("fetchWorkShift started");

        try {
            let paiva = null;
            if(req.query.paiva) paiva = req.query.paiva;
            console.log("SKSKSKSK", paiva);
            let data = await sql.getWorkShift(paiva);
            console.log(data);
            //res.json({ status: "OK", result: data });
            res.json( data );

        }
        catch (err) {
            console.log("Error in server")
            res.statusCode = 400;
            res.json({ status: "NOT OK", msg: err });
        }
    },

    fetchTask: async (req, res) => {
        console.log("fetchTask started");

        try {
            let id = req.params.id;

            let data = await sql.getTask(id);
            console.log(data);
            //res.json({ status: "OK", result: data });
            res.json( data );

        }
        catch (err) {
            console.log("Error in server")
            res.statusCode = 400;
            res.json({ status: "NOT OK", msg: err });
        }
    },

    fetchAvailableWorkers: async (req, res) => {
        console.log("fetchWorkers started");

        try {
            let id = req.params.id;

            let data = await sql.getAvailableWorkers(id);
            console.log(data);
            //res.json({ status: "OK", result: data });
            res.json( data );

        }
        catch (err) {
            console.log("Error in server")
            res.statusCode = 400;
            res.json({ status: "NOT OK", msg: err });
        }
    },

    fetchShiftWorkers: async (req, res) => {
        console.log("fetchTask started");

        try {
            let id = req.params.id;

            let data = await sql.getShiftWorkers(id);
            console.log(data);
            //res.json({ status: "OK", result: data });
            res.json( data );

        }
        catch (err) {
            console.log("Error in server")
            res.statusCode = 400;
            res.json({ status: "NOT OK", msg: err });
        }
    },

    fetchLastShift: async (req, res) => {
        console.log("fetchLastShift started");

        try {
            let idtyontekija = req.query.idtyontekija;
            let paiva = req.query.paiva;
            paiva += 1;

            let data = await sql.getLastShift(idtyontekija, paiva);
            console.log("TÄSSÄ TULOS: ", data);
            //res.json({ status: "OK", result: data });
            res.json( data );

        }
        catch (err) {
            console.log("Error in server")
            res.statusCode = 400;
            res.json({ status: "NOT OK", msg: err });
        }
    },

    addKiinnitys: async (req, res) => {
        console.log("insert started ...");

        try {
            let tyontekijaId = req.body.tyontekijaId;
            let tyovuoroId = req.body.tyovuoroId;
            let tehtavaId = req.body.tehtavaId;
            
            let virheviesti = "";
            let virheet = [];
            if (tyovuoroId == "") virheet.push("työvuoro");
            if (tehtavaId == "") virheet.push("tehtävä");
            if (virheet.length > 0) virheviesti += "Pakollisia tietoja puuttuu: " + virheet.join(",");
            


            if (virheviesti == "") {

                let data = await sql.insertKiinnitys(tyontekijaId, tyovuoroId, tehtavaId);
                console.log("insert done");

                res.json({ status: "OK", result: { tyontekijaId: tyontekijaId, tyovuoroId: tyovuoroId, tehtavaId: tehtavaId } });
            } else {
                res.statusCode = 400;
                res.json({ status: "NOT OK", msg: virheviesti })
            }
        }
        catch (err) {
            console.log("Error in server")
            res.statusCode = 400;
            res.json({ status: "NOT OK", msg: err });
        }
    },

    deleteKiinnitys: async (req, res) => {
        console.log("deleteKiinnitys started");

        try {
            let tyontekijaId = req.params.tyontekijaId;
            let tyovuoroId = req.params.tyovuoroId;
            
            let data = await sql.deleteKiinnitys(tyontekijaId, tyovuoroId);
            console.log(data);
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