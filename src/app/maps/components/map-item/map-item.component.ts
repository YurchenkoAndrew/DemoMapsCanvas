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
// import { IEvent, Image, Point } from 'fabric/fabric-impl';
import { MapData } from '../../entities/map-data';

@Component({
  selector: 'app-map-item',
  templateUrl: './map-item.component.html',
  styleUrls: ['./map-item.component.scss'],
})
export class MapItemComponent implements OnInit, AfterViewInit, OnDestroy {
  baseUrl = environment.baseUrl;
  canvas?: fabric.Canvas;
  mapItem?: MapItem;
  mapItemSub?: Subscription;
  mapItemImageSub?: Subscription;
  image: HTMLImageElement = new Image();
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
        // this.initCanvas(response);
        this.mapItemImageSub = this.service
          .getImageMap(response.image)
          .subscribe({
            next: (response: Blob) => {
              this.image.src = URL.createObjectURL(response);
              this.initCanvas(this.image.src);
            },
          });
      },
    });
  }

  private initCanvas(imageSrc: string): void {
    this.image.src = imageSrc;
    this.image.onload = () => {
      this.canvas = new fabric.Canvas('canvas', {
        selection: false,
        width: 500,
        height: 500,
      });
    };
    this._gettingAnImageForCanvasBacking(imageSrc);
  }

  private _gettingAnImageForCanvasBacking(imageSrc: string): void {
    const imageInstance = new fabric.Image(imageSrc, {
      left: 0,
      top: 0,
      scaleX: 1,
      scaleY: 1,
      selectable: false,
    });
    this.canvas?.add(imageInstance);
    this.canvas?.renderAll();
  }

  // Getting the image for the map background
  // private _gettingAnImageForCanvasBacking(mapItemResponse: MapItem): void {
  //   fabric.Image.fromURL(
  //     this.baseUrl + mapItemResponse.image,
  //     (canvasImageBg: Image) => {
  //       const image: fabric.Object = canvasImageBg.set({
  //         left: 0,
  //         top: 0,
  //         selectable: false,
  //         scaleX: 1,
  //         scaleY: 1,
  //       });
  //       // Set the resulting image to the background of the map
  //       this._setImageInBackgroundCanvas(image);
  //     }
  //   );
  // }

  // Set the resulting image to the background of the map
  //   private _setImageInBackgroundCanvas(image: fabric.Object): void {
  //     this.canvas?.add(image);
  //       this.canvas?.renderAll();
  //   }
}
