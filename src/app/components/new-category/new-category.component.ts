import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Category } from 'src/app/models/Category';

@Component({
  selector: 'app-new-category',
  templateUrl: './new-category.component.html',
  styleUrls: ['./new-category.component.scss'],
})
export class NewCategoryComponent implements OnInit, OnDestroy {
  constructor(
    private dialogRef: MatDialogRef<NewCategoryComponent>,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  category!: Category;
  loading: boolean = false;
  isEditing: boolean = false;

  categoryForm = this.formBuilder.group({
    categoryname: ['', Validators.required],
  });

  get formControl() {
    return this.categoryForm.controls;
  }

  ngOnInit(): void {
    if (this.data.edit) {
      this.category = this.data.category;
      this.isEditing = true;
      this.categoryForm.patchValue({
        categoryname: this.category.categoryname,
      });
    }
  }
  ngOnDestroy(): void {
    // Unsubscribe here
  }

  dismiss() {
    this.dialogRef.close({ status: false, data: {} });
  }

  createCategory() {
    if (this.loading) {
      return;
    }
    if (this.formControl['categoryname'].invalid) {
      return;
    }
    this.loading = true;
    this.dialogRef.disableClose = true;
    const categoryname = this.formControl['categoryname'].value
      .toString()
      .trim();

    setTimeout(() => {
      if (this.isEditing) {
        var temp: Category = {
          categoryname: categoryname,
          categoryid: this.category.categoryid,
        };
      } else {
        var temp: Category = {
          categoryname: categoryname,
          categoryid: '1',
        };
      }
      this.dialogRef.close({
        status: true,
        data: temp,
      });
    }, 2000);
  }
}
