import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GenderService {

  constructor() { }

  genderNames = {
    M: 'Male',
    F: 'Female',
  };
}
