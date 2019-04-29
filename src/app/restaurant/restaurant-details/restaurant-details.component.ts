import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { ZomatoService } from 'src/app/zomato.service';
import { ActivatedRoute } from '@angular/router';
import { google } from 'google-maps';
/// <reference types=”@types/google-maps” />
//declare var google: any;



@Component({
  selector: 'app-restaurant-details',
  templateUrl: './restaurant-details.component.html',
  styleUrls: ['./restaurant-details.component.css']
})
export class RestaurantDetailsComponent implements OnInit {

  restaurantDetails:{location:{latitude,longitude}};
  loading=false;
  message;
  status;

  constructor(private zomatoService : ZomatoService, private route:ActivatedRoute) { }
  
  ngOnInit() {
    this.loading=true;
    const restaurantId=this.route.snapshot.paramMap.get('id');
    this.zomatoService.getRestaurantDetails(restaurantId).subscribe(
      (response:{location:{latitude,longitude},menu_url,name}) => {
          //console.log(response);
          this.restaurantDetails=response;
          this.loading=false;
      },error=>{
        //console.log(error)
        this.message=error.error.message;
        this.loading=false;
        this.status=error.status;
      }
    ) 
  }

}
