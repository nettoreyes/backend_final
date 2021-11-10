const { urlencoded } = require("express");
const express = require("express");
const path = require("path");
const cors = require("cors");
const serverRoutes = require("./routes");
const { config } = require("./config");


//1-inicializamos
const app = express();

//2-configuracion
app.use(express.json());
app.use(urlencoded({ extended:true }));
app.use(express.static(path.join(__dirname, "public")));

//aqui poner view engine ---->
app.set("views", path.join(__dirname, "views", "ejs"))
app.set("view engine", "ejs")

//3-middlewares
app.use(cors(`${config.CORS}`));

//4-variables globales
const PORT = config.PORT;

//5-rutas
serverRoutes( app );

//start server
app.listen(PORT, () => {
    console.log(`Server en http://localhost:${ PORT }`);
});
