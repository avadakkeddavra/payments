const GlobalModel = require('./../Models/index');
const Payments = GlobalModel.payments;


class EcwidPaymentController {

    YandexCallBack(Request, Response) {
        Response.logger.info(Request.body);
    }

    YandexRequest(Request, Response) {

        var idempotenceKey = '02347fc4-a1f0-49db-807e-f0d67c2ed5a5';
        Response.yandex.createPayment({
            'amount': {
                'value': '2.00',
                'currency': 'RUB'
            },
            'payment_method_data': {
                'type': 'bank_card'
            },
            'confirmation': {
                'type': 'redirect',
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