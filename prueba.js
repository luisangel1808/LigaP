const requestURL = 'https://github.com/luisangel1808/LigaP/blob/master/fide.json';
const request = new XMLHttpRequest();
request.open('GET', requestURL);
request.responseType = 'json';
request.send();
const jason = request.response;

  jason = 
  jason.sort(function (a, b) {
    if (a.std < b.std) {
      return 1;
    }
    if (a.std > b.std) {
      return -1;
    }
    // a must be equal to b
    return 0;
  });
  
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
