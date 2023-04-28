/* eslint-disable @typescript-eslint/naming-convention */
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'uy.kupon.kupon',
  appName: 'KuPon',
  webDir: 'www',

  cordova: {
    preferences: {
      LottieRelativeSize: 'true',
      LottieWidth: '1',
      LottieHeight: '1.35',
      LottieHideAfterAnimationEnd: 'true',
      LottieBackgroundColorLight: '#770db4',
      LottieBackgroundColorDark: '#770db4',
      LottieBackgroundColor: '#770db4',
    }
  }
};

export default config;

