/* eslint-env es6 */
/* eslint-disable */

const functions = require('firebase-functions');
const mercadopagoCtrl = require('./mercadopago');

exports.checkout = functions.https.onCall((preference, context) => {
  return mercadopagoCtrl.makecheckout(preference).then(response => {
  // Este es el checkout generado o link al que nos vamos a posicionar para pagar
  console.log(response.body.init_point);
  let init_point = response.body.init_point
  return { result: init_point };
  }).catch(error => {
   console.log(error);
   return error
  });
});





//////////////////////////////////////////////// Prueba 2

// const functions = require("firebase-functions");

// const express = require('express');
// const app = express();


// // SDK de Mercado Pago
// const mercadopago = require("mercadopago");
// // Agrega credenciales
// mercadopago.configure({
//   access_token: "TEST-2317168769426376-062008-59ce512347a3e53cf8b54391b3a9c1f1-1146004371",
// });

// let preference = {
//   items: [
//     {
//       title: "Mi producto",
//       unit_price: 100,
//       quantity: 1,
//     },
//   ],
// };

// mercadopago.preferences
//   .create(preference)
//   .then(function (response) {
//   })
//   .catch(function (error) {
//     console.log(error);
//   });


  
// -------------------- API MP ---------------------
// const {
//     procesodepago
// } = require ('./controladores/pago')

// app.post('/process_payment', procesodepago)

// exports.web = functions.https.onRequest(app)