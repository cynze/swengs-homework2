import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthorService} from '../service/author.service';
import {SeriesService} from '../service/series.service';

@Component({
  selector: 'app-series-list',
  templateUrl: './series-list.component.html',
  styleUrls: ['./series-list.component.scss']
})
export class SeriesListComponent implements OnInit {

  series: any[];
  displayedColumns = ['title_series', 'end_year', 'start_year']

  constructor(private http: HttpClient, private seriesService: SeriesService) { }

  ngOnInit() {
    this.seriesService.getSeries()
      .subscribe((response: any[]) => {
        this.series = response;
      });
  }

  deleteSeries(series: any) {
    this.seriesService.deleteSeries(series)
      .subscribe(() => {
        this.ngOnInit();
      });
  }
}
