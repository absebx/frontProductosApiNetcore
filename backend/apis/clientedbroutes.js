// carga la librería
const sqlite3 = require('sqlite3').verbose();

exports.todos = function(req, res) {

        // abrir la base de datos
        let db = new sqlite3.Database('./db/base.db', sqlite3.OPEN_READWRITE, (err) => {
            if(err)
            {
                console.error(err.message);
            }
            console.log('Conexión OK');
        });

        // consultar la tabla cliente
        db.serialize(() => {
            //db.each(`SELECT * FROM cliente`, (err, row) => {
            db.all(`SELECT * FROM cliente`, (err, rows) => {
            if (err) {
                console.error(err.message);
            }
            res.status(200).send(rows);
            //console.log(row.id + "\t" + row.nombre);
            });
        });

        // cerra la conexión
        db.close((err) =>{
            if(err){
                console.error(err.message);
            }
            console.log('Conexión cerrada');

        });
    //res.status(200).send(row);
}

exports.create = function(req, res) {
    res.status(200).send({
        codigo: 200,
        mensaje: 'OK'
    });
}
exports.read = function(req, res) {
    res.status(200).send({
        codigo: 200,
        mensaje: 'OK'
    });
}
exports.update = function(req, res) {
    res.status(200).send({
        codigo: 200,
        mensaje: 'OK'
    });
}
exports.delete = function(req, res) {
    res.status(200).send({
        codigo: 200,
        mensaje: 'OK'
    });
}
