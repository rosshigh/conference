import {inject} from 'aurelia-framework';
import {DataServices} from './dataServices';

@inject(DataServices)
export class DataLayer {
    constructor(data){
        this.data = data;
    }

    async saveTeam(team){
        let response = await this.data.saveObject(team, 'teams', 'post');
        return response;
    }

    async saveContact(contact){
        let response = await this.data.saveObject(contact, 'contacts', 'post');
        return response;
    }

    async saveConferenceRegistration(obj){
        let response = await this.data.saveObject(obj, 'register', 'post');
        return response;
    }

    async sendEmail(obj){
        let response = await this.data.saveObject(obj, 'email', 'post');
        return response;
    }
}