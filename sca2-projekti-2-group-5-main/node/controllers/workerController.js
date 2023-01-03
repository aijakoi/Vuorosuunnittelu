
const { Console } = require('console');
const { getStudentType } = require('../db/orderSQL');
const sql = require('../db/workerSQL');

module.exports = {

    fetchEmployees: async (req, res) => {
        console.log("fetchWorkers started");

        try {

            let data = await sql.getEmployees();
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

    fetchEmployee: async (req, res) => {
        console.log("fetchWorkers started");

        try {
            let id = req.params.id;

            let data = await sql.getEmployee(id);
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

    updateEmployee: async (req, res) => {
        console.log("updateEmployee started");

        try {
            let id = null;
            let etunimi = null;
            let sukunimi = null;
            let puhelin = null;
            let email = null;
            if(req.body.id) id = req.body.id;
            if(req.body.etunimi) etunimi = req.body.etunimi;
            if(req.body.sukunimi) sukunimi = req.body.sukunimi;
            if(req.body.puhelin) puhelin = req.body.puhelin;
            if(req.body.email) email = req.body.email;


            let data = await sql.editEmployee(id, etunimi, sukunimi, puhelin, email);
            res.json(data);
        }
        catch (err) {
            console.log("Error in server")
            res.statusCode = 400;
            res.json({ status: "NOT OK", msg: err });
        }
    },

    insertEmployee: async (req, res) => {
        console.log("fetchWorkers started");

        try {
            let etunimi = null;
            let sukunimi = null;
            let puhelin = null;
            let email = null;
            let nimike_idnimike = null;
            if(req.body.etunimi) etunimi = req.body.etunimi;
            if(req.body.sukunimi) sukunimi = req.body.sukunimi;
            if(req.body.puhelin) puhelin = req.body.puhelin;
            if(req.body.email) email = req.body.email;
            if(req.body.nimike) nimike = req.body.nimike;

            let data = await sql.addEmployee(etunimi, sukunimi, puhelin, email, nimike);
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

    deleteEmployee: async (req, res) => {
        console.log("deleteEmployee started");

        try {
            let id = req.params.id;

            let data = await sql.deleteEmployee(id);
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
