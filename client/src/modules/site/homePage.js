import {inject} from 'aurelia-framework';
import {Router} from "aurelia-router";

@inject(Router)
export class HomePage {
  
  constructor(router){
    this.router = router;
  }

  navigateToPage(page){
    this.router.navigateToRoute(page);
  }
}
