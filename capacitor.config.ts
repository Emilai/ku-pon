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
      LottieBackgroundColorLight: '#121212',
      LottieBackgroundColorDark: '#121212',
      LottieBackgroundColor: '#121212',
    }
  }
};

export default config;

