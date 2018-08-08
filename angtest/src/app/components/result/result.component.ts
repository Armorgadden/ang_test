import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.less']
})
export class ResultComponent implements OnInit {

  constructor(public dataService: DataService) { }

  ngOnInit() {
  }

  getTypeData() {
    let type = [];
    this.dataService.selectedResult.cafe === 'yes' && type.push('Cafe ');
    this.dataService.selectedResult.bar === 'yes' && type.push('Bar ');
    this.dataService.selectedResult.restaurant === 'yes' && type.push('Restaurant ');
    return type.toString();
  }

}
