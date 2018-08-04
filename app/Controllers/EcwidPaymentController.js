const GlobalModel = require('./../Models/index');
const Payments = GlobalModel.payments;
const Yandex = require('yandex-checkout')(process.env.YANDEX_SHOP_ID, process.env.YANDEX_SECRET_KEY);
var request = require("request");
const axios = require("axios");


class EcwidPaymentController {

    YandexCallBack(Request, Response) {
        Response.logger.info(Request.body);
    }

    YandexRequest(Request, Response) {

        var headers = {
            'Content-Type': 'application/json',
            'Idempotence-Key': 'o123490i29-3fkldmjkl-02i-i0--0iwerkl;ef-12'
        };

        headers[process.env.YANDEX_SHOP_ID] = process.env.YANDEX_SECRET_KEY;

        var instance = axios.create();

        instance.post('https://payment.yandex.net/api/v3/payments', {
            headers:headers,
            data: {

                "payment_method_data": {
                    "type": "bank_card"
                },
                "confirmation": {
                    "type": "redirect",
                    "return_url": "http:/95.213.161.181:3000/return"
                },
                "description": "Order #72"
            }
        }).then( res => {
            Response.send(res.data);
        }).catch(function (error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log('REEEEESSSSSSSPPPPPOOOONNNSSSSEEE');
                console.log(error.response.headers);
                Response.send(error.response.data);

            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
                console.log('REEEEEEEEEQQQQQQUUUUUUEEEEEESSSSTTTTTTT');
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log('ERRROR MESSSAAAGGEEE');
                console.log('Error', error.message);
            }
            console.log(error.config);
        });;



    }

}

module.exports = new EcwidPaymentController();