





// const {mercadopago} = require('../util/config')

// exports.procesoPago = (req, res) => {
//     const payment_data = {
//         transaction_amount: Number(req.body.transactionAmount),
//         token: req.body.token,
//         description: req.body.description,
//         installments: Number(req.body.installments),
//         payment_method_id: req.body.paymentMethodId,
//         issuer_id: req.body.issuer,
//         payer: {
//             email: req.body.email,
//             identification: {
//                 type: req.body.docType,
//                 number: req.body.docNumber
//             }
//         }
//     }

//     mercadopago.payment.save (payment_data).then ((response) => {
//         data = {
//             status: response.body.status,
//             status_detail: response.body.status_detail,
//             id: response.body.id
//         }
//         return res.json ({data: data})
//     }).catch ((error) => {
//         return res.json ({error: error})
//     })
// }