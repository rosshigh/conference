import { inject } from 'aurelia-framework';
import Validation from '../../resources/utils/validation';
import { Services } from '../../resources/data/services';
import { Router } from "aurelia-router";
import { Auth } from '../../resources/data/auth';
import { DataTable } from '../../resources/utils/dataTable';
import $ from 'jquery';
import * as toastr from "toastr";

@inject(Validation, Services, Router, Auth, DataTable)
export class Submit {
    constructor(validation, services, router, auth, dataTable) {
        this.validation = validation;
        this.services = services;
        this.router = router;
        this.auth = auth;
        this.dataTable = dataTable;
        this.dataTable.initialize(this);
        this.validation.initialize(this);
        toastr.options.extendedTimeOut = "1000";
        toastr.options.timeOut = "1500";
        this.userObj = JSON.parse(sessionStorage.getItem('user'));
        this.filesToUpload = new Array();
        this._setupValidation();
        this.showTable = true;

        this.tracks = [
            "Innovations in Teaching", "High Impact Practices", "Incorporating Latest Developments in Curriculum", "Research in Teaching"
        ];
        this.status = [
            'Submitted', 'Under Review', 'Accepted', 'Rejected'
        ];

        
    }

    activate(){
        if(sessionStorage.getItem('user')) this.loginSuccess();
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
        this.validation.addRule(2, "firstName", [{ "rule": "required", "message": "First Name is required", "value": "firstName" }]);
        this.validation.addRule(2, "lastName", [{ "rule": "required", "message": "Last Name is required", "value": "lastName" }]);
        this.validation.addRule(2, "email", [
            { "rule": "required", "message": "Email is required", "value": "email" },
            {
                "rule": "custom", "message": "Enter a valid email address",
                "valFunction": function (context) {
                    return (context.email.indexOf('@') > -1);
                }
            }]);
        this.validation.addRule(2, "university", [
            { "rule": "required", "message": "Institution is required", "value": "university" },
        ]);
        this.validation.addRule(2, "password", [{ "rule": "required", "message": "Password is required", "value": "password" }]);
        this.validation.addRule(2, "password_repeat", [{
            "rule": "custom", "message": "Passwords must match",
            "valFunction": function (context) {
                return (context.password === context.password_repeat);
            }
        }], true);
    }

    showRegister() {
        this.showRegisterPanel = !this.showRegisterPanel;
    }

    async save() {
        if (this.validation.validate(2)) {
            let person = {
                firstName: this.firstName,
                lastName: this.lastName,
                email: this.email,
                university: this.university,
                password: this.password
            }
            let response = await this.services.saveRegister(person);
            if (response) {
                sessionStorage.setItem('user', JSON.stringify(response))
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
        } else {
            this.loginError = "Invalid credentials. Contact ucc@uwm.edu to have your password reset.";
        }
    }

    async refresh(){
        await this.services.getAbstracts();
        await this.services.getPeople();
    }

    async loginSuccess() {
        this.isAuthenticated = this.auth.isAuthenticated();
        this.userObj = JSON.parse(sessionStorage.getItem('user'));
        if (this.userObj) {
            this.adminRole = this.userObj.role.indexOf('admin') > -1;
            sessionStorage.setItem('role', this.userObj.role);
            if (this.adminRole) {
                await this.services.getAbstracts();
                await this.services.getPeople();
                this.dataTable.updateArray(this.services.allAbstractArray);
            }
            this.getPersonAbstracts();
        }

    }

    async getPersonAbstracts() {
        await this.services.getPersonAbstracts(this.userObj._id);
    }

    async addReviewer(person) {
        person.role = person.role + ':reviewer'
        let response = await this.services.savePerson(person);
        if (response) {
            toastr['success']('Your registration was saved.');
            await this.services.getPeople();
        } else {
            toastr['error']('There was an error saving the registration.');
        }
    }

    async removeReviewer(person) {
        person.role = person.role.split(':reviewer').join();
        let response = await this.services.savePerson(person);
        if (response) {
            toastr['success']('Your registration was saved.');
            await this.services.getPeople();
        } else {
            toastr['error']('There was an error saving the registration.');
        }
    }

    async edit(abstract) {
        this.abstract = await this.services.getAbstract(abstract._id);
        this.showTable = false;
    }

    async addReviewerToAbstract(person) {
        if (this.abstract.reviewers.indexOf(person._id) === -1) {
            this.abstract.reviewers.push(person._id);
            if(this.abstract.reviewers.length > 0) this.abstract.status = "Under Review";
            let response = await this.services.saveAbstractReviewer(this.abstract);
            this.abstract = response[0];
            if (person.abstracts.indexOf(this.abstract._id === -1)) {
                person.abstracts.push(this.abstract._id);
                await this.services.savePerson(person);
            }
        }
        await this.refresh();
    }

    async removeReviewerFromAbstract(person) {
        var filteredReviewers = this.abstract.reviewers.filter(function (value, index, arr) {
            return value._id != person._id;
        });
        this.abstract.reviewers = filteredReviewers;
        if(this.abstract.reviewers.length === 0) this.abstract.status = "Submitted";
        let responseOne = await this.services.saveAbstractReviewer(this.abstract);
        this.abstract = responseOne[0];
        var filteredAbstracts = person.abstracts.filter(function (value, index, arr) {
            return value._id != this.abstract._id;
        });
        person.abstracts = filteredAbstracts;
        await this.services.savePerson(person);
        this.refresh();
    }

    saveEditAbstract() {
        this.services.saveAbstractReviewer(this.abstract);
        this.showTable = true;
    }

    cancelEdit() {
        this.showTable = true;
    }

    downloadInstExcel(){
        let csvContent = "data:text/csv;charset=utf-8;,Faculty,Email,Title,Status\r\n";
        this.dataTable.baseArray.forEach(item => {
            let facInfo = item.personId ? item.personId.firstName + " " + item.personId.lastName + "," + item.personId.email: ""; 
            csvContent +=  facInfo  + "," + item.title + "," + item.status;
            csvContent +=  "\r\n";
        })
        var encodedUri = encodeURI(csvContent);
        var link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "submissions.csv");
        document.body.appendChild(link); // Required for FF

        link.click();
    }

