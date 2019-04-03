import { inject } from 'aurelia-framework';
import Validation from '../../resources/utils/validation';
import { Services } from '../../resources/data/services';
import { Router } from "aurelia-router";
import { Auth } from '../../resources/data/auth';
import $ from 'jquery';
import * as toastr from "toastr";

@inject(Validation, Services, Router, Auth)
export class Submit {
    constructor(validation, services, router, auth) {
        this.validation = validation;
        this.services = services;
        this.router = router;
        this.auth = auth;
        this.validation.initialize(this);
        toastr.options.extendedTimeOut = "1000";
        toastr.options.timeOut = "1500";
        this.userObj = JSON.parse(sessionStorage.getItem('user'));
        this.filesToUpload = new Array();
        this._setupValidation();

        this.tracks = [
            "Innovations in Teaching", "High Impact Practices","Incorporating Latest Developments in Curriculum","Research in Teaching"
        ];
    }

    _setupValidation() {
        this.validation.addRule(1, "title", [{ "rule": "required", "message": "Title is required", "value": "title" }]);
        this.validation.addRule(1, "description", [{ "rule": "required", "message": "Description is required", "value": "description" }]);
        this.validation.addRule(1, "track", [{
            "rule": "custom", "message": "Track is required",
            "valFunction": function (context) {
                return (context.track != "");
            }
        }], true);
        this.validation.addRule(1, "files", [{
            "rule": "custom", "message": "You must select a file",
            "valFunction": function (context) {
                return (context.filesToUpload.length > 0);
            }
        }], true);
        this.validation.addRule(2,"firstName",[{"rule":"required","message":"First Name is required", "value": "firstName"}]);
        this.validation.addRule(2,"lastName",[{"rule":"required","message":"Last Name is required", "value": "lastName"}]);
        this.validation.addRule(2,"email",[
          {"rule":"required","message":"Email is required", "value": "email"},
          {"rule":"custom","message":"Enter a valid email address",
            "valFunction":function(context){
                return (context.email.indexOf('@') > -1);
            }
          }]);
        this.validation.addRule(2,"university",[
          {"rule":"required","message":"Institution is required", "value": "university"},
         ]);
        this.validation.addRule(2,"password",[{"rule":"required","message":"Password is required", "value": "password"}]);
        this.validation.addRule(2,"password_repeat",[{"rule":"custom","message":"Passwords must match",
          "valFunction":function(context){
            return (context.password === context.password_repeat);
          }}], true);
    }

    showRegister(){
        this.showRegisterPanel = !this.showRegisterPanel;
    }

    async save(){
        if(this.validation.validate(2)){
            let person = {
                firstName: this.firstName,
                lastName: this.lastName,
                email: this.email,
                university: this.university,
                password: this.password
            }
            let response = await this.services.saveRegister(person);
            if(response){
                sessionStorage.setItem('user',JSON.stringify(response))
                this.loginSuccess();
                this.isAuthenticated = true;
                this.showRegisterPanel = false;
                toastr['success']('Your registration was saved.');
            } else {
                toastr['error']('There was an error saving the registration.');
            }
        }
    }

    async submit() {
        if (this.validation.validate(1)) {
            let abstract = {
                title: this.title,
                description: this.description,
                personId: this.userObj._id,
                track: this.track
            }
            let response = await this.services.saveAbstract(abstract, this.filesToUpload);
            if (!response.error) {
                toastr['success']('The abstract was uploaded successfully.');
                this.getPersonAbstracts();
                this.title = "";
                this.description = "";
                this.track = "";
                this.filesToUpload = new Array();
                this.files = new Array();
            }
        }
    }

    changeFiles() {
        this.filesToUpload = new Array();
        this.filesToUpload.push(this.files[0]);
    }

    async login() {
        let response = await this.auth.login(this.email, this.password)
        if (!response.error) {
            this.loginError = "";
            this.loginSuccess();
            this.isAuthenticated = this.auth.isAuthenticated();
        } else {
            this.loginError = "Invalid credentials.";
        }
    }

    async loginSuccess() {
        this.userObj = JSON.parse(sessionStorage.getItem('user'));
        if (this.userObj) {
            sessionStorage.setItem('role', this.userObj.role);
            this.getPersonAbstracts();
        }

    }

    async getPersonAbstracts(){
        await this.services.getPersonAbstracts(this.userObj._id);
    }
}