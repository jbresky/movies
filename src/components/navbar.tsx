'use client'

import useLoginModal from '@/hooks/use-login-modal';
import useRegisterModal from '@/hooks/use-register-modal';
import { UserAuth } from '@/context/auth-context';
import Link from 'next/link';
import Dropdown from './dropdown';
import { useRouter } from 'next/navigation';

const Navbar = () => {

  const router = useRouter()
  const { user, logOut } = UserAuth()

  const handleLogout = () => {
    router.push('/')
    setTimeout(async () => {
      await logOut()
    }, 300)
  }

  const loginModal = useLoginModal()
  const registerModal = useRegisterModal()

  return (
    <>
      <header className="sm:flex items-center justify-between gap-2 hidden sm:p-4">
        <Link href='/' className='text-2xl font-bold font-mono py-2'>
          Movieees
        </Link>

        {user && user?.email
          ? (
            <Dropdown
              user={user}
              handleLogout={handleLogout}
            />
          )
          : (
            <div className='flex font-sans font-medium items-center gap-3'>
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
      </header>
    </>
  );
}

export default Navbar;