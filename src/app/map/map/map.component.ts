import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  @ViewChild('gmap') gMapElement:ElementRef;
  map:any;
  @Input() lat;
  @Input() lng;
  @Input() name;

  constructor() { }

  ngOnInit() {
    const addrLatLng = new google.maps.LatLng(this.lat, this.lng);
          const mapProps = {
            center: addrLatLng,
            zoom: 15,
            mapTypeId: google.maps.MapTypeId.ROADMAP
          };
          this.map = new google.maps.Map(this.gMapElement.nativeElement, mapProps);
          const marker=new google.maps.Marker({
            position:addrLatLng,
            title:this.name
          })
          marker.setMap(this.map);
  }

}
