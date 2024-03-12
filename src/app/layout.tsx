import Navbar from '@/components/Navbar'
import { cn } from '@/lib/utils'
import { Inter } from 'next/font/google'
import Providers from '@/components/Providers'
import { Toaster } from '@/components/ui/Toaster'
import '@/styles/globals.css'

export const metadata = {
  title: 'UR-Connect',
  description: 'A platform built with Next.js and TypeScript.',
}

//custom font
const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
  authModal,
}: {
  children: React.ReactNode,
  authModal: React.ReactNode
}) {
  return (
    //merge both class names, optimize code
    <html lang='en' className={cn('bg-black text-slate-900 antialiased light', inter.className)}>
      <body className='min-h-screen pt-12 bg-black antialiased'>
        <Providers >
          {/* @ts-expect-error Server Component */}
          <Navbar />
          {authModal}

          <div className='container max-w-7xl mx-auto h-full pt-12'>
            {children}
          </div>

        </Providers>
        {/* render toast if invoked by catch method */}
        <Toaster />
      </body>
    </html>
  )
}
