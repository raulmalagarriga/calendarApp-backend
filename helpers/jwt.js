const jwt = require('jsonwebtoken');

const generarJSW = ( uid, name ) => {

    return new Promise((resolve , reject) => {
        const payload = {uid , name};
        // Firmar el token: payload , semilla-secreta , opciones
        jwt.sign( payload, process.env.SECRET_JWT_SEED , {
            expiresIn: '2h'
        }, (err, token) => {
            if(err){
                console.log(err);
                reject('No se genero el token');
            }
            resolve(token);
        });
    });


}

module.exports = {
    generarJSW
}