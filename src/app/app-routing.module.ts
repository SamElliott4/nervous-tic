import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TictactoeComponent } from './components/tictactoe/tictactoe.component';
import { ConnectfourComponent } from './components/connectfour/connectfour.component';
import { LeftpadComponent } from './components/leftpad/leftpad.component';
import { OthelloComponent } from './components/othello/othello.component';


const routes: Routes = [
  {path: "tictactoe", component:TictactoeComponent},
  {path: "connect4", component:ConnectfourComponent},
  {path: "leftpad", component:LeftpadComponent},
  {path: "othello", component:OthelloComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
