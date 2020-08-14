const { response } = require('express');
const Medico = require('../models/medico');

const getMedicos = async (req,res = response) =>{

    const medicos = await Medico.find()
                            .populate('usuario','nombre img')
                            .populate('hospital','nombre img');

    res.json({
        ok:true,
        medicos
    });
}

const crearMedico = async (req,res = response) =>{
   
    //console.log(req.body);
    const medico = new Medico(req.body);
   try {

        medico.usuario = req.uid;
        //medico.hospital = req.body.hospital;
        const medicoBD = await medico.save();
    
        res.json({
            ok:true,
            medico: medicoBD
        });
    
   } catch (error) {
        res.status(500).json({
            ok:false,
            msg: 'Error en el servidor'
        })
   }
   
    
}

const actualizarMedico = async (req,res = response) =>{
    
    const id = req.params.id;
    const uid = req.uid;
    try {

        const medicoDB = await Medico.findById(id);
        
        if( !medicoDB ){
            res.status(404).json({
                ok:false,
                msg: "Medico no ecnontrado por id"
            });
        }

        const cambiosMedico = {
            ... req.body,
            usuario: uid
        }

        const medicoActualizado = await Medico.findByIdAndUpdate( id, cambiosMedico, {new : true} );

        res.json({
            ok:true,
            medico: medicoActualizado
        });

    } catch (error) {
        res.status(500).json({
            ok:false,
            msg: "Error en el servidro"
        })
    }


}

const borrarMedico = async (req,res = response) =>{
    const id = req.params.id;
    try {

        const medicoDB = await Medico.findById(id);
        
        if( !medicoDB ){
            res.status(404).json({
                ok:false,
                msg: "Medico no ecnontrado por id"
            });
        }


        await Medico.findByIdAndDelete(id);

        res.json({
            ok:true,
            msg: 'Medico eliminado'
        });

    } catch (error) {
        res.status(500).json({
            ok:false,
            msg: "Error en el servidor"
        })
    }
}

const getMedico = async (req,res = response) =>{

    const idMedico = req.params.id;
    try {

    const medico = await Medico.findById(idMedico)
                            .populate('usuario','nombre img')
                            .populate('hospital','nombre img');

        res.json({
            ok:true,
            medico
        });
    } catch (error) {
        res.status(400).json({
            ok:false,
            msg: 'Medico no ecnontrado'
        });
    }
}

module.exports = {
    getMedicos,
    crearMedico,
    actualizarMedico,
    borrarMedico,
    getMedico
}