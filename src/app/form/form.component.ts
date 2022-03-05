import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  form: FormGroup;
  id: number;
  constructor(
    private httpService: HttpService,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.form = new FormGroup({
      id: new FormControl(),
      countryName: new FormControl(),
      population: new FormControl(),
      flag: new FormControl(),
      countryCapital: new FormControl(),
    });
    this.route.params.subscribe((param) => {
      if (param.id) {
        this.id = param.id;
        this.httpService.getCountry(this.id).subscribe((data) => {
          this.fillForm(data);
        });
      }
    });
  }
  fillForm(data) {
    this.form.patchValue(data);
  }
  onSubmit(): void {
    if (this.id) {
      this.httpService.editCountry(this.form.getRawValue()).subscribe(resp => {
        console.log(resp)
      })
    } else {
      this.httpService.addCountry(this.form.getRawValue()).subscribe((res) => {
        console.log(res);
      });
    }
    this.form.reset()
  }
}