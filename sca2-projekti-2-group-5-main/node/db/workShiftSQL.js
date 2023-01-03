var mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',      // ÄLÄ käytä root:n tunnusta tuotannossa
    password: '',
    database: 'sairaalakanta'
});


module.exports = {

    getWorkShift: (alkaa, loppuu) => {

        return new Promise((resolve, reject) => {
            let query = "SELECT idtyövuoro, DATE_FORMAT(alkaa, '%d.%m.%Y %H:%i') as alkaa, DATE_FORMAT(loppuu, '%d.%m.%Y %H:%i') as loppuu FROM työvuoro WHERE 1 = 1 ";
            if(alkaa) query+= "AND alkaa >= '" + alkaa + "'";
            if(loppuu) query+= " AND loppuu <= '" + loppuu + "'";
            query += " ORDER BY alkaa";
            console.log(query);
            connection.query(query,[alkaa, loppuu], function (error, result, fields) {
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
            let query = "SELECT t.idtehtävä, t.tehtävä, t.paikka, n.nimike, ta.määrä FROM tarve ta JOIN tehtävä t ON ta.tehtävä_idtehtävä = t.idtehtävä ";
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

    getTitle: () => {

        return new Promise((resolve, reject) => {
            let query = "SELECT * FROM nimike ";
            console.log(query);
            connection.query(query, function (error, result, fields) {
                if (error) {
                    reject(error);
                }
                else {
                    resolve(result);
                }
            });
        });
    },

    getShiftReport: (alkaa, loppuu) => {

        return new Promise((resolve, reject) => {
            let query = "SELECT  DATE_FORMAT(alkaa, '%d.%m.%Y %H:%i') as alkaa, DATE_FORMAT(loppuu, '%d.%m.%Y %H:%i') as loppuu, ";
            query += "tehtävä, paikka, nimike, määrä FROM työvuoro JOIN tarve ON idtyövuoro = työvuoro_idtyövuoro ";
            query += "JOIN tehtävä ON tehtävä_idtehtävä = idtehtävä JOIN nimike ON nimike_idnimike = idnimike WHERE 1 = 1 ";
            if(alkaa) query+= "AND alkaa >= '" + alkaa + "'";
            if(loppuu) query+= " AND loppuu <= '" + loppuu + "'";
            query += " ORDER BY alkaa";
            console.log(query);
            connection.query(query, function (error, result, fields) {
                if (error) {
                    reject(error);
                }
                else {
                    resolve(result);
                }
            });
        });
    },

    insertWorkShift: (alkaa, loppuu) => {

        return new Promise((resolve, reject) => {
      
            let query = "INSERT INTO työvuoro (alkaa, loppuu) VALUES (?, ?)";
            console.log(query);
            connection.query(query,[alkaa, loppuu], function (error, result, fields) {
                if (error) {
                    reject(error);
                }
                else {
                    resolve(result);
                }
            });
        });
    },

    deleteWorkShift: (id) => {

        return new Promise((resolve, reject) => {
      
            let query = "DELETE FROM työvuoro WHERE idtyövuoro = (?)";
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

    deleteTask: (id) => {

        return new Promise((resolve, reject) => {
      
            let query = "DELETE FROM tehtävä WHERE idtehtävä = (?)";
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

    insertTask: (tehtava, paikka, nimike) => {

        return new Promise((resolve, reject) => {
            console.log("OLLAAN TÄÄLLÄ ASTI");
            let query = "INSERT INTO tehtävä (tehtävä, paikka, nimike_idnimike) VALUES ( ?, ?, ?)";
            console.log(query);
            connection.query(query,[tehtava, paikka, nimike], function (error, result, fields) {
                if (error) {
                    reject(error);
                }
                else {
                    resolve(result);
                }
            });
        });
    },

    insertTarve: (tyovuoroId, tehtavaId, maara) => {

        return new Promise((resolve, reject) => {
      
            let query = "INSERT INTO tarve (työvuoro_idtyövuoro, tehtävä_idtehtävä, määrä) VALUES (?, ?, ?);";
            console.log(query);
            connection.query(query,[tyovuoroId, tehtavaId, maara], function (error, result, fields) {
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