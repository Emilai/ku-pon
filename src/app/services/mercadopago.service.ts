/* eslint-disable object-shorthand */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable quote-props */
/* eslint-disable @typescript-eslint/quotes */
import { Injectable } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/compat/functions';


@Injectable({
  providedIn: 'root'
})
export class MercadopagoService {

  initPoint: any;
  respuesta: any;

  constructor(
    private firebase: AngularFireFunctions) { }

  goCheckOut(products) {
    const CheckOut = this.firebase.httpsCallable('checkout');
    CheckOut(products);
  }



  async mercadopago(titulo, precio, img, nombre, email) {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    // eslint-disable-next-line max-len
    myHeaders.append("Authorization", "Bearer APP_USR-2317168769426376-062008-2b24bbf2bc4fd7270df071b760d720c1-1146004371");

    const raw = JSON.stringify({
      "external_reference": "KuPon",
      "notification_url": "https://hookb.in/eK1EQDjlNNslaRPldeOM",

      "items": [
        {
          "title": titulo,
          "quantity": 1,
          "unit_price": precio,
          "picture_url": img
        }
      ],
      "payer": {
        "name": nombre,
        "surname": "KuPon User",
        "email": email,
      },
      "payment_methods": {
        "excluded_payment_types": [
          {
            "id": "ticket"
          }
        ]
      },
      "back_urls": {
        "success": "success",
        "failure": "fail",
      },
      "auto_return": "approved",
      "binary_mode": true
    });

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
    };

    await fetch("https://api.mercadopago.com/checkout/preferences", requestOptions)
      .then(response => response.json())
      .then(result => {
        this.respuesta = result;
        console.log('respuesta: ', result);
        this.initPoint = result.init_point;
        console.log(this.initPoint);
      })
      .catch(error => console.log('error', error));
  }

}
