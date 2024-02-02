import { Component } from '@angular/core';
import { GlobalService } from 'src/global.service';



@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.scss']
})
export class MainMenuComponent {
  constructor(public global: GlobalService){

  }


}
