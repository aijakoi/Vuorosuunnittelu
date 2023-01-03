var mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',      // ÄLÄ käytä root:n tunnusta tuotannossa
    password: '',
    database: 'sairaalakanta'
});

// %d.%m.%Y %H:%i
module.exports = {

    getEmployees: () => {

        return new Promise((resolve, reject) => {
            let query = "SELECT työntekijä.idtyöntekijä, työntekijä.etunimi, työntekijä.sukunimi, työntekijä.puhelin, työntekijä.email, nimike.nimike FROM työntekijä JOIN nimike ON työntekijä.nimike_idnimike = nimike.idnimike ORDER BY nimike"
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

    getEmployee: (id) => {

        return new Promise((resolve, reject) => {
            let query = "SELECT * FROM työntekijä WHERE idtyöntekijä = (?)"
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

    editEmployee: (id, etunimi, sukunimi, puhelin, email) => {

        return new Promise((resolve, reject) => {
            let query = "UPDATE työntekijä SET etunimi = ?, sukunimi = ?, puhelin = ?, email = ? WHERE idtyöntekijä = ?";
            console.log(query);
            connection.query(query,[etunimi, sukunimi, puhelin, email, id], function (error, result, fields) {
                if (error) {
                    reject(error);
                }
                else {
                    resolve(result);
                }
            });
        });
    },

    addEmployee: ( etunimi, sukunimi, puhelin, email, nimike_idnimike) => {

        return new Promise((resolve, reject) => {
            let query = "INSERT INTO työntekijä ( etunimi, sukunimi, puhelin, email, nimike_idnimike) VALUES (?, ?, ?, ?, ?)";
            console.log(query);
            connection.query(query,[etunimi, sukunimi, puhelin, email, nimike_idnimike], function (error, result, fields) {
                if (error) {
                    reject(error);
                }
                else {
                    resolve(result);
                }
            });
        });
    },

    deleteEmployee: (id) => {

        return new Promise((resolve, reject) => {
            let query = "DELETE FROM työntekijä WHERE idtyöntekijä = (?)";
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

}