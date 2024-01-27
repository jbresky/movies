'use client'

import MobileDrawer from "./drawer";
import { ChangeEvent, FormEvent } from 'react';
import { FaSearch } from 'react-icons/fa'
import Search from "./search";
import Link from "next/link";

interface ISearch {
  showBox?: boolean,
  isClient?: boolean,
  submitSearch?: (e: FormEvent<HTMLFormElement>) => void,
  title?: string,
  changeSearch?: (e: ChangeEvent<HTMLInputElement>) => void,
}

const SearchM = ({ showBox, isClient, submitSearch, title, changeSearch }: ISearch) => {

  return (
    <>
      <div className='flex max-sm:flex-col sm:items-center gap-2 py-4'>
        <div className='flex items-center justify-between gap-4 max-sm:mb-4'>

          {/* Mobile */}
          <Link href='/' className='sm:hidden font-bold font-mono text-2xl'>M</Link>

          {showBox ?
            (
              isClient
                // as the path /create-ranking is fill with interaction and states, it is a client component and cannot use searchParams 
                ?
                (
                  <form onSubmit={submitSearch} className={`w-full sm:w-[300px]`} >
                    <div
                      className="flex items-center gap-3 text-sm text-grayth py-2 px-3 rounded-full border-2 border-gray-600 hover:border-indigo-900 transition duration-200">
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
                )
                :
                (
                  <Search />
                )
            ) : null
          }

          <MobileDrawer />
        </div>
      </div>
    </>
  );
}

export default SearchM;