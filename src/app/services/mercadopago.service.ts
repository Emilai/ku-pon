/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable quote-props */
/* eslint-disable @typescript-eslint/quotes */
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AngularFireFunctions } from '@angular/fire/compat/functions';


@Injectable({
  providedIn: 'root'
})
export class MercadopagoService {

  initPoint: any;
  respuesta: any;

  constructor(
    private httpClient: HttpClient,
    private firebase: AngularFireFunctions) { }

  goCheckOut(products) {
    const CheckOut = this.firebase.httpsCallable('checkout');
    CheckOut(products);
  }



  async mercadopago(titulo, precio, img) {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    // eslint-disable-next-line max-len
    myHeaders.append("Authorization", "Bearer TEST-2317168769426376-062008-59ce512347a3e53cf8b54391b3a9c1f1-1146004371");

    const raw = JSON.stringify({
      "external_reference": "ABC",
      "notification_url": "https://hookb.in/eK1EQDjlNNslaRPldeOM",

      "items": [
        {
          "title": titulo,
          "quantity": 1,
          "unit_price": precio,
          "picture_url": img
        }
      ],
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
        this.initPoint = result.init_point;
        // console.log(this.initPoint);
      })
      .catch(error => console.log('error', error));
  }

}
