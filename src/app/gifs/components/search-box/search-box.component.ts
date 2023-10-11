import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../../services/gifs.service';

/*Al ser un componente pequeño dentro de la home-page
directamente no se exporta y se hace en el decorador
@Component (en template: ` `).Con el selector llega a
home-page.html*/

/*txtTagInput es una referencia local. Una manera de que el "click" del (keyup)
 tenga nombre y quede registador con un valor*/
@Component({
  selector: 'gifs-search-box',
  template:
  `<h5>Buscar: </h5>
  <input type="text" class="form-control" placeholder="Buscar gifs..."
  (keyup.enter)="searchTag()"
  #txtTagInput
  >
  `

})
export class SearchBoxComponent {

  //ViewChilde nos sirve para tomar referencias locales
   @ViewChild('txtTagInput')
   tagInput!:ElementRef<HTMLInputElement>

    constructor(private GifsService: GifsService){  //al ser private tenemos que colocar en el
                                                    //constructor el private GifsService y su tipo para que este se pueda visualizar

    }

   // searchTag(newTag:string){
    searchTag( ){
      const newTag=this.tagInput.nativeElement.value;
      this.GifsService.searchTag(newTag);  //llamando al método de gifsService
      this.tagInput.nativeElement.value=''; //para que se limpie la caja de texto
    }
}
