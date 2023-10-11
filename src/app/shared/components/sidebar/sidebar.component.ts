import { Component } from '@angular/core';
import { GifsService } from '../../../gifs/services/gifs.service';

@Component({
  selector: 'shared-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  constructor( private gifsService:GifsService ){}

  get tags ():string[]{
    return this.gifsService.tagsHistory;
  }

  // MÉTODO HECHO para la accion click (en el html):
  //Este método se encarga de volver a los gifs cuando se le hace click a los tag buscados del sidebar
  searchTag( tag:string ):void {
    this.gifsService.searchTag(tag);
  }
}
