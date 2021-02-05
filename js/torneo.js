let games = [];
const tb = document.getElementById('tb');  //tabla de partidas
const tbC = document.getElementById('tbC');//tabla de clasificación
//Función que se encarga de sumar los puntos
const counter = (number,name) =>{
    playersObject.filter((obj)=>{
        if(obj['player']===name){
            obj['points']+=number;
        }
    })
    createClasification();
}
//Se encarga de llamar a counter para actualizar la tabla de posiciones
const count = () =>{
    playersObject.map((player)=>{
        player.points=0
    })
    games.map((game)=>{
        if(game.win){
            counter(1,game.win);
        }
        else if(game.draw1){
            counter(0.5, game.draw1);
            counter(0.5, game.draw2);
        }
    })
}
//Crea la tabla de clasificación
const createClasification = () =>{
    while (tbC.firstChild){
            tbC.removeChild(tbC.firstChild);
        };
    playersObject.sort(function (a, b) {
        if (a.points < b.points) {
            return 1;
        }
        if (a.points > b.points) {
            return -1;
        }
        return 0;
    });
    playersObject.map((player,index)=>{
        const tr = document.createElement('tr');
        const td1 = document.createElement('td');
        const td2 = document.createElement('td');
        const td3 = document.createElement('td');
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tbC.appendChild(tr);
        td1.innerText=index+1;
        td2.innerText=player.player;
        td3.innerText=player.points;
    })
}
//Renderiza el fixture
const createTable = games =>{
    games.map((game)=>{
        const tr = document.createElement('tr');
        const tds = [];
        tdsQuantity=5
        for(let i=0; i<tdsQuantity;i++){
            tds[i]= document.createElement('td');
            tr.appendChild(tds[i])
        }

        tds[0].innerText=game.round;
        tds[1].innerText=game.white;
        tds[2].innerText=game.black;
    
        if(!game.rest){
            let buttons=[];
            const totalButtons=4;
            for (let i = 0; i < totalButtons; i++) {
                buttons[i] = document.createElement('button');
                buttons[i].type='button'
                tds[3].appendChild(buttons[i]);
            }
            buttons[0].innerText="1-0";
            buttons[1].innerText="1/2";
            buttons[2].innerText="0-1";
            buttons[3].innerText="0-0";  
            tds[4].innerText=game.result;
            const putResult = (parameter,win,draw1,draw2) =>{
                game.result=parameter;
                tds[4].innerText=parameter;
                game.win=win;
                game.draw1=draw1;
                game.draw2=draw2;
                count();
            }
            buttons[0].onclick = ()=>{
                putResult('1-0',game.white,null,null);
            }
            buttons[1].onclick = ()=>{
                putResult('0.5-0.5',null,game.white,game.black);
            }
            buttons[2].onclick = ()=>{
                putResult('0-1',game.black,null,null);
            }
            buttons[3].onclick = ()=>{
                putResult('0-0',null,null,null);
            }
        }
        tb.appendChild(tr);

    })
}
//Elabora el fixture
const fixture = players =>{
    if(players.length%2!==0) players.push('Descanso');
    let rounds = players.length-1;
    let roundGames = players.length/2;
    let home = [];
    let away = [];
    let gamesArray = [];

    for (let i = 0; i < roundGames; i++) {
        for (let j = 1; j < players.length; j++) {
            home.push(j);
        }   
    }
    for (let k = 0; k < home.length; k++) {
        if(k%(roundGames)===0){
            away[k]=players.length;
        }
        else{
            away[k]=rounds--;
            if(rounds===0){
                rounds=7;
            }
        }
    }
    let rnd = 1;
    let aux = 0;
    for(let i =0; i<home.length; i++){
        if(aux===roundGames){
            rnd++;
            aux=0;
        } 
        aux++;
        let game = {
            white:null,
            black:null,
            result:null,
            round:rnd,
            win:null,
            draw1:null,
            draw2:null,
            rest:false
        }
        if((i+roundGames)%(players.length)===0){
            game.white = players[away[i]-1];
            game.black = players[home[i]-1];
        }
        else{
            game.white = players[home[i]-1];
            game.black = players[away[i]-1];
        }
        if(game.white==='Descanso' || game.black==='Descanso'){
            game.rest=true;
        }
        games.push(game);
        gamesArray[i] = `${game.white} - ${game.black}`;
    }
    createTable(games);
}

let playersArray = ['Luisao','Lina','Navia','Julian','Richard','Angela','Pedro'];
playersObject= playersArray.map((player)=>{
    return({
        "player":player,
        "points":0
    })
})
fixture(playersArray);