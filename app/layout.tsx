import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Mapa Astral',
  description: 'Calculadora de Mapa Astral',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  )
}
