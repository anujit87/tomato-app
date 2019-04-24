import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {

  currentPage=1;
  pageSize=10;
  pages=[1,2,3,4,5,6,7,8,9,10];
  @Output() skip = new EventEmitter<number>();
  constructor() { }

  ngOnInit() {
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
