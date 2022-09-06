const mongoose  = require("mongoose");

const dbConnection = async() => {
     try {
        await mongoose.connect(process.env.DB_CON);
        console.log('DB online');
     } catch (error) {
        console.log(error);
        throw new Error('Error al inicializar DB');
     }
}

module.exports = {
    dbConnection
}