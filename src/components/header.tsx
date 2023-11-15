'use client'

import { ChangeEvent, FormEvent } from 'react';
import { FaSearch } from 'react-icons/fa'

interface HeaderProps {
    submitSearch: (e: FormEvent<HTMLFormElement>) => void,
    title: string,
    changeSearch: (e: ChangeEvent<HTMLInputElement>) => void
}

const Header = ({submitSearch, title, changeSearch}: HeaderProps) => {
    return ( 
        <header className="flex max-sm:flex-col max-sm:items-start items-center justify-between gap-2 px-3">
        <div>
          <h1 className="font-semibold text-xl text-gray-300">Create your ranking and show people that good taste 😏</h1>
        </div>

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
      </header>
     );
}
 
export default Header;