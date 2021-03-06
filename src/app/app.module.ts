import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSliderModule } from '@angular/material/slider';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HomeComponent } from './home/home.component';
import { PortalComponent } from './portal/portal.component';
import { CreateAuctionComponent } from './portal/create-auction/create-auction.component';
import { DisplayAuctionsComponent } from './portal/display-auctions/display-auctions.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ProductDetailsComponent } from './portal/product-details/product-details.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { ProductComponent } from './portal/product/product.component';
import { NgRedux, NgReduxModule, DevToolsExtension } from '@angular-redux/store';
import { AppState } from './store';
import { NgReduxRouter, NgReduxRouterModule } from '@angular-redux/router';
import { rootReducer } from './store';
import { HttpClientModule } from '@angular/common/http';
import { ProductPipe } from './product.pipe';
import { FlexLayoutModule } from '@angular/flex-layout';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PageNotFoundComponent,
    HomeComponent,
    PortalComponent,
    CreateAuctionComponent,
    DisplayAuctionsComponent,
    ProductDetailsComponent,
    ProductComponent,
    ProductPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    FormsModule,
    FlexLayoutModule,
    NgReduxModule, NgReduxRouterModule.forRoot(),
    MatGridListModule, MatMenuModule, MatIconModule, MatToolbarModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatSnackBarModule,
    MatSliderModule, MatCardModule, MatDividerModule, MatTooltipModule, MatNativeDateModule, MatProgressBarModule, MatDatepickerModule, MatTableModule,
    HttpClientModule
  ],
  providers: [Title],
  bootstrap: [AppComponent]
})
export class AppModule { 
  constructor(private ngRedux: NgRedux<AppState>,
    private devTool: DevToolsExtension,
    private ngReduxRouter: NgReduxRouter,) {
   
      // this.ngRedux.configureStore(
      //   rootReducer,
      //   {},[ devTool.isEnabled() ? devTool.enhancer() : f => f]);

        
    // this.ngRedux.configureStore(rootReducer, {});
    this.ngRedux.configureStore(rootReducer, {}, [],[ devTool.isEnabled() ? devTool.enhancer() : f => f]);
 
      ngReduxRouter.initialize(/* args */);   
  }

}
