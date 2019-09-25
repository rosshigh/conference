import { inject } from 'aurelia-framework';
import { Services } from '../../resources/data/services';

@inject(Services)
export class Files {
  constructor(services) {
    this.services = services;
    this.files = [];
    this.categories = [];
  }

  async activate(){
    await this.services.getFiles();
    this.sortFiles();
  }

  sortFiles(){
    this.categories.push({
      files: [],
      category: this.services.filesArray[0].category
    })
    this.services.filesArray.forEach(item => {
      if(item.category !== this.categories[this.categories.length-1].category){
        this.categories.push({
          files: [],
          category: item.category
        })
      }
      this.categories[this.categories.length-1].files.push(item);
    });
  }
}
