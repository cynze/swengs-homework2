import {Component, OnDestroy, OnInit, ViewChild, TemplateRef} from '@angular/core';
import {
  isSameDay,
  isSameMonth,
} from 'date-fns';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  CalendarEvent,
  CalendarView
} from 'angular-calendar';
import {HttpClient} from '@angular/common/http';
import {EpisodeService} from '../service/episode.service';
import {Subject} from 'rxjs';

const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3'
  }
};

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  constructor(private modal: NgbModal, private http: HttpClient, private episodeService: EpisodeService) {}

  @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any>;

  view: CalendarView = CalendarView.Month;
  CalendarView = CalendarView;
  viewDate: Date = new Date();
  activeDayIsOpen = false;
  refresh: Subject<any> = new Subject();
  title;

  log = this.episodeService.getEpisode(1).subscribe(val => console.log(val.title_episode));
  episode = this.episodeService.getEpisode(1).subscribe(val => this.title = val.title_episode);

  // new Date(year, month, date) ist um einen Monat verschoben!! also Dezember eingeben damit Jänner ist
  episodes: CalendarEvent[] = [
    {
      start: new Date(2019, 12, 8),
      end: new Date(2019, 12, 8),
      title: this.title,
      color: colors.red,
      allDay: true,
    }
  ];

  ngOnInit() {

    /*this.episodeService.getEpisodes()
      .subscribe((response: any[]) => {
        this.episodes = response;
      });
    this.episodeService.getEpisode(1)
      .subscribe((response: any) => {
        this.episode = response;
      });*/

    // logging!!
    // this.episodeService.getEpisode(1).subscribe(val => console.log(val));
    // console.log(this.title2);
    // this.episodeService.getEpisode(1).subscribe(val => this.episode = val);
  }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      this.activeDayIsOpen = !((isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0);
      this.viewDate = date;
    }
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }
}
