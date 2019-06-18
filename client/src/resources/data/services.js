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

     async saveReview(abstract, files){
         console.log('there')
        let response = await this.data.uploadFiles(files, 'abstract/review/' + abstract._id, 'put');
        if(!response.error){
            return uploadResponse;
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

     async getAbstracts(){
        let response = await this.data.get('abstract');
        if(!response.error){
            this.allAbstractArray = response;
        } else {
           this.allAbstractArray = [];
        }
     }

     async getAgenda(){
         let response = await this.data.get('agenda?order=timeSlot');
         if(!response.error){
             this.agendaArray = response;
         } else {
             this.agendaArray = [];
         }
     }

     async getPeople(){
        let response = await this.data.get('people');
        if(!response.error){
            this.peopleArray = response;
        } else {
            this.peopleArray = [];
        }
     }

     async savePerson(person){
         let response = await this.data.saveObject(person, 'people', 'put');
         return response;
     }

     async saveAbstractReviewer(abstract){
        let response = await this.data.saveObject(abstract, 'abstract', 'put');
        return response;
     }

     async getAbstract(id){
        let response = await this.data.get('abstract/' + id);
        if(!response.error){
            return response;
        } else {
           return null;
        }
     }
}
