import type { CapacitorConfig } from '@capacitor/cli'

// 개발: localhost, 배포 후: Vercel URL로 변경
const PROD_URL = process.env.CAPACITOR_SERVER_URL // ex) https://bmb.vercel.app

const config: CapacitorConfig = {
  appId: 'kr.bmb.app',
  appName: 'BMB',
  webDir: 'out',
  server: PROD_URL
    ? { url: PROD_URL, cleartext: false }
    : { url: 'http://localhost:3000', cleartext: true },
  plugins: {
    PushNotifications: {
      presentationOptions: ['badge', 'sound', 'alert'],
    },
    Geolocation: {
      permissions: {
        ios: 'whenInUse',
      },
    },
  },
}

export default config
