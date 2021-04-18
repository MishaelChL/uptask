const Proyectos = require("../models/Proyectos");

exports.proyectosHome = async (req, res) => {
  const proyectos = await Proyectos.findAll();
  // console.log(proyectos);
  res.render("index", {
    nombrePagina : 'Proyectos',
    proyectos
  });
};

exports.formularioProyecto = async (req, res) => {
  const proyectos = await Proyectos.findAll();
  res.render("nuevoProyecto", {
    nombrePagina : 'Nuevo Proyecto',
    proyectos
  });
};

exports.nuevoProyecto = async (req, res) => {
  const proyectos = await Proyectos.findAll();
  //Enviar a la consola lo que el usuario escriba
  //console.log(req.body);

  //validar que tengamos algo en el imput
  const nombre  = req.body.nombre;

  let errores = [];

  if(!nombre){
    errores.push({"texto": "Agrega un nombre al proyecto"});
  }

  //si hay errores
  if(errores.length > 0){
    res.render('nuevoProyecto', {
      nombrePagina : 'Nuevo Proyecto',
      errores,
      proyectos
    });
  }else{
    //No hay errores
    //Insertar en la BD.
    await Proyectos.create({ nombre });
    res.redirect("/");
  }
};

exports.proyectoPorUrl = async (req, res, next) => {
  // const proyectos = await Proyectos.findAll();
  // const proyecto = await Proyectos.findOne({
  //   where: {
  //     url: req.params.url
  //   }
  // });

  const proyectosPromise = Proyectos.findAll();

  const proyectoPromise = Proyectos.findOne({
    where: {
      url: req.params.url
    }
  });

  const [proyectos, proyecto] = await Promise.all([proyectosPromise, proyectoPromise]);

  if(!proyecto) return next();

  //render a la vista

  res.render("tareas", {
    nombrePagina: 'Tareas del Proyecto',
    proyecto,
    proyectos 
  })
};

exports.formularioEditar = async (req, res) => {
  const proyectosPromise = Proyectos.findAll();

  const proyectoPromise = Proyectos.findOne({
    where: {
      id: req.params.id
    }
  });

  const [proyectos, proyecto] = await Promise.all([proyectosPromise, proyectoPromise]);


  //render a la vista
  res.render("nuevoProyecto", {
    nombrePagina: "Editar Proyecto",
    proyectos,
    proyecto
  });
};

exports.actualizarProyecto = async (req, res) => {
  const proyectos = await Proyectos.findAll();
  //Enviar a la consola lo que el usuario escriba
  //console.log(req.body);

  //validar que tengamos algo en el imput
  const nombre  = req.body.nombre;

  let errores = [];

  if(!nombre){
    errores.push({"texto": "Agrega un nombre al proyecto"});
  }

  //si hay errores
  if(errores.length > 0){
    res.render('nuevoProyecto', {
      nombrePagina : 'Nuevo Proyecto',
      errores,
      proyectos
    });
  }else{
    //No hay errores
    //Insertar en la BD.
    await Proyectos.update(
      { nombre: nombre },
      { where: { id: req.params.id }},
    );
    res.redirect("/");
  }
};

exports.eliminarProyecto = async (req, res, next) => {
  //req, query o params
  // console.log(req.query);
  const {urlProyecto} = req.query;

  const resultado = await Proyectos.destroy({where: { url: urlProyecto }});

  res.status(200).send("Proyecto eliminado correctamente");
}