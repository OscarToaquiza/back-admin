const { Schema, model } = require('mongoose');

const MedicoScheam = Schema({
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
    },
    hospital:{
        type: Schema.Types.ObjectId,
        required:true,
        ref: 'Hospital'
    }
});


MedicoScheam.method('toJSON',function(){
    const { __v, ...object} = this.toObject();
    return object;
})

module.exports = model('Medico',MedicoScheam)