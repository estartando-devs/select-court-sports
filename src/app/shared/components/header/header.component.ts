import { Component, OnInit } from '@angular/core';
import { MenuService } from './menu/menu.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(public menuService: MenuService) { }

  toggleMenu(){
    this.menuService.toggleMenu()
  }
  
  ngOnInit() {
  }

}
