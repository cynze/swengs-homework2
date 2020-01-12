import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthorService {

  constructor(private http: HttpClient) { }

  retrieveAuthorOptions() {
    return this.http.get <any[]>('/api/author/options');
  }

  getAuthors() {
    return this.http.get('/api/author/list');
  }

  createAuthor(author) {
    return this.http.post('/api/author/create', author);
  }

  updateAuthor(author) {
    return this.http.put('/api/author/' + author.id + '/update', author);
  }

  deleteAuthor(author) {
    return this.http.delete('/api/author/' + author.id + '/delete');
  }
}
