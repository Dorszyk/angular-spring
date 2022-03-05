import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
countries: Array<any> = [];
  constructor(private httpService: HttpService) { }

  ngOnInit(): void {
    this.getCountries();
  }

  removeCountry(id:number){
    this.httpService.removeCountry(id).subscribe(()=> {
        this.getCountries();
    })
  }

  getCountries(): void{
    this.httpService.getCountries().subscribe((data: Array<any>) => {
      this.countries = data;
    })
  }
}