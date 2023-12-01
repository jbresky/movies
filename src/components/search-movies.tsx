'use client'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { UserAuth } from "@/context/auth-context";
import useLoginModal from "@/hooks/use-login-modal";
import useRegisterModal from "@/hooks/use-register-modal";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent } from 'react';
import { FaSearch } from 'react-icons/fa'
import { RxHamburgerMenu } from "react-icons/rx";
import LoginModal from "./modals/login-modal";
import RegisterModal from "./modals/register-modal";
interface SearchProps {
  submitSearch: (e: FormEvent<HTMLFormElement>) => void,
  title: string,
  changeSearch: (e: ChangeEvent<HTMLInputElement>) => void,
  getTopRanked?: () => void,
  hidden?: boolean,
  children?: React.ReactNode
}

const Search = ({ submitSearch, title, changeSearch, getTopRanked, hidden, children }: SearchProps) => {

  const { user, logOut } = UserAuth()
  const router = useRouter()

  const handleLogout = () => {
    logOut()
    router.push('/')
  }

  const loginModal = useLoginModal()
  const registerModal = useRegisterModal()

  return (
    <>
      <LoginModal />
      <RegisterModal />
      <div className='sm:flex gap-6 sm:px-4 py-4'>
        <div className='flex items-center justify-between gap-4 mb-4'>
          <h1 className='sm:hidden font-bold font-mono text-2xl'>M</h1>
          <form onSubmit={submitSearch} className="w-full sm:w-[300px]">
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
          <DropdownMenu>
            <DropdownMenuTrigger>
              {user && user.photoURL ? (
                <Image
                  className='rounded-full sm:hidden'
                  width={40}
                  height={40}
                  alt={user.email}
                  src={user.photoURL}
                />
              ) : (
              <RxHamburgerMenu className='sm:hidden text-xl' />
              )}
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-[#060d17] text-grayth w-[150px] mt-2 mr-2">
              {user && user.email ? (
                <>
                  <DropdownMenuLabel>
                    <Link href='/account'>
                      Profile
                    </Link>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Link href='/create-ranking'>
                      Create ranking
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleLogout}>
                    Logout
                  </DropdownMenuItem>
                </>
              ) : (
                <>
                  <DropdownMenuItem onClick={loginModal.onOpen}>Log in</DropdownMenuItem>
                  <DropdownMenuItem onClick={registerModal.onOpen}>Sign up</DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        {!hidden && (
          <div className='justify-between gap-4 font-semibold overflow-x-auto flex whitespace-nowrap scroll-smooth'>
            <h3 className="sm:hover:text-indigo-400 transition duration-200 cursor-pointer text-sm max-sm:text-black max-sm:py-1 px-2 rounded-lg max-sm:bg-gradient-to-t from-indigo-900 via-indigo-400 to-gray-400 brightness-150" onClick={getTopRanked}>Top ranked</h3>
            {children ? children : ''}
          </div>
        )}
      </div>
    </>
  );
}

export default Search;