import { BreakpointObserver } from '@angular/cdk/layout';
import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss']
})
export class BreadcrumbsComponent implements OnInit, AfterViewInit {

  @Input('showmenu') showmenu: boolean = false;
  @Input('first') first!: string;
  @Input('second') second!: string;
  @Input('third') third!: string;

  @Output() clickFirst: EventEmitter<any> = new EventEmitter();
  @Output() clickSecond: EventEmitter<any> = new EventEmitter();
  // @Output() openSideNav: EventEmitter<any> = new EventEmitter();

  constructor(
    private router: Router,
    private observer: BreakpointObserver,
  ) { }

  isMobileView: boolean = false;

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.observer.observe(['(max-width: 800px)']).subscribe((res) => {
      if (res.matches) {
        this.isMobileView = true;
      } else {
        this.isMobileView = false;
      }
    });
  }

  

  goToDashboard(){
    this.router.navigateByUrl('home/dashboard')
  }

}
