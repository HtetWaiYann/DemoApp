import { DatePipe } from '@angular/common';
import {
  Component,
  Inject,
  OnDestroy,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CoreService } from 'src/app/services/core-service/core.service';

@Component({
  selector: 'app-admin-company',
  templateUrl: './admin-company.component.html',
  styleUrls: ['./admin-company.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AdminCompanyComponent implements OnInit, OnDestroy {
  constructor(
    private dialogRef: MatDialogRef<AdminCompanyComponent>,
    private formBuilder: FormBuilder,
    private datePipe: DatePipe,
    private coreService: CoreService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.isEditing = data.edit;
    if (this.isEditing) {
      var date = new Date(
        this.coreService.formatDateToShow(
          data.company.expirationdateforedit,
          true
        )
      );
      this.orgid = data.company.orgid;
      this.companyForm.setValue({
        name: data.company.name,
        description: data.company.description,
        status: data.company.status,
        expirationdate: date,
      });
    }
  }

  // subscriptions = new SubSink();
  loading: boolean = false;
  isEditing: boolean = false;
  orgid: string = '';

  companyForm = this.formBuilder.group({
    name: ['', Validators.required],
    description: [''],
    status: ['', Validators.required],
    expirationdate: ['', Validators.required],
  });

  get formControl() {
    return this.companyForm.controls;
  }

  ngOnInit(): void {
    if (this.isEditing) {
      this.formControl['name'].disable();
      this.formControl['description'].disable();
    }
  }

  ngOnDestroy(): void {
    // unsubscribe here
  }

  dismiss() {
    this.dialogRef.close({ status: false, data: {} });
  }


  // Save company form
  saveCompany() {
    if (this.loading) {
      return;
    }
    if (
      this.formControl['name'].invalid ||
      this.formControl['status'].invalid ||
      this.formControl['expirationdate'].invalid
    ) {
      return;
    }
    this.loading = true;
    this.dialogRef.disableClose = true;
    const name = this.formControl['name'].value.toString().trim();
    const description = this.formControl['description'].value.toString().trim();
    const status = this.formControl['status'].value.toString().trim();
    const expirationdate = this.formControl['expirationdate'].value
      .toString()
      .trim();
    const transformed_date = this.datePipe
      .transform(new Date(expirationdate), 'yyyyMMdd')
      ?.toString();

    setTimeout(() => {
      this.dialogRef.close({
        status: true,
        data: {
          name: name,
          description: description,
          status: status,
          expirationdate: this.coreService.formatDateToShow(transformed_date!),
          expirationdateforedit: transformed_date!,
          orgimage: '',
        },
      });
    }, 3000);
  }
}
