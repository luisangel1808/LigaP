let XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
// direccion de la API

// funcion principal
const fetchData = (url_api) => {
    return new Promise ((resolve, reject) => {
        const xhttp = new XMLHttpRequest();
        // abrir una conexion con el metodo, la ruta y si es asincrono
        xhttp.open('GET', url_api, true);
        // validacion del llamado
        xhttp.onreadystatechange = (() => {
          // el state 4 es el ultimo de la peticion
          if(xhttp.readyState === 4){
            // verificamos que el status este en 200, que dice que todo bien, no un 400 o 500
            (xhttp.status === 200)
                ? resolve (XMLDocument.parse(xhttp.responseText))
                :reject(new Error('Error', url_api))
            } 
        })
        // por ultimo enviamos la peticion
        xhttp.send();
    })

}

module.exports= fetchData