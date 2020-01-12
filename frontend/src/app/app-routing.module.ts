import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {EpisodeListComponent} from './episode-list/episode-list.component';
import {EpisodeFormComponent} from './episode-form/episode-form.component';
import {AuthorListComponent} from './author-list/author-list.component';
import {AuthorFormComponent} from './author-form/author-form.component';
import {LoginComponent} from './login/login.component';
import {AuthGuard} from './auth.guard';
import {SeriesListComponent} from './series-list/series-list.component';
import {SeriesFormComponent} from './series-form/series-form.component';
import {CalendarComponent} from './calendar/calendar.component';


const routes: Routes = [
  { path: 'episode-list', component: EpisodeListComponent, canActivate: [AuthGuard]},
  { path: 'episode-form', component: EpisodeFormComponent, canActivate: [AuthGuard]} ,
  { path: 'episode-form/:id', component: EpisodeFormComponent, canActivate: [AuthGuard]},
  { path: '', redirectTo: 'episode-list', pathMatch: 'full', canActivate: [AuthGuard]},
  { path: 'author-list', component: AuthorListComponent, canActivate: [AuthGuard]},
  { path: 'author-form', component: AuthorFormComponent, canActivate: [AuthGuard]},
  { path: 'author-form/:id', component: AuthorFormComponent, canActivate: [AuthGuard]},
  { path: 'login', component: LoginComponent},
  { path: 'series-list', component: SeriesListComponent, canActivate: [AuthGuard]},
  { path: 'series-form', component: SeriesFormComponent, canActivate: [AuthGuard]},
  { path: 'series-form/:id', component: SeriesFormComponent, canActivate: [AuthGuard]},
  { path: 'calendar', component: CalendarComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
