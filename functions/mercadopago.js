/* eslint-env es6 */
/* eslint-disable */

// SDK de Mercado Pago
const mercadopago = require('mercadopago');
// Agrega credenciales
mercadopago.configure({
  access_token: "TEST-2317168769426376-062008-59ce512347a3e53cf8b54391b3a9c1f1-1146004371"
});
const mercadopagoCtrl = {};
mercadopagoCtrl.makecheckout = (preference, res) => {
console.log(preference);
return mercadopago.preferences.create(preference);
}
module.exports = mercadopagoCtrl;