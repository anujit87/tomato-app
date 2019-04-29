import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ZomatoService {

  authKey = 'b0a3fc142a52ddc44acfabe86c044264';


  constructor(private http: HttpClient) { }

  private handleError=(err:HttpErrorResponse)=>{
    console.log(err.message);
    return Observable.throw(err.message)
  }

  getRestaurants = (location:{lat,lng},skip:number,restaurant?:string) => {
    let url = 'https://developers.zomato.com/api/v2.1/search?lat='+location.lat+'&lon='+location.lng+'&start='+skip+'&count=10';
    if(restaurant){
      url= url+'&q='+restaurant
    }
    const options = new HttpHeaders({
      "user-key" : this.authKey
    });
    return this.http.get(url,{headers:options,observe:'response'});
  }

  getRestaurantDetails = (restaurantId) => {
    const url = 'https://developers.zomato.com/api/v2.1/restaurant?res_id='+restaurantId;
    const options = new HttpHeaders({
      "user-key" : this.authKey
    });
    return this.http.get(url,{headers:options});
  }

  getRestaurantReviews = (restaurantId) => {
    const url = 'https://developers.zomato.com/api/v2.1/reviews?res_id='+restaurantId;
    const options = new HttpHeaders({
      "user-key" : this.authKey
    });
    return this.http.get(url,{headers:options});
  }

  getLocationDetails = (location) => {
    const url = 'https://developers.zomato.com/api/v2.1/locations?query='+location;
    const options = new HttpHeaders({
      "user-key" : this.authKey
    });
    return this.http.get(url,{headers:options});
  }

   getCity = (location:{lat,lng}) => {
     const url = 'https://developers.zomato.com/api/v2.1/cities?lat='+location.lat+'&lon='+location.lng;
     const options = new HttpHeaders({
      "user-key" : this.authKey
    });
    return this.http.get(url,{headers:options});
   }
  
}
