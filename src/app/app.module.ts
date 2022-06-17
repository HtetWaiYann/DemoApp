import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// My Components
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { CompaniesComponent } from './modules/companies/companies.component';
import { AdminCompanyComponent } from './components/admin-company/admin-company.component';
import { BreadcrumbsComponent } from './components/breadcrumbs/breadcrumbs.component';

//My Modules
import { MatSidenavModule } from '@angular/material/sidenav';
import { LayoutModule } from '@angular/cdk/layout';
import { MatNativeDateModule } from '@angular/material/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { LoadingButtonComponent } from './components/loading-button/loading-button.component';
import { CoreService } from './services/core-service/core.service';
import { CategoryComponent } from './modules/category/category.component';
import { NewCategoryComponent } from './components/new-category/new-category.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { UsersComponent } from './modules/users/users.component';
import { BanksComponent } from './modules/banks/banks.component';

@NgModule({
  declarations: [
    AppComponent,
    SidenavComponent,
    CompaniesComponent,
    AdminCompanyComponent,
    BreadcrumbsComponent,
    LoadingButtonComponent,
    CategoryComponent,
    NewCategoryComponent,
    ConfirmDialogComponent,
    UsersComponent,
    BanksComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    ReactiveFormsModule,
    FormsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    MatCheckboxModule,
  ],
  providers: [DatePipe, CoreService],
  bootstrap: [AppComponent]
})
export class AppModule { }
