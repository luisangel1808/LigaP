const board = document.querySelector(".board");
const rows = 8;
const columns = 8;
let move = [0, 0];
let piezaSeleccionada;
let possibleMoves = [];
let turn = "White";
function myBoard() {
  for (let i = 1; i <= rows; i++) {
    let row = document.createElement("div");
    row.classList.add("row");
    for (let j = 1; j <= columns; j++) {
      let square = document.createElement("div");
      square.setAttribute("side", "none");
      square.classList.add("square");
      if ((j + i) % 2 == 0) {
        square.classList.add("darkSquares");
      }
      square.id = `${j}${i}`;
      square.onclick = () => {
        if (possibleMoves.includes(square.id)) {
          piezaSeleccionada.makeMove(j, i);
          if (turn === "White") {
            turn = "Black";
          } else {
            turn = "White";
          }
          piezaSeleccionada = null;
        }
      };
      row.appendChild(square);
    }
    board.appendChild(row);
  }
}

function printColor(list) {
  for (let i = 0; i < list.length; i++) {
    divPossible = document.createElement("div");
    divPossible.classList.add("possibleMove");
    const a = document.getElementById(`${list[i]}`);
  }
}

class Piece {
  constructor(column, row, side) {
    this.column = column;
    this.row = row;
    this.side = side;
  }

  putImage(image) {
    this.a = document.getElementById(`${this.column}${this.row}`);
    this.a.setAttribute("side", this.side);
    this.img = document.createElement("img");
    this.img.src = image;
    this.a.appendChild(this.img);

    this.img.onclick = () => {
      if (turn === this.side) {
        this.move();
        piezaSeleccionada = this;
      }
    };
  }
  removeImage(j, i) {
    let element = document.getElementById(`${j}${i}`);
    while (element.firstChild) {
      element.removeChild(element.firstChild);
      element.setAttribute("side", "none");
    }
  }
  makeMove(column, row) {
    this.removeImage(this.column, this.row);
    this.column = column;
    this.row = row;
    this.removeImage(this.column, this.row);
    this.putImage(this.image);
    this.writeMove(this.name, this.column, this.row);
  }
  writeMove(name, column, row) {
    column = String.fromCharCode(column + 96);
    switch (name) {
      case "Rook":
        name = "T";
        break;
      case "King":
        name = "R";
        break;
      case "Queen":
        name = "D";
        break;
      case "Pawn":
        name = "";
        break;
      case "Knight":
        name = "C";
        break;
      case "Bishop":
        name = "A";
        break;
      default:
        break;
    }
    writeMoves(name, column, row);
  }
}

class Rook extends Piece {
  constructor(column, row, side) {
    super(column, row, side);
    this.image = `assets/icons/pieces/${this.side}Rook.svg`;
    this.putImage(this.image);
    this.name = "Rook";
  }
  move() {
    possibleMoves = [];
    let row1 = this.row;
    let row2 = this.row;
    let column1 = this.column;
    let column2 = this.column;
    while (row1 < 8) {
      row1++;
      if (
        document
          .getElementById(`${this.column}${row1}`)
          .getAttribute("side") === this.side
      ) {
        break;
      }
      possibleMoves.push(`${this.column}${row1}`);
      if (
        document
          .getElementById(`${this.column}${row1}`)
          .getAttribute("side") !== "none"
      ) {
        break;
      }
    }
    while (row2 > 1) {
      row2--;
      if (
        document
          .getElementById(`${this.column}${row2}`)
          .getAttribute("side") === this.side
      ) {
        break;
      }
      possibleMoves.push(`${this.column}${row2}`);
      if (
        document
          .getElementById(`${this.column}${row2}`)
          .getAttribute("side") !== "none"
      ) {
        break;
      }
    }
    while (column1 < 8) {
      column1++;
      if (
        document
          .getElementById(`${column1}${this.row}`)
          .getAttribute("side") === this.side
      ) {
        break;
      }
      possibleMoves.push(`${column1}${this.row}`);
      if (
        document
          .getElementById(`${column1}${this.row}`)
          .getAttribute("side") !== "none"
      ) {
        break;
      }
    }
    while (column2 > 1) {
      column2--;
      if (
        document
          .getElementById(`${column2}${this.row}`)
          .getAttribute("side") === this.side
      ) {
        break;
      }
      possibleMoves.push(`${column2}${this.row}`);
      if (
        document
          .getElementById(`${column2}${this.row}`)
          .getAttribute("side") !== "none"
      ) {
        break;
      }
    }
    console.log(possibleMoves);
    printColor(possibleMoves);
  }
}

