const Proyectos = require("../models/Proyectos");
const Tareas = require ("../models/Tareas");

exports.agregarTarea = async (req, res, next) => {
    //obtenemos el proyecto actual
    const proyecto = await Proyectos.findOne({where: { url: req.params.url }});

    //leer el valor del input
    const {tarea} = req.body;

    //estado 0 = incompleto y id de proyecto
    const estado = 0;
    const proyectoId = proyecto.id;

    //Insertar en la base de datos
    const resultado = await Tareas.create({ tarea, estado, proyectoId});

    if(!resultado){
        return next();
    }

    //redireccionar
    res.redirect(`/proyectos/${req.params.url}`);

};

exports.cambiarEstadoTarea = async (req, res, next) => {
    // console.log(req.params);
    const { id } = req.params;
    const tarea = await Tareas.findOne({ where: { id: id } }); /* or { id }, es lo mismo */
    console.log(tarea);

    //cambiar el estado 
    let estado = 0;
    if(tarea.estado === estado){
        estado = 1;
    }
    tarea.estado = estado;

    const resultado = await tarea.save();

    if(!resultado) return next();

    res.status(200).send("Actualizado");
}

exports.eliminarTarea = async (req, res, next) => {
    // console.log(req.params);
    const { id } = req.params;

    //Eliminar la tarea
    const resultado = await Tareas.destroy({ where: { id: id } });

    if(!resultado) return next();

    res.status(200).send("Tarea eliminada correctamente");
}