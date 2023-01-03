var mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',      // ÄLÄ käytä root:n tunnusta tuotannossa
    password: '',
    database: 'sairaalakanta'
});


module.exports = {

    getWorkShift: (paiva) => {

        return new Promise((resolve, reject) => {
            let query = "SELECT idtyövuoro, DATE_FORMAT(alkaa, '%H:%i') as alkaa, DATE_FORMAT(loppuu, '%H:%i') as loppuu FROM työvuoro WHERE 1 = 1 ";
            if(paiva) query+= "AND DATE(alkaa) = '" + paiva + "'";
            console.log(query);
            connection.query(query,[paiva], function (error, result, fields) {
                if (error) {
                    reject(error);
                }
                else {
                    resolve(result);
                }
            });
        });
    },

    getTask: (id) => {

        return new Promise((resolve, reject) => {
            let query = "SELECT t.idtehtävä, t.tehtävä, t.paikka, n.nimike, ta.määrä, ";
            query += "(SELECT COUNT(tarve_tehtävä_idtehtävä) FROM kiinnitys WHERE tarve_tehtävä_idtehtävä = t.idtehtävä) as lisäämättä "
            query += "FROM tarve ta JOIN tehtävä t ON ta.tehtävä_idtehtävä = t.idtehtävä ";
            query += "JOIN nimike n ON t.nimike_idnimike = n.idnimike WHERE ta.työvuoro_idtyövuoro = (?) ";
            console.log(query);
            connection.query(query,[id], function (error, result, fields) {
                if (error) {
                    reject(error);
                }
                else {
                    resolve(result);
                }
            });
        });
    },

    getShiftWorkers: (id) => {

        return new Promise((resolve, reject) => {
            let query = "SELECT idtyöntekijä, etunimi, sukunimi, nimike FROM nimike JOIN työntekijä ON idnimike = nimike_idnimike JOIN kiinnitys ON idtyöntekijä = työntekijä_idtyöntekijä WHERE tarve_tehtävä_idtehtävä = (?)"
            console.log(query);
            connection.query(query,[id], function (error, result, fields) {
                if (error) {
                    reject(error);
                }
                else {
                    resolve(result);
                }
            });
        });
    },

    getAvailableWorkers: (id) => {

        return new Promise((resolve, reject) => {
            let query = "SELECT idtyöntekijä, etunimi, sukunimi, nimike FROM työntekijä JOIN nimike ON nimike_idnimike = idnimike " 
            query += "WHERE NOT EXISTS (SELECT * FROM kiinnitys WHERE idtyöntekijä = työntekijä_idtyöntekijä AND tarve_työvuoro_idtyövuoro = (?))"
            query += "ORDER BY nimike"
            console.log(query);
            connection.query(query, [id], function (error, result, fields) {
                if (error) {
                    reject(error);
                }
                else {
                    resolve(result);
                }
            });
        });
    },

    getLastShift: (idtyontekija, paiva) => {

        return new Promise((resolve, reject) => {
            let query = "SELECT DATE_FORMAT(alkaa, '%d.%m.%Y %H:%i') as alkaa, DATE_FORMAT(loppuu, '%d.%m.%Y %H:%i') as loppuu "
            query += "FROM työvuoro JOIN kiinnitys ON idtyövuoro = tarve_työvuoro_idtyövuoro WHERE työntekijä_idtyöntekijä = (?) AND loppuu < (?) ORDER BY loppuu DESC LIMIT 1";
            console.log(query);
            connection.query(query,[idtyontekija, paiva], function (error, result, fields) {
                if (error) {
                    reject(error);
                }
                else {
                    resolve(result);
                }
            });
        });
    },

    insertKiinnitys: (tyontekijaId, tyovuoroId, tehtavaId) => {

        return new Promise((resolve, reject) => {
      
            let query = "INSERT INTO kiinnitys (työntekijä_idtyöntekijä, tarve_työvuoro_idtyövuoro, tarve_tehtävä_idtehtävä) VALUES (?, ?, ?)";
            console.log(query);
            connection.query(query,[tyontekijaId, tyovuoroId, tehtavaId], function (error, result, fields) {
                if (error) {
                    reject(error);
                }
                else {
                    resolve(result);
                }
            });
        });
    },

    deleteKiinnitys: (tyontekijaId, tyovuoroId) => {

        return new Promise((resolve, reject) => {
            console.log("aasdasdasd", tyontekijaId, tyovuoroId)
            let query = "DELETE FROM kiinnitys WHERE työntekijä_idtyöntekijä = (?) AND tarve_työvuoro_idtyövuoro = (?)";
            console.log(query);
            connection.query(query,[tyontekijaId, tyovuoroId], function (error, result, fields) {
                if (error) {
                    reject(error);
                }
                else {
                    resolve(result);
                }
            });
        });
    },
}