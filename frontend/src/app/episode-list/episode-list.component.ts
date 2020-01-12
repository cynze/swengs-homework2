import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {EpisodeService} from '../service/episode.service';
import {GenreService} from '../service/genre.service';

@Component({
  selector: 'app-episode-list',
  templateUrl: './episode-list.component.html',
  styleUrls: ['./episode-list.component.scss']
})
export class EpisodeListComponent implements OnInit {

  episodes: any[];
  displayedColumns = ['title_episode', 'genre', 'series', 'author', 'id']

  constructor(private http: HttpClient, private episodeService: EpisodeService, public genreService: GenreService) { }

  ngOnInit() {
    this.episodeService.getEpisodes()
      .subscribe((response: any[]) => {
        this.episodes = response;
        });
  }

  deleteEpisode(episode: any) {
    this.episodeService.deleteEpisode(episode)
      .subscribe(() => {
        this.ngOnInit();
      });
  }

}