    nameCustomFilter(value, item, context){
        if(item.personId){
            let firstNameFilter = item.personId.firstName.toUpperCase().indexOf(value.toUpperCase()) > -1;
            let lastNameFilter = item.personId.lastName.toUpperCase().indexOf(value.toUpperCase()) > -1;
            return firstNameFilter || lastNameFilter;
        }
        return false;
    }

    emailCustomFilter(value, item, context){
        return item.personId && item.personId.email.toUpperCase().indexOf(value.toUpperCase()) > -1;
    }

    titleCustomFilter(value, item, context){
        return item.title.toUpperCase().indexOf(value.toUpperCase()) > -1;
    }

    fileCustomFilter(value, item, context){
        return item.file && item.file.originalFileName.toUpperCase().indexOf(value.toUpperCase()) > -1;
    }

    customNameSorter(sortProperty, sortDirection, sortArray, context) {
        this.sortProperty = 'person';
        this.sortDirection = sortDirection;
        return sortArray.sort((a, b) => {
            if (a['personId']  && b['personId']  && a['personId']['lastName'] && b['personId']['lastName']) {
                var result = (a['personId']['lastName'] < b['personId']['lastName']) ? -1 : (a['personId']['lastName'] > b['personId']['lastName']) ? 1 : 0;
            } else {
                var result = -1;
            }
            return result * sortDirection;
        });
    }

    customEmailSorter(sortProperty, sortDirection, sortArray, context) {
        this.sortProperty = 'person';
        this.sortDirection = sortDirection;
        return sortArray.sort((a, b) => {
            if (a['personId']  && b['personId']  && a['personId']['email'] && b['personId']['email']) {
                var result = (a['personId']['email'] < b['personId']['email']) ? -1 : (a['personId']['email'] > b['personId']['email']) ? 1 : 0;
            } else {
                var result = -1;
            }
            return result * sortDirection;
        });
    }


    customTitleSorter(sortProperty, sortDirection, sortArray, context) {
        return sortArray.sort((a, b) => {
            var result = (a[sortProperty] < b[sortProperty]) ? -1 : (a[sortProperty] > b[sortProperty]) ? 1 : 0;
            return result * sortDirection;
        });
    }

    customTrackSorter(sortProperty, sortDirection, sortArray, context) {
        return sortArray.sort((a, b) => {
            var result = (a[sortProperty] < b[sortProperty]) ? -1 : (a[sortProperty] > b[sortProperty]) ? 1 : 0;
            return result * sortDirection;
        });
    }

    customStatusSorter(sortProperty, sortDirection, sortArray, context) {
        return sortArray.sort((a, b) => {
            var result = (a[sortProperty] < b[sortProperty]) ? -1 : (a[sortProperty] > b[sortProperty]) ? 1 : 0;
            return result * sortDirection;
        });
    }
}