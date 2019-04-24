import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { RestaurantListComponent } from './restaurant/restaurant-list/restaurant-list.component';
import { RestaurantDetailsComponent } from './restaurant/restaurant-details/restaurant-details.component';
import { HttpClientModule } from '@angular/common/http';
import { ZomatoService } from './zomato.service';
import { NoSanitizePipe } from './no-sanitize.pipe';
import { MapComponent } from './map/map/map.component';
import { ReviewComponent } from './restaurant/review/review.component';
import { PaginationComponent } from './pagination/pagination.component';
import { ErrorComponent } from './error/error.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RestaurantListComponent,
    RestaurantDetailsComponent,
    NoSanitizePipe,
    MapComponent,
    ReviewComponent,
    PaginationComponent,
    ErrorComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', redirectTo: 'home', pathMatch:'full'},
      { path: 'home', component:HomeComponent},
      { path: 'home/:city', component:HomeComponent },
      { path: 'home/:city/restaurant/:id', component: RestaurantDetailsComponent},
      { path: '*', component:HomeComponent},
      { path: '**', component:HomeComponent}
    ])
  ],
  providers: [ZomatoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
