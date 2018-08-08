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
  autoCompleteResults: any[] = [];

  testData: any[] = [
    {
      unique_id:"a25d19cb8d8c370ce14b4da935a8a9dabfef48fa",
      "name":"Karaoke bar BarIn",
      "search_name":"Karaokebar Bar-In, Sankt-Peterburg",
      "short_address":" SanktPeterburg",
      "address":"Rest,Industrial'nyy Prospekt, 40. 1, Sankt-Peterburg, Russia,195279",
      "area":"",
      "city":"SanktPeterburg",
      "country":"Russia",
      "rating":4.1,
      "type":"night_club,bar,restaurant,food,point_of_interest,establishment",
      "bar":"yes",
      "cafe":"no",
      "restaurant":"yes"
    },
    {
      unique_id:"a25d19cb8d8c370ce14b4da935a8a9dabfef48fa",
      "name":"test bar BarIn",
      "search_name":"Test 2",
      "short_address":" SanktPeterburg",
      "address":"Rest,Industrial'nyy Prospekt, 40. 1, Sankt-Peterburg, Russia,195279",
      "area":"",
      "city":"SanktPeterburg",
      "country":"Russia",
      "rating":4.1,
      "type":"night_club,bar,restaurant,food,point_of_interest,establishment",
      "bar":"yes",
      "cafe":"no",
      "restaurant":"no"
    },
    {
      unique_id:"a25d19cb8d8c370ce14b4da935a8a9dabfef48fa",
      "name":"test2 bar BarIn",
      "search_name":"Test 3",
      "short_address":" SanktPeterburg",
      "address":"Rest,Industrial'nyy Prospekt, 40. 1, Sankt-Peterburg, Russia,195279",
      "area":"",
      "city":"SanktPeterburg",
      "country":"Russia",
      "rating":4.1,
      "type":"night_club,bar,restaurant,food,point_of_interest,establishment",
      "bar":"yes",
      "cafe":"yes",
      "restaurant":"yes"
    }];





  ngOnInit() {
    this.restaurantNameInputListener
    .debounceTime(300)
    .distinctUntilChanged()
    .subscribe((data)=> {
      if(data.length >= 3) {
        this.autoCompleteResults = this.testData;

/*        this.dataService.getRestaurants(data).subscribe((response: any)=>{
          console.log(response);
          this.autoCompleteResults = response.data || [];
        }, (error)=>{
          throw error;
        });*/
      }
    });
  }

  onRestaurantNameInputChange(event) {
    event && event.target && this.restaurantNameInputListener.next(event.target.value);
  }

  selectRestaurantNameFromDropdown(index) {
    this.dataService.selectedResult = this.autoCompleteResults[index];
  }

}
