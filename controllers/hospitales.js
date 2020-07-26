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

const actualizarHospital = async (req,res = response) =>{


    const id = req.params.id;
    const uid = req.uid;
    try {

        const hospitalDB = await Hospital.findById(id);
        
        if( !hospitalDB ){
            res.status(404).json({
                ok:false,
                msg: "Hospital no ecnontrado por id"
            });
        }

        const cambiosHospital = {
            ... req.body,
            usuario: uid
        }

        const hospitalActualizado = await Hospital.findByIdAndUpdate( id, cambiosHospital, {new : true} );

        res.json({
            ok:true,
            hospital: hospitalActualizado
        });

    } catch (error) {
        res.status(500).json({
            ok:false,
            msg: "Error en el servidro"
        })
    }

    
}

const borrarHospital = async (req,res = response) =>{
    const id = req.params.id;
    try {

        const hospitalDB = await Hospital.findById(id);
        
        if( !hospitalDB ){
            res.status(404).json({
                ok:false,
                msg: "Hospital no ecnontrado por id"
            });
        }


        await Hospital.findByIdAndDelete(id);

        res.json({
            ok:true,
            msg: 'Hospital eliminado'
        });

    } catch (error) {
        res.status(500).json({
            ok:false,
            msg: "Error en el servidro"
        })
    }

}


module.exports = {
    getHospitales,
    crearHospital,
    actualizarHospital,
    borrarHospital
}