import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MapsRoutingModule } from './maps-routing.module';
import { MapItemComponent } from './components/map-item/map-item.component';
import { HttpClientModule } from '@angular/common/http';

import { MatGridListModule } from '@angular/material/grid-list';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MapItemService } from './services/map-item.service';

@NgModule({
  declarations: [MapItemComponent],
  imports: [
    CommonModule,
    MapsRoutingModule,
    MatGridListModule,
    HttpClientModule,
    DragDropModule,
    MatButtonModule,
    MatIconModule,
  ],
  providers: [MapItemService],
})
export class MapsModule {}
