const express = require("express");
const routes = require("./routes");
const path = require("path");

//crear una app de express
const app = express();

//donde cargar los archivos estaticos
app.use(express.static("public"));

//habilitar pug
app.set("view engine", "pug");

//añadir la carpeta de la vistas
app.set("views", path.join(__dirname, "views"));

//habilitar bodyParser para leer datos del formulario
app.use(express.urlencoded({extended: true}));

app.use("/", routes());

app.listen(3000);
