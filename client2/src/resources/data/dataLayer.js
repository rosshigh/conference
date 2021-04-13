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
}