import {inject} from 'aurelia-framework';
import {DataServices} from './dataServices';

@inject(DataServices)
export class ERPSIMTEAMS {
    constructor(data){
        this.data = data;
    }

    async saveTeam(team){
        let response = await this.data.saveObject(team, 'teams', 'post');
        return response;
    }
}