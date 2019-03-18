import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { MatDividerModule, MatCardModule, MatSnackBarModule, MatButtonModule, MatToolbarModule, MatIconModule, MatMenuModule, MatGridListModule } from '@angular/material';
import { RegisterComponent } from './register/register.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HomeComponent } from './home/home.component';
import { MikkelComponent } from './mikkel/mikkel.component';
import { NikeComponent } from './nike/nike.component';
import { PortalComponent } from './portal/portal.component';
import { CreateAuctionComponent } from './portal/create-auction/create-auction.component';
import { DisplayAuctionsComponent } from './portal/display-auctions/display-auctions.component';
import { AdminComponent } from './admin/admin.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    PageNotFoundComponent,
    HomeComponent,
    MikkelComponent,
    NikeComponent,
    PortalComponent,
    CreateAuctionComponent,
    DisplayAuctionsComponent,
    AdminComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatGridListModule, MatMenuModule, MatIconModule, MatToolbarModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatSnackBarModule, MatCardModule, MatDividerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
