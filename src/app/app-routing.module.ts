import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { BanksComponent } from './modules/banks/banks.component';
import { CategoryComponent } from './modules/category/category.component';
import { CompaniesComponent } from './modules/companies/companies.component';
import { UsersComponent } from './modules/users/users.component';

const routes: Routes = [
  // Go To Home Page
  { path: '', redirectTo: 'admin/companies' , pathMatch: 'full'},

  {
    path: 'admin',
    component: SidenavComponent,
    // canActivate: [AuthGuard], // Check Authentication
    children: [
      {path: 'companies', component: CompaniesComponent},
      {path: 'categories', component: CategoryComponent},
      {path: 'users', component: UsersComponent},
      {path: 'banks', component: BanksComponent},
    ]
  },

  // otherwise redirect to home
  { path: '**', redirectTo: 'admin/compaines' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
