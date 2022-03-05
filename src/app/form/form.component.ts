import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  [x: string]: any;
form: FormGroup;

  constructor(private httpService: HttpService) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      id: new FormControl(),
      countryName: new FormControl(),
      population: new FormControl(),
      flag: new FormControl(),
      countryCapital: new FormControl()
    })
  }
  onSubmit(): void {
    console.log(this.form.value)
  this.httpService.addCountry(this.form.getRawValue()).subscribe( res => {
  console.log(res)
  })
  }
  
}
