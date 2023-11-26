'use client'

import { ChangeEvent, FormEvent } from 'react';
import { FaSearch } from 'react-icons/fa'

interface SearchProps {
  submitSearch: (e: FormEvent<HTMLFormElement>) => void,
  title: string,
  changeSearch: (e: ChangeEvent<HTMLInputElement>) => void,
  getTopRanked?: () => void,
  hidden?: boolean
}

const Search = ({ submitSearch, title, changeSearch, getTopRanked, hidden }: SearchProps) => {

  return (
    <div className='flex items-center justify-between gap-4 sm:px-4 py-4'>
      {!hidden && (
        <div className={`justify-start gap-4 text-grayth text-[15px] font-semibold hidden sm:flex`}>
          <h3 className="hover:text-indigo-400 transition duration-200 cursor-pointer" onClick={getTopRanked}>Top movies</h3>
        </div>
      )}
      <form onSubmit={submitSearch} className="w-full xsm:w-[300px]">
        <div
          className="flex items-center gap-3 text-sm text-grayth p-2 rounded-lg border-2 border-gray-600 hover:border-indigo-900 transition duration-200">
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
    </div>
  );
}

export default Search;