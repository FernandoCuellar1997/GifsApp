import { Component } from '@angular/core';
import { GifsService } from '../../gifs/services/gifs.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent {

  constructor(private historial:GifsService){}

  get hist(){
    return this.historial.historial;
  }

  buscar(item:string){
    this.historial.buscarGifs(item);
  }
}
