import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainMenuComponent } from './main-menu/main-menu.component';
import { GameScreenComponent } from './game-screen/game-screen.component';

const routes: Routes = [
  { path: '*', component: MainMenuComponent },
  { path: '', component: MainMenuComponent },
  { path: 'main', component: MainMenuComponent },
  { path: 'game', component: GameScreenComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
