jason = [
    {"name": "Munoz, Julian Andres ", "std": "2180", "rapid": "2092", "blitz": "2097", "year": "1983"},
    {"name": "Florez Salazar, Luis Angel ", "std": "2156", "rapid": "2128", "blitz": "2210", "year": "1995"},
    {"name": "Munoz Romero, Cristian Camilo ", "std": "2064", "rapid": "2057", "blitz": "1996", "year": "1997"},
    {"name": "Navia Alvarez, Edwin Adrian ", "std": "2026", "rapid": "2039", "blitz": "2028", "year": "1978"},
    {"name": "Torres, Richard ", "std": "1956", "rapid": "1699", "blitz": "1863", "year": "1995"},
    {"name": "Tobar B, Jorge Esteban ", "std": "1877", "rapid": "1889", "blitz": "1911", "year": "2003"},
    {"name": "Tobar B, Carlos Andres ", "std": "1776", "rapid": "1664", "blitz": "1898", "year": "2004"},
    {"name": "Leon Sarria, Cristian ", "std": "1262", "rapid": "1557", "blitz": "1598", "year": "2004"}
    ]

console.log(jason)


function genera_tabla() {
    var body = document.getElementsByClassName("main")[0];
    var tabla   = document.createElement("table"); 
    tabla.classList.add("tableC") 
    var tblHead = document.createElement("thead");
    var tblBody = document.createElement("tbody");
    var titulo  = ['#','Nombre','Club','Ciudad','','Clásico','Rapido','Blitz', 'Nacional', 'Año']
    var hilera = document.createElement("tr");
    for (var i = 0; i < titulo.length; i++) {
      var celda = document.createElement("th");
      var textoCelda = document.createTextNode(titulo[i]);
      celda.appendChild(textoCelda);
      hilera.appendChild(celda);
    }
    tblHead.appendChild(hilera);
  
    for (var i = 0; i < jason.length; i++) {
      var hilera = document.createElement("tr");    
      for (var j=0;j<titulo.length;j++) {
        var celda = document.createElement("td");
        switch (j){
          case 0:
            var textoCelda = document.createTextNode(i+1);
            break
          case 1:
            var textoCelda = document.createTextNode(jason[i].name);
            break
          case 2:
            var textoCelda = document.createTextNode(`José Raúl Capablanca`);                  
            break
          case 3:
            var textoCelda = document.createTextNode(`Santander de Quilichao`);
            break 
          case 4:
            var textoCelda = document.createElement("img")
            textoCelda.setAttribute("src","assets/img/FlagSantander.png");
            textoCelda.setAttribute("height","20px"); 
            textoCelda.setAttribute("alt","Santander de Quilichao");                
            break
          case 5:
            var textoCelda = document.createTextNode(jason[i].std);
            break
          case 6:
            var textoCelda = document.createTextNode(jason[i].rapid);               
            break
          case 7:
            var textoCelda = document.createTextNode(jason[i].blitz);               
            break
          case 8:
            var textoCelda = document.createTextNode(jason[i].std);
            break
          case 9:
            var textoCelda = document.createTextNode(jason[i].year);
            break
        }
        celda.appendChild(textoCelda);
        hilera.appendChild(celda);
        tblBody.appendChild(hilera);      
      }    
    }
    tabla.appendChild(tblHead);
    tabla.appendChild(tblBody);
    body.appendChild(tabla);
  }
  genera_tabla()
