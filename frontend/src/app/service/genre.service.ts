import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GenreService {

  constructor() { }

  genreNames = {
    a: 'Action',
    c: 'Comedy',
    r: 'Romance',
    t: 'Thriller'
  };
}
