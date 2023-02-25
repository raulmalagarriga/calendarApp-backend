# Calendario interactivo - backend
## Inicializacion
```
npm install
nodemon app
```

### Base de datos con MongoDB y encriptado de constrasenas

Se deben crear las variables de entorno en un archivo ```.env``` de la siguiente manera:   
```
PORT= PUERTO DONDE CORRERA TU APP
DB_CON= TU DBCONECTOR DE MONGODB
SECRET_JWT_SEED= TU LLAVE PARA ENCRIPTADO
```
Se debe tener instalado dotenv ```npm i dotenv``` para el uso de variables de entorno. 

Para acceder a una variable de entorno: ```process.env.tuVariable```

La base de datos se configura en: ```db/config.js```

### Este repositorio es solo el servidor, se debe instalar el frontend para poder usar la aplicacion completa

