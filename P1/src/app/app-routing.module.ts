import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ProfileDetailsComponent } from "./profile-details/profile-details.component";
import { PNFComponent } from "./pnf/pnf.component";
import { MainPageComponent } from './main-page/main-page.component';
import { ChartsComponent } from './charts/charts.component';

const routes: Routes = [
  { path: 'main', component: MainPageComponent },
  { path: 'customer/:id', component: ProfileDetailsComponent },
  { path: 'charts', component: ChartsComponent },
  { path: '', redirectTo: "/main", pathMatch: "full" },
  { path: '**', component: PNFComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [MainPageComponent, ProfileDetailsComponent, PNFComponent, ChartsComponent]
