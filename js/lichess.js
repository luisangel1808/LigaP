async function fetchData(url){
  const response = await fetch(url);
  const data = await response.json();
  return data
}

const API = 'https://lichess.org/api/';
const JUGADORES = ['luisangel1808', 'matesote', 'jorgetobar01', 'cracklos', 'lolamento123', 'pedropalta', 'garcia1108', 'lllkakarotolll', 'jjbolanos', 'zaito0630']
async function dataUser(url_api) {
  var datos = []
  try {
    for(i=0; i<JUGADORES.length; i++) {
      const data = await fetchData(`${url_api}user/${JUGADORES[i]}`);    
      datos[i] = data
    }
  } catch (error) {
      console.error(error);
  }  
  return datos 
}

async function genera_tabla() {
  const dataPlayer = await dataUser(API);
  var body = document.getElementsByClassName("main")[0];
  var tabla   = document.createElement("table"); 
  tabla.classList.add("tableLichess") 
  var tblHead = document.createElement("thead");
  tblHead.classList.add("theadL")
  var tblBody = document.createElement("tbody");
  var titulo  = ['Usuario','','Nombre','Blitz','Bala', 'Partidas']
  var hilera = document.createElement("tr");
  for (var i = 0; i < titulo.length; i++) {
    var celda = document.createElement("th");
    var textoCelda = document.createTextNode(titulo[i]);
    celda.appendChild(textoCelda);
    hilera.appendChild(celda);
  }
  tblHead.appendChild(hilera);

  for (var i = 0; i < dataPlayer.length; i++) {
    var hilera = document.createElement("tr");    
    for (var j=0;j<titulo.length;j++) {
      var celda = document.createElement("td");
      switch (j){
        case 0:
          var URL=`https://lichess.org/@/${dataPlayer[i].username}`
          var textoCelda = document.createElement("a")
          textoCelda.innerHTML = dataPlayer[i].username.link(URL)
          break
        case 1:
          var textoCelda = document.createElement("button")
          textoCelda.classList.add("button")
          if(dataPlayer[i].online){
            textoCelda.classList.add("button-connected")
          }
          break
        case 2:
          var textoCelda = document.createTextNode(`${dataPlayer[i].profile.firstName} ${dataPlayer[i].profile.lastName}`);
          break
        case 3:
          var textoCelda = document.createTextNode(dataPlayer[i].perfs.blitz.rating);
          break
        case 4:
          var textoCelda = document.createTextNode(dataPlayer[i].perfs.bullet.rating);
          break
        case 5:
          var URL=`https://lichess.org/api/games/user/${dataPlayer[i].username}`
          var textoCelda = document.createElement("button")
          textoCelda.classList.add("button")
          textoCelda.innerHTML = "Partidas".link(URL)
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
  cargaCompleta()
}
genera_tabla()
loading = document.querySelector('.loading');

function cargaCompleta() {
  loading.classList.remove('loading');
}

