import { Component } from '@angular/core';
import { Card, GlobalService } from 'src/global.service';

@Component({
  selector: 'app-game-screen',
  templateUrl: './game-screen.component.html',
  styleUrls: ['./game-screen.component.scss']
})
export class GameScreenComponent {

  constructor(public global: GlobalService){

  }

  async ngOnInit(){
    
  }
  

}
