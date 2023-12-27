import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, Query } from '@angular/core';
import { SearchGifsResponse, Images, Gif } from '../Intefaces/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {
  private apiKey:string='VlZrBj9YkXgie7fnW5uPrkddOw6ZUbgX';
  private servicioUrl:string='https://api.giphy.com/v1/gifs';
  private _historial:string[]=[];
  public resultados:Gif[]=[];

  get historial(){
    
    return [...this._historial];
  }

  constructor(private client:HttpClient){
    this._historial=JSON.parse(localStorage.getItem('historial')!) || [];
    this.resultados=JSON.parse(localStorage.getItem('resultados')!) || [];
  }
    

  buscarGifs(query:string=''){
    query=query.trim().toLowerCase();
    if(query.trim().length===0){ }
    if(!this._historial.includes(query)){
      this._historial.unshift(query);
      this._historial=this._historial.splice(0,10);
      localStorage.setItem('historial',JSON.stringify(this._historial));
    }
    const params=new HttpParams().set('api_key',this.apiKey)
                                  .set('limit','10')
                                  .set('q',query);
    this.client.get<SearchGifsResponse>(`${this.servicioUrl}/search`,{params})
                .subscribe((resp=>{
                  this.resultados=resp.data;
                  localStorage.setItem('resultados',JSON.stringify(this.resultados));
                }));
  }
}
