import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter'
  // display: 'optional'
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en' className={`${inter.variable}`}>
      <body className='m-2 font-inter'>{children}</body>
    </html>
  )
}
