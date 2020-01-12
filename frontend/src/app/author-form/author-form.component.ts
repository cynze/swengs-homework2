import { Component, OnInit } from '@angular/core';
import {AuthorService} from '../service/author.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {GenderService} from '../service/gender.service';

@Component({
  selector: 'app-author-form',
  templateUrl: './author-form.component.html',
  styleUrls: ['./author-form.component.scss']
})
export class AuthorFormComponent implements OnInit {

  authorFormGroup;

  constructor(
    private authorService: AuthorService,
    private router: Router,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private http: HttpClient,
    public genderService: GenderService
  ) { }

  ngOnInit() {
    this.authorFormGroup = this.fb.group({
      id: [null],
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      birthday: [null],
      gender: [''],
      alive: ['']
    });

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.http.get('/api/author/' + id + '/get')
        .subscribe((response) => {
          this.authorFormGroup.patchValue(response);
        });
    }
  }

  createAuthor() {
    const author = this.authorFormGroup.value;
    if (author.id) {
      this.authorService.updateAuthor(author)
        .subscribe( () => {
          alert('updated successfully');
        });
    } else {
      this.authorService.createAuthor(author)
        .subscribe((response: any) => {
          this.router.navigate(['/author-form/' + response.id]);
        });
    }
  }

}
