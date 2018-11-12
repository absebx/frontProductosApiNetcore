var mysql = require('mysql');
var dbConfig = require('../dbconfig/dbconfig');

var tokenservices = require('../servicios/tokenservices');

var connection = mysql.createConnection({
    host: dbConfig.host,
    user: dbConfig.user,
    password: dbConfig.password,
    database: dbConfig.database,
    insecureAuth: dbConfig.insecureAuth
});

connection.connect(function(err) {
    if (!err) {
        //console.log("Base de datos está conectada. \n");
    } else {
        console.log("Error al conectar a la base de datos. \n", err);
    }
});

exports.login = function(req, res) {

    var useremail = req.body.useremail;
    var password = req.body.password;
    console.log(useremail);
    console.log(password);

    connection.query('SELECT * FROM usuario WHERE email = ? and estado = \'V\'', [useremail], function(error, results, fields) {
        if (error) {
            res.status(202).send({
                "code": 202,
                "mensaje": "No se puede resolver la consulta."
            });
            res.sends
        } else {
            if (results.length > 0) {
                if (results[0].password == password) {
                    
                    json = JSON.stringify(results[0]);
                    var ctoken = tokenservices.creartoken(results[0].idusuario);
                    tokenservices.verificartoken2(ctoken, function(respuesta) {
                        res.status(200).send(
                            {
                                "token": ctoken,
                                "estado": respuesta,
                                "idempresa": results[0].idempresa,
                                "idusuario": results[0].idusuario,
                                "email": results[0].email,
                                "nombre": results[0].nombre,
                            }
                        );
                    });

                } else {
                    
                    res.status(202).send({
                        "code": 202,
                        "mensaje": "Usuario y password no corresponden."
                    })

                }
            } else {

                res.status(202).send({
                    "code": 202,
                    "mensaje": "Usuario no existe"
                });
                
            }
        }
    });
}

