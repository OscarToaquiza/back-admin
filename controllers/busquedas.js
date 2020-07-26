
const {response} = require('express');
const Usuario= require('../models/usuario');
const Medico = require('../models/medico');
const Hospital = require('../models/hospital');

const getTodo = async (req,res = response)=>{
    
    const frase = req.params.frase;

    const regex = new RegExp( frase, 'i');

    const [usuarios,medicos,hospitales] = await Promise.all([
        Usuario.find({ nombre: regex }),
        Medico.find({ nombre: regex }),
        Hospital.find({ nombre: regex })
    ]);

    res.status(200).json({
        ok:true,
        frase:frase,
        usuarios,
        medicos,
        hospitales
    });
}


const getDocumentosCollection = async (req,res = response)=>{
    
    const tabla = req.params.tabla;
    const frase = req.params.frase;

    const regex = new RegExp( frase, 'i');

    let data = [];

    switch (tabla) {
        case 'medicos':
            data = await Medico.find({nombre: regex})
                            .populate('usuario', 'nombre img')
                            .populate('hospital', 'nombre img');
            break;
        case 'hospitales':
            data = await Hospital.find({nombre: regex})
                            .populate('usuario', 'nombre img');
            break;
        case 'usuarios':
            data = await Usuario.find({nombre: regex});
            break;
        default:
            return res.status(400).json({
                ok:false,
                msg: 'La tabla debe ser usuarios/medicso/hospitales'
            });
    }

    res.json({
        ok:true,
        data
    });

}

module.exports = {
    getTodo,
    getDocumentosCollection
}