class King extends Piece {
  constructor(column, row, side) {
    super(column, row, side);
    this.image = `assets/icons/pieces/${this.side}King.svg`;
    this.putImage(this.image);
    this.name = "King";
  }
  move() {
    possibleMoves = [];
    if (this.column < 8) {
      possibleMoves.push(`${this.column + 1}${this.row}`);
    }
    if (this.column < 8 && this.row < 8) {
      possibleMoves.push(`${this.column + 1}${this.row + 1}`);
    }
    if (this.column < 8 && this.row > 1) {
      possibleMoves.push(`${this.column + 1}${this.row - 1}`);
    }
    if (this.column > 1) {
      possibleMoves.push(`${this.column - 1}${this.row}`);
    }
    if (this.column > 1 && this.row < 8) {
      possibleMoves.push(`${this.column - 1}${this.row + 1}`);
    }
    if (this.column > 1 && this.row > 1) {
      possibleMoves.push(`${this.column - 1}${this.row - 1}`);
    }
    if (this.row > 1) {
      possibleMoves.push(`${this.column}${this.row - 1}`);
    }
    if (this.row < 8) {
      possibleMoves.push(`${this.column}${this.row + 1}`);
    }
    console.log(possibleMoves);
    printColor(possibleMoves);
  }
}

class Bishop extends Piece {
  constructor(column, row, side) {
    super(column, row, side);
    this.image = `assets/icons/pieces/${this.side}Bishop.svg`;
    this.putImage(this.image);
    this.name = "Bishop";
  }
  move() {
    possibleMoves = [];
    let row1 = this.row;
    let row2 = this.row;
    let row3 = this.row;
    let row4 = this.row;
    let column1 = this.column;
    let column2 = this.column;
    let column3 = this.column;
    let column4 = this.column;
    while (row1 < 8 && column1 < 8) {
      row1++;
      column1++;
      if (
        document.getElementById(`${column1}${row1}`).getAttribute("side") ===
        this.side
      ) {
        break;
      }
      possibleMoves.push(`${column1}${row1}`);
      if (
        document.getElementById(`${column1}${row1}`).getAttribute("side") !==
        "none"
      ) {
        break;
      }
    }
    while (row2 < 8 && column2 > 1) {
      row2++;
      column2--;
      if (
        document.getElementById(`${column2}${row2}`).getAttribute("side") ===
        this.side
      ) {
        break;
      }
      possibleMoves.push(`${column2}${row2}`);
      if (
        document.getElementById(`${column2}${row2}`).getAttribute("side") !==
        "none"
      ) {
        break;
      }
    }
    while (row3 > 1 && column3 < 8) {
      row3--;
      column3++;
      if (
        document.getElementById(`${column3}${row3}`).getAttribute("side") ===
        this.side
      ) {
        break;
      }
      possibleMoves.push(`${column3}${row3}`);
      if (
        document.getElementById(`${column3}${row3}`).getAttribute("side") !==
        "none"
      ) {
        break;
      }
    }
    while (row4 > 1 && column4 > 1) {
      row4--;
      column4--;
      if (
        document.getElementById(`${column4}${row4}`).getAttribute("side") ===
        this.side
      ) {
        break;
      }
      possibleMoves.push(`${column4}${row4}`);
      if (
        document.getElementById(`${column4}${row4}`).getAttribute("side") !==
        "none"
      ) {
        break;
      }
    }
    console.log(possibleMoves);
    printColor(possibleMoves);
  }
}

