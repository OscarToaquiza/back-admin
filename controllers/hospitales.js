const { response } = require('express');
const Hospital = require('../models/hospital');

const getHospitales = async (req,res = response) =>{
    const hospitales = await Hospital.find().populate('usuario','nombre img');
    res.json({
        ok:true,
        hospitales
    });
}

const crearHospital = async (req,res = response) =>{

    const hospital = new Hospital(req.body);

    try {

        hospital.usuario = req.uid;
        const hospitalDB = await hospital.save();
        
        res.json({
            ok: true,
            hospital: hospitalDB
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg: 'Error en el servidor'
        })
    }
}

const actualizarHospital = (req,res = response) =>{
    res.json({
        ok:true,
        msg: 'actualizarHospitales'
    });
}

const borrarHospital = (req,res = response) =>{
    res.json({
        ok:true,
        msg: 'borrarHospitales'
    });
}


module.exports = {
    getHospitales,
    crearHospital,
    actualizarHospital,
    borrarHospital
}