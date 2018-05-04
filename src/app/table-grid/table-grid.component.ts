import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Config } from '../app.config';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'



@Component({
  selector: 'app-table-grid',
  templateUrl: './table-grid.component.html',
  styleUrls: ['./table-grid.component.css']
})
export class TableGridComponent implements OnInit {
  public cars =  [
        {"brand": "VW", "startyear": 2012,"endyear": 2014, "color": "Orange", "vin": "dsad231ff"},
        {"brand": "Audi","startyear": 2017,"endyear": 2018, "color": "Black", "vin": "gwregre345"},
        {"brand": "Renault","startyear": 2017,"endyear": 2018, "color": "Gray", "vin": "h354htr"},
      
    ];
    cols: any[];
    StartDate:any;
    EndDate:any;
    filterResults =[];
   

  constructor(private http:HttpClient) {
      
   }

  ngOnInit() {
    this.cols = [
      { field: 'vin', header: 'Vin' },
      { field: 'startyear', header: 'startyear' },
      { field: 'endyear', header: 'endyear' },
      { field: 'brand', header: 'Brand' },
      { field: 'color', header: 'Color' }
  ];
  }

  FetchResults()
  {
    return this.http.get(Config.apiEndpoint+'cars-small.json').map((res)=>{
       return res;
    });
  }
  filterByDate()
  {
    var d = new Date();
          console.log(d);
          let  startDate  = new Date(this.StartDate);
          let  endDate    = new Date(this.EndDate);
          //day = date.getDate();
         // month = date.getMonth() + 1;
          let startYear = startDate.getFullYear();
          let endYear = endDate.getFullYear();;
         console.log(startYear);
         console.log(endYear);

         for(var i = 0; i < this.cars.length; i++)
            {
              if(this.cars[i].startyear == startYear && this.cars[i].endyear == endYear)
              {
                 this.filterResults.push(this.cars[i]); 
              }
            }
            console.log(this.filterResults);

            this.cars = this.filterResults;
  }
  clearFilter()
  {
       this.FetchResults().subscribe((car) =>{
         console.log(car);
         this.cars = car.data; 
       });
  }

}
