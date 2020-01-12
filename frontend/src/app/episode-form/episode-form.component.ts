import { Component, OnInit } from '@angular/core';
import {AbstractControl, AsyncValidatorFn, FormBuilder, ValidationErrors, ValidatorFn, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {EpisodeService} from '../service/episode.service';
import {GenreService} from '../service/genre.service';
import {SeriesService} from '../service/series.service';
import {AuthorService} from '../service/author.service';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-episode-form',
  templateUrl: './episode-form.component.html',
  styleUrls: ['./episode-form.component.scss']
})
export class EpisodeFormComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private episodeService: EpisodeService,
    public genreService: GenreService,
    private seriesService: SeriesService,
    private authorService: AuthorService
  ) { }

  episodeFormGroup;
  age;
  seriesOptions;
  authorOptions;


  ngOnInit() {
    this.episodeFormGroup = this.fb.group({
      id: [null],
      title_episode: ['', [Validators.required, this.badWordValidator()]], // this.titleValidator()
      release_date: [null],
      season: ['', Validators.max(50)],
      black_and_white: [null],
      genre: [null],
      rate: [null],
      series: [null],
      author: [[]]

      });

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.http.get('/api/episode/' + id + '/get')
        .subscribe((response) => {
          this.episodeFormGroup.patchValue(response);
        });
    }

    this.episodeFormGroup.controls.release_date.valueChanges.subscribe(() => {
      const releaseDate = this.episodeFormGroup.controls.release_date.value;
      this.age = undefined;
      if (releaseDate) {
        this.age = this.calculateAge(new Date(releaseDate));
      }
    });

    this.seriesService.retrieveSeriesOptions().subscribe((result) => {
      this.seriesOptions = result;
    });

    this.authorService.retrieveAuthorOptions().subscribe((result) => {
      this.authorOptions = result;
    });
  }

  calculateAge(date) {
    const ageDifMs = Date.now() - date;
    if (ageDifMs > 0) {
      const ageDate = new Date(ageDifMs);
      return Math.abs(ageDate.getUTCFullYear() - 1970);
    } else {
      return 0;
    }
  }

  badWordValidator(): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {
      const forbidden = /bad word/.test(control.value);
      return forbidden ? {badWord: {value: control.value}} : null;
    };
  }

/*
  titleValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
      return this.episodeService.getEpisodes()
        .pipe(
          map((episodes: any[]) => {
            const currentId = this.episodeFormGroup.controls.id.value;
            const currentTitleEpisode = this.episodeFormGroup.controls.title_episode.value;
            const movieWithSameTitle = episodes.find((m) => {
              return (currentId || m.id !== currentId) && m.title === currentTitleEpisode;
            });
            if (movieWithSameTitle) {
              return {
                titleAlreadyExists: true
              };
            } else {
              return null;
            }
          })
        );
    };
  }
 */

  createEpisode() {
    const episode = this.episodeFormGroup.value;
    if (episode.id) {
      this.episodeService.updateEpisode(episode)
        .subscribe( () => {
          alert('updated successfully');
        });
    } else {
        this.episodeService.createEpisode(episode)
          .subscribe((response: any) => {
            this.router.navigate(['/episode-form/' + response.id]);
          });
    }
  }
}
