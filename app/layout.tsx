import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Myanmar Audio Transcriber',
  description: 'မြန်မာ အသံဖိုင်များကို မြန်မာစာသို့ ပြောင်းလဲပေးသော အက်ပ်',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="my">
      <body className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        {children}
      </body>
    </html>
  )
}
