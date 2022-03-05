import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class HttpService {
  [x: string]: any;

  constructor(private http: HttpClient) { }
 
getCountries(): Observable<any>{
  return this.http.get('http://localhost:8080/countries')
}  
addCountry(data): Observable<any>{
  return this.http.post('http://localhost:8080/countries', data)
}
getCountry(id: number): Observable<any> {
  return this.http.get(`http://localhost:8080/country/${id}`);
}
editCountry(data): Observable<any> {
  return this.http.put('http://localhost:8080/countries', data)
}
removeCountry(id: number): Observable<any>{
  return this.http.delete(`http://localhost:8080/country/${id}`);
}

}
