import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-leftpad',
  templateUrl: './leftpad.component.html',
  styleUrls: ['./leftpad.component.css'],
  preserveWhitespaces: true
})
export class LeftpadComponent implements OnInit {

  constructor() { }
  input:string = "";
  
  padIt():void{
    let lines:Array<string> = this.input.split(/\r?\n/);
    //lines.map(line => "   " +)
  }

  ngOnInit() {
  }

  

}
