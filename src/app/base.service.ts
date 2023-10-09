import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Foglalas } from './foglalas';

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  constructor(
    private http: HttpClient
  ) { }

  getAllFoglalas(){
    return this.http.get<any>('http://localhost:3000/foglalasok');
  }

  postFoglalas(foglalas: Foglalas){
return this.http.post<Foglalas>('http://localhost:3000/foglalasok', foglalas);
  }

  updateFoglalas(foglalas: Foglalas, id: number){
    return this.http.patch<Foglalas>('http://localhost:3000/foglalasok/' +id , foglalas);
  }

  deleteFoglalas(id: number){
    return this.http.delete<any>('http://localhost:3000/foglalasok/' +id);
  }
}
