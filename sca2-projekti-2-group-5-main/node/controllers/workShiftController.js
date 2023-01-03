
const { Console } = require('console');
const { getStudentType } = require('../db/orderSQL');
const sql = require('../db/workShiftSQL');

module.exports = {

    fetchWorkShift: async (req, res) => {
        console.log("fetchWorkShift started");

        try {
            let alkaa = null;
            let loppuu = null;
            if(req.query.alkaa) alkaa = req.query.alkaa;
            if(req.query.loppuu) loppuu = req.query.loppuu;

            let data = await sql.getWorkShift(alkaa, loppuu);
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

    fetchTitle: async (req, res) => {
        console.log("fetchTitle started");

        try {
            let data = await sql.getTitle();
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

    fetchShiftReport: async (req, res) => {
        console.log("fetchShiftReport started");

        try {
            let alkaa = null;
            let loppuu = null;
            if(req.query.alkaa) alkaa = req.query.alkaa;
            if(req.query.loppuu) loppuu = req.query.loppuu;

            let data = await sql.getShiftReport(alkaa, loppuu);
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

    addWorkShift: async (req, res) => {
        console.log("addWorkShift started ...");

        try {
            let alkaa = req.body.alkaa;
            let loppuu = req.body.loppuu;
            
            let virheviesti = "";
            let virheet = [];
            if (alkaa == "") virheet.push("alkamisaika");
            if (loppuu == "") virheet.push("loppumisaika");
            if (virheet.length > 0) virheviesti += "Pakollisia tietoja puuttuu: " + virheet.join(",");
            


            if (virheviesti == "") {

                let data = await sql.insertWorkShift(alkaa, loppuu);
                console.log("insert done");

                res.json({ status: "OK", result: { id: data.insertId, alkaa: alkaa, loppuu: loppuu } });
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

    deleteWorkShift: async (req, res) => {
        console.log("deleteWorkShift started");

        try {
            let id = req.params.id;

            let data = await sql.deleteWorkShift(id);
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

    deleteTask: async (req, res) => {
        console.log("deleteTask started");

        try {
            let id = req.params.id;

            let data = await sql.deleteTask(id);
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

    addTask: async (req, res) => {
        console.log("addTask started ...");

        try {
            let tyovuoroId = req.body.tyovuoroId;
            let tehtava = req.body.tehtava;
            let paikka = req.body.paikka;
            let nimikeId = req.body.nimikeId;
            let maara = req.body.maara;
            
            let virheviesti = "";
            let virheet = [];
            if (tehtava == "") virheet.push("tehtävä");
            if (paikka == "") virheet.push("paikka");
            if (nimikeId == -1) virheet.push("nimike");
            if (maara == "") virheet.push("määrä");
            if (virheet.length > 0) virheviesti += "Pakollisia tietoja puuttuu: " + virheet.join(",");
            


            if (virheviesti == "") {
                
                let task = await sql.insertTask(tehtava, paikka, nimikeId);
                console.log("insertTask done");
                let tarve = await sql.insertTarve(tyovuoroId, task.insertId, maara);

                res.json({ status: "OK", msg: ""});
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
}