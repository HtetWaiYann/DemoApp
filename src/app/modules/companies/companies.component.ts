import { NoopScrollStrategy } from '@angular/cdk/overlay';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AdminCompanyComponent } from 'src/app/components/admin-company/admin-company.component';
import { ICompany } from 'src/app/models/Company';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.scss'],
})
export class CompaniesComponent implements OnInit, OnDestroy {
  constructor(private dialog: MatDialog, private router: Router) {}

  isLoading: boolean = false;
  compaines: ICompany[] = [];

  ngOnInit(): void {
    this.getCompaines();
  }

  ngOnDestroy(): void {
    // Unsubscribe all subscriptions
  }

  // add dummy data for companies
  getCompaines() {
    this.isLoading = true;
    setTimeout(() => {
      const dummyData: ICompany[] = [
        {
          orgid: '1',
          name: 'Google',
          description:
            'This is dummy text. Dummy Text is something you use when you have no actual data.',
          status: '001',
          expirationdate: '17/06/2022',
          expirationdateforedit: '20220617',
          orgimage: 'https://picsum.photos/200/300',
        },
        {
          orgid: '2',
          name: 'Microsoft',
          description:
            'This is dummy text. Dummy Text is something you use when you have no actual data.',
          status: '001',
          expirationdate: '11/06/2022',
          expirationdateforedit: '20220611',
          orgimage: '',
        },
        {
          orgid: '3',
          name: 'IBM Cloud',
          description:
            'This is dummy text. Dummy Text is something you use when you have no actual data.',
          status: '002',
          expirationdate: '03/06/2022',
          expirationdateforedit: '20220603',
          orgimage: 'https://picsum.photos/200/300',
        },
      ];
      this.compaines = dummyData;
      this.isLoading = false;
    }, 2000);
  }

  // Create new company
  newCompany() {
    let dialogRef = this.dialog.open(AdminCompanyComponent, {
      width: '600px',
      maxHeight: '95vh',
      maxWidth: '95vw',
      scrollStrategy: new NoopScrollStrategy(),
      autoFocus: false,
      data: {
        edit: false,
      },
    });

    dialogRef
      .afterClosed()
      .subscribe((result: { status: boolean; data: ICompany }) => {
        if (result) {
          if (result.status == true) {
            this.compaines.push(result.data);
          }
        }
      });
  }

  // Edit company details
  editCompany(company: ICompany) {
    let dialogRef = this.dialog.open(AdminCompanyComponent, {
      width: '600px',
      maxHeight: '95vh',
      maxWidth: '95vw',
      scrollStrategy: new NoopScrollStrategy(),
      autoFocus: false,
      data: {
        edit: true,
        company: company,
      },
    });

    dialogRef
      .afterClosed()
      .subscribe((result: { status: boolean; data: ICompany }) => {
        if (result) {
          if (result.status == true) {
            company.status = result.data.status;
            company.expirationdateforedit = result.data.expirationdateforedit;
            company.expirationdate = result.data.expirationdate;
          }
        }
      });
  }
}
