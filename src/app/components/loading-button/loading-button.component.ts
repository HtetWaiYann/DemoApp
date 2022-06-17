import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-loading-button',
  templateUrl: './loading-button.component.html',
  styleUrls: ['./loading-button.component.scss']
})
export class LoadingButtonComponent implements OnInit {

  @Input('text') text: string = 'Save';
  @Input('loadingtext') loadingtext: string = 'Saving';
  @Input('loading') loading: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

}
