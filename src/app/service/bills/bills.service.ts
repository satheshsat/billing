import { Injectable } from '@angular/core';
import { SqlService } from '../sql/sql.service';
import { AlertService } from '../alert/alert.service';

@Injectable({
  providedIn: 'root'
})
export class BillsService {
  database: any;
  data: any;

  constructor(
    private sqlService: SqlService,
    private alert: AlertService
  ) { 
    this.database = this.sqlService.getDB();
  }

  async list( args ){
    args.limit = 10;
    args.offset = 0;
    args.date = {};
    let query = this.sqlService.buildSelectQuery('bills',args);
    
    let result = await this.database.executeSql(query);
    return await result.rows;
  }

  async save(bill){
    let loader = this.alert.createLoader({
      message: 'Please wait...',
      duration: 2000
    });
    let query = this.sqlService.buildInsertQuery('bills', bill.customer);
    let result = await this.database.executeSql(query);
    if(!result.insertId){
      (await loader).dismiss();
      this.alert.createToast({
        position: 'top',
        message: 'Cant insert data, please try again',
        duration: 2000
      });
      return false;
    }

    let bill_id = result.insertId;
    let queries = [];
    for( let item of bill.item){
      item.type = 'item';
      item.bill_id = bill_id;
      queries.push(this.sqlService.buildInsertQuery('bill_items', item));
    }
    for( let tax of bill.tax){
      tax.type = 'tax';
      tax.bill_id = bill_id;
      queries.push(this.sqlService.buildInsertQuery('bill_items', tax));
    }
    for( let discount of bill.discount){
      discount.type = 'discount';
      discount.bill_id = bill_id;
      queries.push(this.sqlService.buildInsertQuery('bill_items', discount));
    }
    result = await this.database.sqlBatch(queries);
    (await loader).dismiss();
    this.alert.createToast({
      position: 'top',
      message: 'Insert Bill Success',
      duration: 2000
    });
    return result;
  }
  
}
