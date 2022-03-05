import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  arrayOfFlags = [{name: 'Poland', value: "../../assets/poland.png"}, {name: 'Germany', value: '../../assets/germany.png'}, {name: 'Bhutan', value: '../../assets/bhutanFlag.png'}, {name: 'Nepal', value: '../../assets/nepalFlag.png'}, {name: 'China', value: '../../assets/chinaFlag.png'}, {name: 'India', value: '../../assets/indiaFlag.png'}]
  form: FormGroup;
  id: number;
  constructor(
    private httpService: HttpService,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.form = new FormGroup({
      id: new FormControl(),
      countryName: new FormControl(null,Validators.required),
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