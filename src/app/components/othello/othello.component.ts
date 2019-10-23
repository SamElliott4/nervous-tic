import { Component, OnInit } from '@angular/core';
import { RandomService } from 'src/app/services/random.service';
import { Cell } from 'src/app/models/cell';

@Component({
  selector: 'app-othello',
  templateUrl: './othello.component.html',
  styleUrls: ['./othello.component.css']
})
export class OthelloComponent implements OnInit {

  gamePiece:string = "\u25CF";
  gameBoard:Array<Cell[]>;
  status:string = "";
  constructor(private random:RandomService) {
    this.initBoard();
   }
  
  initBoard():void{
    this.gameBoard = [
      [new Cell(),new Cell(),new Cell(),new Cell(),new Cell(),new Cell(),new Cell(),new Cell()],
      [new Cell(),new Cell(),new Cell(),new Cell(),new Cell(),new Cell(),new Cell(),new Cell()],
      [new Cell(),new Cell(),new Cell(),new Cell(),new Cell(),new Cell(),new Cell(),new Cell()],
      [new Cell(),new Cell(),new Cell(),new Cell(),new Cell(),new Cell(),new Cell(),new Cell()],
      [new Cell(),new Cell(),new Cell(),new Cell(),new Cell(),new Cell(),new Cell(),new Cell()],
      [new Cell(),new Cell(),new Cell(),new Cell(),new Cell(),new Cell(),new Cell(),new Cell()],
      [new Cell(),new Cell(),new Cell(),new Cell(),new Cell(),new Cell(),new Cell(),new Cell()],
      [new Cell(),new Cell(),new Cell(),new Cell(),new Cell(),new Cell(),new Cell(),new Cell()]
    ];
    for(let i:number = 0; i < this.gameBoard.length;i++){
      for(let j:number = 0; j < this.gameBoard[i].length; j++){
        this.gameBoard[i][j].row = i;
        this.gameBoard[i][j].column = j;
      }
    }
    this.gameBoard[3][3].content = this.gamePiece;
    this.gameBoard[3][3].color = "white";
    this.gameBoard[3][4].content = this.gamePiece;
    this.gameBoard[3][4].color = "black";
    this.gameBoard[4][3].content = this.gamePiece;
    this.gameBoard[4][3].color = "black";
    this.gameBoard[4][4].content = this.gamePiece;
    this.gameBoard[4][4].color = "white";
  }

  handleClick(cell:Cell):void{
    if(cell.content){
      return;
    }
    cell.color = "white";
    if(!this.validMove(cell, this.gameBoard)){
      return;
    }
    cell.content = this.gamePiece;
    this.flipSandwiched(cell, this.gameBoard);
    if(this.checkWinner()){
      return;
    }
    let p1Move:boolean = false;

      let validMoves:Array<Cell> = []
      
      for(let i:number = 0; i < this.gameBoard.length; i++){
        for(let j:number = 0; j < this.gameBoard[i].length; j++){
          let c:Cell = this.gameBoard[i][j];
          if(c.content){
            continue;
          }
          c.color = "black";
          if(this.validMove(c,this.gameBoard)){
            validMoves.push(c);
          }
        }
      }
      if(validMoves.length < 1){
        this.status = "Your opponent has no valid moves. It's your move again.";
        return;
      }else{
        this.status = "Waiting for your opponent to move.";
      }

      let p2Move = this.random.getRandomNumber(0,validMoves.length-1);
      p2Move.then((res) => {
        let num:number = res.result.random.data[0];
        validMoves[num].content = this.gamePiece;
        validMoves[num].color = "black";
        this.flipSandwiched(validMoves[num], this.gameBoard);
        this.checkWinner();
        this.status = "It's your move.";
      });

  }

  checkWinner():boolean{
    let white:Array<Cell> = this.gameBoard.reduce((arr1, arr2)=>[...arr1, ...arr2], []).filter((cell:Cell)=>cell.content && cell.color === "white");
    let black:Array<Cell> = this.gameBoard.reduce((arr1, arr2)=>[...arr1, ...arr2], []).filter((cell:Cell)=>cell.content && cell.color === "black");
    if(white.length + black.length === 64 || white.length === 0 || black.length === 0){
      this.status = white.length > black.length ? "White wins!" : (white.length < black.length ? "Black wins!" : "It's a draw!");
      return true;
    }
    return false;
  }

  resetGame():void{
    this.status = "";
    this.initBoard();
  }

  validMove(cell:Cell, board:Array<Cell[]>):boolean{
    if(cell.content){
      return false;
    }
    for(let i:number = -1; i < 2; i++){
      for(let j:number = -1; j < 2; j++){
        if(i === 0 && j === 0){
          continue;
        }
        let curRow:number = cell.row + i;
        let curColumn:number = cell.column + j;
        if(curRow >= 0 && 
          curRow < 8 &&
          curColumn >= 0 && 
          curColumn < 8 &&
          board[curRow][curColumn].content &&
          board[curRow][curColumn].color !== cell.color){
            // adjacent piece of opposite color
            // keep checking this direction for one of own color
            curRow += i;
            curColumn += j;
          while(curRow >= 0 &&
            curRow < 8 &&
            curColumn >= 0 &&
            curColumn < 8 &&
            board[curRow][curColumn].content){
              if(board[curRow][curColumn].color === cell.color){
                return true;
              }
              curRow += i;
              curColumn += j;
          }
        }
      }
    }
    
    return false;
  }

  flipSandwiched(cell:Cell, board:Array<Cell[]>):void{
    for(let i:number = -1; i < 2; i++){
      for(let j:number = -1; j < 2; j++){
        if(i === 0 && j === 0){
          continue;
        }
        let curRow:number = cell.row + i;
        let curColumn:number = cell.column + j;
        let toFlip:Array<Cell> = [];
        while(
          curRow >= 0 && 
          curRow < 8 &&
          curColumn >= 0 && 
          curColumn < 8 &&
          board[curRow][curColumn].content
        ){
            if(board[curRow][curColumn].color !== cell.color){
              // adjacent piece of opposite color
              // keep checking this direction for more to flip
              toFlip.push(board[curRow][curColumn])
              curRow += i;
              curColumn += j;
            }else if(board[curRow][curColumn].color === cell.color){
              // hit one of own color, flip all in between and stop
              // traversing this direction
              toFlip.forEach((c:Cell) =>{c.color = cell.color === "white" ? "white" : "black" });
              break;
            }
            
            
            
          
        }
      }
    }
  }
  

  ngOnInit() {
  }

}
