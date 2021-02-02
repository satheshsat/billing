import { Component, OnInit } from '@angular/core';
import { BillsService } from '../service';

@Component({
  selector: 'app-bills',
  templateUrl: './bills.page.html',
  styleUrls: ['./bills.page.scss'],
})
export class BillsPage implements OnInit {

  bills = [];
  constructor(
    private billsService: BillsService
  ) { 
    this.loadBills();
  }

  loadBills(){
    this.billsService.list({}).then((res)=>{
      this.bills = res;
    });
  }

  ngOnInit() {
  }

  getDate(date){
    return new Date(new Date(date).getTime() + (330*60*1000)).toISOString().slice(0,-5).replace('T',' ');
  }

}
