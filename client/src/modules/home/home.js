import * as toastr from 'toastr';
export class Home {
    constructor(){
        
    }

    attached(){
        toastr.success('This a toast');
    }
}