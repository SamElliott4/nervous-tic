import { Component, OnInit } from '@angular/core';
import { Cell } from 'src/app/models/cell';
import { RandomService } from 'src/app/services/random.service';

@Component({
  selector: 'app-tictactoe',
  templateUrl: './tictactoe.component.html',
  styleUrls: ['./tictactoe.component.css']
})
export class TictactoeComponent implements OnInit {

  gameBoard:Array<Cell[]>;
  status:string;
  winStrings:Array<Cell[]>;
  winner:string = "";

  constructor(private random:RandomService) {
    this.initGameBoard();
   }

  initGameBoard():void{

    this.gameBoard = [[new Cell(),new Cell(),new Cell()],
    [new Cell(),new Cell(),new Cell()],
    [new Cell(),new Cell(),new Cell()]
   ];

   this.winStrings = [];
   this.winStrings.push([this.gameBoard[0][0],this.gameBoard[0][1],this.gameBoard[0][2]]);
    this.winStrings.push([this.gameBoard[1][0],this.gameBoard[1][1],this.gameBoard[1][2]]);
    this.winStrings.push([this.gameBoard[2][0],this.gameBoard[2][1],this.gameBoard[2][2]]);
    this.winStrings.push([this.gameBoard[0][0],this.gameBoard[1][0],this.gameBoard[2][0]]);
    this.winStrings.push([this.gameBoard[0][1],this.gameBoard[1][1],this.gameBoard[2][1]]);
    this.winStrings.push([this.gameBoard[0][2],this.gameBoard[1][2],this.gameBoard[2][2]]);
    this.winStrings.push([this.gameBoard[0][0],this.gameBoard[1][1],this.gameBoard[2][2]]);
    this.winStrings.push([this.gameBoard[0][2],this.gameBoard[1][1],this.gameBoard[2][0]]);


  }

  handleClick(cell:Cell):void{
    
    if(this.checkWinner()){
      return;
    }
    cell.content="X";
    if(this.checkWinner()){
      return;
    }
    let empty:Array<Cell> = [];
    for(let i:number = 0; i < this.gameBoard.length; i++){
      for(let j:number = 0; j < this.gameBoard[i].length; j++){
        if(this.gameBoard[i][j].content === ""){
          empty.push(this.gameBoard[i][j]);
        }
      }
    }

    if(empty.length <= 0){
      this.status = "Game over"
      return;
    }
    let p2Move = this.random.getRandomNumber(0,empty.length-1);
    p2Move.then((res) => {
      let num:number = res.result.random.data[0];
      empty[num].content = "O";
      this.checkWinner();
    });
  }

  checkWinner():boolean{
    for(let i:number = 0; i < this.winStrings.length; i++){
      let s:string = this.winStrings[i][0].content + this.winStrings[i][1].content + this.winStrings[i][2].content;

      if(s === "XXX"){
        this.winner = "X";
        this.status = "X wins!";
        return true;
      }
      if(s === "OOO"){
        this.winner = "O";
        this.status = "O wins!";
        return true;
      }
    }
    return false;
  }

  resetGame():void{
    this.status = "";
    this.initGameBoard();
  }

  ngOnInit() {
  }

}
