import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainMenuComponent } from './main-menu/main-menu.component';
import { GameScreenComponent } from './game-screen/game-screen.component';

const routes: Routes = [
  
  {
    path: '',
    redirectTo: 'main',
    pathMatch: 'full'
  },
  { path: 'main', component: MainMenuComponent },
  { path: 'main/game', component: GameScreenComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
