var dataclientes = require('../fakedata/clientes');

exports.obtenerclientes = function(req, res) {
    res.status(200).send(dataclientes);
}