import { Component, OnInit } from '@angular/core';
import { NavItem } from '../../models/navItem';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  navItems:Array<NavItem>;

  constructor() {
    this.navItems = [
      new NavItem("Tic-Tac-Toe", "/tictactoe"),
      new NavItem("Connect Four", "/connect4"),
      new NavItem("Othello", "/othello"),
      new NavItem("LeftPad", "/leftpad")
    ];
   }

  ngOnInit() {
  }

}
