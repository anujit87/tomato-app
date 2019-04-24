import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ZomatoService } from '../zomato.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  searchLocation:string;
  searchRestaurant:string;
  locationDetails:{lat,lng};
  cityData:{city_id};
  message:string;
  status;
  //@Output() location=new EventEmitter<{}>();

  constructor(private zomatoService:ZomatoService, private route:ActivatedRoute, private router:Router) { 
    router.routeReuseStrategy.shouldReuseRoute=()=>false
    }

  ngOnInit() {
    let city=this.route.snapshot.paramMap.get('city');
    console.log(city);
    
    if(city){
      this.searchLocation=city;
      this.searchZomatoLocation();
      console.log(this.locationDetails)
    }else{
      this.getLocation();
    }
    
    //this.location.emit(this.locationDetails);
  }

  getLocation= () =>{
    if(navigator.geolocation){
      this.message='';
      console.log(this.message)
      this.searchLocation=''
      navigator.geolocation.getCurrentPosition((position)=>{
        console.log(position.coords.latitude,position.coords.longitude);
        const latlng={lat:position.coords.latitude,lng:position.coords.longitude};
        //this.location.emit(latlng);
        
        this.locationDetails=latlng
        this.zomatoService.getCity(latlng).subscribe(
          (response:{location_suggestions:[{name}]})=>{
            console.log(response);
            this.status=null;
            //city=response.location_suggestions[0].name;
            this.searchLocation=response.location_suggestions[0].name;
            this.router.navigate(['/home',response.location_suggestions[0].name]);
          },error=>{
            if(error.status===403){
              this.message=error.error.message;
              this.status=403
            }
          }
        )
      },(error)=>{
          if(error.code === error.PERMISSION_DENIED){
            this.message='Please provide permission to access your device location';
            this.router.navigate(['/home'])
          }
      })
    }else{
      
    }
    
  }

  searchZomatoLocation = () => {
    if(this.searchLocation){
      this.message='';
      this.zomatoService.getLocationDetails(this.searchLocation).subscribe(
        (response:{location_suggestions:[{latitude,longitude,city_id,city_name}]}) => {
          if(response.location_suggestions.length>0){
            this.cityData = response.location_suggestions[0]
            this.locationDetails = {
              lat: response.location_suggestions[0].latitude,
              lng: response.location_suggestions[0].longitude
            }
            this.status=null;
            this.router.navigate(['/home', response.location_suggestions[0].city_name]);
          }else{
            this.message='Unable to find the city you are looking for';
            this.status=404
          }
          
        },error=>{
          if(error.status===403){
            this.message=error.error.message;
            this.status=403;
          }
        }
      )
    }else{
      this.getLocation()
    }
  }



}
