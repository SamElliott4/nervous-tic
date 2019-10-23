import { Component, OnInit } from '@angular/core';
import { Cell } from 'src/app/models/cell';
import { RandomService } from 'src/app/services/random.service';

@Component({
  selector: 'app-connectfour',
  templateUrl: './connectfour.component.html',
  styleUrls: ['./connectfour.component.css']
})
export class ConnectfourComponent implements OnInit {

  gameBoard:Array<Cell[]> = [];
  status:string = "";

  constructor(private random:RandomService) { 
    this.initBoard();
    
    
  }

  initBoard():void{
    this.gameBoard = [[new Cell(),new Cell(),new Cell(),new Cell(),new Cell(),new Cell(),new Cell()],
    [new Cell(),new Cell(),new Cell(),new Cell(),new Cell(),new Cell(),new Cell()],
    [new Cell(),new Cell(),new Cell(),new Cell(),new Cell(),new Cell(),new Cell()],
    [new Cell(),new Cell(),new Cell(),new Cell(),new Cell(),new Cell(),new Cell()],
    [new Cell(),new Cell(),new Cell(),new Cell(),new Cell(),new Cell(),new Cell()],
    [new Cell(),new Cell(),new Cell(),new Cell(),new Cell(),new Cell(),new Cell()]
    ];
    for(let i:number = 0; i < this.gameBoard.length; i++){
      for(let j:number = 0; j < this.gameBoard[i].length; j++){
        this.gameBoard[i][j].row = i;
        this.gameBoard[i][j].column = j;
      }
    }
  }

  handleClick(cell:Cell):void{
    if(this.checkWinner()){
      return;
    }
    if(this.gameBoard[0][cell.column].content){
      return;
    }
    for(let i:number = this.gameBoard.length-1; i >= 0; i--){
      if(this.gameBoard[i][cell.column].content){
        continue;
      }else{
        this.gameBoard[i][cell.column].content = "\u25CF";
        break;
      }
    }
    if(this.checkWinner()){
      return;
    }
    let open:Array<number> = []
    for(let i:number = 0; i < this.gameBoard[0].length; i++){
      if(!this.gameBoard[0][i].content){
        open.push(i);
      }
    }
    let p2Move:Promise<any> = this.random.getRandomNumber(0,open.length-1);
    p2Move.then((res) => {
      let num:number = res.result.random.data[0];
      console.log(num);
      for(let i:number = this.gameBoard.length-1; i >= 0; i--){
        if(this.gameBoard[i][num].content){
          continue;
        }else{
          this.gameBoard[i][num].content = "\u25CF";
          this.gameBoard[i][num].color = "red";
          break;
        }
      }
      this.checkWinner()
    })
  }

  getBoardString():string{
    let output:string = "";
    for(let i:number = 0; i<this.gameBoard.length; i++){
      for(let j:number = 0; j<this.gameBoard[i].length; j++){
        output += this.gameBoard[i][j].content ? (this.gameBoard[i][j].color === "black" ? "B" : "R") : " ";
      }
      output += " ";
    }
    return output;
  }

  checkWinner():boolean{
    let pattern:string = "BBBB|"
      + "B.{7}B.{7}B.{7}B|"
      + "B.{6}B.{6}B.{6}B|"
      + "B.{8}B.{8}B.{8}B"
      + "RRRR|"
      + "R.{7}R.{7}R.{7}R|"
      + "R.{6}R.{6}R.{6}R|"
      + "R.{8}R.{8}R.{8}R";
    let regex:RegExp  = new RegExp(pattern);

    let matches:Array<string> = this.getBoardString().match(regex);
    if(matches == null){
      return false;
    }
    if(matches.length > 0){
      if(matches[0][0] === "B"){
        console.log("Black wins");
        this.status = "Black wins!"
        return true;
      }else if(matches[0][0] === "R"){
        console.log("Red wins");
        this.status = "Red wins!"
        return true;
      }
    }
    return false;
  }

  resetGame():void{
    this.status = "";
    this.initBoard();
  }

  ngOnInit() {
  }

}
