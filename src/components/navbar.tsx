'use client'

import useLoginModal from '@/hooks/use-login-modal';
import useRegisterModal from '@/hooks/use-register-modal';
import RegisterModal from './modals/register-modal';
import LoginModal from './modals/login-modal';
import Image from 'next/image';
import { UserAuth } from '@/context/auth-context';
import { usePathname, useRouter } from 'next/navigation';
import { FaCircleUser } from "react-icons/fa6";

const Navbar = () => {
  const router = useRouter()
  const path = usePathname()

  const { user, logOut } = UserAuth()

  const handleLogout = () => {
    router.push('/')
    setTimeout(async () => {
      await logOut()
    }, 300)
  }

  const loginModal = useLoginModal()
  const registerModal = useRegisterModal()

  const isLoggedInToCreateRanking = () => {
    if (!user) {
      loginModal.onOpen()
    } else {
      router.push('/create-ranking')
    }
  }

  return (
    <>
      <LoginModal />
      <RegisterModal />
      <header className="flex items-center justify-between gap-2 sm:px-4 mb-3">
          <button className='text-2xl font-bold font-mono' onClick={() => router.push('/')}>
            Movieees
          </button>
        <div className='text-[15px] font-semibold items-center gap-6 hidden sm:flex'>
          {user?.email && path !== '/create-ranking' ? <button className='hover:opacity-80' onClick={isLoggedInToCreateRanking}>Create ranking</button> : null}
          {user?.email && path !== '/account' ? <button className='hover:opacity-80' onClick={() => router.push('/account')}>Profile</button> : null}
          {user && user?.email
            ? (
              <button
                onClick={handleLogout}
                className='w-fit text-white hover:opacity-80'>
                Log out
              </button>
            )
            : (
              <div className='flex items-center gap-3'>
                <button
                  onClick={registerModal.onOpen}
                  className='w-fit rounded-lg py-2 px-4 text-white hover:opacity-80'>
                  Sign Up
                </button>
                <button
                  onClick={loginModal.onOpen}
                  className='w-fit bg-slate-800 py-2 px-4 rounded-lg text-white hover:opacity-80'>
                  Log in
                </button>
              </div>
            )
          }
        </div>
        {user && user.photoURL ? (
          <Image
            className='rounded-full xsm:hidden'
            width={40}
            height={40}
            alt={user.email}
            src={user.photoURL}
          />
        ) : null
        }
        {user && !user.photoURL ? (
          <FaCircleUser
            className='rounded-full xsm:hidden text-2xl bg-indigo-900'
          />
        ) : null}
      </header>
    </>
  );
}

export default Navbar;