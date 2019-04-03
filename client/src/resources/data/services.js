import {inject} from 'aurelia-framework';
import {DataServices} from './dataServices';

@inject(DataServices)
export class Services {
    constructor(data){
        this.data = data;
    }

    async saveRegister(object){
        let response = await this.data.saveObject(object,'people','post');
        if(!response.error){
            return response;
        } else {
            return null;
        }
    }

    async saveAbstract(abstract, files){
        let response = await this.data.saveObject(abstract, 'abstract', 'post');
        if(!response.error){
            let uploadResponse = await this.uploadFile(files, response._id);
            return uploadResponse;
        }
    }

    async uploadFile(files, id){
        let response = await this.data.uploadFiles(files, 'abstract/upload/' + id);
        if(!response.error){
             return response;
        }
     }

     async getPersonAbstracts(id){
         let response = await this.data.get('abstract/person/' + id);
         if(!response.error){
             this.abstractArray = response;
         } else {
            this.abstractArray = [];
         }

     }

     async getAgenda(){
         let response = await this.data.get('agenda');
         if(!response.error){
             this.agendaArray = response;
         } else {
             this.agendaArray = [];
         }
     }
}