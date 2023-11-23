'use client'

import { UserAuth } from '@/context/auth-context';
import useLoginModal from '@/hooks/use-login-modal';
import useRegisterModal from '@/hooks/use-register-modal';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import LoginModal from './modals/login-modal';
import RegisterModal from './modals/register-modal';
import { FaCircleUser } from "react-icons/fa6";

const Navbar = () => {
  const router = useRouter()

  const { user, logOut } = UserAuth()

  const handleLogout = async () => {
    router.push('/')
    await logOut()
  }

  const loginModal = useLoginModal()
  const registerModal = useRegisterModal()

  return (
    <>
      <LoginModal />
      <RegisterModal />
      <header className="flex items-center justify-between gap-2 sm:px-4 mb-3">
        <button className='text-2xl font-bold' onClick={() => router.push('/')}>
          Movies
        </button>

        <div className='text-[15px] font-semibold items-center gap-4 hidden sm:flex'>
          {user?.email && (
            <button onClick={() => router.push('/account')}>Profile</button>
          )}
          {user && user?.email
            ? (
              <button
                onClick={handleLogout}
                className='w-fit py-2 px-4 text-white hover:opacity-80'>
                Log out
              </button>
            )
            : (
              <div className='flex items-center gap-3'>
                <button
                  onClick={registerModal.onOpen}
                  className='w-fit py-2 px-4 rounded-lg text-white hover:opacity-80'>
                  Sign Up
                </button>
                <button
                  onClick={loginModal.onOpen}
                  className='w-fit py-2 px-4 bg-slate-800 rounded-lg text-white hover:opacity-80'>
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