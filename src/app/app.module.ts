import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { DatePipe, LowerCasePipe } from '@angular/common';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { IonicStorageModule } from '@ionic/storage-angular';
import { initializeApp, provideFirebaseApp, getApp } from '@angular/fire/app';
import { provideAuth, getAuth, indexedDBLocalPersistence, initializeAuth } from '@angular/fire/auth';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { provideStorage, getStorage } from '@angular/fire/storage';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAnalyticsModule } from '@angular/fire/compat/analytics';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { Capacitor } from '@capacitor/core';
import { NgxStarRatingModule } from 'ngx-star-rating';



@NgModule({
    declarations: [AppComponent],
    imports: [BrowserModule,
        IonicModule.forRoot(),
        AppRoutingModule,
        HttpClientModule,
        NgxStarRatingModule,
        ServiceWorkerModule.register('ngsw-worker.js', {
            enabled: environment.production,
            // Register the ServiceWorker as soon as the application is stable
            // or after 30 seconds (whichever comes first).
            registrationStrategy: 'registerWhenStable:30000'
        }),
        provideFirebaseApp(() => initializeApp(environment.firebase)),
        provideAuth(() => {
            if (Capacitor.isNativePlatform()) {
                return initializeAuth(getApp(), {
                    persistence: indexedDBLocalPersistence
                })
            } else {
                return getAuth()
            }
        }),
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireAnalyticsModule,
        AngularFirestoreModule,
        IonicStorageModule.forRoot(),
        provideFirebaseApp(() => initializeApp(environment.firebase)),
        provideAuth(() => getAuth()),
        provideFirestore(() => getFirestore()),
        provideStorage(() => getStorage()),
    ],
    providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
        DatePipe, LowerCasePipe, InAppBrowser],
    bootstrap: [AppComponent]
})
export class AppModule {}