class Knight extends Piece {
  constructor(column, row, side) {
    super(column, row, side);
    this.image = `assets/icons/pieces/${this.side}Knight.svg`;
    this.putImage(this.image);
    this.name = "Knight";
  }
  move() {
    possibleMoves = [];
    if (this.column < 8 && this.row < 7) {
      possibleMoves.push(`${this.column + 1}${this.row + 2}`);
    }
    if (this.row < 8 && this.column < 7) {
      possibleMoves.push(`${this.column + 2}${this.row + 1}`);
    }
    if (this.column < 7 && this.row > 1) {
      possibleMoves.push(`${this.column + 2}${this.row - 1}`);
    }
    if (this.column < 8 && this.row > 2) {
      possibleMoves.push(`${this.column + 1}${this.row - 2}`);
    }
    if (this.column > 1 && this.row < 7) {
      possibleMoves.push(`${this.column - 1}${this.row + 2}`);
    }
    if (this.column > 2 && this.row < 8) {
      possibleMoves.push(`${this.column - 2}${this.row + 1}`);
    }
    if (this.column > 1 && this.row > 2) {
      possibleMoves.push(`${this.column - 1}${this.row - 2}`);
    }
    if (this.column > 2 && this.row > 1) {
      possibleMoves.push(`${this.column - 2}${this.row - 1}`);
    }
    console.log(possibleMoves);
    printColor(possibleMoves);
  }
}
class Pawn extends Piece {
  constructor(column, row, side) {
    super(column, row, side);
    this.image = `assets/icons/pieces/${this.side}Pawn.svg`;
    this.putImage(this.image);
    this.name = "Pawn";
  }
  move() {
    possibleMoves = [];
    if (this.side === "White") {
      possibleMoves.push(`${this.column}${this.row + 1}`);
      if (this.row == 2) {
        possibleMoves.push(`${this.column}${this.row + 2}`);
      }
    } else if (this.side === "Black") {
      possibleMoves.push(`${this.column}${this.row - 1}`);
      if (this.row == 7) {
        possibleMoves.push(`${this.column}${this.row - 2}`);
      }
    }
    console.log(possibleMoves);
    printColor(possibleMoves);
  }
}

