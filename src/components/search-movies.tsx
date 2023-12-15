'use client'

import Dropdown from "./dropdown";
import LoginModal from "./modals/login-modal";
import RegisterModal from "./modals/register-modal";
import useLoginModal from "@/hooks/use-login-modal";
import useRegisterModal from "@/hooks/use-register-modal";
import { UserAuth } from "@/context/auth-context";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent } from 'react';
import { FaSearch } from 'react-icons/fa'

interface SearchProps {
  submitSearch?: (e: FormEvent<HTMLFormElement>) => void,
  title?: string,
  changeSearch?: (e: ChangeEvent<HTMLInputElement>) => void,
  getTopRanked?: () => void,
  hidden?: boolean,
  formHidden?: boolean,
  children?: React.ReactNode
}

const Search = ({ submitSearch, title, changeSearch, getTopRanked, hidden, children, formHidden }: SearchProps) => {

  const { user, logOut } = UserAuth()
  const router = useRouter()

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
      <LoginModal />
      <RegisterModal />
      <div className='flex max-sm:flex-col items-center gap-2 sm:px-4 py-4'>
        <div className='flex items-center justify-between gap-4 max-sm:mb-4'>
          <h1 className='sm:hidden font-bold font-mono text-2xl'>M</h1>
          <form onSubmit={submitSearch} className={`w-full sm:w-[300px] ${formHidden ? 'hidden' : 'block'}`}>
            <div
              className="flex items-center gap-3 text-sm text-grayth px-2 py-1 rounded-lg border-2 border-gray-600 hover:border-indigo-900 transition duration-200">
              <input
                value={title}
                name='title'
                onChange={changeSearch}
                placeholder="Search movie..."
                className="bg-transparent outline-none w-full"
              />
              <button type='submit' className='border-none outline-none focus:text-white'>
                <FaSearch className='border-none' />
              </button>
            </div>
          </form>
          <Dropdown
            user={user}
            handleLogout={handleLogout}
            loginModal={loginModal}
            registerModal={registerModal}
          />
        </div>
        
        {/* only available on home page */}
        {!hidden && (
          <div className='justify-between gap-4 font-semibold overflow-x-auto flex whitespace-nowrap scroll-smooth'>
            <h3 className="sm:hover:text-indigo-400 text-grayth transition duration-200 cursor-pointer text-sm max-sm:text-black max-sm:py-1 px-2 rounded-full max-sm:bg-gradient-to-t from-slate-400 to-white" onClick={getTopRanked}>Top ranked</h3>
            {children ? children : ''}
          </div>
        )}
      </div>
    </>
  );
}

export default Search;