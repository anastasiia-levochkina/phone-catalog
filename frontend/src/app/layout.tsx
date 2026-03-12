import type { Metadata } from 'next'
import { ReactQueryProvider } from '@/lib/react-query'
import './globals.css'
import styles from './layout.module.scss'

export const metadata: Metadata = {
  title: 'Mate Fullstack Template',
  description: 'Fullstack application template with Next.js, Nest.js and PostgreSQL',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="uk">
      <body className={styles.body}>
        <ReactQueryProvider>{children}</ReactQueryProvider>
      </body>
    </html>
  )
}