class Queen extends Piece {
  constructor(column, row, side) {
    super(column, row, side);
    this.image = `assets/icons/pieces/${this.side}Queen.svg`;
    this.putImage(this.image);
    this.name = "Queen";
  }
  move() {
    possibleMoves = [];
    let row1 = this.row;
    let row2 = this.row;
    let column1 = this.column;
    let column2 = this.column;
    while (row1 < 8) {
      row1++;
      if (
        document
          .getElementById(`${this.column}${row1}`)
          .getAttribute("side") === this.side
      ) {
        break;
      }
      possibleMoves.push(`${this.column}${row1}`);
      if (
        document
          .getElementById(`${this.column}${row1}`)
          .getAttribute("side") !== "none"
      ) {
        break;
      }
    }
    while (row2 > 1) {
      row2--;
      if (
        document
          .getElementById(`${this.column}${row2}`)
          .getAttribute("side") === this.side
      ) {
        break;
      }
      possibleMoves.push(`${this.column}${row2}`);
      if (
        document
          .getElementById(`${this.column}${row2}`)
          .getAttribute("side") !== "none"
      ) {
        break;
      }
    }
    while (column1 < 8) {
      column1++;
      if (
        document
          .getElementById(`${column1}${this.row}`)
          .getAttribute("side") === this.side
      ) {
        break;
      }
      possibleMoves.push(`${column1}${this.row}`);
      if (
        document
          .getElementById(`${column1}${this.row}`)
          .getAttribute("side") !== "none"
      ) {
        break;
      }
    }
    while (column2 > 1) {
      column2--;
      if (
        document
          .getElementById(`${column2}${this.row}`)
          .getAttribute("side") === this.side
      ) {
        break;
      }
      possibleMoves.push(`${column2}${this.row}`);
      if (
        document
          .getElementById(`${column2}${this.row}`)
          .getAttribute("side") !== "none"
      ) {
        break;
      }
    }
    row1 = this.row;
    row2 = this.row;
    let row3 = this.row;
    let row4 = this.row;
    column1 = this.column;
    column2 = this.column;
    let column3 = this.column;
    let column4 = this.column;
    while (row1 < 8 && column1 < 8) {
      row1++;
      column1++;
      if (
        document.getElementById(`${column1}${row1}`).getAttribute("side") ===
        this.side
      ) {
        break;
      }
      possibleMoves.push(`${column1}${row1}`);
      if (
        document.getElementById(`${column1}${row1}`).getAttribute("side") !==
        "none"
      ) {
        break;
      }
    }
    while (row2 < 8 && column2 > 1) {
      row2++;
      column2--;
      if (
        document.getElementById(`${column2}${row2}`).getAttribute("side") ===
        this.side
      ) {
        break;
      }
      possibleMoves.push(`${column2}${row2}`);
      if (
        document.getElementById(`${column2}${row2}`).getAttribute("side") !==
        "none"
      ) {
        break;
      }
    }
    while (row3 > 1 && column3 < 8) {
      row3--;
      column3++;
      if (
        document.getElementById(`${column3}${row3}`).getAttribute("side") ===
        this.side
      ) {
        break;
      }
      possibleMoves.push(`${column3}${row3}`);
      if (
        document.getElementById(`${column3}${row3}`).getAttribute("side") !==
        "none"
      ) {
        break;
      }
    }
    while (row4 > 1 && column4 > 1) {
      row4--;
      column4--;
      if (
        document.getElementById(`${column4}${row4}`).getAttribute("side") ===
        this.side
      ) {
        break;
      }
      possibleMoves.push(`${column4}${row4}`);
      if (
        document.getElementById(`${column4}${row4}`).getAttribute("side") !==
        "none"
      ) {
        break;
      }
    }
    console.log(possibleMoves);
    printColor(possibleMoves);
  }
}

class Game {
  constructor() {
    myBoard();
    new Rook(1, 1, "White");
    new Rook(8, 1, "White");
    new Rook(1, 8, "Black");
    new Rook(8, 8, "Black");
    new King(5, 8, "Black");
    new King(5, 1, "White");
    new Bishop(3, 1, "White");
    new Bishop(6, 1, "White");
    new Bishop(3, 8, "Black");
    new Bishop(6, 8, "Black");
    new Knight(2, 1, "White");
    new Knight(7, 1, "White");
    new Knight(2, 8, "Black");
    new Knight(7, 8, "Black");
    new Queen(4, 8, "Black");
    new Queen(4, 1, "White");
    for (let i = 1; i < 9; i++) {
      new Pawn(i, 2, "White");
    }
    for (let i = 1; i < 9; i++) {
      new Pawn(i, 7, "Black");
    }
  }
}
const game = new Game();
const tBody = document.getElementById("tbody");
let count = 1;
function writeMoves(name, column, row) {
  if (count % 2 !== 0) {
    tr = document.createElement("tr");
    td = document.createElement("td");
    let text = document.createTextNode(`${parseInt(count / 2) + 1}`);
    td.appendChild(text);
    tr.appendChild(td);
    td = document.createElement("td");
    text = document.createTextNode(`${name}${column}${row}`);
    td.appendChild(text);
    tr.appendChild(td);
    tBody.appendChild(tr);
  } else {
    td = document.createElement("td");
    text = document.createTextNode(`${name}${column}${row}`);
    td.appendChild(text);
    tr.appendChild(td);
    tBody.appendChild(tr);
  }
  count++;
}

let boardArray = [];
