const { Schema, model } = require('mongoose');

const HospitaScheam = Schema({
    nombre:{
        type:String,
        required:true
    },
    img:{
        type:String,
        default:'img_default.png'
    },
    usuario:{
        type: Schema.Types.ObjectId,
        required:true,
        ref: 'Usuario'
    }
}, {
    collection: 'hospitales'
});


HospitaScheam.method('toJSON',function(){
    const { __v, ...object} = this.toObject();
    return object;
})

module.exports = model('Hospital',HospitaScheam)