/* eslint-disable @typescript-eslint/naming-convention */
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'uy.kupon.kupon',
  appName: 'KuPon',
  webDir: 'www',
  cordova: {
    preferences: {
      LottieFullScreen: 'true',
      LottieHideAfterAnimationEnd: 'true',
      LottieBackgroundColor: '#770db4',
    }
  }
};


export default config;
