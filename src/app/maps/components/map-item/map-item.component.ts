import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MapItemService } from '../../services/map-item.service';
import { MapItem } from '../../entities/map-item';
import { fabric } from 'fabric';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { IEvent, Image, Point } from 'fabric/fabric-impl';
import { MapData } from '../../entities/map-data';

@Component({
  selector: 'app-map-item',
  templateUrl: './map-item.component.html',
  styleUrls: ['./map-item.component.scss'],
})
export class MapItemComponent implements OnInit, AfterViewInit, OnDestroy {
  baseUrl = environment.baseUrl;
  canvas!: fabric.Canvas;
  @ViewChild('canvasWrapper') wrapper?: ElementRef<HTMLDivElement>
  mapItem?: MapItem;
  mapItemSub?: Subscription;
  mapItemImageSub?: Subscription;
  constructor(private service: MapItemService) {}
  ngAfterViewInit(): void {}
  ngOnDestroy(): void {
    if (this.mapItemSub) {
      this.mapItemSub.unsubscribe;
    }
    if (this.mapItemImageSub) {
      this.mapItemImageSub.unsubscribe;
    }
  }
  ngOnInit(): void {
    this.mapItemSub = this.service.getMap(36).subscribe({
      next: (response: MapItem) => {
        this.initCanvas(response);
      },
    });
  }

  private initCanvas(mapItem: MapItem): void {
    this.canvas = new fabric.Canvas('canvas', {
      selection: false,
      width: this.wrapper?.nativeElement.offsetWidth,
      height: this.wrapper?.nativeElement.offsetHeight,
    });
    this._gettingAnImageForCanvasBacking(mapItem);
  }

  // Getting the image for the map background
  private _gettingAnImageForCanvasBacking(mapItem: MapItem): void {
    fabric.Image.fromURL(
      this.baseUrl + mapItem.image,
      (canvasImageBg: Image) => {
        const image: fabric.Object = canvasImageBg.set({
          left: 0,
          top: 0,
          selectable: false,
          scaleX: 1,
          scaleY: 1,
        });
        // Set the resulting image to the background of the map
        this._setImageInBackgroundCanvas(image);
      }
    );
  }

  // Set the resulting image to the background of the map
  private _setImageInBackgroundCanvas(image: fabric.Object): void {
    this.canvas?.add(image);
    const zoomX = (this.wrapper!.nativeElement.offsetWidth / image.width!);
    this.canvas.setZoom(zoomX);
    this.canvas?.renderAll();
  }
}
