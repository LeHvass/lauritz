import { AuthGuard } from './auth/auth.guard';
import { AdminGuard } from './auth/admin.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HomeComponent } from './home/home.component';
import { PortalComponent } from './portal/portal.component';
import { CreateAuctionComponent } from './portal/create-auction/create-auction.component';
import { DisplayAuctionsComponent } from './portal/display-auctions/display-auctions.component';
import { AdminComponent } from './admin/admin.component';

// Defining your routes
const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  
  {path: 'home', component: HomeComponent, children:[
    {path: 'register', component: RegisterComponent},
    { path: 'login', component: LoginComponent}
  ]},

  {path: 'portal', component: PortalComponent, canActivate: [AuthGuard], children:[
    {path: 'create-auction', component: CreateAuctionComponent},
    { path: 'display-auctions', component: DisplayAuctionsComponent}
  ]},

  {path: 'admin', component: AdminComponent, canActivate: [AdminGuard], children: [
  ]},

  { path: '**', component: PageNotFoundComponent }
 ];
 

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
