const fs = require('fs');

const Medico = require('../models/medico');
const Hospital = require('../models/hospital');
const Usuario = require('../models/usuario');


const borrarImagen = (path) => {
    if ( fs.existsSync(path)  && medico.img != 'img_default.png' ) {
        //borrar la imag anterior
        fs.unlinkSync(path);
    }
}

const actualizarImage = async ( tipo, id, nombreArchivo) => {
    let pathViejo = './uploads';
    switch (tipo) {
        case 'medicos':
            const medico = await Medico.findById(id);
            if (!medico) {
                console.log('No existe un médico con el id');
            }

            pathViejo = `${pathViejo}/${tipo}/${ medico.img }`;
          
            borrarImagen(pathViejo);

            medico.img = nombreArchivo;
            await medico.save();
            return true;

            break;
        case 'hospitales':
            const hospital = await Hospital.findById(id);
            if (!hospital){
                console.log('No existe un hospital con el id');
            }

            pathViejo = `${pathViejo}/${tipo}/${ hospital.img }`;
          
            borrarImagen(pathViejo);

            hospital.img = nombreArchivo;
            await hospital.save();
            return true;
            
            break;
        case 'usuarios':
            const usuario = await Usuario.findById(id);
            if (!usuario) {
                console.log('No existe un usuario con el id');
            }

            pathViejo = `${pathViejo}/${tipo}/${ usuario.img }`;
          
            borrarImagen(pathViejo);

            usuario.img = nombreArchivo;
            await usuario.save();
            return true;
            break;
        
        default:
            break;
    }



}

module.exports = {
    actualizarImage
}

