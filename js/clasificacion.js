jason = [
{"name": "Beltran, Martha Cecilia ", "std": "1593", "rapid": "1631", "blitz": "1560", "year": "1972", "active": true},
{"name": "Garcia, Angela ", "std": 0, "rapid": 0, "blitz": "1460", "year": "1999", "active": false},
{"name": "Galarza Joaqui, Octavio Jose ", "std": "1871", "rapid": "1781", "blitz": "1864", "year": "1992", "active": true},
{"name": "Bastidas, Carina ", "std": 0, "rapid": "1348", "blitz": "1314", "year": "2004", "active": false},
{"name": "Arboleda, Hugo Gerardo ", "std": "1716", "rapid": "1710", "blitz": "1822", "year": "1978", "active": true},
{"name": "Banguero, Raul ", "std": 0, "rapid": 0, "blitz": 0, "year": "1982", "active": false},
{"name": "Gomez, Luis Miguel ", "std": "1813", "rapid": "1807", "blitz": "1824", "year": "1997", "active": false},
{"name": "Leal, Dayana Vanessa ", "std": "1448", "rapid": "1495", "blitz": "1489", "year": "2003", "active": true},
{"name": "Hurtado Mosquera, Orestes ", "std": "1760", "rapid": "1795", "blitz": "1686", "year": "2001", "active": false},
{"name": "Florez Salazar, Luis Angel ", "std": "2156", "rapid": "2128", "blitz": "2210", "year": "1995", "active": true},
{"name": "Agudelo, Pedro Luis ", "std": "1970", "rapid": "2095", "blitz": "2137", "year": "1998", "active": true},
{"name": "Flor Chilma, Yuergen Duvan ", "std": "1756", "rapid": "1745", "blitz": "1756", "year": "1985", "active": false},
{"name": "Dorado Piamba, Juan Jose ", "std": "1547", "rapid": "1768", "blitz": "1664", "year": "2001", "active": false},
{"name": "Castillo, Waili ", "std": "2092", "rapid": 0, "blitz": 0, "year": "1982", "active": false},
{"name": "Bolanos, Brigeth ", "std": "1651", "rapid": "1680", "blitz": "1670", "year": "1996", "active": true},
{"name": "Daza, Fernando ", "std": "1851", "rapid": "1902", "blitz": 0, "year": "1971", "active": true},
{"name": "Torres, Richard ", "std": "1956", "rapid": "1699", "blitz": "1863", "year": "1995", "active": true},
{"name": "Tobar, Zuleima ", "std": "1865", "rapid": 0, "blitz": "1777", "year": "1979", "active": false},
{"name": "Tobar, Juan Carlos ", "std": "2050", "rapid": "2013", "blitz": "2026", "year": "1972", "active": false},
{"name": "Tobar B, Jorge Esteban ", "std": "1877", "rapid": "1889", "blitz": "1911", "year": "2003", "active": true},
{"name": "Tobar B, Carlos Andres ", "std": "1776", "rapid": "1664", "blitz": "1898", "year": "2004", "active": true},
{"name": "Salazar, Jeyksson ", "std": "2165", "rapid": 0, "blitz": 0, "year": "1974", "active": false},
{"name": "Rodriguez, Andres ", "std": "1383", "rapid": 0, "blitz": "1557", "year": "1996", "active": true},
{"name": "Rodriguez, Steven ", "std": 0, "rapid": "1694", "blitz": "1686", "year": "1998", "active": false},
{"name": "Pena, Enrique ", "std": 0, "rapid": "1554", "blitz": "1562", "year": "1957", "active": false},
{"name": "Navia Alvarez, Edwin Adrian ", "std": "2026", "rapid": "2039", "blitz": "2028", "year": "1978", "active": true},
{"name": "Navia Coy, Robinson ", "std": "1589", "rapid": "1562", "blitz": "1629", "year": "1990", "active": true},
{"name": "Munoz, Laura Alexandra ", "std": "1778", "rapid": "1868", "blitz": "1766", "year": "1996", "active": true},
{"name": "Munoz, Julian Andres ", "std": "2180", "rapid": "2092", "blitz": "2097", "year": "1983", "active": false},
{"name": "Munoz, Edgar Alex ", "std": 0, "rapid": 0, "blitz": "1861", "year": "1981", "active": false},
{"name": "Munoz Romero, Cristian Camilo ", "std": "2064", "rapid": "2057", "blitz": "1996", "year": "1997", "active": false},
{"name": "Munoz, Daniel Leonardo ", "std": "2185", "rapid": 0, "blitz": "2151", "year": "1984", "active": false},
{"name": "Bolanos Lopez, Juan Jacobo ", "std": "1519", "rapid": 0, "blitz": 0, "year": "2008", "active": true},
{"name": "Muelas Ceballos, Jhon Estiven ", "std": "1881", "rapid": "1802", "blitz": "1695", "year": "1999", "active": false},
{"name": "Leon Sarria, Cristian ", "std": "1262", "rapid": "1557", "blitz": "1598", "year": "2004", "active": false}
]

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