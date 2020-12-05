const fetchData = (url_api) => {
  return new Promise ((resolve, reject) => {
      const xhttp = new XMLHttpRequest();
      xhttp.open('GET', url_api, true);
      xhttp.onreadystatechange = (() => {
        if(xhttp.readyState === 4){
          if(xhttp.status === 200){
              try {
                resolve (JSON.parse(xhttp.responseText))
              } catch (SyntaxError) {
                resolve (ndJSONtoJSON(xhttp.responseText))
              }            
          }
          else{
            reject(new Error('Error', url_api))
          }
        } 
      })
      xhttp.send();
  })
}

const ndJSONtoJSON = (ndjson) =>{
  ndjson = ("[" + ndjson + "]")
  var enter = /\n/gi;    
  ndjson = ndjson.replace(enter, ",");
  var final = /,]/gi;
  ndjson = ndjson.replace(final, "]");
  return JSON.parse(ndjson)  
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

async function dataTournament(url_api) {
  

  try {
    tournamentData = await fetchData(`${url_api}tournament/AiAlvpqI/results`);
    var tournamentDataCauca = []
    for(let i=0; i<tournamentData.length; i++) {
      for(let j=0; j<JUGADORES.length; j++) {
          if(tournamentData[i].username.toLowerCase()===JUGADORES[j]){
            tournamentDataCauca.push(tournamentData[i])
          }
      }
    }
  } catch (error) {
    console.error(error);
  }  
  
  return tournamentDataCauca
}

async function genera_tabla() {
  const dataPlayer = await dataUser(API);
  const dataTourney = await dataTournament(API);
  var body = document.getElementsByClassName("main")[0];
  var tabla   = document.createElement("table"); 
  tabla.classList.add("tableLichess") 
  var tblHead = document.createElement("thead");
  tblHead.classList.add("theadL")
  var tblBody = document.createElement("tbody");
  var titulo  = ['Usuario','','Nombre','Blitz','Bala','Puntos Interligas','Performance Interligas', 'Partidas']
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
          var played= false
          for (var k=0;k<dataTourney.length;k++){            
            if(dataPlayer[i].username===dataTourney[k].username){
              var played= true
              var textoCelda = document.createTextNode(dataTourney[k].score);
              break
            }
          }
          if(!played){
            var textoCelda = document.createTextNode("No participó"); 
          }                  
          break
        case 6:
          (played)
          ? textoCelda = document.createTextNode(dataTourney[k].performance)
          : textoCelda = document.createTextNode("No participó");                
          break
        case 7:
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
}
genera_tabla()