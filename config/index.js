require("dotenv").config();


const config = {
    CORS: process.env.CORS,
    PORT: process.env.PORT,
    DEV: process.env.NODE_ENV !== "production",
    USUARIO_ADMINISTRADOR: false,
    TIPO_BD: 'FIREBASE' //MONGO, FIREBASE
}

module.exports = { config }
