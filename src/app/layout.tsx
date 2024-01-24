import LoginModal from '@/components/modals/login-modal'
import RegisterModal from '@/components/modals/register-modal'
import Navbar from '@/components/navbar'
import { AuthContextProvider } from '@/context/auth-context'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Movieees',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode,
}) {
  return (
    <html lang="en">
      <AuthContextProvider>
        <body className={inter.className}>
          <LoginModal />
          <RegisterModal />
          <div className="flex flex-col max-w-[1700px] py-2 px-4 lg:px-10 min-h-screen">
            <Navbar />
            {children}
          </div>
        </body>
      </AuthContextProvider>
    </html>
  )
}
