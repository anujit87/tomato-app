import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ZomatoService } from 'src/app/zomato.service';


@Component({
  selector: 'app-restaurant-list',
  templateUrl: './restaurant-list.component.html',
  styleUrls: ['./restaurant-list.component.css']
})
export class RestaurantListComponent implements OnInit, OnChanges {

  restaurantList :[] = [];
  @Input() lat;
  @Input() lng;
  @Input() restaurant;
  loading=false;
  message;
  skip:number=0;
  status;

  constructor(private zomatoService:ZomatoService) { }

  ngOnInit() {
    
  }

  ngOnChanges(changes:SimpleChanges){
    console.log(changes)
    this.loading=true;
    this.getPaginatedRestaurants();
    
  }

  getSkip(event){
    //console.log(event)
    this.skip=event;
    this.getPaginatedRestaurants();
  }

  getPaginatedRestaurants=() => {

    if(this.restaurant){
      //console.log(this.restaurant)
      this.zomatoService.getRestaurants({lat:this.lat,lng:this.lng},this.skip,this.restaurant).subscribe(
        (response:any) => {
          console.log(response);
          if(response.status===200){
            if(response.body.results_found>0){
              this.restaurantList = response.body.restaurants;
              this.loading=false;
              this.message=null;
              this.status=null;
            }else{
              this.restaurantList=[]
              this.message='No Results found for the search criteria';
              this.loading=false;
              this.status=404;
            }
          }
          
          //console.log(this.restaurantList)
        }
      )
    }else if(this.lat!=='' && this.lng!==''){
      this.zomatoService.getRestaurants({lat:this.lat,lng:this.lng},this.skip).subscribe(
        (response:any) => {
          console.log(response);
          if(response.status===200){
            if(response.body.results_found>0){
              this.restaurantList = response.body.restaurants;
              //console.log(this.restaurantList)
              this.loading = false;
              this.message = null;
              this.status=null;
            }else{
              this.restaurantList=[];
              this.message='No Results found for the search criteria';
              this.loading=false;
              this.status=404;
            }
          }
          
        },error=>{
          if(error.status===403){
            this.message=error.error.message;
            this.status=403;
          }
        }
      );
    }else if(this.lat===undefined && this.lng===undefined){
      this.message='Please provide permission to access your device location';
      this.loading=false;
      this.restaurantList=[];
    }
  }

}
