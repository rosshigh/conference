import {inject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-http-client';

@inject(HttpClient)
export class DataServices {
    isRequesting = false;

    constructor(http) {
        this.http = http;
    
		this.http.configure(x => {
            // x.withBaseUrl("http://c3po.ucc.uwm.edu/api/");
            x.withBaseUrl("http://localhost/api/");
		});
    }

	activate(){
	}
 
  get(url){
		this.isRequesting = true;
		return this.http.createRequest(url)
		.asGet()
		.withHeader('Authorization', 'JWT ' + sessionStorage.getItem('token'))
		.send().then(response => {
			this.isRequesting = false;
  			if (!response.isSuccess) {
             return response;
         } else {
             return JSON.parse(response.response);
         }
     }).catch(e => {
				 this.isRequesting = false;
         console.log(e);
         return  {error: true, code: e.statusCode, message: e.statusText};
     });
	}

    getNoAuth(url){
        this.isRequesting = true;
		return this.http.createRequest(url)
		.asGet()
		.send().then(response => {
			this.isRequesting = false;
			if (!response.isSuccess) {
                     return response;
                 } else {
                     return JSON.parse(response.response);
                 }
             }).catch(e => {
				 this.isRequesting = false;
                 console.log(e);
                 return  {error: true, code: e.statusCode, message: e.statusText};
             });
    }

	saveObject(content, url, method) {
        this.isRequesting = true;
		if(method === 'put'){
 			return this.http.createRequest(url)
			 .asPut()
			 .withHeader('Authorization', 'JWT ' + sessionStorage.getItem('token'))
			 .withContent(content)
			 .send().then(response => {
				 this.isRequesting = false;
				if (!response.isSuccess) {
                     return response;
                 } else {
                     return JSON.parse(response.response);
                 }
             }).catch(e => {
				 this.isRequesting = false;
                 console.log(e);
                 return  {error: true, code: e.statusCode, message: e.statusText};
             });

		} else if(method === 'post'){
			return this.http.createRequest(url)
			 .asPost()
			 .withHeader('Authorization', 'JWT ' + sessionStorage.getItem('token'))
			 .withContent(content)
			 .send().then(response => {
				 this.isRequesting = false;
				if (!response.isSuccess) {
                     return response;
                 } else {
                     return JSON.parse(response.response);
                 }
             }).catch(e => {
				 this.isRequesting = false;
                 console.log(e);
                 return  {error: true, code: e.statusCode, message: e.statusText};
             });
		}

    }

	deleteObject(url){
		this.isRequesting = true;
		return this.http.createRequest(url)
		.asDelete()
		.withHeader('Authorization', 'JWT ' + sessionStorage.getItem('token'))
		.send().then(response => {
				this.isRequesting = false;
				if (!response.isSuccess) {
                     return response;
                 } else {
                     if(response.statusCode  === 204){
                        return response;
                     } else {
                        return JSON.parse(response.response);
                     }

                 }
             }).catch(e => {
				 this.isRequesting = false;
                 console.log(e);
                 return  {error: true, code: e.statusCode, message: e.statusText};
             });
	}

    sendMail(content) {
        this.isRequesting = true;
			return this.http.createRequest('sendMail')
			 .asPost()
			 .withHeader('Authorization', 'JWT ' + sessionStorage.getItem('token'))
			 .withContent(content)
			 .send().then(response => {
				 this.isRequesting = false;
				if (!response.isSuccess) {
                     return response;
                 } else {
                     return JSON.parse(response.response);
                 }
             }).catch(e => {
				 this.isRequesting = false;
                 console.log(e);
                 return  {error: true, code: e.statusCode, message: e.statusText};
             });

    }

    login(content, url){
        return this.http.createRequest(url)
			 .asPost()
			 .withContent(content)
			 .send().then(response => {
				 this.isRequesting = false;
                 return JSON.parse(response.response);
             }).catch(e => {
				 this.isRequesting = false;
                 console.log(e);
                 return  {error: true, code: e.statusCode, message: e.statusText};
             });
    }

    uploadFiles(files, url){
        // this.isRequesting = true;
        this.progress = 0;
		let formData = new FormData();

        files.forEach((item, index) => {
            formData.append("file" + index, item);
        })

		return this.http.createRequest(url)
			.asPost()
			.withHeader('Authorization', 'JWT ' + sessionStorage.getItem('token'))
			.withContent(formData)
			.skipContentProcessing()
			.send().then(response => {
				this.isRequesting = false;
				if (!response.isSuccess) {
                     return response;
                 } else {
                     return JSON.parse(response.response);
                 }
             }).catch(e => {
				 this.isRequesting = false;
                 console.log(e);
                 return  {error: true, code: e.statusCode, message: e.statusText};
             });

    }

    processError(obj, message) {
        console.log(obj);
        var msg = (message ? message : "") + " ";
        switch (obj.code) {
            case 404:
                msg = undefined;
                break;
            case 422:
                msg = msg += "The request was bad.  Contact your UCC.";
                break;
            case 409:
                msg = msg += "The record already exists.";
                break;
            case 500:
                msg = msg += "An unspecified error occured on the server.  Contact your UCC.";
                break;
            default:
                msg = msg += "An unspecified error occured.  Contact your UCC."
        }
        if(msg && msg.length > 0) console.log(msg);
    }

    // //File URLs
    FILE_URL = "http://localhost:5000/api/upload";
    FILE_DOWNLOAD_URL = "http://localhost:5000/";


    // //IS4UA Services
    IS4UA = 'is4ua';

    // //Clients Services
    CLIENTS_SERVICE = 'clients';
    DELETE_ALL_CLIENTS = 'clients/system/SYSTEMID';


    // //Products Services
    // PRODUCTS_SERVICE = 'products';


    // //Clientrequests Services
    COURSES_SERVICE = 'courses';
    PERSON_COURSES_SERVICE = 'courses/person/PERSONID';

    CONFIG_SERVICE = 'config';
    SESSIONS_CONFIG_SERVICE = 'semesterConfig';

    //File upload
    DOCUMENTS_FILE_UPLOAD = 'documents/file';

    // API_KEY='0f85bb931f8faad7e35b6f685aa4e931';
    // OPEN_WEATHER_MAP_SERVICE = 'http://api.openweathermap.org/data/2.5/weather';

}
