import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EpisodeService {

  constructor(private http: HttpClient) { }

  getEpisodes() {
    return this.http.get('/api/episode/list');
  }

  createEpisode(episode) {
    return this.http.post('/api/episode/create', episode);
  }

  updateEpisode(episode) {
    return this.http.put('/api/episode/' + episode.id + '/update', episode);
  }

  deleteEpisode(episode) {
    return this.http.delete('/api/episode/' + episode.id + '/delete');
  }

  getEpisode(id) {
    return this.http.get('/api/episode/' + id + '/get');
  }
}
