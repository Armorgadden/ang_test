import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.less']
})
export class FormComponent implements OnInit {

  constructor(public dataService: DataService) { }

  restaurantNameInputListener: Subject<any> = new Subject<any>();

  ngOnInit() {
    this.restaurantNameInputListener
    .debounceTime(300)
    .distinctUntilChanged()
    .subscribe((data)=> {
      if(data.length >= 3) {
        this.dataService.getRestaurants(data).subscribe((response: any)=>{
          console.log(response);
        }, (error)=>{
          throw error;
        });
      }
    });
  }

  onRestaurantNameInputChange(event) {
    event && this.restaurantNameInputListener.next(event.data);
  }

}
