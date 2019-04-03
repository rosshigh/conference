import { inject } from 'aurelia-framework';
import { Services } from '../../resources/data/services';

@inject(Services)
export class Agenda {

    constructor(services){
        this.services = services;
        this.sundayArray = [];
        this.mondayArray = [];
    }

    async activate(){
        await this.services.getAgenda();
        this.services.agendaArray.forEach(item => {
            if(item.agendaDate.indexOf('Sunday') > -1){
                if(this.sundayFirstItem){
                    this.sundayArray.push(item);
                } else {
                    this.sundayFirstItem = item;
                }
            } else {
                if(this.mondayFirstItem){
                    this.mondayArray.push(item);
                } else {
                    this.mondayFirstItem = item;
                }
            }
        });
        this.sundayRowSpan = this.sundayArray.length + 1;
        this.mondayRowSpan = this.mondayArray.length + 1;
    }
    
}