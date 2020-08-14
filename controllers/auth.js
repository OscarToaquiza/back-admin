const {response} = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/jwt');
const { googleVerify }= require('../helpers/google-verify');

const login = async (req,res = response) => {
    
    const {email, password} = req.body;
    
    try {

        const usuarioDB = await Usuario.findOne({email});

        if( !usuarioDB ){
            return res.status(400).json({
                ok:false,
                msg: 'Email no valida'
            });
        }

        //Verificar contraseña
        const validPassword = bcrypt.compareSync(password, usuarioDB.password);
        if( !validPassword ){
            return res.status(400).json({
                ok:false,
                msg: 'Contraseña no valida '
            });
        }

        //Generar el token
        const token = await generarJWT( usuarioDB.id );

        res.status(200).json({
            ok: true,
            token
        })
        
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        })
    }
}


const loginGoogle = async ( req, res = response )=>{

    const googleToken = req.body.token;

    try {
        

        const {name,email,picture} = await googleVerify( googleToken );

        const usuarioDB = await Usuario.findOne({email});
        let usuario
        if( !usuarioDB ){
            usuario = new Usuario({
                nombre: name,
                email: email,
                password: 'no_pass',
                img: picture,
                google: true
            });
        }else{
            // Existe usuario
            usuario = usuarioDB;
            usuario.google = true;
            usuario.password = 'no_pass'; 
            usuario.img = picture;
        }

        //Guardar en BD

        await usuario.save();

        //Generar el token - jwt

        const token = await generarJWT(usuario.id);

        res.json({
            ok: true,
            msg: 'Google Signin',
            token
        })

    } catch (error) {
            console.log(error);
        res.status(401).json({
            ok: false,
            msg: "Token no correcto"
        });
        
    }
}

const renewToken = async (req, res = response) => {

    const uid = req.uid;

    // Generar el TOKEN 
    const token = await generarJWT(uid);

    // Obtener el usuario por UID
    const usuario = await Usuario.findById(uid);

    res.json({
        ok:true,
        token,
        usuario
    })

}

module.exports = {
    login,
    loginGoogle,
    renewToken
}