import { Component, OnInit, Input } from '@angular/core';
import { NavItem } from 'src/app/models/navItem';

@Component({
  selector: 'app-nav-item',
  templateUrl: './nav-item.component.html',
  styleUrls: ['./nav-item.component.css']
})
export class NavItemComponent implements OnInit {
  @Input() props:NavItem;

  constructor() { }

  ngOnInit() {
  }

}
