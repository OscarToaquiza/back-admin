const { response } = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/jwt');

const getUsuarios = async (req,res) => {

    const desde = Number(req.query.desde) || 0;
    
    // const usuarios = await Usuario.find({},'nombre email role google')
    //                                     .skip(desde)
    //                                     .limit(5);
    // const total = await Usuario.count();

    const [usuarios , total] = await Promise.all([
        Usuario.find({},'nombre email role google img' )
                                         .skip(desde)
                                         .limit(5),
        Usuario.countDocuments()
    ]);

    res.status(200).json({
        ok: true,
        uid: req.uid,
        usuarios,
        total
    });

}

const crearUsuario = async (req,res = response) => {

    const {nombre,password,email} = req.body;

    try {        

        const existeEmail = await Usuario.findOne({email});
        if(existeEmail){
            return res.status(400).json({
                ok: false,
                msg: 'El correo ya está registrado'
            })
        }

        const usuario = new Usuario( req.body );
        
        //Encriptar contrseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password,salt);
        
        //Guardar usuario
        await usuario.save();    
        //Generar el token
        const token = await generarJWT( usuario.id );

        res.status(200).json({
            ok: true,
            usuario,
            token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg: 'error inesperado...'
        });
    }
}

const acualizarUsuario = async (req,res) => {
    
    const uid = req.params.id;
    try {

        const usuarioDB = await Usuario.findById(uid);

        if( !usuarioDB ){
            return res.status(400).json({
                ok: false,
                msg: 'No existe un usuario con el id.'
            });
        }
        
        //Actualizaciones.
        const { password, google , email, ...campos} = req.body;
        if( usuarioDB.email !== email ){
            const existeEmail = await Usuario.findOne({email});
            if(existeEmail){
                return res.status(400).json({
                    ok:false,
                    msg:'Ya existe un usuarios con ese email!!.'
                });
            }
        }
        
        if(!usuarioDB.google){
            campos.email = email;
        } else if ( usuarioDB.email != email ){
            return res.status(400).json({
                ok: false,
                msg: 'Usuario de google no pueden cambiar su correo'
            });
        }


        const usuarioActualizado = await Usuario.findByIdAndUpdate(  uid, campos, {new: true} );

        res.json({
            ok: true,
            usuario: usuarioActualizado
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg: 'error inesperado...'
        })
    }

}

const borrarUsuario = async (req,res = response) => {
    
    const uid = req.params.id;

    try {

        const usuarioDB = await Usuario.findById(uid);

        if( !usuarioDB ){
            return res.status(400).json({
                ok: false,
                msg: 'No existe un usuario con el id.'
            })
        }

        await Usuario.findByIdAndDelete(uid);
  
        res.status(200).json({
            ok: true,
            msg: 'Usuario eliminado'
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg: 'Error inesperado en el usuario'
        })
    }

}


module.exports = {
    crearUsuario,
    getUsuarios,
    acualizarUsuario,
    borrarUsuario
}