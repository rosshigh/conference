import {inject} from 'aurelia-framework';
import Validation from '../../resources/utils/validation';
import {Services} from '../../resources/data/services';
import {Router} from "aurelia-router";
import $ from 'jquery';
import * as toastr from "toastr";

@inject(Validation, Services, Router)
export class Register {

    constructor(validation, services, router){
        this.validation = validation;
        this.services = services;
        this.router = router;
        this.validation.initialize(this);
        toastr.options.extendedTimeOut = "1000";
        toastr.options.timeOut = "1500";
    }

    activate(){
        this._setupValidation();
    }

    _setupValidation(){
        this.validation.addRule(1,"firstName",[{"rule":"required","message":"First Name is required", "value": "firstName"}]);
        this.validation.addRule(1,"lastName",[{"rule":"required","message":"Last Name is required", "value": "lastName"}]);
        this.validation.addRule(1,"email",[
          {"rule":"required","message":"Email is required", "value": "email"},
          {"rule":"custom","message":"Enter a valid email address",
            "valFunction":function(context){
                return (context.email.indexOf('@') > -1);
            }
          }]);
        this.validation.addRule(1,"university",[
          {"rule":"required","message":"Institution is required", "value": "university"},
         ]);
        this.validation.addRule(1,"password",[{"rule":"required","message":"Password is required", "value": "password"}]);
        this.validation.addRule(1,"password_repeat",[{"rule":"custom","message":"Passwords must match",
          "valFunction":function(context){
            return (context.password === context.password_repeat);
          }}], true);
    }

    async save(){
        if(this.validation.validate(1)){
            let person = {
                firstName: this.firstName,
                lastName: this.lastName,
                email: this.email,
                university: this.university,
                password: this.password
            }
            let response = await this.services.saveRegister(person);
            if(response){
                toastr['success']('Your registration was saved.');
                this.router.navigate("home");
            } else {
                toastr['error']('There was an error saving the registration.');
            }
        }
    }
}