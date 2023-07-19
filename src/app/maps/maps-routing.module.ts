import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MapItemComponent } from './components/map-item/map-item.component';

const routes: Routes = [
  {path: '', component: MapItemComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MapsRoutingModule { }
