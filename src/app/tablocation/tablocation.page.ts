import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Geolocation } from '@capacitor/geolocation';
import { ModalController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { Kupon } from '../interfaces';
import { ModalPage } from '../modal/modal.page';
import { AuthService } from '../services/auth.service';
import { CardService } from '../services/card.service';

declare let google;


@Component({
  selector: 'app-tablocation',
  templateUrl: './tablocation.page.html',
  styleUrls: ['./tablocation.page.scss'],
})
export class TablocationPage implements OnInit {

  @ViewChild('map') mapElement: ElementRef;
  map: any;
  markers = [];
  cards: any[] = [];

  location: any;
  locations: any;
  locationsCollection: AngularFirestoreCollection<any>;

  constructor(public authService: AuthService,
    private afs: AngularFirestore,
    private modalCtrl: ModalController,
    private cardService: CardService ) { }

  async ngOnInit() {
    // await this.currentLocation();
    await Geolocation.getCurrentPosition().then(res => {
      // console.log(res);
      this.location = res;
    });

    await this.cardService.getCards().then(cards => {
      cards.subscribe(kupones => {
        this.cards = kupones.map(kuponRef => {
          const kupon = kuponRef.payload.doc.data();
          // eslint-disable-next-line @typescript-eslint/dot-notation
          kupon['id'] = kuponRef.payload.doc.id;
          // console.log(kupon);
          return kupon;
        });
        this.updateMap();
      });

    });
  }

  async currentLocation() {
    await Geolocation.getCurrentPosition().then(res=> {
      console.log(res);
      this.location = res;
    });
  }

  async ionViewWillEnter() {
    await this.loadMap();
    await this.updateMap();
  }

  async loadMap() {
    const latLng = new google.maps.LatLng(-34.8631143, -56.2263031);
    const locationButton = document.createElement('button');
    locationButton.textContent = 'Mi Ubicación';
    locationButton.classList.add('custom-map-control-button');

    locationButton.style.backgroundColor = '#770db4';
    locationButton.style.border = '0px solid #fff';
    locationButton.style.borderRadius = '5px';
    locationButton.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)';
    locationButton.style.color = '#fff';
    locationButton.style.cursor = 'pointer';
    locationButton.style.fontFamily = 'Roboto,Arial,sans-serif';
    locationButton.style.fontSize = '15px';
    locationButton.style.lineHeight = '30px';
    locationButton.style.margin = '12px 12px 22px';
    locationButton.style.padding = '0 5px';
    locationButton.style.textAlign = 'center';

    const mapOptions = {
      center: latLng,
      zoom: 11,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      disableDefaultUI: true,
    };

    this.map = await new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    await this.map.controls[google.maps.ControlPosition.RIGHT_TOP].push(locationButton);
    locationButton.addEventListener('click', () => {
      if (this.location) {
        const pos = {
          lat: this.location.coords.latitude,
          lng: this.location.coords.longitude,
        };
        this.map.setCenter(pos);
      }
    });
  }

  updateMap() {

    for (const kupon of this.cards) {
      if (Array.isArray(kupon.loc)) {

        for (const ubicacion of kupon.loc) {

          const latLng = new google.maps.LatLng(ubicacion.latitude, ubicacion.longitude);

          const marker = new google.maps.Marker({
            map: this.map,
            animation: google.maps.Animation.DROP,
            position: latLng,
            title: kupon.comercio,
            label: {
              text: kupon.comercio,
              color: 'gold',
              fontSize: '10px',
              fontFamily: 'roboto',
              className: 'label',
              fontWeight: 'bold',
            },
            optimized: false,
            icon: 'https://kupon.uy/kuponimg/icon2.png',
          });
          this.markers.push(marker);
          // console.log(marker);
          marker.addListener('click', () => {
            this.mostrarModal(kupon);
          });
        }

      };

      if (kupon.loc && Array.isArray(kupon.loc) === false) {

          const latLng = new google.maps.LatLng(kupon.loc.latitude, kupon.loc.longitude);

          const marker = new google.maps.Marker({
            map: this.map,
            animation: google.maps.Animation.DROP,
            position: latLng,
            title: kupon.comercio,
            label: {
              text: kupon.comercio,
              color: 'gold',
              fontSize: '10px',
              fontWeight: 'bold',
            },
            optimized: false,
            icon: 'https://kupon.uy/kuponimg/icon2.png',
          });
          this.markers.push(marker);
          // console.log(marker);
          marker.addListener('click', () => {
            this.mostrarModal(kupon);
          });

      }

    }
  }
  async mostrarModal(card: Kupon) {
    const modal = await this.modalCtrl.create({
      component: ModalPage,
      showBackdrop: true,
      canDismiss: true,
      animated: true,
    });
    this.cardService.kuponData = card;
    await modal.present();
  }
}
