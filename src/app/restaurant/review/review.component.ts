import { Component, OnInit } from '@angular/core';
import { ZomatoService } from 'src/app/zomato.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {

  reviews:[];
  loading=false;

  constructor(private zomatoService:ZomatoService, private route:ActivatedRoute) { }

  ngOnInit() {
    this.loading=true;
    const restaurantId = this.route.snapshot.paramMap.get('id');
    this.zomatoService.getRestaurantReviews(restaurantId).subscribe(
      (response:{user_reviews}) => {
        console.log(response);
        this.reviews=response.user_reviews
        this.loading=false
      }
    )
  }

}
