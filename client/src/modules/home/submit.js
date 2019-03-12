import { inject } from 'aurelia-framework';
import Validation from '../../resources/utils/validation';
import { Services } from '../../resources/data/services';
import { Router } from "aurelia-router";
import $ from 'jquery';
import * as toastr from "toastr";

@inject(Validation, Services, Router)
export class Submit {
    constructor(validation, services, router) {
        this.validation = validation;
        this.services = services;
        this.router = router;
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
}