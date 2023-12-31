import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MapItem } from '../entities/map-item';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MapItemService {

  constructor(private http: HttpClient) { }

  getMap(id: number): Observable<MapItem> {
    return this.http.get<MapItem>(environment.apiUrl + 'map/' + id);
  }

  getImageMap(path: string): Observable<Blob> {
    return this.http.post(
      environment.apiUrl + 'map/download/image-map',
      { path: path },
      { responseType: 'blob' }
    );
  }
}
