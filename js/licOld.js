const fetchData = (url_api) => {
  return new Promise ((resolve, reject) => {
      const xhttp = new XMLHttpRequest();
      xhttp.open('GET', url_api, true);
      xhttp.onreadystatechange = (() => {
        if(xhttp.readyState === 4){
          (xhttp.status === 200)
              ? resolve (JSON.parse(xhttp.responseText))
              :reject(new Error('Error', url_api))
          } 
      })
      xhttp.send();
  })
}

const fetchDataNDJSON = (url_api) => {
return new Promise ((resolve, reject) => {
    const xhttp = new XMLHttpRequest();
    xhttp.open('GET', url_api, true);
    xhttp.onreadystatechange = (() => {
      if(xhttp.readyState === 4){
        if(xhttp.status === 200){
            resolve (xhttp.responseText)
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
var tournamentDataCauca = []
var a = 0
try {
  ndjson = await fetchDataNDJSON(`${url_api}tournament/bXjfwhN9/results`);
  tournamentData = ndJSONtoJSON(ndjson) 
  console.log(tournamentData)
  for(let i=0; i<tournamentData.length; i++) {
    for(let j=0; j<JUGADORES.length; j++) {
        if(tournamentData[i].username.toLowerCase()===JUGADORES[j]){
          tournamentDataCauca[a]=tournamentData[i]
          a++
        }
    }
  }

/*   var tournamentDataCaucaTotal = []
  console.time('loop');
  for(let i=0; i<tournamentData.length; i++) {
    if(tournamentData[i].team==="liga-caucana-de-ajedrez"){
      tournamentDataCaucaTotal.push(tournamentData[i]) 
    }
  }   
  for(let i=0; i<tournamentDataCaucaTotal.length; i++) {
    for(let j=0; j<JUGADORES.length; j++) {
        if(tournamentDataCaucaTotal[i].username.toLowerCase()===JUGADORES[j]){
          tournamentDataCauca.push(tournamentDataCaucaTotal[i]) 
        }
    }
  } 
  console.timeEnd('loop'); */


} catch (error) {
  console.error(error);
}  
return tournamentDataCauca
}

async function genera_tabla() {
const dataI = await dataUser(API);
const dataT = await dataTournament(API);
console.log(dataT)
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

for (var i = 0; i < dataI.length; i++) {
  var hilera = document.createElement("tr");    
  for (var j=0;j<titulo.length;j++) {
    var celda = document.createElement("td");
    switch (j){
      case 0:
        var URL=`https://lichess.org/@/${dataI[i].username}`
        var textoCelda = document.createElement("a")
        textoCelda.innerHTML = dataI[i].username.link(URL)
        break
      case 1:
        var textoCelda = document.createElement("button")
        textoCelda.classList.add("button")
        if(dataI[i].online){
          textoCelda.classList.add("button-connected")
        }
        break
      case 2:
        var textoCelda = document.createTextNode(`${dataI[i].profile.firstName} ${dataI[i].profile.lastName}`);
        break
      case 3:
        var textoCelda = document.createTextNode(dataI[i].perfs.blitz.rating);
        break
      case 4:
        var textoCelda = document.createTextNode(dataI[i].perfs.bullet.rating);
        break
      case 5:
        var played= false
        for (let k=0;k<dataT.length;k++){            
          if(dataI[i].username===dataT[k].username){
            var played= true
            var textoCelda = document.createTextNode(dataT[k].score);
          }
          if(!played){
            var textoCelda = document.createTextNode("No participó"); 
          }
        }         
        break
      case 6:
        var played= false
        for (let k=0;k<dataT.length;k++){            
          if(dataI[i].username===dataT[k].username){
            var played= true
            var textoCelda = document.createTextNode(dataT[k].performance);              
          }
          if(!played){
            var textoCelda = document.createTextNode("No participó"); 
          }
        }
           
        break
      case 7:
        var URL=`https://lichess.org/api/games/user/${dataI[i].username}`
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