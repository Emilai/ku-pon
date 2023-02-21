/* eslint-disable object-shorthand */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable quote-props */
/* eslint-disable @typescript-eslint/quotes */

import { Injectable } from '@angular/core';
import { Http } from '@capacitor-community/http';

@Injectable({
  providedIn: 'root'
})
export class MailnotificationService {

  constructor() { }

  async mailToUser(usuario, comercio, valor) {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Authorization", "Bearer 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");

    const raw = JSON.stringify({
      "personalizations": [
        {
          "to": [
            {
              "email": usuario
            }
          ],
          "dynamic_template_data": {
            "usuario": usuario,
            "comercio": comercio,
            "valor": valor
          }
        }
      ],
      "from": {
        "email": "hola@kupon.uy",
        "name": "KuPon"
      },
      "reply_to": {
        "email": "hola@kupon.uy",
        "name": "KuPon"
      },
      "template_id": "d-1093bfe3c8324eb69a8a878e9a009ba6"
    });

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
    };

    await fetch("https://kupon1.herokuapp.com/https://api.sendgrid.com/v3/mail/send", requestOptions)
      .then(response => {
        console.log('Mail a Usuario', response);
      })
      .catch(error => console.log('error', error));
  }

  async mailToCompany(usuario, comercio, valor, mailComercio) {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Authorization", "Bearer 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");

    const raw = JSON.stringify({
      "personalizations": [
        {
          "to": [
            {
              "email": mailComercio
            }
          ],
          "dynamic_template_data": {
            "usuario": usuario,
            "comercio": comercio,
            "valor": valor
          }
        }
      ],
      "from": {
        "email": "hola@kupon.uy",
        "name": "KuPon"
      },
      "reply_to": {
        "email": "hola@kupon.uy",
        "name": "KuPon"
      },
      "template_id": "d-2aed952e9596446db1a6374d35232eb4"
    });

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
    };

    await fetch("https://kupon1.herokuapp.com/https://api.sendgrid.com/v3/mail/send", requestOptions)
      .then(response => {
        console.log('Mail a Empresa', response);
      })
      .catch(error => console.log('error', error));
  }

}
