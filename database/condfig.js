const mongoose = require('mongoose');

const dbConnection = async() => {

    try {
        
        await mongoose.connect(process.env.DB_CNN,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });

        console.log('DB Online UP');

    } catch (error) {
        console.log(error);
        throw new Error('Erro a la hora de iniciar ls BD ver logs');
    }

}

module.exports = {
    dbConnection
} 