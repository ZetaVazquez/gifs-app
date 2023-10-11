import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchResponse } from '../interfaces/gifs.interfaces';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  public gifList:Gif[]=[];
  private apiKey: string='6V007C9d6nf7WMwFTo1IqbUL0LBqlIlt'; //Para os gifs
  private serviceURL:string=`https://api.giphy.com/v1/gifs/`;
  private _tagsHistory: string[] = []; //creción del array donde se guardan las búsquedas

  constructor( private http:HttpClient) {
    this.loadLocalStorage();   //Para que se mantenga el historial
    console.log('Gifs Service Ready');
   }
  ////////////////////////////////////////
  get tagsHistory() {
    return [...this._tagsHistory];



  }

  /////////////////////////////////////////
  private organizeHistory(tag: string) {

    tag = tag.toLowerCase();

    if(this._tagsHistory.includes(tag)){
      this._tagsHistory.filter((oldTag)=>oldTag !==tag) //con esto se borra el tag mas viejo escrito

    }

    this._tagsHistory.unshift(tag);//Añado tag nuevo a la primera posicion
    this._tagsHistory=this._tagsHistory.slice(0,10); // Limita el historial a 10 posiciones
  }


  ////////////////////////////////////////////////
  public searchTag(tag: string): void {

    if (tag.length === 0) return;
    this.organizeHistory(tag);


    //FORMA DE HACER PETICIONES HTTP
   /*fetch('https://api.giphy.com/v1/gifs/search?api_key=6V007C9d6nf7WMwFTo1IqbUL0LBqlIlt&q=meme&limit=20')
    .then(resp=>resp.json())
    .then(data=>console.log(data));*/

    // "?api_key=6V007C9d6nf7WMwFTo1IqbUL0LBqlIlt&q=meme&limit=20" es igual a:
    const params = new HttpParams()
    .set('api_key',this.apiKey)
    .set('limit','20')
    .set('q',tag);

    this.http.get<SearchResponse>(`${this.serviceURL}search`,{params})
    .subscribe(resp=>{
      this.gifList=resp.data;


    })
  }

  ///////////////////////////////////////////////

  //Para recordar mi historial en Local Storage incluso cuando este se recargue
  private saveLocalStorage():void{
    localStorage.setItem('history',JSON.stringify(this._tagsHistory));


  }

  private loadLocalStorage():void{
    if(!localStorage.getItem('history')){ return;} //Si no tenemos data no regreso nada
    this._tagsHistory=JSON.parse(localStorage.getItem('history')!)//Siempre vendrá una data. Se lo indicamos con "!"
    if (this._tagsHistory.length>0){ return;}
    this.searchTag(this._tagsHistory[0]);

  }
}
