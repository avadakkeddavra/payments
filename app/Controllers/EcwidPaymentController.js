const GlobalModel = require('./../Models/index');
const Payments = GlobalModel.payments;
const Yandex = require('yandex-checkout')(process.env.YANDEX_SHOP_ID, process.env.YANDEX_SECRET_KEY);


class EcwidPaymentController {

    YandexCallBack(Request, Response) {
        Response.logger.info(Request.body);
    }

    YandexRequest(Request, Response) {

        var idempotenceKey = '02347fc4-a1f0-49db-807e-f0d67c2ed5a5';
        Yandex.createPayment({
            'amount': {
                'value': '2.00',
                'currency': 'RUB'
            },
            'payment_method_data': {
                'type': 'bank_card'
            },
            'confirmation': {
                'type': 'redirect',
                'redirect_url': 'http://95.213.161.181/redirect'
            }
        }, idempotenceKey)
            .then(function(result) {
                console.log({payment: result});
                Response.send(result);
            })
            .catch(function(err) {
                Response.send(err);
            })
    }

}

module.exports = new EcwidPaymentController();