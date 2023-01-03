var mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',      // ÄLÄ käytä root:n tunnusta tuotannossa
    password: '',
    database: 'sairaalakanta'
});


module.exports = {

    getWorkers: () => {

        return new Promise((resolve, reject) => {
      
            let query = "SELECT * FROM työntekijä WHERE 1 = 1";
            console.log("KUKKUU",query);
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

    getShifts: (alkaa, loppuu, id) => {

        return new Promise((resolve, reject) => {

            let query = "select etunimi, paikka, tehtävä, DATE_FORMAT(alkaa, '%d.%m.%Y %H:%i:%s') as alkaa, DATE_FORMAT(loppuu, '%d.%m.%Y %H:%i:%s') as loppuu"
            query += " from työntekijä left join kiinnitys"
            query += " on työntekijä.idtyöntekijä = kiinnitys.työntekijä_idtyöntekijä"
            query += " left join tarve"
            query += " on kiinnitys.tarve_tehtävä_idtehtävä = tarve.tehtävä_idtehtävä"
            query += " left join työvuoro"
            query += " on tarve.työvuoro_idtyövuoro = työvuoro.idtyövuoro"
            query += " join tehtävä"
            query += " on tarve.tehtävä_idtehtävä = tehtävä.idtehtävä"
            query +=  " WHERE 1 = 1"

            let params = [];
                if ( alkaa != null )
                {
                    query += " AND alkaa > ? "
                    params.push(alkaa);
                }
                if ( loppuu != null )
                {
                    query += " AND loppuu < ? "
                    params.push(loppuu);
                }
                if ( id != null )
                {
                    query += " AND idtyöntekijä = ? "
                    params.push(id);
                }
      
            query += " ORDER BY alkaa";

            console.log(query);
            connection.query(query,params, function (error, result, fields) {
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