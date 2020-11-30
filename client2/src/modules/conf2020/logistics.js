export class Logistics {
    constructor(){
        this.showImage = [];
        this.showImage.push("http://localhost/img/parallax1.jpg");
        this.showImage.push("http://localhost/img/uwm.jpg");
        this.showThisImage = this.showImage[0];
        this.index = 1;
    }

    activate(){
        setInterval(() => {
            this.showThisImage = this.showImage[this.index];
            if(this.index == this.showImage.length - 1){
                this.index = 0;
            } else {
                this.index++;
            }
        },5000);
    }
}