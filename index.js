const express = require("express");
const routes = require("./routes");
const path = require("path");
const flash = require("connect-flash");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const passport = require("./config/passport");

//importar las variables de entorno
require("dotenv").config({path: "variables.env"})

//helpers con algunas funciones
const helpers = require("./helpers");

//crear la conexion a la bd
const db = require("./config/db");

require("./models/Proyectos");
require("./models/Tareas");
require("./models/Usuarios");

try {
    db.sync();
    console.log('Connection has been established successfully.');
} catch (error) {
    console.error('Unable to connect to the database:', error);
}

//crear una app de express
const app = express();

//donde cargar los archivos estaticos
app.use(express.static("public"));

//habilitar pug
app.set("view engine", "pug");

//habilitar bodyParser para leer datos del formulario
app.use(express.urlencoded({extended: true}));

//añadir la carpeta de la vistas
app.set("views", path.join(__dirname, "views"));

//agregar flash messages
app.use(flash());

app.use(cookieParser());

//sesiones nos permite navegar entre paginas entre distintas paginas sin volvernos a autenticar
app.use(session({
    secret: "supersecreto",
    resave: false,
    saveUninitialized: false,
}));

//agregar passport
app.use(passport.initialize());
app.use(passport.session());

//pasar el vardump a la app
app.use((req, res, next) => {
    // console.log(req.user);
    res.locals.vardump = helpers.vardump;
    res.locals.mensajes = req.flash();
    res.locals.usuario = {...req.user} || null; //saca una copia de req.user y si no tiene valor coloca null
    console.log(res.locals.usuario);
    next();
});

app.use("/", routes());

//Servidor y Puerto
const host = process.env.HOST || "0.0.0.0";
const port = process.env.PORT || 3000;

app.listen(port, host, () => {
    console.log("El servidor está funcionando");
});
