import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthorService} from '../service/author.service';

@Component({
  selector: 'app-author-list',
  templateUrl: './author-list.component.html',
  styleUrls: ['./author-list.component.scss']
})
export class AuthorListComponent implements OnInit, OnDestroy {

  authors: any[];
  displayedColumns = ['first_name', 'last_name', 'birthday', 'id']

  constructor(private http: HttpClient, private authorService: AuthorService) { }

  ngOnInit() {
    this.authorService.getAuthors()
      .subscribe((response: any[]) => {
        this.authors = response;
      });
  }

  deleteAuthor(author: any) {
    this.authorService.deleteAuthor(author)
      .subscribe(() => {
        this.ngOnInit();
      });
  }

  ngOnDestroy(): void {
  }

}
