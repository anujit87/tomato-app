import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {

  currentPage=1;
  pageSize=10;
  pages=[1,2,3,4,5,6,7,8,9,10];
  @Input() total;
  @Output() skip = new EventEmitter<number>();
  constructor() { }

  ngOnInit() {
    if(this.total<100){
      //console.log(this.total)
      const noOfPages=Math.ceil(this.total/10);
      this.pages=Array.from(Array(noOfPages),(x,i)=>i+1);
    }
  }

  setPage(page:number){
    this.currentPage=page
    this.skip.emit((this.currentPage-1)*10);
    
  }
  setNextPage(){
    if(this.currentPage<10){
      this.currentPage=this.currentPage+1;
      this.skip.emit((this.currentPage-1)*10);
    }
    
  }
  setPrevPage(){
    if(this.currentPage>1){
      this.currentPage=this.currentPage-1; 
      this.skip.emit((this.currentPage-1)*10)
    }
    
  }

}
