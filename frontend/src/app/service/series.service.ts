import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SeriesService {

  constructor(private http: HttpClient) { }

  retrieveSeriesOptions() {
    return this.http.get <any[]>('/api/series/options');
  }

  getSeries() {
    return this.http.get('/api/series/list');
  }

  createSeries(series) {
    return this.http.post('/api/series/create', series);
  }

  updateSeries(series) {
    return this.http.put('/api/series/' + series.id + '/update', series);
  }

  deleteSeries(series) {
    return this.http.delete('/api/series/' + series.id + '/delete');
  }

}
