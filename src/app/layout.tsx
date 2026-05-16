import type { Metadata } from 'next'
import { IBM_Plex_Sans } from 'next/font/google'
import './globals.css'
import { AppInitializer } from '@/components/AppInitializer'

const ibmPlex = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-ibm',
})

export const metadata: Metadata = {
  title: 'BMB — 베이커리 정보',
  description: '서울 최고의 베이커리를 발견하세요. 크루아상, 소금빵, 케이크, 도넛까지.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" className={ibmPlex.variable}>
      <body>
        <AppInitializer />
        {children}
      </body>
    </html>
  )
}
