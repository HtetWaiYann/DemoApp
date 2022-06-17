import { NoopScrollStrategy } from '@angular/cdk/overlay';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ConfirmDialogComponent } from 'src/app/components/confirm-dialog/confirm-dialog.component';
import { NewCategoryComponent } from 'src/app/components/new-category/new-category.component';
import { Category } from 'src/app/models/Category';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit {
  constructor(
    private router: Router,
    private dialog: MatDialog
  ) {
  }

  categories: Category[] = [];
  gettingCategories: boolean = false;
  

  ngOnInit(): void {
    this.getCategory();
  }

  getCategory() {
    this.gettingCategories = true;
    setTimeout(() => {
      const dummyData: Category[] = [
        {
          categoryid: '1',
          categoryname: 'Public Company',
        },
        {
          categoryid: '2',
          categoryname: 'Private Company',
        },
        {
          categoryid: '3',
          categoryname: 'Government Company',
        },
        {
          categoryid: '3',
          categoryname: 'One Person Company (OPC)',
        }
      ]
      this.categories = dummyData;
      this.gettingCategories = false;
    }, 2000);
  }

  newCategory() {
    let dialogRef = this.dialog.open(NewCategoryComponent, {
      width: '600px',
      scrollStrategy: new NoopScrollStrategy(),
      autoFocus: false,
      data: {
        edit: false,
      },
    });

    dialogRef
      .afterClosed()
      .subscribe((result: { status: boolean; data: Category }) => {
        if (result) {
          if (result.status == true) {
            this.categories.push(result.data);
          }
        }
      });
  }

  editCategory(category: Category) {
    let dialogRef = this.dialog.open(NewCategoryComponent, {
      width: '600px',
      scrollStrategy: new NoopScrollStrategy(),
      autoFocus: false,
      data: {
        edit: true,
        category: category,
      },
    });

    dialogRef
      .afterClosed()
      .subscribe((result: { status: boolean; data: Category }) => {
        if (result) {
          if (result.status == true) {
            category.categoryname = result.data.categoryname;
          }
        }
      });
  }

  deleteCategory(category: Category, index: number) {
    let dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      scrollStrategy: new NoopScrollStrategy(),
      autoFocus: false,
      data: {
        title: 'Delete Category',
        message:
          "Are you sure to delete the category '" +
          category.categoryname +
          "'?",
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.categories.splice(index, 1);
      }
    });
  }
}
