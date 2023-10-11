import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './pages/home/home-page.component';
import { SidebarComponent } from '../shared/components/sidebar/sidebar.component';
import { SearchBoxComponent } from './components/search-box/search-box.component';
import { CardListComponent } from './components/list/card-list.component';



@NgModule({
  declarations: [
    HomePageComponent,
    SearchBoxComponent,
    CardListComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    HomePageComponent,

  ]
})
export class GifsModule { }
