import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {SeriesService} from '../service/series.service';

@Component({
  selector: 'app-series-form',
  templateUrl: './series-form.component.html',
  styleUrls: ['./series-form.component.scss']
})
export class SeriesFormComponent implements OnInit {
  seriesFormGroup;

  constructor(
    private seriesService: SeriesService,
    private router: Router,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.seriesFormGroup = this.fb.group({
      id: [null],
      title_series: ['', Validators.required],
      start_year: ['', Validators.required],
      end_year: ['', Validators.required],
      producer: [''],
      style: ['']
    });

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.http.get('/api/series/' + id + '/get')
        .subscribe((response) => {
          this.seriesFormGroup.patchValue(response);
        });
    }
  }

  createSeries() {
    const series = this.seriesFormGroup.value;
    if (series.id) {
      this.seriesService.updateSeries(series)
        .subscribe( () => {
          alert('updated successfully');
        });
    } else {
      this.seriesService.createSeries(series)
        .subscribe((response: any) => {
          this.router.navigate(['/series-form/' + response.id]);
        });
    }
  }
}
