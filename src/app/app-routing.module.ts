import { AuthGuard } from './auth/auth.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HomeComponent } from './home/home.component';
import { PortalComponent } from './portal/portal.component';
import { CreateAuctionComponent } from './portal/create-auction/create-auction.component';
import { DisplayAuctionsComponent } from './portal/display-auctions/display-auctions.component';
import { ProductDetailsComponent } from './portal/product-details/product-details.component';
import { BidsComponent } from './portal/product-details/bids/bids.component';


// Defining your routes
const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  
  {path: 'home', component: HomeComponent, children:[
    {path: 'register', component: RegisterComponent},
    { path: 'login', component: LoginComponent}
  ]},
  {path: 'portal', component: PortalComponent, /*canActivate: [AuthGuard],*/ children:[
    {path: 'create-auction', component: CreateAuctionComponent},
    { path: 'display-auctions', component: DisplayAuctionsComponent},
    { path: 'product-details/:id', component: ProductDetailsComponent, children:[{
      path: 'bids', component: BidsComponent
    }]}
  ]},
  
  { path: '**', component: PageNotFoundComponent }
 ];
 

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
