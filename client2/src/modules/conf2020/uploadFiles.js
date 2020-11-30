import { inject } from 'aurelia-framework';
import { Services } from '../../resources/data/services';
import * as toastr from "toastr";

@inject(Services)
export class UploadFiles {

  constructor(services) {
    this.services = services;
    this.filesToUpload = new Array();
  }

  async uploadFile() {
    if (this.category && this.title) {
      let response = await this.services.saveFile(this.category, this.title, this.filesToUpload);
      if (!response.error) {
        toastr['success']('The file was uploaded successfully.');
        this.filesToUpload = new Array();
        this.files = new Array();
      }
    }
  }

  // async submit() {
  //   if (this.validation.validate(1)) {
  //       let abstract = {
  //           title: this.title,
  //           description: this.description,
  //           personId: this.userObj._id,
  //           track: this.track
  //       }
  //       let response = await this.services.saveAbstract(abstract, this.filesToUpload);
  //       if (!response.error) {
  //           toastr['success']('The abstract was uploaded successfully.');
  //           this.getPersonAbstracts();
  //           this.title = "";
  //           this.description = "";
  //           this.track = "";
  //           this.filesToUpload = new Array();
  //           this.files = new Array();
  //       }
  //   }
  // }

  changeFiles() {
    this.filesToUpload = new Array();
    this.filesToUpload.push(this.files[0]);
  }

}
