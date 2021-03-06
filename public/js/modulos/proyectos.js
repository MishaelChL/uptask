import Swal from "sweetalert2";
import axios from "axios";

const btnEliminar = document.querySelector("#eliminar-proyecto");

if(btnEliminar){
    btnEliminar.addEventListener("click", event => {
        const urlProyecto = event.target.dataset.proyectoUrl;
        // console.log(urlProyecto);
        Swal.fire({
          title: "Deseas borrar este Proyecto?",
          text: "Un proyecto eliminado no se puede recuperar!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Si, borrar",
          cancelButtonText: "No, cancelar",
        }).then((result) => {
            if (result.isConfirmed) {
                //enviar peticion a axios
                const url = `${location.origin}/proyectos/${urlProyecto}`;
                // console.log(url);
                
                axios.delete(url, { params: {urlProyecto} })
                    .then(function(respuesta){
                        console.log(respuesta);

                        Swal.fire("Eliminado!", respuesta.data, "success");

                        //redireccionar al inicio
                        setTimeout(() => {
                            window.location.href = "/";
                        }, 3000);
                    }).catch(() => {
                        Swal.fire({
                            type: "error",
                            title: "Hubo un error",
                            text: "No se pudo eliminar el proyecto"
                        })
                    });
            }
        });
    });
}

export default btnEliminar;

