import { inject } from 'aurelia-framework';
import { Router } from "aurelia-router";
import { Auth } from '../data/auth';
import { Services } from '../../resources/data/services';
import * as toastr from "toastr";
import $ from "jquery";

@inject(Router,  Auth, Services)
export class NavBar {

    isAuthenticated = false;
    subscription = {};

    constructor(router,  auth, services) {
        this.router = router;
        this.auth = auth;
        this.services = services;

        this.isAuthenticated = this.auth.isAuthenticated();
        this.userObj = JSON.parse(sessionStorage.getItem('user'));
    }

    attached() {

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

    logout() {
        if (this.userObj) this.auth.logout(this.userObj.email);
        this.userObj = new Object();
        this.isAuthenticated = this.auth.isAuthenticated();
        this.router.navigate("landing");
    }

    async loginSuccess() {
        this.userObj = JSON.parse(sessionStorage.getItem('user'));
        if (this.userObj) {
            sessionStorage.setItem('role', this.userObj.role)
            this.router.navigate("home");
        }

    }

}
