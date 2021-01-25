const board = document.querySelector('.board')
const rows=8;
const columns=8;
let move=[0,0];
let piezaSeleccionada;
function myBoard(){
    for (let i = 1; i <= rows; i++) {
        let row = document.createElement('div');
        
        row.classList.add('row');
        for (let j = 1; j <= columns; j++) {
            let square = document.createElement('div');
            square.classList.add('square');
            if ((j+i+20)%2==0) {
                square.classList.add('darkSquares');
            }
            //square.id =`${String.fromCharCode(j+64)}${i}`
            square.id =`${j}${i}`
            //p=document.createElement('p')
            //p.innerText=`${j}${i}`
            //p.innerText=`${counter}`
            //square.appendChild(p);
            square.onclick = ()=>  
                piezaSeleccionada.move(j,i);
            row.appendChild(square);
        }
        board.appendChild(row);     
    }    
}

function moveQueen(column,row){
    moveColumn(column,row)
    moveDiagonal(column,row)
}

function printColor(list){
    for (let i = 0; i < list.length; i++) {
        div = document.createElement('div')
        div.classList.add('possibleMove')
        const a = document.getElementById(`${list[i]}`)
        a.appendChild(div)
    }
}

class Rook {
    constructor(column, row, side){
        this.column=column
        this.row=row
        this.side=side  
        this.putImage()
    }
     moveRook(){
        let possibleMoves=[]
        let row1 = this.row
        let row2 = this.row
        let column1 = this.column
        let column2 = this.column
        while (row1<8) {
            row1++
            possibleMoves.push(`${this.column}${row1}`)
        }
        while (row2>1) {
            row2--
            possibleMoves.push(`${this.column}${row2}`)
        }
        while (column1<8) {
            column1++
            possibleMoves.push(`${column1}${this.row}`)
        }
        while (column2>1) {
            column2--
            possibleMoves.push(`${column2}${this.row}`)
        }
        console.log(possibleMoves)
        printColor(possibleMoves)
    }
    putImage(){
        this.a = document.getElementById(`${this.column}${this.row}`)
        this.img = document.createElement('img')
        this.img.src = `assets/icons/pieces/${this.side}Rook.svg`  
        this.a.appendChild(this.img)
        this.img.onclick = ()=> this.moveRook();
    }
}

class King{
    constructor(column, row, side){
        this.column=column
        this.row=row
        this.side=side          
        this.putImage()
    }
    moveKing(){
        let possibleMoves=[]
        if (this.column<8) {
            possibleMoves.push(`${this.column+1}${this.row}`)
        }
        if (this.column<8 && this.row<8) {
            possibleMoves.push(`${this.column+1}${this.row+1}`)
        }
        if (this.column<8 && this.row>1) {
            possibleMoves.push(`${this.column+1}${this.row-1}`)
        }
        if (this.column>1) {
            possibleMoves.push(`${this.column-1}${this.row}`)
        }
        if (this.column>1 && this.row<8) {
            possibleMoves.push(`${this.column-1}${this.row+1}`)
        }
        if (this.column>1 && this.row>1) {
            possibleMoves.push(`${this.column-1}${this.row-1}`)
        }
        if (this.row>1) {
            possibleMoves.push(`${this.column}${this.row-1}`)
        }
        if (this.row<8) {
            possibleMoves.push(`${this.column}${this.row+1}`)
        }
        console.log(possibleMoves)
        printColor(possibleMoves)  
    }
    putImage(){
        this.a = document.getElementById(`${this.column}${this.row}`)
        this.img = document.createElement('img')
        this.img.src = `assets/icons/pieces/${this.side}King.svg`
        this.a.appendChild(this.img)
        this.img.onclick = ()=> this.moveKing();
    }
}

