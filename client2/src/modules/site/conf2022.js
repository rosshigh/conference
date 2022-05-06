
export class Conf2022 {
    regularBanner = true;

    constructor(){
        
        this.pageHeader = "North American SAP Academic Community Conference 2022";
        this.pageSubHeader = "July 18-19, 2022";

    }

    activate() {
        this.paypalURL = "https://www.paypal.com/sdk/js?client-id=AdG7HOB9ups2a4OOPuJuZKGadkv4qlFIXkkG4trDM_HKI3rl---nO0FEEyNPLHD-p-o8cWnNOdExGvfA&enable-funding=venmo&currency=USD&disable-funding=credit,venmo";
    }

    attached() {
        setTimeout(() => { this.initPayPalButton(); }, 1000);
    }

    initPayPalButton() {
        paypal.Buttons({
            style: {
                shape: 'pill',
                color: 'blue',
                layout: 'vertical',
                label: 'pay',

            },

            createOrder: function (data, actions) {
                return actions.order.create({
                    purchase_units: [{ "description": "Early Bird Conference Fee", "amount": { "currency_code": "USD", "value": 100 } }]
                });
            },

            onApprove: function (data, actions) {
                return actions.order.capture().then(function (orderData) {

                    // Full available details
                    console.log('Capture result', orderData, JSON.stringify(orderData, null, 2));

                    // Show a success message within this page, e.g.
                    const element = document.getElementById('paypal-button-container');
                    element.innerHTML = '';
                    element.innerHTML = '<h3>Thank you for your payment!</h3>';

                    // Or go to another URL:  actions.redirect('thank_you.html');

                });
            },

            onError: function (err) {
                console.log(err);
            }
        }).render('#paypal-button-container');
    }
}