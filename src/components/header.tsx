'use client'

import { UserAuth } from '@/context/auth-context';
import { useRouter } from 'next/navigation';
import { ChangeEvent, FormEvent } from 'react';
import { FaSearch } from 'react-icons/fa'

interface HeaderProps {
  submitSearch: (e: FormEvent<HTMLFormElement>) => void,
  title: string,
  changeSearch: (e: ChangeEvent<HTMLInputElement>) => void
}

const Header = ({ submitSearch, title, changeSearch }: HeaderProps) => {
  const router = useRouter()
  
  const handleLogout = async () => {
    await logOut()
    router.push('/login')
  }

  const { user, logOut } = UserAuth()
  return (
    <header className="flex max-sm:flex-col max-sm:items-start items-center justify-between gap-2">
      <form onSubmit={submitSearch}>
        <div
          className="flex items-center gap-3 text-sm text-grayth p-2 rounded-lg border-2 border-gray-600 hover:border-indigo-900 transition duration-200">
          <input
            value={title}
            name='title'
            onChange={changeSearch}
            placeholder="Search movie..." className="bg-transparent outline-none w-full" />
          <button type='submit' className='border-none outline-none focus:text-white'>
            <FaSearch className='border-none' />
          </button>
        </div>
      </form>

      <div className='flex gap-3 items-center text-[15px] font-semibold'>

        {user?.email
          ? (
            <button
              onClick={handleLogout}
              className='w-fit py-2 px-4 rounded-lg hover:bg-[#0a1527] transition duration-200'>
              Log out
            </button>
          )
          : (
            <button className='w-fit bg-gray-300 py-2 px-4 rounded-lg text-black hover:opacity-80'>
              Sign Up
            </button>
          )
        }
      </div>
    </header>
  );
}

export default Header;