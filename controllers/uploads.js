const path = require('path');
const fs = require('fs');
const {response} = require('express');
const { v4:uuidv4 } = require('uuid');
const { actualizarImage } = require('../helpers/actualizar-img');

const fileUpload = (req,res = response) => {

    const tipo = req.params.tabla;
    const id = req.params.id;

    //Valdar tabla
    const tiposValidos = ['hospitales','medicos','usuarios'];
    if( !tiposValidos.includes(tipo)  ){
        return res.status(400).json({
            ok:false,
            msg: 'No es un médico, usuario u hopital (tipo)'
        });
    }

    //Validar que existe un archivo
    if( !req.files || Object.keys(req.files).length == 0 ){
        return res.status(400).json({
            ok: false,
            msg: 'No se ha enviado ningun archivo'
        });
    }

    //Procesar la imagen
    const file = req.files.imagen;
    const nombreCortado = file.name.split('.');
    const extensionArchivo = nombreCortado[ nombreCortado.length -1 ];

    //Validar extensiones
    const extensionesValidas = ['png','jpg','jpeg','gif'];
    if( !extensionesValidas.includes(extensionArchivo)  ){
        return res.status(400).json({
            ok:false,
            msg: 'Extension del archivo no valido'
        });
    }

    //Generar el nombre del archivo
    const nombreArchivo  = `${uuidv4()}.${extensionArchivo}`;

    //Path del archivo a guardar
    const path = `./uploads/${tipo}/${nombreArchivo}`;

    //Mover la imgen
    file.mv( path, (err) => {
        if(err){
            return res.status(500).json({
                ok: false,
                msg: 'Error al mover la imagen'
            });
        }

        //Acrualizar la BD.

        actualizarImage( tipo, id, nombreArchivo );

        res.json({
            ok:true,
            msg: 'Archivo subido',
            nombreArchivo
        });

    });
}

const retornaImagen = (req,res) => {
    const tipo = req.params.tabla;
    const foto = req.params.foto;
    const pathImg = path.join( __dirname, `../uploads/${tipo}/${foto}`);
    
    // iamgen por defecto
    if( fs.existsSync(pathImg) ){
        res.sendFile(pathImg);
    }else{
        res.sendFile( path.join( __dirname, `../uploads/${tipo}/no-img.jpg`) );
    }

}
module.exports = {
    fileUpload,
    retornaImagen
}