'use client'

import { UserAuth } from '@/context/auth-context';
import { useRouter } from 'next/navigation';

const Navbar = () => {
  const router = useRouter()
  
  const handleLogout = async () => {
    await logOut()
    router.push('/login')
  }

  const { user, logOut } = UserAuth()
  
  return (
    <header className="flex max-sm:flex-col max-sm:items-start items-center justify-between gap-2 px-10">
      <button className='text-2xl font-bold' onClick={() => router.push('/')}>
        Movies
      </button>
      <div className='text-[15px] font-semibold flex items-center gap-4'>
        <button onClick={() => router.push('/account')}>Profile</button>
        {user?.email
          ? (
            <button
              onClick={handleLogout}
              className='w-fit py-2 px-4 rounded-lg bg-[#0a1527] hover:bg-[#15202b] transition duration-200'>
              Log out
            </button>
          )
          : (
            <button
            onClick={() => router.push('/signup')}
            className='w-fit py-2 px-4 rounded-lg text-white hover:opacity-80'>
              Sign Up
            </button>
          )
        }
      </div>
    </header>
  );
}

export default Navbar;