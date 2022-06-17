import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CoreService {

  constructor() { }

  formatDateToShow(date: string, edit?: boolean) {
    // 20210729
    if (date != undefined) {
      if (edit) {
        const year = date.substring(0, 4);
        const month = date.substring(4, 6);
        const day = date.substring(6, 8);
        return year + '/' + month + '/' + day;
      }
      const year = date.substring(0, 4);
      const month = date.substring(4, 6);
      const day = date.substring(6, 8);
      return day + '/' + month + '/' + year;
    } else {
      return '';
    }
  }
}
