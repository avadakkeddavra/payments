const GlobalModel = require('./../Models/index');
const Payments = GlobalModel.payments;
const Yandex = require('yandex-checkout')(process.env.YANDEX_SHOP_ID, process.env.YANDEX_SECRET_KEY);
var request = require("request");

class EcwidPaymentController {

    YandexCallBack(Request, Response) {
        Response.logger.info(Request.body);
    }

    YandexRequest(Request, Response) {

        var headers = {
            'Content-Type': ' application/json'
        };

        headers[process.env.YANDEX_SHOP_ID] = [process.env.YANDEX_SECRET_KEY];

        var options = { method: 'POST',
            url: 'https://payment.yandex.net/api/v3/payments',
            headers:headers,
            body: {
                "amount": {
                    "value": "2.00",
                    "currency": "RUB"
                },
                "payment_method_data": {
                    "type": "bank_card"
                },
                "confirmation": {
                    "type": "redirect",
                    "return_url": "http:/95.213.161.181:3000/return"
                },
                "description": "Order #72"
            }
        };

        request(options, function (error, response, body) {
            if (error)
            {
                Response.send(error);
            } else {
                Response.send({
                    response: response,
                    body: body
                });
            }


        });

    }

}

module.exports = new EcwidPaymentController();