class Bishop{
    constructor(column, row, side){
        this.column=column
        this.row=row
        this.side=side          
        this.putImage()
    }
    moveBishop(){
        let possibleMoves=[]
        let row1 = this.row
        let row2 = this.row
        let row3 = this.row
        let row4 = this.row
        let column1 = this.column
        let column2 = this.column
        let column3 = this.column
        let column4 = this.column
        while (row1<8 && column1<8) {
            if (document.getElementById(`${column1+1}${row1+1}`).firstChild) {
                console.log(document.getElementById(`${column1+1}${row1+1}`).firstChild)
                if (document.getElementById(`${column1+1}${row1+1}`).firstChild.side===this.side) {
                    console.log('a')
                    break;
                }
            }
            row1++
            column1++
            possibleMoves.push(`${column1}${row1}`)
        }
        while (row2<8 && column2>1) {
            row2++
            column2--
            possibleMoves.push(`${column2}${row2}`)
        }
        while (row3>1 && column3<8) {
            row3--
            column3++
            possibleMoves.push(`${column3}${row3}`)
        }
        while (row4>1 && column4>1) {
            row4--
            column4--
            possibleMoves.push(`${column4}${row4}`)
        }
        console.log(possibleMoves)
        printColor(possibleMoves)
    }
    putImage(){
        this.a = document.getElementById(`${this.column}${this.row}`)
        this.img = document.createElement('img')
        this.img.src = `assets/icons/pieces/${this.side}Bishop.svg`
        this.a.appendChild(this.img)
        this.img.onclick = ()=> this.moveBishop();
    }
}

class Knight{
    constructor(column, row, side){
        this.column=column
        this.row=row
        this.side=side          
        this.putImage()
    }
    moveKnight(){
        let possibleMoves=[]
        if (this.column<8 && this.row<7) {
            possibleMoves.push(`${this.column+1}${this.row+2}`)
        }
        if (this.row<8 && this.column<7) {
            possibleMoves.push(`${this.column+2}${this.row+1}`)
        }
        if (this.column<7 && this.row>1) {
            possibleMoves.push(`${this.column+2}${this.row-1}`)
        }
        if (this.column<7 && this.row>2) {
            possibleMoves.push(`${this.column+1}${this.row-2}`)
        }
        if (this.column>1 && this.row<7) {
            possibleMoves.push(`${this.column-1}${this.row+2}`)
        }
        if (this.column>2 && this.row<8) {
            possibleMoves.push(`${this.column-2}${this.row+1}`)
        }
        if (this.column>1 && this.row>2) {
            possibleMoves.push(`${this.column-1}${this.row-2}`)
        }
        if (this.column>2 && this.row>1) {
            possibleMoves.push(`${this.column-2}${this.row-1}`)
        }
        console.log(possibleMoves)
        printColor(possibleMoves)
    }
    putImage(){
        this.a = document.getElementById(`${this.column}${this.row}`)
        this.img = document.createElement('img')
        this.img.src = `assets/icons/pieces/${this.side}Knight.svg`
        this.a.appendChild(this.img)
        this.img.onclick = ()=> this.moveKnight();
    }
}
class Pawn{
    constructor(column, row, side){
        this.column=column
        this.row=row
        this.side=side          
        this.putImage()
    }
    movePawn(){
        let possibleMoves=[]
        if (this.side==='White') {
            possibleMoves.push(`${this.column}${this.row+1}`)
            if (this.row==2) {
                possibleMoves.push(`${this.column}${this.row+2}`)
            }
        }
        else if (this.side==='Black'){
            possibleMoves.push(`${this.column}${this.row-1}`)
            if (this.row==7) {
                possibleMoves.push(`${this.column}${this.row-2}`)
            }
        }
        console.log(possibleMoves)
        printColor(possibleMoves)  
    }
    putImage(){
        this.square = document.getElementById(`${this.column}${this.row}`)
        this.img = document.createElement('img')
        this.img.src = `assets/icons/pieces/${this.side}Pawn.svg`
        this.square.appendChild(this.img)
        this.img.onclick = ()=> {
            piezaSeleccionada = this
            this.movePawn();
        }
    }
    removeImage(){
        while (this.square.firstChild) {
            this.square.removeChild(this.square.firstChild);
          }
    }
    move(j,i){
        this.removeImage()
        this.column = j 
        this.row = i
        this.putImage()
    }
}



class Game{
    constructor(){
        myBoard()
        new Rook(1,1,'White')
        new Rook(8,1,'White')
        new Rook(1,8,'Black')
        new Rook(8,8,'Black')
        new King(5,8,'Black')
        new King(5,1,'White')
        new Bishop(3,1,'White')
        new Bishop(6,1,'White')
        new Bishop(3,8,'Black')
        new Bishop(6,8,'Black')
        new Knight(2,1,'White')
        new Knight(7,1,'White')
        new Knight(2,8,'Black')
        new Knight(7,8,'Black')
        for (let i = 1; i < 9; i++) {
            new Pawn(i,2,'White')            
        }
        for (let i = 1; i < 9; i++) {
            new Pawn(i,7,'Black')            
        }
    }
}
const game = new Game

class Piece{
    constructor(){
        this.position
        this.band
    }
    behaviour(){

    }
}