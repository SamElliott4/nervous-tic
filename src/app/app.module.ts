import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { TictactoeComponent } from './components/tictactoe/tictactoe.component';
import { ConnectfourComponent } from './components/connectfour/connectfour.component';
import { HomeComponent } from './components/home/home.component';
import { NavItemComponent } from './components/nav-item/nav-item.component';
import { CellComponent } from './components/cell/cell.component';
import { LeftpadComponent } from './components/leftpad/leftpad.component';
import { LeftpadPipe } from './pipes/leftpad.pipe';
import { OthelloComponent } from './components/othello/othello.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    TictactoeComponent,
    ConnectfourComponent,
    HomeComponent,
    NavItemComponent,
    CellComponent,
    LeftpadComponent,
    LeftpadPipe,
    OthelloComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
