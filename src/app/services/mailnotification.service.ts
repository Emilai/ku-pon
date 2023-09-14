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

  contactListId = '020e2d46-2f0c-40bb-8180-857c4d7869eb';

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


  async mailToUserOnline(usuario, comercio, valor, codigo) {
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
            "valor": valor,
            "codigo": codigo
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
      "template_id": "d-98bdc02b9cdc4f7a9c7c9ebd39ea1d79"
    });

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
    };

    await fetch("https://kupon1.herokuapp.com/https://api.sendgrid.com/v3/mail/send", requestOptions)
      .then(response => {
        console.log('Mail a Usuario compra Online', response);
      })
      .catch(error => console.log('error', error));
  }

  async errorMailToUs(usuario, comercio, valor, mailComercio) {
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
      "template_id": "d-b33799d25d504ab0b8a1bb7deb7e66e1"
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


  // ***************** Mail Contact Creation ***************

  async mailContactCreation(mailUsuario, nombre, telefono) {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Authorization", "Bearer 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");

    const raw = JSON.stringify({
      "list_ids": [this.contactListId],
      "contacts": [
        {
          "email": mailUsuario,
          "first_name": nombre,
          "address_line_1": telefono
        }
      ]
    });

    const requestOptions = {
      method: 'PUT',
      headers: myHeaders,
      body: raw,
    };

    await fetch("https://kupon1.herokuapp.com/https://api.sendgrid.com/v3/marketing/contacts", requestOptions)
      .then(response => {
        console.log('Registro de Usuario', response);
      })
      .catch(error => console.log('error', error));
  }
}

